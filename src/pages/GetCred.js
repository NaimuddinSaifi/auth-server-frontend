import { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";

function GetCred(props) {
    const navigate = useNavigate()
    const [clients, setclients] = useState([])

    const handleSubmit = () => {
        const url = `${process.env.REACT_APP_SERVER_URL}/api/client`
        const config = { headers: { authorization: localStorage.getItem('user_token') } }
        console.log(url, config)
        axios.get(url, config)
            .then(res => {
                console.log(res)
                if (res && res.data && res.data.code === 200) {
                    setclients(res.data.data)
                }
            })
            .catch(err => {
                console.log(err)
                toast('Something went wrong.')
            })
    }

    useEffect(() => {
        handleSubmit()
    }, [])

    const handleEdit = (client) => {
        console.log()
        navigate(`/edit-cred/${client.client_id}`)
    }

    return (<>
        <Navbar />
        <div className="cards">
            <div>
                {
                    clients && clients.map((client, index) => {
                        return (
                            <div key={index} className="shadow width">
                                <div>   App Name : {client?.app_name}  </div>
                                <div>   Client Id : {client?.client_id}</div>
                                <div>   Client Secret : {client?.client_secret}</div>
                                <div>   Redirect Uris : {client?.redirect_uris}</div>
                                <div className="flex-center">
                                    <button className="submit-btn"
                                        onClick={() => handleEdit(client)}>
                                        EDIT
                                    </button>
                                </div>
                            </div>
                        )
                    })
                }

            </div>
        </div>
    </>);
}

export default GetCred;
