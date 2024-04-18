import {
  Card
} from "@mui/material";
import React, { memo, useEffect, useState } from "react";
import { BsArrowLeft } from "react-icons/bs";
import { Link } from "react-router-dom";
import DbFooter from "../component/DbFooter";
import Header from "../component/Header";

import {
  Col,
  Container,
  Row,
  Tab,
  Tabs
} from "react-bootstrap";
import Accordion from "react-bootstrap/Accordion";
import contactic from "../assets/images/chat-icons/contactus.svg";
import externalchatic from "../assets/images/chat-icons/externalchat.svg";
import internalchatic from "../assets/images/chat-icons/internalchat.svg";
import presshopchatic from "../assets/images/chat-icons/presshoplogo.svg";
import cameraic from "../assets/images/typeCam.svg";
import ChatCard from "../component/ChatCard";
import TopSearchesTipsCard from "../component/card/TopSearchesTipsCard";

import { GoogleMap, Marker } from "@react-google-maps/api";
import moment from "moment/moment";
import ChatCardSocket from "../component/ChatCardSocket";
import Chatbroadcasttask from "../component/Chatbroadcasttask";
import { Get, Post } from "../services/user.services";
import ContentDtlChat from "./ContentDtlChat";

import lastmsgImage from "../assets/images/image-svgrepo-com.svg";
import GroupContentDtlChat from "./GroupContentDtlChat";

import io from "socket.io-client";
import { useDarkMode } from "../context/DarkModeContext";
const socket = io.connect('https://uat.presshop.live:3005');
const Chat = () => {
  const [groupIds, setGroupIds] = useState({
    contentId: localStorage.getItem("contentId") && JSON.parse(localStorage.getItem("contentId")) || '',
    room_id: (localStorage.getItem("roomId")) && JSON.parse(localStorage.getItem("roomId")) || '',
    taskId: ''
    ,
  });

  const [liveTasks, setLiveTasks] = useState();
  const [loading, setLoading] = useState(false);
  const [taskId, setTaskId] = useState("");
  const [adminList, setAdminList] = useState([]);
  const [userList, setUserList] = useState([]);
  const [senderId, setSenderId] = useState(localStorage.getItem("receiverId") && JSON.parse(localStorage.getItem("receiverId")) || "");
  const [fav, setFav] = useState(false);
  const [PublishedData, setPublishedData] = useState([]);
  const [hopperList, setHopperList] = useState([]);
  const [contentList, setContentlist] = useState([]);
  const [admins, setAdmins] = useState([]);

  const [show, setShow] = useState({
    content: false,
    task: false,
    presshop: ((localStorage.getItem("receiverId"))) ? true : false,
    internal: ((localStorage.getItem("contentId")) && (localStorage.getItem("roomId"))) ? true : false,
  });

  const { profileData } = useDarkMode();
  const userImage = profileData?.hasOwnProperty("admin_detail") ? profileData?.admin_detail?.admin_profile
    : profileData?.profile_image

  const GetAdminList = async () => {
    const resp = await Get(`mediaHouse/adminlist`);
    setAdminList(resp.data.data);
  };

  useEffect(() => {
    socket?.on("getAdmins", (data) => {
      setAdmins(data)
    })
  }, [socket])

  const GetUserList = async () => {
    const resp = await Get(`mediaHouse/getdesignatedUSer?allow_to_chat_externally=true`);
    setUserList(resp.data.response);
  };

  const [group, setGroup] = useState([])

  const getGroups = async () => {
    try {
      const resp = await Post(`mediaHouse/internalGroupChatMH`, { type: "is_group_exists" })
      if (resp) {
        setGroup(resp?.data?.data, `<<<<<this is the resp of groups`)
      }
    } catch (eror) {
    }
  }
  useEffect(() => {
    getGroups()
  }, [])

  const LiveTasks = async () => {
    setLoading(true);

    try {
      const resp = await Get(`mediaHouse/live/expired/tasks?status=live`);
      setLiveTasks(resp.data.tasks);
      if (resp) {
        setLoading(false);
      }
    } catch (error) {
      setLoading(false);
    }
  };

  const handleFavourite = () => {
    setFav(!fav);
    PublishContent();
  };

  const PublishContent = async () => {
    setLoading(true);

    try {
      const resp = await Post("mediaHouse/view/published/content");
      setPublishedData(resp.data.content);
      if (resp) {
        setLoading(false);
      }
    } catch (error) {
      setLoading(false);
    }
  };

  const HopperList = async () => {
    setLoading(true);

    try {
      const resp = await Get(`mediahouse/getallhopperlist`);
      localStorage.setItem("hopperList", JSON.stringify(resp?.data?.response))
      setHopperList(resp.data.response);
      if (resp) {
        setLoading(false);
      }
    } catch (error) {
      setLoading(false);
    }
  };

  const ContentList = async (hopper_id) => {
    setLoading(true);

    try {
      const resp = await Get(
        `mediahouse/getallpublishedcontent?hopper_id=${hopper_id}`
      );
      setContentlist(resp.data.response);
      if (resp) {
        setLoading(false);
      }
    } catch (error) {
      setLoading(false);
    }
  };


  useEffect(() => {
    PublishContent();

  }, [fav]);

  useEffect(() => {
    LiveTasks();
    GetAdminList();
    GetUserList();
    HopperList();


    if (localStorage.getItem('hopper_is')) {
      ContentList(localStorage.getItem('hopper_is'));
      setShow({
        content: true,
        task: false,
        presshop: false,
      });

      localStorage.removeItem('hopper_is')

    }
  }, []);

  const [openRecentActivity, setOpenRecentActivity] = useState(false);
  const handleCloseRecentActivity = (values) => {
    setOpenRecentActivity(values);
  };

  const [recentActivityValues, setRecentActivityValues] = useState({
    field: "",
    value: "",
  });
  const handleRecentActivityValue = (value) => {
    setRecentActivityValues({ field: value.field, value: value.values });
  };

  return (
    <>
      <Header />
      <div className="chat_wrap">
        {
          localStorage.getItem("backBtnVisibility") && <Link onClick={() => history.back()}
            className='back_link mb-3'><BsArrowLeft className='text-pink' />
            Back
          </Link>
        }
        <Container fluid className="p-0">
          <div className="d-flex cht_cards_wrap">
            {/* <div className="d-flex cht_cards_wrap flex-wrap"> */}
            <Card className="cht_lft_card">
              {/* <div className="cht_lft_tp">
                <img src={chataddic} alt="Chat" className="icn" />
              </div> */}
              {/* <div className="cht_srch">
                <FiSearch className="searchIcon" />
                <input
                  type="text"
                  className="cht_srch_inp"
                  placeholder="Search chats"
                />
              </div> */}
              <Accordion defaultActiveKey={JSON.parse(localStorage.getItem("tabName")) || "presshop"} className="cht_accrdn">
                <Accordion.Item className="cht_accdn_item" eventKey="external">
                  <Accordion.Header>
                    <img src={externalchatic} alt="external chat" /> External
                    Chat
                  </Accordion.Header>
                  <Accordion.Body>
                    <div className="external_tbs">
                      <Tabs
                        defaultActiveKey="content"
                        id="uncontrolled-tab-example"
                        className="mb-3"
                      >
                        <Tab eventKey="content" title="Content">
                          <div className="chat_list">
                            {hopperList &&
                              hopperList.map((curr) => {
                                return (
                                  <div
                                    className="chat_usr_itm d-flex align-items-center"
                                    onClick={() => {
                                      ContentList(curr._id);
                                      setShow({
                                        content: true, task: false, presshop: false,
                                      });
                                    }}
                                  >
                                    <div className="cht_inn w-100 d-flex align-items-center">
                                      <div className="usr_img_wrp position-relative">
                                        <a>
                                          {" "}
                                          <img
                                            src={
                                              process.env
                                                .REACT_APP_AVATAR_IMAGE +
                                              curr.hopper_id?.avatar_id?.avatar
                                            }
                                            alt="user image"
                                          />
                                        </a>
                                      </div>
                                      <div className="cht_dtl d-flex justify-content-between w-100">
                                        <div className="cht_txt d-flex flex-column">
                                          <p className="usr_nme mb-0">
                                            <a> {curr.hopper_id.user_name}</a>
                                          </p>
                                          <p className="msg_dlt mb-0">
                                            <a> Please send more pics for...</a>
                                          </p>
                                        </div>
                                      </div>
                                    </div>
                                  </div>
                                );
                              })}
                          </div>
                        </Tab>

                        <Tab eventKey="task" title="Task">
                          <div className="chat_list">
                            {liveTasks &&
                              liveTasks.map((curr) => {
                                return (
                                  <div
                                    className="chat_usr_itm d-flex align-items-center"
                                    onClick={() => {
                                      setTaskId(curr._id);
                                      setShow({
                                        content: false,
                                        task: true,
                                        presshop: false,
                                      });
                                      // GetHoppers(curr._id, curr.mediahouse_id)
                                    }}
                                  >
                                    <div className="cht_inn w-100 d-flex align-items-center">
                                      <div className="mapInput">
                                        <GoogleMap
                                          googleMapsApiKey={
                                            process.env
                                              .REACT_APP_GOOGLE_MAPS_API_KEY
                                          }
                                          center={{
                                            lat: curr?.address_location
                                              ?.coordinates[0],
                                            lng: curr?.address_location
                                              ?.coordinates[1],
                                          }}
                                          zoom={7}
                                          mapContainerStyle={{
                                            height: "65px",
                                            width: "100px",
                                          }}
                                          options={{
                                            disableDefaultUI: true,
                                            mapTypeControl: false,
                                            streetViewControl: false,
                                          }}
                                        >
                                          <Marker
                                            key={curr._id}
                                            position={{
                                              lat: curr?.address_location
                                                ?.coordinates[0],
                                              lng: curr?.address_location
                                                ?.coordinates[1],
                                            }}
                                          />
                                        </GoogleMap>
                                      </div>
                                      <div className="cht_dtl d-flex justify-content-between w-100">
                                        <div className="cht_txt d-flex flex-column">
                                          <p className="usr_nme mb-0">
                                            <a> {curr.task_description}</a>
                                          </p>
                                          <p className="msg_dlt mb-0">
                                            <a> {curr.location}</a>
                                          </p>
                                        </div>
                                        {/* <div className="cht_time d-flex flex-column align-items-end">
                                        <span className="msg_count">
                                          3
                                        </span>
                                        <span className='msg_time'>03:41 PM</span>
                                      </div> */}
                                      </div>
                                    </div>
                                  </div>
                                );
                              })}
                          </div>
                        </Tab>
                      </Tabs>
                    </div>
                  </Accordion.Body>
                </Accordion.Item>

                <Accordion.Item className="cht_accdn_item" eventKey="internal">
                  <Accordion.Header>
                    <img src={internalchatic} alt="Internal chat" /> Internal
                    Chat
                  </Accordion.Header>
                  <Accordion.Body>
                    <div className="chat_list">
                      {group &&
                        group.map((curr) => {
                          return (
                            <div
                              className="chat_usr_itm d-flex align-items-center"
                              onClick={() => {
                                setShow(
                                  {
                                    content: false,
                                    task: false,
                                    presshop: false,
                                    internal: true,
                                  }
                                );
                                setGroupIds((pre) => ({
                                  ...pre,
                                  contentId: curr?.content_id,
                                  room_id: curr?.room_id,
                                  taskId: ""
                                }));

                              }}
                            >
                              <div className="cht_inn w-100 d-flex align-items-center">
                                <div className="usr_img_wrp position-relative">
                                  <a>
                                    {" "}
                                    <img
                                      src={userImage}
                                      alt="user image"
                                    />{" "}
                                  </a>
                                  <div className="status">
                                    <span className="active"></span>
                                  </div>
                                </div>
                                <div className="cht_dtl d-flex justify-content-between w-100">
                                  <div className="cht_txt d-flex flex-column">
                                    <p className="usr_nme mb-0">
                                      <a>
                                        {" "}
                                        {curr?.first_name +
                                          " " +
                                          curr?.last_name}
                                      </a>
                                    </p>
                                    <p className="msg_dlt mb-0">
                                      <a>{curr?.latest_messege[0]?.type === 'text' ? curr?.latest_messege[0]?.message : curr?.latest_messege[0]?.type === 'image' ? <img scr={lastmsgImage} className="lastmsgImg" /> : ''}</a>
                                    </p>
                                  </div>
                                  <div className="cht_time d-flex flex-column align-items-end">
                                    <span className="msg_count">
                                      {curr?.datofUnreadmessege}
                                    </span>
                                    <span className='msg_time'>{moment(curr?.createdAt).format(`hh:mm A`)} </span>
                                  </div>
                                </div>
                              </div>
                            </div>
                          );
                        })}
                    </div>
                  </Accordion.Body>
                </Accordion.Item>

                <Accordion.Item className="cht_accdn_item" eventKey="presshop">
                  <Accordion.Header>
                    <img src={contactic} alt="presshop chat" /> Presshop Chat
                  </Accordion.Header>
                  <Accordion.Body>
                    <div className="chat_list">
                      {adminList &&
                        adminList &&
                        adminList.filter(obj1 =>
                          admins.some(obj2 => obj1._id == obj2.userId?.id)
                        ).map((curr) => {
                          return (
                            <div
                              className="chat_usr_itm d-flex align-items-center"
                              onClick={() => {
                                // { console.log("curr._id", curr._id) }
                                setSenderId(curr._id);
                                setShow({
                                  content: false,
                                  task: false,
                                  presshop: true,
                                });
                              }}
                            >
                              <div className="cht_inn w-100 d-flex align-items-center">
                                <div className="usr_img_wrp position-relative">
                                  <img src={process.env.REACT_APP_ADMIN_IMAGE + curr?.profile_image} alt="user image" />
                                  <div className="status">
                                    <span className="active"></span>
                                  </div>
                                </div>
                                <div className="cht_dtl d-flex justify-content-between w-100">
                                  <div className="cht_txt d-flex flex-column">
                                    <p className="usr_nme mb-0">
                                      <a> {curr?.name}</a>
                                      <a>
                                        {curr.role === "admin" && (
                                          <img
                                            src={presshopchatic}
                                            alt="Presshop logo"
                                            className="ms-1"
                                          />
                                        )}
                                      </a>
                                    </p>
                                    <p className="msg_dlt mb-0 d-flex align-items-center">
                                      <span className="cont_type">
                                        <a>
                                          {" "}
                                          <img src={cameraic} alt="Video" />
                                        </a>
                                      </span>
                                      <a> Photo</a>
                                    </p>
                                  </div>
                                  {/* <div className="cht_time d-flex flex-column align-items-end">
                                  <span className="msg_count">
                                    1
                                  </span>
                                  <span className='msg_time'>03:41 PM</span>
                                </div>*/}
                                </div>
                              </div>
                            </div>
                          );
                        })}
                      {/* <div className="chat_usr_itm active d-flex align-items-center">
                        <div className="cht_inn w-100 d-flex align-items-center">
                          <div className="usr_img_wrp position-relative">
                            <img src={usrimg11} alt="user image" />
                            <div className="status">
                              <span className="active">
                              </span>
                            </div>
                          </div>
                          <div className="cht_dtl d-flex justify-content-between w-100">
                            <div className="cht_txt d-flex flex-column">
                              <p className="usr_nme mb-0">
                                Seema kumar
                                <img src={presshopchatic} alt="Presshop logo" className='ms-1' />
                              </p>
                              <p className="msg_dlt mb-0 d-flex align-items-center">
                                Thankyou, i will get back to you.
                              </p>
                            </div>
                            <div className="cht_time d-flex flex-column align-items-end">
                              <span className='msg_time'>03:41 PM</span>
                            </div>
                          </div>
                        </div>
                      </div> */}
                    </div>
                  </Accordion.Body>
                </Accordion.Item>

              </Accordion>
            </Card>

            <div className="d-flex flex-column w_70">
              {show.task && (
                <div className="tsk_wdth cht_tasks">
                  <div className="mb-0">
                    <Chatbroadcasttask id={taskId} />
                  </div>
                </div>
              )}
              <div className="cht_tsk_cht d-flex flex-column">
                {show.presshop && <ChatCard senderId={senderId} />}

                {show.internal &&
                  <GroupContentDtlChat params={groupIds} />
                }

                {/* <Chatinternal senderId={senderId} /> */}

                {show.task && <ChatCardSocket id={taskId} />}

                {show.content && (
                  <ContentDtlChat contents={contentList} users={userList} />
                )}

                {/* <ChatParticipants id={taskId} senderId={senderId} /> */}
              </div>
            </div>
          </div>
          {/* Start feed  */}
          <Row>
            <Col md={12}>
              <div className="feedsMain_wrap content_tp_m">
                {/* <div className="feedsContainer">
                  <div className="feedContent_header">
                    <h1>Latest content</h1>
                    <Link to="/Uploaded-Content/all">View all<BsArrowRight className='text-pink' /></Link>
                  </div>
                  <Row className=''>
                    {PublishedData && PublishedData.map((curr, index) => {
                      if (index > (PublishedData.length - 5)) {
                        return (
                          <Col md={3}>
                            <ContentFeedCard feedImg={curr.content[0].media_type === "video" ? process.env.REACT_APP_CONTENT_MEDIA + curr.content[0].thumbnail :curr.content[0].media_type === "audio"
                                ? audioic :  process.env.REACT_APP_CONTENT_MEDIA + curr.content[0].media} feedType={curr.content[0].media_type === "video" ? contentVideo : contentCamera} feedTag={"Most Viewed"} userAvatar={imgs} authorName={"pseudonymous"}
                              lnkto={`/Feeddetail/content/${curr._id}`}
                              fvticns={curr?.favourite_status === "true" ? favouritedic : favic}
                              content_id={curr._id}
                              bool_fav={curr.favourite_status === "true" ? "false" : "true"}
                              favourite={handleFavourite}
                              type_img={shared} type_tag={curr.type}
                              feedHead={curr.description}
                              feedTime={moment(curr.timestamp).format("hh:mm A , DD MMMM YY")} feedLocation={curr.location} contentPrice={`£${curr.ask_price}`}
                            />
                          </Col>
                        )
                      }
                    })}
                  </Row>
                </div> */}

                {/* <div className="feedsContainer">
                  <div className="feedContent_header">
                    <h1>Related content</h1>
                    <div className="d-flex align-items-center">
                      <div className="fltrs_prnt me-3 ht_sort">
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
                          />
                        )}
                      </div>
                      <Link to="/related-content" className="next_link">
                        View all
                        <BsArrowRight className="text-pink" />
                      </Link>
                    </div>
                  </div>
                  <Row className="">
                    <Col md={3}>
                      <ContentFeedCard
                        lnkto={""}
                        feedImg={audioic}
                        feedType={contentVideo}
                        feedTag={"Most Viewed"}
                        userAvatar={imgs}
                        authorName={"Pseudonymous"}
                        type_img={exclusive}
                        type_tag={"Exclusive"}
                        feedHead={"lorem ipsum"}
                        fvticns={favic}
                        feedTypeImg={cameraic}
                        postcount={2}
                        feedTypeImg2={interviewic}
                        postcount2={3}
                        feedTime={"12:36 PM, 10 Oct 2022"}
                        feedLocation={"Grenfell Tower, London"}
                        contentPrice={"500"}
                      />
                    </Col>

                    <Col md={3}>
                      <ContentFeedCard
                        lnkto={""}
                        feedImg={audioic}
                        feedType={contentVideo}
                        feedTag={"Most Viewed"}
                        userAvatar={imgs}
                        authorName={"Pseudonymous"}
                        type_img={exclusive}
                        type_tag={"Exclusive"}
                        feedHead={"lorem ipsum"}
                        fvticns={favic}
                        feedTypeImg={cameraic}
                        postcount={2}
                        feedTypeImg2={interviewic}
                        postcount2={3}
                        feedTime={"12:36 PM, 10 Oct 2022"}
                        feedLocation={"Grenfell Tower, London"}
                        contentPrice={"£500"}
                      />
                    </Col>

                    <Col md={3}>
                      <ContentFeedCard
                        lnkto={""}
                        feedImg={audioic}
                        feedType={contentVideo}
                        feedTag={"Most Viewed"}
                        userAvatar={imgs}
                        authorName={"Pseudonymous"}
                        type_img={exclusive}
                        type_tag={"Exclusive"}
                        feedHead={"lorem ipsum"}
                        fvticns={favic}
                        feedTypeImg={cameraic}
                        postcount={2}
                        feedTypeImg2={videoic}
                        postcount2={3}
                        feedTime={"12:36 PM, 10 Oct 2022"}
                        feedLocation={"Grenfell Tower, London"}
                        contentPrice={"£500"}
                      />
                    </Col>

                    <Col md={3}>
                      <ContentFeedCard
                        lnkto={""}
                        feedImg={audioic}
                        feedType={contentVideo}
                        feedTag={"Most Viewed"}
                        userAvatar={imgs}
                        authorName={"Pseudonymous"}
                        type_img={exclusive}
                        type_tag={"Exclusive"}
                        feedHead={"lorem ipsum"}
                        fvticns={favic}
                        feedTypeImg={cameraic}
                        postcount={2}
                        feedTypeImg2={interviewic}
                        postcount2={3}
                        feedTime={"12:36 PM, 10 Oct 2022"}
                        feedLocation={"Grenfell Tower, London"}
                        contentPrice={"£500"}
                      />
                    </Col>
                  </Row>
                </div> */}

                {/* <div className="feedsContainer mb-0">
                  <div className="feedContent_header">
                    <h1>More content from Pseudynoumos</h1>
                    <div className="d-flex align-items-center">
                      <div className="fltrs_prnt me-3 ht_sort">
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
                          />
                        )}
                      </div>
                      <Link to="/more-content" className="next_link">
                        View all
                        <BsArrowRight className="text-pink" />
                      </Link>
                    </div>
                  </div>
                  <Row className="">
                    <Col md={3}>
                      <ContentFeedCard
                        lnkto={""}
                        feedImg={audioic}
                        feedType={contentVideo}
                        feedTag={"Most Viewed"}
                        userAvatar={imgs}
                        authorName={"Pseudonymous"}
                        type_img={exclusive}
                        type_tag={"Exclusive"}
                        feedHead={"Heading"}
                        fvticns={favic}
                        feedTypeImg={cameraic}
                        postcount={2}
                        feedTypeImg2={videoic}
                        postcount2={3}
                        feedTime={"12:36 PM, 10 Oct 2022"}
                        feedLocation={"Grenfell Tower, London"}
                        contentPrice={"£328"}
                      />
                    </Col>

                    <Col md={3}>
                      <ContentFeedCard
                        lnkto={""}
                        feedImg={audioic}
                        feedType={contentVideo}
                        feedTag={"Most Viewed"}
                        userAvatar={imgs}
                        authorName={"Pseudonymous"}
                        type_img={exclusive}
                        type_tag={"Exclusive"}
                        feedHead={"Heading"}
                        fvticns={favic}
                        feedTypeImg={cameraic}
                        postcount={2}
                        feedTypeImg2={interviewic}
                        postcount2={3}
                        feedTime={"12:36 PM, 10 Oct 2022"}
                        feedLocation={"Grenfell Tower, London"}
                        contentPrice={"£328"}
                      />
                    </Col>

                    <Col md={3}>
                      <ContentFeedCard
                        lnkto={""}
                        feedImg={audioic}
                        feedType={contentVideo}
                        feedTag={"Most Viewed"}
                        userAvatar={imgs}
                        authorName={"Pseudonymous"}
                        type_img={exclusive}
                        type_tag={"Exclusive"}
                        feedHead={"Heading"}
                        fvticns={favic}
                        feedTypeImg={cameraic}
                        postcount={2}
                        feedTypeImg2={videoic}
                        postcount2={3}
                        feedTime={"12:36 PM, 10 Oct 2022"}
                        feedLocation={"Grenfell Tower, London"}
                        contentPrice={"£328"}
                      />
                    </Col>

                    <Col md={3}>
                      <ContentFeedCard
                        lnkto={""}
                        feedImg={audioic}
                        feedType={contentVideo}
                        feedTag={"Most Viewed"}
                        userAvatar={imgs}
                        authorName={"Pseudonymous"}
                        type_img={exclusive}
                        type_tag={"Exclusive"}
                        feedHead={"Heading"}
                        fvticns={favic}
                        feedTypeImg={cameraic}
                        postcount={2}
                        feedTypeImg2={interviewic}
                        postcount2={3}
                        feedTime={"12:36 PM, 10 Oct 2022"}
                        feedLocation={"Grenfell Tower, London"}
                        contentPrice={"£328"}
                      />
                    </Col>
                  </Row>
                </div> */}
              </div>
            </Col>
          </Row>

          <div className="mt-0">
            <TopSearchesTipsCard />
          </div>

        </Container>
      </div >
      <DbFooter />
    </>
  );
};

export default memo(Chat);
