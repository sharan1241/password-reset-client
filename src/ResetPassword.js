import React from 'react'
import {
    useNavigate,
} from 'react-router-dom';
import {
    decodeJWT
} from './jwt.utils';
import {
    useState
} from 'react';
const PASS_RESET_API = "https://password-reset-o2fx.onrender.com/api/auth/resetpassword"

export default function ResetPassword() {
    const [form, setForm] = useState({})
    const navigator = useNavigate()

    function handleInputChange(e) {
        if (e) {
            const formCopy = {
                ...form,
            };
            formCopy[e.target.id] = e.target.value
            setForm(formCopy)
        }
    }

    function handleFormSubmit(e) {
        if (e) {
            if (!form.pass || !form.email) {
                alert("password is invalid")
            } else {
                fetch(PASS_RESET_API, {
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
                            navigator("/success")
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
        h1 className = 'mb-3' > change password < /h1> <
        div class = "mb-3" >
        <
        label
        for = "email"
        class = "form-label" > confirm email < /label> <
        input type = "email"
        class = "form-control"
        id = "email"
        placeholder = "confirm email"
        value = {
            form['email']
        }
        onChange = {
            handleInputChange
        }
        /> < /
        div > <
        div class = "mb-3" >
        <
        label
        for = "pass"
        class = "form-label" > enter new Password < /label> <
        input type = "password"
        class = "form-control"
        id = "pass"
        placeholder = "enter new password"
        value = {
            form['pass']
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
        } > submit < /button>                </div >
        <
        /div> < /
        div > <
        /section>
    )
}