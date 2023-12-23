
import "../globals.css";
import Link from "next/link";

import Wireframe from "@/components/Wireframe";
import Nav from "@/components/Pages/root/Nav";
import Header from "@/components/Pages/root/Header";
import Heading from "@/components/Typography/Heading";
import Footer from "@/components/Pages/root/Footer";
import Text from "@/components/Typography/Text";

const RootLayout = function({ children }) {
  return (
    <html lang="en">
      <Wireframe/>

      {/* METADATA */}
      <head>
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