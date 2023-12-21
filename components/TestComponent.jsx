"use client";

// import ButtonGroup from "./Buttons/ButtonGroup";

// import { 
//   StatelessButton,
//   StatefulButton,
//   StatelessLinkButton,
//   StatefulLinkButton,
//   ButtonPresets
// } from "./Buttons/Buttons";

import ButtonGroup from "./Buttons/ButtonGroup";
import { useContextController } from "@/util/contextController";
import mergeClass from "@/util/mergeClass";
import Providers from "@/providers/Providers";
import { useRef } from "react";
import Enum from "@/enum";

const className = {
  self: "text-lg text-white"
}

const TestButton = ({
  children,
  className: importedClassName={},
  state: importedState={},
  ...rest
}) => {

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

  // console.log("controller: ", controller);
  // console.log("final styles: ", finalStyles);

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
  // const activeData = useRef({});
  // const registeredIds = useRef({});
  
  // const className = { self: "bg-red-500" };
  // const importedState = { __groupSelected: true };


  return (
    <div>
      <ButtonGroup
      // selectionLimit={1}
      defaultSelect={["asd"]}
      unselectLastChoice
      onClick={(data) => console.log("group click: ", data)}
      // value={{ 
      //   registeredIds,
      //   activeData,
      //   className,
      //   importedState
      // }}
      >
        <TestButton
        // ignoreContext
        onClick={d => console.log("got data: ", d)}
        onSelect={() => console.log("selected 5")}
        className={{self: "bg-blue-500 w-[100px]"}}
        // id="default"
        >
          Hello World
        </TestButton>

        <TestButton
        // ignoreContext
        onClick={d => {console.log("got data: ", d); return true}}
        className={{self: "bg-blue-500 w-[100px]"}}
        onSelect={() => console.log("SELECTED FIRST TIME")}
        state={{__groupSelected: false}}
        id="asd"
        >
          Goodbye World
        </TestButton>
      </ButtonGroup>
    </div>
  );
};

export default TestComponent;