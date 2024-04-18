import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Header from "../component/Header";
import DashBoardCardList from "../component/card/DashBoardCardList";
import { Card, CardActions, CardContent, Typography } from "@mui/material";
import {
  BsArrowDown,
  BsArrowLeft,
  BsArrowRight,
  BsArrowUp,
} from "react-icons/bs";
import TopSearchesTipsCard from "../component/card/TopSearchesTipsCard";
import { Form, Container, Row, Col, Dropdown } from "react-bootstrap";
import moment from "moment/moment";
import DbFooter from "../component/DbFooter";
import { MdOutlineWatchLater } from "react-icons/md";
import { Get, Patch } from "../services/user.services";
import userimg1 from "../assets/images/userimages/usr1.png";
import { AiFillStar, AiOutlineStar } from "react-icons/ai";
import Loader from "../component/Loader";
import { Rating } from "react-simple-star-rating";
import reviewicn from "../assets/images/review-txt-icn.png";

const RatingReview = () => {
  const [loading, setLoading] = useState(false);
  const [receivedRating, setReceivedRating] = useState([]);
  const [sendedRating, setSendedRating] = useState([]);
  const [hopperList, setHopperList] = useState([]);
  const [data, setData] = useState([]);
  const [receivedCount, setReceivedCount] = useState();
  const [sendCount, setSendCount] = useState();
  const [averageRating, setAverageRating] = useState();
  const [averagePercentage, setAveragePercentage] = useState();
  const [ratingWithPercentageReceived, setRatingWithPercentageReceived] =
    useState();
  const [ratingWithPercentageSend, setRatingWithPercentageSend] = useState();
  const [task, setTask] = useState([]);

  // Payload for review with rating-
  const [payload, setPayload] = useState({
    hopper_id: "",
    rating: 0,
    type: [],
    review: "",
    sender_type: "",
    content_id: "",
    content_type: "",
  });

  const [show, setShow] = useState(false);
  const [show1, setShow1] = useState(false);
  const [rate, setRate] = useState({
    received: "",
    given: "",
  });

  const [containerSort, setContainerSort] = useState({
    typeOfContainer: "",
    valueOfContainer: "",
  });
  const [containerSort1, setContainerSort1] = useState({
    typeOfContainer: "",
    valueOfContainer: "",
  });

  // Handle change-
  const handleChange = (e) => {
    const { value, name } = e.target;
    setPayload({ ...payload, [name]: value });
  };

  // Handle click-
  const handleClick = (type, value) => {
    // Check if the value already exists in the array

    if (type !== 'type') {
      // If exists, remove it
      setPayload({
        ...payload,
        [type]: value,
      });
    }
    else if (payload[type].includes(value)) {
      // If exists, remove it
      setPayload({
        ...payload,
        [type]: payload[type].filter((item) => item !== value),
      });
    } else {
      // If not exists, add it
      setPayload({ ...payload, [type]: [...payload[type], value] });
    }
  };


  // Handle submit-
  const handleSubmit = async () => {
    try {
      setLoading(true);
      const result = await Patch("mediahouse/ratingforunratedcontent", {...payload, type: payload.type.join(", ")});
      if (result.status === 200) {
        setPayload({
          rating: 0,
          type: "",
          review: "",
          sender_type: "",
        });
        setLoading(false);
        receivedRatingFromHopper();
      }
    } catch (error) {
      console.log(error)
      setLoading(false);
    }
  };

  const onPointerEnter = () => console.log("Enter");
  const onPointerLeave = () => console.log("Leave");
  const onPointerMove = (value, index) => console.log(value, index);

  const receivedRatingFromHopper = async () => {
    setLoading(true);
    try {
      const res = await Get(
        `mediahouse/allratedcontent?${containerSort1?.typeOfContainer}=${containerSort1?.valueOfContainer}&type=${containerSort1?.typeOfContainer}`
      );
      if (res) {
        // console.log(res, `<<<<<<<what it contain`)
        setReceivedRating(res?.data?.allrecievedrating?.data);
        setRatingWithPercentageReceived(res?.data?.allrecievedrating);
        setSendedRating(res?.data?.allsendrating?.data);
        setRatingWithPercentageSend(res?.data?.allsendrating);

        setLoading(false);
      }
    } catch (error) {
      setLoading(false);
    }
  };

  const receivedRatingFromHopper1 = async () => {
    setLoading(true);
    try {
      const res = await Get(
        `mediahouse/allratedcontent?${containerSort?.valueOfContainer}=${containerSort?.valueOfContainer}&type=${containerSort?.typeOfContainer}`
      );
      if (res) {
        // console.log(res, `<<<<<<<what it contain`)
        setReceivedCount(res?.data?.review_recivedcount);
        setSendCount(res?.data?.review_given_count);

        setLoading(false);
      }
    } catch (error) {
      setLoading(false);
    }
  };

  useEffect(() => {
    receivedRatingFromHopper1();
  }, [containerSort?.typeOfContainer, containerSort?.valueOfContainer]);

  const averageOfRating = async () => {
    setLoading(true);
    try {
      const res = await Get(
        `mediahouse/avgRating?${containerSort?.valueOfContainer}=${containerSort?.valueOfContainer}`
      );
      if (res) {
        setAverageRating(res?.data?.data[0]);
        setAveragePercentage(res?.data);

        setLoading(false);
      }
    } catch (error) {
      setLoading(false);
    }
  };

  const HopperList = async () => {
    setLoading(true);
    try {
      const res = await Get(`mediahouse/listofHopperwithoutrating`);
      if (res) {
        setHopperList(res.data.data);
        setLoading(false);
      }
    } catch (error) {
      setLoading(false);
    }
  };

  const ContentDetails = async (hopper_id) => {
    // console.log("hopper_id", hopper_id)
    setLoading(true);
    try {
      const obj = {};
      const res = await Get(
        `mediahouse/contentwithouthrating?hopper_id=${hopper_id}`
      );
      if (res.data) {
        setTask(res.data.data);
        setLoading(false);
      }
    } catch (error) {
      setLoading(false);
    }
  };

  useEffect(() => {
    averageOfRating();
  }, [containerSort?.valueOfContainer]);

  useEffect(() => {
    receivedRatingFromHopper();
    HopperList();
    // ContentDetails()
  }, [containerSort1?.typeOfContainer, containerSort1?.valueOfContainer]);

  // mediahouse/avgRating
  // console.log("task 177", task)


  const [selectedHopper, setSelectedHopper] = useState(null); // State to track selected hopper

  const handleHopperSelect = (hopper) => {
    setSelectedHopper(hopper);
  };


  return (
    <>
      {loading && <Loader />}
      <Header />
      <div className="page-wrap rtng_page">
        <div className="">
          <Link onClick={() => history.back()} className="back_link mb-3">
            <BsArrowLeft className="text-pink" />
            Back
          </Link>
        </div>
        <Container fluid>
          <Row>
            <Col md={8}>
              <Row className="dashboardStat_cards crd_edit_wrap">
                <Col md={4} className="p-0 mb-0">
                  <Card className="dash-top-cards crd_edit">
                    <CardContent className="dash-c-body">
                      <div className="cardCustomHead">
                        <div className="edit_card_sel">
                          <Form.Group className="globalSort">
                            <Form.Select
                              onChange={(e) => {
                                const selectedValue = e.target.value;
                                if (selectedValue === "Daily") {
                                  setContainerSort((prev) => ({
                                    ...prev,
                                    typeOfContainer: "receivedcount",
                                    valueOfContainer: "daily",
                                  }));
                                } else if (selectedValue === "Weekly") {
                                  setContainerSort((prev) => ({
                                    ...prev,
                                    typeOfContainer: "receivedcount",
                                    valueOfContainer: "weekly",
                                  }));
                                } else if (selectedValue === "Monthly") {
                                  setContainerSort((prev) => ({
                                    ...prev,
                                    typeOfContainer: "receivedcount",
                                    valueOfContainer: "monthly",
                                  }));
                                } else if (selectedValue === "Yearly") {
                                  setContainerSort((prev) => ({
                                    ...prev,
                                    typeOfContainer: "receivedcount",
                                    valueOfContainer: "yearly",
                                  }));
                                }
                              }}
                            >
                              <option value="Daily">Daily</option>
                              <option value="Weekly">Weekly</option>
                              <option value="Monthly">Monthly</option>
                              <option value="Yearly">Yearly</option>
                            </Form.Select>
                          </Form.Group>
                        </div>
                        <Typography
                          variant="body2"
                          className="card-head-txt mb-2"
                        >
                          {receivedCount || 0}
                        </Typography>
                      </div>
                      <Typography
                        sx={{ fontSize: 14 }}
                        color="text.secondary"
                        gutterBottom
                        className="cardContent_head"
                      >
                        Reviews received
                      </Typography>
                      <div className="content_stat">
                        {ratingWithPercentageReceived?.type === "increase" ? (
                          <span className="stat_up">
                            <BsArrowUp />{" "}
                            {ratingWithPercentageReceived?.percentage} %
                          </span>
                        ) : (
                          <span className="stat_down">
                            <BsArrowDown />{" "}
                            {ratingWithPercentageReceived?.percentage} %
                          </span>
                        )}
                        <span>vs yesterday</span>
                      </div>
                    </CardContent>
                    <CardActions className="dash-c-foot">
                      <div className="card-imgs-wrap">
                        {receivedRating &&
                          receivedRating.slice(0, 3).map((curr) => {
                            return (
                              <img
                                className="card-img"
                                src={
                                  process.env.REACT_APP_AVATAR_IMAGE +
                                  curr?.from?.avatar_id?.avatar
                                }
                                alt="1"
                              />
                            );
                          })}
                        <span>
                          <BsArrowRight />
                        </span>
                      </div>
                    </CardActions>
                  </Card>
                </Col>
                <Col md={4} className="p-0 mb-0">
                  <Card className="dash-top-cards crd_edit ">
                    <CardContent className="dash-c-body">
                      <div className="cardCustomHead">
                        <div className="edit_card_sel">
                          <svg
                            width="20"
                            height="17"
                            viewBox="0 0 20 17"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <path
                              d="M0.747559 1.46875H19.4976V14.75C19.4976 14.9572 19.4152 15.1559 19.2687 15.3024C19.1222 15.4489 18.9235 15.5312 18.7163 15.5312H1.52881C1.32161 15.5312 1.12289 15.4489 0.976382 15.3024C0.829869 15.1559 0.747559 14.9572 0.747559 14.75V1.46875Z"
                              stroke="black"
                              stroke-linecap="round"
                              stroke-linejoin="round"
                            />
                            <path
                              d="M0.747559 6.15625H19.4976"
                              stroke="black"
                              stroke-linecap="round"
                              stroke-linejoin="round"
                            />
                            <path
                              d="M0.747559 10.8438H19.4976"
                              stroke="black"
                              stroke-linecap="round"
                              stroke-linejoin="round"
                            />
                            <path
                              d="M6.21631 6.15625V15.5312"
                              stroke="black"
                              stroke-linecap="round"
                              stroke-linejoin="round"
                            />
                          </svg>
                          <Form.Group className="globalSort">
                            <Form.Select
                              onChange={(e) => {
                                const selectedValue = e.target.value;
                                if (selectedValue === "Daily") {
                                  setContainerSort((prev) => ({
                                    ...prev,
                                    typeOfContainer: "sendcount",
                                    valueOfContainer: "daily",
                                  }));
                                } else if (selectedValue === "Weekly") {
                                  setContainerSort((prev) => ({
                                    ...prev,
                                    typeOfContainer: "sendcount",
                                    valueOfContainer: "weekly",
                                  }));
                                } else if (selectedValue === "Monthly") {
                                  setContainerSort((prev) => ({
                                    ...prev,
                                    typeOfContainer: "sendcount",
                                    valueOfContainer: "monthly",
                                  }));
                                } else if (selectedValue === "Yearly") {
                                  setContainerSort((prev) => ({
                                    ...prev,
                                    typeOfContainer: "sendcount",
                                    valueOfContainer: "yearly",
                                  }));
                                }
                              }}
                            >
                              <option value="Daily">Daily</option>
                              <option value="Weekly">Weekly</option>
                              <option value="Monthly">Monthly</option>
                              <option value="Yearly">Yearly</option>
                            </Form.Select>
                          </Form.Group>
                        </div>
                        <Typography
                          variant="body2"
                          className="card-head-txt mb-2"
                        >
                          {sendCount || 0}
                        </Typography>
                      </div>
                      <Typography
                        sx={{ fontSize: 14 }}
                        color="text.secondary"
                        gutterBottom
                        className="cardContent_head"
                      >
                        Reviews given
                      </Typography>
                      <div className="content_stat">
                        {ratingWithPercentageReceived?.type === "increase" ? (
                          <span className="stat_up">
                            <BsArrowUp /> {ratingWithPercentageSend?.percentage}{" "}
                            %
                          </span>
                        ) : (
                          <span className="stat_down">
                            <BsArrowDown />{" "}
                            {ratingWithPercentageSend?.percentage} %
                          </span>
                        )}
                        <span>vs last month</span>
                      </div>
                    </CardContent>
                    <CardActions className="dash-c-foot">
                      <div className="card-imgs-wrap">
                        {sendedRating?.slice(0, 3)?.map((curr) => {
                          return (
                            <img
                              className="card-img"
                              src={
                                curr?.to?.avatar_id?.avatar &&
                                process.env.REACT_APP_AVATAR_IMAGE +
                                  curr?.to?.avatar_id?.avatar
                              }
                              alt="1"
                            />
                          );
                        })}

                        <span>
                          <BsArrowRight />
                        </span>
                      </div>
                    </CardActions>
                  </Card>
                </Col>
                <Col md={4} className="p-0 mb-0">
                  <Card className="dash-top-cards crd_edit">
                    <CardContent className="dash-c-body">
                      <div className="cardCustomHead">
                        <div className="edit_card_sel">
                          <Form.Group className="globalSort">
                            <Form.Select
                              onChange={(e) => {
                                const selectedValue = e.target.value;
                                if (selectedValue === "Daily") {
                                  setContainerSort((prev) => ({
                                    ...prev,

                                    valueOfContainer: "daily",
                                  }));
                                } else if (selectedValue === "Weekly") {
                                  setContainerSort((prev) => ({
                                    ...prev,

                                    valueOfContainer: "weekly",
                                  }));
                                } else if (selectedValue === "Monthly") {
                                  setContainerSort((prev) => ({
                                    ...prev,

                                    valueOfContainer: "monthly",
                                  }));
                                } else if (selectedValue === "Yearly") {
                                  setContainerSort((prev) => ({
                                    ...prev,

                                    valueOfContainer: "yearly",
                                  }));
                                }
                              }}
                            >
                              <option value="Daily">Daily</option>
                              <option value="Weekly">Weekly</option>
                              <option value="Monthly">Monthly</option>
                              <option value="Yearly">Yearly</option>
                            </Form.Select>
                          </Form.Group>
                        </div>
                        <Typography
                          variant="body2"
                          className="card-head-txt mb-2"
                        >
                          {(averageRating?.avgRating &&
                            Number(averageRating?.avgRating).toFixed(1)) ||
                            0}
                        </Typography>
                      </div>
                      <Typography
                        sx={{ fontSize: 14 }}
                        color="text.secondary"
                        gutterBottom
                        className="cardContent_head"
                      >
                        Current rating
                      </Typography>
                      <div className="content_stat">
                        {averagePercentage?.type === "increase" ? (
                          <span className="stat_up">
                            <BsArrowUp />
                            {averagePercentage?.percentage} %
                          </span>
                        ) : (
                          <span className="stat_down">
                            <BsArrowDown />
                            {averagePercentage?.percentage} %
                          </span>
                        )}
                        <span>vs last month</span>
                      </div>
                    </CardContent>
                    <CardActions className="dash-c-foot">
                      <div className="card-imgs-wrap">
                        {/* {console.log("sendedRating 379", sendedRating)} */}
                        {sendedRating &&
                          sendedRating.slice(0, 3).map((curr) => {
                            return (
                              <img
                                className="card-img"
                                src={
                                  curr?.to?.avatar_id?.avatar &&
                                  process.env.REACT_APP_AVATAR_IMAGE +
                                    curr?.to?.avatar_id?.avatar
                                }
                                alt="1"
                              />
                            );
                          })}

                        <span>
                          <BsArrowRight />
                        </span>
                      </div>
                    </CardActions>
                  </Card>
                </Col>
              </Row>
              <Row className="me-2">
                <Col md={12} className="dash-tabs-wrap rtng_wrp_n pe-0">
                  <div className="dash-tabs pmnts_wrap">
                    <div className="card-heading no_border sub_heading">
                      Rate and review Hoppers
                    </div>
                    <div className="rate_inner">
                      <Row>
                        <Col md={6}>
                          <div className="rating_itm">
                            <label htmlFor="" className="hpr_rtng_lbls">
                              Select your Hopper
                            </label>
                            <Dropdown className="hpr_rating_drp d-flex align-items-center">
                              <Dropdown.Toggle
                                id="dropdown-basic"
                                className="p-0"
                              >
                                <img
                                  src={selectedHopper?.avatar_id?.avatar ? process.env.REACT_APP_AVATAR_IMAGE + selectedHopper?.avatar_id?.avatar : userimg1}
                                  height={"40px"}
                                  width={"40px"}
                                  alt="setting icon"
                                />
                                {selectedHopper ? selectedHopper?.user_name : "Select Hopper"}
                              </Dropdown.Toggle>
                              <Dropdown.Menu className="w-100">
                                {hopperList &&
                                  hopperList
                                    .filter((el) => el != null)
                                    ?.map((curr) => {
                                      return (
                                        <Dropdown.Item
                                          className="d-flex justify-content-between align-items-center"
                                          onClick={() => {
                                            handleHopperSelect(curr)
                                            ContentDetails(curr._id);
                                            setPayload({
                                              ...payload,
                                              hopper_id: curr._id,
                                            });
                                          }}
                                        >
                                          <div className="gap-2 d-flex align-items-center">
                                            <img
                                              src={
                                                curr?.avatar_id?.avatar &&
                                                process.env
                                                  .REACT_APP_AVATAR_IMAGE +
                                                  curr?.avatar_id?.avatar
                                              }
                                              alt="my profile"
                                              height={"40px"}
                                              width={"40px"}
                                              className="hopper_rtng_img"
                                            />
                                            <p className="txt_lt"></p>
                                            {curr?.user_name}
                                          </div>
                                        </Dropdown.Item>
                                      );
                                    })}
                              </Dropdown.Menu>
                            </Dropdown>
                          </div>
                        </Col>
                        <Col md={6}>
                          <div className="rating_itm">
                            <label htmlFor="" className="hpr_rtng_lbls">
                              Please rate them
                            </label>
                            <div className="give_rtng">
                              <Rating
                                onClick={(val) => handleClick("rating", val)}
                                onPointerEnter={onPointerEnter}
                                onPointerLeave={onPointerLeave}
                                onPointerMove={onPointerMove}
                                // initialValue={Number(Ratings)}
                                // defaultValue={3}
                                disabled={true}
                                value={""}
                              />
                            </div>
                          </div>
                        </Col>
                        {task?.length > 0 && (
                          <Col md={12}>
                            <div className="rating_itm rating_cont_wrp">
                              <label htmlFor="" className="hpr_rtng_lbls">
                                Content purchased online
                              </label>
                              {task
                                ?.filter((el) => el.type === "content")
                                ?.map((el) => (
                                  <DashBoardCardList
                                    id={el?.content_id?._id}
                                    type={"content_id"}
                                    content_type="content"
                                    setPayload={setPayload}
                                    listcard1={`${el?.content_id?.heading}`}
                                    listcard2={moment(el?.createdAt)?.format(
                                      `hh:mm A, DD MMM YYYY `
                                    )}
                                    imgl={
                                      (el?.content_id?.content[0]
                                        ?.media_type === "image" &&
                                        el?.content_id?.content[0]
                                          ?.watermark) ||
                                      process.env.REACT_APP_UPLOADED_CONTENT +
                                        el?.content_id?.content[0]?.media
                                    }
                                  />
                                ))}
                            </div>
                          </Col>
                        )}
                        {task?.length > 0 && (
                          <Col md={12}>
                            <div className="rating_itm rating_cont_wrp">
                              <label htmlFor="" className="hpr_rtng_lbls">
                                Task Broadcasted
                              </label>
                              {task
                                ?.filter((el) => el.type === "task_content")
                                ?.map((el) => (
                                  <DashBoardCardList
                                    setPayload={setPayload}
                                    id={el?.task_content_id?._id}
                                    type={"content_id"}
                                    content_type="task"
                                    listcard1={`${el?.task_content_id?.task_id?.heading}`}
                                    listcard2={moment(el?.createdAt)?.format(
                                      `hh:mm A, DD MMM YYYY `
                                    )}
                                    imgl={
                                      el?.task_content_id?.type === "image" &&
                                      process.env.REACT_APP_UPLOADED_CONTENT +
                                        el?.task_content_id?.imageAndVideo
                                    }
                                  />
                                ))}
                            </div>
                          </Col>
                        )}
                        <Col md={12}>
                          <div className="rating_itm">
                            <label htmlFor="" className="hpr_rtng_lbls">
                              Please review them
                            </label>
                            <Form.Group
                              className="mb-3 position-relative"
                              controlId="exampleForm.ControlTextarea1"
                            >
                              <img
                                src={reviewicn}
                                width="22px"
                                height="21px"
                                alt="Review"
                                className="hprreviewicn"
                              />
                              <Form.Control
                                className="review_txt"
                                as="textarea"
                                rows={4}
                                onChange={(val) => handleChange(val)}
                                value={payload?.review}
                                name="review"
                              />
                            </Form.Group>
                          </div>
                        </Col>
                        <Col md={12}>
                          <div className="rating_itm">
                            <label htmlFor="" className="hpr_rtng_lbls">
                              Please select areas they can improve on
                            </label>
                            <div className="small_btns_wrap mb-3">
                              <div
                                className={`sml_review_opts ${
                                  payload.type.includes("Promptness")
                                    ? "improveshw"
                                    : ""
                                }`}
                                onClick={() =>
                                  handleClick("type", "Promptness")
                                }
                              >
                                <p className="mb-0">Promptness</p>
                              </div>
                              <div
                                className={`sml_review_opts ${
                                  payload.type.includes("Quality")
                                    ? "improveshw"
                                    : ""
                                }`}
                                onClick={() => handleClick("type", "Quality")}
                              >
                                <p className="mb-0">Quality of content</p>
                              </div>
                              <div
                                className={`sml_review_opts ${
                                  payload.type.includes("Response")
                                    ? "improveshw"
                                    : ""
                                }`}
                                onClick={() => handleClick("type", "Response")}
                              >
                                <p className="mb-0">Response</p>
                              </div>
                              <div
                                className={`sml_review_opts ${
                                  payload.type.includes("Alert")
                                    ? "improveshw"
                                    : ""
                                }`}
                                onClick={() => handleClick("type", "Alert")}
                              >
                                <p className="mb-0">Alertness</p>
                              </div>
                              <div
                                className={`sml_review_opts ${
                                  payload.type.includes("Communication")
                                    ? "improveshw"
                                    : ""
                                }`}
                                onClick={() =>
                                  handleClick("type", "Communication")
                                }
                              >
                                <p className="mb-0">Communication</p>
                              </div>
                            </div>

                            <Form.Group
                              className="mb-3 position-relative"
                              controlId="exampleForm.ControlTextarea1"
                            >
                              <img
                                src={reviewicn}
                                width="22px"
                                height="21px"
                                alt="Review"
                                className="hprreviewicn"
                              />
                              <Form.Control
                                className="review_txt sml"
                                as="textarea"
                                rows={4}
                                onChange={(val) => handleChange(val)}
                                value={payload?.sender_type}
                                name="sender_type"
                              />
                            </Form.Group>
                          </div>
                        </Col>
                        <div className="rating_itm" onClick={handleSubmit}>
                          <button className="big_btn m-auto">Submit</button>
                        </div>
                      </Row>
                    </div>
                  </div>
                </Col>
                {/* Experiment end */}
              </Row>
            </Col>

            <Col md={4} className="pe-0">
              <div className="right-cards">
                <Row className="crd_edit_wrap rtng_lists">
                  <Col
                    md={12}
                    className="list-card-wrap broadcasted_uploads tsk_list_wrp pt-0"
                  >
                    <Card className="dash-top-cards listing mb-0 me-0">
                      <CardContent className="dash-c-body rev">
                        <div className="mb-3 d-flex justify-content-between align-items-center flex-wrap">
                          <Typography
                            variant="body2"
                            className="review-txt card-head-txt mb-0"
                          >
                            Ratings & reviews received
                          </Typography>
                          <div class="fltrs_prnt">
                            <button
                              type="button"
                              class="sort_btn btn btn-primary"
                              onClick={() => setShow(!show)}
                            >
                              Sort
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
                                  d="M1.646 4.646a.5.5 0 0 1 .708 0L8 10.293l5.646-5.647a.5.5 0 0 1 .708.708l-6 6a.5.5 0 0 1-.708 0l-6-6a.5.5 0 0 1 0-.708z"
                                ></path>
                              </svg>
                            </button>
                            {show && (
                              <div className="filterRatings">
                                <ul>
                                  <li>
                                    <div
                                      className="d-flex align-items-center gap-2"
                                      onClick={() => {
                                        setContainerSort1((pre) => ({
                                          ...pre,
                                          typeOfContainer: "send",
                                          valueOfContainer: "5",
                                        }));
                                        setShow(!show);
                                      }}
                                    >
                                      <AiFillStar />
                                      <AiFillStar />
                                      <AiFillStar />
                                      <AiFillStar />
                                      <AiFillStar />
                                    </div>
                                  </li>
                                  <li>
                                    <div
                                      className="d-flex align-items-center gap-2"
                                      onClick={() => {
                                        setContainerSort1((pre) => ({
                                          ...pre,
                                          typeOfContainer: "send",
                                          valueOfContainer: "4",
                                        }));
                                        setShow(!show);
                                      }}
                                    >
                                      <AiFillStar />
                                      <AiFillStar />
                                      <AiFillStar />
                                      <AiFillStar />
                                      <AiOutlineStar />
                                    </div>
                                  </li>
                                  <li>
                                    <div
                                      className="d-flex align-items-center gap-2"
                                      onClick={() =>
                                        setContainerSort1((pre) => ({
                                          ...pre,
                                          typeOfContainer: "send",
                                          valueOfContainer: "3",
                                        }))
                                      }
                                    >
                                      <AiFillStar />
                                      <AiFillStar />
                                      <AiFillStar />
                                      <AiOutlineStar />
                                      <AiOutlineStar />
                                    </div>
                                  </li>
                                  <li>
                                    <div
                                      className="d-flex align-items-center gap-2"
                                      onClick={() => {
                                        setContainerSort1((pre) => ({
                                          ...pre,
                                          typeOfContainer: "send",
                                          valueOfContainer: "2",
                                        }));
                                        setShow(!show);
                                      }}
                                    >
                                      <AiFillStar />
                                      <AiFillStar />
                                      <AiOutlineStar />
                                      <AiOutlineStar />
                                      <AiOutlineStar />
                                    </div>
                                  </li>
                                  <li>
                                    <div
                                      className="d-flex align-items-center gap-2"
                                      onClick={() => {
                                        setContainerSort1((pre) => ({
                                          ...pre,
                                          typeOfContainer: "send",
                                          valueOfContainer: "1",
                                        }));
                                        setShow(!show);
                                      }}
                                    >
                                      <AiFillStar />
                                      <AiOutlineStar />
                                      <AiOutlineStar />
                                      <AiOutlineStar />
                                      <AiOutlineStar />
                                    </div>
                                  </li>
                                </ul>
                              </div>
                            )}
                          </div>
                        </div>

                        <div className="scrolling">
                          {receivedRating &&
                            receivedRating.slice(0, 5).map((curr) => {
                              return (
                                <Card className="list-card rcnt_act_card">
                                  <CardContent className="dash-c-body">
                                    <div className="list-in d-flex align-items-start">
                                      <div className="rateReview_content">
                                        <img
                                          className="list-card-img"
                                          src={
                                            process.env.REACT_APP_AVATAR_IMAGE +
                                            curr?.from?.avatar_id?.avatar
                                          }
                                          alt="content"
                                        />
                                      </div>
                                      <div className="list-in-txt mt-1 w-100">
                                        <Typography
                                          variant="body2"
                                          className="list-car-txt mb-2"
                                        >
                                          {curr?.review}
                                          <br />
                                        </Typography>
                                        <div className="rtng_dn d-flex justify-content-between align-items-center">
                                          <Typography
                                            sx={{ fontSize: 12 }}
                                            color="#9DA3A3"
                                            gutterBottom
                                            className="crd_time d-flex align-items-center mb-0 txt_mdm"
                                          >
                                            <MdOutlineWatchLater color="#000" />
                                            {moment(curr?.updatedAt).format(
                                              `hh:mm A, DD MMM YYYY `
                                            )}
                                          </Typography>
                                          <div className="rtng_strs_wrp d-flex align-items-center">
                                            <p className="mb-0 rtng_txt me-1">
                                              {curr?.rating}
                                            </p>
                                            {[...Array(+curr?.rating)]?.map(
                                              (_, index) => (
                                                <AiFillStar
                                                  key={index}
                                                  className={
                                                    index < curr?.rating
                                                      ? "filled-star"
                                                      : "empty-star"
                                                  }
                                                />
                                              )
                                            )}
                                          </div>
                                        </div>
                                      </div>
                                    </div>
                                  </CardContent>
                                </Card>
                              );
                            })}
                        </div>
                      </CardContent>
                      {/* <div className="d-flex justify-content-end tsk_link_wrp">
                        <Link className="view_all_link">
                          View all <BsArrowRight className="text-pink" />
                        </Link>
                      </div> */}
                    </Card>
                  </Col>
                  <Col
                    md={12}
                    className="list-card-wrap broadcasted_uploads tsk_list_wrp pt-0"
                  >
                    <Card className="dash-top-cards listing mb-0 me-0">
                      <CardContent className="dash-c-body rev">
                        <div className="mb-3 d-flex justify-content-between align-items-center flex-wrap">
                          <Typography
                            variant="body2"
                            className="review-txt card-head-txt mb-0"
                          >
                            Ratings & reviews given
                          </Typography>
                          <div class="fltrs_prnt">
                            <button
                              type="button"
                              class="sort_btn btn btn-primary"
                              onClick={() => setShow1(!show1)}
                            >
                              Sort
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
                                  d="M1.646 4.646a.5.5 0 0 1 .708 0L8 10.293l5.646-5.647a.5.5 0 0 1 .708.708l-6 6a.5.5 0 0 1-.708 0l-6-6a.5.5 0 0 1 0-.708z"
                                ></path>
                              </svg>
                            </button>
                            {show1 && (
                              <div className="filterRatings">
                                <ul>
                                  <li>
                                    <div
                                      className="d-flex align-items-center gap-2"
                                      onClick={() => {
                                        setContainerSort1((pre) => ({
                                          ...pre,
                                          typeOfContainer: "received",
                                          valueOfContainer: "5",
                                        }));
                                        setShow1(!show1);
                                      }}
                                    >
                                      <AiFillStar />
                                      <AiFillStar />
                                      <AiFillStar />
                                      <AiFillStar />
                                      <AiFillStar />
                                    </div>
                                  </li>
                                  <li>
                                    <div
                                      className="d-flex align-items-center gap-2"
                                      onClick={() => {
                                        setContainerSort1((pre) => ({
                                          ...pre,
                                          typeOfContainer: "received",
                                          valueOfContainer: "4",
                                        }));
                                        setShow1(!show1);
                                      }}
                                    >
                                      <AiFillStar />
                                      <AiFillStar />
                                      <AiFillStar />
                                      <AiFillStar />
                                      <AiOutlineStar />
                                    </div>
                                  </li>
                                  <li>
                                    <div
                                      className="d-flex align-items-center gap-2"
                                      onClick={() => {
                                        setContainerSort1((pre) => ({
                                          ...pre,
                                          typeOfContainer: "received",
                                          valueOfContainer: "3",
                                        }));
                                        setShow1(!show1);
                                      }}
                                    >
                                      <AiFillStar />
                                      <AiFillStar />
                                      <AiFillStar />
                                      <AiOutlineStar />
                                      <AiOutlineStar />
                                    </div>
                                  </li>
                                  <li>
                                    <div
                                      className="d-flex align-items-center gap-2"
                                      onClick={() => {
                                        setContainerSort1((pre) => ({
                                          ...pre,
                                          typeOfContainer: "received",
                                          valueOfContainer: "2",
                                        }));
                                        setShow1(!show1);
                                      }}
                                    >
                                      <AiFillStar />
                                      <AiFillStar />
                                      <AiOutlineStar />
                                      <AiOutlineStar />
                                      <AiOutlineStar />
                                    </div>
                                  </li>
                                  <li>
                                    <div
                                      className="d-flex align-items-center gap-2"
                                      onClick={() => {
                                        setContainerSort1((pre) => ({
                                          ...pre,
                                          typeOfContainer: "received",
                                          valueOfContainer: "1",
                                        }));
                                        setShow(!show1);
                                      }}
                                    >
                                      <AiFillStar />
                                      <AiOutlineStar />
                                      <AiOutlineStar />
                                      <AiOutlineStar />
                                      <AiOutlineStar />
                                    </div>
                                  </li>
                                </ul>
                              </div>
                            )}
                          </div>
                        </div>
                        <div className="scrolling">
                          {sendedRating &&
                            sendedRating?.map((curr) => {
                              return (
                                <Card className="list-card rcnt_act_card">
                                  <CardContent className="dash-c-body">
                                    <div className="list-in d-flex align-items-start">
                                      <div className="rateReview_content">
                                        <img
                                          className="list-card-img"
                                          src={curr?.from?.profile_image}
                                          alt="content"
                                        />
                                      </div>
                                      <div className="list-in-txt mt-1 w-100">
                                        <Typography
                                          variant="body2"
                                          className="list-car-txt mb-2"
                                        >
                                          {curr?.review}
                                          <br />
                                        </Typography>
                                        <div className="rtng_dn d-flex justify-content-between align-items-center">
                                          <Typography
                                            sx={{ fontSize: 12 }}
                                            color="#9DA3A3"
                                            gutterBottom
                                            className="crd_time d-flex align-items-center mb-0 txt_mdm"
                                          >
                                            <MdOutlineWatchLater color="#000" />
                                            {moment(curr?.updatedAt).format(
                                              `hh:mm A, DD MMM YYYY `
                                            )}
                                          </Typography>
                                          <div className="rtng_strs_wrp d-flex align-items-center">
                                            <p className="mb-0 rtng_txt me-1">
                                              {curr?.rating}
                                            </p>
                                            {[...Array(+curr?.rating)]?.map(
                                              (_, index) => (
                                                <AiFillStar
                                                  key={index}
                                                  className={
                                                    index < curr?.rating
                                                      ? "filled-star"
                                                      : "empty-star"
                                                  }
                                                />
                                              )
                                            )}
                                          </div>
                                        </div>
                                      </div>
                                    </div>
                                  </CardContent>
                                </Card>
                              );
                            })}
                        </div>
                      </CardContent>
                      {/* <div className="d-flex justify-content-end tsk_link_wrp">
                        <Link className="view_all_link">
                          View all <BsArrowRight className="text-pink" />
                        </Link>
                      </div> */}
                    </Card>
                  </Col>
                </Row>
              </div>
            </Col>
          </Row>
          <div className="mt-4">
            <TopSearchesTipsCard />
          </div>
        </Container>
      </div>
      <DbFooter />
    </>
  );
};

export default RatingReview;
