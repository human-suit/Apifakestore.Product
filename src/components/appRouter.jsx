import React from "react";
import { Routes, Route } from "react-router-dom"
import In from "./input";
// import Start from "./registrer";
import Main_stage from "./main_stage";

const AppRoutes = () =>(
    <Routes>
        <Route path="/" element = { <Main_stage /> } />
        <Route path="/login" element = { <In /> } />
    </Routes>
    
)

export default AppRoutes