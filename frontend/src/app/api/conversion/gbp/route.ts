import { ApiResponse, User } from "@/utils/type";
import { NextResponse, NextRequest } from "next/server";

export async function POST(
  req: NextRequest
): Promise<NextResponse<ApiResponse<User>>> {
  try {
    const { price } = await req.json();
    if (!price) {
      return NextResponse.json<ApiResponse<User>>({
        message: "Price is required",
        status: 400,
        result: null,
        error: "Bad request",
      });
    }
    const repsonse = await fetch(
      `https://pro-api.coinmarketcap.com/v2/tools/price-conversion?amount=${price}&id=2791&convert=GBP`,
      {
        headers: {
          "X-CMC_PRO_API_KEY": process.env.COIN_MARKET_CAP_API_KEY || "",
        },
      }
    );

    const results = await repsonse.json();
    if (!results.data) {
      return NextResponse.json<ApiResponse<User>>({
        message: "No data found",
        status: 500,
        result: null,
        error: "Server error",
      });
    }

    const GBP = results.data.quote.GBP.price.toFixed(2);
    return NextResponse.json<ApiResponse<User>>({
      message: "GBP price fetched",
      status: 200,
      result: GBP,
      error: null,
    });
  } catch (err) {
    console.error(err);
    return NextResponse.json<ApiResponse<User>>(
      { result: null, error: "Error", status: 500, message: "Server error" },
      { status: 500 }
    );
  }
}
