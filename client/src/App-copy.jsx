import Footer from "./pages/sales/footer/footer.jsx"
import Header from "./pages/sales/header/header.jsx"
import HomeRouters from "./pages/sales/routers/Routers.jsx"


function App() {

  return (
    <div>
  
      {/* Header section */}
    <Header/>
      {/* Router section  */}
    <HomeRouters/>
    {/* Footer section */}
    <Footer/>
    </div>
  )
}

export default App
