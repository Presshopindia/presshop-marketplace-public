import React, { useEffect, useMemo, useState } from 'react';
import { Link, useLocation } from 'react-router-dom'
import { usePosition } from 'use-position';
import img1 from "../assets/images/img1.png";
import img2 from "../assets/images/img2.png";
import img3 from "../assets/images/img4.png";
import list from "../assets/images/list.svg";
import locationn from "../assets/images/location.svg";
import { Form, Row, Col } from 'react-bootstrap';
import { Avatar, Button, Typography, Card, CardContent } from "@mui/material";
import { BiPlay, BiTimeFive, BiSupport } from "react-icons/bi";
import { MdMyLocation, MdDateRange, MdOutlineWatchLater, MdAdd } from "react-icons/md";
import { BsPeople, BsArrowRight } from "react-icons/bs";
import exclusive from '../assets/images/exclusive.png';
import { Get, Post } from '../services/user.services';
import moment from 'moment/moment';
import shared from '../assets/images/share.png';
import Timer from '../component/Timer';
import Loader from '../component/Loader';
import bullseye from "../assets/images/bullseye.svg";
import calendaric from "../assets/images/calendarnic.svg";
import timeic from "../assets/images/watch.svg";
import docsic from "../assets/images/docsic.svg"
import { SlLocationPin } from 'react-icons/sl';
import { AiOutlineStar } from 'react-icons/ai';
import crime from "../assets/images/sortIcons/crime.svg";
import presshopchatic from "../assets/images/chat-icons/presshoplogo.svg";
import cameraic from "../assets/images/camera.svg";
import videoic from "../assets/images/video.svg";
import io from "socket.io-client";
// import contentimg from "../assets/images/ImgSortTab1.svg"
import ContentChatSocket from '../component/ContentChatSocket';
import { capitalizeFirstLetter } from '../component/Utils';
// import WatermarkedImage from '../component/WatermarkedImage';
// import audioic from "../assets/images/audio-icon.svg";
import audioic from "../assets/images/audimg.svg";
const socket = io.connect("https://uat.presshop.live:3005");
import AudioPlayer from 'react-h5-audio-player';
import 'react-h5-audio-player/lib/styles.css';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';

// import 'swiper/components/navigation/navigation.min.css';
// import 'swiper/components/pagination/pagination.min.css';
// import SwiperCore, { Navigation, Pagination } from 'swiper';

// Install Swiper modules
// SwiperCore.use([Navigation, Pagination]);

const images = [
    { url: "images/1.jpg" },
    { url: "images/2.jpg" },
    { url: "images/3.jpg" },
    { url: "images/4.jpg" },
    { url: "images/5.jpg" },
    { url: "images/6.jpg" },
    { url: "images/7.jpg" },
];

const ContentDtlChat = (props) => {
    const [data, setData] = useState();
    const [room_details, setRoom_Details] = useState();
    const [loading, setLoading] = useState(false);
    const [offer_change, setOffer_change] = useState(false);
    const [messages, setMessages] = useState([]);
    const [content, setContent] = useState([]);


    const ContentByID = async (content_id) => {
        setLoading(true);
        const obj = { id: content_id };
        try {
            const resp = await Post(`mediaHouse/view/published/content`, obj);
            if (resp) {
                setData(resp.data.content);
                setLoading(false);
                setContent(resp.data.content.content);
            }
        } catch (error) {
            // console.log(error);
            setLoading(false);
        }
    };

    const CreateRoom = async (hopper_id, content_id) => {
        const obj = {
            receiver_id: hopper_id,
            room_type: "MediahousetoAdmin",
            type: "external_content",
            content_id: content_id,
        };
        const resp = await Post(`mediaHouse/createRoom`, obj);
        if (resp) {
            setRoom_Details(resp.data.details);
            // JoinRoom(resp.data.details.room_id)
            // getMessages(resp.data.details.room_id)
        }
    };


    const getMessages = async (room_id) => {
        const resp = await Post(`mediaHouse/getAllchat`, { room_id: room_id });
        if (resp) {
            // console.log(resp.data.response, "<-----------this is a message of response");
            setMessages(resp.data.response);
        }
    };

    const Start_Offer = () => {
        try {
            let obj = {
                room_id: room_details.room_id,
                content_id: room_details.content_id,
                sender_type: "Mediahouse",
                sender_id: room_details.sender_id,
                message_type: "offer_started",
                receiver_id: room_details.receiver_id,
                initial_offer_price: "",
                finaloffer_price: "",
            };
            socket.emit("initialoffer", obj);
            socket.on("initialoffer", (obj) => {
                // console.log(obj, `<<<<<<<obj`)
                getMessages(room_details?.room_id);
            });
            // getMessages()
        } catch (error) {

        }
    };

    const JoinRoom = (room_id) => {
        socket.emit("room join", { room_id: room_id });
        socket.on("room join", (obj) => {
            // console.log("room join:", obj);
        });
        getMessages(room_id);
    };

    useMemo(() => {
        // getMessages()
        // if (room_details?.room_id) {
        JoinRoom(room_details?.room_id);
        // }
    }, [room_details?.room_id]);

    useEffect(() => {
        if (room_details?.room_id) {
            getMessages(room_details?.room_id);
        }
    }, [socket]);
    return (
        <>

            <div className="trackingList_wrap cht_tsk_trck feed-detail mb-0">
                {/* start */}
                <div className="feedsMain_wrap">
                    <div className="feedsContainer mb-0">
                        <div className='cht_tsk_rw d-flex'>
                            <div className='ps-0 pe-01 chat_loc_wp'>
                                <Card className="feeddetail-card left-card h-100">
                                    <CardContent className="card-content">
                                        {data?.content?.length === 1 &&
                                            data?.content[0]?.media_type === "audio" &&
                                            <div className="content_audio_img cont_swipe_aud">
                                                {/* <img src={audioic} alt="" height="100px" width="auto" /> */}
                                                <AudioPlayer
                                                    // autoPlay
                                                    src={process.env.REACT_APP_CONTENT_MEDIA + data?.content[0]?.media}
                                                    // onPlay={e => console.log("onPlay")}
                                                // other props here
                                                />
                                            </div>
                                        }
                                        {data?.content?.length === 1 &&
                                            data?.content[0]?.media_type === "video" &&
                                            <img src={process.env.REACT_APP_CONTENT_MEDIA + data?.content[0]?.thumbnail} alt={null} />
                                        }
                                        {data?.content?.length === 1 &&
                                            data?.content[0]?.media_type === "image" &&
                                            <img src={data.paid_status === "paid" ? process.env.REACT_APP_CONTENT_MEDIA + data?.content[0]?.media : data?.content[0]?.watermark} alt={null} />
                                        }
                                        {data?.content?.length > 1 &&
                                            <Swiper
                                                spaceBetween={50}
                                                slidesPerView={1}
                                                // navigation
                                                // navigation={true}
                                                // slidesPerGroupSkip={1}
                                                // focusableElements="pagination"
                                                // nested={true}
                                                pagination={{ clickable: true }}
                                                // onSlideChange={() => console.log('slide change')}
                                                // onSwiper={(swiper) => console.log(swiper)}
                                            >
                                                {data && data.content.map((item) => {
                                                    return (
                                                        <SwiperSlide>
                                                            {item.media_type === "audio" ?
                                                                <div className="content_audio_img cont_swipe_aud">
                                                                    <AudioPlayer
                                                                        // autoPlay
                                                                        src={process.env.REACT_APP_CONTENT_MEDIA + item.media}
                                                                        // onPlay={e => console.log("onPlay")}
                                                                    // other props here
                                                                    />
                                                                </div>
                                                                : item.media_type === "video" ?
                                                                    <img src={process.env.REACT_APP_CONTENT_MEDIA + item.thumbnail} alt={null} />
                                                                    :
                                                                    item?.media_type === "pdf" ?
                                                                        <embed src={`${process.env.REACT_APP_CONTENT_MEDIA + item?.media}`} type="application/pdf" width="100%" height="500" /> :
                                                                    <img src={data.paid_status === "paid" ? process.env.REACT_APP_CONTENT_MEDIA + item.media : item.watermark} alt={null} />}

                                                        </SwiperSlide>
                                                    )
                                                })}
                                            </Swiper>
                                        }
                                        <div className="feedTitle_content">
                                            <h1 className='feedTitle'>{data?.heading}</h1>
                                            <p className='feed_descrptn'>{data?.description}</p>
                                        </div>
                                    </CardContent>
                                </Card>
                            </div>
                            <div className='cht_tsk_wp'>
                                <Card className="feeddetail-card h-100 content-info">
                                    <CardContent className="card-content">
                                        <div className="sub-content">
                                            <div className="heading w-100 d-flex align-items-center justify-content-between">
                                                <Typography> Content info</Typography>
                                                {data?.favourite_status &&
                                                    <div className="favourite">
                                                        <AiOutlineStar />
                                                        <span>Favourite</span>
                                                    </div>
                                                }
                                            </div>
                                        </div>
                                        <div className="content">
                                            <div className="sub-content">
                                                <div className="item d-flex justify-content-between align-items-center">
                                                    <span className="fnt-bold">Author</span>
                                                    <div className="item-in-right">
                                                        <img src={process.env.REACT_APP_AVATAR_IMAGE + data?.hopper_id?.avatar_id?.avatar} alt="" />
                                                        <span>{data?.hopper_id?.user_name}</span>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="sub-content">
                                                <div className="item d-flex justify-content-between align-items-center">
                                                    <span className="fnt-bold">Location</span>
                                                    <div className="item-in-right loc">
                                                        <span><SlLocationPin /> <div>{data?.location}</div></span>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="sub-content">
                                                <div className="item d-flex justify-content-between align-items-center">
                                                    <span className="fnt-bold">TimeStamp</span>
                                                    <div className="item-in-right loc">
                                                        <span><MdOutlineWatchLater />{moment(data?.timestamp).format("h:mm A, DD MMMM YY")}</span>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="sub-content tags_wrp">
                                                <div className="item d-flex justify-content-between align-items-center">
                                                    <span className="fnt-bold">Hashtags</span>
                                                    <div>
                                                        <div className="item-in-right hashtag-wrap">
                                                            {data && data?.tag_ids?.map((tag) => {
                                                                return (
                                                                    <span className="mr">#{tag.name}</span>
                                                                )
                                                            })
                                                            }
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="sub-content">
                                                <div className="item d-flex justify-content-between align-items-center">
                                                    <span className="fnt-bold">Category</span>
                                                    <div className="">
                                                        <span>{capitalizeFirstLetter(data?.category_id?.name)}</span>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="sub-content">
                                                <div className="item d-flex justify-content-between align-items-center">
                                                    <span className="fnt-bold">Licence Type</span>
                                                    <div className="">
                                                        <img src={data?.type === "exclusive" ? exclusive : shared} className="exclusive-img" alt="" />
                                                        <span>{capitalizeFirstLetter(data?.type)}</span>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="foot cont-info-actions d-flex justify-content-between align-items-center">
                                                {messages && messages.length === 0 && <Link><Button variant='secondary' disabled={messages && messages[0]?.message_type === "offer_started"} onClick={() => {
                                                    if (messages && messages[0]?.message_type !== "offer_started") {
                                                        Start_Offer()
                                                    }
                                                }}>Offer</Button></Link>}
                                                <Link> <Button variant='primary' onClick={""}>£{data?.ask_price}</Button></Link>
                                            </div>
                                            <div className="foot cont-info-actions d-flex gap-5 justify-content-between align-items-center">
                              {messages && messages.length === 0 ? (
                                <Button
                                  variant="secondary"
                                  onClick={() => {
                                    if (messages[0]?.message_type !== "offer_started") {
                                      Start_Offer();
                                    }
                                  }}
                                >
                                  Offer
                                </Button>
                              ) : messages?.length === 1 ? (
                                <Button disabled={true} className="greyBtn">
                                  Offer
                                </Button>
                              ) : messages?.filter((el) => el.message_type === "PaymentIntent")?.[0]?.amount ? (
                                <Button className="offeredPrice_btn bigBtn" disabled={true}>
                                  <Link to={`/auto-invoice/${data.id}`}>£{Number(messages?.filter((el) => el.message_type === "PaymentIntent")[0]?.amount)?.toLocaleString('en-US', { maximumFractionDigits: 2 })}</Link>
                                </Button>
                              ) : (
                                <Button className="offeredPrice_btn bigBtn" disabled={true}>
                                  £{Number(messages?.filter((el) => el.message_type === "Mediahouse_initial_offer")[0]?.initial_offer_price)?.toLocaleString('en-US', { maximumFractionDigits: 2 })}
                                </Button>
                              )}
                              {/* {(data?.paid_status !== "paid" && <Link to={`/auto-invoice/${data?.id}`}>
                                <Button variant="primary">
                                £
                                {data
                                  && data?.ask_price?.toLocaleString('en-US', { maximumFractionDigits: 2 }) || 0
                                }
                              </Button>
                            </Link>
                              )
                            } */}
                              {/* {
                                data?.paid_status === "paid" && <Link className="w-100">
                                {" "}
                                <Button className="greyBtn">Paid</Button>
                              </Link>
                                } */}
                            </div>
                                        </div>
                                    </CardContent>
                                </Card>
                            </div>
                        </div>
                        {/* experiment Start */}
                        <div className="d-flex gap_20 mt_20 justify-content-start">
                            <ContentChatSocket messages={messages} room_details={room_details} offer_change={offer_change} count={data?.content?.length} />
                            <Card className="chatmain participants">
                                <CardContent className="chatting">
                                    <div className="chatting_header d-flex align-items-start justify-content-start">
                                        <p className="mb-0">Content</p>
                                    </div>
                                    <div className="chat_content_list">
                                        {props.contents && props.contents.map((curr) => {
                                            return (
                                                <Card className="list-card rcnt_act_card mb-3" onClick={() => {
                                                    ContentByID(curr._id)
                                                    CreateRoom(curr.hopper_id, curr._id)
                                                    setOffer_change(!offer_change)
                                                }}>
                                                    <CardContent className="dash-c-body p-0">
                                                        <div className="list-in d-flex align-items-start">
                                                            <div className="rateReview_content me-2">
                                                                <span className="rateView-type"><img className="cont_type_ic" src={curr?.content[0]?.media_type === "video" ? videoic : cameraic} /></span>
                                                                <img className="list-card-img" src={curr?.content[0]?.media_type === "video" ? process.env.REACT_APP_CONTENT_MEDIA + curr?.content[0]?.thumbnail : curr?.content[0]?.media_type === "audio" ? audioic : curr?.content[0]?.media_type === "pdf" ? docsic : process.env.REACT_APP_CONTENT_MEDIA + curr?.content[0]?.media} alt="1" />
                                                                {/* <img className="list-card-img" src={audioic} alt="1" /> */}
                                                            </div>
                                                            <div className="list-in-txt">
                                                                <Typography variant="body2" className="list-car-txt mb-2">
                                                                    {curr.heading}
                                                                    <br />
                                                                </Typography>
                                                                <Typography
                                                                    sx={{ fontSize: 12 }}
                                                                    color="#9DA3A3"
                                                                    gutterBottom className="crd_time d-flex align-items-center mb-0 txt_mdm">
                                                                    <MdOutlineWatchLater color="#000" />
                                                                    {moment(curr?.published_time_date).format(
                                        "h:mm A, DD MMMM YY"
                                      )}
                                                                </Typography>
                                                            </div>
                                                        </div>
                                                    </CardContent>
                                                </Card>
                                            )
                                        })}
                                    </div>
                                    {/* <div className="chatting_header d-flex align-items-start justify-content-start mt-4 mb-3">
                                        <p className="mb-0 pb-2">Employee</p>
                                    </div>
                                    <div className="chat_content_list">
                                        {props.users && props.users.map((curr) => {
                                            return (
                                                <Card
                                                    className="list-card rcnt_act_card mb-3"
                                                >
                                                    <CardContent className="dash-c-body p-0">
                                                        <div className="list-in d-flex align-items-start">
                                                            <div className="rateReview_content me-2">
                                                                <img className="list-card-img" src={process.env.REACT_APP_EMPLOYEE_IMAGE + curr.profile_image} alt="1" />
                                                            </div>
                                                            <div className="list-in-txt">
                                                                <Typography variant="body2" className="list-car-txt mb-2">
                                                                    <br />
                                                                </Typography>
                                                            </div>
                                                        </div>
                                                    </CardContent>
                                                </Card>
                                            )
                                        })}
                                    </div> */}
                                </CardContent>
                            </Card>
                        </div>
                        {/* experiment End */}
                    </div>
                </div>
            </div>
        </>

    )
}

export default ContentDtlChat