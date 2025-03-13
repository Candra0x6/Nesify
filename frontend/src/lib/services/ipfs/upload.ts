import { EventFormSchema } from "@/components/admin/event-form";
import { TicketFormSchema } from "@/components/admin/ticket-form";
import { client } from "@/lib/thirdweb-dev";

import { upload } from "thirdweb/storage";

export const uploadFileToIpfs = async (file: File) => {
  try {
    if (!file) {
      throw new Error("No file provided");
    }

    const url = await upload({
      client: client,
      files: [file],
    });

    if (!url) {
      throw new Error("Failed to get upload URL");
    }

    return url;
  } catch (error) {
    const errorMessage =
      error instanceof Error ? error.message : "Unknown error occurred";
    throw new Error(`Error uploading to IPFS: ${errorMessage}`);
  }
};

export const uploadEventMetadata = async (data: {
  name: string;
  description: string;
  image: string;
  eventDate: string;
  location: string;
}) => {
  try {
    const metadataFile = new File([JSON.stringify(data)], "metadata.json", {
      type: "application/json",
    });

    const url = await upload({
      client: client,
      files: [metadataFile],
      metadata: data as unknown as Record<string, string>,
    });

    if (!url) {
      throw new Error("Failed to get metadata upload URL");
    }

    return url;
  } catch (error) {
    const errorMessage =
      error instanceof Error ? error.message : "Unknown error occurred";
    throw new Error(`Error uploading metadata: ${errorMessage}`);
  }
};

export const uploadTicketMetadata = async (data: {
  name: string;
  description: string;
  image: string;
  properties: {
    price: string;
    eventId: string;
    purchaseLimit: string;
    royaltyFee: string;
    maxResalePrice: string;
  };
}) => {
  try {
    const metadataFile = new File([JSON.stringify(data)], "metadata.json", {
      type: "application/json",
    });

    const url = await upload({
      client: client,
      files: [metadataFile],
      metadata: data as unknown as Record<string, string>,
    });
    if (!url) {
      throw new Error("Failed to get metadata upload URL");
    }
    return url;
  } catch (error) {
    const errorMessage =
      error instanceof Error ? error.message : "Unknown error occurred";
    throw new Error(`Error uploading metadata: ${errorMessage}`);
  }
};

export const ticketUploadToIpfs = async (
  data: TicketFormSchema,
  eventId: string
) => {
  try {
    const urlImage = await uploadFileToIpfs(data.image);
    const urlMetadata = await uploadTicketMetadata({
      name: data.name,
      description: data.description,
      image: urlImage,
      properties: {
        eventId: eventId,
        maxResalePrice: data.maxResalePrice,
        price: data.price,
        purchaseLimit: data.purchaseLimit,
        royaltyFee: data.royaltyFee,
      },
    });

    return urlMetadata;
  } catch (error) {
    const errorMessage =
      error instanceof Error ? error.message : "Unknown error occurred";
    throw new Error(`Error uploading to IPFS: ${errorMessage}`);
  }
};

export const eventUploadToIpfs = async (data: EventFormSchema) => {
  try {
    const urlImage = await uploadFileToIpfs(data.image);
    const urlMetadata = await uploadEventMetadata({
      name: data.name,
      description: data.description,
      image: urlImage,
      eventDate: new Date(data.date as Date).toLocaleDateString() as string,
      location: `${data.location}, ${data.postcode}`,
    });
    return urlMetadata;
  } catch (error) {
    const errorMessage =
      error instanceof Error ? error.message : "Unknown error occurred";
    throw new Error(`Error uploading to IPFS: ${errorMessage}`);
  }
};
