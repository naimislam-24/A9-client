const BASE_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000";

export const checkoutVerify = async (sessionId: string) => {
  const response = await fetch(`${BASE_URL}/payments/checkout-verify`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ sessionId }),
  });

  const contentType = response.headers.get("content-type") ?? "";
  if (!response.ok || !contentType.includes("application/json")) {
    throw new Error(
      `Payment verification failed: ${response.status} ${response.statusText}` +
        (contentType.includes("text/html")
          ? " (backend returned HTML instead of JSON — check the server logs)"
          : ""),
    );
  }
  return response.json();
};
