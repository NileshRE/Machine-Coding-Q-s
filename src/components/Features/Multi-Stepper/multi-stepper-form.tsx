import Heading from "@components/Common/Heading";
import React, { useState } from "react";
import { MultiStepperFormProps } from "src/schema";

const MultiStepperForm = ({ list }: MultiStepperFormProps) => {
  const [currentStep, setCurrentStep] = useState<number>(0);
  const stepsCount = list?.length;
  const steps = list.map((_, i) => (
    <div
      key={i}
      data-testid={`step-indicator-${i}`}
      className={`flex items-center justify-center w-8 h-8 rounded-full mx-2 ${
        currentStep >= i ? "bg-blue-500 text-white" : "bg-gray-300"
      }`}
      onClick={onNext}
    >
      {i + 1}
    </div>
  ));
  const progressLineWidth =
    stepsCount > 1 ? (100 / (list?.length - 1)) * currentStep : 0;
  const onPrev = () => {
    if (currentStep > 0) {
      setCurrentStep((prev) => prev - 1);
    }
  };
  const onNext = () => {
    if (currentStep !== stepsCount - 1) {
      setCurrentStep((prev) => prev + 1);
    }
  };
  return (
    <div data-testid="multi-stepper-form">
      <Heading heading="Multi-Stepper Form" />
      <section>
        <div>
          <div>{steps}</div>
          <div style={{ width: `${progressLineWidth}%` }}></div>
        </div>
        <div>{React.cloneElement(list[currentStep], { onPrev, onNext })}</div>
      </section>
    </div>
  );
};

export default MultiStepperForm;
