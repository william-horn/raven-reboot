
import { twMerge } from "tailwind-merge";

const Page = function({
  children,
  className="",
}) {
  return (
    <main className={twMerge("h-screen", className)}>
      {children}
    </main>
  );
};

const Content = function({
  className="",
  children,
  max,
  large,
  medium,
  small,
  xsmall
}) {

  const C_max = <div className={"w-full px-2 " + className}>{children}</div>;
  const C_large = <div className={"w-full xl:w-[80%] lg:w-[85%] md:w-[95%] sm:w-[95%] mx-auto px-2 " + className}>{children}</div>;
  const C_medium = <div className={"w-full xl:w-[70%] lg:w-[80%] md:w-[80%] sm:w-[85%] mx-auto px-2 " + className}>{children}</div>;
  const C_small = <div className={"w-full xl:w-[40%] lg:w-[45%] md:w-[55%] sm:w-[65%] mx-auto px-2 " + className}>{children}</div>;
  const C_xsmall = <div className={"mx-auto xl:w-[30%] lg:w-[35%] md:w-[40%] sm:w-[50%] w-full px-2 " + className}>{children}</div>;

  const getContentDiv = () => {
    if (max) return C_max;
    if (large) return C_large;
    if (medium) return C_medium;
    if (small) return C_small;
    if (xsmall) return C_xsmall;

    return C_large;
  }

  return getContentDiv();
}

Page.Content = Content;

export default Page;