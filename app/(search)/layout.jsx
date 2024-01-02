
import "../globals.css";
// import Wireframe from "@/components/Wireframe";
import { SpeedInsights } from "@vercel/speed-insights/next"
import Header from "./Header";
import Footer from "../(root)/Footer";

const DemoLayout = function({ children }) {
  return (
    <html lang="en">
      {/* <Wireframe/> */}

      {/* METADATA */}
      <head>
        <link rel="icon" type="image/x-icon" href="/images/logo3-128.png"/>
        <link rel="preconnect" href="https://fonts.googleapis.com"/>
        <link rel="preconnect" href="https://fonts.gstatic.com"/>
        <link href="https://fonts.googleapis.com/css2?family=Titan+One&display=swap" rel="stylesheet"/>
        <link href="https://fonts.googleapis.com/css2?family=Paytone+One&family=Titan+One&display=swap" rel="stylesheet"/>
        <link rel="icon" href="/favicon.webp"/>
      </head>

      <body className="theme-default bg-primary">
        {/* <Header/> */}
        {/* <Header/> */}

        {children}
        
        <Footer/>
        <SpeedInsights/>
      </body>
    </html>
  )
}

export default DemoLayout;