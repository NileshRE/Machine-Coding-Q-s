import { StepProps } from "src/schema";

const Form = ({ onNext, onPrev }: StepProps) => (
  <div>
    <p>Step Content</p>
    <button onClick={onPrev}>Previous</button>
    <button onClick={onNext}>Next</button>
  </div>
);

export default Form;
