// "use client";

// import { 
//   StatelessButton, 
//   StatefulLink, 
//   StatelessLink,
//   ButtonPresets,
// } from "@/components/Buttons/Buttons";

import Link from "next/link";
import Text from "@/components/Typography/Text";
import Nav from "./Nav";

const Header = function({
  children
}) {

  return (
    <header className="flex bg-landing-page-header-and-footer shadow-landing-page-header pb-3 sticky top-0 z-[99999] md:flex-row flex-col justify-between">
      {/* Heading Text */}
      <div className="flex flex-col items-center gap-2 p-5 mx-auto md:mx-0 sm:block">
        <h1 className="inline-block mr-3 text-6xl text-primary font-gf-2">
          <Link 
          href="/" 
          className="group">
            <span className="transition-all text-logo-first-half drop-shadow-logo-first-half group-hover:drop-shadow-logo-first-half-hover">Ra</span>
            <span className="transition-all text-logo-second-half drop-shadow-logo-second-half group-hover:drop-shadow-logo-second-half-hover">ven</span>
          </Link>
        </h1>

        <Text className="inline-block tracking-wide text-center text-md md:inline font-extralight h-fit">
          A powerful repository of 
          &nbsp;
          <a 
          href="https://www.wizard101.com/" 
          className="font-sans font-bold underline">
            Wizard101
          </a> 
          &nbsp;
          statistics
        </Text>
      </div>

      <Nav/>
    </header>
  );
}

export default Header;