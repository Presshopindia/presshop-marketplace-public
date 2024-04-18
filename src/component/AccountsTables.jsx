import React, { memo, useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { Row, Col, Container, Form } from "react-bootstrap";
import { Card, Typography, Button } from "@mui/material";
import {
  BsArrow90DegUp,
  BsArrowBarUp,
  BsArrowDown,
  BsArrowLeft,
  BsArrowRight,
  BsArrowUp,
  BsEye,
} from "react-icons/bs";
import audioic from "../assets/images/audimgsmall.svg";
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
import contimg1 from "../assets/images/Contentdetail/contentimg2.png";
import contimg2 from "../assets/images/Contentdetail/content3.png";
import contimg3 from "../assets/images/Contentdetail/contentbg.png";
import watchic from "../assets/images/watch.svg";
import cameraic from "../assets/images/camera.svg";
import exclusiveic from "../assets/images/exclusive.svg";
import crimeic from "../assets/images/sortIcons/crime.svg";
import hprimg1 from "../assets/images/avatars/usrimg1.svg";
import hprimg2 from "../assets/images/avatars/usrimg2.svg";
import hprimg3 from "../assets/images/avatars/usrimg3.svg";
import Loader from "./Loader";

const AccountsTables = () => {
  const [detail, setDetails] = useState()
  const [vatData, setVat] = useState()
  const [purchaseContent, setPurchaseContent] = useState()
  const [task_purchaseContent, setTask_PurchaseContent] = useState()
  const param = useParams();
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();


  const getVatSummary = async () => {
    try {
      const res = await Get(`mediahouse/paymenttobemade`);
      if (res) {
        console.log('res.data---------->', res.data)
        setVat(res?.data?.data)
      }
    } catch (error) {
    }
  }

  const getContentPurchaseSummary = async () => {
    try {
      const res = await Get(`mediahouse/contentPurchasedOnlinesummary`)
      if (res) {
        setPurchaseContent(res?.data?.response)
      }

    } catch (error) {

    }
  }

  const getTaskPurchaseSummary = async () => {
    try {
      const res = await Get(`mediahouse/contentPurchasedOnlinesummary`)
      if (res) {
        setTask_PurchaseContent(res?.data?.response)
      }

    } catch (error) {

    }
  }


  const ReportCount = async () => {
    try {
      setLoading(true)
      const resp = await Get(`mediahouse/Account/count`);
      setDetails(resp.data);                
      if (resp) {
        setDetails(resp.data);
        setLoading(false);
      }
    } catch (error) {
      setLoading(false);
    }
  };

  useEffect(() => {
    ReportCount()
    getVatSummary()
    getContentPurchaseSummary()
    getTaskPurchaseSummary()

  }, [])

  const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"]
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
                {/* Total content purchased online start */}
                {param.type === "total_content_purchase" ?
                  <Card className="tbl_crd">
                    <div className="">
                      <div
                        className="d-flex justify-content-between align-items-center tbl_hdr"
                        px="20px"
                        mb="10px"
                      >
                        <Typography className="tbl_hdng">
                          Total contents purchased online
                        </Typography>
                        {/* <div className="tbl_rt">
                          <span className="tbl_rt_txt">Monthly</span>
                        </div> */}
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
                              <th>Total funds invested</th>
                              <th>Trend</th>
                            </tr>
                          </thead>
                          <tbody>
                            {detail && detail?.content_online?.task?.map((curr) => {
                              return (
                                <tr>
                                  <td className="content_wrap more_contnt_wrap">
                                    <Link to={`/${curr._id}`}>
                                    <div className="content_imgs_wrap">
                                      <div className="content_imgs">
                                        {curr?.content && curr?.content?.map((curr) => {
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
                                    </Link>
                                  </td>
                                  <td className="timedate_wrap">
                                    <p className="timedate">
                                      <img src={calendar} className="icn_time" />
                                      {new Date(curr?.createdAt)?.toLocaleDateString()} - {new Date(curr?.latestAdminUpdated)?.toLocaleDateString() === "Invalid Date" ? "" : new Date(curr?.latestAdminUpdated)?.toLocaleDateString()}
                                    </p>
                                  </td>
                                  <td>£ {curr?.amount_paid}</td>
                                  <td className="">
                                    <p className="trend_success">
                                      <BsArrowUp /> 
                                      {(Number(curr?.amount_paid)*1.5).toFixed(2)}%
                                    </p>
                                  </td>
                                </tr>

                              )
                            })

                            }
                          </tbody>
                        </table>
                      </div>
                    </div>
                  </Card> : param.type === "total_funds" ?


                    <Card className="tbl_crd">
                      <div className="">
                        <div
                          className="d-flex justify-content-between align-items-center tbl_hdr"
                          px="20px"
                          mb="10px"
                        >
                          <Typography className="tbl_hdng">
                            Total Funds invested for content purchased online
                          </Typography>
                          {/* <div className="tbl_rt">
                            <span className="tbl_rt_txt">Monthly</span>
                          </div> */}
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
                              {purchaseContent && purchaseContent.map((curr) => {
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
                                    <td>£ {(curr?.total_price - curr?.total_vat || 0)?.toFixed(2)}</td>
                                    <td>£ {(curr?.total_vat || 0)?.toFixed(2)}</td>
                                    <td>£ {(curr?.total_price || 0)?.toFixed(2)}</td>
                                  </tr>

                                )
                              })

                              }
                            </tbody>
                          </table>
                        </div>
                      </div>
                    </Card> : param.type === "total_content" ?

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
                            {/* <div className="tbl_rt">
                              <span className="tbl_rt_txt">Monthly</span>
                            </div> */}
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
                                  <th>Total funds invested</th>
                                  <th>Trend</th>
                                </tr>
                              </thead>
                              <tbody>

                                {detail?.sourced_content_from_tasks?.task?.map((curr) => {
                                  return (
                                    <tr>
                                      <td className="content_wrap more_contnt_wrap">
                                      <div className="content_imgs_wrap">
                                      <Link to={`/${curr._id}`} >
                                      <div className="content_imgs">
                                        {curr?.content && curr?.content?.map((curr) => {
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
                                      </Link>
                                    </div>
                                      </td>
                                      <td className="timedate_wrap">
                                        <p className="timedate">
                                          <img src={calendar} className="icn_time" />
                                          {new Date(curr?.createdAt)?.toLocaleDateString()} - {new Date(curr?.updatedAt)?.toLocaleDateString() === "Invalid Date" ? "" : new Date(curr?.updatedAt)?.toLocaleDateString()}
                                        </p>
                                      </td>
                                      <td>£ {curr?.amount_paid}</td>
                                      <td className="">
                                        <p className="trend_success">
                                          <BsArrowUp />
                                          {(Number(curr?.amount_paid)*1.5).toFixed(2)}%
                                        </p>
                                      </td>
                                    </tr>

                                  )
                                })}
                              </tbody>
                            </table>
                          </div>
                        </div>
                      </Card> : param.type === "total_funds_sourced" ?

                        <Card className="tbl_crd">
                          <div className="">
                            <div
                              className="d-flex justify-content-between align-items-center tbl_hdr"
                              px="20px"
                              mb="10px"
                            >
                              <Typography className="tbl_hdng">
                                Total Funds Invested for content sourced from tasks
                              </Typography>
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

                                  {task_purchaseContent && task_purchaseContent.map((curr) => {
                                    return (
                                      <tr>
                                        <td className="content_wrap more_contnt_wrap">
                                          <div className="content_imgs_wrap">
                                            <div className="content_imgs">
                                              {curr?.content_id && curr?.content_id?.map((curr) => {
                                                return (
                                                  curr?.type === "image" ? <img src={process.env.REACT_APP_UPLOADED_CONTENT + curr?.imageAndVideo} className="content_img" />
                                                    : curr?.type === "video" ? <img src={process.env.REACT_APP_UPLOADED_CONTENT + curr?.videothubnail} className="content_img" />
                                                      : curr?.type === "audio" ? <img src={audioic} className="content_img" />
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
                        </Card> : param.type === "pending_payments" ?

                          <Card className="tbl_crd">
                            <div className="">
                              <div
                                className="d-flex justify-content-between align-items-center tbl_hdr"
                                px="20px"
                                mb="10px"
                              >
                                <Typography className="tbl_hdng">
                                  Pending Payments
                                </Typography>
                                {/* <div className="tbl_rt">
                                  <Form.Group className="globalSort">
                                    <Form.Select>
                                      <option>Daily</option>
                                      <option selected>Monthly</option>
                                      <option>Yearly</option>
                                    </Form.Select>
                                  </Form.Group>
                                </div> */}
                              </div>
                              <div className="fix_ht_table">
                                <table
                                  width="100%"
                                  mx="20px"
                                  variant="simple"
                                  className="common_table les_colm">
                                  <thead>
                                    <tr>
                                      <th className="">Content</th>
                                      <th>Time & date</th>
                                      <th>Net price payable</th>
                                      <th>VAT payable</th>
                                      {/* <th>Total funds payable</th> */}
                                      <th>CTA</th>
                                    </tr>
                                  </thead>
                                  <tbody>

                                    {
                                      vatData && vatData?.map((curr) => {
                                        return (
                                          <tr>
                                            <td className="content_wrap more_contnt_wrap">
                                              <div className="content_imgs_wrap">
                                                <div className="content_imgs" >
                                                  {curr?.content && curr?.content?.map((curr) => {
                                                    return (
                                                      curr?.media_type === "image" ? <img src={process.env.REACT_APP_CONTENT_MEDIA + curr?.media} className="content_img" />
                                                        : curr?.media_type === "video" ? <img src={process.env.REACT_APP_CONTENT_MEDIA + curr?.thumbnail} className="content_img" />
                                                          : curr?.media_type === "audio" ? <img src={audioic} className="content_img" />
                                                            : null
                                                    )
                                                  })}
                                                  {/* <span className="arrow_span">
                                                    <svg
                                                      stroke="currentColor"
                                                      fill="currentColor"
                                                      stroke-width="0"
                                                      viewBox="0 0 16 16"
                                                      height="1em"
                                                      width="1em"
                                                      xmlns="http://www.w3.org/2000/svg">
                                                      <path
                                                        fill-rule="evenodd"
                                                        d="M1 8a.5.5 0 0 1 .5-.5h11.793l-3.147-3.146a.5.5 0 0 1 .708-.708l4 4a.5.5 0 0 1 0 .708l-4 4a.5.5 0 0 1-.708-.708L13.293 8.5H1.5A.5.5 0 0 1 1 8z"
                                                      ></path>
                                                    </svg>
                                                  </span> */}
                                                </div>
                                              </div>
                                            </td>
                                            <td className="timedate_wrap">
                                              <p className="timedate">
                                                <img src={calendar} className="icn_time" />
                                                {`${moment(curr?.createdAt).format("DD MM YYYY")}`}
                                                <br />
                                                {moment(curr?.createdAt).format("hh:mm A")}
                                              </p>
                                            </td>
                                            <td>£{(+(curr?.ask_price) + (+(20 * curr?.ask_price) / 100)).toFixed(2) || 0}</td>
                                            <td>£{((20 * curr?.ask_price) / 100).toFixed(2)}</td>
                                            {/* <td>£{((curr?.total_vat) || 0).toFixed(2)}</td> */}
                                            {/* <td>£ {((curr?.total_price) || 0).toFixed(2)}</td> */}
                                            <td><span className="payPending" onClick={() => navigate(`/auto-invoice/${curr?.id}`)}>Pay</span></td>
                                          </tr>
                                        )
                                      })
                                    }
                                  </tbody>
                                </table>
                              </div>
                            </div>
                          </Card> : param.type === "content_purchase_online" ?

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
                                    {/* <Form.Group className="globalSort">
                                      <Form.Select>
                                        <option>Daily</option>
                                        <option selected>Monthly</option>
                                        <option>Yearly</option>
                                      </Form.Select>
                                    </Form.Group> */}
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
                                        <th>Volume</th>
                                      </tr>
                                    </thead>
                                    <tbody>

                                      {purchaseContent && purchaseContent.map((curr) => {
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
                                            <td>{curr?.volume}</td>
                                          </tr>

                                        )
                                      })
                                      }
                                    </tbody>
                                  </table>
                                </div>
                              </div>
                            </Card> : param.type === "vat-data" ?

                              <Card className="tbl_crd">
                                <div className="">
                                  <div
                                    className="d-flex justify-content-between align-items-center tbl_hdr"
                                    px="20px"
                                    mb="10px"
                                  >
                                    <Typography className="tbl_hdng">VAT summary</Typography>
                                    <div className="tbl_rt">
                                      {/* <Form.Group className="globalSort">
                                        <Form.Select>
                                          <option>Daily</option>
                                          <option selected>Monthly</option>
                                          <option>Yearly</option>
                                        </Form.Select>
                                      </Form.Group> */}
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
                                                  {/* {moment(vatData?.response[0]?.content_id[0]?.updatedAt).format(`MMM YYYY`)} */}
                                                  {months[curr?._id?.month - 1]}  {curr?._id?.year}

                                                </p>
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
                              </Card> : null}

              </div>
            </Col>
          </Row>
        </Container>
      </div>
    </>
  );
};

export default memo(AccountsTables);
