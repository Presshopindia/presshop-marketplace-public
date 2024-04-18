import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Header from "../component/Header";
import DashBoardCardList from "../component/card/DashBoardCardList";
import img1 from "../assets/images/img1.png";
import img2 from "../assets/images/img2.png";
import img3 from "../assets/images/img4.png";
import imgl from "../assets/images/img1.jpeg";
import imgl1 from "../assets/images/img3.jpg";
import contentCamera from "../assets/images/contentCamera.svg";
import contentVideo from "../assets/images/contentVideo.svg";
import BroadcastedTrackings from "../pages/BroadcastedTrackings";
import { GoogleMap, LoadScript, Marker } from "@react-google-maps/api";

import {
  Card,
  TextField,
  CardActions,
  CardContent,
  Typography,
  FormControlLabel,
  Checkbox,
} from "@mui/material";
import {
  BsArrowDown,
  BsArrowRight,
  BsArrowUp,
  BsChevronDown,
} from "react-icons/bs";
import dayjs from "dayjs";
import { DesktopDatePicker } from "@mui/x-date-pickers/DesktopDatePicker";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { TimePicker } from "@mui/x-date-pickers/TimePicker";
import TopSearchesTipsCard from "../component/card/TopSearchesTipsCard";
import {
  Modal,
  Button,
  Form,
  Tab,
  Tabs,
  Container,
  Row,
  Col,
} from "react-bootstrap";
import AddBroadcastTask from "./AddBroadcastTask";
import DbFooter from "../component/DbFooter";
// import audioic from "../assets/images/audio-icon.svg";
import audioic from "../assets/images/audimg.svg";

import { Get } from "../services/user.services";
import lvrask from "../assets/images/location.png";
import io from "socket.io-client";
import moment from "moment";
import ContentSourcedTF from "../component/Sortfilters/Task/ContentSourced";
import BroadcastedTaskTF from "../component/Sortfilters/Task/BroadcastedTask";
import Loader from "../component/Loader";
//const socket = io.connect("https://betazone.promaticstechnologies.com:3005");
const BroadcastedTask = () => {
  const navigate = useNavigate();
  const [show, setShow] = useState(false);
  const [stats, setStats] = useState();
  const [uploadedContent, setUploadedContent] = useState([]);
  const [loading, setLoading] = useState(false);

  // content sourced from tasks-
  const [contentSourcedTaskValue, setContentSourcedTaskValue] = useState("");
  const handleContentRangeTimeValues = (values) => {
    // console.log("contentSourcedTaskValue", values)
    setContentSourcedTaskValue(values);
  };
  const [filter, setFilter] = useState({
    content_sourced: false,
  });

  // console.log("contentSourcedTaskValue", contentSourcedTaskValue);
  const closeFilters = () => {
    setFilter((prevFilter) => ({
      ...prevFilter,
      content_sourced: false,
    }));
  };

  const Statistics = async () => {
    const resp = await Get(`mediaHouse/tasks/count `);
    setStats(resp.data);
  };

  const [sourcedContent, setSourcedContent] = useState([]);
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

  const handleShow = () => {
    setShow(!show);
  };

  const Navigate = (type) => {
    navigate(`/task-tables/${type}`);
  };

  // console.log(obj, "<--------obj")

  const ContentSourced = async (name, param) => {
    try {
      setLoading(true);
      // const resp = await Get(
      //   `mediahouse/getlistoduploadedcontent?${
      //     contentSourcedTaskValue && contentSourcedTaskValue
      //   }=${contentSourcedTaskValue && contentSourcedTaskValue}`
      // );
      const resp = await Get(`mediaHouse/getuploadedContentbyHoppers?limit=20`);
      if (resp) {
        // console.log(resp.data.response, "<--------resp.data");
        setUploadedContent(resp.data.data);
        setLoading(false);
        // setContentSourcedTaskValue("")
      }
    } catch (error) {
      // console.log(error, "<--------error");
      setLoading(false);
      // setContentSourcedTaskValue("")
    }
  };

  useEffect(() => {
    Statistics();
  }, [show]);

  useEffect(() => {
    // socket.disconnect();
    ContentSourced();
  }, [contentSourcedTaskValue]);

  return (
    <>
      {loading && <Loader />}
      <Header />
      <div className="page-wrap task_pg">
        <Container fluid>
          <Row>
            <Col md={8}>
              <Row className="dashboardStat_cards">
                <Col md={4} className="p-0 mb-0">
                  <Card className="dash-top-cards tsk">
                    <Link to="/task-tables/liveTasks">
                      <CardContent className="dash-c-body">
                        <div className="cardCustomHead">
                          <div className="sortFilter_actions">
                            <svg
                              className="me-0"
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
                          </div>
                          <Typography
                            variant="body2"
                            className="card-head-txt mb-2"
                          >
                            {stats?.live_tasks_details?.count}
                          </Typography>
                        </div>
                        <Typography
                          sx={{ fontSize: 14 }}
                          color="text.secondary"
                          gutterBottom
                          className="cardContent_head"
                        >
                          {/* <span className="text-pink">Live</span> */}
                          Live tasks
                        </Typography>
                        <div className="content_stat">
                          {/* {stats?.live_tasks_details?.type === "increase" ? (
                            <span className="stat_up">
                              <BsArrowUp />
                              {(
                                stats?.live_tasks_details?.percentage || 0
                              )?.toFixed(2)}
                              %
                            </span>
                          ) : (
                            <span className="stat_down">
                              <BsArrowDown />
                              {(
                                stats?.live_tasks_details?.percentage || 0
                              )?.toFixed(2)}
                              %
                            </span>
                          )}
                          <span>vs yesterday</span> */}
                        </div>
                      </CardContent>
                      <CardActions className="dash-c-foot">
                        <div className="card-imgs-wrap">
                          {stats?.live_tasks_details?.task &&
                            stats?.live_tasks_details?.task?.filter((el) => el.content.length !== 0)
                              .slice(0, 3)
                              .map((curr, index) => {
                                const Content =
                                  curr.content[0] &&
                                  (curr.content[0]?.media_type === "video"
                                    ? curr.content[0]?.thumbnail ||
                                      process.env.REACT_APP_CONTENT_MEDIA +
                                        curr.content[0]?.thumbnail
                                    : curr.content[0]?.media_type === "audio"
                                    ? audioic
                                    : curr.content[0]?.media ||
                                      process.env.REACT_APP_CONTENT_MEDIA +
                                        curr.content[0]?.media);

                                // Conditionally render the img element only if Content is available
                                return Content ? (
                                  <img
                                    src={Content}
                                    className="card-img"
                                    key={index}
                                    alt={`Image ${index}`}
                                  />
                                ) : null;
                              })}
                          <span onClick={() => Navigate("liveTasks")}>
                            <BsArrowRight />
                          </span>
                        </div>
                      </CardActions>
                    </Link>
                  </Card>
                </Col>
                <Col md={4} className="p-0 mb-0">
                  <Link to="/task-tables/Broadcasted">
                    <Card className="dash-top-cards tsk">
                      <CardContent className="dash-c-body">
                        <div className="cardCustomHead">
                          <div className="sortFilter_actions">
                            <svg
                              className="me-0"
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
                          </div>
                          <Typography
                            variant="body2"
                            className="card-head-txt mb-2"
                          >
                            {stats?.broad_casted_tasks_details?.count}
                          </Typography>
                        </div>
                        <Typography
                          sx={{ fontSize: 14 }}
                          color="text.secondary"
                          gutterBottom
                          className="cardContent_head"
                        >
                          Broadcasted tasks
                        </Typography>
                        {/* <div className="content_stat">
                          {stats?.broad_casted_tasks_details?.type ===
                          "increase" ? (
                            <span className="stat_up">
                              <BsArrowUp />
                              {(
                                stats?.broad_casted_tasks_details?.percentage ||
                                0
                              )?.toFixed(2)}
                              %
                            </span>
                          ) : (
                            <span className="stat_down">
                              <BsArrowDown />
                              {(
                                stats?.broad_casted_tasks_details?.percentage ||
                                0
                              )?.toFixed(2)}
                              %
                            </span>
                          )}
                          <span>vs last month</span>
                        </div> */}
                      </CardContent>
                      <CardActions className="dash-c-foot">
                        <div className="card-imgs-wrap">
                          {stats?.broad_casted_tasks_details?.task &&
                            stats?.broad_casted_tasks_details?.task?.filter((el) => el.content.length != 0)
                              ?.slice(0, 3)
                              ?.map((curr, index) => {
                                const Content = curr.content[0]
                                  ? curr.content[0]?.media_type === "video"
                                    ? process.env.REACT_APP_CONTENT_MEDIA +
                                      curr.content[0]?.thumbnail
                                    : curr.content[0]?.media_type === "audio"
                                    ? audioic
                                    : curr.content[0]?.media
                                  : null;

                                // Conditionally render the img element only if Content is available
                                return Content ? (
                                  <img
                                    src={Content}
                                    className="card-img"
                                    key={index}
                                    alt={`Image ${index}`}
                                  />
                                ) : null;
                              })}
                          <span onClick={() => Navigate("Broadcasted")}>
                            <BsArrowRight />
                          </span>
                        </div>
                      </CardActions>
                    </Card>
                  </Link>
                </Col>
                <Col md={4} className="p-0 mb-0">
                  <Link to="/task-tables/content-sourced">
                    <Card className="dash-top-cards tsk">
                      <CardContent className="dash-c-body">
                        <div className="cardCustomHead">
                          <div className="sortFilter_actions">
                            <svg
                              className="me-0"
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
                          </div>
                          <Typography
                            variant="body2"
                            className="card-head-txt mb-2"
                          >
                            {sourcedContent?.length || 0}
                          </Typography>
                        </div>
                        <Typography
                          sx={{ fontSize: 14 }}
                          color="text.secondary"
                          gutterBottom
                          className="cardContent_head"
                        >
                          Content purchased from tasks
                        </Typography>
                      </CardContent>
                      <CardActions className="dash-c-foot">
                        <div className="card-imgs-wrap">
                          {sourcedContent?.slice(0, 3)
                              .map((curr, index) => {
                                return (
                                  <div key={index}>
                                    {curr?.type === "image" ? (
                                      <img
                                        src={
                                          curr?.videothubnail ||
                                          process.env
                                            .REACT_APP_UPLOADED_CONTENT +
                                            curr?.imageAndVideo
                                        }
                                        className="card-img"
                                        alt={`Image ${index}`}
                                      />
                                    ) : curr?.type === "audio" ? (
                                      <img
                                        src={audioic}
                                        className="card-img"
                                        alt={`Audio ${index}`}
                                      />
                                    ) : curr?.type === "video" ? (
                                      <img
                                        src={
                                          curr?.videothubnail ||
                                          process.env
                                            .REACT_APP_UPLOADED_CONTENT +
                                            curr?.thumbnail
                                        }
                                        alt={`Video ${index}`}
                                      />
                                    ) : null}
                                  </div>
                                );
                              })}

                          <span onClick={() => Navigate("content-sourced")}>
                            <BsArrowRight />
                          </span>
                        </div>
                      </CardActions>
                    </Card>
                  </Link>
                </Col>
                <Col md={4} className="p-0 mb-0">
                  <Link to="/task-tables/fund-invested-today">
                    <Card className="dash-top-cards tsk">
                      <CardContent className="dash-c-body">
                        <div className="cardCustomHead">
                          <div className="sortFilter_actions">
                            <svg
                              className="me-0"
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
                          </div>

                          <Typography
                            variant="body2"
                            className="card-head-txt mb-2"
                          >
                            £{stats?.today_fund_invested?.count}
                          </Typography>
                        </div>
                        <Typography
                          sx={{ fontSize: 14 }}
                          color="text.secondary"
                          gutterBottom
                          className="cardContent_head"
                        >
                          Funds invested today
                        </Typography>
                        {/* <div className="content_stat">
                          {stats?.today_fund_invested?.type === "increase" ? (
                            <span className="stat_up">
                              <BsArrowUp />{" "}
                              {(
                                stats?.today_fund_invested?.percentage || 0
                              )?.toFixed(2)}
                              %
                            </span>
                          ) : (
                            <span className="stat_down">
                              <BsArrowDown />{" "}
                              {(
                                stats?.today_fund_invested?.percentage || 0
                              ).toFixed(2)}
                              %
                            </span>
                          )}
                          <span>vs last week</span>
                        </div> */}
                      </CardContent>
                      <CardActions className="dash-c-foot">
                        <div className="card-imgs-wrap">
                          <span onClick={() => Navigate("fund-invested-today")}>
                            <BsArrowRight />
                          </span>
                        </div>
                      </CardActions>
                    </Card>
                  </Link>
                </Col>
                <Col md={4} className="p-0 mb-0">
                  <Link to="/task-tables/total-fund-invested">
                    <Card className="dash-top-cards tsk">
                      <CardContent className="dash-c-body">
                        <div className="cardCustomHead">
                          <div className="sortFilter_actions">
                            <svg
                              className="me-0"
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
                          </div>
                          <Typography
                            variant="body2"
                            className="card-head-txt mb-2"
                          >
                            £ {stats?.total_fund_invested?.count}
                          </Typography>
                        </div>
                        <Typography
                          sx={{ fontSize: 14 }}
                          color="text.secondary"
                          gutterBottom
                          className="cardContent_head"
                        >
                          Total funds invested
                        </Typography>
                        {/* <div className="content_stat">
                          {stats?.total_fund_invested?.type === "increase" ? (
                            <span className="stat_up">
                              <BsArrowUp />{" "}
                              {(
                                stats?.total_fund_invested?.percentage || 0
                              )?.toFixed(2)}
                              %
                            </span>
                          ) : (
                            <span className="stat_down">
                              <BsArrowDown />{" "}
                              {(
                                stats?.total_fund_invested?.percentage || 0
                              ).toFixed(2)}
                              %
                            </span>
                          )}
                          <span>vs last month</span>
                        </div> */}
                      </CardContent>
                      <CardActions className="dash-c-foot">
                        <div className="card-imgs-wrap">
                          <span onClick={() => Navigate("total-fund-invested")}>
                            <BsArrowRight />
                          </span>
                        </div>
                      </CardActions>
                    </Card>
                  </Link>
                </Col>
                <Col md={4} className="mb-0 p-0">
                  <Link to="/task-tables/deadline_met">
                    <Card className="dash-top-cards tsk">
                      <CardContent className="dash-c-body">
                        <div className="cardCustomHead">
                          <div className="sortFilter_actions">
                            <svg
                              className="me-0"
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
                          </div>
                          <Typography
                            variant="body2"
                            className="card-head-txt mb-2"
                          >
                            {(stats?.deadline_met?.task || 0)?.toFixed(2)}%
                          </Typography>
                        </div>
                        <Typography
                          sx={{ fontSize: 14 }}
                          color="text.secondary"
                          gutterBottom
                          className="cardContent_head"
                        >
                          Deadline met
                        </Typography>
                        {/* <div className="content_stat">
                          {stats?.deadline_met?.type === "increase" ? (
                            <span className="stat_up">
                              <BsArrowUp />{" "}
                              {(stats?.deadline_met?.percentage || 0)?.toFixed(
                                2
                              )}
                              %
                            </span>
                          ) : (
                            <span className="stat_down">
                              <BsArrowDown />{" "}
                              {(stats?.deadline_met?.percentage || 0).toFixed(
                                2
                              )}
                              %
                            </span>
                          )}
                          <span>vs yesterday</span>
                        </div> */}
                      </CardContent>
                      <CardActions className="dash-c-foot">
                        <div className="card-imgs-wrap">
                          {stats?.deadline_met?.data &&
                            stats?.deadline_met?.data
                              .slice(0, 3)
                              .map((curr) => {
                                return (
                                  <div className="sml_maps">
                                    <Link to={`/task-tables/deadline_met`}>
                                      <div className="mapInput td_mp ">
                                        <style>{`
                                                .gm-style > div:first-child {
                                                cursor: pointer !important;
                                              }
                                          `}
                                        </style>
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
                                            height: "120%",
                                            width: "100%",
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
                                    </Link>
                                  </div>
                                );
                              })}
                          <span onClick={() => Navigate("deadline_met")}>
                            <BsArrowRight />
                          </span>
                        </div>
                      </CardActions>
                    </Card>
                  </Link>
                </Col>
              </Row>

              <Row>
                <Col md={12} className="mb-0">
                  <BroadcastedTrackings show={show} />
                </Col>
              </Row>
            </Col>
            <Col md={4} className="pe-0">
              <div className="right-cards">
                <Row>
                  <Col md={8} className="p-0">
                    <Card className="dash-top-cards tsk">
                      <Link to="/task-tables/hopper-used">
                        <CardContent className="dash-c-body">
                          <div className="cardCustomHead">
                            <div className="sortFilter_actions">
                              <svg
                                className="me-0"
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
                            </div>
                            <Typography
                              variant="body2"
                              className="card-head-txt mb-2"
                            >
                              {stats?.hopper_used_for_tasks?.count}
                            </Typography>
                          </div>
                          <Typography
                            sx={{ fontSize: 14 }}
                            color="text.secondary"
                            gutterBottom
                            className="cardContent_head"
                          >
                            Hoppers used for tasks
                          </Typography>
                          {/* <div className="content_stat">
                            <span className="stat_up">
                              <BsArrowUp /> 8%
                            </span>
                            <span>vs last week</span>
                          </div> */}
                        </CardContent>
                        <CardActions className="dash-c-foot pt-0">
                          <div className="card-imgs-wrap">
                            {stats?.hopper_used_for_tasks?.task &&
                              stats?.hopper_used_for_tasks?.task
                                .slice(0, 3)
                                .map((curr) => {
                                  const Content =
                                    curr?.task_details &&
                                    curr?.task_details?.hopper_details[0]
                                      ?.avatar_details[0]
                                      ? process.env.REACT_APP_AVATAR_IMAGE +
                                        curr?.task_details?.hopper_details[0]
                                          ?.avatar_details[0].avatar
                                      : null;

                                  return (
                                    <img src={Content} className="card-img" />
                                  );
                                })}
                            <span onClick={() => Navigate("hopper-used")}>
                              <BsArrowRight />
                            </span>
                          </div>
                        </CardActions>
                      </Link>
                    </Card>
                  </Col>
                  <Col md={4} className="mb-4 ps-0">
                    <Card className="dash-top-cards h-100 add-br d-flex align-items-center me-0 justify-content-center">
                      <CardContent className="dash-c-body rev">
                        <div className="broadcast">
                          <Typography className="mb-3 text-center d-flex justify-content-center align-items-center">
                            <span className="clickable" onClick={handleShow}>
                              +
                            </span>
                          </Typography>
                          <Typography className="mb-0 text-center txt_bold">
                            Broadcast task
                          </Typography>
                        </div>
                      </CardContent>
                      {show && (
                        <AddBroadcastTask isOpen={show} show={handleShow} />
                      )}
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
                            Content uploaded from tasks
                          </Typography>
                          <div className="fltrs_prnt">
                            <Button
                              className="sort_btn"
                              onClick={() => {
                                setFilter((prev) => ({
                                  ...prev,
                                  content_sourced: true,
                                }));
                              }}
                            >
                              Sort
                              <BsChevronDown />
                            </Button>
                            {filter.content_sourced && (
                              <ContentSourcedTF
                                ContentSourced={ContentSourced}
                                close={closeFilters}
                                hide={filter.content_sourced}
                                contentRangeTimeValues={
                                  handleContentRangeTimeValues
                                }
                              />
                            )}
                          </div>
                        </div>
                        <div className="scrolling">
                          {uploadedContent?.map((curr) => {
                              return (
                                <DashBoardCardList
                                  contentDetail={curr?._id}
                                  listcard1={curr.task_id.heading}
                                  listcard2={moment(curr.task_id.createdAt).format(
                                    "hh:mm a, DD MMM YYY"
                                  )}
                                  reviewType={
                                    curr?.task_id?.content[0]?.media_type === "video"
                                      ? contentVideo
                                      : contentCamera
                                  }
                                  imgl={
                                    curr?.task_id?.content[0]?.media_type === "image"
                                      ? curr?.task_id?.content[0]?.media
                                      : null
                                  }
                                />
                              );
                            })}
                        </div>
                      </CardContent>
                      <div className="d-flex justify-content-end tsk_link_wrp">
                        <Link className="view_all_link" to={"/Uploaded-Content/uploaded"}>
                          View all <BsArrowRight className="text-pink" />
                        </Link>
                      </div>
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

export default BroadcastedTask;
