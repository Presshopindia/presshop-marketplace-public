import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
// import HeaderN from "../component/HeaderN"
import imgs from "../assets/images/imgn6.jpg";
import img2 from "../assets/images/img2.webp";
import avatar from "../assets/images/avatar.png";
import { Container, Row, Col, Form } from "react-bootstrap";
import ContentFeedCard from "../component/card/ContentFeedCard";
import exclusive from "../assets/images/exclusive.png";
import { Button, Card, CardContent, Typography } from "@mui/material";
import { BsArrowRight, BsArrowLeft, BsMic } from "react-icons/bs";
import feedcontimg from "../assets/images/imgn6.jpg";
import { AiOutlineStar } from "react-icons/ai";
import authorimg from "../assets/images/profile.webp";
import { MdOutlineWatchLater, MdAdd } from "react-icons/md";
import Tab from "react-bootstrap/Tab";
// import audioic from "../assets/images/audio-icon.svg";
import audioic from "../assets/images/audimg.svg";

import Tabs from "react-bootstrap/Tabs";
import { IoCallOutline } from "react-icons/io5";
import imgprofile from "../assets/images/profile.webp";
import { AiOutlinePlus } from "react-icons/ai";
import InputGroup from "react-bootstrap/InputGroup";
import inpimg from "../assets/images/profile.webp";
import contentCamera from "../assets/images/contentCamera.svg";
import contentVideo from "../assets/images/contentVideo.svg";
import { VscDeviceCameraVideo } from "react-icons/vsc";
import TopSearchesTipsCard from "../component/card/TopSearchesTipsCard";
import { SlLocationPin } from "react-icons/sl";
import Header from "../component/Header";
import DbFooter from "../component/DbFooter";
import { Get, Patch, Post } from "../services/user.services";
import moment from "moment/moment";
import { toast } from "react-toastify";
import shared from "../assets/images/share.png";
import Loader from "../component/Loader";
import videoic from "../assets/images/video.svg";
import interviewic from "../assets/images/interview.svg";
import cameraic from "../assets/images/camera.svg";

const MoreContentFromUser = () => {
  // Sort and Filter-
  const [openSortComponent, setOpenSortComponent] = useState(false);
  const [openFilterComponent, setOpenFilterComponent] = useState(false);
  const [morecontent, moreContentset] = useState([]);
  const [loading, setLoading] = useState(false)

  const handleCloseFilterComponent = (values) => {
    setOpenFilterComponent(values);
  };
  const ContentByID = async () => {
    try {
      setLoading(true)
      const resp1 = await Post(`mediaHouse/MoreContent`, {
        hopper_id: localStorage.getItem("hopperid"),
      });
      moreContentset(resp1.data.content);

      if (resp) {
        setLoading(false)
      }
    } catch (error) {
      // console.log(error);
        setLoading(false)
    }
  };
  const handleCloseSortComponent = (values) => {
    setOpenSortComponent(values);
  };

  const timeValuesHandler = (values) => {
    setTimeValues(values);
  };
  useEffect(() => {
    ContentByID();
  }, []);
  return (
    <>
    {loading && <Loader />}
      <Header />
      <div className="feedTags_search">
        <Container fluid>
          <Row>
            <Col sm={12}>
              <div className="feedContent_header">
                <Link onClick={() => history.back()} className="back_link">
                  <BsArrowLeft className="text-pink" /> Back{" "}
                </Link>
              </div>
              <div className="feedPreviews d-flex justify-content-between align-items-center"></div>
            </Col>
          </Row>
        </Container>
      </div>

      <div className="feedTags_search">
        <Container fluid>
          <Row>
            <Col md={12}>
              <div className="feedsMain_wrap">
                <div className="feedsContainer feedFavouriteContent mb-0">
                  <div className="feedContent_header">
                    <h1>More content </h1>
                  </div>
                  <Row className="">
                    {morecontent &&
                      morecontent.map((curr) => {
                        return (
                          <Col md={3}>
                              <ContentFeedCard  postcount={curr?.content?.length}
                                                        feedImg={curr.content[0].media_type === "video" ? process.env.REACT_APP_CONTENT_MEDIA + curr.content[0].thumbnail : curr.content[0].media_type === "image" ? process.env.REACT_APP_CONTENT_MEDIA + curr.content[0].media : audioic} feedType={curr.content[0].media_type === "video" ? contentVideo : contentCamera} feedTag={"Most Viewed"} userAvatar={imgs} authorName={"pseudonymous"}
                            lnkto={`/Feeddetail/content/${curr._id}`}
                            type_img={exclusive} type_tag={curr.status}
                            feedHead={curr.heading}
                             
                            feedTime={moment(curr?.updatedAt).format("DD MMMM, YYYY")} feedLocation={curr.location} contentPrice={curr.ask_price}
                            feedTypeImg={curr.content[0].media_type === "audio" ? interviewic :  cameraic} 
                          />
                          </Col>
                        );
                      })}
                  </Row>
                </div>
              </div>
            </Col>
          </Row>
          <div className="mt-0">
            <TopSearchesTipsCard />
          </div>
        </Container>
      </div>

      <DbFooter />
    </>
  );
};

export default MoreContentFromUser;
