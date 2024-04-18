import React, { memo, useEffect, useState } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import { Row, Col, Container, Form } from "react-bootstrap";
import { Card, Typography, Button, Tooltip } from "@mui/material";
import {
  BsArrow90DegUp,
  BsArrowBarUp,
  BsArrowDown,
  BsArrowLeft,
  BsArrowRight,
  BsArrowUp,
  BsChevronDown,
  BsEye,
} from "react-icons/bs";
// import audioic from "../assets/images/audio-icon.svg";
import audioic from "../assets/images/audimg.svg";

import sharedic from '../assets/images/shared.svg';
import watch from "../assets/images/watch.svg";
import calendar from "../assets/images/calendar.svg";
import usric from "../assets/images/menu-icons/user.svg";
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
import { Get, Post } from "../services/user.services";
import moment from "moment/moment";
import { GoogleMap, LoadScript, Marker } from "@react-google-maps/api";
// import contimg1 from "../assets/images/Contentdetail/content1.svg";
// import contimg2 from "../assets/images/Contentdetail/content2.svg";
import contimg3 from "../assets/images/Contentdetail/content3.png";
import watchic from "../assets/images/watch.svg";
import cameraic from "../assets/images/camera.svg";
import exclusiveic from "../assets/images/exclusive.svg";
import crimeic from "../assets/images/sortIcons/crime.svg";
import hprimg1 from "../assets/images/avatars/usrimg1.svg";
import hprimg2 from "../assets/images/avatars/usrimg2.svg";
import hprimg3 from "../assets/images/avatars/usrimg3.svg";
import contentic from "../assets/images/content.svg";
import taskic from "../assets/images/task.svg";
import Fundsinvested from "./Sortfilters/Dashboard/Fundsinvested";
import BroadcastedTask from "./Sortfilters/Dashboard/BroadcastedTask";
import Purchasedcontent from "./Sortfilters/Dashboard/PurchasedCont"
import audimgsm from "../assets/images/audimgsmall.svg";
import docsic from "../assets/images/docsic.svg";
import Loader from "./Loader";

const DashboardTables = () => {
  const navigate = useNavigate()

  const param = useParams()
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState()
  const [dataset, setDatadata] = useState([])

  // Content Purchased Online-
  const [openContentPuchased, setOpenContentPuchased] = useState(false);
  const handleCloseContentPurchased = (values) => {
    setOpenContentPuchased(values)
  }

  // Broadcast task-
  const [openBroadcastTask, setOpenBroadcastTask] = useState(false);
  const handleCloseBroadcastTask = (values) => {
    setOpenBroadcastTask(values)
  }

  // Funds Invested-
  const [openFundsInvested, setOpenFundsInevested] = useState(false);
  const handleCloseFundsInvested = (values) => {
    setOpenFundsInevested(values)
  }

  const [filterSortField, setFilterSortField] = useState("");
  const [filterSortValue, setFilterSortValue] = useState("");
  const [filterType, setFilterType] = useState("");

  // Funds Time Value Handler-
  const fundsTimeValuesHandler = (value) => {
    setFilterSortField(value.field);
    setFilterSortValue(value.values);
    setFilterType(value.type);
  }

  // Content Purchased Value Handler
  const handlePurchasedContentValue = (value) => {
    setFilterSortField(value.field);
    setFilterSortValue(value.values);
  }

  // Broadcast Value Handler-
  const handleBroadcastValue = (value) => {
    // console.log("handleFavouriteComponentValues", value)
    setFilterSortField(value.field);
    setFilterSortValue(value.values);
    setFilterType(value.type);
  }

  // console.log("filterSortField, filterSortValue", filterSortField, filterSortValue)

  const getData = async () => {
    try {
      const res = await Post(`mediaHouse/dashboard/Count`, {
        [filterSortField]: filterSortValue
      });
      if (res) {
        setData(res?.data)
        // console.log('res', res?.data?.total_fund_invested?.data)
        setDatadata(res?.data?.total_fund_invested?.data)
      }
    } catch (error) {
    }
  }

  useEffect(() => {
    getData()
    //  const a ="2023-08-19T08:29:33.118Z"
    //  console.log(moment(a).format("DD MMMM, YYYY"))
  }, [filterSortValue])


  // data for Content purchased online

  const [contentOnline, setContentOnline] = useState()

  const getDetailData = async () => {
    try {
      setLoading(true);
      const resp = await Get(`mediaHouse/Content/Count${filterSortField ? `?${filterSortField}=${filterSortValue || ''}` : ''}`);
      if (resp) {
        // console.log(resp, `<----there are many bugs`)
        setContentOnline(resp?.data?.content_online)
        setLoading(false);
      }

    } catch (error) {
      setLoading(false);
    }
  }
  useEffect(() => {
    getDetailData()
  }, [filterSortValue])

  const Navigate = () => {
    navigate(`/published-content`)
    // console.log('test')
  }


  // Purchased content 
  const purchasedContent = async () => {
    try {
      const resp = await Post(`mediaHouse/getContensLists`)
      if (resp) {
        // console.log(resp, `<---this is purchased contetn`)
      }
    } catch (error) {

    }
  }

  useEffect(() => {
    purchasedContent()

  }, [])





  return (
    <>
      {/* {console.log(contentOnline, `<----what is this`)} */}
      {
        loading && <Loader />
      }
      <Header />
      <div className="page-wrap feed-detail tasktables_wrap dshbrd_tables">
        <Container fluid className="p-0">
          <Row>
            <Col md={12}>
              <div className="">
                <Link className="back_link mb-3">
                  <Link className='back_link mb-3' onClick={() => history.back()}><BsArrowLeft className='text-pink' /> Back </Link>
                </Link>
              </div>
              <div className="tbl_wrap_cmn">
                {/* Funds invested today start */}
                {
                  param.type === "fund_invested" ?

                    <Card className="tbl_crd">
                      <div className="">
                        <div
                          className="d-flex justify-content-between align-items-center tbl_hdr"
                          px="20px"
                          mb="10px">
                          <Typography className="tbl_hdng">
                            Total funds invested
                          </Typography>
                          <div className="tbl_rt">
                            {/* <Form.Group className="globalSort">
                              <Form.Select>
                                <option>Daily</option>
                                <option>Monthly</option>
                                <option>Yearly</option>
                              </Form.Select>
                            </Form.Group> */}
                            <div className="fltrs_prnt">
                              <Button className='sort_btn' onClick={() => { setOpenFundsInevested(true); }}>
                                Sort
                                <BsChevronDown />
                              </Button>
                              {openFundsInvested && <Fundsinvested rangeTimeValues={fundsTimeValuesHandler} closeSortComponent={handleCloseFundsInvested} />}
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
                                <th>Time & date</th>
                                <th className="tbl_icn_th">Kind</th>
                                <th className="tbl_icn_th">Type</th>
                                <th className="tbl_icn_th licnc">License</th>
                                <th className="tbl_icn_th catgr">Category</th>
                                <th className="loc_th">Location</th>
                                <th>Nett Price paid</th>
                                <th>VAT paid</th>
                                <th>Total funds invested</th>
                              </tr>
                            </thead>
                            <tbody>
                              {dataset.map((data, index) => {
                                const contentArray = data?.content_ids[0]?.content;
                                const audio = contentArray?.filter(item => item.media_type === "audio") || [];
                                const video = contentArray?.filter(item => item.media_type === "video") || [];
                                const image = contentArray?.filter(item => item.media_type === "image") || [];
                                const Doc = contentArray?.filter(item => item.media_type === "pdf" || "doc") || [];

                                return (
                                  <tr>
                                    <td className="content_img_td">

                                      <Link to={data?.type === "content" ? `/purchased-content-detail/${data?._id}` : `task-details/${data?._id}`}>

                                        <div className="tbl_cont_wrp">
                                          <img src={
                                            data?.content_ids[0]?.content[0]?.media_type == 'image' ?
                                              data?.content_ids[0]?.content[0]?.watermark || process.env.REACT_APP_CONTENT_MEDIA + data?.content_ids[0]?.content[0]?.media :
                                              data?.content_ids[0]?.content[0]?.media_type == 'video' ?
                                                data?.content_ids[0]?.content[0]?.watermark || process.env.REACT_APP_CONTENT_MEDIA + data?.content_ids[0]?.content[0]?.thumbnail
                                                : data?.content_ids[0]?.content[0]?.media_type == 'audio' ? audimgsm
                                                  : data?.content_ids[0]?.content[0]?.media_type == 'pdf' || 'doc' ? docsic : null
                                          }
                                            className="content_img" />
                                          {
                                            data?.content_ids[0]?.content.lenght === 1 &&
                                            <span className="cont_count">+{data?.content_ids[0]?.content.lenght - 1}</span>
                                          }
                                        </div>
                                      </Link>

                                    </td>
                                    <td className="timedate_wrap">
                                      <p className="timedate">
                                        <img src={watchic} className="icn_time" />
                                        {moment(data?.updatedAt).format("hh:mm A")}
                                      </p>
                                      <p className="timedate">
                                        <img src={calendar} className="icn_time" />
                                        {moment(data?.updatedAt).format("DD MMMM, YYYY")}
                                      </p>
                                    </td>
                                    <td className="text-center">
                                      <div className="d-flex align-items-center gap-2">
                                        <Tooltip title={data.type == 'content' ? "Content" : "Task"}>
                                          <img src={data.type == 'content' ? contentic : taskic} alt="Content" className="icn" />
                                        </Tooltip>
                                      </div>
                                    </td>

                                    <td className="text-center">
                                          <div className=" d-flex flex-column gap-2">
                                            {image.length > 0 && <Tooltip title="Photo">
                                              <img src={cameraic} alt="Photo" className="icn m-auto" /> </Tooltip>}
                                            {video.length > 0 && <Tooltip title="Video">
                                              <img src={videoic} alt="Video" className="icn m-auto" /></Tooltip>}
                                            {audio.length > 0 && <Tooltip title="Audio">
                                              <img src={interviewic} alt="Audio" className="icn m-auto" /></Tooltip>}
                                          </ div>
                                        </td>

                                    <td className="text-center">
                                      <Tooltip title={data?.content_ids[0]?.type === "shared" ? "Shared" : "Exclusive"}>
                                        <img
                                          src={data?.content_ids[0]?.type === "shared" ? sharedic : exclusiveic}
                                          alt="Exclusive"
                                          className="icn"
                                        />
                                      </Tooltip>
                                    </td>
                                    <td className="text-center">
                                      <Tooltip title={data?.content_ids[0]?.category_ids[0]?.name}>
                                        <img
                                          src={data?.content_ids[0]?.category_ids[0]?.icon}
                                          alt="Exclusive"
                                          className="icn"
                                        />
                                      </Tooltip>
                                    </td>

                                    <td>{data?.content_ids[0]?.location}</td>
                                    <td>£ {data.amount - data.Vat}</td>
                                    <td>£ {data.Vat}</td>
                                    <td>£ {data.amount}</td>
                                  </tr>
                                );
                              })}
                            </tbody>
                          </table>
                        </div>
                      </div>
                    </Card> : param.type === "broadcasted_task" ?
                      <Card className="tbl_crd">
                        <div className="">
                          <div
                            className="d-flex justify-content-between align-items-center tbl_hdr"
                            px="20px"
                            mb="10px"
                          >
                            <Typography className="tbl_hdng">
                              Broadcasted Tasks
                            </Typography>
                            <div className="tbl_rt">
                              <div className="fltrs_prnt">
                                <Button className='sort_btn' onClick={() => { setOpenBroadcastTask(true); }} >
                                  Sort
                                  <BsChevronDown />
                                </Button>
                                {openBroadcastTask && <BroadcastedTask closeBroadcastTask={handleCloseBroadcastTask} rangeTimeBroadcastValue={handleBroadcastValue} />}
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
                                  <th className="time_th">Broadcasted time</th>
                                  <th className="time_th">Deadline</th>
                                  <th className="time_th">Purchase time</th>
                                  <th className="loc_th">Location</th>
                                  <th className="tsk_dlts">Task details</th>
                                  <th className="tbl_icn_th">Type</th>
                                  {/* <th className="tbl_icn_th licnc">License</th> */}
                                  <th className="tbl_icn_th catgr">Category</th>
                                  <th>Uploaded by</th>
                                  <th>Amount paid</th>
                                </tr>
                              </thead>
                              <tbody>
                                {data?.broad_casted_tasks_details && data?.broad_casted_tasks_details?.task.map((curr) => {
                                  return (
                                    <tr onClick={() => navigate(`/broadcasted-taks/${curr?._id}`)} style={{cursor:"pointer"}}>
                                      <td className="content_img_td">
                                        <Link>
                                          <div className="tbl_cont_wrp">
                                            {curr?.content.length === 0 ? <img src={usric} className="content_img" /> :
                                              <>
                                                {curr?.content[0]?.media_type === "image" ?
                                                  <img src={curr?.content[0]?.media} className="content_img" />
                                                  : curr?.content[0]?.media_type === "video" ? <img src={curr?.content[0]?.thumbnail} className="content_img" />
                                                    : curr?.content[0]?.media_type === "audio" ? audioic : ""}
                                                {/* <img src={contimg3} className="content_img" /> */}
                                                <span className="cont_count">{curr?.content.length}</span>
                                              </>
                                            }
                                          </div>
                                        </Link>
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
                                      <td className="timedate_wrap">
                                        <p className="timedate">
                                          <img src={watchic} className="icn_time" />
                                          {moment(curr?.deadline_date).format(`hh:mm A`)}
                                        </p>
                                        <p className="timedate">
                                          <img src={calendar} className="icn_time" />
                                          {moment(curr?.deadline_date).format(`DD MMMM YYYY`)}
                                        </p>
                                      </td>
                                      <td className="timedate_wrap">
                                        <p className="timedate">
                                          <img src={watchic} className="icn_time" />
                                          {moment(curr?.updatedAt).format(`hh:mm A`)}
                                        </p>
                                        <p className="timedate">
                                          <img src={calendar} className="icn_time" />
                                          {moment(curr?.updatedAt).format(`DD MMMM YYYY`)}
                                        </p>
                                      </td>
                                      <td>
                                        <p className="desc_ht">
                                          {curr?.location}
                                        </p>
                                      </td>
                                      <td className="description_td">
                                        <p className="desc_ht">
                                          {curr?.task_description}
                                        </p>
                                      </td>

                                      <td className="text-center">
                                        {curr?.need_photos === true ?
                                          <Tooltip title="Photo">
                                            <img src={cameraic} alt="Photo" className="icn" /> </Tooltip> : ""}
                                        <br />
                                        {curr?.need_videos === true ? <Tooltip title="Video">
                                          <img src={videoic} alt="Video" className="icn" /> </Tooltip> : ""}
                                        <br />
                                        {curr?.need_interview === true ? <Tooltip title="Interview">
                                          <img src={interviewic} alt="Interview" className="icn" /></Tooltip> : ""}
                                      </td>
                                      {/* <td className="text-center">
                                        {
                                          curr?.type === "shared" ?
                                            <Tooltip title="Shared">
                                              <img
                                                src={sharedic}
                                                alt="shared"
                                                className="icn" /> </Tooltip> :
                                            <Tooltip title="Exclusive">
                                              <img
                                                src={exclusiveic}
                                                alt="Exclusive"
                                                className="icn" />
                                            </Tooltip>
                                        }
                                      </td> */}
                                      <td className="text-center">
                                        <Tooltip title={curr?.category_id?.name}>
                                          <img className="icn" src={curr?.category_id?.icon} />
                                        </Tooltip>

                                      </td>
                                      <td>
                                        {curr?.hopper_id &&
                                          <div className="hpr_dt">
                                            {/* 
                                            <img
                                              src={hprimg1}
                                              alt="Hopper"
                                              className="big_img"
                                            /> */}

                                            <p className="hpr_nme">
                                              {curr?.hopper_id?.user_name}
                                            </p>
                                          </div>}
                                      </td>
                                      <td>
                                        {curr?.paid_status === "unpaid" ? "no fund invested" : "fund invested "}

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
                            mb="10px">
                            <Typography className="tbl_hdng">
                              Content purchased online
                            </Typography>
                            <div className="tbl_rt">
                              <div className="fltrs_prnt">
                                <Button className='sort_btn' onClick={() => { setOpenContentPuchased(true); }} >
                                  Sort
                                  <BsChevronDown />
                                </Button>
                                {openContentPuchased && <Purchasedcontent closeContentPurchased={handleCloseContentPurchased} rangeTimeValuesPurchasedContent={handlePurchasedContentValue} />}
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
                                  <th className="">Content purchased online</th>
                                  <th>Time & date</th>
                                  <th className="tsk_dlts">Description</th>
                                  <th className="tbl_icn_th">Type</th>
                                  <th className="tbl_icn_th licnc">License</th>
                                  <th className="tbl_icn_th catgr">Category</th>
                                  <th>Location</th>
                                  <th>Published by</th>
                                  <th>Asking price</th>
                                  <th>Amount paid</th>
                                </tr>
                              </thead>
                              <tbody>
                                {
                                  contentOnline && contentOnline?.task.map((curr) => {

                                    const contentArray = curr?.content_id?.content;
                                    const audio = contentArray?.filter(item => item.media_type === "audio") || [];
                                    const video = contentArray?.filter(item => item.media_type === "video") || [];
                                    const image = contentArray?.filter(item => item.media_type === "image") || [];
                                    const Doc = contentArray?.filter(item => item.media_type === "pdf" || "doc") || [];



                                    const contentSource =
                                      curr?.content_id &&
                                        curr.content_id.content[0]
                                        ? curr.content_id.content[0].media_type === "video"
                                          ? curr.content_id.content[0].watermark ||
                                          process.env.REACT_APP_CONTENT_MEDIA + curr.content_id.content[0].thumbnail
                                          : curr.content_id.content[0].media_type === "audio"
                                            ? audimgsm
                                            : curr.content_id.content[0].media_type === "image"
                                              ? curr.content_id.content[0].watermark ||
                                              process.env.REACT_APP_CONTENT_MEDIA + curr.content_id.content[0].media
                                              : curr.content_id.content[0].media_type === "doc"
                                                ? docsic
                                                : null
                                        : null;


                                    return (
                                      <tr>
                                        <td className="content_img_td" >
                                          <Link to={`/purchased-content-detail/${curr?._id}`}>
                                            <div className="tbl_cont_wrp">
                                              <img src={contentSource} className="content_img" />
                                              <span className="cont_count">
                                                {curr?.content_id && `${curr?.content_id?.content?.length}`}
                                              </span>
                                            </div>

                                          </Link>

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
                                          <p className="desc_ht">
                                            {curr?.content_id && curr?.content_id?.description}
                                          </p>
                                        </td>
                                        <td className="text-center">
                                          <div className=" d-flex flex-column gap-2">
                                            {image.length > 0 && <Tooltip title="Photo">
                                              <img src={cameraic} alt="Photo" className="icn m-auto" /> </Tooltip>}
                                            {video.length > 0 && <Tooltip title="Video">
                                              <img src={videoic} alt="Video" className="icn m-auto" /></Tooltip>}
                                            {audio.length > 0 && <Tooltip title="Audio">
                                              <img src={interviewic} alt="Audio" className="icn m-auto" /></Tooltip>}
                                            {/* {Doc.length > 0 && <Tooltip title="Pdf">
                                              <img src={docsic} alt="Audio" className="icn m-auto" /></Tooltip>} */}
                                          </ div>
                                        </td>

                                        <td className="text-center">
                                          {curr?.content_id && curr?.content_id?.type === "shared" ? (
                                            <Tooltip title="Shared">
                                              <img src={sharedic} alt="shared" className="icn" />
                                            </Tooltip>
                                          ) : curr?.content_id && curr?.content_id?.type === "exclusive" ? (
                                            <Tooltip title="Exclusive">
                                              <img src={exclusiveic} alt="Exclusive" className="icn" />
                                            </Tooltip>
                                          ) : null}
                                        </td>
                                        <td className="text-center">
                                          <Tooltip title={curr.content_id?.category_id?.name}>
                                              <img src={curr.content_id?.category_id?.icon} alt="shared" className="icn" />
                                            </Tooltip>
                                        </td>
                                        <td>
                                          {curr.content_id?.location}
                                        </td>
                                        <td>
                                          <div className="hpr_dt">
                                            <img
                                              src={process.env.REACT_APP_AVATAR_IMAGE + curr?.content_id?.hopper_id.avatar_id?.avatar}
                                              alt="Hopper"
                                              className="big_img"
                                            />
                                            <p className="hpr_nme">
                                              {/* {`${curr?.content_id?.hopper_id?.first_name} ${curr?.content_id?.hopper_id?.last_name}`} */}
                                              {curr?.content_id && curr?.content_id?.hopper_id?.user_name}
                                              {/* <br /> */}
                                              {/* <span className="txt_light">
                                              </span> */}
                                            </p>
                                          </div>
                                        </td>
                                        <td>£ {curr?.content_id && curr.content_id?.ask_price}</td>
                                        <td>£ {curr?.amount}</td>
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
            </Col>
          </Row>
        </Container>
      </div>
    </>
  );
};

export default memo(DashboardTables);
