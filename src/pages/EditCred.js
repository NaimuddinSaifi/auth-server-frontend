import { useState } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import { useEffect } from "react";
import { toast } from "react-toastify";
import Navbar from "../components/Navbar";

function EditCred(props) {
    const navigate = useNavigate()
    const { client_id } = useParams()
    const [client, setclient] = useState('')
    const [uris, seturis] = useState('')
    const [updated, setupdated] = useState(false)

    const handleSubmit = () => {
        const url = `${process.env.REACT_APP_SERVER_URL}/api/client/${client_id}`
        const data = { redirectUris: uris.toString() }
        const config = { headers: { authorization: localStorage.getItem('user_token') } }
        console.log(url, data, config)
        axios.put(url, data, config)
            .then(res => {
                console.log(res)
                if (res && res.data && res.data.code === 200) {
                    toast('Updated successfully.')
                    setupdated(!updated)
                    navigate('/get-cred')
                }
            })
            .catch(err => {
                console.log(err)
                toast('Something went wrong')
            })
    }

    const getUri = () => {
        const url = `${process.env.REACT_APP_SERVER_URL}/api/client/${client_id}`
        console.log(url)
        axios.get(url)
            .then(res => {
                console.log(res)
                if (res && res.data && res.data.code === 200) {
                    seturis(res.data.data.redirect_uris.split(','))
                    setclient(res.data.data)
                }
            })
            .catch(err => {
                console.log(err)
                toast('Something went wrong')
            })
    }

    useEffect(() => {
        getUri()
    }, [updated])

    const [uri, seturi] = useState('')
    const handleChange = (value, i) => {
        seturis(uris.map((uriItem, uriIndex) => {
            if (uriIndex === i) {
                return value
            } else {
                return uriItem
            }
        }))
    }
    return (<>
        <Navbar />
        <div className="card">
            <div className="shadow">
                <div> App Name : {client?.app_name} </div>
                <div> Client Id : {client_id} </div>
                <div> Client Secret : {client?.client_secret} </div>
                <div className="border">
                    Redirect Uris :
                    {
                        uris && uris.map((uriItem, i) => {
                            return (
                                <div key={i}>
                                    <input value={uriItem}
                                        placeholder="Redirect uri"
                                        onChange={(e) => handleChange(e.target.value, i)}
                                        type="text" className="login-input" />
                                </div>
                            )
                        })
                    }
                    <div className="flex-center mt-3">
                        <button className="submit-btn mt-3"
                            onClick={handleSubmit}>
                            EDIT
                        </button>
                    </div>
                </div>
            </div>
        </div>
    </>);
}

export default EditCred;
