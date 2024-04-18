import * as React from "react";
// import { useState } from "react";
import { Link, Navigate, useNavigate } from 'react-router-dom';
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import { Row, Button, Col } from 'react-bootstrap';
import { UserDetails } from "./../Utils";
import { Get, Post } from "../../services/user.services";
import { useStripe, useElements, CardElement, Elements } from "@stripe/react-stripe-js";


function DashBoardPayment(props) {
    const navigate = useNavigate();

    const paymentintent = async (curr) => {
        const obj = {
            amount: parseInt(curr?.paying.replace(/,/g, ""), 10),
            type: "content",
            customer_id: UserDetails.stripe_customer_id,
        };

        try {
            const resp = await Post("mediahouse/createPayment", obj);
            // console.log("resp.data.url", resp.data.url)
            window.open(resp.data.url, "_blank");
        } catch (error) {
            console.error("Payment error:", error);
        }
    };

    return (
        // <Elements stripe ={"sk_test_51NITL2AKmuyBTjDNklngpSDGnQK7JQjVzXh5cZdzyeAKf0zJiloShxogUofJ8417gRCn83SmyGx0Bz5cqhusNP1S00fIDDFmW9"}>
            <Card className="list-card tabs-wrap mb-3">
                <CardContent className="dash-c-body dash-tabs"
                    onClick={() => {
                        localStorage.setItem("props", JSON.stringify(props))
                        // navigate("/auto-invoice")
                        // paymentintent(props)
                    }}>
                    <div className="list-in tab-card-wrap">
                        <Row className="align-items-center justify-content-between" style={{ cursor: "pointer" }}>
                            <Col md={7}>
                                <div className="d-flex align-items-center">
                                    <img className="list-card-img" src={props.imgtab} alt="1" />
                                    <div className=" d-flex align-items-center">
                                        <Typography variant="body2" className="tab-card-txt mb-2">
                                            {props.tabcarddata}
                                            <br />
                                        </Typography>
                                    </div>
                                </div>
                            </Col>
                            <Col md={3}>
                                <div className="">
                                    <img className="list-card-img img2" src={props.imgtab1} alt="1" />
                                    <Typography
                                        sx={{ fontSize: 14 }}
                                        color="text.secondary"
                                        gutterBottom className="usr_nme mb-0 txt-inline"
                                    >
                                        {props.tabcard3}
                                    </Typography>
                                </div>
                            </Col>
                            <Col md={2}>
                                <div className="paying text-right">
                                    <p className="text-white">
                                        <Button className="theme-btn pay_btn_comn">
                                            Pay £{props?.paying ?? 0}
                                        </Button>
                                    </p>
                                </div>
                            </Col>

                        </Row>
                    </div>

                </CardContent>
            </Card>
        // </Elements>

    );
}
export default DashBoardPayment;
