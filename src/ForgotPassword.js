import React, {
    useEffect,
    useState
} from 'react'

import {
    useNavigate
} from 'react-router-dom';
import {
    decodeJWT
} from './jwt.utils';

const SIGN_IN_API = "https://password-reset-o2fx.onrender.com/api/auth/signin"



export default function ForgotPassword() {
    const [form, setForm] = useState({})
    const navigator = useNavigate()

    function handleInputChange(e) {
        if (e) {
            const form = {}
            form['email'] = e.target.value
            setForm(form)
            console.log(form)
        }
    }

    function handleFormSubmit(e) {
        if (e) {
            if (!form.email) {
                alert("email is invalid")
            } else {
                fetch(SIGN_IN_API, {
                        method: "POST",
                        body: JSON.stringify(form),
                        headers: {
                            "Content-Type": "application/json",
                            // 'Content-Type': 'application/x-www-form-urlencoded',
                        },
                    }).then((response) => response.json())
                    .then((result) => {
                        if (result.success) {
                            try {
                                const decodedToken = decodeJWT(result.refreshToken)
                                localStorage.setItem("refreshToken", result.refreshToken)
                                localStorage.setItem("roles", JSON.stringify(decodedToken.roles))
                            } catch (error) {
                                console.log("ERROR", error)
                            }
                            navigator("/email")
                            window.location.reload(true)
                        }
                    }).catch((err) => {
                        console.log("ERROR", err)
                    })
            }
        }
    }
    return ( <
        section className = 'page container d-flex align-items-center justify-content-center' >
        <
        div className = 'card'
        style = {
            {
                width: "400px"
            }
        } >
        <
        div class = "card-body" >
        <
        h1 className = 'mb-3' > Login < /h1> <
        div class = "mb-3" >
        <
        label
        for = "email"
        class = "form-label" > Email < /label> <
        input type = "email"
        class = "form-control"
        id = "email"
        placeholder = "enter email"
        value = {
            form['email']
        }
        onChange = {
            handleInputChange
        }
        /> < /
        div > <
        div class = "d-grid" >
        <
        button class = "btn btn-primary"
        type = "button"
        onClick = {
            handleFormSubmit
        } > Login < /button>                </div >
        <
        /div> < /
        div > <
        /section>
    )
}