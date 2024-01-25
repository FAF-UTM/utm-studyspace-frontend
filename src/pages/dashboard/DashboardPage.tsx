
import  { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useCookies } from "react-cookie";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";



export default function DashboardPage() {
    const goHome = () => {
        navigate('/');
    };
    const goChat = () => {
        navigate('/chat');
    };
    const navigate = useNavigate();
    const [cookies,, removeCookie] = useCookies([]);
    useEffect(() => {
        const verifyUser = async () => {
            if (!cookies.jwt) {
                navigate("/login");
            } else {
                const { data } = await axios.post(
                    "http://localhost:4000",
                    {},
                    {
                        withCredentials: true,
                    }
                );
                if (!data.status) {
                    removeCookie("jwt");
                    navigate("/login");
                } else
                    toast(`Hi ${data.user} `, {
                        theme: "dark",
                    });
            }
        };
        verifyUser();
    }, [cookies, navigate, removeCookie]);

    const logOut = () => {
        removeCookie("jwt");
        navigate("/login");
    };
    return (
        <div className="container" style={{
            display: "flex",
            gap: "1px",
            WebkitFlexDirection: "column",
            alignItems: "center"
        }}>

            <h2>Dashboard</h2>
            <h3>UTM StudySpace</h3>
            <img style={{
                width: "150px",
                height: "auto",
                margin: "10px",
                border: "1px solid #888888",
                borderRadius: "20px"
            }} src="/logo.svg" alt="StudySpace"/>
            <br/>
            <span>
            <button onClick={goHome}>Home</button>
                &nbsp;&nbsp;
                <button onClick={goChat}>Chat</button>
                &nbsp;&nbsp;
                <button onClick={goHome}>Hub</button>
                &nbsp;&nbsp;
                <button>Stream</button>


    </span>
            <br/> <br/>
            <button onClick={logOut}>Log out</button>
            <ToastContainer/>

        </div>
    );
}
