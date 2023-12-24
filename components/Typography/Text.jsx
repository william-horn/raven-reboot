
import mergeClass from "@/util/mergeClass";
import React from "react";

const Text = React.forwardRef(function({ 
  children, 
  center,
  className: importedClassName={},
  ...rest
}, ref) {

  let className = {
    self: "custom-text leading-6 text-primary font-medium align-middle text-sm block"
  };

  if (center) {
    importedClassName.self += " text-center";
  }

  className = mergeClass(
    className,
    importedClassName
  );

  // todo: adapt line height to text size

  return (
    <p 
    ref={ref}
    className={className.self}
    {...rest}>
      {children}
    </p>
  );
});

Text.displayName = "Text"; // for ESlint
export default Text;

