
const responsiveTextSizes = {
  "3xl": "xl:text-3xl lg:text-3xl md:text-2xl sm:text-2xl text-2xl",
  "2xl": "xl:text-2xl lg:text-2xl md:text-xl sm:text-xl text-xl",
  "xl": "xl:text-xl lg:text-xl text-lg",
  "lg": "xl:text-lg lg:text-lg md:text-md",
  "md": "xl:text-md lg:text-md md:text-sm text-sm",
  "sm": "text-sm",
  "xs": "text-xs"
}

const responsivePadding = {
  "3xl": "xl:p-6 lg:p-5 md:p-4 sm:p-4 p-3",
  "2xl": "xl:p-5 lg:p-5 md:p-4 sm:p-3 p-2",
  "xl": "xl:p-4 lg:p-4 md:p-3 sm:p-2 p-2",
  // "lg"
  // "md"
  // "sm"
}

const responsiveDividerSize = {
  horizontal: {
    "3xl": "xl:h-28 lg:h-24 md:h-20 sm:h-16 h-16",
    "2xl": "xl:h-24 lg:h-20 md:h-16 sm:h-14 h-12",
    "xl": "xl:h-20 lg:h-16 md:h-14 sm:h-12 h-10",
    "lg": "xl:h-16 lg:h-14 md:h-12 sm:h-10 h-8",
    "md": "xl:h-14 lg:h-12 md:h-10 sm:h-8 h-6",
  },

  vertical: {
    "3xl": "xl:w-28 lg:w-24 md:w-20 sm:w-16 w-16",
    "2xl": "xl:w-24 lg:w-20 md:w-16 sm:w-14 w-12",
    "xl": "xl:w-20 lg:w-16 md:w-14 sm:w-12 w-12",
  }
}

const responsiveContainerWidths = {
  "max": "w-full",
  "xl": "w-full xl:w-[95%] lg:w-[95%] md:w-[97%] sm:w-[97%]",
  "lg": "w-full xl:w-[88%] lg:w-[88%] md:w-[92%] sm:w-[92%]",
  "md": "w-full xl:w-[75%] lg:w-[80%] md:w-[85%] sm:w-[92%]",
  "sm": "w-full xl:w-[60%] lg:w-[65%] md:w-[70%] sm:w-[80%]",
  "xs": "w-full xl:w-[45%] lg:w-[55%] md:w-[70%] sm:w-[80%]",
}

export const getResponsiveDividerSize = (direction, size) => {
  return responsiveDividerSize[direction][size];
}

export const getResponsivePadding = (size) => {
  return responsivePadding[size];
}

export const getResponsiveTextSize = (textSize) => {
  return responsiveTextSizes[textSize];
}

export const getResponsiveContainerWidth = (width) => {
  return responsiveContainerWidths[width];
}