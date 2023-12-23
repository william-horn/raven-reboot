
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
import Page from "@/components/Page";

const LandingPage = function() {
  return (
    <Page>
      
    </Page>
  )
}

export default LandingPage;
