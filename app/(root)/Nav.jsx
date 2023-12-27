
"use client";

import { StatelessButton, StatefulLink } from "@/components/Buttons/Buttons";
import { useRouter, usePathname } from "next/navigation";
import ButtonGroup from "@/components/Buttons/ButtonGroup";

const NavLink = function({
  children,
  ...rest
}) {
  return (
    <StatefulLink
    className={{
      self: "transition-all",
      __locallySelected: {
        self: "translate-y-2 rounded-b-none bg-primary hover:bg-primary underline transition-all"
      } 
    }}
    {...rest}>
      {children}
    </StatefulLink>
  );
}

const NavSection = function({
  children
}) {

  return (
    <div className="flex flex-wrap gap-2 px-3 py-2 w-fit after:">
      {children}
    </div>
  );
}

const Nav = function({
  children
}) {
  const path = usePathname();

  return (
    <nav className="sticky top-0 bg-primary z-[99999]">
      <NavSection>
        <NavLink leftIcon="/icons/home_icon.svg" href="/">Home</NavLink>
        <NavLink leftIcon="/icons/menu_book_icon.svg" href="/about">About Us</NavLink>
        <NavLink leftIcon="/icons/world_icon.svg" href="/stats">Raven News</NavLink>
      </NavSection>
    </nav>
  );
}

export default Nav;