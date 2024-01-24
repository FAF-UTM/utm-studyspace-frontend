
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useCookies } from "react-cookie";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";

export default function DashboardPage() {
    const goHome = () => {
        navigate('/');
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
                    toast(`Hi ${data.user} 🦄`, {
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
        <div style={{
            display: "flex",
            gap: "1px",
            WebkitFlexDirection: "column",
            alignItems: "center"
        }}>
            <h1>Dashboard</h1>

            <button onClick={goHome}>Home</button>
            <br/>
            <button onClick={logOut}>Log out</button>
            <ToastContainer/>

        </div>
    );
}
