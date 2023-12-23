
"use client";

import { StatelessButton } from "@/components/Buttons/Buttons";
import { useRouter, usePathname } from "next/navigation";

const Nav = function({
  children
}) {
  const path = usePathname();

  return (
    <nav className="sticky top-0 bg-secondary z-[99999]">
      <div className="flex flex-wrap justify-center gap-2 px-3 py-2">
        
      </div>
    </nav>
  );
}

export default Nav;