import '../App.css'
import { useState } from 'react'
import axios from 'axios'
import { useNavigate, useLocation } from 'react-router-dom'
import { useEffect } from 'react/cjs/react.development'

function LoginAuthServer(props) {
    const navigate = useNavigate()
    const location = useLocation()
    const [userName, setuserName] = useState('')
    const [password, setpassword] = useState('')

    const clientId = new URLSearchParams(location && location.search).get("client_id")
    const state = new URLSearchParams(location && location.search).get("state")
    const redirectUri = new URLSearchParams(location && location.search).get("redirect_uri")

    const handleSubmit = () => {
        const url = `${process.env.REACT_APP_SERVER_URL}/api/user-server-login`
        const data = { userName, password }
        console.log(url, data)
        axios.post(url, data)
            .then(res => {
                console.log(res)
                localStorage.setItem('token', res && res.data && res.data.data.token)
                navigate(`/consent?client_id=${clientId}&redirect_uri=${redirectUri}&state=${state}`)
            })
            .catch(err => {
                console.log(err)
            })
    }

    useEffect(() => {
        if (localStorage.getItem('token')) {
            const url = `${process.env.REACT_APP_SERVER_URL}/api/oauth/code?response_type=code&client_id=${clientId}&redirect_uri=${redirectUri}&state=${state}`
            const config = {
                headers: { Authorization: localStorage.getItem('token') }
            };
            axios.get(url, config)
                .then(res => {
                    console.log(res)
                    if (res && res.data && res.data.data && res.data.data.url) {
                        window && window.location && window.location.replace(res.data.data.url)
                    }
                })
                .catch(err => {
                    console.log(err)
                })
        }
    }, [])

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
                        SUBMIT
                    </button>
                </div>
            </div>

        </div>
    );
}

export default LoginAuthServer;
