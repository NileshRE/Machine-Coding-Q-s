import FileExplorer from "@components/Features/File-explorer/file-explorer";
import OtpInput from "@components/Features/Otp-Input/otpInput";
import ProgressBar from "@components/Features/Progress-bar/ProgressBar";
import { componentsEnum } from "@utils/enums";
import { JSX, useState } from "react";
import Heading from "./Heading";

const ComponentMap: Record<componentsEnum, JSX.Element> = {
  [componentsEnum.PROGRESSBAR]: (
    <>
      <Heading heading="Progress Bars" />
      <div className="flex flex-col gap-y-4 mx-6 mt-24">
        <ProgressBar width={60} />
        <ProgressBar width={80} />
        <ProgressBar width={15} />
      </div>
    </>
  ),
  [componentsEnum.OTPINPUT]: <OtpInput />,
  [componentsEnum.FILEEXPLORER]: <FileExplorer />,
  [componentsEnum.ADVANCETODO]: <>Coming Soon..</>,
  [componentsEnum.COUNTDOWNTIMER]: <>Coming Soon...</>,
  [componentsEnum.EMICLACULATOR]: <>Coming Soon...</>,
  [componentsEnum.TICTACTOE]: <>Coming Soon...</>,
  [componentsEnum.GRIDLIGHTS]: <>Coming Soon...</>,
  [componentsEnum.MULTISTEPPERFORM]: <>Coming Soon...</>,
  [componentsEnum.PAGINATION]: <>Coming Soon...</>,
  [componentsEnum.SEARCH]: <>Coming Soon...</>,
  [componentsEnum.DRAGNDROP]: <>Coming Soon...</>,
  [componentsEnum.NESTEDCOMMENTS]: <>Coming Soon...</>,
  [componentsEnum.CHATAPP]: <>Coming Soon...</>,
};

const Tabs = () => {
  const [tabSelected, setTabSelected] = useState<componentsEnum>(
    componentsEnum.PROGRESSBAR
  );
  const handleTabSelection = (selectedTab: componentsEnum) => {
    setTabSelected(selectedTab);
  };
  const elementsLength = Object.entries(componentsEnum).length;

  return (
    <div>
      <div className="border rounded-full border-gray-400 w-fit mx-auto my-8">
        {Object.entries(componentsEnum)?.map(([key, label], index) => (
          <p
            key={key}
            data-testid={`tab-${label}`}
            className={`${
              tabSelected == label ? "bg-gray-800 text-white border-none" : ""
            } px-2 py-2 border-gray-400 border-x inline-flex text-xs cursor-pointer ${
              index == 0 ? "rounded-r-none rounded-full" : ""
            } ${
              index == elementsLength - 1 ? "rounded-l-none rounded-full" : ""
            }`}
            onClick={() => handleTabSelection(label as componentsEnum)}
          >
            {label}
          </p>
        ))}
      </div>
      {ComponentMap[tabSelected]}
    </div>
  );
};

export default Tabs;
