"use client";

import { 
  StatelessButton, 
  StatefulLink, 
  StatelessLink,
  ButtonPresets,
} from "@/components/Buttons/Buttons";

import Link from "next/link";
import Text from "@/components/Typography/Text";

const Header = function({
  children
}) {

  return (
    <header className="bg-secondary">

      {/* Heading Text */}
      <h1 
      className="p-4 text-6xl text-logo-third font-logo-2">
        <span className="text-logo-secondary">Ra</span>ven
        <span className="ml-3 text-sm tracking-wide text-logo">
          A repository of 
          &nbsp;
          <StatelessLink href="https://www.wizard101.com/" 
          className={ButtonPresets.underlineLink}>
            Wizard101
          </StatelessLink> 
          &nbsp;
          statistics
        </span>
      </h1>

    </header>
  );
}

export default Header;