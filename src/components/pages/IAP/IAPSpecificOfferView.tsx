import icFlashSale from "../../assets/icFlashSale.png";
import { useEffect, useState } from "react";
import Image from "next/image";
import { IAPConfig } from "../../models/IAPConfig";
import { useRouter } from "next/navigation";

export function IAPSpecificOfferView(props: { config: IAPConfig }) {
  const [timeLeft, setTimeLeft] = useState(600); // 600 giây = 10 phút

  const router = useRouter();

  useEffect(() => {
    if (timeLeft <= 0) {
      router.push("/welcome");
      return;
    }

    const timer = setInterval(() => {
      setTimeLeft((prev) => prev - 1);
    }, 1000); // Giảm mỗi giây

    return () => clearInterval(timer); // Cleanup
  }, [timeLeft, router]);

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, "0")}:${secs
      .toString()
      .padStart(2, "0")}`;
  };

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#000000",
        padding: "8px 16px",
        gap: 8,
      }}
    >
      <Image src={"/assets/icFlashSale.png"} alt={""} width={36} height={36} />
      <span
        style={{
          color: "white",
          fontWeight: 500,
        }}
      >
        {props.config.yourSpecialOffer}
      </span>

      <span
        style={{
          fontWeight: 500,
          fontSize: 24,
          color: "white",
          padding: "8px 16px",
          borderRadius: 10,
          border: "1px solid #EB9D71",
        }}
      >
        {formatTime(timeLeft)}
      </span>
    </div>
  );
}
