"use client";

import ButtonGroup from "./Buttons/ButtonGroup";

import { 
  StatelessButton,
  StatefulButton,
  StatelessLinkButton,
  StatefulLinkButton,
  ButtonPresets
} from "./Buttons/Buttons";

const TestComponent = () => {

  return (
    <div>
      <StatelessButton>Test</StatelessButton>

      <h1>Button Group:</h1>
      <ButtonGroup onClick={(data) => console.log("btn data: ", data)}>
        <StatelessButton id="one" something="lol" className={ButtonPresets.blendIn}>Test</StatelessButton>
        <StatelessButton id="two" className={ButtonPresets.sharpBorder}>Test</StatelessButton>
      </ButtonGroup>
    </div>
  );
};

export default TestComponent;