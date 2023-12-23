"use client";

import Enum from "@/enum";
import { getGroupContext } from "@/hooks/useContextController";

export const Component = function({
  children
}) {
  const context = getGroupContext();
  console.log("current context: ", context);

  return (
    <div>
      <p>Random Component</p>
      {children}
    </div>
  );
}
