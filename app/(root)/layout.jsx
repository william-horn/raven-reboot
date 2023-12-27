
import "../globals.css";
import Link from "next/link";

import Wireframe from "@/components/Wireframe";
import Nav from "@/app/(root)/Nav";
import Header from "@/app/(root)/Header";
import Heading from "@/components/Typography/Heading";
import Footer from "@/app/(root)/Footer";
import Text from "@/components/Typography/Text";

const RootLayout = function({ children }) {
  return (
    <html lang="en">
      <Wireframe/>

      {/* METADATA */}
      <head>
        <link rel="icon" type="image/x-icon" href="/images/logo3-128.png"/>
        <link rel="preconnect" href="https://fonts.googleapis.com"/>
        <link rel="preconnect" href="https://fonts.gstatic.com"/>
        <link href="https://fonts.googleapis.com/css2?family=Titan+One&display=swap" rel="stylesheet"/>
        <link href="https://fonts.googleapis.com/css2?family=Paytone+One&family=Titan+One&display=swap" rel="stylesheet"/>
      </head>

      <body className="theme-dark bg-primary">
        <Header/>
        <Nav/>

        {children}
        
        <Footer/>
      </body>
    </html>
  )
}

export default RootLayout;