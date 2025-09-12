"use client";

import { useEffect } from "react";
import { FirebaseUtils } from "../../utils/FirebaseUtils";
import { useRouter, useSearchParams } from "next/navigation";

const PaymentResultScreen = () => {
  const location = useSearchParams();
  const router = useRouter();

  useEffect(() => {
    if (typeof window === "undefined") return;

    const params = new URLSearchParams(location.toString());
    const status = params.get("status");

    if (status === "success") {
      localStorage.setItem("sessionId", params.get("session_id") || "");
      FirebaseUtils.trackingPayment("payment_confirmed", {
        product_id: "heart_rate_sub_weekly_trial",
        price: "6.99",
        currency: "USD",
        subscription: "1",
        screen_name: "subscribe_01",
        trial: "1",
      });
      router.push("/payment-success");
    } else {
      FirebaseUtils.trackingPayment("Purchased_fail", {
        status: "failed",
        reason: status || "unknown",
      });
      if (status === "cancel") {
        FirebaseUtils.trackingPayment("user_cancel", {
          status: "failed",
          reason: status || "unknown",
        });
        router.push("/success-payment-cancel");
      } else {
        router.push("/purchase");
      }
    }
  }, [location, router]);

  return <p>Đang xử lý kết quả thanh toán…</p>;
};

export default PaymentResultScreen;
