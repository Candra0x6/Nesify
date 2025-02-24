import { describe, it, beforeEach } from "mocha";
import { expect } from "chai";
import { ethers } from "hardhat";
import { time } from "@nomicfoundation/hardhat-network-helpers";

describe("NFTTicketing", function () {
  let NFTTicketingFactory;
  let nftTicketing: any;
  let owner: any;
  let organizer: any;
  let buyer1: any;
  let buyer2: any;

  // Test event parameters
  const EVENT_NAME = "Test Concert";
  const EVENT_LOCATION = "Test Venue";
  const TICKET_PRICE = ethers.parseEther("0.1");
  const MAX_SUPPLY = 100;

  beforeEach(async function () {
    // Get signers
    [owner, organizer, buyer1, buyer2] = await ethers.getSigners();

    // Deploy contract
    NFTTicketingFactory = await ethers.getContractFactory("NFTTicketing");
    nftTicketing = await NFTTicketingFactory.deploy();
    await nftTicketing.deployed();

    // Grant organizer role
    const ORGANIZER_ROLE = await nftTicketing.ORGANIZER_ROLE();
    await nftTicketing.grantRole(ORGANIZER_ROLE, organizer.address);
  });

  describe("Deployment", function () {
    it("Should set the right owner", async function () {
      const DEFAULT_ADMIN_ROLE = await nftTicketing.DEFAULT_ADMIN_ROLE();
      expect(await nftTicketing.hasRole(DEFAULT_ADMIN_ROLE, owner.address)).to
        .be.true;
    });

    it("Should have the correct name and symbol", async function () {
      expect(await nftTicketing.name()).to.equal("NFT Tickets");
      expect(await nftTicketing.symbol()).to.equal("NFTIX");
    });
  });

  describe("Event Creation", function () {
    it("Should allow organizer to create an event", async function () {
      const futureDate = (await time.latest()) + 86400; // 1 day from now

      await expect(
        nftTicketing
          .connect(organizer)
          .createEvent(
            EVENT_NAME,
            futureDate,
            EVENT_LOCATION,
            TICKET_PRICE,
            MAX_SUPPLY
          )
      )
        .to.emit(nftTicketing, "EventCreated")
        .withArgs(0, EVENT_NAME, futureDate, EVENT_LOCATION, TICKET_PRICE);

      const event = await nftTicketing.events(0);
      expect(event.name).to.equal(EVENT_NAME);
      expect(event.date).to.equal(futureDate);
      expect(event.location).to.equal(EVENT_LOCATION);
      expect(event.price).to.equal(TICKET_PRICE);
      expect(event.maxSupply).to.equal(MAX_SUPPLY);
      expect(event.active).to.be.true;
      expect(event.organizer).to.equal(organizer.address);
    });

    it("Should not allow non-organizer to create an event", async function () {
      const futureDate = (await time.latest()) + 86400;

      await expect(
        nftTicketing
          .connect(buyer1)
          .createEvent(
            EVENT_NAME,
            futureDate,
            EVENT_LOCATION,
            TICKET_PRICE,
            MAX_SUPPLY
          )
      ).to.be.reverted;
    });

    it("Should not allow event creation with past date", async function () {
      const pastDate = (await time.latest()) - 86400;

      await expect(
        nftTicketing
          .connect(organizer)
          .createEvent(
            EVENT_NAME,
            pastDate,
            EVENT_LOCATION,
            TICKET_PRICE,
            MAX_SUPPLY
          )
      ).to.be.revertedWith("Event date must be in the future");
    });
  });

  describe("Ticket Minting", function () {
    let eventId: any;
    let futureDate: any;

    beforeEach(async function () {
      futureDate = (await time.latest()) + 86400;
      await nftTicketing
        .connect(organizer)
        .createEvent(
          EVENT_NAME,
          futureDate,
          EVENT_LOCATION,
          TICKET_PRICE,
          MAX_SUPPLY
        );
      eventId = 0;
    });

    it("Should allow users to mint tickets with correct payment", async function () {
      const quantity = 2n;
      const totalPrice = TICKET_PRICE * quantity;

      await expect(
        nftTicketing
          .connect(buyer1)
          .mintTicket(eventId, quantity, buyer1.address, { value: totalPrice })
      ).to.emit(nftTicketing, "TicketMinted");

      expect(await nftTicketing.balanceOf(buyer1.address)).to.equal(quantity);
    });

    it("Should not allow minting with insufficient payment", async function () {
      const quantity = 2n;
      const insufficientPrice = TICKET_PRICE * quantity - 1n;

      await expect(
        nftTicketing
          .connect(buyer1)
          .mintTicket(eventId, quantity, buyer1.address, {
            value: insufficientPrice,
          })
      ).to.be.revertedWith("Insufficient payment");
    });

    it("Should not allow minting more than MAX_TICKETS_PER_WALLET", async function () {
      const quantity = 5n; // MAX_TICKETS_PER_WALLET is 4
      const totalPrice = TICKET_PRICE * quantity;

      await expect(
        nftTicketing
          .connect(buyer1)
          .mintTicket(eventId, quantity, buyer1.address, { value: totalPrice })
      ).to.be.revertedWith("Exceeds max tickets per wallet");
    });

    it("Should not allow minting more than event max supply", async function () {
      const quantity = BigInt(MAX_SUPPLY + 1);
      const totalPrice = TICKET_PRICE * quantity;

      await expect(
        nftTicketing
          .connect(buyer1)
          .mintTicket(eventId, quantity, buyer1.address, { value: totalPrice })
      ).to.be.revertedWith("Exceeds max supply");
    });
  });

  describe("Ticket Verification", function () {
    let eventId: any;
    let tokenId: any;

    beforeEach(async function () {
      const futureDate = (await time.latest()) + 86400;
      await nftTicketing
        .connect(organizer)
        .createEvent(
          EVENT_NAME,
          futureDate,
          EVENT_LOCATION,
          TICKET_PRICE,
          MAX_SUPPLY
        );
      eventId = 0;

      await nftTicketing
        .connect(buyer1)
        .mintTicket(eventId, 1, buyer1.address, { value: TICKET_PRICE });
      tokenId = 0;
    });

    it("Should allow ticket owner to verify ticket", async function () {
      await expect(nftTicketing.connect(buyer1).verifyTicket(tokenId))
        .to.emit(nftTicketing, "TicketUsed")
        .withArgs(tokenId, eventId);

      const ticket = await nftTicketing.tickets(tokenId);
      expect(ticket.used).to.be.true;
    });

    it("Should not allow non-owner to verify ticket", async function () {
      await expect(
        nftTicketing.connect(buyer2).verifyTicket(tokenId)
      ).to.be.revertedWith("Not ticket owner");
    });

    it("Should not allow verifying used ticket", async function () {
      await nftTicketing.connect(buyer1).verifyTicket(tokenId);

      await expect(
        nftTicketing.connect(buyer1).verifyTicket(tokenId)
      ).to.be.revertedWith("Ticket already used");
    });

    it("Should not allow verifying ticket after event date", async function () {
      await time.increase(86401); // Advance time past event date

      await expect(
        nftTicketing.connect(buyer1).verifyTicket(tokenId)
      ).to.be.revertedWith("Event has expired");
    });
  });

  describe("Ticket Transfer and Royalties", function () {
    let eventId: any;
    let tokenId: any;

    beforeEach(async function () {
      const futureDate = (await time.latest()) + 86400;
      await nftTicketing
        .connect(organizer)
        .createEvent(
          EVENT_NAME,
          futureDate,
          EVENT_LOCATION,
          TICKET_PRICE,
          MAX_SUPPLY
        );
      eventId = 0;

      await nftTicketing
        .connect(buyer1)
        .mintTicket(eventId, 1, buyer1.address, { value: TICKET_PRICE });
      tokenId = 0;
    });

    it("Should allow ticket transfer with royalty payment", async function () {
      const royaltyAmount = (TICKET_PRICE * 10n) / 100n; // 10% royalty

      await expect(
        nftTicketing
          .connect(buyer1)
          .transferFrom(buyer1.address, buyer2.address, tokenId, {
            value: royaltyAmount,
          })
      )
        .to.emit(nftTicketing, "Transfer")
        .withArgs(buyer1.address, buyer2.address, tokenId);

      expect(await nftTicketing.ownerOf(tokenId)).to.equal(buyer2.address);
    });

    it("Should not allow transfer without royalty payment", async function () {
      await expect(
        nftTicketing
          .connect(buyer1)
          .transferFrom(buyer1.address, buyer2.address, tokenId)
      ).to.be.revertedWith("Insufficient royalty payment");
    });
  });

  describe("Ticket Validation", function () {
    let eventId: any;
    let tokenId: any;

    beforeEach(async function () {
      const futureDate = (await time.latest()) + 86400;
      await nftTicketing
        .connect(organizer)
        .createEvent(
          EVENT_NAME,
          futureDate,
          EVENT_LOCATION,
          TICKET_PRICE,
          MAX_SUPPLY
        );
      eventId = 0;

      await nftTicketing
        .connect(buyer1)
        .mintTicket(eventId, 1, buyer1.address, { value: TICKET_PRICE });
      tokenId = 0;
    });

    it("Should return true for valid ticket", async function () {
      expect(await nftTicketing.isTicketValid(tokenId)).to.be.true;
    });

    it("Should return false for used ticket", async function () {
      await nftTicketing.connect(buyer1).verifyTicket(tokenId);
      expect(await nftTicketing.isTicketValid(tokenId)).to.be.false;
    });

    it("Should return false for expired ticket", async function () {
      await time.increase(86401); // Advance time past event date
      expect(await nftTicketing.isTicketValid(tokenId)).to.be.false;
    });

    it("Should return false for non-existent ticket", async function () {
      expect(await nftTicketing.isTicketValid(999)).to.be.false;
    });
  });
});
