import moment from "moment/moment";
import React, { useEffect, useState } from "react";
import { Col, Container, Row } from "react-bootstrap";
import { BsArrowLeft } from "react-icons/bs";
import { Link, useParams } from "react-router-dom";
import exclusive from "../assets/images/exclusive.png";
import favouritedic from "../assets/images/favouritestar.svg";
import shared from "../assets/images/share.png";
import favic from "../assets/images/star.svg";
import Header from "../component/Header";
import Loader from "../component/Loader";
import ContentFeedCard from "../component/card/ContentFeedCard";
import { Post } from "../services/user.services";
// import audioic from "../assets/images/audio-icon.svg";
import audioic from "../assets/images/audimg.svg";
import cameraic from "../assets/images/camera.svg";
import docsic from "../assets/images/docsic.svg";
import interviewic from "../assets/images/interview.svg";
import pdfic from "../assets/images/pdfic.svg";
import videoic from "../assets/images/video.svg";

const ContentSearch = () => {
  const param = useParams();

  const [fav, setFav] = useState(false);
  const [loading, setLoading] = useState(false);
  const handleFavourite = () => {
    setFav(!fav);
    content();
  };
  // Sort and Filter Open and Close Component-
  const [openSortComponent, setOpenSortComponent] = useState(false);
  const [openFilterComponent, setOpenFilterComponent] = useState(false);
  const [contentvalue, setRatCount] = useState(false);
  const [pur_content, setPur_content] = useState([]);

  const handleCloseFilterComponent = (values) => {
    setOpenFilterComponent(values);
  };

  const content = async () => {
    setLoading(true);

    try {
      const resp = await Post(`mediahouse/view/published/content`, {
        search: param?.type,
      });
      const mostViewd = resp?.data?.content
        ?.slice()
        ?.sort((a, b) => b.content_view_count - a.content_view_count)
        ?.slice(0, 5);
      const mostPopular = resp?.data?.content
        ?.slice()
        ?.sort((a, b) => b.content_view_count - a.content_view_count)
        ?.slice(5, 15);
      resp?.data?.content?.forEach((obj) => {
        if (mostViewd.includes(obj)) {
          obj.mostviewed = true;
        }
      });
      resp?.data?.content?.forEach((obj) => {
        if (mostPopular.includes(obj)) {
          obj.mostPopular = true;
        }
      });

      setPur_content(resp.data.content);
      setLoading(false);
    } catch (error) {
      setLoading(false);
    }
  };

  useEffect(() => {
    content();
  }, [param.type]);
  const handleCloseSortComponent = (values) => {
    setOpenSortComponent(values);
  };

  const [sortValues, setSortValues] = useState("");
  const handleSortValues = (values) => {
    setSortValues(values);
  };

  const [multiFilter, setMultiFilter] = useState([]);
  const handleMultiFilter = (values) => {
    setMultiFilter(values);
  };
  const queryParams = multiFilter
    .map((item) => `${item.field}=${item.values}`)
    .join("&");
  const formatAmountInMillion = (amount) =>
    amount?.toLocaleString("en-US", {
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
              <div className="feedPreviews d-flex justify-content-between">
                {/* <div className="feedHdTags_wrap">
                                    <span className='tag_select'>
                                        <img src={map} className="me-3" alt="" />
                                        Map View</span>
                                </div> */}
                <Link
                  className="back_link"
                  onClick={() => window.history.back()}
                >
                  <BsArrowLeft />
                  Back
                </Link>
                {/* <div className="sorting_wrap d-flex">
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
                                                    closeSortComponent={handleCloseSortComponent}
                                                />
                                            }
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
                <div className="feedsContainer mb-1">
                  <div className="feedContent_header">
                    <h1 className="rw_hdng">Content</h1>
                    {/* <Link to="/Uploaded-Content/all">View all <BsArrowRight className='text-pink' /></Link> */}
                  </div>
                  <Row className="">
                    {pur_content &&
                      pur_content?.filter((el) => el.mostPopular || el.mostviewed)
                      ?.map((item) => {
                        const Audio = item?.content?.filter(
                          (curr) => curr?.media_type === "audio"
                        );
                        const Video = item?.content?.filter(
                          (curr) => curr?.media_type === "video"
                        );
                        const Image = item?.content?.filter(
                          (curr) => curr?.media_type === "image"
                        );
                        const Pdf = item?.content?.filter(
                          (curr) => curr?.media_type === "pdf"
                        );
                        const Doc = item?.content?.filter(
                          (curr) => curr?.media_type === "doc"
                        );

                        const imageCount = Image.length;
                        const videoCount = Video.length;
                        const audioCount = Audio.length;
                        const pdfCount = Pdf.length;
                        const docCount = Doc.length;

                        return (
                          <Col lg={3} md={4} sm={6}>
                            <ContentFeedCard
                              feedImg={
                                item?.content[0]?.media_type === "image"
                                  ? item?.content[0]?.watermark ||
                                    process.env.REACT_APP_CONTENT_MEDIA +
                                      item.content[0].media
                                  : item?.content[0]?.media_type === "video"
                                  ? item?.content[0]?.watermark ||
                                    process.env.REACT_APP_CONTENT_MEDIA +
                                      item.content[0].thumbnail
                                  : item?.content[0]?.media_type === "audio"
                                  ? audioic
                                  : null
                              }
                              // feedType={Image && Image.length > 0 && contentCamera}
                              lnkto={`/Feeddetail/content/${item._id}`}
                              fvticns={
                                item.is_favourite === "true"
                                  ? favouritedic
                                  : favic
                              }
                              content_id={item._id}
                              bool_fav={
                                item.favourite_status === "true"
                                  ? "false"
                                  : "true"
                              }
                              favourite={handleFavourite}
                              user_avatar={
                                process.env.REACT_APP_AVATAR_IMAGE +
                                item?.hopper_id?.avatar_id?.avatar
                              }
                              author_Name={item?.hopper_id?.user_name}
                              type_img={
                                item?.type === "shared" ? shared : exclusive
                              }
                              type_tag={item.type}
                              feedHead={item.description}
                              feedTime={moment(item.timestamp).format(
                                "hh:mm A , DD MMMM YY"
                              )}
                              feedLocation={item.location}
                              viewTransaction="View transaction"
                              contentPrice={`${formatAmountInMillion(
                                item.ask_price || 0
                              )}`}
                              feedTag={item?.mostPopular ? "Most popular" : item?.mostviewed ? "Most viewed" : null}
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
                      })}
                  </Row>
                </div>
              </div>
            </Col>
          </Row>
        </Container>
      </div>
    </>
  );
};

export default ContentSearch;
