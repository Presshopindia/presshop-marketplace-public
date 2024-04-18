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
import { BsArrowRight, BsArrowLeft } from "react-icons/bs";
import { Container, Row, Col } from "react-bootstrap";
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
import videoic from "../assets/images/video.svg";
import interviewic from "../assets/images/interview.svg";
import cameraic from "../assets/images/camera.svg";
import docsic from "../assets/images/docsic.svg";
import pdfic from "../assets/images/pdfic.svg";
import audioic from "../assets/images/audimg.svg";
import { AiFillCaretDown } from "react-icons/ai";
import TopFilterComn from '../component/Sortfilters/Content/TopFilterComn';
import Fundsinvested from '../component/Sortfilters/Dashboard/Fundsinvested';
const ContentUnderOffer = () => {
  const [fav, setFav] = useState(false);
  const [loading, setLoading] = useState(false);
  const [offerd_content, setofferd_content] = useState([]);
  const [openSortComponent, setOpenSortComponent] = useState(false);
  const [openFilterComponent, setOpenFilterComponent] = useState(false);
  const [sortValues, setSortValues] = useState("");
  const [multiFilter, setMultiFilter] = useState([]);
  const [filterParams, setFilterParams] = useState({
    type: [],
    category_id: [],
    content_under_offer: "",
  });

  useEffect(() => {
    // Scroll to the top when the component mounts
    window.scrollTo(0, 0);
  }, []);

  // Fetch offered content data
  const offeredContent = async () => {
    setLoading(true);
    try {
      const sortFilter = {};
      const resp = await Post("mediaHouse/dashboard/Count", filterParams);
      const contentData = resp.data.content_under_offer.newdata;
      // const mostViewed = contentData?.slice()?.sort((a, b) => b.content_view_count - a.content_view_count).slice(0, 5);
      // const mostPopular = contentData?.slice()?.sort((a, b) => b.content_view_count - a.content_view_count).slice(5, 15);
      // contentData?.forEach((obj) => {
      //   if (mostViewed.includes(obj)) {
      //     obj.mostviewed = true;
      //   }
      //   if (mostPopular.includes(obj)) {
      //     obj.mostPopular = true;
      //   }
      // });

      setofferd_content(contentData);
      setLoading(false);
    } catch (error) {
      setLoading(false);
    }
  };

  // Toggle favorite status and fetch new data
  const handleFavourite = () => {
    setFav(!fav);
    offeredContent();
  };

  // Sort and Filter Component handlers
  const handleCloseFilterComponent = (values) => {
    setOpenFilterComponent(values);
  };

  const handleCloseSortComponent = (values) => {
    setOpenSortComponent(values);
  };

  const handleSortValues = (values) => {
    setSortValues(values);
    console.log("Sorted by:", values);
  };

  const handleMultiFilter = (values) => {
    console.log('values ----------->', values)
    setMultiFilter(values);

    const categoryFilter = values.filter((el) => el.field === "category_id");
    const typeFilter = values.filter((el) => el.field === "type");
    const contentUnderOffer = values.find((el) => el.field === "content_under_offer")?.values;

    setFilterParams({
      category_id: categoryFilter,
      type: typeFilter,
      content_under_offer: contentUnderOffer,
    });
  };

  console.log('filterParams, sortValues ---->', filterParams, sortValues)

  // Function to format amounts in million
  const formatAmountInMillion = (amount) => {
    return amount?.toLocaleString('en-US', {
      maximumFractionDigits: 0,
    });
  };

  const goBack = () => {
    window.history.back();
  };

  useEffect(() => {
    offeredContent();
  }, [fav]);


  return (
    <>
    {loading && <Loader/>}
      <Header />
      {/* <div className="feedTags_search "> */}

      <div className="feedTags_search">
        <Container fluid>
          <Row>
            <Col sm={12}>
              <div className="feedPreviews d-flex justify-content-between align-items-center flex-wrap">
                <Link onClick={() => window.history.back()} className="back_link">
                  <BsArrowLeft className="text-pink" /> Back{" "}
                </Link>
                <div className="sorting_wrap d-flex">
                  <div className="feedSorting me-4">
                    <div className="fltrs_prnt top_fltr">
                      <p className="lbl_fltr">
                        Filter
                      </p>
                      <button className='sortTrigger' onClick={() => { setOpenFilterComponent(true); }}>Filter <AiFillCaretDown /></button>
                      {
                        openFilterComponent && <TopFilterComn
                          closeFilterComponent={handleCloseFilterComponent}
                          feedMultiFilter={handleMultiFilter}
                        />
                      }
                    </div>
                  </div>
                  <div className="feedSorting">
                    <div className="fltrs_prnt top_fltr">
                      <p className="lbl_fltr">Sort</p>
                      <button className='sortTrigger' onClick={() => { setOpenSortComponent(true); }}>Sort <AiFillCaretDown /></button>
                      {
                        openSortComponent && <Fundsinvested
                          rangeTimeValues={handleSortValues}
                          closeSortComponent={handleCloseSortComponent} />
                      }
                    </div>
                  </div>
                </div>
              </div>
            </Col>
          </Row>
        </Container>
      </div>

      <div className="page-wrap cont_undr_ofr_pg">
        <Container fluid>
          <Row>
            <Col md={12}>
              <div className="feedsMain_wrap">
                <div className="feedsContainer feedofferedContent mb-0">
                  <div className="feedContent_header">
                    <h1 className="rw_hdng">Content under offer</h1>
                  </div>
                  <Row className="" >
                    {offerd_content &&
                      offerd_content.map((curr, index) => {
                        const Audio = curr?.content?.filter((curr) => curr?.media_type === "audio")
                        const Video = curr?.content?.filter((curr) => curr?.media_type === "video")
                        const Image = curr?.content?.filter((curr) => curr?.media_type === "image")
                        const Pdf = curr?.content?.filter((curr) => curr?.media_type === "pdf")
                        const Doc = curr?.content?.filter((curr) => curr?.media_type === "doc")
                        const imageCount = Image.length;
                        const videoCount = Video.length;
                        const audioCount = Audio.length;
                        const pdfCount = Pdf.length;
                        const docCount = Doc.length;
                        return (
                          <Col lg={3} md={4} sm={6} >
                            <ContentFeedCard
                              className="undr_ofr_crd"
                              feedImg={
                                curr.content[0].media_type === "video" ?
                                  curr.content[0].watermark || process.env.REACT_APP_CONTENT_MEDIA + curr.content[0].thumbnail
                                  : curr.content[0].media_type === "image" ?
                                    curr.content[0].watermark || process.env.REACT_APP_CONTENT_MEDIA + curr.content[0].media
                                    : curr.content[0].media_type === "audio" ?
                                      audioic
                                      : curr?.content[0]?.media_type === "doc" || 'pdf' ? docsic : ''}
                              // feedType={contentCamera}
                              feedTag={curr?.content_view_type == "mostpopular" ? "Most Popular" : curr?.content_view_type == "mostviewed" ? "Most viewed" : null}
                              user_avatar={curr?.hopper_id?.avatar_details[0]?.avatar ? process.env.REACT_APP_AVATAR_IMAGE + curr?.hopper_id?.avatar_details[0]?.avatar : avatar}
                              author_Name={curr?.hopper_id?.user_name}
                              // lnkto={`/content-under-offer-detail/${curr?._id}`}
                              lnkto={`/Feeddetail/content/${curr?._id}`}
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
                              fvticns={
                                curr?.favourite_status === "true"
                                  ? favouritedic
                                  : favic
                              }
                              content_id={curr?._id}
                              bool_fav={
                                curr?.favourite_status === "true"
                                  ? "false"
                                  : "true"
                              }
                              favourite={handleFavourite}
                              type_img={curr?.type === "exclusive" ? exclusive : shared}
                              type_tag={curr?.type}
                              feedHead={curr?.heading}
                              feedTime={moment(curr?.published_time_date).format("hh:mm A , DD MMMM YY"
                              )}
                              feedLocation={curr?.location}
                              contentPrice={`${formatAmountInMillion(curr?.ask_price || 0)}`}
                              offeredPrice={`£${curr?.offered_price[curr?.offered_price.length - 1]?.initial_offer_price || curr?.offered_price[curr?.offered_price.length - 1]?.finaloffer_price}`}


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

export default ContentUnderOffer;
