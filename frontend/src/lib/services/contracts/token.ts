import {
  prepareContractCall,
  PrepareTransactionOptions,
  PreparedTransaction,
} from "thirdweb";
import { NFTTicketContract } from "@/lib/contract";
import type { Abi } from "abitype";
type AddTokenParams = {
  tokenId?: bigint;
  amount?: bigint;
};

export type PreparedAddToken = PreparedTransaction<
  [],
  {
    readonly name: "addTokens";
    readonly type: "function";
    readonly stateMutability: "nonpayable";
    readonly inputs: readonly [
      {
        readonly type: "uint256";
        readonly name: "tokenId";
      },
      {
        readonly type: "uint64";
        readonly name: "amount";
      }
    ];
    readonly outputs: readonly [];
  },
  PrepareTransactionOptions
>;

type AddTokenResult = {
  success: boolean;
  message: string;
  transaction?: PreparedAddToken;
};

type PreparedCreateToken = PreparedTransaction<
  [],
  {
    readonly name: "createToken";
    readonly type: "function";
    readonly stateMutability: "nonpayable";
    readonly inputs: readonly [
      {
        readonly type: "string";
        readonly name: "newUri";
      },
      {
        readonly type: "uint64";
        readonly name: "amount";
      }
    ];
    readonly outputs: readonly [
      {
        readonly type: "uint256";
      }
    ];
  },
  PrepareTransactionOptions
>;

type CreateTokenResult = {
  success: boolean;
  message: string;
  transaction?: PreparedCreateToken;
};

export const createTokenFn = async ({
  newUri,
  amount,
}: {
  newUri: string;
  amount: bigint;
}): Promise<CreateTokenResult> => {
  try {
    const transaction = prepareContractCall({
      contract: NFTTicketContract,
      method:
        "function createToken(string newUri, uint64 amount) returns (uint256)",
      params: [newUri, amount],
    }) as PreparedCreateToken;

    return {
      success: true,
      message: "Token Created Successfully",
      transaction,
    };
  } catch (error) {
    return {
      success: false,
      message:
        error instanceof Error ? error.message : "Failed to create token",
    };
  }
};

export const addTokenFn = async ({
  tokenId = BigInt(1),
  amount = BigInt(100),
}: AddTokenParams): Promise<AddTokenResult> => {
  try {
    const transaction = prepareContractCall({
      contract: NFTTicketContract,
      method: "function addTokens(uint256 tokenId, uint64 amount)",
      params: [tokenId, amount],
    }) as PreparedAddToken;

    return {
      success: true,
      message: "Token Created Successfully",
      transaction,
    };
  } catch (error) {
    const errorMessage =
      error instanceof Error ? error.message : "Failed to create token";
    return {
      success: false,
      message: errorMessage,
    };
  }
};

type MintTokenParams = {
  to: string;
  id: bigint;
  amount: bigint;
  data: `0x${string}`;
};

type PreparedMintToken = PreparedTransaction<
  Abi,
  {
    readonly name: "mint";
    readonly type: "function";
    readonly stateMutability: "nonpayable";
    readonly inputs: readonly [
      {
        readonly type: "address";
        readonly name: "to";
      },
      {
        readonly type: "uint256";
        readonly name: "id";
      },
      {
        readonly type: "uint256";
        readonly name: "amount";
      },
      {
        readonly type: "bytes";
        readonly name: "data";
      }
    ];
    readonly outputs: readonly [];
  },
  PrepareTransactionOptions
>;

type MintTokenResult = {
  success: boolean;
  message: string;
  transaction?: PreparedMintToken;
};

export const mintTokenFn = async ({
  to,
  id,
  amount,
  data,
}: MintTokenParams): Promise<MintTokenResult> => {
  try {
    const transaction = prepareContractCall({
      contract: NFTTicketContract,
      method:
        "function mint(address to, uint256 id, uint256 amount, bytes data)",
      params: [to, id, amount, data],
    });

    return {
      success: true,
      message: "Token Created Successfully",
      transaction,
    };
  } catch (error) {
    const errorMessage =
      error instanceof Error ? error.message : "Failed to create token";
    return {
      success: false,
      message: errorMessage,
    };
  }
};

type MintBatchTokenParams = {
  to: string;
  ids: bigint[];
  amounts: bigint[];
  data: `0x${string}`;
};

type PreparedMintBatchToken = PreparedTransaction<
  Abi,
  {
    readonly name: "mintBatch";
    readonly type: "function";
    readonly stateMutability: "nonpayable";
    readonly inputs: readonly [
      {
        readonly type: "address";
        readonly name: "to";
      },
      {
        readonly type: "uint256[]";
        readonly name: "ids";
      },
      {
        readonly type: "uint256[]";
        readonly name: "amounts";
      },
      {
        readonly type: "bytes";
        readonly name: "data";
      }
    ];
    readonly outputs: readonly [];
  },
  PrepareTransactionOptions
>;

type MintBatchTokenResult = {
  success: boolean;
  message: string;
  transaction?: PreparedMintBatchToken;
};

export const mintBatchTokenFn = async ({
  to,
  ids,
  amounts,
  data,
}: MintBatchTokenParams): Promise<MintBatchTokenResult> => {
  try {
    const transaction = prepareContractCall({
      contract: NFTTicketContract,
      method:
        "function mintBatch(address to, uint256[] ids, uint256[] amounts, bytes data)",
      params: [to, ids, amounts, data],
    });

    return {
      success: true,
      message: "Token Created Successfully",
      transaction,
    };
  } catch (error) {
    const errorMessage =
      error instanceof Error ? error.message : "Failed to create token";
    return {
      success: false,
      message: errorMessage,
    };
  }
};

type GiveResaleApprovalParams = {
  tokenId: bigint;
};

type PreparedGiveResaleApproval = PreparedTransaction<
  Abi,
  {
    readonly name: "giveResaleApproval";
    readonly type: "function";
    readonly stateMutability: "nonpayable";
    readonly inputs: readonly [
      {
        readonly type: "uint256";
        readonly name: "tokenId";
      }
    ];
    readonly outputs: readonly [];
  },
  PrepareTransactionOptions
>;

type GiveResaleApprovalResult = {
  success: boolean;
  message: string;
  transaction?: PreparedGiveResaleApproval;
};

export const giveResaleApprovalFn = async ({
  tokenId,
}: GiveResaleApprovalParams): Promise<GiveResaleApprovalResult> => {
  try {
    const transaction = prepareContractCall({
      contract: NFTTicketContract,
      method: "function giveResaleApproval(uint256 tokenId)",
      params: [tokenId],
    });

    return {
      success: true,
      message: "Token Created Successfully",
      transaction,
    };
  } catch (error) {
    const errorMessage =
      error instanceof Error ? error.message : "Failed to create token";
    return {
      success: false,
      message: errorMessage,
    };
  }
};
