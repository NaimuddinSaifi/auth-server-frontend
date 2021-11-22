import '../App.css'
import { useState } from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'

function LoginAuthServer(props) {
    const navigate = useNavigate()
    const [userName, setuserName] = useState('')
    const [password, setpassword] = useState('')

    const handleSubmit = () => {
        console.log({ userName, password })
        const url = `${process.env.REACT_APP_SERVER_URL}/api/user-server-login`
        const data = { userName, password }
        axios.post(url, data)
            .then(res => {
                console.log(res)
                localStorage.setItem('token', res && res.data && res.data.data.token)
                navigate('/consent')
            })
            .catch(err => {
                console.log(err)
            })
    }
    return (
        <div className="card">
            <div>
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
