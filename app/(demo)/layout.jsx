
import "../globals.css";

const DemoLayout = function({ children }) {
  return (
    <html lang="en">
      <body className="theme-dark bg-primary">
        <header>
          <h1>DEMO LAYOUT</h1>
        </header>
        {children}
        <footer>
          <h2>DEMO FOOTER</h2>
        </footer>
      </body>
    </html>
  )
}

export default DemoLayout;