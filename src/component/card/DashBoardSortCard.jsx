import * as React from "react";
// import { useState } from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import { MdOutlineWatchLater } from "react-icons/md";
import { Row, Button, Col } from 'react-bootstrap';

function DashBoardSortCard(props) {
    return (
        <>
            <Card className="Sort_list-card mb-3">
                <CardContent className="dash-c-body dash-tabs">
                    <div className="list-in tab-card-wrap">
                        <Row className="align-items-center">
                            <Col md={4}>
                                <div className="Card_Wrapper d-flex align-items-center flex-column">
                                    <img className="list_card_img_top" src={props.imgtab} alt="1" />
                                    <div className="review_content_wrap d-flex justify-content-between align-content-center">
                                        <span className="rateView-type_icons"><img className="" src={props.reviewType} /></span>
                                        <span className="rateView-type_icons"><img className="" src={props.reviewTypetwo} /></span>
                                    </div>
                                    <div className=" d-flex align-items-center flex-column px-2">
                                        <Typography variant="body2" className="tab-card-txt_sort mb-1 ellips_with">
                                            {props.tabcarddata}
                                            <br />
                                        </Typography>
                                        <Row className="align-items-center gap-4 mb-1">
                                            <Col md={4}>
                                                <div className="bid-txt">
                                                    <span className="feedtype_icon_Sort">
                                                        <img src={props.feedIcon} alt="" />
                                                        <Typography variant="body2" className="small_bid_txt">
                                                            {props.feedType}
                                                        </Typography>
                                                    </span>
                                                </div>
                                            </Col>
                                            <Col md={4}>
                                                <div className="buyFeed_opt text-center ms-0">
                                                    <Button className="theme-btn-small">
                                                        {props.tabcard3}
                                                    </Button>
                                                </div>
                                            </Col>
                                        </Row>
                                    </div>
                                </div>
                            </Col>

                        </Row>
                    </div>

                </CardContent>
            </Card>
        </>

    );
}
export default DashBoardSortCard;
