export default async function GdbConversion(price: number) {
  try {
    if (!price || !(price > 0)) {
      return "0";
    }
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/api/conversion/gbp`,
      {
        method: "POST",
        body: JSON.stringify({ price }),
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    const data = await res.json();
    if (res.status == 500) {
      throw new Error(data.error);
    }

    return data.result;
  } catch (error) {
    console.error(error);
    return "0";
  }
}
