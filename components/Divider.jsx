import { getResponsiveDividerSize } from "@/libs/utils/responsiveStyles";

import { twMerge } from "tailwind-merge";

const Divider = function({
  direction="horizontal",
  size="3xl",
  className=""
}) {
  return (
    <div 
    className={
      twMerge(
        `divider ${getResponsiveDividerSize(direction, size)}`,
         className
      )
    }>
    </div>
  );
}

export default Divider;