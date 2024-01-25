import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { useCookies } from "react-cookie";
import { ToastContainer, toast } from "react-toastify";
import { GoogleLogin, GoogleLoginResponse, GoogleLoginResponseOffline } from 'react-google-login';

export default function LoginPage() {

    const [cookies] = useCookies(['jwt']);
    const navigate = useNavigate();

    useEffect(() => {
        if (cookies.jwt) {
            navigate("/dashboard");
        }
    }, [cookies, navigate]);


    const [values, setValues] = useState({ email: "", password: "" });
    const [values_test] = useState({ email: "test@gmail.com", password: "12345678" });



    const generateError = (error: string) =>
        toast.error(error, {
            position: "bottom-right",
        });

    const delay = (ms: number | undefined) => new Promise(resolve => setTimeout(resolve, ms));

    const trygoogle = async () => {
        await delay(3000); // Introduce a 3-second delay before the functionality runs

        try {
            const { data } = await axios.post(
                "http://localhost:4000/login",
                {
                    ...values_test,
                },
                { withCredentials: true }
            );
            if (data) {
                // Add your code here to handle the 'data' response.
            }
        } catch (ex) {
            console.log(ex);
        }
    };

    const handleGoogleLogin = async (response: GoogleLoginResponse | GoogleLoginResponseOffline) => {
        // GoogleLoginResponseOffline is used only when accessType is set to 'offline'
        if ('tokenId' in response) {
            try {
                await axios.post('http://localhost:4000/google-login', {
                    token: response.tokenId,
                }, { withCredentials: true });

                navigate("/dashboard");
            } catch (error) {
                console.error("eee",error);
            }
        }


    };
    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        try {
            const { data } = await axios.post(
                "http://localhost:4000/login",
                {
                    ...values,
                },
                { withCredentials: true }
            );
            if (data) {
                if (data.errors) {
                    const { email, password } = data.errors;
                    if (email) generateError(email);
                    else if (password) generateError(password);
                } else {
                    navigate("/dashboard");

                }
            }
        } catch (ex) {
            console.log(ex);
        }
    };


    return (
        <div className="container">
            <h2>Login to your Account</h2>
            <form onSubmit={(e) => handleSubmit(e)}>
                <div>
                    <label htmlFor="email">Email</label>
                    <input
                        type="email"
                        name="email"
                        placeholder="Email"
                        onChange={(e) =>
                            setValues({
                                ...values,
                                [e.target.name]: e.target.value
                            })
                        }
                    />
                </div>
                <div>
                    <label htmlFor="password">Password</label>
                    <input
                        type="password"
                        placeholder="Password"
                        name="password"
                        onChange={(e) =>
                            setValues({
                                ...values,
                                [e.target.name]: e.target.value
                            })
                        }
                    />
                </div>
                <button type="submit">Submit</button>


<div onClick={trygoogle}>
                <GoogleLogin
                    clientId="83916231719-cj5crdn7vptmpe22rp5ms96akdimtgr2.apps.googleusercontent.com"
                    buttonText="Login with Google"
                    onSuccess={handleGoogleLogin}
                    onFailure={handleGoogleLogin}
                    cookiePolicy={'single_host_origin'}
                />
</div>
                <span>
          Don't have an account ?<Link to="/register"> Register </Link>
        </span>
            </form>
            <ToastContainer/>
        </div>
    );
}
