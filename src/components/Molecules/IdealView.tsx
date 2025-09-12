import "@/styles/Common.css";

import Image from "next/image";
function IdealView(props: { text: string }) {
  return (
    <div className="flex flex-row gap-[8px] items-center justify-center p-4 bg-white rounded-[20px] m-4">
      <Image
        src="/assets/icIdeal.png"
        alt={"idea"}
        width={24}
        height={24}
        className="w-6 h-6 p-0"
      />
      <span className="text-[#59617A] text-start  text-[14px] leading-[20px]">
        {props.text}
      </span>
    </div>
  );
}

export default IdealView;
