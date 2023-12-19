"use client";

import Enum from "@/enum";
import { getGroupContext } from "@/util/contextController";

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
