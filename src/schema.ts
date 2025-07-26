export interface fileStrSchema {
  id: number;
  name: string;
  isFolder: boolean;
  children?: fileStrSchema[];
}

export type StepProps = {
  onPrev: () => void;
  onNext: () => void;
};

export type MultiStepperFormProps = {
  list: React.ReactElement<StepProps>[];
};
