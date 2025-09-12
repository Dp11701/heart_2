"use client";
import React from "react";
import "../../styles/AppHeaderView.css";
import Image from "next/image";

export interface AppHeaderViewProps {
  showBackButton?: boolean;
  indexIndicator: number;
  onTapBack: () => void;
}

function AppHeaderView(props: AppHeaderViewProps) {
  const INDICATORS = Array(18)
    .fill(0)
    .map((_, i) => i);

  return (
    <div className="">
      <div className="flex justify-center items-center w-full mt-2">
        <Image
          src="/assets/icLeft.svg"
          alt={""}
          width={24}
          height={24}
          style={{
            opacity: props.showBackButton === true ? 1 : 0,
            marginLeft: 16,
          }}
          className="w-6 h-6"
          onClick={() => {
            if (props.showBackButton === true) {
              props.onTapBack();
            }
          }}
        />
        {props.indexIndicator >= 0 &&
        props.indexIndicator < INDICATORS.length ? (
          <div
            style={{
              display: "flex",
              flexDirection: "row",
              width: "100vw",
              height: 6,
              margin: "16px 0",
              padding: "0 16px",
              position: "relative",
              backgroundColor: "transparent",
            }}
          >
            {/* Progress track */}
            <div
              style={{
                width: "110%",
                height: "100%",
                backgroundColor: "#D8DEE5",
                borderRadius: 3,
                position: "relative",
                overflow: "hidden",
              }}
            >
              {/* Progress fill */}
              <div
                style={{
                  height: "100%",
                  width: `${
                    ((props.indexIndicator + 1) / INDICATORS.length) * 100
                  }%`,
                  backgroundColor: "#2D3142",
                  borderRadius: 3,
                  transition: "width 0.3s ease-in-out",
                }}
              />
            </div>
          </div>
        ) : null}
      </div>
    </div>
  );
}

export default AppHeaderView;
