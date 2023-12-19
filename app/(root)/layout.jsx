
import "../globals.css";
import Wireframe from "@/components/Wireframe";

const RootLayout = function({ children }) {
  return (
    <html lang="en">
      <Wireframe/>
      <body className="theme-dark bg-primary">
        <header>
          <h1>MAIN LAYOUT</h1>
        </header>
        {children}
        <footer>
          <h2>MAIN FOOTER</h2>
        </footer>
      </body>
    </html>
  )
}

export default RootLayout;