"use client";

// import ButtonGroup from "./Buttons/ButtonGroup";

// import { 
//   StatelessButton,
//   StatefulButton,
//   StatelessLinkButton,
//   StatefulLinkButton,
//   ButtonPresets
// } from "./Buttons/Buttons";

import { useContextController } from "@/util/contextController";
import mergeClass from "@/util/mergeClass";
import Providers from "@/providers/Providers";
import { useRef } from "react";
import Enum from "@/enum";

const TestButton = ({
  children,
  className: importedClassName={},
  state: importedState={},
  ...rest
}) => {

  const className = {
    self: "text-lg text-white"
  }

  const controller = useContextController({
    importedClassName,
    importedState,
    ...rest
  });

  const finalStyles = mergeClass(
    className,
    controller.importedClassName,
    controller.importedState
  );

  console.log("during BAD update:");
  controller.__updateState({ __newState: "YAS" });
  controller.__updateActiveData();
  // console.log("controller: ", controller);
  console.log("active: ", controller.__provider.activeData?.current);

  console.log("during GOOD update:");
  controller.__updateState({ __testState: true });
  controller.__updateActiveData();
  console.log("active: ", controller.__provider.activeData?.current);

  console.log("during GOOD update 2:");
  controller.__updateState({ __testState: false });
  controller.__updateActiveData();
  console.log("active: ", controller.__provider.activeData?.current);

  return (
    <button
    className={finalStyles.self}
    onClick={() => controller.onClick()}
    >
      {children}
    </button>
  )
}

const TestComponent = () => {
  // const context1 = useComponentContext(Enum.ProviderNames.FirstProvider);
  // const context2 = useComponentContext(Enum.ProviderNames.SecondProvider);
  // const context3 = useComponentContext(Enum.ProviderNames.ThirdProvider);

  // console.log("First context: ", context1);
  // console.log("Second context: ", context2);
  // console.log("Third context: ", context3);

  // console.log(Enum.ProviderNames.getEnumItems());
  const activeData = useRef({});
  const registeredIds = useRef({});
  
  const className = { self: "bg-red-500" };
  const importedState = { __groupSelected: true };


  return (
    <div>
      <Providers.FirstProvider 
      value={{ 
        registeredIds,
        activeData,
        className,
        importedState
      }}>
        <TestButton
        // ignoreContext
        onClick={d => console.log("got data: ", d)}
        className={{self: "bg-blue-500 w-[100px] h-[30px]"}}
        id="default"
        >
          Hello World
        </TestButton>
      </Providers.FirstProvider>
    </div>
  );
};

export default TestComponent;