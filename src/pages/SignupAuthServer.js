import '../App.css'
import { useState } from 'react'
import axios from 'axios'
import { useNavigate, useLocation, Link } from 'react-router-dom'
import { toast } from 'react-toastify'

function SignupAuthServer(props) {
    const navigate = useNavigate()
    const location = useLocation()
    const [userName, setuserName] = useState('')
    const [password, setpassword] = useState('')

    const clientId = new URLSearchParams(location && location.search).get("client_id")
    const state = new URLSearchParams(location && location.search).get("state")
    const redirectUri = new URLSearchParams(location && location.search).get("redirect_uri")
    const loginUrl = `/oauth/authorize?client_id=${clientId}&redirect_uri=${redirectUri}&state=${state}`
    const handleSubmit = () => {
        const url = `${process.env.REACT_APP_SERVER_URL}/api/user`
        const data = { userId: userName, password }
        console.log(url, data)
        if (!userName || !password) {
            toast('Please fill all fields.')
        }
        if (userName && password) {
            axios.post(url, data)
                .then(res => {
                    console.log(res)
                    if (res && res.data && res.data.code === 200) {
                        toast('Signup Success.')
                        navigate((clientId && redirectUri) ? loginUrl : `/oauth/authorize`)
                    }
                    if (res && res.data && res.data.code === 404) {
                        toast('User Alreday Exists.')
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
                <div className="center">  Signup </div>
                <input value={userName}
                    placeholder="User Id"
                    onChange={(e) => setuserName(e.target.value)}
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
                        SIGNUP
                    </button>
                </div>
                <div className="center">
                    <Link to={(clientId && redirectUri) ? loginUrl : `/oauth/authorize`}>
                        Already have an account ? Login
                    </Link>
                </div>
            </div>

        </div>
    );
}

export default SignupAuthServer;
