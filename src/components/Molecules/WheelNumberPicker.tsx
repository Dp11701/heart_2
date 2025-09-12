import React, { useState, useEffect, useRef } from "react";
import "@/styles/WheelNumberPicker.css";

export interface WheelNumberPickerProps {
  max: number;
  min: number;
  ideal: number;
  unit: string;
  currentValue: number;
  onChangeValue: (value: number) => void;
}

export function WheelNumberPicker(props: WheelNumberPickerProps) {
  const [selectedValue, setSelectedValue] = useState(
    props.currentValue || props.ideal
  );
  const containerRef = useRef<HTMLDivElement>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [startY, setStartY] = useState(0);
  const [scrollOffset, setScrollOffset] = useState(0);
  const [touchStartTime, setTouchStartTime] = useState(0);
  const [lastTouchY, setLastTouchY] = useState(0);
  const [velocity, setVelocity] = useState(0);
  const [lastTouchTime, setLastTouchTime] = useState(0);

  const itemHeight = 60; // Height of each number item
  const visibleItems = 5; // Number of visible items - changed from 7 to 5
  const centerIndex = Math.floor(visibleItems / 2);

  useEffect(() => {
    // Calculate initial scroll position to center the ideal value
    const initialScroll = (props.ideal - props.min) * itemHeight;
    setScrollOffset(initialScroll);
  }, [props.ideal, props.min]);

  useEffect(() => {
    props.onChangeValue(selectedValue);
  }, [selectedValue]);

  const handleWheel = (e: React.WheelEvent) => {
    e.preventDefault();
    const delta = e.deltaY > 0 ? 1 : -1;
    const newValue = Math.max(
      props.min,
      Math.min(props.max, selectedValue + delta)
    );
    setSelectedValue(newValue);
  };

  const handleTouchStart = (e: React.TouchEvent) => {
    e.preventDefault();
    setIsDragging(true);
    setStartY(e.touches[0].clientY);
    setLastTouchY(e.touches[0].clientY);
    setTouchStartTime(Date.now());
    setLastTouchTime(Date.now());
    setVelocity(0);
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    if (!isDragging) return;
    e.preventDefault();

    const currentY = e.touches[0].clientY;
    const currentTime = Date.now();
    const deltaY = lastTouchY - currentY;
    const deltaTime = currentTime - lastTouchTime;

    // Calculate velocity for momentum
    if (deltaTime > 0) {
      setVelocity(deltaY / deltaTime);
    }

    // More sensitive touch movement
    const sensitivity = 0.5; // Adjust this value to make it more/less sensitive
    const deltaValue = Math.round((deltaY * sensitivity) / itemHeight);

    if (Math.abs(deltaValue) >= 1) {
      const newValue = Math.max(
        props.min,
        Math.min(props.max, selectedValue + deltaValue)
      );
      setSelectedValue(newValue);
      setLastTouchY(currentY);
      setLastTouchTime(currentTime);
    }
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    if (!isDragging) return;
    e.preventDefault();

    const touchDuration = Date.now() - touchStartTime;

    // Apply momentum if the touch was quick
    if (touchDuration < 300 && Math.abs(velocity) > 0.5) {
      const momentumSteps = Math.round(Math.abs(velocity) * 5); // Increased momentum
      const direction = velocity > 0 ? 1 : -1;

      let momentumValue = selectedValue;
      for (let i = 0; i < momentumSteps; i++) {
        momentumValue = Math.max(
          props.min,
          Math.min(props.max, momentumValue + direction)
        );
      }

      // Smooth animation to final value with easing
      const animateToValue = (
        targetValue: number,
        currentValue: number,
        step: number = 0
      ) => {
        if (step >= 10) {
          setSelectedValue(targetValue);
          return;
        }

        const progress = step / 10;
        const easeOut = 1 - Math.pow(1 - progress, 3); // Cubic ease-out
        const interpolatedValue = Math.round(
          currentValue + (targetValue - currentValue) * easeOut
        );

        setSelectedValue(interpolatedValue);

        setTimeout(() => {
          animateToValue(targetValue, interpolatedValue, step + 1);
        }, 16); // ~60fps-
      };

      animateToValue(momentumValue, selectedValue);
    }

    setIsDragging(false);
    setVelocity(0);
  };

  const handleClick = (value: number) => {
    if (!isDragging) {
      setSelectedValue(value);
    }
  };

  const generateNumbers = () => {
    const numbers = [];
    for (let i = -2; i <= 2; i++) {
      const value = selectedValue + i;
      if (value >= props.min && value <= props.max) {
        numbers.push(value);
      } else {
        numbers.push(null); // placeholder for out-of-range values
      }
    }
    return numbers;
  };

  const getItemStyle = (value: number | null) => {
    if (value === null) {
      return {
        height: `${itemHeight}px`,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        visibility: "hidden" as const, // <-- add 'as const' here
      };
    }

    const distance = Math.abs(value - selectedValue);
    let fontSize = 20;
    let fontWeight = "normal";
    let color = "#59617A";

    if (distance === 0) {
      fontSize = 24;
      fontWeight = "bold";
      color = "#3A79D8";
    } else if (distance === 1) {
      fontSize = 20;
      color = "#59617A";
    } else if (distance === 2) {
      fontSize = 16;
      color = "#CDD0D6";
    }

    return {
      fontSize: `${fontSize}px`,
      fontWeight,
      color,
      height: `${itemHeight}px`,
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
    };
  };

  const getItemClassName = (value: number) => {
    const distance = Math.abs(value - selectedValue);
    return `number-item ${distance === 0 ? "selected" : ""}`;
  };

  const getItemDataProps = (value: number) => {
    const distance = Math.abs(value - selectedValue);
    return {
      "data-diff": distance.toString(),
    };
  };

  return (
    <div className="wheel-picker-container">
      <div
        className="wheel-picker"
        ref={containerRef}
        onWheel={handleWheel}
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
      >
        {/* Numbers list */}
        <div className="numbers-container">
          {generateNumbers().map((value, index) => (
            <div
              key={index}
              className={
                value !== null ? getItemClassName(value) : "number-item"
              }
              style={getItemStyle(value)}
              onClick={() => value !== null && handleClick(value)}
              {...(value !== null ? getItemDataProps(value) : {})}
            >
              {value !== null && (
                <>
                  <div className="number-value">{value}</div>
                  {value === selectedValue && (
                    <span className="unit-text">{props.unit}</span>
                  )}
                </>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
