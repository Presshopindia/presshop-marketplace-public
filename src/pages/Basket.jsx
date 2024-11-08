import { Card, Tooltip, Typography } from "@mui/material";
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
import shared from "../assets/images/share.png";
import videoic from "../assets/images/video.svg";
import stripeLogo from "../assets/images/stripe.png";
import contentVideo from "../assets/images/contentVideo.svg";
import watchic from "../assets/images/watch.svg";
import Header from "../component/Header";
const moment = require("moment");

import { Button, Col, Container, Row } from "react-bootstrap";
import TopSearchesTipsCard from "../component/card/TopSearchesTipsCard";
import DbFooter from "../component/DbFooter";
import calendar from "../assets/images/calendar.svg";
import Loader from "../component/Loader";
import { Get, Post } from "../services/user.services";
import { useDarkMode } from "../context/DarkModeContext";
import {
  appliedPromoodeValue,
  totalAmountAfterPromocodeAndVat,
  formatAmountInMillion,
  successToasterFun,
} from "../component/commonFunction";
import Form from "react-bootstrap/Form";
import InputGroup from "react-bootstrap/InputGroup";
import { forEach } from "lodash";

const Basket = () => {
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState(null);
  const [totalAmount, setTotalAmount] = useState({
    totalAmount: 0,
    amountWithVat: 0,
  });
  const [promoCode, setPromoCode] = useState({
    value: "",
    code: "",
    show: false,
    error: "",
    off: "",
  });

  const { cartCount, setCartCount, profileData } = useDarkMode();
  const user = profileData;
  console.log("userData", user);
  const navigate = useNavigate();

  async function getCountOfBasketItems() {
    try {
      const res = await Get(`mediaHouse/getBasketDataCount`);

      console.log("count", res?.data?.data);
      setCartCount(res?.data?.data || 0);
      // setBasketItemsCount(res?.data?.data || 0);
    } catch (error) {
      console.log("basketcountError", error);
    }
  }

  const ContentByID = async () => {
    setLoading(true);
    try {
      const resp = await Post(`mediaHouse/getBasketData`, { type: "task" });
      setData(resp?.data?.data);
      setLoading(false);
    } catch (error) {
      setLoading(false);
    }
  };

  const paymentintents = async (data) => {
    const UserDetails = JSON.parse(localStorage.getItem("user"));
    const paymentData = {
      data: [],
      product: [],
    };

    data?.forEach((curr, index) => {
      // console.log("curr?.details?.stripe_account_id",curr?.details?.stripe_account_id)
      // hopper_stripe_id = curr?.details?.hopper_id;

      const hooperPricePercentage =
        curr?.details?.hopperDetails?.category == "pro"
          ? (curr?.details?.original_ask_price * 15) / 100
          : curr?.details?.original_ask_price / 5;
      const hopper_charge_ac_category =
        curr?.details?.hopperDetails?.category == "pro" ? 15 : 20;

      const obj = {};
      obj.user_id = user?._id;
      obj.product_id = curr?.post_id;
      obj.customer_id = user?.stripe_customer_id;
      obj.amount = +curr?.details?.original_ask_price;
      obj.type = curr?.type;
      obj.original_ask_price = +curr?.details?.original_ask_price;
      //  obj.offer=curr?.details?.offer;
      obj.offer = false;
      obj.is_charity = curr?.details?.is_charity;
      obj.description = curr?.details?.heading;
      obj.application_fee = +(
        curr?.details?.original_ask_price / 5 +
        hooperPricePercentage
      );
      obj.stripe_account_id = curr?.details?.stripe_account_id;
      obj.hopper_charge_ac_category = hopper_charge_ac_category;
      obj.items_vat_amount = curr?.details?.ask_price / 5;

      // Add coupon code
      if (promoCode?.code) {
        obj.coupon = promoCode?.code;
      }
      paymentData?.data?.push(obj);
    });

    data?.forEach((curr, index) => {
      const obj = {
        price_data: {
          currency: "gbp",
          product_data: {
            name: curr?.details?.heading,
            metadata: {
              customer_id: user?.stripe_customer_id,
              amount: Number(curr?.details?.ask_price),
              type: "content",
            },
          },
          unit_amount: Number(curr?.details?.ask_price) * 100,
        },
        quantity: 1,
        tax_rates: ["txr_1Q54oaCf1t3diJjXVbYnv7sO"],
      };
      paymentData.product.push(obj);
    });

    //   paymentData.product=[
    //     {
    //         "price_data": {
    //             "currency": "gbp",
    //             "product_data": {
    //                 "name": "Challanges",
    //                 "metadata": {
    //                     // "product_id": "670fc0a808d2546940499bd2",
    //                     "customer_id":user?.stripe_customer_id,
    //                     "amount": Number(totalAmount?.totalAmount),
    //                     "type": "content"
    //                 }
    //             },
    //             "unit_amount": Number(totalAmount?.totalAmount)*100,
    //         },
    //         "quantity": 1,
    //         "tax_rates": [
    //             "txr_1Q54oaCf1t3diJjXVbYnv7sO"
    //         ]
    //     }
    // ];

    try {
      const resp = await Post("mediaHouse/createPaymentforBasket", paymentData);

      window.open(resp.data.url, "_blank");
    } catch (error) {
      successToasterFun(error?.response?.data?.errors?.msg);
    }
  };

  async function handleRemoveBasketItems(element) {
    try {
      console.log("element", element);
      let obj = {};

      if (element?.type == "task") {
        obj = {
          type: "uploaded_content",
          uploaded_content: element.content_id,
        };
      } else {
        obj = {
          type: element?.type == "task" ? "task" : "content",
          post_id: element.post_id,
          content: element?.content?.map((el) => {
            return {
              media_type: el?.media_type,
              media: el?.media,
              watermark: el?.watermark,
              content_id: el?._id,
            };
          }),
        };
      }

      console.log("object", obj);
      const res = await Post(`mediaHouse/addToBasket`, { order: [obj] });
      if (res) {
        ContentByID();
        getCountOfBasketItems();
      }
    } catch (error) {}
  }

  function calculateTotalAmount(data) {
    try {
      // const amountDetails=data.
      let sum = 0;
      data.forEach((value, index) => {
        const askingPrice = value?.details?.ask_price;
        console.log("askingPrice", askingPrice);
        sum += askingPrice;
      });

      let amountWithVat = sum * (120 / 100);
      let vatAmount = sum * (20 / 100);

      setTotalAmount((old) => ({
        ...(old || {}),
        totalAmount: sum,
        amountWithVat: amountWithVat,
        vatAmount,
      }));
    } catch (error) {}
  }

  function capitaliseLetterPromocode(value) {
    let result = "";
    if (value) {
      const data = value.trim().split("");
      console.log(data);
      for (let ele of data) {
        // Check if the character is not a number using isNaN()
        if (isNaN(ele) && typeof ele === "string") {
          // Convert non-numeric characters to uppercase
          result += ele.toUpperCase();
        } else {
          result += ele;
        }
      }

      return result;
    }
  }

  const checkPromoCode = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      let promocodeValue = capitaliseLetterPromocode(promoCode.value);
      // console.log("promocodeValue",promocodeValue);
      const resp = await Post("mediahouse/checkPromocode", {
        code: promocodeValue,
      });
      setPromoCode({
        ...promoCode,
        code: resp?.data?.data?.code,
        off: resp?.data?.data?.percent_off,
        show: false,
      });
      successToasterFun("Promocode applied successfully");
      setLoading(false);
    } catch (error) {
      setPromoCode({ ...promoCode, error: error?.response?.data?.message });
      successToasterFun(error?.response?.data?.message);
      setLoading(false);
    }
  };

  useEffect(() => {
    ContentByID();
  }, []);
  useEffect(() => {
    if (data) {
      calculateTotalAmount(data);
    }
  }, [data]);

  console.log("basketdata", data);

  return (
    <>
      {loading && <Loader />}
      <Header />
      <div className="page-wrap rtng_page">
        <div className="feedContent_header">
          <Link
            onClick={() => window.history.back()}
            className="back_link mb-3"
          >
            <BsArrowLeft className="text-pink" /> Back{" "}
          </Link>
        </div>
        <Container fluid>
          <Row>
            <Col md={12}>
              <Row className="me-2">
                <Col md={12} className="dash-tabs-wrap pe-0">
                  <div className="dash-tabs invoice-lft">
                    <Row>
                      <Col md={6}>
                        <div className="d-flex">
                          <div className="prs-logo">
                            <img src={prslogo} alt="" />
                          </div>
                        </div>
                      </Col>

                      <Col md={6}>
                        <div className="text-end invce-num">
                          <h1 className="">Invoice</h1>
                        </div>
                      </Col>
                    </Row>

                    <hr />
                    <Row className="cs-mr">
                      <Col md={6}>
                        <div className="invoice-text"></div>
                      </Col>

                      <Col md={6}>
                        <div className="text-end trans-id">
                          <p>
                            <span>
                              {" "}
                              <img src={calendericn} alt="" />{" "}
                            </span>
                            <span>{moment().format("DD MMM YYYY")}</span>
                          </p>
                        </div>
                      </Col>
                    </Row>

                    <Row>
                      <Col md={6}>
                        <div className="ads-card">
                          <p className="from">From</p>
                          <h4>Presso Media UK Limited</h4>
                          <p>
                            167-169, Great Portland Street, <br /> London,{" "}
                            <br />
                            W1W 5PF
                          </p>
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
                          <p>
                            {
                              user?.office_details?.[0]?.address
                                ?.complete_address
                            }{" "}
                            <br />
                            {user?.office_details?.[0]?.address?.pincode}
                          </p>
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
                              <div
                                className="d-flex justify-content-start"
                                px="20px"
                                mb="10px"
                              >
                                <Typography className="tbl_hdng">
                                  Invoice details
                                </Typography>
                              </div>

                              <div className="fix_ht_table ">
                                <table
                                  width="100%"
                                  mx="20px"
                                  variant="simple"
                                  className="common_table"
                                >
                                  <thead>
                                    <tr>
                                      <th className="cnt_prchsd_th">Content</th>
                                      <th>Heading</th>
                                      <th className="text-nowrap">
                                        Time & date
                                      </th>
                                      <th className="text-center">Type</th>
                                      <th className="text-center">License</th>
                                      <th className="text-center">Category</th>
                                      <th className="text-center">
                                        Sale Amount
                                      </th>
                                    </tr>
                                  </thead>
                                  <tbody>
                                    {data?.map((el, i) => {
                                      const contentType = el?.content;
                                      let imageAcToType = "";
                                      let videoAcToType = "";
                                      let docAcToType = "";

                                      contentType.map((ele, index) => {
                                        if (ele.media_type == "image") {
                                          imageAcToType = cameraic;
                                        } else if (ele.media_type == "video") {
                                          videoAcToType = videoic;
                                        } else if (ele.media_type == "pdf") {
                                          docAcToType = docsic;
                                        }
                                      });

                                      return (
                                        <tr key={i}>
                                          <td className="content_img_td d-flex position-relative">
                                            <div className="tbl_cont_wrp">
                                              {el?.content[0]?.media_type ===
                                              "image" ? (
                                                <img
                                                  src={
                                                    el?.content[0]?.watermark
                                                  }
                                                  className="content_img"
                                                  alt="img"
                                                />
                                              ) : el?.content[0]?.media_type ===
                                                "video" ? (
                                                <img
                                                  src={
                                                    el?.content[0]?.watermark
                                                  }
                                                  className="cntnt-img content_img"
                                                />
                                              ) : el?.content[0]?.media_type ===
                                                "audio" ? (
                                                <img
                                                  src={audioic}
                                                  className="cntnt-img content_img"
                                                />
                                              ) : el?.content[0]?.media_type ===
                                                "pdf" ? (
                                                <img
                                                  src={docsic}
                                                  className="cntnt-img content_img"
                                                />
                                              ) : null}
                                              <span className="cont_count">
                                                {el?.content?.length || 0}
                                              </span>
                                            </div>
                                            <div
                                              onClick={() => {
                                                handleRemoveBasketItems(el);
                                              }}
                                            >
                                              <i class="bi bi-trash3 custom_delete_icon"></i>
                                              {/* <i class="bi bi-trash3-fill custom_delete_icon"></i> */}
                                            </div>
                                          </td>
                                          <td>
                                            <div className="desc">
                                              <p>{el?.details?.heading}</p>
                                            </div>
                                          </td>
                                          <td className="timedate_wrap">
                                            <p className="timedate">
                                              <img
                                                src={watchic}
                                                className="icn_time"
                                              />
                                              {moment(el?.order_date).format(
                                                "h:mm:A"
                                              )}
                                            </p>
                                            <p className="timedate">
                                              <img
                                                src={calendar}
                                                className="icn_time"
                                              />
                                              {moment(el?.order_date).format(
                                                "DD MMM YYYY"
                                              )}
                                            </p>
                                          </td>

                                          <td className="text-center">
                                            <Tooltip
                                              title={
                                                el?.content[0]?.media_type ==
                                                "image"
                                                  ? "Photo"
                                                  : el?.content[0]
                                                      ?.media_type == "audio"
                                                  ? "Audio"
                                                  : el?.content[0]
                                                      ?.media_type == "video"
                                                  ? "Video"
                                                  : el?.content[0]
                                                      ?.media_type == "pdf"
                                                  ? "Pdf"
                                                  : "Scan"
                                              }
                                            >
                                              {/* <img
                                                src={
                                                  el?.content[0]?.media_type ==
                                                  "image"
                                                    ? cameraic
                                                    : el?.content[0]
                                                        ?.media_type == "audio"
                                                    ? audioicon
                                                    : el?.content[0]
                                                        ?.media_type == "pdf"
                                                    ? docsic
                                                    : el?.content[0]
                                                        ?.media_type == "video"
                                                    ? videoic
                                                    : null
                                                }
                                                className="tbl_ic"
                                                alt="camera"
                                              /> */}
                                              {imageAcToType ? (
                                                <img
                                                  src={cameraic}
                                                  className="tbl_ic"
                                                  alt="Photo"
                                                />
                                              ) : (
                                                ""
                                              )}
                                              {videoAcToType ? (
                                                <img
                                                  src={videoic}
                                                  className="tbl_ic"
                                                  alt="Video"
                                                />
                                              ) : (
                                                ""
                                              )}
                                              {docAcToType ? (
                                                <img
                                                  src={docsic}
                                                  className="tbl_ic"
                                                  alt="Pdf"
                                                />
                                              ) : (
                                                ""
                                              )}
                                            </Tooltip>
                                          </td>

                                          <td className="text-center">
                                            <Tooltip
                                              title={
                                                el?.details?.type !==
                                                "exclusive"
                                                  ? "Shared"
                                                  : "exclusive"
                                              }
                                            >
                                              <img
                                                src={
                                                  el?.details?.type !==
                                                  "exclusive"
                                                    ? shared
                                                    : exclusiveic
                                                }
                                                className="tbl_ic"
                                                alt="camera"
                                              />
                                            </Tooltip>
                                          </td>

                                          <td className="text-center">
                                            {/* content */}
                                            <Tooltip
                                              title={
                                                el?.details?.categoryDetails
                                                  ?.name
                                              }
                                            >
                                              <img
                                                src={
                                                  el?.details?.categoryDetails
                                                    ?.icon
                                                }
                                                alt="shared"
                                                className="icn"
                                              />
                                            </Tooltip>
                                          </td>

                                          {/* <td className="text-center">
                                          <Tooltip title={el?.category_name}>
                                            {el?.type}
                                            <img src={el?.category_icon} className='tbl_ic' alt="Content category" />
                                          </Tooltip>
                                        </td> */}

                                          <td>
                                            <p
                                              className="ttl_prc "
                                              style={{
                                                textAlign: "right",
                                                marginRight: "15px",
                                              }}
                                            >
                                              £
                                              {
                                                // data?.chatdata?.amount
                                                //   ? formatAmountInMillion(
                                                //       data?.chatdata?.amount
                                                //     )
                                                //   :
                                                formatAmountInMillion(
                                                  el?.details?.ask_price
                                                )
                                              }
                                              {/* {`£${formatAmountInMillion(data?.chatdata?.amount ? data?.chatdata?.amount : data?.details?.ask_price)}`} */}
                                            </p>
                                          </td>
                                        </tr>
                                      );
                                    })}
                                  </tbody>
                                </table>

                                <div className="tble-subtotal custm-tble-subtotal">
                                  <div className="subtotal-list">
                                    <div className="sub-items">
                                      <span>
                                        {" "}
                                        <b>Amount</b>{" "}
                                      </span>
                                      <span>
                                        £
                                        {formatAmountInMillion(
                                          totalAmount?.totalAmount ?? 0
                                        )}
                                      </span>
                                    </div>

                                    {/* offeradded */}
                                    {!promoCode?.code ? (
                                      <div
                                        className="sub-items justify-content-end"
                                        onClick={() =>
                                          setPromoCode({
                                            ...promoCode,
                                            show: !promoCode.show,
                                            error: "",
                                            code: "",
                                            off: "",
                                          })
                                        }
                                      >
                                        <span className="promo-cde">
                                          {/* Promo Code */}
                                          <b>
                                            {" "}
                                            Unlock savings! Enter your Promo
                                            Code here
                                          </b>
                                        </span>
                                      </div>
                                    ) : (
                                      <div className="sub-items">
                                        <span>
                                          {" "}
                                          Promo Code discount{" "}
                                        </span>
                                        <span>
                                          {/* {promoCode?.off} */}
                                          -£
                                          {formatAmountInMillion(
                                            (totalAmount?.totalAmount *
                                              promoCode?.off) /
                                              100 ?? 0
                                          )}
                                        </span>
                                      </div>
                                    )}

                                    {promoCode.show ? (
                                      <>
                                        <form
                                          className="add-coupon"
                                          onSubmit={(e) => checkPromoCode(e)}
                                        >
                                          <InputGroup className="input-cupn">
                                            <Form.Control
                                              placeholder="Promo Code"
                                              aria-label="Recipient's username"
                                              aria-describedby="basic-addon2"
                                              onChange={(e) =>
                                                setPromoCode({
                                                  ...promoCode,
                                                  value: e.target.value,
                                                  error: "",
                                                  code: "",
                                                  off: "",
                                                })
                                              }
                                            />
                                            <span
                                              className="button-apply clickable"
                                              onClick={(e) => checkPromoCode(e)}
                                            >
                                              Apply
                                            </span>
                                          </InputGroup>
                                        </form>
                                      </>
                                    ) : null}

                                    <div className="sub-items">
                                      <span>
                                        {" "}
                                        <b> Subtotal</b>{" "}
                                      </span>
                                      <span>
                                        £
                                        {!promoCode?.off
                                          ? formatAmountInMillion(
                                              totalAmount?.totalAmount ?? 0
                                            )
                                          : formatAmountInMillion(
                                              appliedPromoodeValue(
                                                +(
                                                  totalAmount?.totalAmount ?? 0
                                                ),
                                                promoCode.off
                                              )
                                            )}
                                      </span>
                                    </div>

                                    <div className="sub-items">
                                      <span>
                                        {" "}
                                        VAT @20%{" "}
                                      </span>
                                      <span>
                                        £
                                        {!promoCode?.off
                                          ? formatAmountInMillion(
                                              totalAmount?.vatAmount ?? 0
                                            )
                                          : formatAmountInMillion(
                                              appliedPromoodeValue(
                                                +(
                                                  totalAmount?.totalAmount ?? 0
                                                ),
                                                promoCode.off
                                              ) / 5
                                            )}
                                      </span>
                                    </div>

                                    <div className="sub-items">
                                      <span>
                                        {" "}
                                        <b>Total</b>{" "}
                                      </span>

                                      <span>
                                        £
                                        {!promoCode?.off
                                          ? formatAmountInMillion(
                                              totalAmount?.amountWithVat ?? 0
                                            )
                                          : formatAmountInMillion(
                                              totalAmountAfterPromocodeAndVat(
                                                +(
                                                  totalAmount?.totalAmount ?? 0
                                                ),
                                                promoCode.off
                                              )
                                            )}
                                      </span>
                                      {/* <span>
                                        <b>
                                          £
                                          {formatAmountInMillion(
                                            totalAmount?.amountWithVat ?? 0
                                          )}
                                        </b>
                                      </span> */}
                                    </div>

                                    <div className="sub-items">
                                      <span>
                                        {" "}
                                        Paid{" "}
                                      </span>
                                      <span>£0</span>
                                    </div>

                                    <div className="sub-items">
                                      <span>
                                        {" "}
                                        <b>Balance due</b>{" "}
                                      </span>
                                      <span>
                                        <b>
                                          £
                                          {!promoCode?.off
                                            ? formatAmountInMillion(
                                                totalAmount?.amountWithVat ?? 0
                                              )
                                            : formatAmountInMillion(
                                                totalAmountAfterPromocodeAndVat(
                                                  +(
                                                    totalAmount?.totalAmount ??
                                                    0
                                                  ),
                                                  promoCode.off
                                                )
                                              )}
                                          {/* {formatAmountInMillion(
                                            totalAmount?.totalAmount ?? 0
                                          )} */}
                                        </b>

                                        {/* <b>{`£${formatAmountInMillion(
                                          +(data?.chatdata?.amount
                                            ? data?.chatdata?.amount
                                            : data?.content?.ask_price)
                                        )}`}</b> */}
                                      </span>
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
            <div
              className="paywrap"
              style={{ display: "flex", justifyContent: "space-between" }}
            >
              <Row style={{ display: "flex", justifyContent: "space-between" }}>
                <Col md={12}>
                  <h4>Payment summary</h4>
                  <p>
                    Payment of{" "}
                    <b>
                      {/* £{formatAmountInMillion(totalAmount?.totalAmount ?? 0)}{" "} */}
                      £
                      {!promoCode?.off
                        ? formatAmountInMillion(totalAmount?.amountWithVat ?? 0)
                        : formatAmountInMillion(
                            totalAmountAfterPromocodeAndVat(
                              +(totalAmount?.totalAmount ?? 0),
                              promoCode.off
                            )
                          )}{" "}
                      {/* {formatAmountInMillion(
                        +(data?.chatdata?.amount
                          ? data?.chatdata?.amount
                          : data?.content?.ask_price)
                      )}{" "} */}
                      (inc VAT){" "}
                    </b>{" "}
                    to Presso Media UK Limited towards purchase of content
                    listed in the invoice particulars
                  </p>
                </Col>
              </Row>
              <div
                className="actn-btn"
                style={{ display: "flex", justifyContent: "space-between" }}
              >
                <div className="btn-basket">
                  <Button
                    variant=""
                    className="theme-btn custom-ab mb-4 mt-2 w-100 sm_btn"
                    onClick={() => {
                      navigate("/published-content");
                    }}
                  >
                    <span>Add more content</span>
                  </Button>
                </div>

                <div className="btn-pay" md={2}>
                  <Button
                    variant=""
                    className="theme-btn custom-ab mb-4 mt-2 w-100 sm_btn"
                    onClick={() => paymentintents(data)}
                  >
                    <span>
                      Pay £
                      {!promoCode?.off
                        ? formatAmountInMillion(totalAmount?.amountWithVat ?? 0)
                        : formatAmountInMillion(
                            totalAmountAfterPromocodeAndVat(
                              +(totalAmount?.totalAmount ?? 0),
                              promoCode.off
                            )
                          )}{" "}
                      {/* {formatAmountInMillion(totalAmount?.amountWithVat ?? 0)} */}
                      {/* {`£${formatAmountInMillion(
                        +(data?.chatdata?.amount
                          ? data?.chatdata?.amount
                          : data?.content?.ask_price)
                      )}`} */}
                    </span>
                  </Button>
                </div>
              </div>
            </div>
            <p className="pls-rfr">
              Please refer to{" "}
              <b
                onClick={() => navigate("/terms-and-conditions")}
                style={{ cursor: "pointer" }}
              >
                terms and conditions.
              </b>{" "}
              If you have any question regarding the invoice, please{" "}
              <b
                onClick={() => navigate("/contact-us-post")}
                style={{ cursor: "pointer" }}
              >
                contact
              </b>{" "}
              our helpful teams who are available 24x7 to assist you. Thank you
            </p>

            <p className="end-stripe">
              <span>Payment securely processed by</span>
              <span>
                <img src={stripeLogo} alt="" />
              </span>
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

export default Basket;
