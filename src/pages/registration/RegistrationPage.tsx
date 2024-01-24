import { useState, useEffect } from "react";
import { ToastContainer } from "react-toastify";
import {Link, useNavigate} from "react-router-dom";
import axios from "axios";
export default function RegistrationPage() {
    const navigate = useNavigate();
    const [values, setValues] = useState({ email: "", password: "" });
    useEffect(() => {

    });


    const handleSubmit = async (e: { preventDefault: () => void; }) => {
        e.preventDefault();

        try {
            const { data } = await axios.post(
                "http://localhost:4000/register",
                {
                    ...values,
                },
                { withCredentials: true }
            );
            console.log(data)
            navigate("/dashboard");

        } catch (err) {
            console.log(err);
        }
    };
    return (
        <div className="container">
            <h2>Register Account</h2>
            <form onSubmit={(e) => handleSubmit(e)}>
                <div>
                    <label htmlFor="email">Email</label>
                    <input
                        type="email"
                        name="email"
                        placeholder="Email"
                        onChange={(e) =>
                            setValues({ ...values, [e.target.name]: e.target.value })
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
                            setValues({ ...values, [e.target.name]: e.target.value })
                        }
                    />
                </div>
                <button type="submit">Submit</button>
                <span>
          Already have an account ?<Link to="/login"> Login</Link>
        </span>
            </form>
            <ToastContainer />
        </div>
    );
}
