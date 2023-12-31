

import { StatefulLink } from "@/components/Buttons/Buttons";
import mergeClass from "@/libs/utils/mergeClass";
import { getResponsiveTextSize } from "@/libs/utils/responsiveStyles";

const NavLink = function({
  children,
  className: importedClassName={},
  ...rest
}) {

  return (
    <StatefulLink
    className={mergeClass({
      self: `${getResponsiveTextSize('lg')} transition-all whitespace-nowrap px-3 bg-navbar-button-primary hover:bg-navbar-button-primary-hover rounded-none`,
      __locallySelected: {
        self: "bg-navbar-button-primary-selected hover:bg-navbar-button-primary-selected-hover transition-all underline"
      } 
    }, importedClassName)}
    {...rest}>
      {children}
    </StatefulLink>
  );
}

const NavSection = function({
  children
}) {

  return (
    <div className="flex flex-wrap justify-center gap-2 px-3 py-2 sm:flex-nowrap">
      {children}
    </div>
  );
}

const Nav = function({
  children
}) {

  return (
    <nav className="flex flex-col items-center justify-end">
      <NavSection>
        <NavLink leftIcon="/icons/home_icon.svg" href="/">Home</NavLink>
        <NavLink leftIcon="/icons/menu_book_icon.svg" href="/about">About Us</NavLink>
        <NavLink leftIcon="/icons/world_icon.svg" href="/news" className={{ __locallySelected: { self: 'bg-navbar-button-secondary-selected hover:bg-navbar-button-secondary-selected-hover' }}}>Raven News</NavLink>
      </NavSection>
    </nav>
  );
}

export default Nav;