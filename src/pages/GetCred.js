import { useEffect, useState } from "react";
import axios from "axios";

function GetCred(props) {

    const [redirectUri, setredirectUri] = useState('')
    const [appName, setappName] = useState('')
    const [clientId, setclientId] = useState('')
    const [clientSecret, setclientSecret] = useState('')

    const handleSubmit = () => {
        const url = `${process.env.REACT_APP_SERVER_URL}/api/get-cred`
        console.log(url)
        axios.get(url)
            .then(res => {
                console.log(res)
                if(res && res.data && res.data.data ){
                    setclientId(res.data.data.client_id)
                    setclientSecret(res.data.data.client_secret)
                    setappName(res.data.data.app_name)
                    setredirectUri(res.data.data.redirect_uri)
                }
            })
            .catch(err => {
                console.log(err)
            })
    }

    useEffect(() => {
        handleSubmit()
    }, [])

    return (
        <div className="card">
            <div>
                <div>   App Name : {appName}  </div>
                <div>   Redirect Uri : {redirectUri}</div>
                <div>   Client Id : {clientId}</div>
                <div>   Client Secret : {clientSecret}</div>
            </div>
        </div>
    );
}

export default GetCred;
