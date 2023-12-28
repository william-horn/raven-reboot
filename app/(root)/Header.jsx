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
    <header className="flex bg-primary">

      {/* Heading Text */}
      <h1 
      className="p-4 text-6xl text-logo-third font-logo-2">
        <Link 
        href="/" 
        className="group">
          <span className="text-logo-secondary group-hover:drop-shadow-[0_0_10px_#7d212d] transition-all">Ra</span>
          <span className="group-hover:drop-shadow-[0_0_10px_#7d5d21] transition-all">ven</span>
        </Link>
        
        <span className="ml-3 text-sm tracking-wide text-logo">
          A repository of 
          &nbsp;
          <a href="https://www.wizard101.com/" 
          className="underline text-primary">
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