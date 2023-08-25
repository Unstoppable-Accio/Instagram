import React from "react"; 
import "./App.css";
import SignUp from "./Components/SignUp";
import Login from "./Components/Login";
import Dashboard from "./Components/Dashboard";

import UploadImage from "./Components/UploadImage";


import {Routes, Route} from "react-router-dom";


const App = () => {


    return(
        <div>
            <UploadImage/>
            {/* <Routes>

                <Route path="/" element={<SignUp/>} />
                <Route path="/login" element={<Login/>} />
                <Route path="/dashboard" element={<Dashboard/>} />


            </Routes> */}
        </div>
    )
}

export default App;