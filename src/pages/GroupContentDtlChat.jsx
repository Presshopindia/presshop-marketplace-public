import React, { useCallback, useEffect, useMemo, useState } from "react";
import { Link, useLocation, useParams } from "react-router-dom";
import { usePosition } from "use-position";
import { Form, Row, Col } from "react-bootstrap";
import {
  Avatar,
  Button,
  Typography,
  Card,
  CardContent,
  FormControlLabel,
  Checkbox,
} from "@mui/material";
import { BiPlay, BiTimeFive, BiSupport } from "react-icons/bi";
import {
  MdMyLocation,
  MdDateRange,
  MdOutlineWatchLater,
  MdAdd,
} from "react-icons/md";
import { BsPeople, BsArrowRight } from "react-icons/bs";
import exclusive from "../assets/images/exclusive.png";
import { Get, Post } from "../services/user.services";
import moment from "moment/moment";
import shared from "../assets/images/share.png";
import { SlLocationPin } from "react-icons/sl";
import { AiOutlineStar } from "react-icons/ai";
import { capitalizeFirstLetter } from "../component/Utils";
import AudioPlayer from "react-h5-audio-player";
import "react-h5-audio-player/lib/styles.css";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import Chatinternal from "../component/Chatinternal";
import NoProfile from "../assets/images/blank-profile-picture.png";
import socketInternal from "../InternalSocket";

const GroupContentDtlChat = (props) => {
  const [data, setData] = useState();
  const [loading, setLoading] = useState(false);
  const [userProfile, setUserProfile] = useState();
  const [detailContent, setDetailContent] = useState();
  const [userList, setUserList] = useState([]);
  const [selectedIds, setSelectedIds] = useState([]);
  const [message, setMessage] = useState([]);

  const getUserProfile = async () => {
    try {
      const res = await Get("mediaHouse/getProfile");
      if (res) {
        // console.log(res, '<<< Why the profile is here');
        setUserProfile(res?.data?.profile?._id);
      }
    } catch (error) {}
  };

  const GetUserList = async () => {
    const resp = await Get(
      `mediaHouse/getdesignatedUSer?allow_to_chat_externally=true`
    );
    if (resp) {
      setUserList(
        resp.data.response.sort((a, b) =>
          a.first_name.toLowerCase().localeCompare(b.first_name.toLowerCase())
        )
      );
    }
  };

  const getDetailContent = async () => {
    try {
      const resp = await Get(
        `mediaHouse/openContentMH?content_id=${props?.params?.contentId}`
      );
      if (resp) {
        setDetailContent(resp?.data?.response[0]);
      }
    } catch (error) {}
  };

  const ChatList = async () => {
    try {
      const resp = await Get(
        `mediaHouse/openChatsMH?room_id=${props?.params?.room_id}`
      );
      if (resp) {
        setMessage(resp?.data?.response?.data);
      }
    } catch (error) {
      // Handle errors
    }
  };

  console.log('message ----->', message)

  useEffect(() => {
    getDetailContent();
    getUserProfile();
    GetUserList();
    ChatList();
  }, [props?.params?.contentId]);


//   Participants-
  const handleCheckboxChange = (itemId) => {
    if (selectedIds.includes(itemId)) {
      setSelectedIds(selectedIds.filter((id) => id !== itemId));
    } else {
      setSelectedIds([...selectedIds, itemId]);
    }
  };

  const AddParticipents = async () => {
    try {
      if(!JSON.parse(localStorage.getItem("roomId")) && !JSON.parse(localStorage.getItem("contentId"))){
        return
      }
      let obj = {
        type: 'add',
        users: selectedIds,
        content_id: JSON.parse(localStorage.getItem("contentId")),
        room_id: JSON.parse(localStorage.getItem("roomId"))
      };
      const resp = await Post('mediaHouse/internalGroupChatMH', obj);
      window.location.reload()
      if (resp) {
        setSelectedIds([]);
        GetUserList()
        setChatContentIds((pre) => ({ ...pre, room_id: JSON.parse(localStorage.getItem("roomId")) }));
        ChatList();
        // toast.success('Group chat initiated');
        socketInternal.emit('room join', { room_id: JSON.parse(localStorage.getItem("roomId")) });
      }
    } catch (error) {
      // console.log(error, `<<<<<socket error`);
      // Handle errors
    }
  };

  return (
    <>
      {loading && <Loader />}
      <div className="trackingList_wrap cht_tsk_trck feed-detail mb-0 internalChatCont">
        {/* start */}

        <div className="feedsMain_wrap">
          <div className="feedsContainer mb-0">
            <div className="cht_tsk_rw d-flex">
              <div className="ps-0 pe-01 chat_loc_wp">
                <Card className="feeddetail-card left-card h-100">
                  <CardContent className="card-content">
                    {detailContent?.content?.length === 1 &&
                      data?.content[0]?.media_type === "audio" && (
                        <div className="content_audio_img cont_swipe_aud">
                          {/* <img src={audioic} alt="" height="100px" width="auto" /> */}
                          <AudioPlayer
                            // autoPlay
                            src={
                              process.env.REACT_APP_CONTENT_MEDIA +
                              detailContent?.content[0]?.media
                            }
                            // onPlay={e => console.log("onPlay")}
                            // other props here
                          />
                        </div>
                      )}
                    {detailContent?.content?.length === 1 &&
                      detailContent?.content[0]?.media_type === "video" && (
                        <img
                          src={
                            process.env.REACT_APP_CONTENT_MEDIA +
                            detailContent?.content[0]?.thumbnail
                          }
                          alt={null}
                        />
                      )}
                    {detailContent?.content?.length === 1 &&
                      detailContent?.content[0]?.media_type === "image" && (
                        <img
                          src={
                            detailContent.paid_status === "paid"
                              ? process.env.REACT_APP_CONTENT_MEDIA +
                                detailContent?.content[0]?.media
                              : detailContent?.content[0]?.watermark
                          }
                          alt={null}
                        />
                      )}
                    {detailContent?.content?.length > 1 && (
                      <Swiper
                        spaceBetween={50}
                        slidesPerView={1}
                        pagination={{ clickable: true }}
                        // onSwiper={(swiper) => console.log(swiper)}
                      >
                        {detailContent &&
                          detailContent.content.map((item) => {
                            return (
                              <SwiperSlide>
                                {item.media_type === "audio" ? (
                                  <div className="content_audio_img cont_swipe_aud">
                                    <AudioPlayer
                                      src={
                                        process.env.REACT_APP_CONTENT_MEDIA +
                                        item.media
                                      }
                                    />
                                  </div>
                                ) : item.media_type === "video" ? (
                                  <img
                                    src={
                                      process.env.REACT_APP_CONTENT_MEDIA +
                                      item.thumbnail
                                    }
                                    alt={null}
                                  />
                                ) : item.media_type === "image" ? (
                                  <img
                                    src={
                                      detailContent.paid_status === "paid"
                                        ? process.env.REACT_APP_CONTENT_MEDIA +
                                          item.media
                                        : item.watermark
                                    }
                                    alt={null}
                                  />
                                ) : item.media_type === "pdf" ?
                                <embed src={`${process.env.REACT_APP_CONTENT_MEDIA + item.media}`} type="application/pdf" width="100%" height="500" />
                                : null
                                }
                              </SwiperSlide>
                            );
                          })}
                      </Swiper>
                    )}

                    <div className="feedTitle_content">
                      <h1 className="feedTitle">{detailContent?.heading}</h1>
                      <p className="feed_descrptn">
                        {detailContent?.description}
                      </p>
                    </div>
                  </CardContent>
                </Card>
              </div>
              <div className="cht_tsk_wp">
                <Card className="feeddetail-card h-100 content-info">
                  <CardContent className="card-content">
                    <div className="sub-content">
                      <div className="heading w-100 d-flex align-items-center justify-content-between">
                        <Typography> Content info</Typography>
                        {data?.favourite_status && (
                          <div className="favourite">
                            <AiOutlineStar />
                            <span>Favourite</span>
                          </div>
                        )}
                      </div>
                    </div>
                    <div className="content">
                      <div className="sub-content">
                        <div className="item d-flex justify-content-between align-items-center">
                          <span className="fnt-bold">Author</span>
                          <div className="item-in-right">
                            <img
                              src={
                                process.env.REACT_APP_AVATAR_IMAGE +
                                detailContent?.hopper_details[0]
                                  ?.avatar_details[0]?.avatar
                              }
                              alt=""
                            />
                            <span>
                              {detailContent?.hopper_details[0]?.user_name}
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
                              <div>{detailContent?.location}</div>
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
                              {moment(detailContent?.published_time_date).format(
                                "h:mm A, DD MMMM YY"
                              )}
                            </span>
                          </div>
                        </div>
                      </div>
                      <div className="sub-content tags_wrp">
                        <div className="item d-flex justify-content-between align-items-center">
                          <span className="fnt-bold">Hashtags</span>
                          <div>
                            <div className="item-in-right hashtag-wrap">
                              {detailContent &&
                                detailContent?.tag_ids?.map((tag) => {
                                  return (
                                    <span className="mr">#{tag.name}</span>
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
                                detailContent?.category_id[0]?.icon
                              }
                              className="exclusive-img"
                              alt=""
                            />
                            <span>
                              {capitalizeFirstLetter(
                                detailContent?.category_id[0]?.name
                              )}
                            </span>
                          </div>
                        </div>
                      </div>

                      <div className="sub-content">
                        <div className="item d-flex justify-content-between align-items-center">
                          <span className="fnt-bold">Licence Type</span>
                          <div className="">
                            <img
                              src={
                                detailContent?.type === "exclusive"
                                  ? exclusive
                                  : shared
                              }
                              className="exclusive-img"
                              alt=""
                            />
                            <span>
                              {capitalizeFirstLetter(detailContent?.type)}
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
            {/* experiment Start */}
            <div className="d-flex gap_20 mt_20 justify-content-start">
              <Chatinternal
                room_id={props?.params?.room_id}
                user_id={userProfile}
              />
              <Card className="chatmain participants">
                <CardContent className="chatting">
                  <div className="chatting_header d-flex align-items-start justify-content-start mb-3">
                    <p className="mb-0 pb-2">Participants</p>
                  </div>
                  <div className="chat_content_list chatParticipantList">
                    <div className="scrollHtPnts chatCustomParticipant">
                      {userList &&
                        userList.map((curr) => {
                          return (
                            <div className="tab_in_card_items">
                              <div className="checkWrap">
                              <FormControlLabel
                                className={`me-0 ${
                                  !selectedIds.includes(curr._id) &&
                                  "afterCheck"
                                }`}
                                checked={
                                  selectedIds.includes(curr._id) ||
                                  message?.some(
                                    (item) =>
                                      curr?.first_name ===
                                        item?.addedMsg?.split(" ")?.[0] &&
                                      curr?.last_name ===
                                        item?.addedMsg?.split(" ")?.[1]
                                  )
                                }
                                onChange={() => handleCheckboxChange(curr._id)}
                                control={<Checkbox defaultChecked />}
                                disabled={message?.some(
                                  (item) =>
                                    curr?.first_name ===
                                      item?.addedMsg?.split(" ")?.[0] &&
                                    curr?.last_name ===
                                      item?.addedMsg?.split(" ")?.[1]
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
                                <img
                                  src={
                                    curr?.profile_image?.includes(".mp4")
                                      ? NoProfile
                                      : !curr?.profile_image?.includes("https")
                                      ? process.env.REACT_APP_EMPLOYEE_IMAGE +
                                        curr?.profile_image
                                      : curr?.profile_image
                                  }
                                  alt="user"
                                />
                                <span>
                                  {" "}
                                  {curr.first_name + " " + curr.last_name}
                                </span>
                              </div>
                            </div>
                          );
                        })}
                    </div>
                  </div>
                  <button
                    className="addPrtBtn btn w-100"
                    onClick={AddParticipents}
                  >
                    Add
                  </button>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default GroupContentDtlChat;
