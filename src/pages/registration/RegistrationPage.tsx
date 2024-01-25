import { useState } from "react";
import { toast, ToastContainer, ToastPosition } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import ReCAPTCHA from "react-google-recaptcha";

export default function RegistrationPage() {
    const navigate = useNavigate();
    const [values, setValues] = useState({
        username: "",
        email: "",
        password: "",
        confirmPassword: "",
    });
    const [captchaToken, setCaptchaToken] = useState<string | null>(null);

    const onCaptchaChange = (token: string | null) => {
        setCaptchaToken(token);
    };


    const toastOptions = {
        position: "bottom-right" as ToastPosition,
        autoClose: 8000,
        pauseOnHover: true,
        draggable: true,
    };

    const isStrongPassword = (password: string): boolean => {
        const regex = new RegExp("^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)[a-zA-Z\\d]{8,}$");
        return regex.test(password);
    };

    const handleValidation = () => {
        const { password, confirmPassword, username, email } = values;
        if (password !== confirmPassword) {
            toast.error("Password and confirm password should be same.", toastOptions);
            return false;
        } else if (username.length < 3) {
            toast.error("Username should be greater than 3 characters.", toastOptions);
            return false;
        } else if (!isStrongPassword(password)) {
            toast.error("Password should be stronger. It must contain at least one uppercase letter, one lowercase letter, and one number.", toastOptions);
            return false;
        } else if (email === "") {
            toast.error("Email is required.", toastOptions);
            return false;
        }

        return true;
    };

    const handleSubmit = async (e: { preventDefault: () => void; }) => {
        e.preventDefault();

        if (!captchaToken) {
            toast.error("Please complete the reCAPTCHA challenge.", toastOptions);
            return;
        }

        if (handleValidation()) {
            try {
                const { username, email, password } = values;
                const { data } = await axios.post(
                    "http://localhost:4000/register",
                    {
                        username,
                        email,
                        password,
                        captchaToken // Send the token to your backend
                    },
                    { withCredentials: true }
                );

                console.log(data);
                navigate("/dashboard");
            } catch (err) {
                console.log(err);
            }
        }
    };

    return (
        <div className="container">
            <h2>Register Account</h2>
            <form onSubmit={handleSubmit}>
                {/* Email Input */}
                <div>
                    <label htmlFor="email">Email</label>
                    <input
                        type="email"
                        name="email"
                        placeholder="Email"
                        onChange={(e) =>
                            setValues({
                                ...values,
                                [e.target.name]: e.target.value,
                            })
                        }
                    />
                </div>

                {/* Username Input */}
                <div>
                    <label htmlFor="username">Username</label>
                    <input
                        type="text"
                        name="username"
                        placeholder="username"
                        onChange={(e) =>
                            setValues({
                                ...values,
                                [e.target.name]: e.target.value,
                            })
                        }
                    />
                </div>

                {/* Password Input */}
                <div>
                    <label htmlFor="password">Password</label>
                    <input
                        type="password"
                        placeholder="Password"
                        name="password"
                        onChange={(e) =>
                            setValues({
                                ...values,
                                [e.target.name]: e.target.value,
                            })
                        }
                    />
                </div>

                {/* Confirm Password Input */}
                <div>
                    <label htmlFor="confirmPassword">Confirm Password</label>
                    <input
                        type="password"
                        placeholder="Confirm Password"
                        name="confirmPassword"
                        onChange={(e) =>
                            setValues({
                                ...values,
                                [e.target.name]: e.target.value,
                            })
                        }
                    />
                </div>

                {/* reCAPTCHA Component */}
                <ReCAPTCHA
                    sitekey="6Ld-7VspAAAAAPp--pZYcMqanMMUfMtIMfDjNEQN" // Replace with your reCAPTCHA site key
                    onChange={onCaptchaChange}
                />

                {/* Submit Button */}
                <button type="submit">Submit</button>
                <span>
                    Already have an account ? <Link to="/login">Login</Link>
                </span>
            </form>
            <ToastContainer />
        </div>
    );
}
