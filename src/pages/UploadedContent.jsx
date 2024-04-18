import React, { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import Header from "../component/Header";
import imgs from "../assets/images/imgn6.jpg";
import img2 from "../assets/images/img2.webp";
import contentCamera from "../assets/images/contentCamera.svg";
import contentVideo from "../assets/images/contentVideo.svg";
import avatar from "../assets/images/avatar.png";
import map from "../assets/images/map.svg";
import ContentFeedCard from "../component/card/ContentFeedCard";
import exclusive from "../assets/images/exclusive.png";
import { Select, MenuItem } from "@mui/material";
import { BsArrowLeft } from "react-icons/bs";
// import audioic from "../assets/images/audio-icon.svg";
import audioic from "../assets/images/audimg.svg";
import videoic from "../assets/images/video.svg";
import interviewic from "../assets/images/interview.svg";


import { Container, Row, Col } from "react-bootstrap";
import TopSearchesTipsCard from "../component/card/TopSearchesTipsCard";
import DbFooter from "../component/DbFooter";
import sports from "../assets/images/sortIcons/sports.png";
import crime from "../assets/images/sortIcons/crime.svg";
import fashion from "../assets/images/sortIcons/dress.svg";
import docsic from "../assets/images/docsic.svg";
import pdfic from "../assets/images/pdfic.svg";
import image8 from "../assets/images/img8.jpg";
import image9 from "../assets/images/img9.jpg";
import image10 from "../assets/images/img10.jpg";
import celebrity from "../assets/images/sortIcons/VIP.svg";
import politics from "../assets/images/sortIcons/political.svg";
import business from "../assets/images/sortIcons/business.svg";
import { Get, Post } from "../services/user.services";
import favic from "../assets/images/star.svg";
import moment from "moment/moment";
import favouritedic from "../assets/images/favouritestar.svg";
import shared from "../assets/images/share.png";
import Loader from "../component/Loader";
import TopFilterComn from "../component/Sortfilters/Content/TopFilterComn";
import { AiFillCaretDown } from "react-icons/ai";
import Fundsinvested from "../component/Sortfilters/Dashboard/Fundsinvested";
import cameraic from "../assets/images/camera.svg";
const UploadedContent = () => {
  const type = useParams();
  const [pub_content, setPub_Content] = useState([]);
  const [upld_content, setUpld_Content] = useState([]);
  const [loading, setLoading] = useState(false);

  const [fav, setFav] = useState(false);

  // Sort and filter-
  const [timeValues, setTimeValues] = useState("");
  const [priceSortingValue, setPriceSortingValue] = useState({
    field: "",
    value: "",
  });
  const [openFilterComponent, setOpenFilterComponent] = useState(false);
  const [openSortComponent, setOpenSortComponent] = useState(false);

  const handleCloseFilterComponent = (values) => {
    setOpenFilterComponent(values);
  };

  const handleCloseSortComponent = (values) => {
    setOpenSortComponent(values);
  };

  const [filterSortField, setFilterSortField] = useState("");
  const [filterSortValue, setFilterSortValue] = useState("");
  const [filterType, setFilterType] = useState("");

  const timeValuesHandler = (value) => {
    setFilterSortField(value.field);
    setFilterSortValue(value.values);
    setFilterType(value.type);
  };

  // console.log("timeValues 61", timeValues);
  const handleFavourite = () => {
    setFav(!fav);
    PublishedContent();
  };

  const PublishedContent = async () => {
    setLoading(true);
    try {
      const resp = await Post(`mediaHouse/view/published/content`, { [filterSortField]: filterSortValue, });
      setPub_Content(resp.data.content);
      if (resp) {
        setLoading(false);
      }
    } catch (error) {
      setLoading(false);
    }
  };

  const UploadedContent = async () => {
    setLoading(true);

    let hopper_id;
    if(type.type.includes('hopper')){
      hopper_id = type.type.split("_")[1]
    }

    try {
      let resp;
      if(hopper_id){
        resp = await Get(`mediaHouse/getuploadedContentbyHoppers?hopper_id=${hopper_id}`);
      }
      else{
        resp = await Get("mediaHouse/getuploadedContentbyHoppers?limit=50");
      }
      setUpld_Content(resp.data.data);
      if (resp) {
        setLoading(false);
      }
    } catch (error) {
      // console.log(error);
      setLoading(false);
    }
  };

  useEffect(() => {
    PublishedContent();
    setTimeValues("");
  }, [fav, filterSortValue]);

  useEffect(() => {
    UploadedContent();
    TaskDetails();
  }, []);

  const [taskDetails, setTaskDetails] = useState();
  const TaskDetails = async (id) => {
    if(type.type.length < 20){
      return;
    }
    setLoading(true);
    try {
      const resp = await Get(`mediaHouse/live/expired/tasks?status=live&id=${type.type}`);
      setTaskDetails(resp.data.tasks);
      setLoading(false);
    } catch (error) {
      setLoading(false);
    }
  };

  const formatAmountInMillion = (amount) =>
    amount?.toLocaleString('en-US', {
      maximumFractionDigits: 0,
    });

  return (
    <>
      {loading && <Loader />}
      <Header />
      <div className="feedTags_search">
        <Container fluid>
          <Row>
            <Col sm={12}>
              <div className="feedPreviews d-flex justify-content-between align-items-center">
                <div className="FundsfeedHdTags_wrap">
                  <Link className="backtoLink" onClick={() => history.back()}>
                    <BsArrowLeft className="text-pink" /> Back
                  </Link>
                </div>
                <div className="sorting_wrap d-flex">
                  <div className="feedSorting me-4">
                    <div className="fltrs_prnt top_fltr">
                      <p className="lbl_fltr">Filter</p>
                      <button
                        className="sortTrigger"
                        onClick={() => {
                          setOpenFilterComponent(true);
                        }}
                      >
                        Filter <AiFillCaretDown />
                      </button>
                      {openFilterComponent && (
                        <TopFilterComn
                          closeFilterComponent={handleCloseFilterComponent}
                        />
                      )}
                    </div>
                  </div>
                  <div className="feedSorting">
                    <div className="fltrs_prnt top_fltr">
                      <p className="lbl_fltr">Sort</p>
                      <button
                        className="sortTrigger"
                        onClick={() => {
                          setOpenSortComponent(true);
                        }}
                      >
                        Sort <AiFillCaretDown />
                      </button>
                      {openSortComponent && (
                        <Fundsinvested
                          rangeTimeValues={timeValuesHandler}
                          closeSortComponent={handleCloseSortComponent}
                        />
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </Col>
          </Row>
        </Container>
      </div>
      <div className="page-wrap uploaded_cont_page">
        <Container fluid>
          <Row>
            {type && !type.type.includes('uploaded') ? (
              <Col md={12}>
                <div className="feedsMain_wrap">
                  <div className="feedsContainer feedUploadedContent mb-0">
                    <div className="feedContent_header">
                      <h1 className="rw_hdng">
                        {type.type === "all"
                          ? "Latest"
                          : type.type === "exclusive"
                            ? "Exclusive"
                            : type.type === "shared"
                              ? "Shared"
                              : type.type === "Crime"
                                ? "Crime"
                                : type.type.length > 20
                                  ? "Uploaded"
                                    : "Celebrity"}{" "}
                        Content
                      </h1>
                    </div>
                    <Row className="">
                      {
                        (type?.type === "all") ? pub_content?.map((curr, index) => {
                          const Audio = curr?.content?.filter((curr) => curr?.media_type === "audio");
                          const Video = curr?.content?.filter((curr) => curr?.media_type === "video");
                          const Image = curr?.content?.filter((curr) => curr?.media_type === "image");
                          const Pdf = curr?.content?.filter((curr) => curr?.media_type === "pdf");
                          const Doc = curr?.content?.filter((curr) => curr?.media_type === "doc");
                          const imageCount = Image.length;
                          const videoCount = Video.length;
                          const audioCount = Audio.length;
                          const pdfCount = Pdf.length;
                          const docCount = Doc.length;

                          return (
                            <Col lg={3} md={4} sm={6}>
                              <ContentFeedCard
                                feedImg={
                                  curr?.content[0]?.media_type === "video" ?
                                    curr?.content[0]?.watermark || process.env.REACT_APP_CONTENT_MEDIA + curr.content[0]?.thumbnail
                                    : curr?.content[0]?.media_type === "image" ?
                                      curr?.content[0]?.watermark || process.env.REACT_APP_CONTENT_MEDIA + curr?.content?.[0]?.media
                                      : curr?.content[0]?.media_type === "audio" ?
                                        audioic
                                        : curr?.content[0]?.media_type === "doc" || 'pdf' ? docsic : ''}
                                feedType={contentCamera}
                                feedTag={curr?.content_view_type == "mostpopular" ? "Most Popular" : curr?.content_view_type == "mostviewed" ? "Most viewed" : null}
                                user_avatar={process.env.REACT_APP_AVATAR_IMAGE + curr?.hopper_id?.avatar_id?.avatar}
                                author_Name={curr?.hopper_id?.user_name}
                                lnkto={`/Feeddetail/content/${curr._id}`}
                                fvticns={curr.favourite_status === "true" ? favouritedic : favic}
                                content_id={curr._id}
                                bool_fav={curr.favourite_status === "true" ? "false" : "true"}
                                favourite={handleFavourite}
                                type_img={curr?.type === "shared" ? shared : exclusive}
                                type_tag={curr.type}
                                feedHead={curr.heading}
                                feedTime={moment(curr.published_time_date).format("h:mm A, DD MMMM YY")}
                                feedLocation={curr.location}
                                contentPrice={`${formatAmountInMillion(curr.ask_price || 0)}`}
                                viewTransaction={"View detail"}
                                viewDetail={`/Feeddetail/content/${curr._id}`}
                                feedTypeImg1={imageCount > 0 ? cameraic : null}
                                postcount={imageCount > 0 ? imageCount : null}
                                feedTypeImg2={videoCount > 0 ? videoic : null}
                                postcount2={videoCount > 0 ? videoCount : null}
                                feedTypeImg3={audioCount > 0 ? interviewic : null}
                                postcount3={audioCount > 0 ? audioCount : null}
                                feedTypeImg4={pdfCount > 0 ? pdfic : null}
                                postcount4={pdfCount > 0 ? pdfCount : null}
                                feedTypeImg5={docCount > 0 ? docsic : null}
                                postcount5={docCount > 0 ? docCount : null}
                              />
                            </Col>
                          );
                        })
                        : type?.type === "shared" || type?.type === "exclusive" ? pub_content?.map((curr, index) => {
                          const Audio = curr?.content?.filter((curr) => curr?.media_type === "audio");
                          const Video = curr?.content?.filter((curr) => curr?.media_type === "video");
                          const Image = curr?.content?.filter((curr) => curr?.media_type === "image");
                          const Pdf = curr?.content?.filter((curr) => curr?.media_type === "pdf");
                          const Doc = curr?.content?.filter((curr) => curr?.media_type === "doc");
                          const imageCount = Image.length;
                          const videoCount = Video.length;
                          const audioCount = Audio.length;
                          const pdfCount = Pdf.length;
                          const docCount = Doc.length;

                          return (
                            <Col lg={3} md={4} sm={6}>
                              <ContentFeedCard
                                feedImg={
                                  curr?.content[0]?.media_type === "video" ?
                                    curr?.content[0]?.watermark || process.env.REACT_APP_CONTENT_MEDIA + curr.content[0]?.thumbnail
                                    : curr?.content[0]?.media_type === "image" ?
                                      curr?.content[0]?.watermark || process.env.REACT_APP_CONTENT_MEDIA + curr?.content?.[0]?.media
                                      : curr?.content[0]?.media_type === "audio" ?
                                        audioic
                                        : curr?.content[0]?.media_type === "doc" || 'pdf' ? docsic : ''}
                                feedType={contentCamera}
                                feedTag={curr?.content_view_type == "mostpopular" ? "Most Popular" : curr?.content_view_type == "mostviewed" ? "Most viewed" : null}
                                user_avatar={process.env.REACT_APP_AVATAR_IMAGE + curr?.hopper_id?.avatar_id?.avatar}
                                author_Name={curr?.hopper_id?.user_name}
                                lnkto={`/Feeddetail/content/${curr._id}`}
                                fvticns={curr.favourite_status === "true" ? favouritedic : favic}
                                content_id={curr._id}
                                bool_fav={curr.favourite_status === "true" ? "false" : "true"}
                                favourite={handleFavourite}
                                type_img={curr?.type === "shared" ? shared : exclusive}
                                type_tag={curr.type}
                                feedHead={curr.heading}
                                feedTime={moment(curr.published_time_date).format("h:mm A, DD MMMM YY")}
                                feedLocation={curr.location}
                                contentPrice={`${formatAmountInMillion(curr.ask_price || 0)}`}
                                viewTransaction={"View detail"}
                                viewDetail={`/Feeddetail/content/${curr._id}`}
                                feedTypeImg1={imageCount > 0 ? cameraic : null}
                                postcount={imageCount > 0 ? imageCount : null}
                                feedTypeImg2={videoCount > 0 ? videoic : null}
                                postcount2={videoCount > 0 ? videoCount : null}
                                feedTypeImg3={audioCount > 0 ? interviewic : null}
                                postcount3={audioCount > 0 ? audioCount : null}
                                feedTypeImg4={pdfCount > 0 ? pdfic : null}
                                postcount4={pdfCount > 0 ? pdfCount : null}
                                feedTypeImg5={docCount > 0 ? docsic : null}
                                postcount5={docCount > 0 ? docCount : null}
                              />
                            </Col>
                          );
                        })
                        : type?.type?.length > 20 ?taskDetails?.content?.map((curr, index) => {
                          // const Audio = curr?.filter((curr) => curr?.media_type === "audio");
                          // const Video = curr?.filter((curr) => curr?.media_type === "video");
                          // const Image = curr?.filter((curr) => curr?.media_type === "image");
                          // const Pdf = curr?.filter((curr) => curr?.media_type === "pdf");
                          // const Doc = curr?.filter((curr) => curr?.media_type === "doc");
                          // const imageCount = Image.length;
                          // const videoCount = Video.length;
                          // const audioCount = Audio.length;
                          // const pdfCount = Pdf.length;
                          // const docCount = Doc.length;

                          return (
                            <Col lg={3} md={4} sm={6}>
                              <ContentFeedCard
                                feedImg={
                                  curr?.media_type === "video" ?
                                    curr?.watermark || process.env.REACT_APP_CONTENT_MEDIA + curr?.thumbnail
                                    : curr?.media_type === "image" ?
                                      curr?.watermark || curr?.media
                                      : curr?.media_type === "audio" ?
                                        audioic
                                        : curr?.media_type === "doc" || 'pdf' ? docsic : ''}
                                feedType={contentCamera}
                                user_avatar={curr?.hopper_id?.avatar_id?.avatar ? process.env.REACT_APP_AVATAR_IMAGE + curr?.hopper_id?.avatar_id?.avatar : avatar}
                                author_Name={curr?.hopper_id?.user_name}
                                lnkto={`/content-details/${curr._id}`}
                                fvticns={curr.favourite_status === "true" ? favouritedic : favic}
                                content_id={curr._id}
                                type_img={taskDetails?.type === "shared" ? shared : exclusive}
                                type_tag={taskDetails.type}
                                feedHead={taskDetails.heading}
                                feedTime={moment(taskDetails.createdAt).format("h:mm A, DD MMMM YY")}
                                feedLocation={taskDetails.location}
                                contentPrice={`${formatAmountInMillion(curr?.ask_price || 0)}`}
                                viewTransaction={"View detail"}
                                // feedTypeImg1={imageCount > 0 ? cameraic : null}
                                // postcount={imageCount > 0 ? imageCount : null}
                                // feedTypeImg2={videoCount > 0 ? videoic : null}
                                // postcount2={videoCount > 0 ? videoCount : null}
                                // feedTypeImg3={audioCount > 0 ? interviewic : null}
                                // postcount3={audioCount > 0 ? audioCount : null}
                                // feedTypeImg4={pdfCount > 0 ? pdfic : null}
                                // postcount4={pdfCount > 0 ? pdfCount : null}
                                // feedTypeImg5={docCount > 0 ? docsic : null}
                                // postcount5={docCount > 0 ? docCount : null}
                              />
                            </Col>
                          );
                        })
                        : pub_content?.map((curr, index) => {
                          const Audio = curr?.content?.filter((curr) => curr?.media_type === "audio");
                          const Video = curr?.content?.filter((curr) => curr?.media_type === "video");
                          const Image = curr?.content?.filter((curr) => curr?.media_type === "image");
                          const Pdf = curr?.content?.filter((curr) => curr?.media_type === "pdf");
                          const Doc = curr?.content?.filter((curr) => curr?.media_type === "doc");
                          const imageCount = Image.length;
                          const videoCount = Video.length;
                          const audioCount = Audio.length;
                          const pdfCount = Pdf.length;
                          const docCount = Doc.length;

                          return (
                            <Col lg={3} md={4} sm={6}>
                              <ContentFeedCard
                                feedImg={
                                  curr?.content[0]?.media_type === "video" ?
                                    curr?.content[0]?.watermark || process.env.REACT_APP_CONTENT_MEDIA + curr.content[0]?.thumbnail
                                    : curr?.content[0]?.media_type === "image" ?
                                      curr?.content[0]?.watermark || process.env.REACT_APP_CONTENT_MEDIA + curr?.content?.[0]?.media
                                      : curr?.content[0]?.media_type === "audio" ?
                                        audioic
                                        : curr?.content[0]?.media_type === "doc" || 'pdf' ? docsic : ''}
                                feedType={contentCamera}
                                feedTag={curr?.content_view_type == "mostpopular" ? "Most Popular" : curr?.content_view_type == "mostviewed" ? "Most viewed" : null} 
                                user_avatar={process.env.REACT_APP_AVATAR_IMAGE + curr?.hopper_id?.avatar_id?.avatar}
                                author_Name={curr?.hopper_id?.user_name}
                                lnkto={`/Feeddetail/content/${curr._id}`}
                                fvticns={curr.favourite_status === "true" ? favouritedic : favic}
                                content_id={curr._id}
                                bool_fav={curr.favourite_status === "true" ? "false" : "true"}
                                favourite={handleFavourite}
                                type_img={curr?.type === "shared" ? shared : exclusive}
                                type_tag={curr.type}
                                feedHead={curr.heading}
                                feedTime={moment(curr.published_time_date).format("h:mm A, DD MMMM YY")}
                                feedLocation={curr.location}
                                contentPrice={`${formatAmountInMillion(curr.ask_price || 0)}`}
                                viewTransaction={"View detail"}
                                viewDetail={`/Feeddetail/content/${curr._id}`}
                                feedTypeImg1={imageCount > 0 ? cameraic : null}
                                postcount={imageCount > 0 ? imageCount : null}
                                feedTypeImg2={videoCount > 0 ? videoic : null}
                                postcount2={videoCount > 0 ? videoCount : null}
                                feedTypeImg3={audioCount > 0 ? interviewic : null}
                                postcount3={audioCount > 0 ? audioCount : null}
                                feedTypeImg4={pdfCount > 0 ? pdfic : null}
                                postcount4={pdfCount > 0 ? pdfCount : null}
                                feedTypeImg5={docCount > 0 ? docsic : null}
                                postcount5={docCount > 0 ? docCount : null}
                              />
                            </Col>
                          );
                        })
                      }
                    </Row>
                  </div>
                </div>
              </Col>
            ) : (
              <Col md={12}>
                <div className="feedsMain_wrap mb-0">
                  <div className="feedsContainer feedUploadedContent mb-0">
                    <div className="feedContent_header">
                      <h1>Uploaded content</h1>
                    </div>
                    <Row className="">
                      {upld_content &&
                        upld_content.map((item, index) => {
                          return (
                            <Col lg={3} md={4} sm={6}>
                              <ContentFeedCard
                                feedImg={
                                  item?.type === "image" ?
                                    item.videothubnail || process.env.REACT_APP_UPLOADED_CONTENT + item.imageAndVideo
                                    : item?.type === "video" ?
                                      item.videothubnail || process.env.REACT_APP_UPLOADED_CONTENT + item.videothubnail
                                      : item?.type === "audio" ? audioic : null
                                }
                                postcount={1}
                                feedTypeImg1={item?.type === "image" ? cameraic : item?.type === "audio" ? interviewic : item?.type === "video" ? videoic : null}
                                user_avatar={process.env.REACT_APP_AVATAR_IMAGE + item?.avatar_detals[0]?.avatar}
                                author_Name={item?.hopper_id?.user_name}
                                lnkto={`/content-details/${item._id}`}
                                // lnkto={`/Feeddetail/content/${item._id}uploaded`}
                                fvticns={favic}
                                type_tag={item?.category_details[0]?.name}
                                type_img={item?.category_details[0]?.icon}
                                feedHead={item.task_id.task_description}
                                feedTime={moment(item.createdAt).format(" hh:mm A, DD MMM YYYY")}
                                feedLocation={item.task_id.location}
                                contentPrice={`${formatAmountInMillion(item.videothubnail === null ? item.task_id.photo_price || 0 : item.task_id.videos_price || 0)}`}
                              />
                            </Col>
                          );
                        })}
                    </Row>
                  </div>
                </div>
              </Col>
            )}
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

export default UploadedContent;
