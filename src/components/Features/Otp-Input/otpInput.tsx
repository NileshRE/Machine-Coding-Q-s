import Heading from "@components/Common/Heading";
import Input from "@components/Common/Input";
import React, { useEffect, useRef, useState } from "react";

const OtpInput = () => {
  const otpDigits = 6;
  const [inputArr, setInputArr] = useState(new Array(otpDigits).fill(""));
  const refArr = useRef<Array<HTMLInputElement | null>>(new Array(otpDigits));
  const handleChange = (value: string, index: number) => {
    const numericVal = Number(value); // If not a number no action takes place
    if (isNaN(numericVal)) return;
    const newValue = value.trim();
    const newArr = [...inputArr];
    newArr[index] = newValue.slice(-1); // Takes the last number input
    setInputArr(newArr);
    // Handling next input focus on filling a input
    if (newValue.trim()) {
      refArr.current[index + 1]?.focus();
    }
  };
  // Handling prev input focus on backspace click
  const handleKeyDown = (
    e: React.KeyboardEvent<HTMLInputElement>,
    index: number
  ) => {
    if (e.key === "Backspace" && !inputArr[index]) {
      refArr.current[index - 1]?.focus();
    }
  };

  useEffect(() => {
    refArr.current[0]?.focus();
  }, []);
  return (
    <div data-testid="otp-input">
      <Heading heading="OTP Input" />
      <div className="flex items-center justify-center mt-24 gap-1">
        {inputArr.map((_, index) => (
          <>
            <label htmlFor={`otp-value-${index}`} className="sr-only">
              {" "}
              {/*  For accessibility */}
              OTP Value {index}
            </label>
            <Input
              key={`otp-value-${index}`}
              id={`otp-value-${index}`}
              aria-label={`otp-value-${index}`} // For accessibility
              ref={(el) => (refArr.current[index] = el)} // Mapping input values to ref
              value={inputArr[index]}
              onChange={(e) => handleChange(e.target.value, index)}
              onKeyDown={(e) => handleKeyDown(e, index)}
            />
          </>
        ))}
      </div>
    </div>
  );
};

export default OtpInput;
