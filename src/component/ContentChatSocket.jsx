import { Card, CardContent } from "@mui/material";
import moment from "moment";
import * as React from "react";
import { useEffect, useState } from "react";
import Form from 'react-bootstrap/Form';
import { Rating } from 'react-simple-star-rating';
import io from "socket.io-client";
import presshopchatic from "../assets/images/chat-icons/presshoplogo.svg";
import { Get, Post } from "../services/user.services";
import Loader from "./Loader";
import { UserDetails } from "./Utils";
import { useDarkMode } from "../context/DarkModeContext";
const socket = io.connect("https://uat.presshop.live:3005"); //https://uat.presshop.live:3005

function ContentChatSocket(props) {

    const user = UserDetails
    const [roomId, setRoomId] = useState(null);
    const [msg, setMsg] = useState("")
    const [offer_value, setOffer_value] = useState("")
    const [messages, setMessages] = useState([]);
    const [loading, setLoading] = useState(false)
    const [review, setReview] = useState("")
    const [name, setName] = useState()
    const [profileImage, setProfileImage] = useState()
    const [onlineUsers, setOnlineUsers] = useState([]);
    // const [roomDetails, setRoomDetails] = useState()
    const [file, setFile] = useState(null);
    const [media, setMedia] = useState(null);
    const [mediaMessage, setMediaMessage] = useState({
        // room_type: "",
        room_id: "",
        message: "",
        primary_room_id: "",
        sender_id: "",
        message_type: "",
        attachment_name: "",
        attachment_size: "",
        attachment: "",
        receiver_id: ""
    })
    const [rating, setRating] = useState(0)
    const handleRating = (rate) => {
        setRating(rate)
    }

    const { profileData } = useDarkMode();
    const userImage = profileData?.hasOwnProperty("admin_detail") ? profileData?.admin_detail?.admin_profile
    : profileData?.profile_image

    const userName = profileData?.full_name

    const Profile = async () => {
        setLoading(true)
        try {
            setLoading(false)
            const resp = await Get(`mediaHouse/getProfile`)
            setProfileImage(resp.data.profile.admin_detail.admin_profile)
            setName(resp.data.profile.full_name)
        }
        catch (error) {
            setLoading(false)
        }
    }

    const hopperFinalOffer = props.messages.find(item => item.message_type === "Mediahouse_final_offer");
    const hopperFinalOfferPrice = hopperFinalOffer ? hopperFinalOffer.finaloffer_price : "";

    const MediahouseFinal = props.messages.find(item => item.message_type === "Mediahouse_final_counter");
    const MediahouseFinalCounter = MediahouseFinal ? true : false

    const MediahouseInitial = props.messages.find(item => item.message_type === "Mediahouse_initial_offer");
    const MediahouseInitialOffer = MediahouseInitial ? true : false

    const Paymentt = props.messages.find(item => item.message_type === "PaymentIntent");
    const PaymentIntent = Paymentt ? Paymentt.paid_status : ""


    const JoinRoom = () => {
        socket.emit("room join", { room_id: props?.roomDetails?.roomsdetails?.room_id })
    }

    const getMessages = async (room_id) => {
        const resp = await Post(`mediaHouse/getAllchat`, { room_id: room_id })
        if (resp) {
            setMessages(resp.data.response)
        }
    }

    const Content_Offer = (offer_type) => {
        alert(offer_type)
        try {
            let obj = {
                room_id: props.room_details.room_id,
                content_id: props.room_details.content_id,
                sender_type: "Mediahouse",
                sender_id: props.room_details.sender_id,
                message_type: offer_type,
                receiver_id: props.room_details.receiver_id,
                initial_offer_price: "",
                finaloffer_price: ""
            }
            if (offer_type === "Mediahouse_initial_offer") {
                obj.initial_offer_price = offer_value;
            }

            if (offer_type === "Mediahouse_final_offer") {
                obj.finaloffer_price = offer_value;
            }
            socket.emit("initialoffer", obj)
            alert("in")
            setOffer_value("")
            getMessages(props.room_details.room_id)

        } catch (error) {
        }
    }

    const RatingForHopper = () => {
        try {
            let obj = {
                room_id: props.room_details.room_id,
                content_id: props.room_details.content_id,
                sender_type: "Mediahouse",
                sender_id: props.room_details.sender_id,
                message_type: "rating_hopper",
                receiver_id: props.room_details.receiver_id,
                initial_offer_price: "",
                finaloffer_price: ""
            }
            socket.emit("initialoffer", obj)
            getMessages(props.room_details.room_id)
        } catch (error) {
        }
    }

    const RatingForMediahouse = () => {
        try {

            let obj = {
                room_id: props.room_details.room_id,
                content_id: props.room_details.content_id,
                sender_type: "Mediahouse",
                sender_id: props.room_details.sender_id,
                message_type: "rating_mediaHouse",
                receiver_id: props.room_details.receiver_id,
                initial_offer_price: "",
                finaloffer_price: ""
            }

            socket.emit("initialoffer", obj)
            getMessages(props.room_details.room_id)

        } catch (error) {
        }
    }


    const Payment = async (curr) => {
        const obj = {
            image_id: curr.image_id,
            amount: curr.amount,
            type: "content",
            customer_id: UserDetails.stripe_customer_id
        }

        const resp = await Post('mediahouse/createPayment', obj)
        window.open(resp.data.url, '_blank')
        if (resp) {
            getMessages(props.room_details.room_id)
        }
    }

    const paymentintent = (curr) => {
        const obj = {
            room_id: props.room_details.room_id,
            content_id: props.room_details.content_id,
            sender_type: "Mediahouse",
            sender_id: props.room_details.sender_id,
            message_type: "PaymentIntent",
            receiver_id: props.room_details.receiver_id,
            initial_offer_price: "",
            finaloffer_price: ""
        }
        socket.emit("initialoffer", obj)
        socket.on("initialoffer", (obj) => {
        })
        getMessages(props.room_details.room_id)
        Payment(curr)
        RatingForMediahouse()
        RatingForHopper()
    }

    const RatingNReview = (image_id) => {
        const obj = {
            room_id: props.room_details.room_id,
            sender_type: "Mediahouse",
            receiver_id: props.room_details.receiver_id,
            sender_id: props.room_details.sender_id,
            rating: rating,
            review: review,
            chat_id: props.messages && props.messages.find((obj) => obj.message_type === "rating_mediaHouse")._id,
            type: "content",
            image_id: image_id
        }
        socket.emit("rating", obj)
        socket.on("rating", (obj) => {
        })
        getMessages(props.room_details.room_id)
    }

    // useEffect(() => {
    //     JoinRoom()
    //     getMessages()
    // }, [])

    // const CreateRoom = async () => {
    //     const obj = {
    //         receiver_id: props.senderId,
    //         room_type: "MediahousetoAdmin"
    //         // task_id: props.id
    //     }
    //     const resp = await Post(`mediaHouse/createRoom`, obj)
    //     setRoomDetails(resp.data.details)
    // }

    // const handleFileChange = async (event) => {
    //     event.preventDefault()
    //     const formdata = new FormData()
    //     formdata.append("media", event.target.files[0])
    //     formdata.append("path", "chatMedia")
    //     const resp = await Post(`mediaHouse/uploadUserMedia`, formdata)
    //     if (resp) {
    //         setMediaMessage({
    //             room_id: props.roomDetails.roomsdetails.room_id,
    //             message: msg,
    //             primary_room_id: props.roomDetails.roomsdetails._id,
    //             sender_id: props.roomDetails.roomsdetails.receiver_id,
    //             message_type: "media",
    //             attachment_name: event.target.files[0].name,
    //             attachment_size: event.target.files[0].size,
    //             attachment: resp.data.path,
    //             receiver_id: props.roomDetails.roomsdetails.sender_id
    //         })
    //     }
    // };
    // const SendMedia = () => {
    //     socket.emit("media message", mediaMessage)
    //     socket.on("media message", (obj) => {
    //     })
    //     setMediaMessage({
    //         room_type: "",
    //         room_id: "",
    //         message: "",
    //         primary_room_id: "",
    //         sender_id: "",
    //         message_type: "",
    //         attachment_name: "",
    //         attachment_size: "",
    //         attachment: "",
    //         receiver_id: ""
    //     })
    //     setMsg("")
    //     getMessages()
    // }

    // const staticPayment = async (data) => {
    //     const obj = {
    //         image_id: data.image_id,DownloadContent
    //         sender_id: data.sender_id._id,
    //         receiver_id: data.receiver_id._id,
    //         room_id: data.room_id,
    //         sender_type: "mediahouse",
    //         amount: data.media.amount,
    //         message_type: "buy"
    //     }
    //     const resp = await Post('mediahouse/buyuploadedcontent', obj)
    //     if (resp) {
    //         getMessages()
    //     }
    // }


    const DownloadContent = async (id) => {
        const resp = await Get(`mediahouse/image_pathdownload?image_id=${id}&type=content`)
        if (resp) {
            const filename = resp.data.message.slice(85)
            fetch(resp.data.message)
                .then(response => response.blob())
                .then(blob => {
                    const downloadElement = document.createElement('a');
                    const url = URL.createObjectURL(blob);
                    downloadElement.href = url;
                    downloadElement.download = filename;
                    downloadElement.click();
                    URL.revokeObjectURL(url);
                });
        }
    }

    const requestMoreContent = (curr) => {
        try {
            let obj = {
                room_id: curr?.room_id,
                sender_id: curr?.sender_id?._id,
                receiver_id: curr?.receiver_id?._id,
                sender_type: "mediahouse",
                message_type: 'request_more_content',
            }

            socket.emit("offer message", obj)
            socket.on("offer message", (obj) => {
                getMessages()
            })
        } catch (error) {
        }
    }
    useEffect(() => {
        Profile()
    }, [])

    useEffect(() => {
        // Socket event listener for incoming messages
        socket.on('getallchat', (message) => {
            setMessages((prevMessageList) => [...prevMessageList, message]);
        });

        // Clean up the event listener when the component unmounts
        return () => {
            socket.off('messageReceived');
        };
    }, []);

    // useEffect(() => {
    //     getMessages(props?.room_details?.room_id)
    // }, [socket, props?.room_details?.room_id])

    return (
        <>
            {loading && <Loader />}
            <Card className="chatmain cht_ht">
                <CardContent className="chatting">
                    <div className="chatting_header">
                        <p className="mb-0">
                            Manage content
                        </p>
                    </div>
                    <div className="chat_msgs_scrl">
                        <>
                            {
                                props.messages && props.messages.map((curr) => {
                                    const Ratingg = props.messages && props.messages.find(item => item?.message_type === "rating_mediaHouse");
                                    const Ratings = Ratingg ? Ratingg?.rating : ""
                                    return (
                                        curr.message_type === "offer_started" ?
                                            <div div className="chatting_itm sngl_cht d-flex align-items-start" >
                                                <img src={presshopchatic} alt="User" className="usr_img" />
                                                <div className="cht_txt">
                                                    <div className="d-flex align-items-center">
                                                        <p className="usr_name mb-0">{"Presshop"}
                                                        </p>
                                                        <p className="cht_time mb-0">{moment(curr?.createdAt).format(`h:mm A, D MMM YYYY`)}</p>
                                                    </div>
                                                    <p className="mb-0 msg">Make an initial offer by entering your price below</p>
                                                    <div className="usr_upld_opts cont_opts">
                                                        <input className="cht_prc_inp text-center" disabled={props.messages.length !== 1 && true} type="number" value={props?.messages[1]?.initial_offer_price ? props?.messages[1]?.initial_offer_price : offer_value} placeholder="Enter price here..."
                                                            onChange={(e) => {
                                                                setOffer_value(e.target.value)
                                                            }} />
                                                        {!MediahouseInitialOffer &&
                                                            <button className="theme_btn" disabled={props.messages.length !== 1 && true}
                                                                onClick={() => Content_Offer("Mediahouse_initial_offer")
                                                                }>
                                                                Submit
                                                            </button>}
                                                    </div>
                                                </div>
                                            </div>

                                            : curr.message_type === "Mediahouse_initial_offer" ?
                                                <div className="chatting_itm auto_msg sngl_cht d-flex align-items-start" >
                                                    <img src={userImage} alt="User" className="usr_img" />
                                                    <div className="cht_txt">
                                                        <div className="d-flex align-items-center">
                                                            <p className="usr_name mb-0">{userName}
                                                            </p>
                                                            <p className="cht_time mb-0">{moment(curr?.createdAt).format(`h:mm A, D MMM YYYY`)}</p>
                                                        </div>
                                                        <p className="mb-0 msg auto_press_msg">Has initially offered £{curr.message_type === "Mediahouse_initial_offer" && curr.initial_offer_price} to buy the content</p>
                                                    </div>
                                                </div>
                                                : curr.message_type === "hopper_final_offer" ?
                                                    <div className="chatting_itm sngl_cht d-flex align-items-start" >
                                                        <img src={process.env.REACT_APP_AVATAR_IMAGE + JSON.parse(localStorage.getItem("hopperList"))?.filter((el) => el._id === curr.sender_id.id)?.[0]?.hopper_id?.avatar_id?.avatar} alt="User" className="usr_img" />
                                                        <div className="cht_txt">
                                                            <div className="d-flex align-items-center">
                                                                <p className="usr_name mb-0">{JSON.parse(localStorage.getItem("hopperList"))?.filter((el) => el._id === curr.sender_id.id)?.[0]?.hopper_id?.user_name}
                                                                </p>
                                                                <p className="cht_time mb-0">{moment(curr?.createdAt).format(`h:mm A, D MMM YYYY`)}</p>
                                                            </div>
                                                            <p className="mb-0 msg">Has counter offered <a className="link">£{curr.message_type === "hopper_final_offer" && curr.finaloffer_price}</a> to sell the content</p>
                                                            {!MediahouseFinalCounter && <div className="usr_upld_opts">
                                                                <button className="theme_btn ">
                                                                    Buy
                                                                </button>
                                                                <span>or</span>
                                                                <button className="secondary_btn" onClick={() => Content_Offer("Mediahouse_final_counter")}>
                                                                    Make a Counter Offer
                                                                </button>
                                                            </div>
                                                            }
                                                            <p className="buy_btn_txt mb-0">The Hopper can make a counter offer only once to you</p>
                                                        </div>
                                                    </div>
                                                    : curr.message_type === "Mediahouse_final_counter" ?
                                                        <div className="chatting_itm sngl_cht d-flex align-items-start" >
                                                            <img src={presshopchatic} alt="User" className="usr_img" />
                                                            <div className="cht_txt">
                                                                <div className="d-flex align-items-center">
                                                                    <p className="usr_name mb-0">{"Presshop"}
                                                                    </p>
                                                                    <p className="cht_time mb-0">{moment(curr?.createdAt).format('h:mm A, D MMM YYYY')}</p>
                                                                </div>
                                                                <p className="mb-0 msg">Make an final counter offer by entering your price below</p>

                                                                <div className="usr_upld_opts cont_opts">
                                                                    <input className="cht_prc_inp text-center"
                                                                        disabled={hopperFinalOfferPrice}
                                                                        type="text" value={hopperFinalOfferPrice ? hopperFinalOfferPrice : offer_value} placeholder="Enter price here..."
                                                                        onChange={(e) => {
                                                                            setOffer_value(e.target.value)
                                                                        }} />
                                                                    {!hopperFinalOfferPrice && <button className="theme_btn"
                                                                        // disabled={hopperFinalOfferPrice && true}
                                                                        onClick={() => Content_Offer("Mediahouse_final_offer")}>
                                                                        Submit
                                                                    </button>}
                                                                </div>
                                                            </div>
                                                        </div>
                                                        : curr.message_type === "Mediahouse_final_offer" ?
                                                            <div className="chatting_itm auto_msg sngl_cht d-flex align-items-start" >
                                                                <img src={userImage} alt="User" className="usr_img" />
                                                                <div className="cht_txt">
                                                                    <div className="d-flex align-items-center">
                                                                        <p className="usr_name mb-0">{userName}
                                                                        </p>
                                                                        <p className="cht_time mb-0">{moment(curr?.createdAt).format('h:mm A, D MMM YYYY')}</p>
                                                                    </div>
                                                                    <p className="mb-0 msg auto_press_msg">Has finally offered £{curr.message_type === "Mediahouse_final_offer" && curr.finaloffer_price} to buy the content</p>
                                                                </div>
                                                            </div>
                                                            : curr.message_type === "accept_mediaHouse_offer" ?
                                                                <div className="chatting_itm sngl_cht d-flex align-items-start" >
                                                                    <img src={process.env.REACT_APP_AVATAR_IMAGE + JSON.parse(localStorage.getItem("hopperList"))?.filter((el) => el._id === curr.sender_id.id)?.[0]?.hopper_id?.avatar_id?.avatar} alt="User" className="usr_img" />
                                                                    <div className="cht_txt">
                                                                        <div className="d-flex align-items-center">
                                                                            <p className="usr_name mb-0">{JSON.parse(localStorage.getItem("hopperList"))?.filter((el) => el._id === curr.sender_id.id)?.[0]?.hopper_id?.user_name}
                                                                            </p>
                                                                            <p className="cht_time mb-0">{moment(curr?.createdAt).format('h:mm A, D MMM YYYY')}</p>
                                                                        </div>
                                                                        <p className="mb-0 msg" >
                                                                            Has accepted your offer of <a a className="link" >£{curr.amount}</a> to sell the content
                                                                        </p>
                                                                        <div className="usr_upld_opts">
                                                                            <button className={curr.paid_status === true ? "sub_hdng_inn" : "theme_btn"} disabled={curr.paid_status === true} onClick={() => paymentintent(curr)}>
                                                                                Buy
                                                                            </button>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                                : curr.message_type === "reject_mediaHouse_offer" ?
                                                                    <div className="chatting_itm sngl_cht d-flex align-items-start" >
                                                                        <img src={presshopchatic} alt="User" className="usr_img" />
                                                                        <div className="cht_txt">
                                                                            <div className="d-flex align-items-center">
                                                                                <p className="usr_name mb-0">{"Presshop"}
                                                                                </p>
                                                                                <p className="cht_time mb-0">{moment(curr?.createdAt).format('h:mm A, D MMM YYYY')}</p>
                                                                            </div>
                                                                            <p className="mb-0 msg" >
                                                                                Has rejected your offer to sell the content
                                                                            </p>
                                                                        </div>
                                                                    </div>
                                                                    : (curr.message_type === "PaymentIntent" && PaymentIntent) ?
                                                                        <div className="chatting_itm auto_msg sngl_cht d-flex align-items-start" >
                                                                            <img src={presshopchatic} alt="User" className="usr_img" />
                                                                            <div className="cht_txt">
                                                                                <div className="d-flex align-items-center">
                                                                                    <p className="usr_name mb-0">Presshop
                                                                                    </p>
                                                                                    <p className="cht_time mb-0">{moment(curr?.createdAt).format('h:mm A, D MMM YYYY')}</p>
                                                                                </div>
                                                                                <p className="mb-0 msg auto_press_msg">Congrats, you’ve successfully purchased {props.count} content for £{curr.amount_paid}. Please download the water-mark free, and  high definition content, by clicking below</p>
                                                                                <div className="usr_upld_opts">
                                                                                    <button className="theme_btn" onClick={() => DownloadContent(curr.image_id)}>
                                                                                        Download
                                                                                    </button>
                                                                                </div>
                                                                                <p className="buy_btn_txt mb-0">Please refer to our <a className="link">licensing terms of usage</a>, and <a className="link">terms and conditions</a>. If you have any questions, please <a className="link">chat</a> or <a className="link">contact</a> our helpful teams who are available 24x7 to assist you. Thank you.</p>
                                                                            </div>
                                                                        </div>

                                                                        : curr.message_type === "rating_mediaHouse" && curr.paid_status ?
                                                                            <div className="chatting_itm auto_msg rating sngl_cht d-flex align-items-start" >
                                                                                <img src={presshopchatic} alt="User" className="usr_img" />
                                                                                <div className="cht_txt">
                                                                                    <div className="d-flex align-items-center">
                                                                                        <p className="usr_name mb-0">Presshop
                                                                                        </p>
                                                                                        <p className="cht_time mb-0">{moment(curr?.createdAt).format('h:mm A, D MMM YYYY')}</p>
                                                                                    </div>
                                                                                    <p className="mb-0 msg auto_press_msg">Rate your experience with Pseudonymous</p>
                                                                                    <div className="usr_upld_opts">
                                                                                        <Rating
                                                                                            onClick={handleRating}
                                                                                            // onPointerEnter={onPointerEnter}
                                                                                            // onPointerLeave={onPointerLeave}
                                                                                            // onPointerMove={onPointerMove}
                                                                                            disabled={!Number(Ratings)}
                                                                                            initialValue={Ratings ? Number(Ratings) : 0}
                                                                                            value={rating}
                                                                                        />
                                                                                        <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
                                                                                            <Form.Control placeholder="Write your review" disabled={curr.review} value={curr.review ? curr.review : review} onChange={(e) => {
                                                                                                setReview(e.target.value)
                                                                                            }} as="textarea" rows={3} >

                                                                                            </Form.Control>
                                                                                        </Form.Group>
                                                                                        {!curr.rating && <button className="theme_btn" onClick={() => RatingNReview(curr.image_id)}>
                                                                                            Submit
                                                                                        </button>}
                                                                                    </div>
                                                                                </div>
                                                                            </div>
                                                                            : curr.message_type === "reject_mediaHouse_offer" && !curr.paid_status ?
                                                                                <div className="chatting_itm auto_msg rating sngl_cht d-flex align-items-start" >
                                                                                    <img src={presshopchatic} alt="User" className="usr_img" />
                                                                                    <div className="cht_txt">
                                                                                        <div className="d-flex align-items-center">
                                                                                            <p className="usr_name mb-0">
                                                                                                Presshop
                                                                                            </p>
                                                                                            <p className="cht_time mb-0">{moment(curr?.createdAt).format('h:mm A, D MMM YYYY')}</p>
                                                                                        </div>
                                                                                        <p className="mb-0 msg auto_press_msg">Rate your experience with Pseudonymous</p>
                                                                                        <div className="usr_upld_opts">
                                                                                            <Rating
                                                                                                onClick={handleRating}
                                                                                                // onPointerEnter={onPointerEnter}
                                                                                                // onPointerLeave={onPointerLeave}
                                                                                                // onPointerMove={onPointerMove}
                                                                                                value={rating}
                                                                                                disabled={!Number(Ratings)}
                                                                                                // initialValue={Ratingg ? Number(Ratings) : rating}
                                                                                                initialValue={Ratings ? Number(Ratings) : 0}
                                                                                            // defaultValue={3}
                                                                                            />
                                                                                            <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
                                                                                                <Form.Control placeholder="Write your review" as="textarea" rows={3} >

                                                                                                </Form.Control>
                                                                                            </Form.Group>
                                                                                            <button className="theme_btn" onClick={() => RatingNReview(curr.image_id)}>
                                                                                                Submit
                                                                                            </button>
                                                                                        </div>
                                                                                    </div>
                                                                                </div>
                                                                                : ""
                                    )
                                })

                            }

                            {/* {props.messages && props?.messages?.length > 0 && props?.messages[0]?.message_type === "offer_started" &&

                            } */}
                            {/* {props.messages && props?.messages[1] ?} */}
                            {/* <div className="chatting_itm auto_msg sngl_cht d-flex align-items-start" >
                                <img src={presshopchatic} alt="User" className="usr_img" />
                                <div className="cht_txt">
                                    <div className="d-flex align-items-center">
                                        <p className="usr_name mb-0">{"Harold Morton"}
                                        </p>
                                        <p className="cht_time mb-0">26 may, 2023</p>
                                    </div>
                                    <p className="mb-0 msg auto_press_msg">Has initially offered <a className="link">£120</a> to buy the content</p>
                                </div>
                            </div> */}
                            {/* <div className="chatting_itm sngl_cht d-flex align-items-start" >
                                <img src={presshopchatic} alt="User" className="usr_img" />
                                <div className="cht_txt">
                                    <div className="d-flex align-items-center">
                                        <p className="usr_name mb-0">{"Presshop"}
                                        </p>
                                        <p className="cht_time mb-0">26 may, 2023</p>
                                    </div>
                                    <p className="mb-0 msg">Has counter offered <a className="link">£140</a> to sell the content</p>
                                    <div className="usr_upld_opts">
                                        <button className="theme_btn">
                                            Buy
                                        </button>
                                        <span>or</span>
                                        <button className="secondary_btn">
                                            Make a Counter Offer
                                        </button>
                                    </div>
                                    <p className="buy_btn_txt mb-0">The Hopper can make a counter offer only once to you</p>
                                </div>
                            </div> */}
                            {/* <div className="chatting_itm auto_msg sngl_cht d-flex align-items-start" >
                                <img src={presshopchatic} alt="User" className="usr_img" />
                                <div className="cht_txt">
                                    <div className="d-flex align-items-center">
                                        <p className="usr_name mb-0">Presshop
                                        </p>
                                        <p className="cht_time mb-0">26 may, 2023</p>
                                    </div>
                                    <p className="mb-0 msg auto_press_msg">Congrats, you’ve successfully purchased 1  for £. Please download the water-mark free, and  high definition content, by clicking below</p>
                                    <div className="usr_upld_opts">
                                        <button className="theme_btn"
                                        >
                                            Download
                                        </button>
                                    </div>
                                    <p className="buy_btn_txt mb-0">Please refer to our <a className="link">licensing terms of usage</a>, and <a className="link">terms and conditions</a>. If you have any questions, please <a className="link">chat</a> or <a className="link">contact</a> our helpful teams who are available 24x7 to assist you. Thank you.</p>
                                </div>
                            </div> */}
                        </>
                    </div>
                </CardContent >
            </Card>
        </>
    );
}
export default React.memo(ContentChatSocket);
