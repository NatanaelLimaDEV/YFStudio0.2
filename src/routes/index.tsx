import { Route, Routes } from "react-router-dom"
import Form from "../pages/Form"


function RoutesApp(){
    return (
        <Routes>
            <Route path="/" element={ <Form/> } />
        </Routes>
    )
}

export default RoutesApp