import * as React from "react";
// import { useState } from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import { MdOutlineWatchLater } from "react-icons/md";
import { Row, Button, Col } from 'react-bootstrap';
import { useState } from "react";
import { useEffect } from "react";
import moment from "moment/moment";
import { useNavigate } from 'react-router-dom';
import { UserDetails } from "./../Utils";
import { Post } from "../../services/user.services";

function DashBoardTabCards(props) {
    const navigate = useNavigate()
    const usernew = UserDetails

    const paymentintent = async (curr) => {
        // console.log(curr)
        const obj = {
            // image_id: curr.image_id,
            amount: curr.contentPrice,
            type: "content",
            customer_id: UserDetails.stripe_customer_id
        }
        const resp = await Post('mediahouse/createPayment', obj)
        window.open(resp.data.url, '_blank')

    }
    const [currentTime, setCurrentTime] = useState(new Date());

    useEffect(() => {
        const timer = setInterval(() => {
            setCurrentTime(new Date());
        }, 1000);

        // getCurrentTimeDifference()

        return () => {
            clearInterval(timer);
        };
    }, []);

    const getCurrentTimeDifference = () => {

        const uploadedTime = new Date(props.tabcard4 && props.tabcard4);
        const timeDifference = Math.abs(currentTime - uploadedTime);
        const days = Math.floor(timeDifference / (1000 * 60 * 60 * 24)); // 1 day = 24 hours = 24 * 60 * 60 * 1000 milliseconds
        const hours = Math.floor((timeDifference / (1000 * 60 * 60)) % 24);
        const minutes = Math.floor((timeDifference / (1000 * 60)) % 60);

        if (days > 0) {
            return {
                days,
                hours,
                minutes
            };
        } else {
            return {
                hours,
                minutes,
            };
        }
    };


    return (
        <>
            <Card className="exclusive_shrd_wrap list-card tabs-wrap mb-3">
                <CardContent className="dash-c-body dash-tabs" onClick={() => navigate(props.lnkto)}>
                    <div className="list-in tab-card-wrap">
                        <Row className="align-items-center" onClick={() => paymentintent(props)} >
                            <Col md={5}>
                                <div className="d-flex align-items-center">
                                    {props.image_type === "audio" ?
                                        <div div className="cstm_icn_wrpr">
                                            <img className="list-card-img me-0" src={props.imgtab} alt="1" />
                                        </div>
                                        :
                                        <img className="list-card-img" src={props.imgtab} alt="1" />
                                    }
                                    <div className=" d-flex align-items-center">
                                        <Typography variant="body2" className="tab-card-txt mb-2">
                                            {props.tabcarddata}
                                            <br />
                                        </Typography>
                                    </div>
                                </div>
                            </Col>
                            {props.tabcard2 && <Col md={3}>
                                <Typography
                                    sx={{ fontSize: 14 }}
                                    color="text.secondary"
                                    gutterBottom className="crd_time mb-0 watch-ic"
                                >
                                    <MdOutlineWatchLater />
                                    {props.tabcard2}
                                </Typography>
                            </Col>}
                            {props.tabcard4 && <Col md={3}>
                                <Typography
                                    sx={{ fontSize: 14 }}
                                    color="text.secondary"
                                    gutterBottom className="crd_time mb-0 watch-ic"
                                >
                                    <MdOutlineWatchLater />
                                    {props.tabcard4}
                                </Typography>
                            </Col>}
                            <Col>
                                <div className=" bid-txt">
                                    <span className="feedtype_icon"
                                        style={{
                                            "fontFamily": 'AirbnbMedium',
                                            "color": '#7D8D8B'
                                        }}
                                    >
                                        <img src={props.feedIcon} alt="" />
                                        {props.feedType}
                                    </span>
                                </div>
                            </Col>
                            <Col>
                                <div className="buyFeed_opt text-center">
                                    <Button className="theme-btn" >{props.tabcard3}</Button>
                                </div>
                            </Col>
                        </Row>
                    </div>

                </CardContent>
            </Card >
        </>
    );
}
export default DashBoardTabCards;
