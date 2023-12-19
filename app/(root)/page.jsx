
"use client";
/*
  This is the home page component, meaning it should remain a server-side component. Therefore,
  for button-testing purposes, we must create a client component that handles the interactivity logic
  between the user and the button, and nest the button in said client component.
*/
// import Button from '@/components/Buttons/Button'
// import ClientComponent from '@/components/ClientComponent'
import TestComponent from "@/components/TestComponent";
import Providers from "@/providers/TestProvider";

const LandingPage = function() {

  return (
    <div>
      <h1>Live Landing Page</h1>
      <Providers.FirstProvider value={{ id: "first" }}>
        <TestComponent/>
      </Providers.FirstProvider>

      <Providers.SecondProvider value={{ id: "second" }}>
        <TestComponent/>
      </Providers.SecondProvider>

      <Providers.ThirdProvider value={{ id: "third" }}>
        <TestComponent/>
      </Providers.ThirdProvider>

      {/* <TestComponent/> */}
    </div>
  )
}

export default LandingPage;
