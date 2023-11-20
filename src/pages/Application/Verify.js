import React from 'react'
import { useNavigate, useParams,} from 'react-router-dom';
import { decodeJWT } from '../../utils/jwt.utils';
import { useState } from 'react';

const VERIFY_API = "https://password-reset-o2fx.onrender.com/api/auth/verify"

export default function Verify() {
    const [form,setForm] = useState({})
    const navigator = useNavigate()
    const {key} = useParams()
            console.log(key)
function handleSubmit(){{
            
            const form = {}
            form['key'] = key
            setForm(form)
            fetch(VERIFY_API,{
                    method:"POST",
                    body:JSON.stringify(form),
                    headers: {
                        "Content-Type": "application/json",
                        // 'Content-Type': 'application/x-www-form-urlencoded',
                      },
                }).then((response)=>response.json())
                .then((result)=>{
                    if(result.success){
                        try {
                            const decodedToken = decodeJWT(result.refreshToken)
                            localStorage.setItem("refreshToken",result.refreshToken)
                            localStorage.setItem("roles",JSON.stringify(decodedToken.roles))
                        } catch (error) {
                            console.log("ERROR",error)
                        }
                        navigator("/resetpassword")
                        window.location.reload(true)
                    }
                }).catch((err)=>{
                    console.log("ERROR",err)
                })
            
        }
}

  return (
    <div>Verify
        <button onClick={handleSubmit}>submit</button>
        
    </div>
  )
}
