import { BrowserRouter } from "react-router-dom"
import { ToastContainer } from "react-toastify"
import Home from "./pages/Home"


function App() {

  return (
    <BrowserRouter>
      <Home/>
      <ToastContainer autoClose={3000} />
    </BrowserRouter>
  )
}

export default App
