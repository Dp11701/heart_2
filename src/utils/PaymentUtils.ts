export class PaymentUtils {
  static async hmacSignature() {
    const apiUrl = process.env.NEXT_PUBLIC_API_URL;
    const timestamp = new Date().getTime() / 1000;
    const payload = {
      timestamp: timestamp,
      payload: {
        items: [
          {
            price: "price_1RvWjpBr1UV8uwmNPd4nzx8G",
            quantity: 1,
          },
        ],
        trial: {
          days: 3,
        },
        return_url: `${process.env.NEXT_PUBLIC_WEB_PAGE_URL}/payment-result`,
      },
    };

    const response = await fetch(`${apiUrl}/api/v1/hmac/sign`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    });

    return {
      signature: (await response.json()).signature || null,
      timestamp: timestamp,
      payload: payload,
    };
  }

  static async checkOut() {
    const apiUrl = process.env.NEXT_PUBLIC_API_URL;
    const { signature, timestamp, payload } = await this.hmacSignature();
    if (!signature) {
      console.error("Failed to get HMAC signature");
      return;
    }

    const response = await fetch(
      `${apiUrl}/api/v1/stripe/create-checkout-session-app`,
      {
        method: "POST",
        headers: {
          "x-signature": signature,
          "x-timestamp": timestamp.toString(),
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload.payload),
      }
    );
    const data = await response.json();
    const url = data.url;
    if (!url) {
      console.error("Failed to create checkout session");
      return;
    }
    window.location.href = url;
  }
}
