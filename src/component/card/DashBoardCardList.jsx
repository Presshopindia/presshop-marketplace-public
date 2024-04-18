import * as React from "react";
// import { useState } from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import { MdOutlineWatchLater } from "react-icons/md";
import { Link } from "react-router-dom";


function DashBoardCardList(props) {
    const { setPayload } = props;

    const handleClick = (type, id, typeOfContent) => {
        if (setPayload) {
            setPayload((prev) => ({
                ...prev,
                [type]: id,
                content_type: typeOfContent
            }))
        }
    }

    return (
        <>
            <Card className="list-card rcnt_act_card">
                <CardContent className="dash-c-body" onClick={() => handleClick(props.type, props.id, props.content_type)}>
                    {<Link to={props.hasOwnProperty("contentId") ? `/Feeddetail/content/${props?.contentId}` : props.hasOwnProperty("contentDetail") ? `/content-details/${props?.contentDetail}` : props?.underScoreid && `/sourced-content-detail/${props?.underScoreid}`}>
                        <div className="list-in d-flex align-items-start gap-2">
                            <div className="rateReview_content">
                                {props.reviewType && <span className="rateView-type"><img className="" src={props.reviewType} /></span>}

                                {
                                    // console.log('reviewType----------------->', props.reviewType)
                                }

                                {/* {<Link to={props?.underScoreid && `/sourced-content-detail/${props?.underScoreid}`}> */}
                                {props.imgtype === "audio" ? <div div className="cstm_icn_wrpr"><img className="list-card-img me-0" src={props.imgl} alt="1" /></div> :
                                    <img className="list-card-img" src={props.imgl} alt="1" />}
                                {/* </Link>
                            } */}

                                {/* <img className="list-card-img" src={props.imgl} alt="1" /> */}
                            </div>
                            <div className="list-in-txt pt-1">
                                <Typography variant="body2" className="list-car-txt txt_mdm mb-2">
                                    {props.listcard1}
                                    <br />
                                </Typography>
                                <Typography
                                    sx={{ fontSize: 12 }}
                                    color="#9DA3A3"
                                    gutterBottom className="crd_time d-flex align-items-center mb-0 txt_mdm">
                                    <MdOutlineWatchLater color="#000" />
                                    {props.listcard2}
                                </Typography>
                            </div>
                        </div>

                    </Link>}
                </CardContent>
            </Card>
        </>

    );
}
export default DashBoardCardList;
