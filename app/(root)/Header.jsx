// "use client";

// import { 
//   StatelessButton, 
//   StatefulLink, 
//   StatelessLink,
//   ButtonPresets,
// } from "@/components/Buttons/Buttons";

import Link from "next/link";
import Text from "@/components/Typography/Text";

const Header = function({
  children
}) {

  return (
    <header className="flex bg-secondary">

      {/* Heading Text */}
      <h1 className="p-4 text-6xl text-primary font-gf-2">
        <Link 
        href="/" 
        className="group">
          <span className="transition-all text-logo-first-half group-hover:drop-shadow-logo-first-half-hover">Ra</span>
          <span className="transition-all text-logo-second-half group-hover:drop-shadow-logo-second-half-hover">ven</span>
        </Link>
        
        <span className="ml-3 text-sm tracking-wide">
          A repository of 
          &nbsp;
          <a href="https://www.wizard101.com/" 
          className="font-sans underline text-hyperlink hover:text-hyperlink-hover">
            Wizard101
          </a> 
          &nbsp;
          statistics
        </span>
      </h1>

    </header>
  );
}

export default Header;