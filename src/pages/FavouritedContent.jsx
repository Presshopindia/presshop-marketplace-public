import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Header from "../component/Header";
import imgs from "../assets/images/imgn6.jpg";
import img2 from "../assets/images/img2.webp";
import contentCamera from "../assets/images/contentCamera.svg";
import contentVideo from "../assets/images/contentVideo.svg";
import avatar from "../assets/images/avatar.png";
import map from "../assets/images/map.svg";
import ContentFeedCard from "../component/card/ContentFeedCard";
import shared from "../assets/images/share.png";
import exclusive from "../assets/images/exclusive.png";
import { Select, MenuItem } from "@mui/material";
import { BsArrowRight, BsChevronDown, BsArrowLeft } from "react-icons/bs";
import { Container, Row, Col, Button } from "react-bootstrap";
import TopSearchesTipsCard from "../component/card/TopSearchesTipsCard";
import sports from "../assets/images/sortIcons/sports.png";
import crime from "../assets/images/sortIcons/crime.svg";
import fashion from "../assets/images/sortIcons/dress.svg";
import DbFooter from "../component/DbFooter";
import image8 from "../assets/images/img8.jpg";
import image9 from "../assets/images/img9.jpg";
import image10 from "../assets/images/img10.jpg";
import celebrity from "../assets/images/sortIcons/VIP.svg";
import politics from "../assets/images/sortIcons/political.svg";
import { Get, Post } from "../services/user.services";
import favic from "../assets/images/star.svg";
import moment from "moment/moment";
import favouritedic from "../assets/images/favouritestar.svg";
import Loader from "../component/Loader";
import FavouritedDF from "../component/Sortfilters/Dashboard/Favourited";
import audioic from "../assets/images/audimg.svg";
import { AiFillCaretDown } from "react-icons/ai";
import TopFilterComn from "../component/Sortfilters/Content/TopFilterComn";
import Fundsinvested from "../component/Sortfilters/Dashboard/Fundsinvested";
import videoic from "../assets/images/video.svg";
import interviewic from "../assets/images/interview.svg";
import cameraic from "../assets/images/camera.svg";
import docsic from "../assets/images/docsic.svg";

const FavouritedContent = () => {
  const [filterSortField, setFilterSortField] = useState("");
  const [filterSortValue, setFilterSortValue] = useState("");

  const [filter, setFilter] = useState({
    status: false,
    type: "",
  });

  const handleChildCloseBtnFun = (value) => {
    setFilter((prev) => ({
      ...prev,
      favourite_compo: value,
    }));
  };

  const handleFavouriteComponentValues = (value) => {
    setFilterSortField(value.field);
    setFilterSortValue(value.values);
  };

  const [fav, setFav] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleFavourite = () => {
    setFav(!fav);
    FavouriteContent();
  };

  const [fav_content, setFav_Content] = useState([]);

  const FavouriteContent = async () => {
    setLoading(true);

    try {
      const resp = await Post("mediaHouse/favourites", { [filterSortField]: filterSortValue, });

      // const mostViewd = resp?.data?.response?.response.slice().sort((a, b) => b.count - a.count).slice(0, 5);
      // const mostPopular = resp?.data?.response?.response.slice().sort((a, b) => b.count - a.count).slice(5, 15);


      // resp?.data?.response?.response?.forEach((obj) => {
      //   if (mostViewd.includes(obj)) {
      //     obj.mostViewed = true;
      //   }
      // });

      // resp?.data?.response?.response?.forEach((obj) => {
      //   if (mostPopular.includes(obj)) {
      //     obj.mostPopular = true;
      //   }
      // });

      setFav_Content(resp.data.response.response);
      if (resp) {
        // console.log(resp, `<-----favourite content `)
        setLoading(false);
      }
    } catch (error) {
      setLoading(false);
    }
  };

  useEffect(() => {
    FavouriteContent();
  }, [fav, filterSortValue]);

  // comma seprator

  const formatAmountInMillion = (amount) =>
    amount?.toLocaleString('en-US', {
      maximumFractionDigits: 2,
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
                <div className="feedContent_header">
                  <Link onClick={() => history.back()} className="back_link">
                    <BsArrowLeft className="text-pink" /> Back{" "}
                  </Link>
                  {/* <div className="fltrs_prnt">
                    <Button className='sort_btn' onClick={() => {
                      setFilter((prev) => ({
                        ...prev,
                        "favourite_compo": true
                      }))
                    }}
                    >
                      Sort
                      <BsChevronDown />
                    </Button>
                    {filter.favourite_compo && <FavouritedDF favourite_compo={handleChildCloseBtnFun} favSortValues={handleFavouriteComponentValues} />}
                  </div> */}
                </div>
                <div className="sorting_wrap d-flex">
                  <div className="feedSorting">
                    <div className="fltrs_prnt top_fltr">
                      <p className="lbl_fltr">
                        Sort
                      </p>
                      <Button className='sort_btn sortTrigger' onClick={() => {
                        setFilter((prev) => ({
                          ...prev,
                          "favourite_compo": true
                        }))
                      }}
                      >
                        Sort
                        <BsChevronDown />
                      </Button>
                      {filter.favourite_compo && <FavouritedDF favourite_compo={handleChildCloseBtnFun} favSortValues={handleFavouriteComponentValues} />}
                    </div>
                  </div>
                </div>
                {/* <div className="sorting_wrap d-flex">
                  <div className="feedSorting me-4">
                    <div className="fltrs_prnt top_fltr">
                      <p className="lbl_fltr">Filter</p>
                      <button className="sortTrigger">
                        Filter <AiFillCaretDown />
                      </button>
                      <TopFilterComn />
                    </div>
                  </div>
                  <div className="feedSorting">
                    <div className="fltrs_prnt top_fltr">
                      <p className="lbl_fltr">Sort</p>
                      <button className="sortTrigger">
                        Sort <AiFillCaretDown />
                      </button>
                      <Fundsinvested />
                    </div>
                  </div>
                </div> */}
              </div>
            </Col>
          </Row>
        </Container>
      </div>
      <div className="page-wrap">
        <Container fluid>
          <Row>
            <Col md={12}>
              <div className="feedsMain_wrap">
                <div className="feedsContainer feedFavouriteContent mb-0">
                  <div className="feedContent_header">
                    <h1 className="rw_hdng">Favourited content</h1>
                  </div>
                  <Row className="">
                    {fav_content &&
                      fav_content
                      .sort((a, b) => new Date(b.content_id?.published_time_date) - new Date(a.content_id?.published_time_date))
                      .map((curr, index) => {
                        const contentId = curr?.content_id?.content || [];
                        const audioCount = contentId.filter((item) => item.media_type === 'audio').length;
                        const videoCount = contentId.filter((item) => item.media_type === 'video').length;
                        const imageCount = contentId.filter((item) => item.media_type === 'image').length;
                        const pdfCount = contentId.filter((item) => item.media_type === 'pdf').length;
                        const docCount = contentId.filter((item) => item.media_type === 'doc').length;

                        return (
                          <Col lg={3} md={4} sm={6}>
                            <ContentFeedCard
                              feedImg={
                                curr?.content_id?.content[0]?.media_type === "video" ?
                                  curr?.content_id?.content[0]?.watermark || process.env.REACT_APP_CONTENT_MEDIA + curr?.content_id?.content[0]?.thumbnail
                                  : curr?.content_id?.content[0]?.media_type === "image" ?
                                    curr?.content_id?.content[0]?.watermark || process.env.REACT_APP_CONTENT_MEDIA + curr?.content_id?.content[0]?.media
                                    : curr?.content_id?.content[0]?.media_type === "audio" ?
                                      audioic
                                      : ''}

                              // feedType={contentCamera}
                              feedTag={curr?.content_view_type == "mostpopular" ? "Most Popular" : curr?.content_view_type == "mostviewed" ? "Most viewed" : null}
                              user_avatar={process.env.REACT_APP_AVATAR_IMAGE + curr?.content_id?.hopper_id?.avatar_id?.avatar}
                              author_Name={curr?.content_id?.hopper_id?.user_name}
                              lnkto={`/Feeddetail/favourite/${curr?._id}`}
                              fvticns={curr?.content_id?.favourite_status === "true" ? favouritedic : favic}
                              content_id={curr?.content_id?._id}
                              bool_fav={curr?.content_id?.favourite_status === "true" ? "false" : "true"}
                              favourite={handleFavourite}
                              type_img={curr?.content_id?.type === "shared" ? shared : exclusive}
                              type_tag={curr?.content_id?.type}
                              feedHead={curr?.content_id?.heading}
                              feedTime={moment(curr?.content_id?.published_time_date).format("hh:mm A , DD MMMM YY")}
                              feedLocation={curr?.content_id?.location}
                              contentPrice={`${formatAmountInMillion(curr?.content_id?.ask_price || 0)}`}
                              feedTypeImg1={imageCount > 0 ? cameraic : null}
                              postcount={imageCount > 0 ? imageCount : null}
                              feedTypeImg2={videoCount > 0 ? videoic : null}
                              postcount2={videoCount > 0 ? videoCount : null}
                              feedTypeImg3={audioCount > 0 ? interviewic : null}
                              postcount3={audioCount > 0 ? audioCount : null}
                              feedTypeImg4={pdfCount > 0 ? docsic : null}
                              postcount4={pdfCount > 0 ? pdfCount : null}
                              feedTypeImg5={docCount > 0 ? docsic : null}
                              postcount5={docCount > 0 ? docCount : null}




                            // feedTypeImg={
                            //   curr?.content_id?.content[0]?.media_type === "audio" ? interviewic : cameraic}
                            // postcount={curr?.content_id?.content?.length}
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

export default FavouritedContent;
