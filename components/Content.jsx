
import { twMerge } from "tailwind-merge";
import { getResponsiveContainerWidth } from "@/libs/utils/responsiveStyles";

const Content = function({
  children,
  span,
  className: importedClassName="",
  ...rest
}) {

  return (
    <div
    className={`content ${twMerge(getResponsiveContainerWidth(span) || "", importedClassName)}`}
    {...rest}
    >
      {children}
    </div>
  );
}

export default Content;

