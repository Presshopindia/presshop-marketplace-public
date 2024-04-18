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
import share from "../assets/images/share.png";
// import audioic from "../assets/images/audimgsmall.svg";
import audioic from "../assets/images/audimg.svg";

import Loader from "./Loader";

const ReportsTablesContent = () => {
  const [loading, setLoading] = useState(false)

  const [data, setData] = useState()
  const [vatData, setVat] = useState()
  const params = useParams()

  // console.log(params, `<----these are from content `)

  const getVatSummary = async (paramName, param) => {
    setLoading(true)
    try {
      const res = await Get(`mediahouse/vatforaccount?${paramName}=${param}`);
      if (res) {
        setVat(res?.data?.response)
        setLoading(false)
      }
    } catch (error) {
      setLoading(false)
    }
  }


  const getDetailData = async () => {
    setLoading(true)
    try {
      const res = await Get(`mediaHouse/report/count`);
      if (res) {
        setData(res?.data)
        // console.log(res, `<-----this is 0000000000`)
        setLoading(false)
      }

    } catch (error) {
      setLoading(loading)
    }
  }

  const [categories, setCategories] = useState()
  const getCategories = async (param) => {
    const paramName = param
    setLoading(true)

    try {
      const resp = await Get(`mediaHouse/report/content/category?${paramName}=${param}`)
      setCategories(resp?.data?.data)
      setLoading(false)

    } catch (error) {
      setLoading(false)

    }
  }

  const [type, setType] = useState()
  const getType = async (param) => {
    const paramName = param
    setLoading(true)
    try {
      const resp = await Get(`mediaHouse/report/content/type?${paramName}=${param}`)
      // console.log(resp?.data?.data, `<----there are type `)
      setType(resp?.data?.data)
      setLoading(false)
    } catch (error) {
      setLoading(false)

    }
  }

  const [location, setLocation] = useState()
  const getLocation = async (param) => {
    const paramName = param
    setLoading(true)

    try {
      const resp = await Get(`mediaHouse/report/content/location?${paramName}=${param}`)
      setLocation(resp?.data?.data)
      setLoading(false)
    } catch (error) {
      setLoading(false)
    }
  }

  const [purchaseContent, setPuchaseContent] = useState()

  const ContentPurchaseOnlineSummary = async (param) => {
    const paramName = param
    setLoading(true)
    try {
      const res = await Get(`mediaHouse/contentPurchasedOnlinesummary?${paramName || 'monthly'}=${param || 'monthly'}`)
      if (res) {
        setPuchaseContent(res?.data?.response)
        setLoading(false)
      }
    } catch (error) {
      setLoading(false)
    }

  }

  const [splitC, setSplitC] = useState()
  const getSplitContent = async (param) => {
    const paramName = param
    setLoading(true)
    try {
      const resp = await Get(`mediaHouse/reportSplit?${paramName}=${param}`)
      if (resp) {
        setSplitC(resp?.data?.data?.data)
        // console.log(resp?.data?.data?.data, `<---this is split content`)
        setLoading(false)
      }
    } catch (error) {
      setLoading(false)

    }
  }


  useEffect(() => {
    getDetailData()
    getCategories()
    getType()
    getLocation()
    ContentPurchaseOnlineSummary()
    getSplitContent()
    // getSplitType()

  }, [])
  const formatAmountInMillion = (amount) =>
    amount?.toLocaleString('en-US', {
      maximumFractionDigits: 2,
    });



  useEffect(() => {
    if (params.type === "content_purchase_volume_moment") {
      ContentPurchaseOnlineSummary('monthly', 'monthly')
    }

  }, [])


  useEffect(() => {
    if (params.type === "total_fund_invested") {
      getVatSummary('monthly', 'monthly')
    }

  }, [])


  const handleChangeSort = async (e) => {
    try {
      const type = e.target.name
      const param = e.target.value

      // console.log(type, `<====this is typpe`)

      if (type === "fund_invested_summary") {
        getVatSummary(param)
      } else if (type === "content_sourced_from_task_summary") {
        ContentPurchaseOnlineSummary(param)
      } else if (type === "content_location") {
        getLocation(param)
      } else if (type === "content_split") {
        getSplitContent(param)
      } else if (type === "content_type") {
        getType(param)
      } else if (type === "content_categories") {
        getCategories(param)
      } else if (type === "content_sourced_from_task_summary") {
        ContentPurchaseOnlineSummary(param)
      }
      else {
        null
      }

    } catch (error) {
    }
  }


  const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"]
  return (
    <>
      {loading && <Loader />}
      {/* {console.log(purchaseContent, `<---what`)} */}
      <Header />
      <div className="page-wrap feed-detail tasktables_wrap">
        <Container fluid className="p-0">
          <Row>
            <Col md={12}>
              <div className="">
                <Link onClick={() => history.back()} className="back_link mb-3">
                  <BsArrowLeft className="text-pink" /> Back{" "}
                </Link>
              </div>
              <div className="tbl_wrap_cmn">

                {params?.type === "content_purchased_online_today" ?
                  <Card className="tbl_crd">
                    <div className="">
                      <div
                        className="d-flex justify-content-between align-items-center tbl_hdr"
                        px="20px"
                        mb="10px"
                      >
                        <Typography className="tbl_hdng">
                          Content purchased online
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
                              <th className="">Content purchased online</th>
                              <th>Time & date</th>
                              <th className="tsk_dlts">Description</th>
                              <th className="tbl_icn_th">Type</th>
                              <th className="tbl_icn_th licnc">License</th>
                              <th className="tbl_icn_th catgr">Category</th>
                              <th>Location</th>
                              <th>Published by</th>
                              <th>Asking price</th>
                              <th>Funds invested</th>
                            </tr>
                          </thead>
                          <tbody>
                            {
                              data && data?.content_online?.task.map((curr) => {
                                const Audio = curr?.content?.filter((item) => item?.media_type === "audio")
                                const Video = curr?.content?.filter((item) => item?.media_type === "video")
                                const Image = curr?.content?.filter((item) => item?.media_type === "image")
                                return (
                                  <tr>
                                    <td className="content_img_td">

                                      {<Link to={`/purchased-content-detail/${curr?.hopper_id?.id}`}>
                                        <div className="tbl_cont_wrp">
                                          {curr?.content[0].media_type === "image" ?
                                            <img src={curr?.content[0]?.watermark || process.env.REACT_APP_CONTENT_MEDIA + curr?.content[0]?.media} className="content_img" />
                                            : curr?.content[0].media_type === "video" ? <img src={curr?.content[0]?.watermark || process.env.REACT_APP_CONTENT_MEDIA + curr?.content[0]?.thumbnail} className="content_img" /> :
                                              curr?.content[0].media_type === "audio" ? <img src={audioic} className="content_img" /> : null
                                          }
                                          {curr?.content?.length > 1 &&
                                            <span className="cont_count">+{curr?.content?.length - 1}</span>
                                          }
                                        </div>

                                      </Link>
                                      }

                                    </td>
                                    <td className="timedate_wrap">
                                      <p className="timedate">
                                        <img src={watchic} className="icn_time" />
                                        {moment(curr?.createdAt).format(`hh:mm A`)}

                                      </p>
                                      <p className="timedate">
                                        <img src={calendar} className="icn_time" />
                                        {moment(curr?.createdAt).format(`DD MMM YYYY`)}
                                      </p>
                                    </td>
                                    <td className="description_td">
                                      <p className="desc_ht mb-0">
                                        {curr?.description}
                                      </p>
                                    </td>
                                    <td className="text-center">
                                      {Audio && Audio.length > 0 &&
                                        <Tooltip title="Photo"><img src={interviewic} alt="Photo" className="icn" /></Tooltip>
                                      }
                                      <br />
                                      {Video && Video.length > 0 &&
                                        <Tooltip title="Photo"><img src={videoic} alt="Photo" className="icn" /></Tooltip>
                                      }
                                      <br />

                                      {Image && Image.length > 0 &&
                                        <Tooltip title="Photo"><img src={cameraic} alt="Photo" className="icn" /></Tooltip>
                                      }
                                    </td>
                                    <td className="text-center">
                                      <Tooltip title={curr?.type === "shared" ? "shared" : "exclusive"}>
                                        {
                                          curr?.type === "shared" ? <img
                                            src={share}
                                            alt="Exclusive"
                                            className="icn"
                                          /> :
                                            <img
                                              src={exclusiveic}
                                              alt="Exclusive"
                                              className="icn"
                                            />
                                        }
                                      </Tooltip>
                                    </td>
                                    <td className="text-center">
                                      <Tooltip title={curr?.category_id?.name}>
                                        {<img src={curr?.category_id?.icon} alt="Exclusive" className="icn" />}
                                      </Tooltip>
                                    </td>
                                    <td>
                                      {curr?.location}
                                    </td>
                                    <td>
                                      <div className="hpr_dt">
                                        <img
                                          src={process.env.REACT_APP_AVATAR_IMAGE + curr?.hopper_id?.avatar_id?.avatar}
                                          alt="Hopper"
                                          className="big_img"
                                        />
                                        <p className="hpr_nme">
                                          {/* {`${curr?.hopper_id?.first_name} ${curr?.hopper_id?.first_name}`}
                                          <br /> */}
                                          <span className="txt_light">
                                            {curr?.hopper_id?.user_name}
                                          </span>
                                        </p>
                                      </div>
                                    </td>
                                    <td>£ {curr?.ask_price}</td>
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
                  : params?.type === "content_avg_price" ?
                    <Card className="tbl_crd">
                      <div className="">
                        <div
                          className="d-flex justify-content-between align-items-center tbl_hdr"
                          px="20px"
                          mb="10px"
                        >
                          <Typography className="tbl_hdng">
                            Content average price
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
                                <th className="">Content purchased online</th>
                                <th>Time & date</th>
                                <th className="tsk_dlts">Description</th>
                                <th className="tbl_icn_th">Type</th>
                                <th className="tbl_icn_th licnc">License</th>
                                <th className="tbl_icn_th catgr">Category</th>
                                <th>Location</th>
                                <th>Published by</th>
                                <th>Price paid</th>
                                <th>Average price</th>
                                {/* <th>Trend</th> */}
                              </tr>
                            </thead>
                            <tbody>

                              {
                                data?.average_content_price?.task[0]?.data && data?.average_content_price?.task[0]?.data?.map((curr) => {
                                  {/* console.log(curr,`<----thisis current`) */ }
                                  const Audio = curr?.content?.filter((item) => item?.media_type === "audio")
                                  const Video = curr?.content?.filter((item) => item?.media_type === "video")
                                  const Image = curr?.content?.filter((item) => item?.media_type === "image")
                                  return (
                                    <tr>
                                      <td className="content_img_td">
                                        <div className="tbl_cont_wrp">
                                          {
                                            curr?.content[0]?.media_type === "image" ?
                                              <img src={process.env.REACT_APP_CONTENT_MEDIA + curr?.content[0]?.media} className="content_img" />
                                              : curr?.content[0]?.media_type === "video" ? <img src={process.env.REACT_APP_CONTENT_MEDIA + curr?.content[0]?.thumbnail} className="content_img" /> :
                                                curr?.content[0]?.media_type === "audio" ? <img src={audioic} className="content_img" /> : null
                                          }

                                          {curr?.content?.length > 1 &&
                                            <span className="cont_count">+{curr?.content?.length - 1}</span>}
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
                                        <p className="desc_ht mb-0">
                                          {curr?.description}
                                        </p>
                                      </td>
                                      <td className="text-center">
                                        {Audio && Audio.length > 0 &&
                                          <Tooltip title="Photo"><img src={interviewic} alt="Photo" className="icn" /></Tooltip>
                                        }
                                        <br />
                                        {Video && Video.length > 0 &&
                                          <Tooltip title="Photo"><img src={videoic} alt="Photo" className="icn" /></Tooltip>
                                        }
                                        <br />

                                        {Image && Image.length > 0 &&
                                          <Tooltip title="Photo"><img src={cameraic} alt="Photo" className="icn" /></Tooltip>
                                        }
                                      </td>
                                      <td className="text-center">
                                        <Tooltip title={curr?.type === "shared" ? "shared" : "exclusive"}>
                                          {
                                            curr?.type === "shared" ? <img
                                              src={share}
                                              alt="Exclusive"
                                              className="icn"
                                            /> :
                                              <img
                                                src={exclusiveic}
                                                alt="Exclusive"
                                                className="icn"
                                              />
                                          }
                                        </Tooltip>
                                      </td>
                                      <td className="text-center">
                                        <Tooltip title={curr?.category_id?.name}>
                                          {<img src={curr?.category_id?.icon} alt="Exclusive" className="icn" />}
                                        </Tooltip>
                                      </td>
                                      <td>
                                        {curr?.location}
                                      </td>
                                      <td>
                                        <div className="hpr_dt">
                                          <img
                                            src={process.env.REACT_APP_AVATAR_IMAGE + curr?.hopper_id?.avatar_id?.avatar}
                                            alt="Hopper"
                                            className="big_img"
                                          />
                                          <p className="hpr_nme">
                                            {/* {`${curr?.hopper_id?.first_name} ${curr?.hopper_id?.first_name}`}
                                            <br /> */}
                                            <span className="txt_light">
                                              {curr?.hopper_id?.user_name}
                                            </span>
                                          </p>
                                        </div>
                                      </td>
                                      <td>£ {curr?.amount_paid ?? 0}</td>
                                      <td>£ {(curr?.amount_paid / curr?.totalAcceptedCount ?? 0)}</td>

                                      {/* <td className="">
                                        <p className="trend_success">
                                          <BsArrowUp />
                                          50%
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
                    : params?.type === "content_purchase_volume_moment" ?

                      <Card className="tbl_crd">
                        <div className="">
                          <div
                            className="d-flex justify-content-between align-items-center tbl_hdr"
                            px="20px"
                            mb="10px"
                          >
                            <Typography className="tbl_hdng">
                              Content purchased online volume movement
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
                                  <th>Period</th>
                                  <th>Content purchased online volume</th>
                                  {/* <th>Trend</th> */}
                                </tr>
                              </thead>
                              <tbody>


                                {purchaseContent && purchaseContent.map((curr) => {
                                  return (
                                    <tr>
                                      <td className="timedate_wrap">
                                        <p className="timedate">
                                          <img src={calendar} className="icn_time" />
                                          {months[curr?._id?.month - 1]}  {curr?._id?.year}
                                        </p>
                                      </td>
                                      <td>{curr?.volume}</td>
                                      {/* <td className="">
                                        <p className="trend_success">
                                          <BsArrowUp />
                                          50%
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
                      : params?.type === "fund_invested_today" ?

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
                                    <th className="">Content purchased online</th>
                                    <th>Time & date</th>
                                    <th className="tsk_dlts">Description</th>
                                    <th className="tbl_icn_th">Type</th>
                                    <th className="tbl_icn_th licnc">License</th>
                                    <th className="tbl_icn_th catgr">Category</th>
                                    <th>Location</th>
                                    <th>Published by</th>
                                    <th>Nett Price paid</th>
                                    <th>VAT paid</th>
                                    <th>Total funds invested</th>
                                  </tr>
                                </thead>
                                <tbody>
                                  {data?.today_fund_invested && data?.today_fund_invested?.task?.map((curr) => {
                                    const Audio = curr?.content?.filter((item) => item?.media_type === "audio")
                                    const Video = curr?.content?.filter((item) => item?.media_type === "video")
                                    const Image = curr?.content?.filter((item) => item?.media_type === "image")

                                    return (
                                      <tr>
                                        <td className="content_img_td">
                                          <div className="tbl_cont_wrp">
                                            {curr?.content[0]?.media_type === "image" ?
                                              <img src={curr?.content[0]?.watermark || process.env.REACT_APP_CONTENT_MEDIA + curr?.content[0]?.media} className="content_img" /> : curr?.content[0]?.media_type === "video" ? <img src={curr?.content[0]?.watermark || process.env.REACT_APP_CONTENT_MEDIA + curr?.content[0]?.thumbnail} className="content_img" /> : curr?.content[0]?.media_type === "audio" ? <img src={audioic} className="content_img" /> : null}
                                          </div>
                                        </td>
                                        <td className="timedate_wrap">
                                          <p className="timedate">
                                            <img src={watchic} className="icn_time" />
                                            {moment(curr?.createdAt).format(`hh:mm A`)}
                                          </p>
                                          <p className="timedate">
                                            <img src={calendar} className="icn_time" />
                                            {moment(curr?.createdAt).format(`DD MMM YYYY`)}
                                          </p>
                                        </td>
                                        <td className="description_td">
                                          <p className="desc_ht mb-0">
                                            {curr?.description}
                                          </p>
                                        </td>
                                        <td className="text-center">

                                          {Audio && Audio.length > 0 &&
                                            <Tooltip title="Photo"><img src={interviewic} alt="Photo" className="icn" /></Tooltip>
                                          }
                                          <br />
                                          {Video && Video.length > 0 &&
                                            <Tooltip title="Photo"><img src={videoic} alt="Photo" className="icn" /></Tooltip>
                                          }
                                          <br />

                                          {Image && Image.length > 0 &&
                                            <Tooltip title="Photo"><img src={cameraic} alt="Photo" className="icn" /></Tooltip>
                                          }
                                        </td>
                                        <td className="text-center">

                                          <Tooltip title={curr?.type === "shared" ? "shared" : "exclusive"}>

                                            {curr?.type === "shared" ?
                                              <img
                                                src={share}
                                                alt="Exclusive"
                                                className="icn"
                                              />
                                              :
                                              <img
                                                src={exclusiveic}
                                                alt="Exclusive"
                                                className="icn"
                                              />
                                            }

                                          </Tooltip>
                                        </td>
                                        <td className="text-center">
                                          <Tooltip title="Celebrity">
                                            <img
                                              src={celebrity}
                                              alt="Exclusive"
                                              className="icn"
                                            />
                                          </Tooltip>
                                        </td>
                                        <td>
                                          {curr?.location}
                                        </td>
                                        <td>
                                          <div className="hpr_dt">
                                            <img
                                              src={process.env.REACT_APP_AVATAR_IMAGE + curr?.hopper_id?.avatar_id?.avatar} alt="Hopper" className="big_img" />
                                            <p className="hpr_nme">
                                              {/* {`${curr?.hopper_id?.first_name} ${curr?.hopper_id?.last_name}`}                                      <br /> */}
                                              <span className="txt_light">
                                                {curr?.hopper_id?.user_name}
                                              </span>
                                            </p>
                                          </div>
                                        </td>
                                        <td>£ {formatAmountInMillion(curr?.amount_paid || 0 - curr?.vat || 0)}</td>
                                        <td>£ {formatAmountInMillion(curr?.vat || 0)}</td>
                                        <td>£ {formatAmountInMillion(curr?.amount_paid || 0)}</td>
                                      </tr>

                                    )
                                  })
                                  }
                                </tbody>
                              </table>
                            </div>
                          </div>
                        </Card>
                        : params?.type === "total_fund_invested" ?

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
                                      <th className="">Content purchased online</th>
                                      <th>Period</th>
                                      <th>Nett price paid</th>
                                      <th>VAT paid</th>
                                      <th>Total funds invested</th>
                                    </tr>
                                  </thead>
                                  <tbody>

                                    {vatData && vatData.map((curr) => {
                                      return (
                                        <tr>
                                          <td className="content_wrap more_contnt_wrap">
                                            <div className="content_imgs_wrap">
                                              <div className="content_imgs">
                                                {curr?.content_id[0] && curr?.content_id[0]?.content?.map((curr) => {
                                                  return (
                                                    curr?.media_type === "image" ? <img src={process.env.REACT_APP_CONTENT_MEDIA + curr?.media} className="content_img" />
                                                      : curr?.media_type === "video" ? <img src={process.env.REACT_APP_CONTENT_MEDIA + curr?.thumbnail} className="content_img" />
                                                        : curr?.media_type === "audio" ? <img src={audioic} className="content_img" />
                                                          : null
                                                  )
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
                                          <td>

                                            {months[curr?._id?.month - 1]}  {curr?._id?.year}
                                          </td>

                                          <td>£ {((curr?.total_price - curr?.total_vat) || 0).toFixed(2)}</td>
                                          <td>£ {((curr?.total_vat) || 0).toFixed(2)}</td>
                                          <td>£ {((curr?.total_price) || 0).toFixed(2)}</td>
                                        </tr>

                                      )
                                    })
                                    }

                                  </tbody>
                                </table>
                              </div>
                            </div>
                          </Card>
                          : params?.type === "content_categories" ?

                            <Card className="tbl_crd">
                              <div className="">
                                <div
                                  className="d-flex justify-content-between align-items-center tbl_hdr"
                                  px="20px"
                                  mb="10px"
                                >
                                  <Typography className="tbl_hdng">
                                    Content categories
                                  </Typography>
                                  {/* <div className="tbl_rt">
                        <span className="tbl_rt_txt">Monthly</span>
                      </div> */}
                                  <div className="tbl_rt">
                                    <Form.Group className="globalSort">
                                      <Form.Select name="content_categories" onChange={handleChangeSort}>
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
                                        <th>Business</th>
                                        <th>Political</th>
                                        <th>Crime</th>
                                        <th>Fashion</th>
                                        <th>Other</th>
                                      </tr>
                                    </thead>
                                    <tbody>
                                      {categories?.data?.map((value) => {
                                        return (
                                          <tr>
                                            {value?.content_id[0]?.content?.map((curr) => {
                                              return (
                                                <td className="content_wrap more_contnt_wrap">
                                                  <div className="content_imgs_wrap">
                                                    <div className="content_imgs">
                                                      {
                                                        curr?.media_type === "image" ? <img src={process.env.REACT_APP_CONTENT_MEDIA + curr?.media} className="content_img" />
                                                          : curr?.media_type === "video" ? <img src={process.env.REACT_APP_CONTENT_MEDIA + curr?.thumbnail} className="content_img" />
                                                            : curr?.media_type === "audio" ? <img src={audioic} className="content_img" />
                                                              : null
                                                      }
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

                                              )
                                            })}
                                            <td className="timedate_wrap">
                                              <p className="timedate">
                                                <img src={calendar} className="icn_time" />
                                                {months[value?._id?.month - 1]}  {value?._id?.year}

                                                {/* {`${value?._id?.month} / ${value?._id?.year}`} */}
                                              </p>
                                            </td>
                                            <td>{categories?.buisness_count}</td>
                                            <td>{categories?.politics_count}</td>
                                            <td>{categories?.crime_count}</td>
                                            <td>{categories?.fashion_count}</td>
                                            <td>{categories?.other}</td>
                                          </tr>
                                        )
                                      })

                                      }
                                    </tbody>
                                  </table>
                                </div>
                              </div>
                            </Card>
                            : params?.type === "content_type" ?

                              <Card className="tbl_crd">
                                <div className="">
                                  <div
                                    className="d-flex justify-content-between align-items-center tbl_hdr"
                                    px="20px"
                                    mb="10px"
                                  >
                                    <Typography className="tbl_hdng">Content type</Typography>
                                    <div className="tbl_rt">
                                      <Form.Group className="globalSort">
                                        <Form.Select name="content_type" onChange={handleChangeSort}>
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
                                          <th>Photos</th>
                                          <th>Videos</th>
                                          <th>Interviews</th>type
                                        </tr>
                                      </thead>
                                      <tbody>
                                        {/* {console.log(type,`<----testing typpe`)} */}

                                        {type?.data.map((value) => {
                                          return (
                                            <tr>
                                              {value?.content_id[0]?.content?.map((curr) => {
                                                return (
                                                  <td className="content_wrap more_contnt_wrap">
                                                    <div className="content_imgs_wrap">
                                                      <div className="content_imgs">
                                                        {
                                                          curr?.media_type === "image" ? <img src={process.env.REACT_APP_CONTENT_MEDIA + curr?.media} className="content_img" />
                                                            : curr?.media_type === "video" ? <img src={process.env.REACT_APP_CONTENT_MEDIA + curr?.thumbnail} className="content_img" />
                                                              : curr?.media_type === "audio" ? <img src={audioic} className="content_img" />
                                                                : null
                                                        }
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

                                                )
                                              })}
                                              <td className="timedate_wrap">
                                                <p className="timedate">
                                                  <img src={calendar} className="icn_time" />
                                                  {months[value?._id?.month - 1]}  {value?._id?.year}
                                                </p>
                                              </td>
                                              <td>{type?.image}</td>
                                              <td>{type?.video}</td>
                                              <td>{type?.interview}</td>
                                            </tr>

                                          )
                                        })

                                        }
                                      </tbody>
                                    </table>
                                  </div>
                                </div>
                              </Card>
                              : params?.type === "content_split" ?

                                <Card className="tbl_crd">
                                  <div className="">
                                    <div
                                      className="d-flex justify-content-between align-items-center tbl_hdr"
                                      px="20px"
                                      mb="10px"
                                    >
                                      <Typography className="tbl_hdng">
                                        Content split
                                      </Typography>
                                      <div className="tbl_rt">
                                        <Form.Group className="globalSort">
                                          <Form.Select name="content_split" onChange={handleChangeSort}>
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
                                            <th>Shared</th>
                                            <th>Exclusive</th>
                                          </tr>
                                        </thead>
                                        <tbody>
                                          {splitC && splitC?.map((curr) => {
                                            return (
                                              <tr>
                                                <td className="content_wrap more_contnt_wrap">
                                                  <div className="content_imgs_wrap">
                                                    <div className="content_imgs">
                                                      {/* {
                                                          curr?.media_type === "image" ? <img src={process.env.REACT_APP_CONTENT_MEDIA + curr?.media} className="content_img" />
                                                            : curr?.media_type === "video" ? <img src={process.env.REACT_APP_CONTENT_MEDIA + curr?.thumbnail} className="content_img" />
                                                              : curr?.media_type === "audio" ? <img src={audioic} className="content_img" />
                                                                : null
                                                        } */}
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
                                                    {months[curr?._id?.month - 1]}  {curr?._id?.year}
                                                  </p>
                                                </td>
                                                <td>{curr?.shared}</td>
                                                <td>{curr?.exclusive}</td>
                                              </tr>
                                            )
                                          })

                                          }

                                        </tbody>
                                      </table>
                                    </div>
                                  </div>
                                </Card>
                                : params?.type === "content_location" ?

                                  <Card className="tbl_crd">
                                    <div className="">
                                      <div
                                        className="d-flex justify-content-between align-items-center tbl_hdr"
                                        px="20px"
                                        mb="10px"
                                      >
                                        <Typography className="tbl_hdng">
                                          Content location
                                        </Typography>
                                        <div className="tbl_rt">
                                          <Form.Group className="globalSort">
                                            <Form.Select name="content_location" onChange={handleChangeSort}>
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
                                              {/* <th>Central</th> */}
                                              <th>North</th>
                                              <th>South</th>
                                              <th>East</th>
                                              <th>West</th>
                                            </tr>
                                          </thead>
                                          <tbody>
                                            {location?.data?.map((value) => {
                                              return (
                                                <tr>
                                                  {value?.content_id[0]?.content?.map((curr) => {
                                                    return (
                                                      <td className="content_wrap more_contnt_wrap">
                                                        <div className="content_imgs_wrap">
                                                          <div className="content_imgs">
                                                            {
                                                              curr?.media_type === "image" ? <img src={process.env.REACT_APP_CONTENT_MEDIA + curr?.media} className="content_img" />
                                                                : curr?.media_type === "video" ? <img src={process.env.REACT_APP_CONTENT_MEDIA + curr?.thumbnail} className="content_img" />
                                                                  : curr?.media_type === "audio" ? <img src={audioic} className="content_img" />
                                                                    : null
                                                            }
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

                                                    )
                                                  })}
                                                  <td className="timedate_wrap">
                                                    <p className="timedate">
                                                      <img src={calendar} className="icn_time" />
                                                      {months[value?._id?.month - 1]}  {value?._id?.year}

                                                      {/* {`${value?._id?.month} / ${value?._id?.year}`} */}
                                                    </p>
                                                  </td>
                                                  {/* <td>180</td> */}
                                                  <td>{location?.north}</td>
                                                  <td>{location?.south}</td>
                                                  <td>{location?.east}</td>
                                                  <td>{location?.west}</td>
                                                </tr>
                                              )
                                            })
                                            }
                                          </tbody>
                                        </table>
                                      </div>
                                    </div>
                                  </Card>
                                  : params?.type === "content_purchased_summary" ?

                                    <Card className="tbl_crd">
                                      <div className="">
                                        <div
                                          className="d-flex justify-content-between align-items-center tbl_hdr"
                                          px="20px"
                                          mb="10px"
                                        >
                                          <Typography className="tbl_hdng">
                                            Content purchased online summary
                                          </Typography>
                                          <div className="tbl_rt">
                                            <Form.Group className="globalSort">
                                              <Form.Select name="content_purchased_online_summary" onChange={handleChangeSort}>
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

                                              {purchaseContent?.map((curr) => {
                                                return (
                                                  <tr>
                                                    <td className="content_wrap more_contnt_wrap">
                                                      <div className="content_imgs_wrap">
                                                        <div className="content_imgs">
                                                          {curr?.content_id[0] && curr?.content_id[0]?.content?.map((curr) => {
                                                            return (
                                                              curr?.media_type === "image" ? <img src={process.env.REACT_APP_CONTENT_MEDIA + curr?.media} className="content_img" />
                                                                : curr?.media_type === "video" ? <img src={process.env.REACT_APP_CONTENT_MEDIA + curr?.thumbnail} className="content_img" />
                                                                  : curr?.media_type === "audio" ? <img src={audioic} className="content_img" />
                                                                    : null
                                                            )
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
                                                        <img src={calendar} className="icn_time" />
                                                        {months[curr?._id?.month - 1]}  {curr?._id?.year}
                                                      </p>
                                                    </td>
                                                    <td>£ {curr?.volume}</td>
                                                  </tr>

                                                )
                                              }
                                              )
                                              }
                                            </tbody>
                                          </table>
                                        </div>
                                      </div>
                                    </Card>
                                    : params?.type === "content_sourced_from_task_summary" ?
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
                                                <Form.Select name="content_sourced_from_task_summary" onChange={handleChangeSort}>
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
                                                  <th>Volume</th>
                                                </tr>
                                              </thead>
                                              <tbody>

                                                {purchaseContent?.map((curr) => {
                                                  return (
                                                    <tr>
                                                      <td className="content_wrap more_contnt_wrap">
                                                        <div className="content_imgs_wrap">
                                                          <div className="content_imgs">
                                                            {curr?.content_id[0] && curr?.content_id[0]?.content?.map((curr) => {
                                                              return (
                                                                curr?.media_type === "image" ? <img src={process.env.REACT_APP_CONTENT_MEDIA + curr?.media} className="content_img" />
                                                                  : curr?.media_type === "video" ? <img src={process.env.REACT_APP_CONTENT_MEDIA + curr?.thumbnail} className="content_img" />
                                                                    : curr?.media_type === "audio" ? <img src={audioic} className="content_img" />
                                                                      : null
                                                              )
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
                                                          <img src={calendar} className="icn_time" />
                                                          {months[curr?._id?.month - 1]}  {curr?._id?.year}
                                                        </p>
                                                      </td>
                                                      <td>£ {curr?.volume}</td>
                                                    </tr>

                                                  )
                                                }
                                                )
                                                }
                                              </tbody>
                                            </table>
                                          </div>
                                        </div>
                                      </Card>
                                      : params?.type === "fund_invested_summary" ?
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
                                                  <Form.Select name="fund_invested_summary" onChange={handleChangeSort}>
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
                                                    <th>Funds Invested </th>
                                                  </tr>
                                                </thead>
                                                <tbody>
                                                  {vatData && vatData.map((curr) => {
                                                    return (
                                                      <tr>
                                                        <td className="content_wrap more_contnt_wrap">
                                                          <div className="content_imgs_wrap">
                                                            <div className="content_imgs">
                                                              {curr?.content_id[0] && curr?.content_id[0]?.content?.map((curr) => {
                                                                return (
                                                                  curr?.media_type === "image" ? <img src={process.env.REACT_APP_CONTENT_MEDIA + curr?.media} className="content_img" />
                                                                    : curr?.media_type === "video" ? <img src={process.env.REACT_APP_CONTENT_MEDIA + curr?.thumbnail} className="content_img" />
                                                                      : curr?.media_type === "audio" ? <img src={audioic} className="content_img" />
                                                                        : null
                                                                )
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
                                                            <img src={calendar} className="icn_time" />
                                                            {months[curr?._id?.month - 1]}  {curr?._id?.year}
                                                          </p>
                                                        </td>
                                                        <td>£ {((curr?.total_price) || 0).toFixed(2)}</td>

                                                      </tr>

                                                    )
                                                  })
                                                  }
                                                </tbody>
                                              </table>
                                            </div>
                                          </div>
                                        </Card>
                                        : null
                }

              </div>
            </Col>
          </Row>
        </Container>
      </div>
    </>
  );
};

export default memo(ReportsTablesContent);
