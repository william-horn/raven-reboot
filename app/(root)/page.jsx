

/*
  This is the home page component, meaning it should remain a server-side component. Therefore,
  for button-testing purposes, we must create a client component that handles the interactivity logic
  between the user and the button, and nest the button in said client component.
*/
// import Button from '@/components/Buttons/Button'
// import ClientComponent from '@/components/ClientComponent'
import TestComponent from "@/components/TestComponent";

const LandingPage = function() {

  return (
    <div>
      <h1>Live Landing Page</h1>
      <TestComponent/>
    </div>
  )
}

export default LandingPage;
