import React, { memo, useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { Row, Col, Container, Form } from "react-bootstrap";
import { Card, Typography, Button, Tooltip } from "@mui/material";
import {
  BsArrow90DegUp,
  BsArrowBarUp,
  BsArrowDown,
  BsArrowLeft,
  BsArrowRight,
  BsArrowUp,
  BsEye,
} from "react-icons/bs";
import watch from "../assets/images/watch.svg";
import calendar from "../assets/images/calendar.svg";
import img1 from "../assets/images/img1.png";
import img2 from "../assets/images/img2.png";
import img3 from "../assets/images/img4.png";
import imgl from "../assets/images/img1.jpeg";
import imgl1 from "../assets/images/img3.jpg";
import camera from "../assets/images/camera.svg";
import celebrity from "../assets/images/celebrity.svg";
import idimg from "../assets/images/celebrity.svg";
import Header from "./Header";
import locationimg from "../assets/images/locationimg.svg";
import interviewic from "../assets/images/interview.svg";
import videoic from "../assets/images/video.svg";
import { Get } from "../services/user.services";
import moment from "moment/moment";
import { GoogleMap, LoadScript, Marker } from "@react-google-maps/api";
import contimg1 from "../assets/images/Contentdetail/content3.png";
import contimg2 from "../assets/images/Contentdetail/contentbg.png";
import contimg3 from "../assets/images/Contentdetail/contentimg2.png";
import watchic from "../assets/images/watch.svg";
import cameraic from "../assets/images/camera.svg";
import exclusiveic from "../assets/images/exclusive.svg";
import crimeic from "../assets/images/sortIcons/crime.svg";
import hprimg1 from "../assets/images/avatars/usrimg1.svg";
import hprimg2 from "../assets/images/avatars/usrimg2.svg";
import hprimg3 from "../assets/images/avatars/usrimg3.svg";
import share from "../assets/images/share.png";
import Loader from "./Loader";

const ReportsTablesTask = () => {
  const params = useParams();
  const [loading, setLoading] = useState(false);

  const [detail, setDetails] = useState();
  // reports card
  const getDetails = async () => {
    setLoading(true);
    try {
      const res = await Get(`mediahouse/reportTaskCount`);
      // console.log(res, `<----this is a response of report task coutn`)
      if (res) {
        setDetails(res?.data);
        setLoading(false);
      }
    } catch (er) {
      setLoading(false);
    }
  };

  useEffect(() => {
    getDetails();
  }, []);

  // task broadcast today
  const [broadcastTaskToday, setBroadCastTaskToday] = useState([]);

  const Task_broadCast_today = async () => {
    setLoading(true);
    try {
      const res = await Get(`mediahouse/taskPurchasedOnlinesummaryforReport`);
      if (res) {

        // console.log(res, `,<-----why this not show to me`);
        setBroadCastTaskToday(res?.data?.response);
        setLoading(false);
      }
    } catch (error) {
      // console.log(error);
      setLoading(false);
    }
  };

  //  total fund invested
  const [totalDetail, setTotalDetail] = useState([]);
  const totalData = async (param) => {
    const paramName = param;
    setLoading(true);
    try {
      const resp = await Get(
        `mediahouse/taskPurchasedOnlinesummary?${paramName}=${param}`
      );
      if (resp) {
        // console.log(resp, `<------what is here`)
        setTotalDetail(resp?.data?.response);
        setLoading(false);
      }
    } catch (error) {
      setLoading(false);
    }
  };

  //location of task
  const [location, setLocation] = useState([]);
  const get_location = async (param) => {
    const paramName = param;
    setLoading(true);
    try {
      const res = await Get(`mediaHouse/reportlocation?${paramName}=${param}`);
      if (res) {
        setLocation(res?.data?.data?.data);
        setLoading(false);
      }
    } catch (errr) {
      setLoading(false);
    }
  };
  useEffect(() => {
    Task_broadCast_today();
    totalData();
    get_location();
  }, []);

  const months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  const handleChangeSort = async (e) => {
    try {
      const type = e.target.name;
      const param = e.target.value;
      if (type === "fund_invested_summary") {
        totalData(param);
      } else if (type === "content_sourced_from_summary") {
        totalData(param);
      } else if (type === "task_summary") {
        totalData(param);
      } else if (type === "task_location") {
        get_location();
      } else if (type === "content_type") {
        totalData(param);
      } else if (type === "task_categories") {
        get_location(param);
      }
    } catch (error) { }
  };

  function myFunction(start, end) {
    const currentDate = new Date(start);
    const examDate = new Date(end);

    if (isNaN(currentDate) || isNaN(examDate)) {
      return "Invalid date input";
    }

    const timeDifference = examDate - currentDate;
    const diffInHours = timeDifference / (1000 * 60 * 60);

    return Math.abs(diffInHours).toFixed(2); // Always return a positive value
  }
  return (
    <>
      {loading && <Loader />}
      <Header />
      <div className="page-wrap feed-detail tasktables_wrap">
        <Container fluid className="p-0">
          <Row>
            <Col md={12}>
              <div className="">
                <Link className="back_link mb-3" onClick={() => window.history.back()}>
                  <BsArrowLeft className="text-pink" /> Back{" "}
                </Link>
              </div>

              <div className="tbl_wrap_cmn">
                {params?.type === "task_broadcasted_today" ? (
                  <Card className="tbl_crd">
                    <div className="">
                      <div
                        className="d-flex justify-content-between align-items-center tbl_hdr"
                        px="20px"
                        mb="10px"
                      >
                        <Typography className="tbl_hdng">
                          Broadcasted tasks
                        </Typography>
                        <div className="tbl_rt">
                          <span className="tbl_rt_txt">Daily</span>
                        </div>
                      </div>
                      <div className="fix_ht_table">
                        <table
                          width="100%"
                          mx="20px"
                          variant="simple"
                          className="common_table"
                        >
                          <thead>
                            <tr>
                              <th className="cntent_srcd_th">
                                Content sourced from task
                              </th>
                              <th className="time_th">Broadcasted time</th>
                              <th className="time_th">Deadline</th>
                              <th className="time_th">Purchase time</th>
                              <th>Location</th>
                              <th className="tsk_dlts">Task details</th>
                              <th className="tbl_icn_th">Type</th>
                              <th className="tbl_icn_th licnc">License</th>
                              <th className="tbl_icn_th catgr">Category</th>
                              <th>Uploaded by</th>
                              <th>Funds invested</th>
                            </tr>
                          </thead>
                          <tbody>
                            {broadcastTaskToday.map((curr) => {
                              // console.log(curr);
                              const Audio = curr?.data?.filter(
                                (item) => item?.type === "audio"
                              );
                              const Video = curr?.data?.filter(
                                (item) => item?.type === "video"
                              );
                              const Image = curr?.data?.filter(
                                (item) => item?.type === "image"
                              );

                              return (

                                <tr>

                                  <td className="content_img_td">

                                    <div className="tbl_cont_wrp">
                                      {curr?.data[0]?.type === "image" ? (
                                        <img
                                          src={
                                            process.env
                                              .REACT_APP_UPLOADED_CONTENT +
                                            curr?.data[0]?.imageAndVideo
                                          }
                                          className="content_img"
                                        />
                                      ) : curr?.data[0]?.type === "video" ? (
                                        <img
                                          src={
                                            process.env
                                              .REACT_APP_UPLOADED_CONTENT +
                                            curr?.data[0]?.thumbnail
                                          }
                                          className="content_img"
                                        />
                                      ) : curr?.data[0]?.type === "audio" ? (
                                        <img
                                          src={interviewic}
                                          className="content_img"
                                        />
                                      ) : null}
                                      <span className="cont_count">
                                        +{curr?.data?.length - 1}
                                      </span>
                                    </div>
                                  </td>

                                  <td className="timedate_wrap">
                                    <p className="timedate">
                                      <img src={watchic} className="icn_time" />
                                      {moment(
                                        curr?.task_details?.createdAt
                                      ).format(`hh:mm A`)}
                                    </p>
                                    <p className="timedate">
                                      <img
                                        src={calendar}
                                        className="icn_time"
                                      />
                                      {moment(
                                        curr?.task_details?.createdAt
                                      ).format(`DD MMM YYYY`)}
                                    </p>
                                  </td>
                                  <td className="timedate_wrap">
                                    <p className="timedate">
                                      <img src={watchic} className="icn_time" />
                                      {moment(
                                        curr?.task_details?.deadline_date
                                      ).format(`hh:mm A`)}
                                    </p>
                                    <p className="timedate">
                                      <img
                                        src={calendar}
                                        className="icn_time"
                                      />
                                      {moment(
                                        curr?.task_details?.deadline_date
                                      ).format(`DD MMM YYYY`)}
                                    </p>
                                  </td>
                                  <td className="timedate_wrap">
                                    <p className="timedate">
                                      <img src={watchic} className="icn_time" />
                                      05:45 PM
                                    </p>
                                    <p className="timedate">
                                      <img
                                        src={calendar}
                                        className="icn_time"
                                      />
                                      10 Feb, 2023
                                    </p>
                                  </td>
                                  <td>{curr?.task_details?.location}</td>
                                  <td className="description_td">
                                    <p className="desc_ht">
                                      {curr?.task_details?.task_description}
                                    </p>
                                  </td>
                                  <td className="text-center">
                                    {Audio && Audio.length > 0 && (
                                      <Tooltip title="Interview">
                                        <img
                                          src={interviewic}
                                          alt="Photo"
                                          className="icn"
                                        />
                                      </Tooltip>
                                    )}{" "}
                                    {Video && Video.length > 0 && (
                                      <Tooltip title="Video">
                                        <img
                                          src={videoic}
                                          alt="Photo"
                                          className="icn"
                                        />
                                      </Tooltip>
                                    )}
                                    {Image && Image.length > 0 && (
                                      <Tooltip title="Photo">
                                        <img
                                          src={cameraic}
                                          alt="Photo"
                                          className="icn"
                                        />
                                      </Tooltip>
                                    )}
                                  </td>
                                  <td className="text-center">
                                    <Tooltip title={curr?.task_details?.type}>
                                      <img
                                        src={
                                          curr?.task_details?.type === "shared"
                                            ? share
                                            : curr?.task_details?.type ===
                                              "exclusive"
                                              ? exclusiveic
                                              : null
                                        }
                                        alt="Exclusive"
                                        className="icn"
                                      />
                                    </Tooltip>
                                  </td>
                                  <td className="text-center">
                                    <Tooltip
                                      title={
                                        curr?.task_details?.category_details
                                          ?.name
                                      }
                                    >
                                      <img
                                        src={
                                          curr?.task_details?.category_details
                                            ?.icon
                                        }
                                        alt="Exclusive"
                                        className="icn"
                                      />
                                    </Tooltip>
                                  </td>
                                  <td>
                                    <div className="hpr_dt">
                                      <img
                                        src={
                                          process.env.REACT_APP_AVATAR_IMAGE +
                                          curr?.hopper_id?.avatar_details[0]
                                            ?.avatar
                                        }
                                        alt="Hopper"
                                        className="big_img"
                                      />
                                      <p className="hpr_nme">
                                        {/* {`${curr?.hopper_id?.first_name} ${curr?.hopper_id?.last_name}`}{" "}
                                        <br /> */}
                                        <span className="txt_light">
                                          {curr?.hopper_id?.user_name}
                                        </span>
                                      </p>
                                    </div>
                                  </td>
                                  <td>£ {curr?.total_price ?? 0}</td>
                                </tr>
                              );
                            })}
                          </tbody>
                        </table>
                      </div>
                    </div>
                  </Card>
                ) : params?.type === "content_sourced_task" ? (
                  <Card className="tbl_crd">
                    <div className="">
                      <div
                        className="d-flex justify-content-between align-items-center tbl_hdr"
                        px="20px"
                        mb="10px"
                      >
                        <Typography className="tbl_hdng">
                          Content sourced from tasks today
                        </Typography>
                        <div className="tbl_rt">
                          <span className="tbl_rt_txt">Daily</span>
                        </div>
                      </div>
                      <div className="fix_ht_table">
                        <table
                          width="100%"
                          mx="20px"
                          variant="simple"
                          className="common_table"
                        >
                          <thead>
                            <tr>
                              <th className="cntent_srcd_th">
                                Content sourced from tasks
                              </th>
                              <th className="time_th">Time & date</th>
                              <th className="tsk_dlts">Task details</th>
                              <th className="tbl_icn_th">Type</th>
                              <th className="tbl_icn_th licnc">License</th>
                              <th className="tbl_icn_th catgr">Category</th>
                              <th className="tsk_dlts">Location</th>
                              <th>Uploaded by</th>
                              <th>Funds invested</th>
                            </tr>
                          </thead>
                          <tbody>
                            {broadcastTaskToday.map((curr) => {
                              const Audio = curr?.data?.filter(
                                (item) => item?.type === "audio"
                              );
                              const Video = curr?.data?.filter(
                                (item) => item?.type === "video"
                              );
                              const Image = curr?.data?.filter(
                                (item) => item?.type === "image"
                              );
                              return (
                                <tr>
                                  <Link to={`/sourced-content-detail/${curr?.task_details?._id}`}>
                                    <td className="content_img_td">
                                      <div className="tbl_cont_wrp">
                                        {curr?.data[0]?.type === "image" ? (
                                          <img
                                            src={
                                              process.env
                                                .REACT_APP_UPLOADED_CONTENT +
                                              curr?.data[0]?.imageAndVideo
                                            }
                                            className="content_img"
                                          />
                                        ) : curr?.data[0]?.type === "video" ? (
                                          <img
                                            src={
                                              process.env
                                                .REACT_APP_UPLOADED_CONTENT +
                                              curr?.data[0]?.thumbnail
                                            }
                                            className="content_img"
                                          />
                                        ) : curr?.data[0]?.type === "audio" ? (
                                          <img
                                            src={interviewic}
                                            className="content_img"
                                          />
                                        ) : null}
                                        <span className="cont_count">
                                          +{curr?.data?.length - 1}
                                        </span>
                                      </div>
                                    </td>

                                  </Link>


                                  <td className="timedate_wrap">
                                    <p className="timedate">
                                      <img src={watchic} className="icn_time" />
                                      {moment(
                                        curr?.task_details?.createdAt
                                      ).format(`hh:mm A`)}
                                    </p>
                                    <p className="timedate">
                                      <img
                                        src={calendar}
                                        className="icn_time"
                                      />
                                      {moment(
                                        curr?.task_details?.createdAt
                                      ).format(`DD MMM YYYY`)}
                                    </p>
                                  </td>

                                  <td className="description_td">
                                    <p className="desc_ht">
                                      {curr?.task_details?.task_description}
                                    </p>
                                  </td>
                                  <td className="text-center">
                                    {Audio && Audio.length > 0 && (
                                      <Tooltip title="Interview">
                                        <img
                                          src={interviewic}
                                          alt="Photo"
                                          className="icn"
                                        />
                                      </Tooltip>
                                    )}{" "}
                                    {Video && Video.length > 0 && (
                                      <Tooltip title="Video">
                                        <img
                                          src={videoic}
                                          alt="Photo"
                                          className="icn"
                                        />
                                      </Tooltip>
                                    )}
                                    {Image && Image.length > 0 && (
                                      <Tooltip title="Photo">
                                        <img
                                          src={cameraic}
                                          alt="Photo"
                                          className="icn"
                                        />
                                      </Tooltip>
                                    )}
                                  </td>
                                  <td className="text-center">
                                    <Tooltip title={curr?.task_details?.type}>
                                      <img
                                        src={
                                          curr?.task_details?.type === "shared"
                                            ? share
                                            : curr?.task_details?.type ===
                                              "exclusive"
                                              ? exclusiveic
                                              : null
                                        }
                                        alt="Exclusive"
                                        className="icn"
                                      />
                                    </Tooltip>
                                  </td>
                                  <td className="text-center">
                                    <Tooltip
                                      title={
                                        curr?.task_details?.category_details
                                          ?.name
                                      }
                                    >
                                      <img
                                        src={
                                          curr?.task_details?.category_details
                                            ?.icon
                                        }
                                        alt="Exclusive"
                                        className="icn"
                                      />
                                    </Tooltip>
                                  </td>
                                  <td>{curr?.task_details?.location}</td>
                                  <td>
                                    <div className="hpr_dt">
                                      <img
                                        src={
                                          process.env.REACT_APP_AVATAR_IMAGE +
                                          curr?.hopper_id?.avatar_details[0]?.avatar
                                        }
                                        alt="Hopper"
                                        className="big_img"
                                      />
                                      <p className="hpr_nme">
                                        {/* {`${curr?.hopper_id?.first_name} ${curr?.hopper_id?.last_name}`}{" "}
                                        <br /> */}
                                        <span className="txt_light">
                                          {curr?.hopper_id?.user_name}
                                        </span>
                                      </p>
                                    </div>
                                  </td>
                                  <td>£ {curr?.total_price ?? 0}</td>
                                </tr>
                              );
                            })}
                          </tbody>
                        </table>
                      </div>
                    </div>
                  </Card>
                ) : params?.type === "total_content_sourced_today" ? (
                  <Card className="tbl_crd">
                    <div className="">
                      <div
                        className="d-flex justify-content-between align-items-center tbl_hdr"
                        px="20px"
                        mb="10px"
                      >
                        <Typography className="tbl_hdng">
                          Total content sourced from tasks
                        </Typography>
                        <div className="tbl_rt">
                          <span className="tbl_rt_txt">Monthly</span>
                        </div>
                      </div>
                      <div className="fix_ht_table">
                        <table
                          width="100%"
                          mx="20px"
                          variant="simple"
                          className="common_table les_colm"
                        >
                          <thead>
                            <tr>
                              <th className="">Content sourced from task</th>
                              <th>Period</th>
                              <th>Total funds invested</th>
                              <th>Trend</th>
                            </tr>
                          </thead>
                          <tbody>
                            {totalDetail &&
                              totalDetail.map((curr) => {
                                return (
                                  <tr>
                                    <td className="content_wrap more_contnt_wrap">
                                      <div className="content_imgs_wrap">
                                        <div className="content_imgs">
                                          {curr?.content_id.map((curr) => {
                                            return curr?.type === "image" ? (
                                              <img
                                                src={
                                                  process.env
                                                    .REACT_APP_UPLOADED_CONTENT +
                                                  curr?.imageAndVideo
                                                }
                                                className="content_img"
                                              />
                                            ) : curr?.type === "audio" ? (
                                              <img
                                                src={interviewic}
                                                className="content_img"
                                              />
                                            ) : curr?.type === "video" ? (
                                              <img
                                                src={
                                                  process.env
                                                    .REACT_APP_UPLOADED_CONTENT +
                                                  curr?.videothubnail
                                                }
                                                className="content_img"
                                              />
                                            ) : null;
                                          })}
                                          <span className="arrow_span">
                                            <svg
                                              stroke="currentColor"
                                              fill="currentColor"
                                              stroke-width="0"
                                              viewBox="0 0 16 16"
                                              height="1em"
                                              width="1em"
                                              xmlns="http://www.w3.org/2000/svg"
                                            >
                                              <path
                                                fill-rule="evenodd"
                                                d="M1 8a.5.5 0 0 1 .5-.5h11.793l-3.147-3.146a.5.5 0 0 1 .708-.708l4 4a.5.5 0 0 1 0 .708l-4 4a.5.5 0 0 1-.708-.708L13.293 8.5H1.5A.5.5 0 0 1 1 8z"
                                              ></path>
                                            </svg>
                                          </span>
                                        </div>
                                      </div>
                                    </td>
                                    <td className="timedate_wrap">
                                      <p className="timedate">
                                        <img
                                          src={calendar}
                                          className="icn_time"
                                        />
                                        {months[curr?._id?.month - 1]}{" "}
                                        {curr?._id?.year}
                                      </p>
                                    </td>
                                    <td>£ {curr?.total_price}</td>
                                    <td className="">
                                      <p className="trend_success">
                                        <BsArrowUp />
                                        50%
                                      </p>
                                    </td>
                                  </tr>
                                );
                              })}
                          </tbody>
                        </table>
                      </div>
                    </div>
                  </Card>
                ) : params?.type === "funds_invested_today" ? (
                  <Card className="tbl_crd">
                    <div className="">
                      <div
                        className="d-flex justify-content-between align-items-center tbl_hdr"
                        px="20px"
                        mb="10px"
                      >
                        <Typography className="tbl_hdng">
                          Funds invested today
                        </Typography>
                        <div className="tbl_rt">
                          <span className="tbl_rt_txt">Daily</span>
                        </div>
                      </div>
                      <div className="fix_ht_table">
                        <table
                          width="100%"
                          mx="20px"
                          variant="simple"
                          className="common_table"
                        >
                          <thead>
                            <tr>
                              <th className="cntent_srcd_th">
                                Content sourced from tasks
                              </th>
                              <th className="time_th">Time & date</th>
                              <th className="tsk_dlts">Task details</th>
                              <th className="tbl_icn_th">Type</th>
                              <th className="tbl_icn_th licnc">License</th>
                              <th className="tbl_icn_th catgr">Category</th>
                              <th className="tsk_dlts">Location</th>
                              <th>Published by</th>
                              <th>Nett Price paid</th>
                              <th>VAT paid</th>
                              <th>Total funds invested</th>
                            </tr>
                          </thead>
                          <tbody>
                            {broadcastTaskToday.map((curr) => {
                              const Audio = curr?.data?.filter(
                                (item) => item?.type === "audio"
                              );
                              const Video = curr?.data?.filter(
                                (item) => item?.type === "video"
                              );
                              const Image = curr?.data?.filter(
                                (item) => item?.type === "image"
                              );

                              return (
                                <tr>
                                  <td className="content_img_td">
                                    <div className="tbl_cont_wrp">
                                      {curr?.data[0]?.type === "image" ? (
                                        <img
                                          src={
                                            process.env
                                              .REACT_APP_UPLOADED_CONTENT +
                                            curr?.data[0]?.imageAndVideo
                                          }
                                          className="content_img"
                                        />
                                      ) : curr?.data[0]?.type === "video" ? (
                                        <img
                                          src={
                                            process.env
                                              .REACT_APP_UPLOADED_CONTENT +
                                            curr?.data[0]?.thumbnail
                                          }
                                          className="content_img"
                                        />
                                      ) : curr?.data[0]?.type === "audio" ? (
                                        <img
                                          src={interviewic}
                                          className="content_img"
                                        />
                                      ) : null}
                                      <span className="cont_count">
                                        +{curr?.data?.length - 1}
                                      </span>
                                    </div>
                                  </td>
                                  <td className="timedate_wrap">
                                    <p className="timedate">
                                      <img src={watchic} className="icn_time" />
                                      {moment(
                                        curr?.task_details?.createdAt
                                      ).format(`hh:mm A`)}
                                    </p>
                                    <p className="timedate">
                                      <img
                                        src={calendar}
                                        className="icn_time"
                                      />
                                      {moment(
                                        curr?.task_details?.createdAt
                                      ).format(`DD MMM YYYY`)}
                                    </p>
                                  </td>
                                  <td className="description_td">
                                    <p className="desc_ht">
                                      {curr?.task_details?.task_description}
                                    </p>
                                  </td>
                                  <td className="text-center">
                                    {Audio && Audio.length > 0 && (
                                      <Tooltip title="Interview">
                                        <img
                                          src={interviewic}
                                          alt="Photo"
                                          className="icn"
                                        />
                                      </Tooltip>
                                    )}{" "}
                                    {Video && Video.length > 0 && (
                                      <Tooltip title="Video">
                                        <img
                                          src={videoic}
                                          alt="Photo"
                                          className="icn"
                                        />
                                      </Tooltip>
                                    )}
                                    {Image && Image.length > 0 && (
                                      <Tooltip title="Photo">
                                        <img
                                          src={cameraic}
                                          alt="Photo"
                                          className="icn"
                                        />
                                      </Tooltip>
                                    )}
                                  </td>
                                  <td className="text-center">
                                    <Tooltip title={curr?.task_details?.type}>
                                      <img
                                        src={
                                          curr?.task_details?.type === "shared"
                                            ? share
                                            : curr?.task_details?.type ===
                                              "exclusive"
                                              ? exclusiveic
                                              : null
                                        }
                                        alt="Exclusive"
                                        className="icn"
                                      />
                                    </Tooltip>
                                  </td>
                                  <td className="text-center">
                                    <Tooltip
                                      title={
                                        curr?.curr?.task_details
                                          ?.category_details?.name
                                      }
                                    >
                                      <img
                                        src={
                                          curr?.task_details?.category_details
                                            ?.icon
                                        }
                                        alt="Exclusive"
                                        className="icn"
                                      />
                                    </Tooltip>
                                  </td>
                                  <td>{curr?.task_details?.location}</td>
                                  <td>
                                    <div className="hpr_dt">
                                      <img
                                        src={
                                          process.env.REACT_APP_AVATAR_IMAGE +
                                          curr?.hopper_id[0]?.avatar_id?.avatar
                                        }
                                        alt="Hopper"
                                        className="big_img"
                                      />
                                      <p className="hpr_nme">
                                        {`${curr?.hopper_id[0]?.first_name} ${curr?.hopper_id[0]?.last_name}`}
                                        <br />
                                        <span className="txt_light">
                                          {curr?.hopper_id[0]?.user_name}
                                        </span>
                                      </p>
                                    </div>
                                  </td>
                                  <td>
                                    £{" "}
                                    {curr
                                      ? curr.total_price - curr.total_vat || 0
                                      : 0}
                                  </td>
                                  <td>£ {curr ? curr.total_vat || 0 : 0}</td>
                                  <td>£ {curr ? curr.total_price || 0 : 0}</td>
                                </tr>
                              );
                            })}
                          </tbody>
                        </table>
                      </div>
                    </div>
                  </Card>
                ) : params?.type === "total_fund_invested" ? (
                  <Card className="tbl_crd">
                    <div className="">
                      <div
                        className="d-flex justify-content-between align-items-center tbl_hdr"
                        px="20px"
                        mb="10px"
                      >
                        <Typography className="tbl_hdng">
                          Total funds invested
                        </Typography>
                        <div className="tbl_rt">
                          <span className="tbl_rt_txt">Monthly</span>
                        </div>
                      </div>
                      <div className="fix_ht_table">
                        <table
                          width="100%"
                          mx="20px"
                          variant="simple"
                          className="common_table les_colm"
                        >
                          <thead>
                            <tr>
                              <th className="">Content sourced from tasks</th>
                              <th>Period</th>
                              <th>Nett price paid</th>
                              <th>VAT paid</th>
                              <th>Total funds invested</th>
                            </tr>
                          </thead>
                          <tbody>
                            {totalDetail &&
                              totalDetail.map((curr) => {
                                return (
                                  <tr>
                                    <td className="content_wrap more_contnt_wrap">
                                      <div className="content_imgs_wrap">
                                        <div className="content_imgs">
                                          {curr?.content_id.map((curr) => {
                                            return curr?.type === "image" ? (
                                              <img
                                                src={
                                                  process.env
                                                    .REACT_APP_UPLOADED_CONTENT +
                                                  curr?.imageAndVideo
                                                }
                                                className="content_img"
                                              />
                                            ) : curr?.type === "audio" ? (
                                              <img
                                                src={interviewic}
                                                className="content_img"
                                              />
                                            ) : curr?.type === "video" ? (
                                              <img
                                                src={
                                                  process.env
                                                    .REACT_APP_UPLOADED_CONTENT +
                                                  curr?.videothubnail
                                                }
                                                className="content_img"
                                              />
                                            ) : null;
                                          })}
                                          <span className="arrow_span">
                                            <svg
                                              stroke="currentColor"
                                              fill="currentColor"
                                              stroke-width="0"
                                              viewBox="0 0 16 16"
                                              height="1em"
                                              width="1em"
                                              xmlns="http://www.w3.org/2000/svg"
                                            >
                                              <path
                                                fill-rule="evenodd"
                                                d="M1 8a.5.5 0 0 1 .5-.5h11.793l-3.147-3.146a.5.5 0 0 1 .708-.708l4 4a.5.5 0 0 1 0 .708l-4 4a.5.5 0 0 1-.708-.708L13.293 8.5H1.5A.5.5 0 0 1 1 8z"
                                              ></path>
                                            </svg>
                                          </span>
                                        </div>
                                      </div>
                                    </td>
                                    <td className="timedate_wrap">
                                      <p className="timedate">
                                        <img
                                          src={calendar}
                                          className="icn_time"
                                        />
                                        {months[curr?._id?.month - 1]}{" "}
                                        {curr?._id?.year}
                                      </p>
                                    </td>
                                    <td>
                                      £{" "}
                                      {(
                                        curr?.total_price - curr?.total_vat || 0
                                      )?.toFixed(2)}
                                    </td>
                                    <td>
                                      £ {(curr?.total_vat || 0)?.toFixed(2)}
                                    </td>
                                    <td>
                                      £ {(curr?.total_price || 0)?.toFixed(2)}
                                    </td>
                                  </tr>
                                );
                              })}
                          </tbody>
                        </table>
                      </div>
                    </div>
                  </Card>
                ) : params?.type === "deadline_met" ? (
                  <Card className="tbl_crd">
                    <div className="">
                      <div
                        className="d-flex justify-content-between align-items-center tbl_hdr"
                        px="20px"
                        mb="10px"
                      >
                        <Typography className="tbl_hdng">
                          Deadline Met
                        </Typography>
                        <div className="tbl_rt">
                          <span className="tbl_rt_txt">Daily</span>
                        </div>
                      </div>
                      <div className="fix_ht_table">
                        <table
                          width="100%"
                          mx="20px"
                          variant="simple"
                          className="common_table"
                        >
                          <thead>
                            <tr>
                              <th className="cntent_srcd_th">
                                Broadcasted tasks
                              </th>
                              <th className="tsk_dlts">Task details</th>
                              <th>Broadcasted time</th>
                              <th>Deadline</th>
                              <th>Content uploaded time</th>
                              <th>Delay (+/-)</th>
                              {/* <th>Trend</th> */}
                            </tr>
                          </thead>
                          <tbody>
                            {detail?.deadline_met &&
                              detail?.deadline_met?.data?.map((curr) => {

                                return (
                                  <tr>
                                    {/* <td className="content_img_td">
                                      <div className="tbl_cont_wrp">
                                        {curr?.data[0]?.type === "image" ? (
                                          <img
                                            src={
                                              process.env
                                                .REACT_APP_UPLOADED_CONTENT +
                                              curr?.data[0]?.imageAndVideo
                                            }
                                            className="content_img"
                                          />
                                        ) : curr?.data[0]?.type === "video" ? (
                                          <img
                                            src={
                                              process.env
                                                .REACT_APP_UPLOADED_CONTENT +
                                              curr?.data[0]?.thumbnail
                                            }
                                            className="content_img"
                                          />
                                        ) : curr?.data[0]?.type === "audio" ? (
                                          <img
                                            src={interviewic}
                                            className="content_img"
                                          />
                                        ) : null}
                                        <span className="cont_count">
                                          +{curr?.data?.length - 1}
                                        </span>
                                      </div>
                                    </td> */
                                    }
                                    <td className="content_img_td">
                                      <Link to={`/broadcasted-taks/${curr?._id}`}>
                                        <div className="mapInput td_mp">
                                          <GoogleMap
                                            googleMapsApiKey={process.env.REACT_APP_GOOGLE_MAPS_API_KEY}
                                            center={{ lat: curr?.address_location?.coordinates[0], lng: curr?.address_location?.coordinates[1] }}
                                            zoom={7}
                                            mapContainerStyle={{ height: '120%', width: '100%' }}
                                            options={{
                                              disableDefaultUI: true,
                                              mapTypeControl: false,
                                              streetViewControl: false,
                                            }}>
                                            <Marker
                                              key={curr._id}
                                              position={{ lat: curr?.address_location?.coordinates[0], lng: curr?.address_location?.coordinates[1] }}
                                            />
                                          </GoogleMap>
                                        </div>
                                      </Link>

                                    </td>
                                    <td className="description_td">
                                      <p className="desc_ht mb-0">
                                        {curr?.task_description}
                                      </p>
                                    </td>
                                    <td className="timedate_wrap">
                                      <p className="timedate">
                                        <img
                                          src={watchic}
                                          className="icn_time"
                                        />
                                        {moment(curr?.createdAt).format(`hh:mm A`)}
                                      </p>
                                      <p className="timedate">
                                        <img
                                          src={calendar}
                                          className="icn_time"
                                        />
                                        {moment(
                                          curr?.createdAt
                                        ).format(`DD MMM YYYY`)}
                                      </p>
                                    </td>
                                    <td className="timedate_wrap">
                                      <p className="timedate">
                                        <img
                                          src={watchic}
                                          className="icn_time"
                                        />
                                        {moment(
                                          curr?.deadline_date
                                        ).format(`hh:mm A`)}
                                      </p>
                                      <p className="timedate">
                                        <img
                                          src={calendar}
                                          className="icn_time"
                                        />
                                        {moment(
                                          curr?.deadline_date
                                        ).format(`DD MMM YYYY`)}
                                      </p>
                                    </td>
                                    <td className="timedate_wrap">
                                      <p className="timedate">
                                        <img src={watchic} className="icn_time" />
                                        {curr?.content_details[0]?.createdAt ? moment(curr?.content_details[0]?.createdAt).format("hh:mm a") : 'deadline Not Met'}
                                      </p>
                                      <p className="timedate">
                                        <img src={calendar} className="icn_time" />
                                        {/* {moment(curr?.content_details[0]?.createdAt).format("DD MMMM, YYYY")} */}
                                        {curr?.content_details[0]?.createdAt ? moment(curr?.content_details[0]?.createdAt).format("DD MMMM, YYYY") : " deadline Not Met"}

                                      </p>
                                    </td>
                                    <td className="timedate_wrap">
                                      <p className="timedate">
                                        <img src={watchic} className="icn_time" />
                                        {/* <span className="text-green txt_mdm">
                                                    {myFunction(curr?.deadline_date, curr?.content_details[0]?.createdAt)} hours
                                                  </span> */}
                                        {(() => {
                                          const hoursDifference = myFunction(curr?.deadline_date, curr?.content_details[0]?.createdAt);
                                          if (hoursDifference > 0) {
                                            return <span className="text-green txt_mdm">{hoursDifference} hours</span>
                                          } else if (hoursDifference < 0) {
                                            return <span className="text-danger txt_mdm">{-hoursDifference} hours</span>
                                          } else {
                                            return null;
                                          }
                                        })()}


                                      </p>
                                    </td>

                                    {/* <td className="">
                                      <p className="trend_success">
                                        <BsArrowUp />
                                        50%
                                      </p>
                                    </td> */}

                                  </tr>
                                );
                              })}
                          </tbody>
                        </table>
                      </div>
                    </div>
                  </Card>
                ) : params?.type === "task_categories" ? (
                  <Card className="tbl_crd">
                    <div className="">
                      <div
                        className="d-flex justify-content-between align-items-center tbl_hdr"
                        px="20px"
                        mb="10px"
                      >
                        <Typography className="tbl_hdng">
                          Task categories
                        </Typography>
                        <div className="tbl_rt">
                          <Form.Group className="globalSort">
                            <Form.Select
                              name="task_categories"
                              onChange={handleChangeSort}
                            >
                              <option value="daily">Daily</option>
                              <option value="monthly">Monthly</option>
                              <option value="yearly">Yearly</option>
                            </Form.Select>
                          </Form.Group>
                        </div>
                      </div>
                      <div className="fix_ht_table">
                        <table
                          width="100%"
                          mx="20px"
                          variant="simple"
                          className="common_table"
                        >
                          <thead>
                            <tr>
                              <th className="">
                                Content sourced <br /> from tasks
                              </th>
                              <th>Period</th>
                              <th>Business</th>
                              <th>Political</th>
                              <th>Crime</th>
                              <th>Fashion</th>
                              <th>Other</th>
                            </tr>
                          </thead>
                          <tbody>
                            {location &&
                              location.map((curr) => {
                                const other = curr?.task_details?.filter(
                                  (item) =>
                                    item?.category_details?.name !== "Crime" &&
                                    item?.category_details?.name !==
                                    "Business" &&
                                    item?.category_details?.name !==
                                    "Political" &&
                                    item?.category_details?.name !== "Fashion"
                                );
                                const Bussines = curr?.task_details?.filter(
                                  (item) =>
                                    item?.category_details?.name === "Business"
                                );
                                const Political = curr?.task_details?.filter(
                                  (item) =>
                                    item?.category_details?.name === "Political"
                                );
                                const Crime = curr?.task_details?.filter(
                                  (item) =>
                                    item?.category_details?.name === "Crime"
                                );
                                const Fashion = curr?.task_details?.filter(
                                  (item) =>
                                    item?.category_details?.name === "Fashion"
                                );
                                return (
                                  <tr>
                                    <td className="content_wrap more_contnt_wrap">
                                      <div className="content_imgs_wrap">
                                        <div className="content_imgs">
                                          {curr?.content_id.map((curr) => {
                                            return curr?.type === "image" ? (
                                              <img
                                                src={
                                                  process.env
                                                    .REACT_APP_UPLOADED_CONTENT +
                                                  curr?.imageAndVideo
                                                }
                                                className="content_img"
                                              />
                                            ) : curr?.type === "audio" ? (
                                              <img
                                                src={interviewic}
                                                className="content_img"
                                              />
                                            ) : curr?.type === "video" ? (
                                              <img
                                                src={
                                                  process.env
                                                    .REACT_APP_UPLOADED_CONTENT +
                                                  curr?.videothubnail
                                                }
                                                className="content_img"
                                              />
                                            ) : null;
                                          })}

                                          <span className="arrow_span">
                                            <svg
                                              stroke="currentColor"
                                              fill="currentColor"
                                              stroke-width="0"
                                              viewBox="0 0 16 16"
                                              height="1em"
                                              width="1em"
                                              xmlns="http://www.w3.org/2000/svg"
                                            >
                                              <path
                                                fill-rule="evenodd"
                                                d="M1 8a.5.5 0 0 1 .5-.5h11.793l-3.147-3.146a.5.5 0 0 1 .708-.708l4 4a.5.5 0 0 1 0 .708l-4 4a.5.5 0 0 1-.708-.708L13.293 8.5H1.5A.5.5 0 0 1 1 8z"
                                              ></path>
                                            </svg>
                                          </span>
                                        </div>
                                      </div>
                                    </td>
                                    <td className="timedate_wrap">
                                      <p className="timedate">
                                        <img
                                          src={calendar}
                                          className="icn_time"
                                        />
                                        {/* March 2023 */}
                                        {months[curr?._id?.month - 1]}{" "}
                                        {curr?._id?.year}
                                      </p>
                                    </td>
                                    <td>
                                      {(Bussines && Bussines?.length) || 0}
                                    </td>
                                    <td>
                                      {(Political && Political?.length) || 0}
                                    </td>
                                    <td>{(Crime && Crime?.length) || 0}</td>
                                    <td>{(Fashion && Fashion?.length) || 0}</td>
                                    <td>{(other && other?.length) || 0}</td>
                                  </tr>
                                );
                              })}
                          </tbody>
                        </table>
                      </div>
                    </div>
                  </Card>
                ) : params?.type === "content_type" ? (
                  <Card className="tbl_crd">
                    <div className="">
                      <div
                        className="d-flex justify-content-between align-items-center tbl_hdr"
                        px="20px"
                        mb="10px"
                      >
                        <Typography className="tbl_hdng">
                          Content type
                        </Typography>
                        <div className="tbl_rt">
                          <Form.Group className="globalSort">
                            <Form.Select
                              name="content_type"
                              onChange={handleChangeSort}
                            >
                              <option value="daily">Daily</option>
                              <option value="monthly">Monthly</option>
                              <option value="yearly">Yearly</option>
                            </Form.Select>
                          </Form.Group>
                        </div>
                      </div>
                      <div className="fix_ht_table">
                        <table
                          width="100%"
                          mx="20px"
                          variant="simple"
                          className="common_table les_colm"
                        >
                          <thead>
                            <tr>
                              <th className="">
                                Content sourced <br /> from tasks
                              </th>
                              <th>Period</th>
                              <th>Photos</th>
                              <th>Videos</th>
                              <th>Interviews</th>
                            </tr>
                          </thead>
                          <tbody>
                            {totalDetail &&
                              totalDetail.map((curr) => {
                                const Audio = curr?.content_id?.filter(
                                  (item) => item?.type === "audio"
                                );
                                const Video = curr?.content_id?.filter(
                                  (item) => item?.type === "video"
                                );
                                const Images = curr?.content_id?.filter(
                                  (item) => item?.type === "image"
                                );

                                return (
                                  <tr>
                                    <td className="content_wrap more_contnt_wrap">
                                      <div className="content_imgs_wrap">
                                        <div className="content_imgs">
                                          {curr?.content_id.map((curr) => {
                                            return curr?.type === "image" ? (
                                              <img
                                                src={
                                                  process.env
                                                    .REACT_APP_UPLOADED_CONTENT +
                                                  curr?.imageAndVideo
                                                }
                                                className="content_img"
                                              />
                                            ) : curr?.type === "audio" ? (
                                              <img
                                                src={interviewic}
                                                className="content_img"
                                              />
                                            ) : curr?.type === "video" ? (
                                              <img
                                                src={
                                                  process.env
                                                    .REACT_APP_UPLOADED_CONTENT +
                                                  curr?.videothubnail
                                                }
                                                className="content_img"
                                              />
                                            ) : null;
                                          })}
                                          {/* <img src={contimg1} className="content_img" /> */}
                                          <span className="arrow_span">
                                            <svg
                                              stroke="currentColor"
                                              fill="currentColor"
                                              stroke-width="0"
                                              viewBox="0 0 16 16"
                                              height="1em"
                                              width="1em"
                                              xmlns="http://www.w3.org/2000/svg"
                                            >
                                              <path
                                                fill-rule="evenodd"
                                                d="M1 8a.5.5 0 0 1 .5-.5h11.793l-3.147-3.146a.5.5 0 0 1 .708-.708l4 4a.5.5 0 0 1 0 .708l-4 4a.5.5 0 0 1-.708-.708L13.293 8.5H1.5A.5.5 0 0 1 1 8z"
                                              ></path>
                                            </svg>
                                          </span>
                                        </div>
                                      </div>
                                    </td>
                                    <td className="timedate_wrap">
                                      <p className="timedate">
                                        <img
                                          src={calendar}
                                          className="icn_time"
                                        />
                                        {months[curr?._id?.month - 1]}{" "}
                                        {curr?._id?.year}
                                      </p>
                                    </td>
                                    <td>{(Images && Images?.length) || 0}</td>
                                    <td>{(Video && Video?.length) || 0}</td>
                                    <td>{(Audio && Audio?.length) || 0}</td>
                                  </tr>
                                );
                              })}
                          </tbody>
                        </table>
                      </div>
                    </div>
                  </Card>
                ) : params?.type === "task_location" ? (
                  <Card className="tbl_crd">
                    <div className="">
                      <div
                        className="d-flex justify-content-between align-items-center tbl_hdr"
                        px="20px"
                        mb="10px"
                      >
                        <Typography className="tbl_hdng">
                          Task location
                        </Typography>
                        <div className="tbl_rt">
                          <Form.Group className="globalSort">
                            <Form.Select
                              name="task_location"
                              onChange={handleChangeSort}
                            >
                              <option value="daily">Daily</option>
                              <option value="monthly">Monthly</option>
                              <option value="yearly">Yearly</option>
                            </Form.Select>
                          </Form.Group>
                        </div>
                      </div>
                      <div className="fix_ht_table">
                        <table
                          width="100%"
                          mx="20px"
                          variant="simple"
                          className="common_table les_colm"
                        >
                          <thead>
                            <tr>
                              <th className="">Content sourced <br /> from tasks</th>
                              <th>Period</th>
                              {/* <th>Central</th> */}
                              <th>North</th>
                              <th>South</th>
                              <th>East</th>
                              <th>West</th>
                            </tr>
                          </thead>
                          <tbody>
                            {location &&
                              location.map((curr) => {
                                return (
                                  <tr>
                                    <td className="content_wrap more_contnt_wrap">
                                      <div className="content_imgs_wrap">
                                        <div className="content_imgs">
                                          {curr?.content_id.map((curr) => {
                                            return curr?.type === "image" ? (
                                              <img
                                                src={
                                                  process.env
                                                    .REACT_APP_UPLOADED_CONTENT +
                                                  curr?.imageAndVideo
                                                }
                                                className="content_img"
                                              />
                                            ) : curr?.type === "audio" ? (
                                              <img
                                                src={interviewic}
                                                className="content_img"
                                              />
                                            ) : curr?.type === "video" ? (
                                              <img
                                                src={
                                                  process.env
                                                    .REACT_APP_UPLOADED_CONTENT +
                                                  curr?.videothubnail
                                                }
                                                className="content_img"
                                              />
                                            ) : null;
                                          })}
                                          <span className="arrow_span">
                                            <svg
                                              stroke="currentColor"
                                              fill="currentColor"
                                              stroke-width="0"
                                              viewBox="0 0 16 16"
                                              height="1em"
                                              width="1em"
                                              xmlns="http://www.w3.org/2000/svg"
                                            >
                                              <path
                                                fill-rule="evenodd"
                                                d="M1 8a.5.5 0 0 1 .5-.5h11.793l-3.147-3.146a.5.5 0 0 1 .708-.708l4 4a.5.5 0 0 1 0 .708l-4 4a.5.5 0 0 1-.708-.708L13.293 8.5H1.5A.5.5 0 0 1 1 8z"
                                              ></path>
                                            </svg>
                                          </span>
                                        </div>
                                      </div>
                                    </td>
                                    <td className="timedate_wrap">
                                      <p className="timedate">
                                        <img
                                          src={calendar}
                                          className="icn_time"
                                        />
                                        {months[curr?._id?.month - 1]}{" "}
                                        {curr?._id?.year}
                                      </p>
                                    </td>
                                    {/* <td>180</td> */}
                                    <td>{curr?.north}</td>
                                    <td>{curr?.south}</td>
                                    <td>{curr?.east}</td>
                                    <td>{curr?.west}</td>
                                  </tr>
                                );
                              })}
                          </tbody>
                        </table>
                      </div>
                    </div>
                  </Card>
                ) : params?.type === "task_summary" ? (
                  <Card className="tbl_crd">
                    <div className="">
                      <div
                        className="d-flex justify-content-between align-items-center tbl_hdr"
                        px="20px"
                        mb="10px"
                      >
                        <Typography className="tbl_hdng">
                          Task summary
                        </Typography>
                        <div className="tbl_rt">
                          <Form.Group className="globalSort">
                            <Form.Select
                              name="task_summary"
                              onChange={handleChangeSort}
                            >
                              <option value="daily">Daily</option>
                              <option value="monthly">Monthly</option>
                              <option value="yearly">Yearly</option>
                            </Form.Select>
                          </Form.Group>
                        </div>
                      </div>
                      <div className="fix_ht_table">
                        <table
                          width="100%"
                          mx="20px"
                          variant="simple"
                          className="common_table les_colm"
                        >
                          <thead>
                            <tr>
                              <th className="">Content purchased online</th>
                              <th>Period</th>
                              <th>Volume</th>
                            </tr>
                          </thead>
                          <tbody>
                            {totalDetail &&
                              totalDetail.map((curr) => {
                                return (
                                  <tr>
                                    <td className="content_wrap more_contnt_wrap">
                                      <div className="content_imgs_wrap">
                                        <div className="content_imgs">
                                          {curr?.content_id.map((curr) => {
                                            return curr?.type === "image" ? (
                                              <img
                                                src={
                                                  process.env
                                                    .REACT_APP_UPLOADED_CONTENT +
                                                  curr?.imageAndVideo
                                                }
                                                className="content_img"
                                              />
                                            ) : curr?.type === "audio" ? (
                                              <img
                                                src={interviewic}
                                                className="content_img"
                                              />
                                            ) : curr?.type === "video" ? (
                                              <img
                                                src={
                                                  process.env
                                                    .REACT_APP_UPLOADED_CONTENT +
                                                  curr?.videothubnail
                                                }
                                                className="content_img"
                                              />
                                            ) : null;
                                          })}
                                          <span className="arrow_span">
                                            <svg
                                              stroke="currentColor"
                                              fill="currentColor"
                                              stroke-width="0"
                                              viewBox="0 0 16 16"
                                              height="1em"
                                              width="1em"
                                              xmlns="http://www.w3.org/2000/svg"
                                            >
                                              <path
                                                fill-rule="evenodd"
                                                d="M1 8a.5.5 0 0 1 .5-.5h11.793l-3.147-3.146a.5.5 0 0 1 .708-.708l4 4a.5.5 0 0 1 0 .708l-4 4a.5.5 0 0 1-.708-.708L13.293 8.5H1.5A.5.5 0 0 1 1 8z"
                                              ></path>
                                            </svg>
                                          </span>
                                        </div>
                                      </div>
                                    </td>
                                    <td className="timedate_wrap">
                                      <p className="timedate">
                                        <img
                                          src={calendar}
                                          className="icn_time"
                                        />
                                        {months[curr?._id?.month - 1]}{" "}
                                        {curr?._id?.year}
                                      </p>
                                    </td>
                                    <td>{curr?.volume || 0}</td>
                                  </tr>
                                );
                              })}
                          </tbody>
                        </table>
                      </div>
                    </div>
                  </Card>
                ) : params?.type === "content_sourced_from_task_Summary" ? (
                  <Card className="tbl_crd">
                    <div className="">
                      <div
                        className="d-flex justify-content-between align-items-center tbl_hdr"
                        px="20px"
                        mb="10px"
                      >
                        <Typography className="tbl_hdng">
                          Content sourced from tasks summary
                        </Typography>
                        <div className="tbl_rt">
                          <Form.Group className="globalSort">
                            <Form.Select
                              name="content_sourced_from_summary"
                              onChange={handleChangeSort}
                            >
                              <option value="daily">Daily</option>
                              <option value="monthly">Monthly</option>
                              <option value="yearly">Yearly</option>
                            </Form.Select>
                          </Form.Group>
                        </div>
                      </div>
                      <div className="fix_ht_table">
                        <table
                          width="100%"
                          mx="20px"
                          variant="simple"
                          className="common_table les_colm"
                        >
                          <thead>
                            <tr>
                              <th className="">Content sourced <br /> from tasks</th>
                              <th>Period</th>
                              <th>Volume</th>
                            </tr>
                          </thead>
                          <tbody>
                            {totalDetail &&
                              totalDetail.map((curr) => {
                                return (
                                  <tr>
                                    <td className="content_wrap more_contnt_wrap">
                                      <div className="content_imgs_wrap">
                                        <div className="content_imgs">
                                          {curr?.content_id.map((curr) => {
                                            return curr?.type === "image" ? (
                                              <img
                                                src={
                                                  process.env
                                                    .REACT_APP_UPLOADED_CONTENT +
                                                  curr?.imageAndVideo
                                                }
                                                className="content_img"
                                              />
                                            ) : curr?.type === "audio" ? (
                                              <img
                                                src={interviewic}
                                                className="content_img"
                                              />
                                            ) : curr?.type === "video" ? (
                                              <img
                                                src={
                                                  process.env
                                                    .REACT_APP_UPLOADED_CONTENT +
                                                  curr?.videothubnail
                                                }
                                                className="content_img"
                                              />
                                            ) : null;
                                          })}
                                          <span className="arrow_span">
                                            <svg
                                              stroke="currentColor"
                                              fill="currentColor"
                                              stroke-width="0"
                                              viewBox="0 0 16 16"
                                              height="1em"
                                              width="1em"
                                              xmlns="http://www.w3.org/2000/svg"
                                            >
                                              <path
                                                fill-rule="evenodd"
                                                d="M1 8a.5.5 0 0 1 .5-.5h11.793l-3.147-3.146a.5.5 0 0 1 .708-.708l4 4a.5.5 0 0 1 0 .708l-4 4a.5.5 0 0 1-.708-.708L13.293 8.5H1.5A.5.5 0 0 1 1 8z"
                                              ></path>
                                            </svg>
                                          </span>
                                        </div>
                                      </div>
                                    </td>
                                    <td className="timedate_wrap">
                                      <p className="timedate">
                                        <img
                                          src={calendar}
                                          className="icn_time"
                                        />
                                        {months[curr?._id?.month - 1]}{" "}
                                        {curr?._id?.year}
                                      </p>
                                    </td>
                                    {/* <td>£ {(curr?.total_price-curr?.total_vat||0)?.toFixed(2)}</td>
                                  <td>£ {(curr?.total_vat||0)?.toFixed(2)}</td> */}
                                    <td>£ {curr?.volume}</td>
                                  </tr>
                                );
                              })}
                          </tbody>
                        </table>
                      </div>
                    </div>
                  </Card>
                ) : params?.type === "fund_invested_summary" ? (
                  <Card className="tbl_crd">
                    <div className="">
                      <div
                        className="d-flex justify-content-between align-items-center tbl_hdr"
                        px="20px"
                        mb="10px"
                      >
                        <Typography className="tbl_hdng">
                          Funds invested summary
                        </Typography>
                        <div className="tbl_rt">
                          <Form.Group className="globalSort">
                            <Form.Select
                              name="fund_invested_summary"
                              onChange={handleChangeSort}
                            >
                              <option value="daily">Daily</option>
                              <option value="monthly">Monthly</option>
                              <option value="yearly">Yearly</option>
                            </Form.Select>
                          </Form.Group>
                        </div>
                      </div>
                      <div className="fix_ht_table">
                        <table
                          width="100%"
                          mx="20px"
                          variant="simple"
                          className="common_table les_colm"
                        >
                          <thead>
                            <tr>
                              <th className="">Content sourced from tasks</th>
                              <th>Period</th>
                              <th>Funds Invested </th>
                            </tr>
                          </thead>
                          <tbody>
                            {totalDetail &&
                              totalDetail.map((curr) => {
                                return (
                                  <tr>
                                    <td className="content_wrap more_contnt_wrap">
                                      <div className="content_imgs_wrap">
                                        <div className="content_imgs">
                                          {curr?.content_id.map((curr) => {
                                            return curr?.type === "image" ? (
                                              <img
                                                src={
                                                  process.env
                                                    .REACT_APP_UPLOADED_CONTENT +
                                                  curr?.imageAndVideo
                                                }
                                                className="content_img"
                                              />
                                            ) : curr?.type === "audio" ? (
                                              <img
                                                src={interviewic}
                                                className="content_img"
                                              />
                                            ) : curr?.type === "video" ? (
                                              <img
                                                src={
                                                  process.env
                                                    .REACT_APP_UPLOADED_CONTENT +
                                                  curr?.videothubnail
                                                }
                                                className="content_img"
                                              />
                                            ) : null;
                                          })}
                                          <span className="arrow_span">
                                            <svg
                                              stroke="currentColor"
                                              fill="currentColor"
                                              stroke-width="0"
                                              viewBox="0 0 16 16"
                                              height="1em"
                                              width="1em"
                                              xmlns="http://www.w3.org/2000/svg"
                                            >
                                              <path
                                                fill-rule="evenodd"
                                                d="M1 8a.5.5 0 0 1 .5-.5h11.793l-3.147-3.146a.5.5 0 0 1 .708-.708l4 4a.5.5 0 0 1 0 .708l-4 4a.5.5 0 0 1-.708-.708L13.293 8.5H1.5A.5.5 0 0 1 1 8z"
                                              ></path>
                                            </svg>
                                          </span>
                                        </div>
                                      </div>
                                    </td>
                                    <td className="timedate_wrap">
                                      <p className="timedate">
                                        <img
                                          src={calendar}
                                          className="icn_time"
                                        />
                                        {months[curr?._id?.month - 1]}{" "}
                                        {curr?._id?.year}
                                      </p>
                                    </td>
                                    <td>
                                      £ {(curr?.total_price || 0)?.toFixed(2)}
                                    </td>
                                  </tr>
                                );
                              })}
                          </tbody>
                        </table>
                      </div>
                    </div>
                  </Card>
                ) : null}
              </div>
            </Col>
          </Row>
        </Container>
      </div>
    </>
  );
};

export default memo(ReportsTablesTask);
