import { Outlet, useNavigate } from "react-router-dom"
import Navbar from "../../components/layout/Navbar"

export default function MainPage(){
    const navigate = useNavigate();

    return <>
        <Navbar>
                <div>
                    <div>
                        <h1>Student Planner</h1>
                    </div>
                </div>
                <div>
                    <button onClick={()=>navigate("/register")}>Register</button>
                    <button onClick={()=>navigate("/")}>Log out</button>
                </div>
        </Navbar>
        <Outlet/>
    </>
}