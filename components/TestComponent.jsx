"use client";

// import ButtonGroup from "./Buttons/ButtonGroup";

// import { 
//   StatelessButton,
//   StatefulButton,
//   StatelessLinkButton,
//   StatefulLinkButton,
//   ButtonPresets
// } from "./Buttons/Buttons";

import { useComponentContext } from "@/providers/TestProvider";
import { getGroupContext } from "@/util/contextController";

import Enum from "@/enum";

const TestComponent = () => {
  // const context1 = useComponentContext(Enum.ProviderNames.FirstProvider);
  // const context2 = useComponentContext(Enum.ProviderNames.SecondProvider);
  // const context3 = useComponentContext(Enum.ProviderNames.ThirdProvider);

  // console.log("First context: ", context1);
  // console.log("Second context: ", context2);
  // console.log("Third context: ", context3);

  // console.log(Enum.ProviderNames.getEnumItems());

  const context = getGroupContext(true);

  console.log("current context: ", context);

  return (
    <div>
      <h1>Test component</h1>
    </div>
  );
};

export default TestComponent;