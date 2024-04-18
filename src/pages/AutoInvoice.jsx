import {
  Card,
  Tooltip,
  Typography,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import { BsArrowLeft } from "react-icons/bs";
import { Link, useNavigate, useParams } from "react-router-dom";
import audioic from "../assets/images/audimg.svg";
import audioicon from "../assets/images/audio-icon.svg";
import calendericn from "../assets/images/calendarnic.svg";
import cameraic from "../assets/images/camera.svg";
import celebrity from "../assets/images/celebrity.svg";
import exclusiveic from "../assets/images/exclusive.svg";
import pdfic from "../assets/images/pdfic.svg";
import docsic from "../assets/images/docsic.svg";
import prslogo from "../assets/images/prs-logo.png";
import reuters from "../assets/images/reuters.png";
import shared from '../assets/images/share.png';
import videoic from "../assets/images/video.svg";
import watchic from "../assets/images/watch.svg";
import Header from "../component/Header";
const moment = require('moment');

import {
  Button,
  Col,
  Container,
  Row
} from "react-bootstrap";
import TopSearchesTipsCard from "../component/card/TopSearchesTipsCard";

import DbFooter from "../component/DbFooter";

import { useElements, useStripe } from '@stripe/react-stripe-js';
import calendar from "../assets/images/calendar.svg";
import Loader from "../component/Loader";
import { UserDetails } from "../component/Utils";
import { Post } from "../services/user.services";
import { useDarkMode } from "../context/DarkModeContext";

const AutoInvoice = () => {

  const stripe = useStripe();
  const elements = useElements();
  const [paymentRequest, setPaymentRequest] = useState(null);
  const { id } = useParams();
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState(null);

  const { profileData } = useDarkMode();
  const user = profileData;

  const ContentByID = async () => {
    setLoading(true);
    try {
      const resp = await Post(`mediaHouse/view/published/content`, {
        id: id,
      });
      setLoading(false)
      setData(resp.data.content);

    } catch (error) {
      // console.log(error);
      setLoading(false);
    }
  };

  useEffect(() => {
    ContentByID()
  }, [])



  useEffect(() => {
    if (!stripe || !elements) {
      return;
    }

    const pr = stripe.paymentRequest({
      country: 'US',
      currency: 'usd',
      total: {
        label: 'Demo total',
        amount: 1999,
      },
      requestPayerName: true,
      requestPayerEmail: true,
    });

    // Check the availability of the Payment Request API.
    pr.canMakePayment().then(result => {
      if (result) {
        setPaymentRequest(pr);
      }
    });

    pr.on('paymentmethod', async (e) => {
      const resp = await Post("mediahouse/createPayment", obj);

      if (backendError) {
        return;
      }

      const {
        error: stripeError,
        paymentIntent,
      } = await stripe.confirmCardPayment('sk_test_51NITL2AKmuyBTjDNklngpSDGnQK7JQjVzXh5cZdzyeAKf0zJiloShxogUofJ8417gRCn83SmyGx0Bz5cqhusNP1S00fIDDFmW9', {
        payment_method: e.paymentMethod.id,
      }, { handleActions: false });

      if (stripeError) {
        return;
      }

    });
  }, [stripe, elements]);


  const claculatedFun = () => {
    let val = (20 * data?.ask_price) / 100;
    return val
  }

  const paymentintents = async (curr) => {

    const obj = {
      image_id: curr._id,
      customer_id: UserDetails.stripe_customer_id,
      amount: data?.ask_price,
      type: curr.hasOwnProperty("content") ? "content" : "task",
    }

    setLoading(true);
    try {
      const resp = await Post("mediahouse/createPayment", obj);
      setLoading(false);
      window.open(resp.data.url, "_blank");
    } catch (error) {
      setLoading(false);
      console.error("Payment error:", error);
    }
  };

  const formatDateTime = (utcDateString) => {
    const utcDate = new Date(utcDateString);
    const localDateString = utcDate.toLocaleDateString('en-US', { timeZone: 'UTC' });
    const localTimeString = utcDate.toLocaleTimeString('en-US', { timeZone: 'UTC' });

    return { formattedDate: localDateString, formattedTime: localTimeString };
  };

  const navigate = useNavigate();
  useEffect(() => {
    if (data && data?.purchased_mediahouse.find((el) => el === JSON.parse(localStorage.getItem("user"))?._id)) {
      navigate("/");
    }
  }, [data, navigate]);

  useEffect(() => {
    
    window.addEventListener("focus", () => {
      ContentByID();
    })

    return () => window.removeEventListener("focus", () => {
      ContentByID();
    })
  }, [])

  return (
    <>
      {loading && <Loader />}
      <Header />
      <div className="page-wrap rtng_page">

        <div className="feedContent_header">
          <Link onClick={() => window.history.back()} className='back_link mb-3'><BsArrowLeft className='text-pink' /> Back </Link>
        </div>
        <Container fluid>
          <Row>
            <Col md={12}>

              <Row className="me-2">
                <Col md={12} className="dash-tabs-wrap pe-0">
                  <div className="dash-tabs invoice-lft">

                    <Row>
                      <Col md={6}>
                        <div className="prs-logo">
                          <img src={prslogo} alt="" />
                        </div>
                      </Col>

                      <Col md={6}>
                        <div className="text-end invce-num">
                          <h1 className="">Invoice</h1>
                          <p>
                            <span> <img src={calendericn} alt="" /> </span>
                            <span>{moment().format('DD MMM YYYY')}</span>

                          </p>

                        </div>
                      </Col>
                    </Row>

                    <hr />
                    <Row className="cs-mr">
                      <Col md={6}>
                        <div className="invoice-text">
                          <p>Invoice # PH 672321</p>
                        </div>
                      </Col>

                      <Col md={6}>
                        <div className="text-end trans-id">

                          <p>
                            <span> <img src={calendericn} alt="" /> </span>
                            <span>{moment().format('DD MMM YYYY')}</span>

                          </p>

                        </div>
                      </Col>
                    </Row>

                    <Row>
                      <Col md={6}>
                        <div className="ads-card">
                          <p className="from">From</p>

                          <h4>Presshop Media UK Limited</h4>
                          <p>167-169, Great Portland St, <br /> 5th Floor, London, <br/>W1W 5PF</p>
                          <p>Company # 13522872</p>
                          <p> VAT # 450 5678 83</p>

                        </div>
                      </Col>

                      <Col md={6}>
                        <div className="ads-card">

                          <div className="myflex">
                            <span>
                              <p className="from">To</p>

                              <h4>{user?.company_name}</h4>

                            </span>

                            <span className="reuters">
                              <img src={user?.profile_image} alt="" />
                            </span>

                          </div>
                          <p>{user?.office_details?.[0]?.address?.complete_address} <br/>{user?.office_details?.[0]?.address?.pincode}</p>
                          <p>Company # {user?.company_number}</p>
                          <p> VAT # {user?.company_vat}</p>

                        </div>
                      </Col>
                    </Row>

                    <div className="transactionBank_wrap trns_tbl mt-25">
                      <Row>
                        <Col md={12}>
                          <Card className="tbl_crd bg_grey">
                            <div className="">
                              <div className='d-flex justify-content-start' px='20px' mb='10px'>
                                <Typography className='tbl_hdng'>
                                  Invoice details
                                </Typography>

                              </div>

                              <div className="fix_ht_table ">
                                <table width='100%' mx='20px' variant='simple' className="common_table">
                                  <thead>
                                    <tr>
                                      <th className='cnt_prchsd_th'>Content</th>
                                      <th>Heading</th>
                                      <th className="text-nowrap">Time & date</th>
                                      <th>Type</th>
                                      <th>Licence</th>
                                      <th>Category</th>
                                      <th style={{textAlign:"right"}} >Amount</th>

                                    </tr>
                                  </thead>
                                  <tbody>
                                    {<tr>

                                      <td className=''>

                                        {
                                          data?.content[0]?.media_type === "image" 
                                          ? 
                                          <img src={data?.content[0]?.watermark} className='cntnt-img' alt="img" />
                                          :
                                          data?.content[0]?.media_type === "video" 
                                          ? 
                                          <img src={videoic} className='cntnt-img' />
                                          :
                                          data?.content[0]?.media_type === "audio" 
                                          ? 
                                          <img src={audioic} className='cntnt-img' />
                                          :
                                          data?.content[0]?.media_type === "pdf" 
                                          ? 
                                          <img src={docsic} className='cntnt-img' />
                                          :
                                          null
                                        }
                                      </td>
                                      <td>
                                        <div className="desc">
                                          <p>
                                            {data?.heading}
                                          </p>
                                        </div>
                                      </td>
                                      <td className="timedate_wrap">
                                        <p className="timedate"><img src={watchic} className="icn_time" />{moment(data?.published_time_date).format('h:mm:A')}</p>
                                        <p className="timedate"><img src={calendar} className="icn_time" />{moment(data?.published_time_date).format('DD MMM YYYY')}</p>
                                      </td>

                                      <td>
                                      <Tooltip title={data?.content[0]?.media_type}>
                                        <img src={data?.content[0]?.media_type == 'Photo' ? cameraic : data?.content[0]?.media_type == 'Audio' ? audioicon : data?.content[0]?.media_type == 'Pdf' ? docsic : data?.content[0]?.media_type == 'Video' ? videoic : null} 
                                        className='tbl_ic' 
                                        alt="camera" />
                                      </Tooltip>
                                      </td>

                                      <td className='text-center'>
                                        <Tooltip title="Shared">
                                          <img  src={data?.type == "shared" ? shared : exclusiveic} className='tbl_ic' alt="camera" />
                                        </Tooltip>
                                      </td>

                                      <td className="timedate_wrap">
                                        <Tooltip title="Celebrity">
                                          <img  src={data?.category_id?.name == "Celebrity" ? celebrity : celebrity} className='tbl_ic' alt="Content category" />
                                        </Tooltip>
                                      </td>

                                      <td >
                                        <p className='ttl_prc ' style={{textAlign:"right", marginRight:"5px"}} >
                                          {`£${data?.ask_price}`}
                                        </p>
                                      </td>
                                    </tr>}
                                  </tbody>
                                </table>

                                <div className="tble-subtotal">
                                  <div className="subtotal-list">
                                    <div className="sub-items">
                                      <span> <b> Subtotal</b> </span>
                                      <span>£{data?.ask_price}</span>
                                    </div>

                                    <div className="sub-items">
                                      <span> <b>VAT @20%</b> </span>
                                      <span>{`£${claculatedFun()}`}</span>
                                    </div>

                                    <div className="sub-items">
                                      <span> <b>Total</b> </span>
                                      <span><b>{`£${data?.ask_price + claculatedFun()}`}</b></span>
                                    </div>

                                    <div className="sub-items">
                                      <span> <b>Paid</b> </span>
                                      <span>£0</span>
                                    </div>

                                    <div className="sub-items">
                                      <span> <b>Balance due</b> </span>
                                      <span><b>{`£${data?.ask_price + claculatedFun()}`}</b></span>
                                    </div>
                                  </div>
                                </div>

                              </div>
                            </div>
                          </Card>
                        </Col>
                      </Row>
                    </div>
                  </div>
                </Col>
              </Row>
            </Col>
          </Row>
          <div className="pymnt-smry">
            <Row style={{ display: "flex", justifyContent: "space-between" }}>
              <Col md={4}>
                <h4>Payment summary</h4>
                <p>
                  Payment of <b>£{data?.ask_price + claculatedFun()} (inc VAT) </b> to Presso Media UK Limited towards purchase of content listed in the invoice particulars
                </p>
              </Col>


              <Col md={4}>
                {/* {paymentRequest && <PaymentRequestButtonElement options={{ paymentRequest }} />} */}
                <Button
                  variant=""
                  className="theme-btn custom-ab mb-4 mt-2 w-100 sm_btn"
                  onClick={() => paymentintents(data)}
                >
                  <span>Pay {`£${data?.ask_price + claculatedFun()}`}</span>
                </Button>
              </Col>
            </Row>

            <p className="pls-rfr">
              Please refer to <b onClick={()=> navigate("/terms-and-conditions")}>terms and conditions.</b>  If you have any question regarding the invoice, please <b onClick={() => navigate("/contact-us-post")}>contact</b>  our helpful teams who are available 24x7 to assist you. Thank you
            </p>

            <p className="end-stripe">
              <span>Payment securely processed by</span>
              <span><img src={stripe} alt="" /></span>
            </p>
          </div>
          <div className="mt-0">
            <TopSearchesTipsCard />
          </div>

        </Container>
      </div>
      <DbFooter />
    </>
  );
};

export default AutoInvoice;
