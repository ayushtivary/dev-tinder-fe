import axios from "axios"
import { useState } from "react"
import { environment } from "../Environment/environment"
import { useDispatch } from "react-redux"
import { addUser } from "../Store/userSlice"
import { useNavigate } from "react-router-dom"
import { Routes, ApiEndPoints } from "../Utils/Constants"
const Login = () => {
    const [emailId, setEmailId] = useState("Ayushtiwary92@gmail.com")
    const [password, setPassword] = useState("Abc@12345")
    const [firstName, setFname] = useState("")
    const [lastName, setLname] = useState("")
    const [login, setLogin] = useState(true)
    const [error, setError] = useState()
    const Dispatch = useDispatch()
    const navigate = useNavigate()
    const handleLogin = async () => {
        try {
            const res = await axios.post(environment + ApiEndPoints.loginUrl, { emailId, password }, { withCredentials: true })
            Dispatch(addUser(res.data))
            return navigate(Routes.feed)
        } catch (err) {
            setError(err?.response?.data)
            console.log(err)
        }
    }
    const handleSignin = (event) => {
        setLogin(event)
    }
    const handleSignUp = async () => {
        try {
            const res = await axios.post(environment + ApiEndPoints.signupUrl, { firstName, lastName, emailId, password }, { withCredentials: true })
            setLogin(true)
            return navigate(Routes.login)
        }
        catch (err) {
            console.log(err)
        }

    }
    return (
        <div className="flex justify-center mt-20 " >
            <div className="card text-neutral-content w-96 text-center rounded-lg hover:bg-blue-300" data-theme="nord">
                <div className="card-body items-center text-center mt-16">
                    <h2 className="card-title text-black">Welcome Back!</h2>

                    <div className="text-black">
                        {!login && <><label className="input input-bordered flex items-center gap-2 m-7 rounded-lg text-black">
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                viewBox="0 0 16 16"
                                fill="currentColor"
                                className="h-4 w-4 opacity-70">
                                <path
                                    d="M2.5 3A1.5 1.5 0 0 0 1 4.5v.793c.026.009.051.02.076.032L7.674 8.51c.206.1.446.1.652 0l6.598-3.185A.755.755 0 0 1 15 5.293V4.5A1.5 1.5 0 0 0 13.5 3h-11Z" />
                                <path
                                    d="M15 6.954 8.978 9.86a2.25 2.25 0 0 1-1.956 0L1 6.954V11.5A1.5 1.5 0 0 0 2.5 13h11a1.5 1.5 0 0 0 1.5-1.5V6.954Z" />
                            </svg>
                            <input type="text" className="grow text-black" placeholder="First Name" value={firstName} onChange={(e) => setFname(e.target.value)} />
                        </label><label className="input input-bordered flex items-center gap-2 m-7 rounded-lg text-black">
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    viewBox="0 0 16 16"
                                    fill="currentColor"
                                    className="h-4 w-4 opacity-70">
                                    <path
                                        d="M2.5 3A1.5 1.5 0 0 0 1 4.5v.793c.026.009.051.02.076.032L7.674 8.51c.206.1.446.1.652 0l6.598-3.185A.755.755 0 0 1 15 5.293V4.5A1.5 1.5 0 0 0 13.5 3h-11Z" />
                                    <path
                                        d="M15 6.954 8.978 9.86a2.25 2.25 0 0 1-1.956 0L1 6.954V11.5A1.5 1.5 0 0 0 2.5 13h11a1.5 1.5 0 0 0 1.5-1.5V6.954Z" />
                                </svg>
                                <input type="text" className="grow text-black" placeholder="Last Name" value={lastName} onChange={(e) => setLname(e.target.value)} />
                            </label></>}
                        <label className="input input-bordered flex items-center gap-2 m-7 rounded-lg text-black">
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                viewBox="0 0 16 16"
                                fill="currentColor"
                                className="h-4 w-4 opacity-70">
                                <path
                                    d="M2.5 3A1.5 1.5 0 0 0 1 4.5v.793c.026.009.051.02.076.032L7.674 8.51c.206.1.446.1.652 0l6.598-3.185A.755.755 0 0 1 15 5.293V4.5A1.5 1.5 0 0 0 13.5 3h-11Z" />
                                <path
                                    d="M15 6.954 8.978 9.86a2.25 2.25 0 0 1-1.956 0L1 6.954V11.5A1.5 1.5 0 0 0 2.5 13h11a1.5 1.5 0 0 0 1.5-1.5V6.954Z" />
                            </svg>
                            <input type="text" className="grow text-black" placeholder="Email" value={emailId} onChange={(e) => setEmailId(e.target.value)} />
                        </label>
                        <label className="input rounded-lg input-bordered flex items-center gap-2 m-7">
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                viewBox="0 0 16 16"
                                fill="currentColor"
                                className="h-4 w-4 opacity-70">
                                <path
                                    fillRule="evenodd"
                                    d="M14 6a4 4 0 0 1-4.899 3.899l-1.955 1.955a.5.5 0 0 1-.353.146H5v1.5a.5.5 0 0 1-.5.5h-2a.5.5 0 0 1-.5-.5v-2.293a.5.5 0 0 1 .146-.353l3.955-3.955A4 4 0 1 1 14 6Zm-4-2a.75.75 0 0 0 0 1.5.5.5 0 0 1 .5.5.75.75 0 0 0 1.5 0 2 2 0 0 0-2-2Z"
                                    clipRule="evenodd" />
                            </svg>
                            <input type="password" className="grow text-black" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} />
                        </label>
                        <p className="text-red-600">{error}</p>
                    </div>

                    {login &&
                        <><div className="card-actions justify-end mt-1">
                            <button className="btn rounded-lg hover:bg-slate-800 w-60 hover:text-white text-lg" onClick={handleLogin}>Login</button>
                        </div><div class="justify-center mt-4">
                                <p className="text-green-600 hover:text-black text-lg font-normal">Do not have an account?</p>
                                <p className="text-green-600 hover:text-black text-lg" role="button" onClick={() => handleSignin(false)}> Sign Up </p>
                            </div></>
                    }
                    {!login &&
                        <><div className="card-actions justify-end mt-1">
                            <button className="btn rounded-lg hover:bg-slate-800 w-60 hover:text-white text-lg" onClick={handleSignUp}>Sign Up</button>
                        </div><div class="justify-center mt-4">
                                <p className="text-green-600 hover:text-black text-lg font-normal" role="button" onClick={() => handleSignin(true)}>Back to Login</p>
                            </div></>
                    }
                </div>
            </div>
        </div>
    )
}

export default Login