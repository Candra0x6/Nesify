import prisma from "@/lib/db";
import { NextResponse, NextRequest } from "next/server";
import { ApiResponse } from "@/utils/type";
import { Ticket } from "@prisma/client";

// GET route to fetch all tickets, tickets by userId, or a specific ticket by ID
export async function GET(
  req: NextRequest
): Promise<NextResponse<ApiResponse<Ticket[] | Ticket>>> {
  try {
    const url = new URL(req.url);
    const id = url.searchParams.get("id");
    const userId = url.searchParams.get("userId");

    if (id) {
      // Fetch a specific ticket by ID
      const ticket = await prisma.ticket.findUnique({
        where: {
          id,
        },
      });

      if (!ticket) {
        return NextResponse.json<ApiResponse<Ticket>>(
          {
            result: null,
            error: "Ticket not found",
            message: "Ticket not found",
            status: 404,
          },
          { status: 404 }
        );
      }

      return NextResponse.json<ApiResponse<Ticket>>({
        message: "Ticket retrieved successfully",
        status: 200,
        result: ticket,
        error: null,
      });
    } else if (userId) {
      // Fetch tickets for a specific user
      const tickets = await prisma.ticket.findMany({
        where: {
          user: {
            id: userId,
          },
        },
        orderBy: {
          createdAt: "desc",
        },
      });

      return NextResponse.json<ApiResponse<Ticket[]>>({
        message: "User tickets retrieved successfully",
        status: 200,
        result: tickets,
        error: null,
      });
    } else {
      // Fetch all tickets
      const tickets = await prisma.ticket.findMany({
        orderBy: {
          createdAt: "desc",
        },
      });

      return NextResponse.json<ApiResponse<Ticket[]>>({
        message: "Tickets retrieved successfully",
        status: 200,
        result: tickets,
        error: null,
      });
    }
  } catch (error) {
    console.error("Error fetching tickets:", error);
    return NextResponse.json<ApiResponse<Ticket[] | Ticket>>(
      {
        result: null,
        error: "Internal server error",
        message: "Failed to fetch tickets",
        status: 500,
      },
      { status: 500 }
    );
  }
}

// POST route to create a new ticket
export async function POST(
  req: NextRequest
): Promise<NextResponse<ApiResponse<Ticket>>> {
  try {
    const { tokenId, eventId, userId, validated, purchaseDate, buyerName } =
      await req.json();

    // Validation
    if (!tokenId || !eventId || !userId) {
      return NextResponse.json<ApiResponse<Ticket>>(
        {
          result: null,
          error:
            "Missing required fields: tokenId, eventId, and userId are required",
          message: "Bad request",
          status: 400,
        },
        { status: 400 }
      );
    }

    // Check if ticket with the same tokenId already exists
    const existingTicket = await prisma.ticket.findUnique({
      where: {
        tokenId,
      },
    });

    if (existingTicket) {
      return NextResponse.json<ApiResponse<Ticket>>(
        {
          result: null,
          error: "Ticket with this tokenId already exists",
          message: "Ticket already exists",
          status: 400,
        },
        { status: 400 }
      );
    }

    // Check if user exists
    const user = await prisma.user.findUnique({
      where: {
        id: userId,
      },
    });

    if (!user) {
      return NextResponse.json<ApiResponse<Ticket>>(
        {
          result: null,
          error: "User not found",
          message: "User not found",
          status: 404,
        },
        { status: 404 }
      );
    }

    // Create the ticket
    const ticket = await prisma.ticket.create({
      data: {
        tokenId,
        eventId,
        userId,
        validated: validated ?? false,
        purchaseDate: purchaseDate ? new Date(purchaseDate) : null,
        buyerName: buyerName || null,
      },
    });

    return NextResponse.json<ApiResponse<Ticket>>({
      message: "Ticket created successfully",
      status: 201,
      result: ticket,
      error: null,
    });
  } catch (error) {
    console.error("Error creating ticket:", error);
    return NextResponse.json<ApiResponse<Ticket>>(
      {
        result: null,
        error: "Internal server error",
        message: "Failed to create ticket",
        status: 500,
      },
      { status: 500 }
    );
  }
}

// PUT route to update an existing ticket
export async function PUT(
  req: NextRequest
): Promise<NextResponse<ApiResponse<Ticket>>> {
  try {
    const { id, tokenId, eventId, userId, validated, purchaseDate, buyerName } =
      await req.json();

    // Validation
    if (!id) {
      return NextResponse.json<ApiResponse<Ticket>>(
        {
          result: null,
          error: "Missing required field: id",
          message: "Bad request",
          status: 400,
        },
        { status: 400 }
      );
    }

    // Check if ticket exists
    const existingTicket = await prisma.ticket.findUnique({
      where: {
        id,
      },
    });

    if (!existingTicket) {
      return NextResponse.json<ApiResponse<Ticket>>(
        {
          result: null,
          error: "Ticket not found",
          message: "Ticket not found",
          status: 404,
        },
        { status: 404 }
      );
    }

    // If tokenId is being changed, check for uniqueness
    if (tokenId && tokenId !== existingTicket.tokenId) {
      const tokenIdExists = await prisma.ticket.findUnique({
        where: {
          tokenId,
        },
      });

      if (tokenIdExists) {
        return NextResponse.json<ApiResponse<Ticket>>(
          {
            result: null,
            error: "Ticket with this tokenId already exists",
            message: "tokenId must be unique",
            status: 400,
          },
          { status: 400 }
        );
      }
    }

    // If userId is provided, check if user exists
    if (userId) {
      const userExists = await prisma.user.findUnique({
        where: {
          id: userId,
        },
      });

      if (!userExists) {
        return NextResponse.json<ApiResponse<Ticket>>(
          {
            result: null,
            error: "User not found",
            message: "User not found",
            status: 404,
          },
          { status: 404 }
        );
      }
    }

    // Update the ticket with properly typed fields

    const updateData: Partial<Ticket> = {};
    if (tokenId !== undefined) updateData.tokenId = tokenId;
    if (eventId !== undefined) updateData.eventId = eventId;
    if (userId !== undefined) updateData.userId = userId;
    if (validated !== undefined) updateData.validated = validated;
    if (purchaseDate !== undefined)
      updateData.purchaseDate = purchaseDate ? new Date(purchaseDate) : null;
    if (buyerName !== undefined) updateData.buyerName = buyerName;

    const updatedTicket = await prisma.ticket.update({
      where: {
        id,
      },
      data: updateData,
    });

    return NextResponse.json<ApiResponse<Ticket>>({
      message: "Ticket updated successfully",
      status: 200,
      result: updatedTicket,
      error: null,
    });
  } catch (error) {
    console.error("Error updating ticket:", error);
    return NextResponse.json<ApiResponse<Ticket>>(
      {
        result: null,
        error: "Internal server error",
        message: "Failed to update ticket",
        status: 500,
      },
      { status: 500 }
    );
  }
}

// DELETE route to delete a ticket
export async function DELETE(
  req: NextRequest
): Promise<NextResponse<ApiResponse<Ticket>>> {
  try {
    const url = new URL(req.url);
    const id = url.searchParams.get("id");

    if (!id) {
      return NextResponse.json<ApiResponse<Ticket>>(
        {
          result: null,
          error: "Missing required parameter: id",
          message: "Bad request",
          status: 400,
        },
        { status: 400 }
      );
    }

    // Check if ticket exists
    const existingTicket = await prisma.ticket.findUnique({
      where: {
        id,
      },
    });

    if (!existingTicket) {
      return NextResponse.json<ApiResponse<Ticket>>(
        {
          result: null,
          error: "Ticket not found",
          message: "Ticket not found",
          status: 404,
        },
        { status: 404 }
      );
    }

    // Delete the ticket
    const deletedTicket = await prisma.ticket.delete({
      where: {
        id,
      },
    });

    return NextResponse.json<ApiResponse<Ticket>>({
      message: "Ticket deleted successfully",
      status: 200,
      result: deletedTicket,
      error: null,
    });
  } catch (error) {
    console.error("Error deleting ticket:", error);
    return NextResponse.json<ApiResponse<Ticket>>(
      {
        result: null,
        error: "Internal server error",
        message: "Failed to delete ticket",
        status: 500,
      },
      { status: 500 }
    );
  }
}
