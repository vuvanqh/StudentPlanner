import { Outlet, useNavigate } from "react-router-dom"
import Navbar from "../../components/layout/Navbar"
import Calendar from "../../components/calendar/Calendar";
import { queryClient } from "../../api/queryClient";
import type { loginResponse } from "../../types/authTypes";
import {useGetAllPersonalEvents} from "../../hooks/personalEventHooks"

export default function StudentPage(){
    const navigate = useNavigate();
    const user: loginResponse | undefined = queryClient.getQueryData(['user']);
    const {events} = useGetAllPersonalEvents();

    if(user===undefined)
    {
        navigate("/");
        return null;
    }

    return <>
        <Navbar>
                <div>
                    <div>
                        <h1>Welcome {user.firstName} {user.lastName}</h1>
                    </div>
                </div>
                <div>
                    <button onClick={()=>navigate("/register")}>Register</button>
                    <button onClick={()=>navigate("/")}>Log out</button>
                </div>
        </Navbar>
        <main className="main-content">
            <Calendar events={events}/>
        </main>
        <Outlet/>
    </>
} 