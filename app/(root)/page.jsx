
"use client";
/*
  This is the home page component, meaning it should remain a server-side component. Therefore,
  for button-testing purposes, we must create a client component that handles the interactivity logic
  between the user and the button, and nest the button in said client component.
*/
// import Button from '@/components/Buttons/Button'
// import ClientComponent from '@/components/ClientComponent'
import TestComponent from "@/components/TestComponent";
import Providers from "@/providers/Providers";
import { useState, useRef } from "react";

const LandingPage = function() {
  const activeData = useRef({});
  const registeredIds = useRef({});
  
  const className = { self: "bg-red-500" };
  const importedState = { __groupSelected: true };

  return (
    <div>
      <h1>Live Landing Page</h1>
      {/* <Providers.FirstProvider value={{ id: "first" }}>
        <Providers.SecondProvider value={{ id: "second" }}>
          <TestComponent/>
        </Providers.SecondProvider>
      </Providers.FirstProvider> */}

      {/* <Providers.SecondProvider value={{ id: "second" }}>
        <TestComponent/>
      </Providers.SecondProvider>

      <Providers.ThirdProvider value={{ id: "third" }}>
        <TestComponent/>
      </Providers.ThirdProvider> */}

      {/* <TestComponent/> */}
      <Providers.FirstProvider 
      value={{ 
        registeredIds,
        activeData,
        className,
        importedState
      }}>
        <TestComponent/>
      </Providers.FirstProvider>
    </div>
  )
}

export default LandingPage;
