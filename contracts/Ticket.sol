// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "@openzeppelin/contracts/token/ERC721/IERC721.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/IERC721Metadata.sol";
import "@openzeppelin/contracts/access/AccessControl.sol";
import "@openzeppelin/contracts/utils/Context.sol";
import "@openzeppelin/contracts/utils/Strings.sol";
import "@openzeppelin/contracts/interfaces/IERC2981.sol";
import "erc721a/contracts/ERC721A.sol";

/**
 * @title NFTTicketing
 * @dev Implementation of NFT-based ticketing system using ERC721A
 */
contract NFTTicketing is ERC721A, AccessControl {
    using Strings for uint256;

    bytes32 public constant ORGANIZER_ROLE = keccak256("ORGANIZER_ROLE");
    uint256 private constant MAX_TICKETS_PER_WALLET = 4;

    struct Event {
        string name;
        uint256 date;
        string location;
        string category;
        uint256 price;
        uint256 totalSupply;
        uint256 maxSupply;
        bool active;
        address organizer;
    }

    struct Ticket {
        uint256 eventId;
        bool used;
        uint256 purchasePrice;
    }

    // Event ID => Event details
    mapping(uint256 => Event) public events;
    // Token ID => Ticket details
    mapping(uint256 => Ticket) public tickets;
    // Event ID => Token IDs
    mapping(uint256 => uint256[]) public eventTickets;
    // Event ID counter
    uint256 private _eventIdCounter;
    // Mapping kategori ke daftar eventId
    mapping(string => uint256[]) private eventsByCategory;
    // Mapping organizer ke daftar eventId
    mapping(address => uint256[]) private eventsByOrganizer;
    // Mapping lokasi ke daftar eventId
    mapping(string => uint256[]) private eventsByLocation;
    // Token ID => Metadata
    mapping(uint256 => string) private _tokenURIs;

    event EventCreated(
        uint256 indexed eventId,
        string name,
        uint256 date,
        string location,
        uint256 price,
        string category
    );
    event TicketMinted(
        uint256 indexed eventId,
        uint256 indexed tokenId,
        address to
    );
    event TicketUsed(uint256 indexed tokenId, uint256 indexed eventId);

    modifier nonReentrant() {
        require(_status != _ENTERED, "ReentrancyGuard: reentrant call");
        _status = _ENTERED;
        _;
        _status = _NOT_ENTERED;
    }

    uint256 private constant _NOT_ENTERED = 1;
    uint256 private constant _ENTERED = 2;
    uint256 private _status = _NOT_ENTERED;

    constructor() ERC721A("NFT Tickets", "NFTIX") {
        _grantRole(DEFAULT_ADMIN_ROLE, msg.sender);
    }

    /**
     * @dev Creates a new event
     * @param name Event name
     * @param date Event date (Unix timestamp)
     * @param location Event location
     * @param price Ticket price in wei
     * @param maxSupply Maximum number of tickets
     */
    function createEvent(
        string memory name,
        uint256 date,
        string memory location,
        uint256 price,
        uint256 maxSupply,
        string memory category
    ) external onlyRole(ORGANIZER_ROLE) {
        require(date > block.timestamp, "Event date must be in the future");
        require(maxSupply > 0, "Max supply must be greater than 0");

        uint256 eventId = _eventIdCounter++;

        events[eventId] = Event({
            name: name,
            date: date,
            location: location,
            price: price,
            totalSupply: 0,
            maxSupply: maxSupply,
            active: true,
            organizer: msg.sender,
            category: category
        });
        eventsByOrganizer[msg.sender].push(eventId);
        eventsByLocation[location].push(eventId);
        eventsByCategory[category].push(eventId);

        emit EventCreated(eventId, name, date, location, price, category);
    }

    function getEventsByCategory(
        string memory category
    ) public view returns (uint256[] memory) {
        return eventsByCategory[category];
    }

    function getEventsByLocation(
        string memory location
    ) public view returns (uint256[] memory) {
        return eventsByLocation[location];
    }

    function getEventsByOrganizer(
        address organizer
    ) public view returns (uint256[] memory) {
        return eventsByOrganizer[organizer];
    }

    /**
     * @dev Mints tickets for an event
     * @param eventId Event ID
     * @param quantity Number of tickets to mint
     * @param to Address to mint tickets to
     */
    function mintTicket(
        uint256 eventId,
        uint256 quantity,
        address to
    ) external payable nonReentrant {
        Event storage event_ = events[eventId];
        require(event_.active, "Event does not exist or is not active");
        require(
            event_.totalSupply + quantity <= event_.maxSupply,
            "Exceeds max supply"
        );
        require(msg.value >= event_.price * quantity, "Insufficient payment");

        uint256 walletTicketCount = balanceOf(to);
        require(
            walletTicketCount + quantity <= MAX_TICKETS_PER_WALLET,
            "Exceeds max tickets per wallet"
        );

        uint256 startTokenId = _nextTokenId();
        _mint(to, quantity);

        for (uint256 i = 0; i < quantity; i++) {
            uint256 tokenId = startTokenId + i;
            tickets[tokenId] = Ticket({
                eventId: eventId,
                used: false,
                purchasePrice: event_.price
            });
            eventTickets[eventId].push(tokenId);
            emit TicketMinted(eventId, tokenId, to);
        }

        event_.totalSupply += quantity;

        // Transfer payment to event organizer
        (bool sent, ) = event_.organizer.call{value: msg.value}("");
        require(sent, "Failed to send payment");
    }

    /**
     * @dev Verifies and marks a ticket as used
     * @param tokenId Token ID of the ticket
     */
    function verifyTicket(uint256 tokenId) external {
        require(_exists(tokenId), "Ticket does not exist");
        require(ownerOf(tokenId) == msg.sender, "Not ticket owner");

        Ticket storage ticket = tickets[tokenId];
        Event storage event_ = events[ticket.eventId];

        require(event_.active, "Event is not active");
        require(!ticket.used, "Ticket already used");
        require(block.timestamp <= event_.date, "Event has expired");

        ticket.used = true;
        emit TicketUsed(tokenId, ticket.eventId);
    }

    function setTokenURI(
        uint256 tokenId,
        string memory uri
    ) external onlyRole(ORGANIZER_ROLE) {
        require(_exists(tokenId), "Token does not exist");
        _tokenURIs[tokenId] = uri;
    }   

    function tokenURI(
        uint256 tokenId
    ) public view override returns (string memory) {
        require(_exists(tokenId), "Token does not exist");
        return _tokenURIs[tokenId];
    }
    /**
     * @dev Override transfer function to enforce royalties
     */
    function transferFrom(
        address from,
        address to,
        uint256 tokenId
    ) public payable virtual override {
        Ticket storage ticket = tickets[tokenId];
        Event storage event_ = events[ticket.eventId];

        // Calculate and transfer royalty to event organizer
        if (
            from != address(0) && to != address(0) && from != event_.organizer
        ) {
            uint256 royaltyAmount = (ticket.purchasePrice * 10) / 100; // 10% royalty
            require(msg.value >= royaltyAmount, "Insufficient royalty payment");

            (bool sent, ) = event_.organizer.call{value: royaltyAmount}("");
            require(sent, "Failed to send royalty");
        }

        super.transferFrom(from, to, tokenId);
    }

    /**
     * @dev Returns whether a specific ticket is valid
     * @param tokenId Token ID to check
     */
    function isTicketValid(uint256 tokenId) public view returns (bool) {
        if (!_exists(tokenId)) return false;

        Ticket storage ticket = tickets[tokenId];
        Event storage event_ = events[ticket.eventId];

        return event_.active && !ticket.used && block.timestamp <= event_.date;
    }

    /**
     * @dev See {IERC165-supportsInterface}.
     */

    function getOwnedTickets(
        address owner
    ) external view returns (uint256[] memory) {
        uint256 balance = balanceOf(owner);
        uint256[] memory ownedTokens = new uint256[](balance);
        uint256 count = 0;

        for (uint256 i = _startTokenId(); i < _nextTokenId(); i++) {
            if (ownerOf(i) == owner) {
                ownedTokens[count] = i;
                count++;
            }
        }

        return ownedTokens;
    }

    function getAllEvents() external view returns (Event[] memory) {
        Event[] memory allEvents = new Event[](_eventIdCounter);
        for (uint256 i = 0; i < _eventIdCounter; i++) {
            allEvents[i] = events[i];
        }
        return allEvents;
    }

    function deactivateEvent(
        uint256 eventId
    ) external onlyRole(ORGANIZER_ROLE) {
        events[eventId].active = false;
    }

    function supportsInterface(
        bytes4 interfaceId
    ) public view virtual override(ERC721A, AccessControl) returns (bool) {
        return super.supportsInterface(interfaceId);
    }
}
