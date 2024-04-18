import React, { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom';
import Header from "../component/Header"
import imgs from "../assets/images/imgn6.jpg";
// import img2 from "../assets/images/img2.webp";
import contentCamera from "../assets/images/contentCamera.svg";
// import contentVideo from "../assets/images/contentVideo.svg";
// import avatar from "../assets/images/avatar.png";
// import map from "../assets/images/map.svg";
import ContentFeedCard from '../component/card/ContentFeedCard'
import exclusive from '../assets/images/exclusive.png';
import { Select, MenuItem } from '@mui/material';
import { BsArrowLeft } from "react-icons/bs";
import { Container, Row, Col } from 'react-bootstrap';
import TopSearchesTipsCard from "../component/card/TopSearchesTipsCard";
import DbFooter from '../component/DbFooter';
// import image8 from "../assets/images/img8.jpg";
// import image9 from "../assets/images/img9.jpg";
// import image10 from "../assets/images/img10.jpg";
import favic from "../assets/images/star.svg";
import { Get } from '../services/user.services';
import moment from 'moment/moment';
import Loader from '../component/Loader';
import favouritedic from "../assets/images/favouritestar.svg";
import cameraic from "../assets/images/camera.svg";
// import favic from "../assets/images/favouritestar.svg";
import videoic from "../assets/images/video.svg";
import interviewic from "../assets/images/interview.svg";
import Fundsinvested from '../component/Sortfilters/Dashboard/Fundsinvested';
import TopFilterComn from '../component/Sortfilters/Content/TopFilterComn';
import { AiFillCaretDown } from 'react-icons/ai';
import docsic from "../assets/images/docsic.svg";
import pdfic from "../assets/images/pdfic.svg";
import shared from '../assets/images/share.png';
import audioic from "../assets/images/audimg.svg";



const Purchasedcontent = () => {

  const type = useParams()
  const [fav, setFav] = useState(false)
  const [pur_content, setPur_content] = useState([])
  const [loading, setLoading] = useState(false)

  function capitalizeFirstLetter(string) {
    return string?.charAt(0)?.toUpperCase() + string?.slice(1);
  }

  const PurchasedContent = async (type) => {
    setLoading(true)
    try {
      const resp = await Get(`mediaHouse/publish/content?type=${type}`)
      setPur_content(resp.data.content)
      if (resp) {
        setLoading(false)
      }
    }
    catch (error) {
      setLoading(false)
    }
  }

  const handleFavourite = () => {
    setFav(!fav)
    PurchasedContent(type.type)
  }

  useEffect(() => {
    PurchasedContent(type.type)
  }, [fav])

  // sort Start
  // Sort and Filter Open and Close Component-
  const [openSortComponent, setOpenSortComponent] = useState(false);
  const [openFilterComponent, setOpenFilterComponent] = useState(false);

  const handleCloseFilterComponent = (values) => {
    setOpenFilterComponent(values)
  }

  const handleCloseSortComponent = (values) => {
    setOpenSortComponent(values)
  }

  const [sortValues, setSortValues] = useState("");
  const handleSortValues = (values) => {
    setSortValues(values)
    // console.log("handleSortValues 55", values)
  }

  const [multiFilter, setMultiFilter] = useState([]);
  const handleMultiFilter = (values) => {
    setMultiFilter(values);
    // console.log("multiFilter 59", values)
  }
  const queryParams = multiFilter.map((item) => `${item.field}=${item.values}`).join("&");

  // console.log("queryParams 64", queryParams)


  const [PublishedData, setPublishedData] = useState({
    all: [],
    exclusive: [],
    shared: [],
    crime: [],
    celebrity: []
  })

  const formatAmountInMillion = (amount) =>
    amount?.toLocaleString('en-US', {
      maximumFractionDigits: 2,
    });
  // sort End
  return (
    <>
      {/* {console.log(pur_content, `<----what the things are `)} */}
      <Header />
      {loading && <Loader />}
      <div className="feedTags_search">
        <Container fluid>
          <Row>
            <Col sm={12}>
              <div className="feedPreviews d-flex justify-content-between">
                <div className="feedHdTags_wrap">
                  <Link onClick={() => history.back()}
                    className='back_link mb-3'><BsArrowLeft className='text-pink' />
                    Back
                  </Link>
                </div>

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
                          closeSortComponent={handleCloseSortComponent}
                        />
                      }
                    </div>
                  </div>
                </div>
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
                <div className="feedsContainer feedpurchaseContent mb-0">
                  <div className="feedContent_header">
                    <h1>Purchased Content | {capitalizeFirstLetter(type.type)}</h1>
                  </div>
                  <Row className=''>
                    {pur_content && pur_content?.filter((el) => el.purchased_mediahouse.includes(JSON.parse(localStorage.getItem("user"))?._id))?.map((item) => {

                      const Audio = item?.content?.filter((item) => item?.media_type === "audio");
                      const Video = item?.content?.filter((item) => item?.media_type === "video");
                      const Image = item?.content?.filter((item) => item?.media_type === "image");
                      const Pdf = item?.content?.filter((item) => item?.media_type === "pdf");
                      const Doc = item?.content?.filter((item) => item?.media_type === "doc");

                      const imageCount = Image.length;
                      const videoCount = Video.length;
                      const audioCount = Audio.length;
                      const pdfCount = Pdf.length;
                      const docCount = Doc.length;

                      return (
                        <Col md={3}>
                          <ContentFeedCard
                            feedImg={
                              item.content[0]?.media_type === "video" ?
                                item.content[0]?.watermark || process.env.REACT_APP_CONTENT_MEDIA + item.content[0].thumbnail
                                : item.content[0]?.media_type === "image" ?
                                  item.content[0]?.watermark || process.env.REACT_APP_CONTENT_MEDIA + item.content[0].media
                                  : item.content[0]?.media_type === "audio" ?
                                    audioic
                                    : ''}
                            // feedType={item.content[0].media_type === "video" ? contentVideo : contentCamera}
                            feedTag={"Most Viewed"}
                            userAvatar={imgs}
                            authorName={"pseudonymous"}
                            lnkto={`/purchased-content-detail/${item?.transaction_id}`}
                            most_viewed={true}
                            author_Name={item?.hopper_id?.user_name}
                            user_avatar={process.env.REACT_APP_AVATAR_IMAGE + item?.hopper_id?.avatar_id?.avatar}
                            fvticns={item?.favourite_status === "true" ? favouritedic : favic}
                            content_id={item._id}
                            bool_fav={item.favourite_status === "true" ? "false" : "true"}
                            favourite={() => handleFavourite()} // Call the function directly
                            type_img={item?.type === "shared" ? shared : exclusive}
                            type_tag={item.type === "shared" ? "Shared" : "Exclusive"}
                            feedHead={item.heading}
                            feedTime={moment((item.Vat.filter((el) => el.purchased_mediahouse_id === JSON.parse(localStorage.getItem("user"))?._id))[0]?.purchased_time).format(
                              "hh:mm A, DD MMM YYYY"
                            )}
                            feedLocation={item.location}
                            contentPrice={`${formatAmountInMillion(item.ask_price || 0)}`}

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
                      )
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

  )
}

export default Purchasedcontent