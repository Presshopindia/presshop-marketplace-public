import * as React from "react";
import { useState } from "react";
import { CardActions, Button, Link, Card, CardContent, Typography } from "@mui/material";
import { MdOutlineWatchLater } from "react-icons/md";
import { GrLocation } from "react-icons/gr";
import fav from "../../assets/images/star.svg";
import { useNavigate } from 'react-router-dom';
import { Patch, Post } from "../../services/user.services";
import Loader from "../Loader";
import { UserDetails } from "./../Utils";

function ContentFeedCard(props) {
  const user = JSON.parse(localStorage.getItem("user"));
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const usernew = UserDetails;

  const paymentintent = async (curr) => {
    // console.log(curr);
    const obj = {
      amount: curr.contentPrice,
      type: "content",
      customer_id: UserDetails.stripe_customer_id
    };
    const resp = await Post('mediahouse/createPayment', obj);
    window.open(resp.data.url, '_blank');
  };

  const Favourite = async () => {
    try {
      const obj = {
        favourite_status: props.bool_fav === "true" ? "true" : "false",
        content_id: props.content_id
      };
      const resp = await Patch(`mediaHouse/add/to/favourites`, obj);
    }
    catch (error) {
    }
  };

  const Most_Viewed = async () => {
    try {
      const obj = {
        user_id: user._id,
        content_id: props.content_id,
        type: "content",
      };
      const resp = await Post(`mediaHouse/mostviewed`, obj);
      // console.log(resp, `<---there are mostviewd`);
    }
    catch (error) {
    }
  };

  return (
    <>
      <Card className="homeFeedCard feed_single_crd">
        <CardContent className="homeFeed_body clickable" onClick={() => {
          if (props.most_viewed) {
            Most_Viewed();
            navigate(props.lnkto);
          }
          else {
            navigate(props.lnkto);
          }
        }}
        >
          <div className="feedImgTag">
            <div className="tags_prnt iflex">

              {props?.postcount &&
                <div className="post_itm_icns">
                  {props?.postcount && <p className="count">
                    {props.postcount}
                  </p>}
                  <img className="feedMediaType iconBg" src={props?.feedTypeImg1} alt="" />
                </div>}

              {props?.postcount2 &&
                <div className="post_itm_icns">
                  {props?.postcount2 && <p className="count">
                    {props.postcount2}
                  </p>}
                  <img className="feedMediaType iconBg" src={props?.feedTypeImg2} alt="" />
                </div>}
              {props?.postcount3 &&
                <div className="post_itm_icns">
                  {props?.postcount3 && <p className="count">
                    {props.postcount3}
                  </p>}
                  <img className="feedMediaType iconBg" src={props?.feedTypeImg3} alt="" />
                </div>}
              {props?.postcount4 &&
                <div className="post_itm_icns">
                  {props?.postcount4 && <p className="count">
                    {props.postcount4}
                  </p>}
                  <img className="feedMediaType iconBg" src={props?.feedTypeImg4} alt="" />
                </div>}
              {props?.postcount5 &&
                <div className="post_itm_icns">
                  {props?.postcount5 && <p className="count">
                    {props.postcount5}
                  </p>}
                  <img className="feedMediaType iconBg" src={props?.feedTypeImg5} alt="" />
                </div>}
            </div>
            <img className="feedMedia" src={props?.feedImg} alt="" />
            <div
              onClick={() => {
                Favourite();
                props.favourite();
              }}
            >
              <img className="iconBg favCont"
                src={props.fvticns}
                alt="" />
            </div>
            {props && props.feedTag && <span>{props.feedTag}</span>}
          </div>
          <div onClick={() => navigate(props.lnkto)} className="feedContent_wrap">
            <div className="contentAcuthor_type align-items-center d-flex flex-wrap justify-content-between">
              <div className="authorType">
                <img src={props.user_avatar} alt="" />
                <span className="authName">{props?.author_Name}</span>
              </div>
              <div className="content_type">
                <img src={props.type_img} alt="" />
                <span className="typeOfContent">{props.type_tag}</span>
              </div>
            </div>
            <Typography variant="body2" className="card-head-txt mb-2">
              {props.feedHead}
              <br />
            </Typography>
            <div className="feed_dateTime">
              <small className="feedTime"><MdOutlineWatchLater /> {props.feedTime}</small>
              <small className="feedLocation"><GrLocation />{props.feedLocation}</small>
            </div>
            <Typography
              sx={{ fontSize: 14 }}
              color="text.secondary"
              gutterBottom className=""
            >
              {props.ccontent}
            </Typography>
          </div>
        </CardContent>
        <CardActions className="dash-c-foot feedFooter justify-content-between">
          {props?.offeredPrice && <Button className="offeredPrice_btn position-relative">{props.offeredPrice}
            <span className="offered-badge">{props.offerbadge}</span>
          </Button>}
          <Link to={props.viewDetail} onClick={() => navigate(`${props.viewDetail}`)} className="view_transaction_dtl">{props.viewTransaction}</Link>
          <Button variant="primary" className="contentPrice_btn" onClick={() => paymentintent(props)}>£{(props?.contentPrice)?.toLocaleString('en-US', {maximumFractionDigits: 2}) || 0}</Button>
        </CardActions>
      </Card>
    </>
  );
}

export default ContentFeedCard;
