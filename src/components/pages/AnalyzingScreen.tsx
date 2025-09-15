import "@/styles/AnalyzingScreen.css";
import "@/styles/Common.css";
import { AnalyzingSchema } from "../models/WelcomeConfig";
import { useEffect, useState } from "react";
import Image from "next/image";

import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

export interface AnalyzingScreenProps {
  config: AnalyzingSchema;
  onContinue: () => void;
}

export function AnalyzingScreen(props: AnalyzingScreenProps) {
  const [completedItems, setCompletedItems] = useState<number[]>([]);
  const [currentLoading, setCurrentLoading] = useState<number>(0);
  const [currentSlide, setCurrentSlide] = useState<number>(0);

  const loadingItems = [
    "Analyzing your blood pressure status",
    "Syncing your heart rate & activity history",
    "Building your customized health plan",
    "Creating advice for mental health",
  ];

  const testimonialCards = [
    {
      title: "GREAT APP",
      reviewer: "Jimmy",
      rating: 5,
      content:
        "I can't believe this thing monitors my heart rate. It tells me if it's too high and I need to slow down and quit working so hard.",
      color: "bg-red-50",
    },
    {
      title: "AMAZING FEATURES",
      reviewer: "Sarah",
      rating: 5,
      content:
        "The blood pressure tracking is incredible. It helps me stay on top of my health and make better lifestyle choices.",
      color: "bg-blue-50",
    },
    {
      title: "LIFE CHANGING",
      reviewer: "Mike",
      rating: 5,
      content:
        "This app has completely transformed how I monitor my health. The personalized insights are incredibly valuable.",
      color: "bg-green-50",
    },
  ];

  const sliderSettings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 4000,
    arrows: false,
    fade: false,
    beforeChange: (oldIndex: number, newIndex: number) => {
      setCurrentSlide(newIndex);
    },
  };

  useEffect(() => {
    const loadItems = async () => {
      for (let i = 0; i < loadingItems.length; i++) {
        setCurrentLoading(i + 1);

        // Simulate loading time (2 seconds per item)
        await new Promise((resolve) => setTimeout(resolve, 2000));

        setCompletedItems((prev) => [...prev, i + 1]);
        setCurrentLoading(0);
      }

      // Call onContinue after loading is complete
      setTimeout(() => {
        props.onContinue();
      }, 1000); // Wait 1 second after completion before calling onContinue
    };

    loadItems();
  }, [props.onContinue]);

  const getItemStatus = (index: number) => {
    const itemNumber = index + 1;

    if (completedItems.includes(itemNumber)) {
      return "completed";
    } else if (currentLoading === itemNumber) {
      return "loading";
    } else {
      return "pending";
    }
  };

  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }, (_, i) => (
      <span key={i} className="text-yellow-400 text-lg">
        ★
      </span>
    ));
  };

  const renderProgressIndicator = () => {
    return (
      <div className="flex items-center justify-center gap-1 mt-6">
        {[0, 1, 2].map((index) => (
          <div key={index} className="flex items-center">
            {index === currentSlide ? (
              // Active state - Pill shape
              <div className="w-6 h-2 bg-[#363946] rounded-full shadow-sm"></div>
            ) : (
              // Pending state - Circle
              <div className="w-2 h-2 bg-[#D9D9D9] rounded-full shadow-sm"></div>
            )}
            {index < 2 && <div className="w-2 h-0.5 bg-transparent"></div>}
          </div>
        ))}
      </div>
    );
  };

  return (
    <div className="flex flex-col items-center justify-between  h-full px-5 overflow-y-auto">
      <div className="flex flex-col gap-6 w-full max-w-md">
        <span className="text-center text-[#2D3142] font-[600] text-[20px] leading-[32px] mb-6">
          Personalizing Your Plan
        </span>

        <div className="flex flex-col gap-6 w-full max-w-md">
          {loadingItems.map((item, index) => {
            const status = getItemStatus(index);

            return (
              <div key={index} className="flex items-center gap-4">
                {/* Status Indicator */}
                <div className="relative w-6 h-6">
                  {status === "completed" && (
                    <div className="w-6 h-6 bg-[#f5e4eb] rounded-full flex items-center justify-center p-1">
                      <Image
                        src="/assets/icTickRed.svg"
                        alt="icTickRed"
                        width={24}
                        height={24}
                      />
                    </div>
                  )}

                  {status === "loading" && (
                    <div className="w-6 h-6 border-2 border-[#FF3D60] rounded-full border-t-transparent animate-spin"></div>
                  )}

                  {status === "pending" && (
                    <div className="w-6 h-6 border-2 border-[#f5e4eb] rounded-full"></div>
                  )}
                </div>

                {/* Text */}
                <span className="text-[#2D3142] font-[500] text-[16px] leading-[24px]">
                  {item}
                </span>
              </div>
            );
          })}
        </div>
      </div>
      {/* Testimonial Carousel */}
      <div className="w-full max-w-sm mb-8">
        <Slider {...sliderSettings}>
          {testimonialCards.map((card, index) => (
            <div key={index} className="px-2">
              <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
                <div className="flex justify-between items-start mb-3">
                  <span className="text-[#2D3142] font-[700] text-[16px] leading-[20px]">
                    {card.title}
                  </span>
                  <span className="text-[#9C9EB9] font-[400] text-[14px] leading-[20px]">
                    {card.reviewer}
                  </span>
                </div>

                <div className="flex mb-3">{renderStars(card.rating)}</div>

                <span className="text-[#2D3142] font-[400] text-[14px] leading-[20px] text-start">
                  {card.content}
                </span>
              </div>
            </div>
          ))}
        </Slider>

        {/* Custom Progress Indicator */}
        {renderProgressIndicator()}
      </div>
    </div>
  );
}
