import React, { useState } from 'react'
import { Container, Row, Col } from "react-bootstrap";
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import { Link, useNavigate } from "react-router-dom";
import Typography from "@mui/material/Typography";
import HeaderN from '../component/HeaderN';
import loginimg from "../assets/images/login-images/usr_onbrd.svg";
import { Post } from '../services/user.services';
import { toast } from 'react-toastify';
import user from "../assets/images/user.svg";
import lock from "../assets/images/sortIcons/lock.svg";
import eye from "../assets/images/sortIcons/custom.svg";
import Footerlandingpage from "../component/Footerlandingpage";
import { BsEyeSlash, BsEye } from "react-icons/bs";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";

const LoginUserN = () => {

    const navigate = useNavigate()
    const [credentials, setCredentials] = useState({
        email: "",
        password: ""
    })
    const [visibility, setVisibility] = useState(false)

    const Credentials = (e) => {
        const name = e.target.name
        const value = e.target.value
        setCredentials((prev) => ({ ...prev, [name]: value }))
    }

    const Submit = async (e) => {
        e.preventDefault()
        try {

            const auth = getAuth();
            const obj = {
                email: credentials.email,
                password: credentials.password
            }

            const resp = await Post("auth/loginMediaHouse", obj)
            if (resp.status === 200) {
                navigate("/dashboard")
                // toast.success("Login Successfully")
                localStorage.setItem("token", resp.data.token)
                localStorage.setItem("id", resp.data.user._id)
                localStorage.setItem("user", JSON.stringify(resp.data.user))
                signInWithEmailAndPassword(auth, credentials.email, credentials.password)
                    .then((userCredential) => {
                        // Signed in successfully
                        const user = userCredential.user;
                        // console.log(user, '<------------userCredential.user')
                    })
                    .catch((error) => {
                        // Handle errors here
                    });
            }
        }
        catch (error) {
            // toast.error(error.response.data.errors.msg)
        }
    }

    return (
        <>
            <HeaderN />
            <div className="login-page">
                <Container fluid className="pdng">
                    <div className="log-wrap">
                        <Row className="row-w-m m-0 position-relative">
                            <Col lg="6" className="p-0">
                                <div className="left-side bg-white cstm_ht">
                                    <div className="pg_heading">
                                        <h1>You're nearly there, Sarah Oliver</h1>
                                    </div>
                                    <div className="log_txt no_border">
                                        <Typography variant="body2">
                                            Woohoo! Your administrator has successfully registered, and assigned user rights to you. Here is your temporary password  - <a className="link">R45TH78</a> that will allow you to log on, edit your details, and choose your new & permanent password.
                                        </Typography>
                                        <Typography variant="body2">
                                            Please enter your official email address, and this temporary password below to log in. This temporary password is only valid for 24 hours and can only be used by you. If the password has expired, and you need another one, you can always request a new temporary password by <a className="link">clicking here</a>
                                        </Typography>
                                        <Typography variant="body2" className="mb-0">
                                            If you still haven't still received our activation email, please <a className="link">click here</a> to resend another mail. If you continue facing any further problems, please <a className="link">contact us</a>, and we will take care of this right away for you. Thanks!
                                        </Typography>
                                    </div>
                                    <Form onSubmit={Submit}>
                                        <div className="inputs_wrap d-flex justify-content-between log_inputs">
                                            <Form.Group className="position-relative" controlId="formBasicEmail">
                                                <img className="frnt_ic" src={user} alt="user icon" />

                                                <Form.Control type="email" required className="rnd grey" placeholder="Enter official email address *" value={credentials.email} name='email' onChange={Credentials} />
                                            </Form.Group>
                                            <Form.Group className="position-relative" controlId="formBasicPassword">
                                                <img src={lock} className="frnt_ic" alt="" />
                                                <Form.Control type={!visibility ? 'password' : 'text'} required className="rnd grey" placeholder="Enter temporary password *" value={credentials.password} name='password' onChange={Credentials} />
                                                {!visibility && <div color='#000' className="pass_ic_wrap" onClick={() => { setVisibility(true) }}><BsEyeSlash /></div>}
                                                {visibility && <div color='#000' className="pass_ic_wrap" onClick={() => { setVisibility(false) }}><BsEye /></div>}
                                            </Form.Group>
                                        </div>
                                        <Button variant="" type="submit" className="usr_login_btn theme-btn custom-ab mb-4 w-100 sm_btn">
                                            <span>
                                                Log in
                                            </span>
                                        </Button>
                                    </Form>
                                </div>
                            </Col>
                            <Col lg="6 pos_stick">
                                <div className="right-side position-relative">
                                    <div className="tri"></div>
                                    <div className="circle"></div>
                                    <div className="big_circle"></div>
                                    <div className="">
                                        <img src={loginimg} alt="" />
                                    </div>
                                    <div className="right_txt">
                                        <p>Let's <span className="txt_bld">together disrupt</span> how content is sourced
                                        </p>
                                    </div>
                                </div>
                            </Col>
                        </Row>
                    </div >
                </Container >
            </div >
            <Footerlandingpage />
        </>
    )
}

export default LoginUserN