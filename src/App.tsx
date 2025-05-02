import { ToastContainer } from "react-toastify"
import Home from "./pages/Home"
import "./mediaQueries.css";


function App() {

  return (
    <>
      <Home/>
      <ToastContainer autoClose={3000} />
    </>
  )
}

export default App
