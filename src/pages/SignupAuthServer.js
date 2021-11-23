import '../App.css'
import { useState } from 'react'
import axios from 'axios'
import { useNavigate, useLocation, Link } from 'react-router-dom'

function SignupAuthServer(props) {
    const navigate = useNavigate()
    const location = useLocation()
    const [userName, setuserName] = useState('')
    const [password, setpassword] = useState('')

    const clientId = new URLSearchParams(location && location.search).get("client_id")
    const state = new URLSearchParams(location && location.search).get("state")
    const redirectUri = new URLSearchParams(location && location.search).get("redirect_uri")

    const handleSubmit = () => {
        const url = `${process.env.REACT_APP_SERVER_URL}/api/user-server-signup`
        const data = { userName, password }
        console.log(url, data)
        axios.post(url, data)
            .then(res => {
                console.log(res)
                // localStorage.setItem('token', res && res.data && res.data.data.token)
                // navigate(`/oauth/authorize?client_id=${clientId}&redirect_uri=${redirectUri}&state=${state}`)
            })
            .catch(err => {
                console.log(err)
            })
    }



    return (
        <div className="card">
            <div className="shadow">
                <input value={userName}
                    placeholder="User Name"
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
                        SIGN UP
                    </button>
                </div>
                <div className="center">
                    <Link to={`/oauth/authorize?client_id=${clientId}&redirect_uri=${redirectUri}&state=${state}`}>
                        Already have an account ? Login
                    </Link>
                </div>
            </div>

        </div>
    );
}

export default SignupAuthServer;