import Header from "./Header";
import Footer from "./Footer";
const Layout = ({children}) => {
  return (
      <div>
          <Header />
          <main style={{ minHeight: "90vw" }}>{children }</main>
          <Footer />
    </div>
  )
}

export default Layout;