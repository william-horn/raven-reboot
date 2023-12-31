import { twMerge } from "tailwind-merge";
import React from "react";
import { getResponsiveTextSize } from "@/libs/utils/responsiveStyles";

const Text = React.forwardRef(function({ 
  children, 
  textSize="md",
  className: importedClassName="",
  ...rest
}, ref) {

  return (
    <p 
    ref={ref}
    className={twMerge(
      `${getResponsiveTextSize(textSize)} general-text leading-6 text-primary align-middle block`,
      importedClassName
    )}
    {...rest}>
      {children}
    </p>
  );
});

Text.displayName = "Text"; // for ESlint
export default Text;

