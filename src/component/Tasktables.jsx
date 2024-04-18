import React, { useEffect, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { Row, Col, Container } from "react-bootstrap";
import { Card, Typography, Button, Tooltip } from "@mui/material";
import sharedic from '../assets/images/shared.svg';

import { BsArrow90DegUp, BsArrowBarUp, BsArrowDown, BsArrowLeft, BsArrowRight, BsArrowUp, BsChevronDown, BsEye } from "react-icons/bs";
import watch from "../assets/images/watch.svg";
import calendar from "../assets/images/calendar.svg";
import img1 from "../assets/images/img1.png";
import img2 from "../assets/images/img2.png";
import img3 from "../assets/images/img4.png";
import imgl from "../assets/images/img1.jpeg";
import imgl1 from "../assets/images/img3.jpg";
import usric from "../assets/images/menu-icons/user.svg";
import camera from "../assets/images/camera.svg";
import celebrity from "../assets/images/celebrity.svg";
import idimg from "../assets/images/celebrity.svg";
import Header from './Header';
import locationimg from "../assets/images/locationimg.svg";
import interviewic from "../assets/images/interview.svg";
import videoic from "../assets/images/video.svg";
import { Get, Post } from '../services/user.services';
import moment from 'moment/moment';
import audioic from "../assets/images/audio-icon.svg";

import { GoogleMap, LoadScript, Marker } from '@react-google-maps/api';

// import contimg3 from "../assets/images/Contentdetail/content1.svg";
// import contimg2 from "../assets/images/Contentdetail/content2.svg";
import contimg3 from "../assets/images/Contentdetail/content3.png";
import watchic from "../assets/images/watch.svg";
import hprimg1 from "../assets/images/avatars/usrimg1.svg";
import hprimg2 from "../assets/images/avatars/usrimg2.svg";
import hprimg3 from "../assets/images/avatars/usrimg3.svg";
import cameraic from "../assets/images/camera.svg";
import exclusiveic from "../assets/images/exclusive.svg";
import NewContentPurchasedOnline from './Sortfilters/Content/NewContentPurchasedOnlne';
import Loader from './Loader';
import proIcn from "../assets/images/pro-icon.svg"
import typeInterviewwt from "../assets/images/typeinterview-wt.svg";
const Tasktables = () => {

  const param = useParams();
  const navigate = useNavigate();
  const [taskDetails, setTaskDetails] = useState()
  const [sourcedContent, setSourcedContent] = useState([])
  const [todayFund, setTodayFund] = useState([])
  const [totalFund, setTotalFund] = useState([])
  const [deadline_met, setdead] = useState([])
  const [loading, setLoading] = useState(false)

  // Content Purchased Online-
  const [openContentPuchased, setOpenContentPuchased] = useState(false);
  const handleCloseContentPurchased = (values) => {
    setOpenContentPuchased(values);
  }

  // Sorting-
  const [sortingField, setSortingField] = useState("");
  const [sortingValue, setSortingValue] = useState("");
  const [sortingType, setSortingType] = useState("");

  // content purchased online-
  const newContentPurchasedValueHandler = (value) => {
    setSortingField(value.field);
    setSortingValue(value.values);
    setSortingType(value.type);
    // console.log("newContentPurchasedValueHandler", value)
  }


  const [hopper, setHopperUsedForTask] = useState([])

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

  const TaskDetails = async () => {
    setLoading(true)
    const resp = await Get(`mediaHouse/tasks/count?${sortingField && sortingField}=${sortingValue && sortingValue}`)
    if (resp) {
      setTaskDetails(resp.data)
      setTodayFund(resp.data.today_fund_sinvested)
      setHopperUsedForTask(resp.data.hopper_used_for_tasks)
      setTotalFund(resp.data.total_fund_invested)
      setdead(resp.data.deadline_met)
      setLoading(false)

    }
    setLoading(false)
  }

  const ContentCount = async () => {
    setLoading(true);
    try {
      const resp = await Get(
        `mediaHouse/Content/Count`
      );
      if (resp) {
        setSourcedContent(resp.data.sourced_content_from_tasks?.task)
        setLoading(false);
      }
    } catch (error) {
      // console.log(error)
      setLoading(false);
    }
  };

  useEffect(() => {
    ContentCount()
  }, [])

  useEffect(() => {
    TaskDetails()
  }, [sortingType, sortingValue])










  return (
    <>
      {/* {console.log(taskDetails, `,-----taskDetails`)} */}
      {loading && <Loader />}

      <Header />
      <div className="page-wrap feed-detail tasktables_wrap">
        <Container fluid className='p-0'>
          <Row>
            <Col md={12}>
              <div className="">
                <Link className='back_link mb-3' onClick={() => window.history.back()}><BsArrowLeft className='text-pink' /> Back </Link>
              </div>
              <div className="tbl_wrap_cmn">

                {param.type === "liveTasks" ?
                  <Card className="tbl_crd">
                    <div className="">
                      <div className='d-flex justify-content-between align-items-center tbl_hdr' px='20px' mb='10px'>
                        <Typography className='tbl_hdng'>
                          Live Tasks
                        </Typography>
                        <div className="tbl_rt">
                          <div className="fltrs_prnt">
                            <Button className='sort_btn' onClick={() => { setOpenContentPuchased(true); }}>
                              Sort
                              <BsChevronDown />
                            </Button>
                            {openContentPuchased && <NewContentPurchasedOnline closeContPurchased={handleCloseContentPurchased} contentPurchasedSortFilterValues={newContentPurchasedValueHandler} />}
                          </div>
                        </div>
                      </div>
                      <div className="fix_ht_table">
                        <table width='100%' mx='20px' variant='simple' className="common_table">
                          <thead>
                            <tr>
                              <th className='brdcstd_tsk_th'>Broadcasted tasks</th>
                              <th className='time_th'>Broadcasted time & date</th>
                              <th className='tsk_dlts'>Task details</th>
                              <th className='location_th'>Location</th>
                              <th className='type_th'>Type</th>
                              <th className='catgr_th'>Category</th>
                              <th className='price_th'>Price offered</th>
                              <th className='time_date_th'>Deadline</th>
                              {/* <th className='trend_th'>Trend</th> */}
                            </tr>
                          </thead>
                          <tbody>
                            {taskDetails?.live_tasks_details?.task.map((curr) => {
                              return (
                                <tr onClick={() => navigate(`/broadcasted-taks/${curr?._id}`)} style={{cursor:"pointer"}}>
                                  <td className="content_img_td">
                                    <Link>
                                      <div className="mapInput td_mp">
                                        <style>{`
                                            .gm-style > div:first-child {
                                            cursor: pointer !important;
                                          }
                                        `}
                                        </style>
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
                                  <td className="timedate_wrap">
                                    <p className="timedate"><img src={watch} className="icn_time" />{moment(curr.createdAt).format("hh:mm A")}</p>
                                    <p className="timedate"><img src={calendar} className="icn_time" />{moment(curr.createdAt).format("DD MMMM, YYYY")}</p>
                                  </td>
                                  <td className="description_td">
                                    <p className='desc_ht'>
                                      {curr.task_description}
                                    </p>
                                  </td>
                                  <td className="address_wrap">{curr.location}</td>
                                  <td className="text-center">
                                    <div className="type_wrp d-flex flex-column align-items-center">
                                      {curr.need_photos === true &&
                                        <Tooltip title="Photo">
                                          <img src={camera} className="icn m_auto" /> </Tooltip>}
                                      {curr.need_interview === true &&
                                        <Tooltip title="Interview"><img src={interviewic} className="icn m_auto" /></Tooltip>}
                                      {curr.need_videos === true &&
                                        <Tooltip title="Video"><img src={videoic} className="icn m_auto" /></Tooltip>}
                                    </div>
                                  </td>
                                  <td className="text-center">
                                    <Tooltip title={curr?.category_id?.name}>
                                      <img src={curr?.category_id?.icon} className="icn m_auto" />
                                    </Tooltip>
                                  </td>
                                  <td className="">
                                    <div className="type_wrp d-flex flex-column">
                                      {curr.need_photos === true && <p className='txt'>
                                        £ {curr.photo_price}
                                      </p>}
                                      {curr.need_interview === true && <p className='txt'>
                                        £ {curr.interview_price}
                                      </p>}
                                      {curr.need_videos === true && <p className='txt'>
                                        £ {curr.videos_price}
                                      </p>}
                                    </div>
                                  </td>
                                  <td className="timedate_wrap">
                                    <p className="timedate"><img src={watch} className="icn_time" />{moment(curr.deadline_date).format("hh:mm A")}</p>
                                    <p className="timedate"><img src={calendar} className="icn_time" />{moment(curr.deadline_date).format("DD MMMM, YYYY")}</p>
                                  </td>
                                  {/* <td className="">
                                    <p className="trend_success"><BsArrowUp />50%</p>
                                  </td> */}
                                </tr>
                              )
                            })}
                          </tbody>
                        </table>
                      </div>
                    </div>
                  </Card> : param.type === "Broadcasted" ?
                    <Card className="tbl_crd">
                      <div className="">
                        <div className='d-flex justify-content-between align-items-center tbl_hdr' px='20px' mb='10px'>
                          <Typography className='tbl_hdng'>
                            Broadcasted Tasks
                          </Typography>
                          <div className="tbl_rt">
                            <div className="fltrs_prnt">
                              <Button className='sort_btn' onClick={() => { setOpenContentPuchased(true); }}>
                                Sort
                                <BsChevronDown />
                              </Button>
                              {openContentPuchased && <NewContentPurchasedOnline closeContPurchased={handleCloseContentPurchased} contentPurchasedSortFilterValues={newContentPurchasedValueHandler} />}
                            </div>
                          </div>
                        </div>
                        <div className="fix_ht_table">
                          <table width='100%' mx='20px' variant='simple' className="common_table">
                            <thead>
                              <tr>
                                <th className=''>Broadcasted tasks</th>
                                <th >Period</th>
                                <th >Number of tasks</th>
                                <th >Funds Invested</th>
                                {/* <th >Trend</th> */}
                              </tr>
                            </thead>
                            <tbody>
                              {taskDetails?.broad_casted_tasks_details?.task?.sort((a, b) => new Date(b.deadline_date) - new Date(a.deadline_date))?.map((curr) => {

                                const content = (curr?.content.length === 0 ? usric : curr?.content[0]?.media_type === "image" ? curr?.content[0]?.media :
                                  curr?.content[0]?.media_type === "video" ? curr?.content[0]?.videothubnail :
                                    curr?.content[0]?.media_type === "audio" ? audioic : "")

                                return (
                                  <tr key={curr?._id} onClick={() => navigate(`/broadcasted-taks/${curr?._id}`)} style={{cursor:"pointer"}}>
                                    <td className="content_img_td">
                                      <div className="tbl_cont_wrp">
                                        <img src={content} className="content_img" />
                                      </div>
                                    </td>

                                    <td className="timedate_wrap">
                                      <p className="timedate"><img src={calendar} className="icn_time" />   {moment(curr?.deadline_date).format(`DD MMMM YYYY`)} {moment(curr?.deadline_date).format(`hh:mm A`)}</p>
                                    </td>
                                    <td >
                                      {curr.content?.length}
                                    </td>
                                    <td >
                                      £ {curr?.interview_price + curr?.photo_price + curr?.videos_price}
                                    </td>
                                    {/* <td >
                                      <p className="trend_success"><BsArrowUp />50%</p>
                                    </td> */}
                                  </tr>
                                )
                              })}
                            </tbody>
                          </table>
                        </div>
                      </div>
                    </Card> : param.type === "content-sourced" ?
                      <Card className="tbl_crd">
                        <div className="">
                          <div
                            className="d-flex justify-content-between align-items-center tbl_hdr"
                            px="20px"
                            mb="10px">
                            <Typography className="tbl_hdng">
                              Content purchased from tasks
                            </Typography>
                            <div className="tbl_rt">
                              <div className="fltrs_prnt">
                                <Button className='sort_btn' onClick={() => { setOpenContentPuchased(true); }}>
                                  Sort
                                  <BsChevronDown />
                                </Button>
                                {openContentPuchased && <NewContentPurchasedOnline closeContPurchased={handleCloseContentPurchased} contentPurchasedSortFilterValues={newContentPurchasedValueHandler} />}
                              </div>
                            </div>
                          </div>
                          <div className="fix_ht_table">
                            <table
                              width="100%"
                              mx="20px"
                              variant="simple"
                              className="common_table">
                              <thead>
                                <tr>
                                  <th className="">Content</th>
                                  <th className='time_th'>Time & date</th>
                                  <th className="tsk_dlts">Task Details</th>
                                  <th className="tbl_icn_th">Type</th>
                                  <th className="tbl_icn_th catgr">Category</th>
                                  <th>Location</th>
                                  <th>Uploaded by</th>
                                  <th>Funds invested</th>
                                </tr>
                              </thead>
                              <tbody>{console.log('sourcedContent---->', sourcedContent)}
                                {
                                  sourcedContent?.map((curr) => {

                                    const content = (curr?.type === "image" ? curr?.imageAndVideo :
                                      curr?.type === "video" ? curr?.videothubnail :
                                        curr?.type === "audio" ? audioic : "")
                                    return (
                                      <tr key={curr?._id}>
                                        <td className="content_img_td">
                                          <div className="tbl_cont_wrp">
                                            <Link to={`/sourced-content-detail/${curr?._id}`} >

                                              <img src={process.env.REACT_APP_UPLOADED_CONTENT + content} className="content_img" />
                                            </Link>
                                            {/* <span className="cont_count">+2</span> */}
                                          </div>
                                        </td>
                                        <td className="timedate_wrap">
                                          <p className="timedate">
                                            <img src={watchic} className="icn_time" />
                                            {moment(curr?.createdAt).format(`hh:mm A`)}
                                          </p>
                                          <p className="timedate">
                                            <img src={calendar} className="icn_time" />
                                            {moment(curr?.createdAt).format(`DD MMMM YYYY`)}
                                          </p>
                                        </td>

                                        <td className="description_td">
                                          <p className='desc_ht'>
                                            {curr?.task_id?.task_description}
                                          </p>
                                        </td>
                                        <td className="text-center">
                                          {curr?.type === "image" ?
                                            <Tooltip title="Photo">
                                              <img
                                                src={cameraic}
                                                alt="Photo"
                                                className="icn"
                                              />
                                            </Tooltip> : curr?.type === "video" ?
                                              <Tooltip title="Video">
                                                <img
                                                  src={videoic}
                                                  alt="Photo"
                                                  className="icn"
                                                />
                                              </Tooltip> : curr?.type === "audio" ?
                                                <Tooltip title="Interview">
                                                  <img
                                                  src={typeInterviewwt}
                                                  alt="Photo"
                                                  className="icn"
                                                />
                                                </Tooltip>
                                                : "N/A"
                                          }

                                        </td>

                                        <td className="text-center">
                                          <Tooltip title="Photo">
                                            <img
                                              src={curr?.task_id?.category_id?.icon}
                                              alt="Exclusive"
                                              className="icn"
                                            />
                                          </Tooltip>
                                        </td>
                                        <td>
                                          {curr?.task_id?.location}
                                        </td>
                                        <td>
                                          <div className="hpr_dt">
                                            <img
                                              src={process.env.REACT_APP_AVATAR_IMAGE + curr?.hopper_details?.avatar_details?.avatar}
                                              alt="Hopper"
                                              className="big_img"
                                            />
                                            <p className="hpr_nme">
                                              <span className="txt_light">
                                                {curr?.hopper_details?.user_name}
                                              </span>
                                            </p>
                                          </div>
                                        </td>
                                        <td>£ {curr?.amount_paid}</td>
                                      </tr>
                                    )
                                  })
                                }

                              </tbody>
                            </table>
                          </div>
                        </div>
                      </Card>
                      : param.type === "fund-invested-today" ?
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
                                <div className="fltrs_prnt">
                                  <Button className='sort_btn' onClick={() => { setOpenContentPuchased(true); }}>
                                    Sort
                                    <BsChevronDown />
                                  </Button>
                                  {openContentPuchased && <NewContentPurchasedOnline closeContPurchased={handleCloseContentPurchased} contentPurchasedSortFilterValues={newContentPurchasedValueHandler} />}
                                </div>
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
                                    <th className="">Content</th>
                                    <th className='time_th_cstm'>Time & date</th>
                                    <th className="tsk_dlts">Task Details</th>
                                    <th className="tbl_icn_th">Type</th>
                                    <th className="tbl_icn_th licnc">License</th>
                                    <th className="tbl_icn_th catgr">Category</th>
                                    <th>Location</th>
                                    <th>Published by</th>
                                    <th>Nett price paid</th>
                                    <th>VAT paid</th>
                                    <th>Total funds invested</th>
                                  </tr>
                                </thead>
                                <tbody>
                                  {todayFund?.task && todayFund?.task.map((curr) => {
                                    const content = (curr?.type === "image" ? curr?.imageAndVideo :
                                      curr?.type === "video" ? curr?.videothubnail :
                                        curr?.type === "audio" ? audioic : "")
                                    return (
                                      <tr key={curr?._id}>
                                        <td className="content_img_td">
                                          <div className="tbl_cont_wrp">
                                            <img src={process.env.REACT_APP_UPLOADED_CONTENT + content} className="content_img" />
                                            {/* <span className="cont_count">+2</span> */}
                                          </div>
                                        </td>
                                        <td className="timedate_wrap">
                                          <p className="timedate">

                                            <p className="timedate"><img src={watch} className="icn_time" />{moment(curr?.createdAt).format("hh:mm A")}</p>
                                          </p>
                                          <p className="timedate">
                                            <p className="timedate"><img src={calendar} className="icn_time" />{moment(curr?.createdAt).format("DD MMMM, YYYY")}</p>
                                          </p>
                                        </td>
                                        <td className="description_td">
                                          <p className='desc_ht'>
                                            {curr?.task_id?.task_description}
                                          </p>
                                        </td>
                                        <td className="text-center">
                                          {curr?.type === "image" ?
                                            <Tooltip title="Photo">

                                              <img
                                                src={cameraic}
                                                alt="Photo"
                                                className="icn"
                                              /> </Tooltip> : curr?.type === "video" ?
                                              <Tooltip title="Video">
                                                <img
                                                  src={videoic}
                                                  alt="Photo"
                                                  className="icn"
                                                /> </Tooltip> : curr?.type === "audio" ?
                                                // "audio"
                                                <Tooltip title="Interview">
                                                  <img
                                                    src={interviewic}
                                                    alt="Interview"
                                                    className="icn"
                                                  /> </Tooltip>
                                                : "N/A"
                                          }

                                        </td>
                                        <td className="text-center">
                                          {
                                            curr?.task_id?.type === "shared" ?
                                              <Tooltip title="Shared">
                                                <img
                                                  src={sharedic}
                                                  alt="shared"
                                                  className="icn"
                                                />
                                              </Tooltip>
                                              :
                                              <Tooltip title="Exclusive">
                                                <img
                                                  src={exclusiveic}
                                                  alt="Exclusive"
                                                  className="icn"
                                                />
                                              </Tooltip>
                                          }

                                        </td>
                                        <td className="text-center">
                                          {/* <Tooltip defaultValue={curr?.task_id?.category_id?.name}>
                                              </Tooltip> */}
                                          <Tooltip title={curr?.task_id?.category_id?.name}>
                                            <img
                                              src={curr?.task_id?.category_id?.icon}
                                              alt={curr?.task_id?.category_id?.name}
                                              className="icn"
                                            />
                                          </Tooltip>
                                        </td>

                                        <td>
                                          {curr?.task_id?.location}
                                        </td>
                                        <td>
                                          <div className="hpr_dt">
                                            <img
                                              src={process.env.REACT_APP_AVATAR_IMAGE + curr?.hopper_id?.avatar_id?.avatar}
                                              alt="Hopper"
                                              className="big_img"
                                            />
                                            <p className="hpr_nme">
                                              {/* {`${curr?.hopper_id?.first_name} ${curr?.hopper_id?.last_name}`}
                                              <br /> */}
                                              <span className="txt_light">
                                                {curr?.hopper_id?.user_name}
                                              </span>
                                            </p>
                                          </div>
                                        </td>
                                        <td>£ {curr?.totalamountpaid - curr?.Vat ?? "0"}</td>
                                        <td>£ {curr?.Vat ?? "0"}</td>
                                        <td>£ {curr?.totalamountpaid ?? "0"}</td>
                                      </tr>
                                    )
                                  })
                                  }


                                </tbody>
                              </table>
                            </div>
                          </div>
                        </Card>
                        : param.type === "total-fund-invested" ?
                          <Card className="tbl_crd overflow_auto">
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
                                  <div className="fltrs_prnt">
                                    <Button className='sort_btn' onClick={() => { setOpenContentPuchased(true); }}>
                                      Sort
                                      <BsChevronDown />
                                    </Button>
                                    {openContentPuchased && <NewContentPurchasedOnline closeContPurchased={handleCloseContentPurchased} contentPurchasedSortFilterValues={newContentPurchasedValueHandler} />}
                                  </div>
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
                                      <th className="">Content</th>
                                      <th>Period</th>
                                      <th>Nett price paid</th>
                                      <th>VAT paid</th>
                                      <th>Total funds invested</th>
                                    </tr>
                                  </thead>
                                  <tbody>
                                    <tr>
                                      <td className="content_wrap more_contnt_wrap">
                                        <div className="content_imgs_wrap">
                                          <div className="content_imgs">
                                            {totalFund?.data && totalFund?.data.map((curr) => {
                                              const content = (curr?.type === "image" ? curr?.imageAndVideo :
                                                curr?.type === "video" ? curr?.videothubnail :
                                                  curr?.type === "audio" ? audioic : "")
                                              return (
                                                <Link to="/Sourced-Content" >
                                                  <img src={process.env.REACT_APP_UPLOADED_CONTENT + content} className="content_img" />
                                                </Link>
                                              )

                                            })}



                                            {/* <img src={contimg3} className="content_img" />
                                            <img src={contimg3} className="content_img" /> */}
                                          </div>

                                          <div className="content_imgs">
                                            {/* <img src={contimg3} className="content_img" />
                                            <img src={contimg3} className="content_img" /> */}

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
                                          <img src={calendar} className="icn_time" />
                                          March 2023
                                        </p>
                                      </td>

                                      <td>£ {totalFund?.task && totalFund?.task[0]?.totalamountpaid - totalFund?.task[0]?.vat}</td>
                                      <td>£ {totalFund?.task && totalFund?.task[0]?.vat}</td>
                                      <td>£ {totalFund?.task && totalFund?.task[0]?.totalamountpaid}</td>

                                    </tr>
                                  </tbody>
                                </table>
                              </div>
                            </div>
                          </Card>
                          : param.type === "hopper-used" ?
                            <Card className="tbl_crd">
                              <div className="">
                                <div
                                  className="d-flex justify-content-between align-items-center tbl_hdr"
                                  px="20px"
                                  mb="10px"
                                >
                                  <Typography className="tbl_hdng">
                                    Hoppers used for tasks
                                  </Typography>
                                  <div className="tbl_rt">
                                    <div className="fltrs_prnt">
                                      <Button className='sort_btn' onClick={() => { setOpenContentPuchased(true); }}>
                                        Sort
                                        <BsChevronDown />
                                      </Button>
                                      {openContentPuchased && <NewContentPurchasedOnline closeContPurchased={handleCloseContentPurchased} contentPurchasedSortFilterValues={newContentPurchasedValueHandler} />}
                                    </div>
                                  </div>
                                </div>
                                <div className="fix_ht_table">
                                  <table
                                    width="100%"
                                    mx="20px"
                                    variant="simple"
                                    className="common_table hprs_usd les_colm"
                                  >
                                    <thead>
                                      <tr>
                                        <th className="">Hopper</th>
                                        <th className="tsk_dlts">Task Details</th>
                                        <th>Broadcasted time & date</th>
                                        <th>Location</th>
                                        <th>Uploaded content</th>
                                      </tr>
                                    </thead>
                                    <tbody>


                                      {
                                        taskDetails && taskDetails?.hopper_used_for_tasks?.task.map((curr) => {
                                          return (
                                            <tr>
                                              <td>
                                                <div className="hpr_dt">
                                                  <img
                                                    src={process.env.REACT_APP_AVATAR_IMAGE + (curr?.task_details?.hopper_details[0]?.avatar_details?.length > 0 && curr?.task_details?.hopper_details[0]?.avatar_details[0]?.avatar)}
                                                    alt="Hopper"
                                                    className="big_img"
                                                  />
                                                  <p className="hpr_nme">
                                                    {/* {`${curr?.task_details?.hopper_details[0]?.first_name ?? ""} ${curr?.task_details?.hopper_details[0]?.last_name ?? ""}`}
                                                    <br /> */}
                                                    {curr?.task_details?.hopper_details[0]?.user_name}
                                                    {/* <span className="txt_light">
                                                      ({curr?.task_details?.hopper_details[0]?.user_name})
                                                    </span> */}
                                                    {
                                                      curr?.task_details?.hopper_details[0]?.category == "pro" ? <img src={proIcn} className='proIcn' alt="" srcset="" /> : null
                                                    }
                                                  </p>
                                                </div>
                                              </td>

                                              <td className="description_td">
                                                <p className='desc_ht'>
                                                  {curr?.task_details?.task_description}
                                                </p>
                                              </td>
                                              <td className="timedate_wrap">
                                                <p className="timedate">
                                                  <img src={watchic} className="icn_time" />
                                                  {moment(curr?.task_details?.createdAt).format(`hh:mm A`)}
                                                </p>
                                                <p className="timedate">
                                                  <img src={calendar} className="icn_time" />
                                                  {moment(curr?.task_details?.createdAt).format(`DD MMMM YYYY`)}
                                                </p>
                                              </td>
                                              <td>
                                                {curr?.task_details?.location}
                                              </td>
                                              <td className="content_wrap more_contnt_wrap">
                                                <div className="content_imgs_wrap">
                                                  <div className="content_imgs" onClick={() => navigate(`/Uploaded-Content/uploadedhopper_${curr?.task_details?.hopper_details[0]?._id}`)}>
                                                    {
                                                      curr?.records && curr?.records.slice(0, 4).map((curr) => {
                                                        return (
                                                          curr?.type === "image" ?
                                                            <img src={process.env.REACT_APP_UPLOADED_CONTENT + curr.imageAndVideo} className="content_img" />
                                                            : curr?.type === "video" ?
                                                              <img src={process.env.REACT_APP_UPLOADED_CONTENT + curr.videothubnail} className="content_img" />
                                                              : curr?.type === "audio" ?
                                                                <img src={audioic} className="content_img" />
                                                                : "N/A"
                                                        )
                                                      })

                                                    }

                                                  </div>
                                                  <Link to={`/Uploaded-Content/uploadedhopper_${curr?.task_details?.hopper_details[0]?._id}`} className='txtBlack'>
                                                    <div className="content_imgs">
                                                      <BsEye />
                                                      <span className="text-pink txt_mdm">
                                                        View content
                                                      </span>
                                                    </div>
                                                  </Link>

                                                </div>
                                              </td>
                                            </tr>
                                          )
                                        })

                                      }

                                    </tbody>
                                  </table>
                                </div>
                              </div>
                            </Card> :
                            <Card className="tbl_crd">
                              <div className="">
                                <div
                                  className="d-flex justify-content-between align-items-center tbl_hdr"
                                  px="20px"
                                  mb="10px"
                                >
                                  <Typography className="tbl_hdng">Deadline met</Typography>
                                  <div className="tbl_rt">
                                    <div className="fltrs_prnt">
                                      <Button className='sort_btn' onClick={() => { setOpenContentPuchased(true); }}>
                                        Sort
                                        <BsChevronDown />
                                      </Button>
                                      {openContentPuchased && <NewContentPurchasedOnline closeContPurchased={handleCloseContentPurchased} contentPurchasedSortFilterValues={newContentPurchasedValueHandler} />}
                                    </div>
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
                                        <th className="">Broadcasted tasks</th>
                                        <th>Broadcasted time</th>
                                        <th>Deadline</th>
                                        <th>Content uploaded time</th>
                                        <th>Delay (+/-)</th>
                                        {/* <th>Trend</th> */}
                                      </tr>
                                    </thead>
                                    <tbody>
                                      {
                                        taskDetails && taskDetails?.deadline_met?.data.map((curr) => {
                                          return (
                                            <tr onClick={() => navigate(`/broadcasted-taks/${curr?._id}`)} style={{cursor:"pointer"}} >

                                              <td className="content_img_td">
                                                <Link>
                                                  <div className="mapInput td_mp" onClick={() => navigate(`/broadcasted-taks/${curr?._id}`)} style={{cursor:"pointer"}}>
                                                    <style>{`
                                                      .gm-style > div:first-child {
                                                        cursor: pointer !important;
                                                      }
                                                    `}
                                                    </style>
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

                                              <td className="timedate_wrap">
                                                <p className="timedate">
                                                  <img src={watchic} className="icn_time" />
                                                  {moment(curr.createdAt).format("hh:mm a")}
                                                </p>
                                                <p className="timedate">
                                                  <img src={calendar} className="icn_time" />
                                                  {moment(curr.createdAt).format("DD MMMM, YYYY")}
                                                </p>
                                              </td>
                                              <td className="timedate_wrap">
                                                <p className="timedate">
                                                  <img src={watchic} className="icn_time" />
                                                  {moment(curr.deadline_date).format("hh:mm a")}
                                                </p>
                                                <p className="timedate">
                                                  <img src={calendar} className="icn_time" />
                                                  {moment(curr.deadline_date).format("DD MMMM, YYYY")}
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
                                              {/* <td>
                                                <p className="trend_success">
                                                  <BsArrowUp />
                                                  {taskDetails?.deadline_met?.percentage}%
                                                </p>
                                              </td> */}
                                            </tr>
                                          )
                                        })

                                      }

                                    </tbody>
                                  </table>
                                </div>
                              </div>
                            </Card>

                }
              </div>

              {/* <div> */}

              {/* Content sourced from tasks Start */}
              {/* <Card className="tbl_crd">
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
                            <th className="">Content sourced from tasks</th>
                            <th>Time & date</th>
                            <th className="tsk_dlts">Task Details</th>
                            <th className="tbl_icn_th">Type</th>
                            <th className="tbl_icn_th licnc">License</th>
                            <th className="tbl_icn_th catgr">Category</th>
                            <th>Location</th>
                            <th>Uploaded by</th>
                            <th>Funds invested</th>
                          </tr>
                        </thead>
                        <tbody>
                          <tr>
                            <td className="content_img_td">
                              <div className="tbl_cont_wrp">
                                <img src={contimg3} className="content_img" />
                                <span className="cont_count">+2</span>
                              </div>
                            </td>
                            <td className="timedate_wrap">
                              <p className="timedate">
                                <img src={watchic} className="icn_time" />
                                05:45 PM
                              </p>
                              <p className="timedate">
                                <img src={calendar} className="icn_time" />
                                10 Feb, 2023
                              </p>
                            </td>
                            <td className="description_td">
                              Lorem ipsum dolor sit amet consectetur adipisicing
                              elit. Necessitatibus, praesentium!
                            </td>
                            <td className="text-center">
                              <img src={cameraic} alt="Photo" className="icn" />
                            </td>
                            <td className="text-center">
                              <img
                                src={exclusiveic}
                                alt="Exclusive"
                                className="icn"
                              />
                            </td>
                            <td className="text-center">
                              <img
                                src={celebrity}
                                alt="Exclusive"
                                className="icn"
                              />
                            </td>
                            <td>
                              5 Canada Square <br />
                              Canary Wharf <br />
                              London <br />
                              E14 5AQ
                            </td>
                            <td>
                              <div className="hpr_dt">
                                <img
                                  src={hprimg1}
                                  alt="Hopper"
                                  className="big_img"
                                />
                                <p className="hpr_nme">
                                  Janet Morrison
                                  <br />
                                  <span className="txt_light">
                                    (Pseudonymous)
                                  </span>
                                </p>
                              </div>
                            </td>
                            <td>£ 700</td>
                          </tr>
                        </tbody>
                      </table>
                    </div>
                  </div>
                </Card> */}
              {/* Content sourced from tasks End */}

              {/* Funds invested today start */}

              {/* Funds invested today End */}

              {/* Total Funds invested start */}

              {/* Total Funds invested End */}


              {/* Hoppers used for tasks start */}

              {/* Hoppers used for tasks End */}

              {/* Deadline time Start */}

              {/* Deadline time End */}
              {/* </div> */}
            </Col>
          </Row>
        </Container>
      </div >
    </>
  )
}

export default Tasktables