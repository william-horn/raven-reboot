

const Page = function({
  children,
}) {
  return (
    <main className="h-screen">
      {children}
    </main>
  );
};

const Content = function({
  children,
  max,
  large,
  medium,
  small,
  xsmall
}) {

  const Cmax = <div className="w-full">{children}</div>;
  const Clarge = <div className="w-full xl:w-[80%] lg:w-[85%] md:w-[95%] sm:w-[95%] mx-auto">{children}</div>;
  const Cmedium = <div className="w-full xl:w-[70%] lg:w-[80%] md:w-[80%] sm:w-[85%] mx-auto">{children}</div>;
  const Csmall = <div className="w-full xl:w-[40%] lg:w-[45%] md:w-[55%] sm:w-[65%] mx-auto">{children}</div>;
  const Cxsmall = <div className="mx-auto xl:w-[30%] lg:w-[35%] md:w-[40%] sm:w-[50%] w-full">{children}</div>;

  const getContentDiv = () => {
    if (max) return Cmax;
    if (large) return Clarge;
    if (medium) return Cmedium;
    if (small) return Csmall;
    if (xsmall) return Cxsmall;

    return Clarge;
  }

  return getContentDiv();
}

Page.Content = Content;

export default Page;