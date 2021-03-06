import '../App.css'
import { useState } from 'react'
import axios from 'axios'
import { useNavigate, useLocation, Link } from 'react-router-dom'
import { toast } from 'react-toastify'

function LoginAuthServer(props) {
    const navigate = useNavigate()
    const location = useLocation()
    const [userId, setuserId] = useState('')
    const [password, setpassword] = useState('')

    const clientId = new URLSearchParams(location && location.search).get("client_id")
    const state = new URLSearchParams(location && location.search).get("state")
    const redirectUri = new URLSearchParams(location && location.search).get("redirect_uri")

    const handleSubmit = () => {
        const url = `${process.env.REACT_APP_SERVER_URL}/api/user/login`
        const data = { userId, password }
        console.log(url, data)
        if (!userId || !password) {
            toast('Please fill all fields.')
        }
        if (userId && password) {
            axios.post(url, data)
                .then(res => {
                    console.log(res)
                    if (res && res.data && res.data.code === 200) {
                        toast('Login Success.')
                        localStorage.setItem('user_token', res && res.data && res.data.data.user_token)
                        localStorage.setItem('user_id', res && res.data && res.data.data.user_id)
                        if (clientId && redirectUri) {
                            navigate(`/oauth/consent?client_id=${clientId}&redirect_uri=${redirectUri}&state=${state}`)
                        }
                        if (!clientId || !redirectUri) {
                            navigate(`/`)
                        }
                    }
                    if (res && res.data && res.data.code === 404) {
                        toast('User Not Found.')
                    }
                    if (res && res.data && res.data.code === 500) {
                        toast('Internal Server Error.')
                    }

                })
                .catch(err => {
                    console.log(err)
                    toast('Something Went Wrong.')
                })
        }
    }

    return (
        <div className="card">
            <div className="shadow">
                <div className="center">  Login </div>

                <input value={userId}
                    placeholder="User Id"
                    onChange={(e) => setuserId(e.target.value)}
                    type="text" className="login-input" />
                <br />
                <input value={password}
                    placeholder="Password"
                    onChange={(e) => setpassword(e.target.value)}
                    type="password" className="login-input" />
                <br />
                <div className="flex-center">
                    <button className="submit-btn"
                        onClick={handleSubmit}>
                        SIGNIN
                    </button>
                </div>
                <div className="center">
                    <Link to={(clientId && redirectUri) ?
                        `/oauth/register?client_id=${clientId}&redirect_uri=${redirectUri}&state=${state}`
                        : `/oauth/register`}>
                        Dont have an account ? Signup
                    </Link>
                </div>
            </div>

        </div>
    );
}

export default LoginAuthServer;
