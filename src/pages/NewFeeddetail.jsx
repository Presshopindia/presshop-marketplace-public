import React, { useEffect, useRef, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
// import HeaderN from "../component/HeaderN"
import {
  Button,
  Card,
  CardContent,
  Checkbox,
  FormControlLabel,
  Typography,
} from "@mui/material";
import moment from "moment/moment";
import { Col, Container, Form, Row } from "react-bootstrap";
import InputGroup from "react-bootstrap/InputGroup";
import Modal from "react-bootstrap/Modal";
import Overlay from "react-bootstrap/Overlay";
import Tab from "react-bootstrap/Tab";
import Tabs from "react-bootstrap/Tabs";
import Tooltip from "react-bootstrap/Tooltip";
import { AiFillStar, AiOutlineStar } from "react-icons/ai";
import {
  BsArrowLeft,
  BsArrowRight,
  BsChevronDown,
  BsMic,
  BsPause,
  BsPlay,
} from "react-icons/bs";
import { MdAdd, MdOutlineWatchLater } from "react-icons/md";
import { SlLocationPin } from "react-icons/sl";
import { ReactMic } from "react-mic-recorder";
import { Rating } from "react-simple-star-rating";
import { Pagination } from "swiper";
import "swiper/css";
import { Swiper, SwiperSlide } from "swiper/react";
import audioic from "../assets/images/audimg.svg";
import NoProfile from "../assets/images/blank-profile-picture.png";
import cameraic from "../assets/images/camera.svg";
import presshopchatic from "../assets/images/chat-icons/presshoplogo.svg";
import contentVideo from "../assets/images/contentVideo.svg";
import docsic from "../assets/images/docsic.svg";
import usric from "../assets/images/menu-icons/user.svg";
import exclusive from "../assets/images/exclusive.png";
import favouritedic from "../assets/images/favouritestar.svg";
import interviewic from "../assets/images/interview.svg";
import pdfic from "../assets/images/pdfic.svg";
import authorimg from "../assets/images/profile.webp";
import shared from "../assets/images/share.png";
import favic from "../assets/images/star.svg";
import videoic from "../assets/images/video.svg";
import ChatCard from "../component/ChatCard";
import DbFooter from "../component/DbFooter";
import Header from "../component/Header";
import RecentActivityDF from "../component/Sortfilters/Dashboard/RecentActivity";
import { UserDetails } from "../component/Utils";
import ContentFeedCard from "../component/card/ContentFeedCard";
import TopSearchesTipsCard from "../component/card/TopSearchesTipsCard";
import { Get, Patch, Post } from "../services/user.services";
import Loader from "../component/Loader";
import { useDarkMode } from "../context/DarkModeContext";
import { formatAmountInMillion } from "../component/commonFunction";
import socketServer from "../socket.config";

const asFeeddetail = (props) => {
  const [isRecording, setIsRecording] = useState(false);

  const [selectedIds, setSelectedIds] = useState([]);
  const param = useParams();
  const navigate = useNavigate();
  const [adminList, setAdminList] = useState([]);
  const [messages, setMessages] = useState([]);
  const [offer_value, setOffer_value] = useState("");
  const [room_details, setRoom_Details] = useState();
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState();
  const [fav, setFav] = useState();
  const [hopper, setHopper] = useState();
  const [hopperid, setHopperid] = useState();
  const [userList, setUserList] = useState([]);
  const [senderId, setSenderId] = useState("");
  const [review, setReview] = useState("");
  const usernew = UserDetails;
  const [content, setRelatedContent] = useState([]);
  const [moreContent, setMoreContent] = useState([]);
  const [chatContentIds, setChatContentIds] = useState({
    room_id: "",
    sender_id: "",
  });
  const [contentId, setContentId] = useState(null);
  const [showChat, setShowChat] = useState({
    content: false,
    task: false,
    presshop: false,
    internal: false,
  });
  const [room_idForContent, setRoom_idForContent] = useState("");
  const [roomDetails, setRoomDetails] = useState();
  const [show, setShow] = useState(false);
  const target = useRef(null);
  const [show1, setShow1] = useState(false);
  const handleClose = () => setShow1(false);
  const [bigData, setBigData] = useState("");
  const handleShow = (curr) => {
    setBigData(curr?.message), setShow1(true);
  };
  const handleClosePreview = () =>
    setPreview((pre) => ({ ...pre, modalOpen: false }));
  const [preview, setPreview] = useState({
    type: "",
    path: "",
    modalOpen: false,
  });
  const [admins, setAdmins] = useState([]);
  const [tabSelect, setTabSelect] = useState("internal");

  const { profileData } = useDarkMode();
  const userImage = profileData?.hasOwnProperty("admin_detail")
    ? profileData?.admin_detail?.admin_profile
    : profileData?.profile_image;

  const username = profileData?.full_name;
  console.log("profileData", profileData)

  useEffect(() => {
    window?.scrollTo(0, 0);
  }, [param.id]);

  const getMessages = async () => {
    const resp1 = await Post(`mediaHouse/getAllchat`, {
      room_id: roomDetails?.room_id,
    });
    if (resp1) {
      setMessages(resp1?.data?.response);
    }
  };

  const CreateRoom = async (id, idnew) => {
    try {
      const obj = {
        receiver_id: id,
        room_type: "MediahousetoAdmin",
        type: "external_content",
        content_id: param?.type === "favourite" ? idnew : param.id,
      };
      const resp = await Post(`mediaHouse/createRoom`, obj);
      if (resp && resp.data && resp.data.details) {
        setRoom_Details(resp.data.details);
        setRoomDetails(resp.data.details);
        setRoom_idForContent(resp.data.details.room_id);
        // JoinRoom(resp.data.details.room_id);
        const resp1 = await Post(`mediaHouse/getAllchat`, {
          room_id: resp.data.details.room_id,
        });
        if (resp1 && resp1.data && resp1.data.response) {
          setMessages(resp1.data.response);
        }
      } else {
        console.error("Incomplete response data:", resp);
      }
    } catch (error) {
      console.error("API request error:", error);
    }
  };

  const Start_Offer = async () => {
    setLoading(true);
    try {
      const obj = {
        room_id: roomDetails.room_id,
        content_id: roomDetails.content_id,
        sender_type: "Mediahouse",
        sender_id: roomDetails.sender_id,
        message_type: "offer_started",
        receiver_id: roomDetails.receiver_id,
        initial_offer_price: "",
        finaloffer_price: "",
      };
      socketServer.emit("initialoffer", obj);
      socketServer.on("initialoffer", (obj) => {
        const tempMsg = obj;
        setMessages([...messages]);
        getMessages();
        setLoading(false);
      });
      socketServer.emit("room leave", { room_id: room_idForContent });
      socketServer.off("initialoffer");
    } catch (error) {
      // Handle errors
      setLoading(false);
    }
  };

  const Content_Offer = (offer_type) => {
    try {
      let obj = {
        room_id: room_details.room_id,
        content_id: room_details.content_id,
        sender_type: "Mediahouse",
        sender_id: room_details.sender_id,
        message_type: offer_type,
        receiver_id: room_details.receiver_id,
        initial_offer_price: "",
        finaloffer_price: "",
      };
      if (offer_type === "Mediahouse_initial_offer") {
        obj.initial_offer_price = offer_value;
      }
      if (offer_type === "Mediahouse_final_offer") {
        obj.finaloffer_price = offer_value;
      }

      socketServer.emit("room leave", { room_id: room_idForContent });
      socketServer.off("initialoffer");

      setOffer_value("");
      getMessages();
    } catch (error) {
      // Handle errors
    }
  };

  const paymentintentnew = (curr) => {
    const obj = {
      room_id: room_details.room_id,
      content_id: room_details.content_id,
      sender_type: "Mediahouse",
      sender_id: room_details.sender_id,
      message_type: "PaymentIntent",
      receiver_id: room_details.receiver_id,
      initial_offer_price: "",
      finaloffer_price: "",
    };
    socketServer.emit("room leave", { room_id: room_idForContent });
    socketServer.off("initialoffer");
    Payment(curr);
    RatingForMediahouse();
    // RatingForHopper();
    getMessages();
  };

  const Payment = async (curr) => {
    setLoading(true);
    try {
      const obj = {
        image_id: !curr.hasOwnProperty("image_id")
          ? curr.content[0]._id
          : curr.image_id,
        amount: !curr.hasOwnProperty("amount") ? curr.ask_price : curr.amount,
        type: "content",
        customer_id: UserDetails.stripe_customer_id,
      };
      const resp = await Post("mediahouse/createPayment", obj);
      window.open(resp.data.url, "_blank");
      if (resp) {
        getMessages();
        setLoading(false);
      }
    } catch (error) {
      setLoading(false);
      // Handle errors
    }
  };

  const DownloadContent = async (id) => {
    const resp = await Get(
      `mediahouse/image_pathdownload?image_id=${id}&type=content`
    );
    if (resp) {
      const filename = resp.data.message.slice(85);
      fetch(resp.data.message)
        .then((response) => response.blob())
        .then((blob) => {
          const downloadElement = document.createElement("a");
          const url = URL.createObjectURL(blob);
          downloadElement.href = url;
          downloadElement.download = filename;
          downloadElement.click();
          URL.revokeObjectURL(url);
        });
    }
  };

  const RatingForMediahouse = () => {
    try {
      let obj = {
        room_id: room_details.room_id,
        content_id: room_details.content_id,
        sender_type: "Mediahouse",
        sender_id: room_details.sender_id,
        message_type: "rating_mediaHouse",
        receiver_id: room_details.receiver_id,
        initial_offer_price: "",
        finaloffer_price: "",
      };
      socketServer.emit("room leave", { room_id: room_idForContent });
      socketServer.off("initialoffer");
      getMessages();
    } catch (error) {
      // console.log(error, "<-----errors for Start_Offer");
    }
  };

  const [rating, setRating] = useState(0);
  const handleRating = (rate) => {
    setRating(rate);
  };

  const RatingNReview = (image_id) => {
    const obj = {
      room_id: room_details.room_id,
      sender_type: "Mediahouse",
      receiver_id: room_details.receiver_id,
      sender_id: room_details.sender_id,
      rating: rating,
      review: review,
      chat_id:
        messages &&
        messages?.find((obj) => obj.message_type === "rating_mediaHouse")._id,
      type: "content",
      image_id: image_id,
    };
    socketServer.emit("room leave", { room_id: room_idForContent });
    socketServer.off("initialoffer");
    getMessages();
  };

  useEffect(() => {
    socketServer.emit("getallchat", { room_id: roomDetails?.room_id });
    socketServer.emit("room leave", { room_id: room_idForContent });
    socketServer.off("initialoffer");
  }, [socketServer]);

  const hopperFinalOffer = messages?.find(
    (item) => item.message_type === "Mediahouse_final_offer"
  );

  const hopperFinalOfferPrice = hopperFinalOffer
    ? hopperFinalOffer.finaloffer_price
    : "";

  const MediahouseFinal = messages?.find(
    (item) => item.message_type === "Mediahouse_final_counter"
  );

  const MediahouseFinalCounter = MediahouseFinal ? true : false;

  const MediahouseInitial = messages?.find(
    (item) => item.message_type === "Mediahouse_initial_offer"
  );

  const MediahouseInitialOffer = MediahouseInitial ? true : false;

  const Paymentt = messages?.find(
    (item) => item.message_type === "PaymentIntent"
  );

  const PaymentIntent = Paymentt ? Paymentt.paid_status : "";

  const ContentByID = async () => {
    setLoading(true);
    try {
      const resp = await Post(`mediaHouse/view/published/content`, {
        id: param.id,
      });
      setContentId(param.id);
      setData(resp.data.content);
      setChatContentIds((pre) => ({
        ...pre,
        room_id: resp.data.room_id?.room_id,
        sender_id: JSON.parse(localStorage.getItem("user"))?._id,
      }));
      localStorage.setItem("internal", resp.data.content._id);
      CreateRoom(resp.data.content?.hopper_id?._id, resp.data.content?._id);
      setHopper(resp.data.content?.hopper_id);
      setHopperid(resp.data.content?.hopper_id?._id);
      const resp1 = await Post(`mediaHouse/MoreContent`, {
        hopper_id: resp.data.content?.hopper_id?._id,
        content_id: param?.id
      });
      setMoreContent(resp1.data.content);
      const resp2 = await Post(`mediaHouse/relatedContent`, {
        tag_id: [resp.data.content.tag_ids[0]?._id],
        hopper_id: resp.data.content?.hopper_id?._id,
        category_id: resp.data.content.category_id?._id,
        content_id: resp.data.content._id
      });
      setRelatedContent(resp2.data.content);
      localStorage.setItem(
        "tag_id",
        resp.data.content.tag_ids[0]?._id,
        "hopper_id",
        resp.data.content?.hopper_id?._id
      );
      setHopperid(resp.data.content?.hopper_id?._id);
      localStorage.setItem("hopperid", resp.data.content?.hopper_id?._id);
      if (resp) {
        setLoading(false);
      }
    } catch (error) {
      // console.log(error);
      setLoading(false);
    }
  };

  const Favourite = async (val) => {
    try {
      let obj = {
        favourite_status: val,
        content_id: data ? data._id : fav?.content_id?._id,
      };

      setData({ ...data, favourite_status: val })
      await Patch(`mediaHouse/add/to/favourites`, obj);
    } catch (error) {
      console.log(error.message);
    }
  };

  useEffect(() => {
    if (param.type === "content") {
      ContentByID();
    } else if (param.type === "favourite") {
      FavouriteByID();
    }
    GetUserList();
  }, [param?.id]);

  const Audio = data
    ? data.content.filter((item) => item.media_type === "audio")
    : fav?.content_id?.content?.filter((item) => item?.media_type === "audio");
  const Video = data
    ? data.content.filter((item) => item.media_type === "video")
    : fav?.content_id?.content?.filter((item) => item?.media_type === "video");
  const images = data
    ? data.content.filter((item) => item.media_type === "image")
    : fav?.content_id?.content?.filter((item) => item?.media_type === "image");
  const Pdf = data
    ? data.content.filter((item) => item.media_type === "pdf")
    : fav?.content_id?.content?.filter((item) => item?.media_type === "pdf");
  const Doc = data
    ? data.content.filter((item) => item.media_type === "doc")
    : fav?.content_id?.content?.filter((item) => item?.media_type === "doc");

  function capitalizeFirstLetter(string) {
    return string?.charAt(0)?.toUpperCase() + string?.slice(1);
  }

  const GetUserList = async () => {
    const resp = await Post(`mediaHouse/getMediahouseUser`);
    if (resp) {
      setUserList(resp.data.response);
    }
    const resp1 = await Get(`mediaHouse/adminlist`);
    const newData = resp1?.data?.data?.map((el) => {
      return {
        ...el,
        checked: false,
      };
    });
    setAdminList(newData);
  };

  const handleChecked = (el) => {
    setAdminList((prev) => {
      const changedData = prev.map((item) => ({
        ...item,
        checked: item == el ? !item.checked : false,
      }));
      return changedData;
    });
  };

  // internal chat start
  const [mediaFile, setMediaFile] = useState({ path: "", type: "" });
  const [message, setMessage] = useState([]);
  const [msg1, setMsg1] = useState("");

  const onStartRecording = () => {
    setIsRecording(true);
  };

  const onStopRecording = async (recordedBlob) => {
    setIsRecording(false);
    try {
      const formData = new FormData();
      formData.append("path", "profileImg");
      formData.append("media", recordedBlob?.blob);
      const filePath = await Post("mediaHouse/uploadUserMedia", formData);
      if (filePath) {
        setMediaFile((prev) => ({
          ...prev,
          path: filePath?.data?.path,
          type: "audio",
        }));
      }
    } catch (error) {
      console.error("Error uploading audio:", error);
    }
  };

  useEffect(() => {
    ChatList();
  }, [chatContentIds, socketServer]);

  useEffect(() => {
    // Internal Chat and External Chat-
    if (tabSelect == "internal") {
      const messageContainer = document.getElementById("message-container-1"); // Replace "message-container" with the actual ID or class of your message container element
      if (messageContainer) {
        messageContainer.scrollTop = messageContainer.scrollHeight;
      }
      socketServer.emit("room join", { room_id: chatContentIds?.room_id });
      socketServer.on("internal group chat", (data) => {
        const newMessage = data;
        if (!newMessage?.createdAt) {
          setMessage((prevMessages) => [...prevMessages, newMessage]);
          messageContainer.scrollTop = messageContainer.scrollHeight;
        }
        if (newMessage) {
          messageContainer.scrollTop = messageContainer.scrollHeight;
        }
      });
      return () => {
        socketServer.emit("room leave", { room_id: chatContentIds?.room_id });
        socketServer.off("internal group chat");
      };
    }
    else if (tabSelect == "external") {
      socketServer.emit("room join", { room_id: room_idForContent });
      socketServer?.on("getAdmins", (data) => {
        setAdmins(data);
      });
      socketServer.on("initialoffer", (data) => {
        const newMessage = data;
        setMessages((prevMessages) => [...prevMessages, newMessage]);
      });
      return () => {
        socketServer.emit("room leave", { room_id: room_idForContent });
        socketServer.off("initialoffer");
      };
    }

  }, [tabSelect]);

  const handleCheckboxChange = (itemId) => {
    if (selectedIds.includes(itemId)) {
      setSelectedIds(selectedIds.filter((id) => id !== itemId));
    } else {
      setSelectedIds([...selectedIds, itemId]);
    }
  };

  const AddParticipents = async () => {
    try {
      let obj = {
        type: "add",
        users: selectedIds,
        content_id: param.id,
        room_id: chatContentIds ? chatContentIds?.room_id : "",
      };
      console.log("Obj ----->", obj)
      const resp = await Post("mediaHouse/internalGroupChatMH", obj);
      if (resp) {
        setSelectedIds([]);
        GetUserList();
        setChatContentIds((pre) => ({
          ...pre,
          room_id: resp?.data?.data?.data?.room_id,
        }));
        socketServer.emit("room join", {
          room_id: resp?.data?.data?.data?.room_id,
        });
      }
    } catch (error) {
      // console.log(error, `<<<<<socketServer error`);
      // Handle errors
    }
  };

  const handleChange = async (event) => {
    setLoading(true)
    const file = event.target.files[0];
    if (file.type.startsWith("video/")) {
      setMediaFile((pre) => ({ ...pre, type: "video" }));
      setPreview((pre) => ({ ...pre, type: "video" }));
    } else if (file.type.startsWith("image/")) {
      setMediaFile((pre) => ({ ...pre, type: "image" }));
      setPreview((pre) => ({ ...pre, type: "image" }));
    } else if (file.type.startsWith("audio/")) {
      setMediaFile((pre) => ({ ...pre, type: "audio" }));
      setPreview((pre) => ({ ...pre, type: "image" }));
    }
    const Formdata = new FormData();
    Formdata.append("path", "profileImg");
    Formdata.append("media", file);
    const filePath = await Post("mediaHouse/uploadUserMedia", Formdata);
    if (filePath) {
      setMediaFile((pre) => ({ ...pre, path: filePath?.data?.path }));
      setPreview((pre) => ({ ...pre, path: filePath?.data?.path }));
      setPreview((pre) => ({ ...pre, modalOpen: true }));
    }
    setLoading(false)
  };

  const handleButtonClick = (e) => {
    e.preventDefault();
    let messages = {
      sender_id: chatContentIds?.sender_id,
      room_id: chatContentIds?.room_id,
      message: mediaFile?.path ? mediaFile?.path : msg1,
      type: mediaFile?.type ? mediaFile?.type : "text",
      user_info: {
        profile_image: profileData?.hasOwnProperty(
          "admin_detail"
        )
          ? profileData?.admin_detail
            ?.admin_profile
          : profileData?.profile_image,
        first_name: profileData?.first_name,
        last_name: profileData?.last_name,
      },
    };

    console.log("Send message", messages)
    socketServer.emit("internal group chat", messages);
    setMsg1("");
    setMediaFile({
      path: "",
      type: "",
    });
    setPreview((pre) => ({ ...pre, modalOpen: false }));
  };

  const ChatList = async () => {
    try {
      const resp = await Get(
        `mediaHouse/openChatsMH?room_id=${chatContentIds?.room_id}`
      );
      if (resp) {
        localStorage.setItem("contentId", JSON.stringify(param.id));
        localStorage.setItem("type", "content")
        localStorage.setItem(
          "roomId",
          JSON.stringify(chatContentIds?.room_id) || ""
        );
        localStorage.removeItem("receiverId");
        localStorage.setItem("tabName", JSON.stringify("internal"));
        setMessage(resp?.data?.response?.data);
      }
    } catch (error) {
      // Handle errors
    }
  };

  // internal chat end

  // Detail of current User
  const user = profileData;
  const fullName = user?.first_name + " " + user?.last_name;

  const audioRef = useRef(null);

  const toggleAudio = () => {
    const audio = audioRef.current;
    if (audio.paused) {
      audio.play().catch((error) => {
        console.error("Error playing audio:", error);
      });
    } else {
      audio.pause();
    }
  };

  const chatBoxRef = useRef(null);

  const scrollToBottom = () => {
    if (chatBoxRef.current) {
      const { scrollHeight, clientHeight, offsetHeight } = chatBoxRef.current;
      let currentScrollTop = chatBoxRef.current.scrollTop;
      const scrollStep = 0;

      const scrollDown = () => {
        if (currentScrollTop < scrollHeight - clientHeight + offsetHeight) {
          currentScrollTop += scrollStep;
          chatBoxRef.current.scrollTop = currentScrollTop;
          requestAnimationFrame(scrollDown);
        }
      };

      scrollDown();
    }
  };

  useEffect(() => {
    scrollToBottom();
  }, [message]);


  // Favourite content-
  const favContentHandler = (i, type) => {
    if (type == "related") {
      setRelatedContent((prev) => {
        const allContent = [...prev];
        allContent[i]["favourite_status"] = allContent[i]["favourite_status"] === "true" ? "false" : "true";
        return allContent
      })
    }
    else {
      setMoreContent((prev) => {
        const allContent = [...prev];
        allContent[i]["favourite_status"] = allContent[i]["favourite_status"] === "true" ? "false" : "true";
        return allContent
      })
    }
  }

    // recent activity
    const recentActivity = async () => {
      try {
        if (contentId) {
          await Post("mediaHouse/recentactivityformediahouse", {
            content_id: contentId,
          });
        }
      } catch (err) {
        console.error(err);
      }
    };
  
    useEffect(() => {
      recentActivity();
    }, [contentId]);

  return (
    <>
      {loading && <Loader />}
      <Header />
      <div className="page-wrap feed-detail">
        <Container fluid>
          <Row>
            <Col md={12}>
              <div className="feedsMain_wrap">
                <div className="feedsContainer">
                  <div className="feedContent_header">
                    <Link onClick={() => window.history.back()}>
                      <BsArrowLeft className="text-pink" /> Back{" "}
                    </Link>
                  </div>

                  <Row className="">
                    <Col md={8}>
                      <Card className="feeddetail-card left-card">
                        <CardContent className="card-content position-relative">
                          <div className="post_icns_cstm_wrp">
                            {Audio && Audio.length > 0 && (
                              <div className="post_itm_icns dtl_icns">
                                {Audio && Audio.length > 0 && (
                                  <span className="count">
                                    {Audio && Audio.length > 0 && Audio.length}
                                  </span>
                                )}

                                {Audio && Audio.length > 0 && (
                                  <img
                                    className="feedMediaType iconBg"
                                    src={interviewic}
                                    alt=""
                                  />
                                )}
                              </div>
                            )}

                            {Video && Video.length > 0 && (
                              <div className="post_itm_icns dtl_icns">
                                {Video && Video.length > 0 && (
                                  <span className="count">
                                    {Video && Video.length > 0 && Video.length}
                                  </span>
                                )}
                                {Video && Video.length > 0 && (
                                  <img
                                    className="feedMediaType iconBg"
                                    src={videoic}
                                    alt=""
                                  />
                                )}
                              </div>
                            )}

                            {images && images.length > 0 && (
                              <div className="post_itm_icns dtl_icns">
                                {images && images.length > 0 && (
                                  <span className="count">
                                    {images &&
                                      images.length > 0 &&
                                      images.length}
                                  </span>
                                )}

                                {images && images.length > 0 && (
                                  <img
                                    className="feedMediaType iconBg"
                                    src={cameraic}
                                    alt=""
                                  />
                                )}
                              </div>
                            )}
                            {Pdf && Pdf.length > 0 && (
                              <div className="post_itm_icns dtl_icns">
                                {Pdf && Pdf.length > 0 && (
                                  <span className="count">
                                    {Pdf && Pdf.length > 0 && Pdf.length}
                                  </span>
                                )}

                                {Pdf && Pdf.length > 0 && (
                                  <img
                                    className="feedMediaType iconBg"
                                    src={docsic}
                                    alt=""
                                  />
                                )}
                              </div>
                            )}

                            {Doc && Doc.length > 0 && (
                              <div className="post_itm_icns dtl_icns">
                                {Doc && Doc.length > 0 && (
                                  <span className="count">
                                    {Doc && Doc.length > 0 && Doc.length}
                                  </span>
                                )}

                                {Doc && Doc.length > 0 && (
                                  <img
                                    className="feedMediaType iconBg"
                                    src={docsic}
                                    alt=""
                                  />
                                )}
                              </div>
                            )}
                          </div>
                          <div
                            className="post_itm_icns right dtl_icns"
                            onClick={() => Favourite(data?.favourite_status === "true" ? "false" : "true")}
                          >
                            <img
                              className="feedMediaType iconBg"
                              src={data?.favourite_status === "true" ? favouritedic : favic}
                              alt={data?.favourite_status === "true" ? favouritedic : favic}
                            />
                          </div>

                          <Swiper
                            spaceBetween={50}
                            slidesPerView={1}
                            modules={[Pagination]}
                            slidesPerGroupSkip={1}
                            focusableElements="pagination"
                            pagination={{ clickable: true }}
                          >
                            {data
                              ? data.content.map((curr) => {
                                return (
                                  <SwiperSlide key={curr._id}>
                                    {curr?.media_type === "image" ? (
                                      <img
                                        src={
                                          curr?.watermark ||
                                          process.env
                                            .REACT_APP_CONTENT_MEDIA +
                                          curr?.media
                                        }
                                        alt={`Image ${curr._id}`}
                                      />
                                    ) : curr?.media_type === "audio" ? (
                                      <div>
                                        <img
                                          src={audioic}
                                          alt={`Audio ${curr._id}`}
                                          className="slider-img"
                                          onClick={toggleAudio}
                                        />
                                        <audio
                                          controls
                                          src={
                                            curr.hasOwnProperty("watermark")
                                              ? curr.watermark
                                              : process.env
                                                .REACT_APP_CONTENT_MEDIA +
                                              curr?.media
                                          }
                                          type="audio/mpeg"
                                          className="slider-audio"
                                          ref={audioRef}
                                        />
                                      </div>
                                    ) : curr?.media_type === "video" ? (
                                      <video
                                        controls
                                        className="slider-vddo"
                                        src={
                                          curr?.media
                                        }
                                      />
                                    ) : curr?.media_type === "pdf" ? (
                                      <embed
                                        src={`${process.env
                                          .REACT_APP_CONTENT_MEDIA +
                                          curr?.media
                                          }`}
                                        type="application/pdf"
                                        width="100%"
                                        height="500"
                                      />
                                    ) : null}
                                  </SwiperSlide>
                                );
                              })
                              : fav?.content_id?.content?.map((curr) => {
                                return (
                                  <SwiperSlide key={curr._id}>
                                    {curr?.media_type === "image" ? (
                                      <img
                                        src={
                                          curr?.watermark ||
                                          process.env
                                            .REACT_APP_CONTENT_MEDIA +
                                          curr?.media
                                        }
                                        alt={`Image ${curr._id}`}
                                      />
                                    ) : curr?.media_type === "audio" ? (
                                      <div>
                                        <img
                                          src={audioic}
                                          alt={`Audio ${curr._id}`}
                                          className="slider-img"
                                          onClick={toggleAudio}
                                        />
                                        <audio
                                          controls
                                          src={
                                            process.env
                                              .REACT_APP_CONTENT_MEDIA +
                                            curr?.media
                                          }
                                          type="audio/mpeg"
                                          className="slider-audio"
                                          ref={audioRef}
                                        />
                                      </div>
                                    ) : curr?.media_type === "video" ? (
                                      <video
                                        controls
                                        className="slider-vddo"
                                        src={curr?.media}
                                      />
                                    ) : null}
                                  </SwiperSlide>
                                );
                              })}

                            {/* )
                            })} */}
                          </Swiper>

                          <div className="feedTitle_content">
                            <h1 className="feedTitle">
                              {data ? data?.heading : fav?.content_id?.heading}
                            </h1>

                            {/* <p className="feed_descrptn dtl_txt">
                              {data
                                ? data?.description
                                : fav?.content_id?.description}
                            </p> */}
                            <textarea
                              className="form-control custom_textarea"
                              readOnly
                              value={
                                data
                                  ? data?.description
                                  : fav?.content_id?.description
                              }
                            ></textarea>
                          </div>
                        </CardContent>
                      </Card>
                    </Col>

                    <Col md={4}>
                      <Card className="feeddetail-card h-100 content-info">
                        <CardContent className="card-content feedDetailInfo">
                          <div className="sub-content">
                            <div className="heading w-100 d-flex align-items-center justify-content-between">
                              <Typography className="txt_bld">
                                {" "}
                                Content info
                              </Typography>
                              {data?.favourite_status === "true" && (
                                <div className="favourite">
                                  <AiFillStar />
                                  <span>Favourited</span>
                                </div>
                              )}
                              {data?.favourite_status === "false" && (
                                <div className="favourite">
                                  <AiOutlineStar />
                                  <span>Favourite</span>
                                </div>
                              )}
                            </div>
                          </div>
                          {/* <hr /> */}
                          <div className="content">
                            <div className="sub-content">
                              <div className="item d-flex justify-content-between align-items-center">
                                <span className="fnt-bold">Hopper</span>
                                <div className="item-in-right">
                                  <img
                                    src={
                                      data
                                        ? data?.hopper_id?.avatar_id?.avatar
                                          ? process.env.REACT_APP_AVATAR_IMAGE +
                                          data?.hopper_id?.avatar_id?.avatar
                                          : null
                                        : fav?.content_id?.hopper_id?.avatar_id
                                          ?.avatar
                                          ? process.env.REACT_APP_AVATAR_IMAGE +
                                          fav?.content_id?.hopper_id?.avatar_id
                                            ?.avatar
                                          : null
                                    }
                                    alt=""
                                  />

                                  <span className="hpr_nme">
                                    {data
                                      ? data?.hopper_id?.user_name
                                      : fav?.content_id?.hopper_id?.user_name}
                                  </span>
                                </div>
                              </div>
                            </div>
                            <div className="sub-content">
                              <div className="item d-flex justify-content-between align-items-center">
                                <span className="fnt-bold">Location</span>
                                <div className="item-in-right loc">
                                  <span>
                                    <SlLocationPin />{" "}
                                    <div>
                                      {data
                                        ? data?.location
                                        : fav?.content_id?.location}
                                    </div>
                                  </span>
                                </div>
                              </div>
                            </div>
                            <div className="sub-content">
                              <div className="item d-flex justify-content-between align-items-center">
                                <span className="fnt-bold">TimeStamp</span>
                                <div className="item-in-right loc">
                                  <span>
                                    <MdOutlineWatchLater />
                                    {data
                                      ? moment(
                                        data?.createdAt
                                      ).format("h:mm A, DD MMMM YYYY")
                                      : moment(
                                        fav?.content_id?.createdAt
                                      ).format("h:mm A, DD MMMM YYYY")}
                                  </span>
                                </div>
                              </div>
                            </div>
                            <div className="sub-content tags_wrp">
                              <div className="item d-flex justify-content-between align-items-center">
                                <span className="fnt-bold">Hashtags</span>
                                <div>
                                  <div className="item-in-right hashtag-wrap">
                                    {data
                                      ? data &&
                                      data?.tag_ids.map((tag) => {
                                        return (
                                          <span className="mr">
                                            #{tag.name}
                                          </span>
                                        );
                                      })
                                      : fav &&
                                      fav?.content_id?.tag_ids.map((tag) => {
                                        return (
                                          <span className="mr">
                                            #{tag.name}
                                          </span>
                                        );
                                      })}
                                  </div>
                                </div>
                              </div>
                            </div>
                            <div className="sub-content">
                              <div className="item d-flex justify-content-between align-items-center">
                                <span className="fnt-bold">Category</span>
                                <div className="">
                                  <img
                                    src={
                                      data
                                        ? data?.category_id?.icon
                                        : fav?.content_id?.category_id?.icon
                                    }
                                    className="exclusive-img"
                                    alt=""
                                  />
                                  <span className="txt_catg_licn">
                                    {capitalizeFirstLetter(
                                      data
                                        ? data?.category_id?.name
                                        : fav?.content_id?.category_id?.name
                                    )}
                                  </span>
                                </div>
                              </div>
                            </div>
                            <div className="sub-content">
                              <div className="item d-flex justify-content-between align-items-center">
                                <span className="fnt-bold">License</span>
                                <div className="">
                                  <img
                                    src={
                                      data ? data?.type === "exclusive"
                                        ? exclusive
                                        : shared
                                        : fav?.content_id?.type === "exclusive" ? exclusive : shared
                                    }
                                    className="exclusive-img"
                                    alt=""
                                  />
                                  <span className="txt_catg_licn">
                                    {data
                                      ? capitalizeFirstLetter(data?.type)
                                      : capitalizeFirstLetter(
                                        fav?.content_id?.type
                                      )}
                                  </span>
                                </div>
                              </div>
                            </div>
                            <div className="foot cont-info-actions d-flex gap-5 justify-content-between align-items-center">
                              {messages && messages.length === 0 ? (
                                <Button
                                  variant="secondary"
                                  onClick={() => {
                                    if (
                                      messages[0]?.message_type !==
                                      "offer_started"
                                    ) {
                                      setTabSelect("external");
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
                              )
                                //  : messages?.filter(
                                //   (el) => el.message_type === "PaymentIntent"
                                // )?.[0]?.amount ? (
                                //   <Button
                                //     className="offeredPrice_btn bigBtn"
                                //     disabled={true}
                                //   >
                                //     <Link
                                //       className="text-white"
                                //       to={`/auto-invoice/${param.id}`}
                                //     >
                                //       £
                                //       {Number(
                                //         messages?.filter(
                                //           (el) =>
                                //             el.message_type === "PaymentIntent"
                                //         )[0]?.amount
                                //       )?.toLocaleString("en-US", {
                                //         maximumFractionDigits: 2,
                                //       })}
                                //     </Link>
                                //   </Button>
                                // )
                                : (
                                  <Button
                                    className="offeredPrice_btn bigBtn"
                                    disabled={true}
                                  >
                                    £
                                    {Number(
                                      messages?.filter(
                                        (el) =>
                                          el.message_type ===
                                          "Mediahouse_initial_offer"
                                      )[0]?.initial_offer_price
                                    )?.toLocaleString("en-US", {
                                      maximumFractionDigits: 2,
                                    })}
                                  </Button>
                                )}


                              {(data
                                ? !data?.purchased_mediahouse.find(
                                  (el) =>
                                    el ==
                                    JSON.parse(localStorage.getItem("user"))
                                      ?._id
                                )
                                : !fav?.content_id?.purchased_mediahouse.find(
                                  (el) =>
                                    el ==
                                    JSON.parse(localStorage.getItem("user"))
                                      ?._id
                                )) && (
                                  <Link to={`/auto-invoice/${param.id}`}>
                                    {" "}
                                    {/* <Button variant="primary" onClick={() => paymentintentnew(data)}> */}
                                    <Button variant="primary">
                                      £
                                      {data
                                        ? data?.ask_price?.toLocaleString(
                                          "en-US",
                                          { maximumFractionDigits: 2 }
                                        ) || 0
                                        : fav?.content_id?.ask_price?.toLocaleString(
                                          "en-US",
                                          { maximumFractionDigits: 2 }
                                        ) || 0}
                                    </Button>
                                  </Link>
                                )}
                              {(data
                                ? data?.purchased_mediahouse.find(
                                  (el) =>
                                    el ===
                                    JSON.parse(localStorage.getItem("user"))
                                      ?._id
                                )
                                : fav?.content_id?.purchased_mediahouse.find(
                                  (el) =>
                                    el ===
                                    JSON.parse(localStorage.getItem(user))
                                      ?._id
                                )) && (
                                  <Link className="w-100">
                                    {" "}
                                    <Button className="greyBtn">Paid</Button>
                                  </Link>
                                )}
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    </Col>

                    <Col md={12} className="feed_dtl_chat_wrap">
                      <div className="chat-tabs-wrap">
                        <Tabs
                          defaultActiveKey={tabSelect}
                          activeKey={
                            tabSelect ||
                            JSON.parse(localStorage.getItem("tabName"))
                          }
                          id="chat-tabs"
                          className="mb-3 tbs"
                          onSelect={(tabName) => {
                            localStorage.setItem(
                              "tabName",
                              JSON.stringify(tabName)
                            );
                            setTabSelect(tabName);
                          }}
                        >
                          <Tab
                            eventKey="internal"
                            title="Internal Chat"
                            defaultActiveKey="internal"
                            className=" show"
                          >
                            <div className="tab-data active">
                              <Row>
                                <Col md={9}>
                                  <div
                                    className="feed_dtl_msgs pp"
                                    id="message-container-1"
                                  >
                                    <div className="externalText">
                                      <h6 className="txt_light">
                                        Welcome{" "}
                                        <span className="txt_bld">
                                          {fullName}
                                        </span>
                                        .
                                      </h6>
                                      <h6 className="txt_light">
                                        Please select participants from the
                                        list, and add them to your internal
                                        chat.
                                      </h6>
                                      <h6 className="txt_light">
                                        Once added, you can start chatting with
                                        your team members. Use the text box
                                        below to type or send voice notes. Good
                                        luck
                                      </h6>
                                    </div>

                                    {message?.map((curr) => (
                                      <div
                                        className="baat_cheet"
                                        ref={chatBoxRef}
                                      >
                                        {curr?.type === "add" ? (
                                          <p className="usrAddedTxt mb-4">
                                            <span>
                                              You added {curr?.addedMsg}
                                            </span>
                                          </p>
                                        ) : (
                                          <div className="crd" key={curr.id}>
                                            <div className="img">
                                              <img
                                                src={curr.user_info?.profile_image}
                                                alt="user"
                                              />
                                            </div>
                                            <div className="postedcmnt_info">
                                              <h5>
                                                {`${curr?.user_info?.first_name} ${curr?.user_info?.last_name}`}
                                                <span className="text-secondary time">
                                                  {moment(curr?.createdAt).format(`DD MMMM YYYY`)} - {moment(curr.createdAt).format(`hh:mm A`)}
                                                </span>
                                              </h5>
                                              <Typography className="comment_text">
                                                {curr.type === "text" &&
                                                  curr.message}
                                              </Typography>

                                              <div
                                                onClick={() =>
                                                  handleShow(curr)
                                                }
                                                className="exp"
                                              >
                                                {curr.type === "image" && (
                                                  <img
                                                    src={curr.message}
                                                    className="msgContent"
                                                    alt="content"
                                                  />
                                                )}
                                              </div>

                                              <div>
                                                {curr.type === "video" && (
                                                  <video
                                                    src={curr.message}
                                                    className="msgContent"
                                                    controls
                                                    alt="video content"
                                                    controlsList="nodownload"
                                                  ></video>
                                                )}
                                              </div>

                                              <div>
                                                {curr.type === "audio" && (
                                                  <audio
                                                    src={curr.message}
                                                    controls
                                                    alt="audio content"
                                                    controlsList="nodownload"
                                                  ></audio>
                                                )}
                                              </div>
                                            </div>
                                          </div>
                                        )}
                                      </div>
                                    ))}
                                  </div>

                                  <Form onSubmit={handleButtonClick}>
                                    <div className="inpt typeMsg_inp mt-2">
                                      <img
                                        src={
                                          profileData?.hasOwnProperty(
                                            "admin_detail"
                                          )
                                            ? profileData?.admin_detail
                                              ?.admin_profile
                                            : profileData?.profile_image
                                        }
                                        alt=""
                                      />
                                      <InputGroup className="">
                                        <Form.Control
                                          placeholder="Type here..."
                                          aria-describedby="basic-addon1"
                                          value={msg1}
                                          onChange={(e) => {
                                            setMsg1(e.target.value);
                                          }}
                                        />
                                      </InputGroup>
                                      <div className="chatIn-options">
                                        <div className="uplod-mda">
                                          <input
                                            type="file"
                                            id="cht_add_img"
                                            className="cht_file_inp"
                                            onChange={handleChange}
                                          />
                                          <label
                                            htmlFor="cht_add_img"
                                            className="cht_fl_inp_lbl"
                                          >
                                            <MdAdd className="d_flex file_add_icn" />
                                          </label>
                                        </div>
                                        <Button
                                          ref={target}
                                          onClick={() => setShow(!show)}
                                        >
                                          <BsMic className="chatMicIcn" />
                                        </Button>
                                        <span
                                          className="chatIn-send"
                                          onClick={handleButtonClick}
                                        >
                                          <BsArrowRight />
                                        </span>
                                      </div>
                                      <div>
                                        <Overlay
                                          target={target.current}
                                          show={show}
                                          placement="top"
                                          className=""
                                        >
                                          <Tooltip id="overlay-example">
                                            <div className="recordingPopup">
                                              <h5>Record Audio</h5>
                                              <div className="d-flex mt-3 justify-content-evenly">
                                                <Button
                                                  className="rec_aud_btn"
                                                  onClick={onStartRecording}
                                                  disabled={isRecording}
                                                >
                                                  {" "}
                                                  <BsPlay
                                                    fontSize={"20px"}
                                                  />{" "}
                                                  Start
                                                </Button>
                                                <Button
                                                  className="rec_aud_btn"
                                                  onClick={onStopRecording}
                                                  disabled={!isRecording}
                                                >
                                                  {" "}
                                                  <BsPause
                                                    fontSize={"20px"}
                                                  />{" "}
                                                  Stop
                                                </Button>
                                              </div>
                                              <div>
                                                <ReactMic
                                                  record={isRecording}
                                                  className="sound-wave w-100 my-2"
                                                  onStop={onStopRecording}
                                                />
                                              </div>
                                              <div className="text-end">
                                                <button
                                                  className="sendrecBtn"
                                                  onClick={(e) => {
                                                    handleButtonClick(e);
                                                    setShow(!show);
                                                  }}
                                                >
                                                  Send
                                                </button>
                                              </div>
                                            </div>
                                          </Tooltip>
                                        </Overlay>
                                      </div>
                                    </div>
                                  </Form>
                                </Col>

                                <Col md={3}>
                                  <div className="tab_in_card">
                                    <Link>
                                      <div className="tab_in_card-heading d-flex justify-content-between align-items-center">
                                        <h4>Participants</h4>
                                        {/* <div className="icon text-white ">
                                          <AiOutlinePlus onClick={AddParticipents} />
                                        </div> */}
                                      </div>
                                    </Link>

                                    <div className="scrollHtPnts">
                                      {userList?.map((curr) => {
                                        return (
                                          <div className="tab_in_card_items">
                                            <div className="checkWrap">
                                              <FormControlLabel
                                                className={`me-0 ${!selectedIds.includes(
                                                  curr._id
                                                ) && "afterCheck"
                                                  }`}
                                                checked={
                                                  selectedIds.includes(
                                                    curr._id
                                                  ) ||
                                                  message?.some(
                                                    (item) =>
                                                      `${curr?.first_name} ${curr?.last_name}` ==
                                                      item?.addedMsg
                                                  )
                                                }
                                                onChange={() =>
                                                  handleCheckboxChange(curr._id)
                                                }
                                                control={
                                                  <Checkbox defaultChecked />
                                                }
                                                disabled={message?.some(
                                                  (item) =>
                                                    `${curr?.first_name} ${curr?.last_name}` ==
                                                    item?.addedMsg
                                                )}
                                              />
                                            </div>
                                            <div
                                              className="img"
                                              onClick={() => {
                                                setSenderId(curr._id);
                                                setShow({
                                                  content: false,
                                                  task: false,
                                                  presshop: false,
                                                  internal: true,
                                                });
                                              }}
                                            >
                                              <img src={usric} alt="user" />
                                              <span>
                                                {" "}
                                                {curr.first_name +
                                                  " " +
                                                  curr.last_name}
                                              </span>
                                            </div>
                                            {/* <div className="dots">
                                                <Link className="view_chat">View</Link>
                                              </div> */}
                                          </div>
                                        );
                                      })}
                                    </div>

                                    <button
                                      className="addPrtBtn btn w-100"
                                      onClick={AddParticipents}
                                    >
                                      Add
                                    </button>
                                  </div>
                                </Col>
                              </Row>
                            </div>
                          </Tab>

                          <Tab eventKey="external" title="Hopper Chat">
                            <a href="lorem"></a>
                            <div className="tab-data active">
                              <Row>
                                <Col md={12}>
                                  <div className="feed_dtl_msgs extrnl dd">
                                    <div className="externalText">
                                      <h6 className="txt_light">
                                        Welcome{" "}
                                        <span className="txt_bld">
                                          {fullName}
                                        </span>
                                        .
                                      </h6>
                                      <h6 className="txt_light">
                                        Please click the 'Offer' button to make
                                        an offer, or simply click 'Buy' to
                                        purchase the content
                                      </h6>
                                    </div>
                                    <div
                                      className="d-flex flex-column-reverse"
                                      ref={chatBoxRef}
                                    >
                                      {messages &&
                                        messages.map((curr) => {
                                          const Ratingg = messages?.find(
                                            (item) =>
                                              item?.message_type ===
                                              "rating_mediaHouse"
                                          );

                                          const Ratings = Ratingg
                                            ? Ratingg?.rating
                                            : "";
                                          return curr?.message_type ===
                                            "offer_started" ? (
                                            <div className="crd chatting_itm sngl_cht d-flex align-items-start">
                                              <div className="img">
                                                <img
                                                  src={presshopchatic}
                                                  alt="User"
                                                  className="usr_img"
                                                />
                                              </div>
                                              <div className="cht_txt postedcmnt_info">
                                                <h5>
                                                  {"Presshop"}
                                                  <span className="text-secondary time">
                                                    {moment(
                                                      curr?.createdAt
                                                    ).format(
                                                      "h:mm A, D MMM YYYY"
                                                    )}
                                                  </span>
                                                </h5>
                                                <Typography className="comment_text">
                                                  Make an initial offer by
                                                  entering your price below
                                                </Typography>
                                                <form
                                                  onSubmit={(e) => {
                                                    e.preventDefault();
                                                    Content_Offer(
                                                      "Mediahouse_initial_offer"
                                                    );
                                                  }}
                                                  className="usr_upld_opts cont_opts"
                                                >
                                                  <input
                                                    className="cht_prc_inp text-center"
                                                    disabled={
                                                      messages.length !== 1 &&
                                                      true
                                                    }
                                                    type="number"
                                                    value={
                                                      messages[1]
                                                        ?.initial_offer_price
                                                        ? messages[1]
                                                          ?.initial_offer_price
                                                        : offer_value
                                                    }
                                                    placeholder={
                                                      messages?.filter(
                                                        (el) =>
                                                          el.message_type ==
                                                          "Mediahouse_initial_offer"
                                                      )[0]?.initial_offer_price
                                                        ? messages?.filter(
                                                          (el) =>
                                                            el.message_type ==
                                                            "Mediahouse_initial_offer"
                                                        )[0]
                                                          ?.initial_offer_price
                                                        : "Enter price here ..."
                                                    }
                                                    onChange={(e) => {
                                                      setOffer_value(
                                                        e.target.value
                                                      );
                                                    }}
                                                  />
                                                  {
                                                    // console.log("mediaoffer", messages?.filter((el) => el.message_type == "Mediahouse_initial_offer"))
                                                  }

                                                  {!MediahouseInitialOffer && (
                                                    <button
                                                      className="theme_btn"
                                                      disabled={
                                                        messages.length !== 1 &&
                                                        true
                                                      }
                                                      // onClick={() => Content_Offer("Mediahouse_initial_offer")}
                                                      type="submit"
                                                    >
                                                      Submit
                                                    </button>
                                                  )}
                                                </form>
                                              </div>
                                            </div>
                                          ) : curr.message_type ===
                                            "Mediahouse_initial_offer" ? (
                                            <div className="crd chatting_itm sngl_cht d-flex align-items-start">
                                              <div className="img">
                                                <img
                                                  src={userImage}
                                                  alt="User"
                                                  className="usr_img"
                                                />
                                              </div>
                                              <div className="cht_txt postedcmnt_info">
                                                {/* <div className="d-flex align-items-center"> */}
                                                <h5>
                                                  {username}
                                                  <span className="text-secondary time">
                                                    {moment(
                                                      curr?.createdAt
                                                    ).format(
                                                      "h:mm A, D MMM YYYY"
                                                    )}
                                                  </span>
                                                </h5>
                                                {/* </div> */}
                                                <Typography className="comment_text">
                                                  Has initially offered{" "}
                                                  <a className="link">
                                                    £
                                                    {curr.message_type ===
                                                      "Mediahouse_initial_offer" &&
                                                      curr.initial_offer_price}
                                                  </a>{" "}
                                                  to buy the content
                                                </Typography>
                                                {/* <p className="mb-0 msg auto_press_msg">Has initially offered £{curr.message_type === "Mediahouse_initial_offer" && curr.initial_offer_price} to buy the content</p> */}
                                              </div>
                                            </div>
                                          ) : curr.message_type ===
                                            "hopper_final_offer" ? (
                                            <div className="chatting_itm crd sngl_cht d-flex align-items-start">
                                              <div className="img">
                                                <img
                                                  src={
                                                    data
                                                      ? data?.hopper_id
                                                        ?.avatar_id?.avatar
                                                        ? process.env
                                                          .REACT_APP_AVATAR_IMAGE +
                                                        data?.hopper_id
                                                          ?.avatar_id?.avatar
                                                        : null
                                                      : fav?.content_id
                                                        ?.hopper_id?.avatar_id
                                                        ?.avatar
                                                        ? process.env
                                                          .REACT_APP_AVATAR_IMAGE +
                                                        fav?.content_id
                                                          ?.hopper_id?.avatar_id
                                                          ?.avatar
                                                        : null
                                                  }
                                                  alt="User"
                                                  className="usr_img"
                                                />
                                              </div>
                                              <div className="cht_txt postedcmnt_info">
                                                <div className="d-flex align-items-center">
                                                  <h5 className="usr_name mb-0">
                                                    {data
                                                      ? data?.hopper_id
                                                        ?.user_name
                                                      : fav?.content_id
                                                        ?.hopper_id
                                                        ?.user_name}
                                                    <span className="text-secondary time">
                                                      {moment(
                                                        curr?.createdAt
                                                      ).format(
                                                        "h:mm A, D MMM YYYY"
                                                      )}
                                                    </span>
                                                  </h5>
                                                </div>
                                                <p className="mb-0 msg">
                                                  Has counter offered{" "}
                                                  <a className="link">
                                                    £
                                                    {curr.message_type ===
                                                      "hopper_final_offer" &&
                                                      curr.finaloffer_price}
                                                  </a>{" "}
                                                  to sell the content
                                                </p>
                                                {!MediahouseFinalCounter && (
                                                  <div className="usr_upld_opts">
                                                    <button className="theme_btn " onClick={() => {
                                                      paymentintentnew(curr);
                                                    }}>
                                                      Buy
                                                    </button>
                                                    <span>or</span>
                                                    <button
                                                      className="secondary_btn"
                                                      onClick={() =>
                                                        Content_Offer(
                                                          "Mediahouse_final_counter"
                                                        )
                                                      }
                                                    >
                                                      Make a Counter Offer
                                                    </button>
                                                  </div>
                                                )}
                                                <p className="buy_btn_txt mb-0">
                                                  The Hopper can make a counter
                                                  offer only once to you
                                                </p>
                                              </div>
                                            </div>
                                          ) : curr.message_type ===
                                            "Mediahouse_final_counter" ? (
                                            <div className="chatting_itm crd sngl_cht d-flex align-items-start">
                                              <div className="img">
                                                <img
                                                  src={presshopchatic}
                                                  alt="User"
                                                  className="usr_img"
                                                />
                                              </div>
                                              <div className="cht_txt postedcmnt_info">
                                                <div className="d-flex align-items-center">
                                                  <h5 className="usr_name mb-0">
                                                    {"Presshop"}
                                                    <span className="text-secondary time">
                                                      {moment(
                                                        curr?.createdAt
                                                      ).format(
                                                        "h:mm A, D MMM YYYY"
                                                      )}
                                                    </span>
                                                  </h5>
                                                </div>
                                                <p className="mb-0 msg">
                                                  Make a final counter offer by
                                                  entering your price below
                                                </p>

                                                <form
                                                  className="usr_upld_opts cont_opts"
                                                  onSubmit={(e) => {
                                                    e.preventDefault();
                                                    Content_Offer(
                                                      "Mediahouse_final_offer"
                                                    );
                                                  }}
                                                >
                                                  <input
                                                    className="cht_prc_inp text-center"
                                                    disabled={
                                                      hopperFinalOfferPrice &&
                                                      true
                                                    }
                                                    type="text"
                                                    value={
                                                      hopperFinalOfferPrice
                                                        ? hopperFinalOfferPrice
                                                        : offer_value
                                                    }
                                                    placeholder="Enter price here ..."
                                                    onChange={(e) => {
                                                      setOffer_value(
                                                        e.target.value
                                                      );
                                                    }}
                                                  />
                                                  {!hopperFinalOfferPrice && (
                                                    <button
                                                      className="theme_btn"
                                                      // disabled={hopperFinalOfferPrice && true}
                                                      // onClick={() => Content_Offer("Mediahouse_final_offer")}
                                                      type="submit"
                                                    >
                                                      Submit
                                                    </button>
                                                  )}
                                                </form>
                                              </div>
                                            </div>
                                          ) : curr.message_type ===
                                            "Mediahouse_final_offer" ? (
                                            <div className="chatting_itm crd auto_msg sngl_cht d-flex align-items-start">
                                              <div className="img">
                                                <img
                                                  src={userImage}
                                                  alt="User"
                                                  className="usr_img"
                                                />
                                              </div>
                                              <div className="cht_txt postedcmnt_info">
                                                <div className="d-flex align-items-center">
                                                  <h5 className="usr_name mb-0">
                                                    {username}
                                                    <span className="text-secondary time">
                                                      {moment(
                                                        curr?.createdAt
                                                      ).format(
                                                        "h:mm A, D MMM YYYY"
                                                      )}
                                                    </span>
                                                  </h5>
                                                </div>
                                                <p className="mb-0 msg auto_press_msg">
                                                  Has finally offered{" "}
                                                  <a className="link">
                                                    £
                                                    {curr.message_type ===
                                                      "Mediahouse_final_offer" &&
                                                      curr.finaloffer_price}
                                                  </a>{" "}
                                                  to buy the content
                                                </p>
                                              </div>
                                            </div>
                                          ) : curr.message_type ===
                                            "accept_mediaHouse_offer" ? (
                                            <div className="crd chatting_itm auto_msg sngl_cht d-flex align-items-start">
                                              <div className="img">
                                                <img
                                                  src={
                                                    data
                                                      ? data?.hopper_id
                                                        ?.avatar_id?.avatar
                                                        ? process.env
                                                          .REACT_APP_AVATAR_IMAGE +
                                                        data?.hopper_id
                                                          ?.avatar_id?.avatar
                                                        : null
                                                      : fav?.content_id
                                                        ?.hopper_id?.avatar_id
                                                        ?.avatar
                                                        ? process.env
                                                          .REACT_APP_AVATAR_IMAGE +
                                                        fav?.content_id
                                                          ?.hopper_id?.avatar_id
                                                          ?.avatar
                                                        : null
                                                  }
                                                  alt="User"
                                                  className="usr_img"
                                                />
                                              </div>
                                              <div className="cht_txt postedcmnt_info">
                                                <div className="d-flex align-items-center">
                                                  <h5 className="usr_name mb-0">
                                                    {curr?.sender_id?.user_name}
                                                    <span className="text-secondary time">
                                                      {moment(
                                                        curr?.createdAt
                                                      ).format(
                                                        "h:mm A, D MMM YYYY"
                                                      )}
                                                    </span>
                                                  </h5>
                                                </div>
                                                <p className="mb-0 msg auto_press_msg">
                                                  Has accepted your offer of{" "}
                                                  <a className="link">
                                                    £{curr?.amount}
                                                  </a>{" "}
                                                  to sell the content
                                                </p>
                                                <div className="usr_upld_opts">
                                                  <button
                                                    className={
                                                      curr.paid_status === true
                                                        ? "sub_hdng_inn"
                                                        : "theme_btn"
                                                    }
                                                    disabled={
                                                      curr.paid_status === true
                                                    }
                                                    onClick={() => {
                                                      paymentintentnew(curr);
                                                    }}
                                                  >
                                                    Buy
                                                  </button>
                                                </div>
                                              </div>
                                            </div>
                                          ) : curr.message_type ===
                                            "reject_mediaHouse_offer" ? (
                                            <div className="crd chatting_itm sngl_cht d-flex align-items-start">
                                              <div className="img">
                                                <img
                                                  src={
                                                    data
                                                      ? data?.hopper_id
                                                        ?.avatar_id?.avatar
                                                        ? process.env
                                                          .REACT_APP_AVATAR_IMAGE +
                                                        data?.hopper_id
                                                          ?.avatar_id?.avatar
                                                        : null
                                                      : fav?.content_id
                                                        ?.hopper_id?.avatar_id
                                                        ?.avatar
                                                        ? process.env
                                                          .REACT_APP_AVATAR_IMAGE +
                                                        fav?.content_id
                                                          ?.hopper_id?.avatar_id
                                                          ?.avatar
                                                        : null
                                                  }
                                                  alt="User"
                                                  className="usr_img"
                                                />
                                              </div>
                                              <div className="cht_txt postedcmnt_info">
                                                <div className="d-flex align-items-center">
                                                  <h5 className="usr_name mb-0">
                                                    {curr?.sender_id?.user_name}
                                                    <span className="text-secondary time">
                                                      {moment(
                                                        curr?.createdAt
                                                      ).format(
                                                        "h:mm A, D MMM YYYY"
                                                      )}
                                                    </span>
                                                  </h5>
                                                </div>
                                                <p className="mb-0 msg">
                                                  Has rejected your offer to
                                                  sell the content
                                                </p>
                                              </div>
                                            </div>
                                          ) : curr.message_type ===
                                            "PaymentIntent" &&
                                            PaymentIntent ? (
                                            <div className="crd chatting_itm auto_msg sngl_cht d-flex align-items-start">
                                              <div className="img">
                                                <img
                                                  src={presshopchatic}
                                                  alt="User"
                                                  className="usr_img"
                                                />
                                              </div>
                                              <div className="cht_txt postedcmnt_info">
                                                <div className="d-flex align-items-center">
                                                  <h5 className="usr_name mb-0">
                                                    Presshop
                                                    <span className="text-secondary time">
                                                      {moment(
                                                        curr?.createdAt
                                                      ).format(
                                                        "h:mm A, D MMM YYYY"
                                                      )}
                                                    </span>
                                                  </h5>
                                                </div>
                                                <p className="mb-0 msg auto_press_msg">
                                                  Congrats, you’ve successfully
                                                  purchased{" "}
                                                  {data?.content?.count} content
                                                  for £{curr?.amount_paid}.
                                                  Please download the water-mark
                                                  free, and high definition
                                                  content, by clicking below
                                                </p>
                                                <div className="usr_upld_opts">
                                                  <button
                                                    className="theme_btn"
                                                    onClick={() =>
                                                      DownloadContent(
                                                        curr?.image_id
                                                      )
                                                    }
                                                  >
                                                    Download
                                                  </button>
                                                </div>
                                                <p className="buy_btn_txt mb-0">
                                                  Please refer to our{" "}
                                                  <a className="link">
                                                    licensing terms of usage
                                                  </a>
                                                  , and{" "}
                                                  <a className="link">
                                                    terms and conditions
                                                  </a>
                                                  . If you have any questions,
                                                  please{" "}
                                                  <a className="link">chat</a>{" "}
                                                  or{" "}
                                                  <a className="link">
                                                    contact
                                                  </a>{" "}
                                                  our helpful teams who are
                                                  available 24x7 to assist you.
                                                  Thank you.
                                                </p>
                                              </div>
                                            </div>
                                          ) : curr.message_type ===
                                            "rating_mediaHouse" ? (
                                            <div className="crd chatting_itm auto_msg rating sngl_cht d-flex align-items-start">
                                              <div className="img">
                                                <img
                                                  src={presshopchatic}
                                                  alt="User"
                                                  className="usr_img"
                                                />
                                              </div>
                                              <div className="cht_txt postedcmnt_info">
                                                <div className="d-flex align-items-center">
                                                  <h5 className="usr_name mb-0">
                                                    Presshop
                                                    <span className="text-secondary time">
                                                      {moment(
                                                        curr?.createdAt
                                                      ).format(
                                                        "h:mm A, D MMM YYYY"
                                                      )}
                                                    </span>
                                                  </h5>
                                                </div>
                                                <p className="mb-0 msg auto_press_msg">
                                                  Rate your experience with{" "}
                                                  {curr?.receiver_id?.user_name}
                                                </p>
                                                <div className="usr_upld_opts">
                                                  <Rating
                                                    onClick={handleRating}
                                                    // onPointerEnter={onPointerEnter}
                                                    // onPointerLeave={onPointerLeave}
                                                    // onPointerMove={onPointerMove}
                                                    disabled={curr.review}
                                                    initialValue={
                                                      Ratings
                                                        ? Number(Ratings)
                                                        : 0
                                                    }
                                                    value={rating}
                                                  />
                                                  <Form.Group
                                                    className="mb-3"
                                                    controlId="exampleForm.ControlTextarea1"
                                                  >
                                                    <Form.Control
                                                      placeholder="Write your review"
                                                      disabled={curr.review}
                                                      value={
                                                        curr.review
                                                          ? curr.review
                                                          : review
                                                      }
                                                      onChange={(e) => {
                                                        setReview(
                                                          e.target.value
                                                        );
                                                      }}
                                                      as="textarea"
                                                      rows={3}
                                                    ></Form.Control>
                                                  </Form.Group>
                                                  {!curr.rating && (
                                                    <button
                                                      className="theme_btn"
                                                      onClick={() =>
                                                        RatingNReview(
                                                          curr.image_id
                                                        )
                                                      }
                                                    >
                                                      Submit
                                                    </button>
                                                  )}
                                                </div>
                                              </div>
                                            </div>
                                          ) : curr.message_type ===
                                            "reject_mediaHouse_offer" &&
                                            !curr.paid_status ? (
                                            <div className="crd chatting_itm auto_msg rating sngl_cht d-flex align-items-start">
                                              <div className="img">
                                                <img
                                                  src={presshopchatic}
                                                  alt="User"
                                                  className="usr_img"
                                                />
                                              </div>
                                              <div className="cht_txt postedcmnt_info">
                                                <div className="d-flex align-items-center">
                                                  <h5 className="usr_name mb-0">
                                                    Presshop
                                                    <span className="text-secondary time">
                                                      {moment(
                                                        curr?.createdAt
                                                      ).format(
                                                        "h:mm A, D MMM YYYY"
                                                      )}
                                                    </span>
                                                  </h5>
                                                </div>
                                                <p className="mb-0 msg auto_press_msg">
                                                  Rate your experience with
                                                  Pseudonymous
                                                </p>
                                                <div className="usr_upld_opts">
                                                  <Rating
                                                    onClick={handleRating}
                                                    // onPointerEnter={onPointerEnter}
                                                    // onPointerLeave={onPointerLeave}
                                                    // onPointerMove={onPointerMove}
                                                    value={rating}
                                                    disabled={curr.review}
                                                    // initialValue={Ratingg ? Number(Ratings) : rating}
                                                    initialValue={
                                                      Ratings
                                                        ? Number(Ratings)
                                                        : 0
                                                    }
                                                  // defaultValue={3}
                                                  />
                                                  <Form.Group
                                                    className="mb-3"
                                                    controlId="exampleForm.ControlTextarea1"
                                                  >
                                                    <Form.Control
                                                      placeholder="Write your review"
                                                      as="textarea"
                                                      rows={3}
                                                    ></Form.Control>
                                                  </Form.Group>
                                                  <button
                                                    className="theme_btn"
                                                    onClick={() =>
                                                      RatingNReview(
                                                        curr.image_id
                                                      )
                                                    }
                                                  >
                                                    Submit
                                                  </button>
                                                </div>
                                              </div>
                                            </div>
                                          ) : (
                                            ""
                                          );
                                        })}
                                    </div>
                                  </div>
                                </Col>
                              </Row>
                            </div>
                          </Tab>

                          <Tab eventKey="presshop" title="Presshop Chat">
                            <div className="tab-data active">
                              <Row>
                                <Col md={9}>
                                  <div className="feed_dtl_msgs presshopChatDetail dp">
                                    <div className="externalText">
                                      <h6 className="txt_light">
                                        Welcome{" "}
                                        <span className="txt_bld">
                                          {fullName}
                                        </span>
                                        .
                                      </h6>
                                      <h6 className="txt_light">
                                        Please select the Presshop team member
                                        you wish to speak to from the
                                        participants box on the right.{" "}
                                      </h6>
                                      <h6 className="txt_light">
                                        Once selected, please use the text box
                                        below to start chatting.{" "}
                                      </h6>
                                    </div>
                                    {showChat.presshop ? (
                                      <ChatCard
                                        senderId={senderId && senderId}
                                      />
                                    ) : (
                                      <ChatCard />
                                    )}
                                  </div>
                                </Col>
                                <Col md={3}>
                                  <div className="tab_in_card">
                                    <div className="tab_in_card-heading d-flex justify-content-between align-items-center">
                                      <h4>Participants</h4>
                                    </div>

                                    <div className="scrollHtPnts presshopChat">
                                      {adminList &&
                                        adminList
                                          .filter((obj1) =>
                                            admins.some(
                                              (obj2) =>
                                                obj1._id == obj2.userId?.id
                                            )
                                          )
                                          .map((curr) => {
                                            return (
                                              <div
                                                className="tab_in_card_items"
                                                onClick={() => {
                                                  localStorage.setItem(
                                                    "receiverId",
                                                    JSON.stringify(curr._id)
                                                  ) || "";
                                                  localStorage.removeItem(
                                                    "contentId"
                                                  );
                                                  localStorage.removeItem(
                                                    "roomId"
                                                  );
                                                  if (
                                                    admins?.some(
                                                      (el) =>
                                                        el?.userId?.id ===
                                                        curr._id
                                                    )
                                                  ) {
                                                    setSenderId(curr._id);
                                                    setShowChat({
                                                      content: false,
                                                      task: false,
                                                      presshop: true,
                                                    });
                                                  }
                                                }}
                                              >
                                                <div className="checkWrap">
                                                  <FormControlLabel
                                                    className="afterCheck"
                                                    // disabled={admins?.some((el) => el?.userId?.id !== curr._id)}
                                                    control={<Checkbox />}
                                                    checked={curr.checked}
                                                    onChange={() =>
                                                      handleChecked(curr)
                                                    }
                                                  />
                                                </div>
                                                <div className="img">
                                                  <img
                                                    src={
                                                      process.env
                                                        .REACT_APP_ADMIN_IMAGE +
                                                      curr?.profile_image
                                                    }
                                                    alt="user"
                                                  />
                                                  <span
                                                    className={
                                                      admins?.some(
                                                        (el) =>
                                                          el?.userId?.id ===
                                                          curr._id
                                                      )
                                                        ? "activeUsr"
                                                        : "InactiveUsr"
                                                    }
                                                  >
                                                    {curr?.name}
                                                  </span>
                                                </div>
                                              </div>
                                            );
                                          })}
                                      {admins.length === 0 &&
                                        adminList
                                          .filter(
                                            (obj1) => obj1.role === "admin"
                                          )
                                          .map((curr) => {
                                            return (
                                              <div
                                                className="tab_in_card_items"
                                                onClick={() => {
                                                  localStorage.setItem(
                                                    "receiverId",
                                                    JSON.stringify(curr._id)
                                                  ) || "";
                                                  localStorage.removeItem(
                                                    "contentId"
                                                  );
                                                  localStorage.removeItem(
                                                    "roomId"
                                                  );
                                                  setSenderId(curr._id);
                                                  setShowChat({
                                                    content: false,
                                                    task: false,
                                                    presshop: true,
                                                  });
                                                }}
                                              >
                                                <div className="checkWrap">
                                                  <FormControlLabel
                                                    className="afterCheck"
                                                    // disabled={admins?.some((el) => el?.userId?.id !== curr._id)}
                                                    control={<Checkbox />}
                                                    checked={curr.checked}
                                                    onChange={() =>
                                                      handleChecked(curr)
                                                    }
                                                  />
                                                </div>
                                                <div className="img">
                                                  <img
                                                    src={
                                                      process.env
                                                        .REACT_APP_ADMIN_IMAGE +
                                                      curr?.profile_image
                                                    }
                                                    alt="user"
                                                  />
                                                  <span className={"activeUsr"}>
                                                    {curr?.name}
                                                  </span>
                                                </div>
                                              </div>
                                            );
                                          })}
                                    </div>
                                  </div>
                                </Col>
                              </Row>
                            </div>
                          </Tab>
                        </Tabs>
                      </div>
                    </Col>
                  </Row>
                </div>

                <div className="feedsContainer">
                  <div className="feedContent_header">
                    <h1>Related content</h1>
                    <div className="d-flex align-items-center">
                      {/* <div className="fltrs_prnt me-3 ht_sort">
                        <Button
                          className="sort_btn"
                          onClick={() => {
                            setOpenRecentActivity(true);
                          }}
                        >
                          Sort
                          <BsChevronDown />
                        </Button>
                        {openRecentActivity && (
                          <RecentActivityDF
                            closeRecentActivity={handleCloseRecentActivity}
                            recentActivityValues={handleRecentActivityValue}
                            active={relatedContentState}
                            setActive={setRelatedContentState}
                            handleCloseRecentActivity={() =>
                              setOpenRecentActivity(false)
                            }
                          />
                        )}
                      </div> */}
                      <Link to={`/related-content/tags/${data?.hopper_id?._id}/${data?.category_id?._id}`} className="next_link">
                        View all
                        <BsArrowRight className="text-pink" />
                      </Link>
                    </div>
                  </div>
                  <Row className="">
                    {content?.slice(0, 4).map((curr, index) => {
                      const Audio = curr?.content?.filter(
                        (curr) => curr?.media_type === "audio"
                      );
                      const Video = curr?.content?.filter(
                        (curr) => curr?.media_type === "video"
                      );
                      const Image = curr?.content?.filter(
                        (curr) => curr?.media_type === "image"
                      );
                      const Pdf = curr?.content?.filter(
                        (curr) => curr?.media_type === "pdf"
                      );
                      const Doc = curr?.content?.filter(
                        (curr) => curr?.media_type === "doc"
                      );

                      const imageCount = Image.length;
                      const videoCount = Video.length;
                      const audioCount = Audio.length;
                      const pdfCount = Pdf.length;
                      const docCount = Doc.length;
                      return (
                        <Col md={3}>
                          <ContentFeedCard
                            lnkto={`/Feeddetail/content/${curr._id}`}
                            viewTransaction={"View details"}
                            viewDetail={`/Feeddetail/content/${curr._id}`}
                            // postcount={curr?.content?.length}
                            feedImg={
                              curr?.content[0]?.media_type === "video"
                                ? curr?.content[0]?.watermark ||
                                process.env.REACT_APP_CONTENT_MEDIA +
                                curr?.content[0]?.thumbnail
                                : curr?.content[0]?.media_type === "audio"
                                  ? audioic
                                  : curr?.content[0]?.watermark ||
                                  process.env.REACT_APP_CONTENT_MEDIA +
                                  curr?.content[0]?.media
                            }
                            // feedType={contentVideo}
                            feedTag={curr?.sales_prefix ? `${curr?.sales_prefix} ${curr?.discount_percent}% Off` : curr?.content_view_type == "mostpopular" ? "Most Popular" : curr?.content_view_type == "mostviewed" ? "Most viewed" :  null}
                            user_avatar={
                              process.env.REACT_APP_AVATAR_IMAGE +
                              curr?.hopper_id?.avatar_id?.avatar
                            }
                            author_Name={curr.hopper_id?.user_name}
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
                            favourite={() => favContentHandler(index, "related")}
                            type_img={
                              curr?.type === "shared" ? shared : exclusive
                            }
                            type_tag={curr.type}
                            feedHead={curr.heading}
                            feedTime={moment(curr?.createdAt).format(
                              "DD MMMM, YYYY"
                            )}
                            feedLocation={curr.location}
                            contentPrice={formatAmountInMillion(curr?.ask_price)}
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
                          />
                        </Col>
                      );
                    })}
                  </Row>
                </div>

                <div className="feedsContainer mb-0">
                  <div className="feedContent_header">
                    <h1>More content from {hopper?.user_name}</h1>
                    <div className="d-flex align-items-center">
                      {/* <div className="fltrs_prnt me-3 ht_sort">
                        <Button
                          className="sort_btn"
                          onClick={() => {
                            setOpenMoreContent(true);
                          }}
                        >
                          Sort
                          <BsChevronDown />
                        </Button>
                        {openMoreContent && (
                          <RecentActivityDF
                            closeRecentActivity={handleCloseRecentActivity}
                            recentActivityValues={handleRecentActivityValue}
                            active={moreContentState}
                            setActive={setMoreContentState}
                            handleCloseRecentActivity={() =>
                              setOpenMoreContent(false)
                            }
                          />
                        )}
                      </div> */}
                      <Link to={`/more-content/${hopper?._id}`} className="next_link">
                        View all
                        <BsArrowRight className="text-pink" />
                      </Link>
                    </div>
                  </div>
                  <Row className="">
                    {moreContent?.slice(0, 4)?.map((curr, index) => {
                      const Audio = curr?.content?.filter(
                        (curr) => curr?.media_type === "audio"
                      );
                      const Video = curr?.content?.filter(
                        (curr) => curr?.media_type === "video"
                      );
                      const Image = curr?.content?.filter(
                        (curr) => curr?.media_type === "image"
                      );
                      const Pdf = curr?.content?.filter(
                        (curr) => curr?.media_type === "pdf"
                      );
                      const Doc = curr?.content?.filter(
                        (curr) => curr?.media_type === "doc"
                      );

                      const imageCount = Image.length;
                      const videoCount = Video.length;
                      const audioCount = Audio.length;
                      const pdfCount = Pdf.length;
                      const docCount = Doc.length;
                      return (
                        <Col md={3}>
                          <ContentFeedCard
                            lnkto={`/Feeddetail/content/${curr._id}`}
                            viewTransaction={"View details"}
                            viewDetail={`/Feeddetail/content/${curr._id}`}
                            feedImg={
                              curr?.content[0]?.media_type === "video"
                                ? process.env.REACT_APP_CONTENT_MEDIA +
                                curr?.content[0]?.thumbnail
                                : curr?.content[0]?.media_type === "audio"
                                  ? audioic
                                  : curr?.content[0]?.watermark ||
                                  process.env.REACT_APP_CONTENT_MEDIA +
                                  curr?.content[0]?.media
                            }
                            feedType={contentVideo}
                            feedTag={curr?.sales_prefix ? `${curr?.sales_prefix} ${curr?.discount_percent}% Off` : curr?.content_view_type == "mostpopular" ? "Most Popular" : curr?.content_view_type == "mostviewed" ? "Most viewed" :  null}
                            user_avatar={
                              process.env.REACT_APP_AVATAR_IMAGE +
                              curr?.hopper_id?.avatar_id?.avatar ||
                              authorimg
                            }
                            author_Name={curr.hopper_id?.user_name}
                            type_img={
                              curr?.type === "shared" ? shared : exclusive
                            }
                            type_tag={curr?.type}
                            feedHead={curr.heading}
                            feedTime={moment(curr?.createdAt).format(
                              "DD MMMM, YYYY"
                            )}
                            feedLocation={curr.location}
                            contentPrice={formatAmountInMillion(curr.ask_price)}
                            content_id={curr?._id}
                            fvticns={
                              curr?.favourite_status == "true"
                                ? favouritedic
                                : favic
                            }
                            bool_fav={curr.favourite_status === "true" ? "false" : "true"}
                            favourite={() => favContentHandler(index, "more")}
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
      {/* Show Image in Chat */}
      <Modal
        show={show1}
        onHide={handleClose}
        aria-labelledby="contained-modal-title-hcenter profile_mdl"
        className="modal_wrapper"
        dialogClassName="my-modal adm_reg_mdl mdl_dsn"
      >
        <Modal.Header className="modal-header profile_mdl_hdr_wrap" closeButton>
          <Modal.Title className="modal-title profile_modal_ttl">
            <p className="mb-0">Image Preview</p>
          </Modal.Title>
        </Modal.Header>
        <Modal.Body className="show-grid modal-body border-0">
          <Container>
            <div>
              <img className="mdlPrevImg" src={bigData} />
            </div>
          </Container>
        </Modal.Body>
        <Modal.Footer className="border-0 mb-4">
          <Button
            className="w-50 m-auto d-inline-block py-2 text-lowercase mdl_btn"
            variant="primary"
            type="submit"
          >
            <div className="link_white" onClick={handleClose}>
              Close
            </div>
          </Button>
        </Modal.Footer>
      </Modal>

      {/* Show Image in Chat */}
      <Modal
        show={preview?.modalOpen}
        onHide={handleClosePreview}
        aria-labelledby="contained-modal-title-hcenter profile_mdl"
        className="modal_wrapper"
        dialogClassName="my-modal adm_reg_mdl mdl_dsn"
      >
        <Modal.Header className="modal-header profile_mdl_hdr_wrap" closeButton>
          <Modal.Title className="modal-title profile_modal_ttl">
            <p className="mb-0">Image Preview</p>
          </Modal.Title>
        </Modal.Header>
        <Modal.Body className="show-grid modal-body border-0">
          <Container>
            <div>
              {preview?.type === "image" ? (
                <img className="mdlPrevImg" src={preview?.path} />
              ) : preview?.type === "video" ? (
                <video
                  src={preview?.path}
                  className="msgContent"
                  controls
                ></video>
              ) : (
                ""
              )}
            </div>
          </Container>
        </Modal.Body>
        <Modal.Footer className="border-0 mb-4">
          <Button
            className="w-50 m-auto d-inline-block py-2 text-lowercase mdl_btn"
            variant="primary"
            type="submit"
          >
            <div className="link_white" onClick={handleButtonClick}>
              Send
            </div>
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default asFeeddetail;
