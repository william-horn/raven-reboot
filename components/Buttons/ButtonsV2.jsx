
import { useState } from "react";
import { useContextController } from "@/util/contextController";
import Icon from "../Graphics/Icon";
import mergeClass from "@/util/mergeClass";
import emptyFunc from "@/util/emptyFunc";

// ============================ //
// ----- COMPONENT STYLES ----- //
// ============================ //
const className = {
  // the outer-most element of the button, or "master element"
  self: "bg-button-primary text-primary inline-flex items-center align-middle rounded justify-center transition-colors w-fit text-sm px-1 hover:bg-button-hover-primary",

  // the inner-container sitting between the outer-layer and button content
  inner: {
    self: "py-2 px-1",
  },

  leftIcon: {
    self: "",
    image: {
      self: "invert",
    }
  },

  rightIcon: {
    self: "",
    image: {
      self: "invert",
    }
  },

  __selected: {
    self: "bg-green-500 hover:bg-green-600"
  }
}

// alias for button base class (in case another 'className' is used in a local namespace)
const baseClass = className;

// button style presets for ease of use
export const ButtonPresets = {

  blendIn: ((className={
    self: "bg-transparent hover:bg-transparent rounded-none",

    inner: { 
      self: "p-0" 
    }
  }) => mergeClass(baseClass, className))(),

  sharpBorder: ((className={
    self: "rounded-none",
  }) => mergeClass(baseClass, className))(),

}

const renderIcon = (icon, iconClass) => {
  if (icon) {
    return (
      <Icon 
      className={iconClass}
      utility 
      src={icon}
      />
    );
  }
}

const renderButtonContent = (controller, className, children) => {
  const {
    leftIcon,
    rightIcon,
    rightIconSelected,
    leftIconSelected,
    rightIconHovered,
    leftIconHovered,
  } = controller;

  const state = controller.__getState();
  const selected = controller.__isSelected();
  const hovered = state.__hovered;

  const activeLeftIcon = (selected && leftIconSelected) 
    || (hovered && leftIconHovered)
    || leftIcon;

  const activeRightIcon = (selected && rightIconSelected) 
    || (hovered && rightIconHovered) 
    || rightIcon;

  return (
    <>
      {renderIcon(className.leftIcon.src || activeLeftIcon, className.leftIcon)}

      <span className={className.inner.self}>
        {children}
      </span>

      {renderIcon(className.rightIcon.src || activeRightIcon, className.rightIcon)}
    </>
  );
}

export const StatelessButton = function({
  children,
  className: importedClassName={},
  state: importedState={},
  ...rest
}) {

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

  return (
    <button 
    className={finalStyles.self}
    onClick={() => controller.onClick()}
    >
      {renderButtonContent(controller, finalStyles, children)}
    </button>
  )
};

export const StatefulButton = function({
  children,
  onClick=emptyFunc,
  defaultSelected=false,
  ...rest
}) {

  const [selected, setSelected] = useState(defaultSelected);
  const [hovered, setHovered] = useState(false);

  const _onClick = (eventData) => {
  }

  return (
    <StatelessButton
    // onMouseEnter={() => setHovered(true)}
    // onMouseLeave={() => setHovered(false)}
    onClick={_onClick}
    state={{ __selected: selected, __hovered: hovered }}
    {...rest}
    >
      {children}
    </StatelessButton>
  )
};