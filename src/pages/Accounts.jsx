import React, { useEffect, useState } from "react";
import Header from "../component/Header";
import DbFooter from "../component/DbFooter";
import { Container, Row, Col, Tabs, Tab, Table } from "react-bootstrap";
import AccountsReports from "../component/AccountsReports";
import ContentReports from "../component/ContentReports";
import TaskReports from "../component/TaskReports";
import TopSearchesTipsCard from "../component/card/TopSearchesTipsCard";
import {
  Select,
  MenuItem,
  FormControl,
  Card,
  CardContent,
  Typography,
  Button,
  Tooltip,
} from "@mui/material";
import {
  BsArrowUp,
  BsArrowRight,
  BsArrowDown,
  BsEye,
  BsChevronDown,
} from "react-icons/bs";
import { AiFillCaretDown, AiOutlineClose } from "react-icons/ai";
import taskIcon from "../assets/images/taskIcon.svg";
import barclays from "../assets/images/bankLogos/Barclays.svg";
import lloyds from "../assets/images/bankLogos/lloyds.svg";
import { FiEdit, FiX } from "react-icons/fi";
import ReactApexChart from "react-apexcharts";
import SortingDialog from "../popups/SortingDialog";
import avatar from "../assets/images/avatar.png";
import task from "../assets/images/task.svg";
import { Link, useNavigate } from "react-router-dom";
import TransactionSort from "../popups/TransactionSort";
import { MdAdd } from "react-icons/md";
import audioic from "../assets/images/audio-icon.svg";
import debitL from "../assets/images/bankLogos/debitL.png";
import debitM from "../assets/images/bankLogos/debitM.png";
import cont1 from "../assets/images/img1.png";
import cont2 from "../assets/images/img2.png";
import cont3 from "../assets/images/img3.jpg";
import calendar from "../assets/images/calendar.svg";
import cameraic from "../assets/images/camera.svg";
import celebrity from "../assets/images/celebrity.svg";
import idimg from "../assets/images/celebrity.svg";
import videoic from "../assets/images/video.svg";
import recic from "../assets/images/recording.svg";
import watchic from "../assets/images/watch.svg";
import exclusiveic from "../assets/images/exclusive.svg";
import shared from "../assets/images/share.png";
import idic from "../assets/images/id.svg";
import invic from "../assets/images/invoice.svg";
import Loader from "../component/Loader";
import { Get } from "../services/user.services";
import moment from "moment";
import Fundsinvested from "../component/Sortfilters/Dashboard/Fundsinvested";
import AccountsFilter from "../component/Sortfilters/Content/AccountsFilter";
import TopFilterComn from "../component/Sortfilters/Content/TopFilterComn";
import ChartsSort from "../component/Sortfilters/Dashboard/ChartsSort";
import audiobg from "../assets/images/audimgbg.svg";
import audiosm from "../assets/images/audimgsmall.svg";
import audioimg from "../assets/images/audimg.svg";

const Accounts = () => {
  const [open, setOpen] = useState(false);
  const [currId, setCurrId] = useState(null);

  const handleOpen = () => {
    setOpen(true);
  };
  const navigate = useNavigate();

  const handleClose = () => {
    setOpen(false);
  };

  // 2nd dialog
  const [open2, setOpen2] = useState(false);

  const handleOpen2 = () => {
    setOpen2(true);
  };

  const handleClose2 = () => {
    setOpen2(false);
  };

  const Navigate = (type) => {
    navigate(`/accounts-tables/${type}`);
  };

  const [fundInvested, setFundInvested] = useState({
    options: {
      chart: {
        id: "basic-bar",
      },
      xaxis: {
        categories: [],
      },
      colors: ["#EC4E54"],
    },
    series: [
      {
        name: "sales",
        data: [],
      },
    ],
  });

  const [vatSummary, setVatSummary] = useState({
    options: {
      chart: {
        id: "basic-bar",
      },
      xaxis: {
        categories: [],
      },
      colors: ["#53C5AE"],
    },
    series: [
      {
        name: "sales",
        data: [],
      },
    ],
  });

  // const [chartData] = useState({
  //   options: {
  //     chart: {
  //       id: "basic-bar"
  //     },
  //     xaxis: {
  //       categories: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"]
  //     },
  //     colors: ["#EC4E54"]
  //   },
  //   series: [
  //     {
  //       name: "sales",
  //       data: [30, 40, 45, 50, 49, 60, 70, 91, 75, 60, 45, 30]
  //     }
  //   ]
  // });

  const [chartData2] = useState({
    options: {
      chart: {
        id: "basic-bar",
      },
      xaxis: {
        categories: [
          "Jan",
          "Feb",
          "Mar",
          "Apr",
          "May",
          "Jun",
          "Jul",
          "Aug",
          "Sep",
          "Oct",
          "Nov",
          "Dec",
        ],
      },
      colors: ["#20639B"],
    },
    series: [
      {
        name: "sales",
        data: [30, 40, 45, 50, 49, 60, 70, 91, 75, 60, 45, 30],
      },
    ],
  });

  // const [chartData3] = useState({
  //   options: {
  //     chart: {
  //       id: "basic-bar"
  //     },
  //     xaxis: {
  //       categories: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"]
  //     },
  //     colors: ["#53C5AE"]
  //   },
  //   series: [
  //     {
  //       name: "sales",
  //       data: [30, 40, 45, 50, 49, 60, 70, 91, 75, 60, 45, 30]
  //     }
  //   ]
  // });

  const [accountCount, setAccountCount] = useState();
  const [openFilterComponent, setOpenFilterComponent] = useState(false);
  const [transaction_details, setTransaction_Details] = useState();
  const [loading, setLoading] = useState(false);
  const [selectedOption, setSelectedOption] = useState("");
  const handleChange = (event) => {
    setSelectedOption(event.target.value);
  };

  const [contentTimeValues, setContentTimeValues] = useState("");
  const [timeValues, setTimeValues] = useState("");
  const [parentTimeValues, setParentTimeValues] = useState("");
  const [openSortTask, setOpenSortTask] = useState(false);
  const [chartName, setChartName] = useState({
    task: "",
    transactionDetails: "",
    vatDetails: "",
  });

  // Time values handler -
  const timeValuesHandler = (values) => {
    setTimeValues(values);
  };

  const parentTimeValuesHandler = (values) => {
    setParentTimeValues(values);
  };

  // console.log("timeValues 178", timeValues);

  // open components -
  const [openSortComponent, setOpenSortComponent] = useState(false);
  const [openTransactionDetail, setOpenTransactionDetail] = useState(false);
  const [openVatDetails, setOpenVatDetails] = useState(false);

  const handleCloseSortComponent = (values) => {
    setOpenSortComponent(values);
  };

  const ReportCount = async () => {
    setLoading(true);

    try {
      const resp = await Get(`mediahouse/Account/count`);
      setAccountCount(resp.data);
      if (resp) {
        setLoading(false);
      }
    } catch (error) {
      setLoading(false);
    }
  };

  const TransactionDetails = async () => {
    setLoading(true);

    try {
      const resp = await Get(
        `mediahouse/getallinvoiseforMediahouse?${(chartName.transactionDetails == "transactionDetails" &&
          timeValues) ||
        parentTimeValues
        }=${(chartName.transactionDetails == "transactionDetails" &&
          timeValues) ||
        parentTimeValues
        }`
      );
      if (resp) {
        setLoading(false);
        setTransaction_Details(resp.data.resp);
        setChartName({ ...chartName, transactionDetails: "" });
      }
    } catch (error) {
      setLoading(false);
      setChartName({ ...chartName, transactionDetails: "" });
    }
  };

  const FundInvested = async () => {
    setLoading(true);

    try {
      const resp = await Get(
        `mediahouse/AccountfundInvested?${(chartName.task == "task" && contentTimeValues) || parentTimeValues
        }=${(chartName.task == "task" && contentTimeValues) || parentTimeValues
        }`
      );
      if (resp) {
        setFundInvested((prevTaskSummary) => ({
          ...prevTaskSummary,
          options: {
            ...prevTaskSummary.options,
            xaxis: {
              ...prevTaskSummary.options.xaxis,
              categories: [
                "Jan",
                "Feb",
                "Mar",
                "Apr",
                "May",
                "Jun",
                "Jul",
                "Aug",
                "Sep",
                "Oct",
                "Nov",
                "Dec",
              ],
            },
          },
          series: [
            {
              ...prevTaskSummary.series[0],
              data: [
                resp.data.data.jan,
                resp.data.data.feb,
                resp.data.data.mar,
                resp.data.data.apr,
                resp.data.data.may,
                resp.data.data.june,
                resp.data.data.july,
                resp.data.data.aug,
                resp.data.data.sept,
                resp.data.data.oct,
                resp.data.data.nov,
                resp.data.dec,
              ],
            },
          ],
        }));
        setLoading(false);
        setChartName({ ...chartName, task: "" });
      }
    } catch (error) {
      // console.log(error);
      setLoading(false);
      setChartName({ ...chartName, task: "" });
    }
  };

  const VatSummary = async () => {
    setLoading(true);

    try {
      const resp = await Get("mediahouse/AccountcontentPurchasedOnline");
      if (resp) {
        setVatSummary((prevTaskSummary) => ({
          ...prevTaskSummary,
          options: {
            ...prevTaskSummary.options,
            xaxis: {
              ...prevTaskSummary.options.xaxis,
              categories: [
                "Jan",
                "Feb",
                "Mar",
                "Apr",
                "May",
                "Jun",
                "Jul",
                "Aug",
                "Sep",
                "Oct",
                "Nov",
                "Dec",
              ],
            },
          },
          series: [
            {
              ...prevTaskSummary.series[0],
              data: [
                resp.data.data.jan,
                resp.data.data.feb,
                resp.data.data.mar,
                resp.data.data.apr,
                resp.data.data.may,
                resp.data.data.june,
                resp.data.data.july ?? 0,
                resp.data.data.aug,
                resp.data.data.sept,
                resp.data.data.oct,
                resp.data.data.nov,
                resp.data.dec,
              ],
            },
          ],
        }));
        setLoading(false);
      }
    } catch (error) {
      // console.log(error);
      setLoading(false);
    }
  };

  useEffect(() => {
    ReportCount();
    TransactionDetails();
    FundInvested();
    VatSummary();
  }, [contentTimeValues, timeValues, parentTimeValues]);
  const handleCloseFilterComponent = (values) => {
    setOpenFilterComponent(values);
  };

  return (
    <>
      {/* {console.log(transaction_details, `<---2222`)} */}
      {loading && <Loader />}
      <Header />
      <div className="page-wrap all-reports-wrap">
        <Container fluid className="p-0">
          <Row>
            <Col sm={12}>
              <div className="reportsConainter">
                <div className="reportsFilter mb-4 d-flex justify-content-end align-items-center">
                  <div className="relevanceSelecter me-4">
                    <FormControl>
                      {/* <Select value='option1' onChange={handleChange}>
                        <MenuItem value="option1">Latest</MenuItem>
                        <MenuItem value="option2">Oldest</MenuItem>
                        <MenuItem value="option3">Option 3</MenuItem>
                      </Select> */}
                      {/* <div className="fltrs_prnt">
                        <button className='sortTrigger' onClick={() => {handleOpen(); setOpenFilterComponent(true);}}>Filter <AiFillCaretDown /></button>
                      <div className="fltrs_prnt top_fltr">
                        <p className="lbl_fltr">Filter</p>
                        <button className='sortTrigger' onClick={() => { handleOpen(); setOpenFilterComponent(true); }}>Filter <AiFillCaretDown /></button>
                        {
                          openFilterComponent && <TopFilterComn
                            closeFilterComponent={handleCloseFilterComponent}
                          />
                        }
                      </div> */}
                    </FormControl>
                  </div>
                  <div className="relevanceSelecter">
                    <FormControl>
                      {/* <div className="fltrs_prnt top_fltr">
                      <p className="lbl_fltr">
                          Filter
                        </p>
                        <button className='sortTrigger' onClick={() => {handleOpen(); setOpenSortComponent(true);}}>Sort <AiFillCaretDown /></button>
                      <div className="fltrs_prnt top_fltr">
                        <p className="lbl_fltr">Sort</p>
                        <button className='sortTrigger' onClick={() => { handleOpen(); setOpenSortComponent(true); }}>Sort <AiFillCaretDown /></button>
                        {
                          openSortComponent && <Fundsinvested
                            rangeTimeValues={parentTimeValuesHandler}
                            closeSortComponent={handleCloseSortComponent}
                          />
                        }
                      </div> */}
                      <div className="fltrs_prnt top_fltr">
                        <p className="lbl_fltr">Sort</p>
                        <button
                          className="sortTrigger"
                          onClick={() => {
                            setOpenSortComponent(true);
                          }}
                        >
                          Sort <AiFillCaretDown />
                        </button>
                        {openSortComponent && (
                          <ChartsSort
                            rangeTimeValues={timeValuesHandler}
                            closeSortComponent={() =>
                              setOpenSortComponent(false)
                            }
                          />
                        )}
                      </div>
                    </FormControl>
                  </div>
                </div>
                <div className="rprts_wrap allContent_report theme_card">
                  <div className="accnts_hdng">
                    <p className="ac_hdng">Accounts</p>
                  </div>
                  <div className="acnts_wrp acnts">
                    <div className="accountReports_container">
                      <Row className="accoutStats">
                        <Col>
                          <Link to={{
                            pathname: "/accounts-tables/total_content_purchase",
                            state: { x: 1 }
                          }}>
                            <Card className="dash-top-cards">
                              <CardContent className="dash-c-body">
                                <div className="cardCustomHead">
                                  <div className="sortFilter_actions">
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
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                      />
                                      <path
                                        d="M0.747559 6.15625H19.4976"
                                        stroke="black"
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                      />
                                      <path
                                        d="M0.747559 10.8438H19.4976"
                                        stroke="black"
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                      />
                                      <path
                                        d="M6.21631 6.15625V15.5312"
                                        stroke="black"
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                      />
                                    </svg>
                                  </div>
                                  <Typography
                                    variant="body2"
                                    className="card-head-txt mb-2"
                                  >
                                    {accountCount?.content_online?.count}
                                  </Typography>
                                </div>
                                <Typography
                                  sx={{ fontSize: 14 }}
                                  color="text.secondary"
                                  gutterBottom
                                  className="cardContent_head"
                                >
                                  Total contents purchased online
                                </Typography>
                                <div className="content_stat">
                                  {accountCount?.content_online &&
                                    accountCount?.content_online?.type ===
                                    "increase" ? (
                                    <span className="stat_up">
                                      <BsArrowUp />
                                      {accountCount?.content_online?.percent?.toFixed(
                                        2
                                      )}
                                      %
                                    </span>
                                  ) : accountCount?.content_online?.type ===
                                    "decrease" ? (
                                    <span className="stat_down">
                                      <BsArrowDown />
                                      {accountCount?.content_online?.percent?.toFixed(
                                        2
                                      )}
                                      %
                                    </span>
                                  ) : null}
                                  <span>vs last month</span>
                                </div>
                              </CardContent>
                            </Card>
                          </Link>
                        </Col>
                        <Col>
                          <Link to={"/accounts-tables/total_funds"}>
                            <Card className="dash-top-cards">
                              <CardContent className="dash-c-body">
                                <div className="cardCustomHead">
                                  <div className="sortFilter_actions">
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
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                      />
                                      <path
                                        d="M0.747559 6.15625H19.4976"
                                        stroke="black"
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                      />
                                      <path
                                        d="M0.747559 10.8438H19.4976"
                                        stroke="black"
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                      />
                                      <path
                                        d="M6.21631 6.15625V15.5312"
                                        stroke="black"
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                      />
                                    </svg>
                                  </div>
                                  <Typography
                                    variant="body2"
                                    className="card-head-txt mb-2"
                                  >
                                    £{accountCount?.total_fund_invested?.count}
                                  </Typography>
                                </div>
                                <Typography
                                  sx={{ fontSize: 14 }}
                                  color="text.secondary"
                                  gutterBottom
                                  className="cardContent_head"
                                >
                                  Total funds invested for purchased content
                                </Typography>
                                <div className="content_stat">
                                  {accountCount?.total_fund_invested &&
                                    accountCount?.total_fund_invested
                                      ?.type === "increase" ? (
                                    <span className="stat_up">
                                      <BsArrowUp />
                                      {accountCount?.total_fund_invested?.percentage?.toFixed(2) || 0.00}
                                      %
                                    </span>
                                  ) : accountCount?.total_fund_invested
                                    ?.type === "decrease" ? (
                                    <span className="stat_down">
                                      <BsArrowDown />
                                      {accountCount?.total_fund_invested?.percentage?.toFixed(
                                        2
                                      )}
                                      %
                                    </span>
                                  ) : null}
                                  <span>vs last month</span>
                                </div>
                              </CardContent>
                            </Card>
                          </Link>
                        </Col>
                        <Col>
                          <Link to={"/accounts-tables/total_content"}>
                            <Card className="dash-top-cards">
                              <CardContent className="dash-c-body">
                                <div className="cardCustomHead">
                                  <div className="sortFilter_actions">
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
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                      />
                                      <path
                                        d="M0.747559 6.15625H19.4976"
                                        stroke="black"
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                      />
                                      <path
                                        d="M0.747559 10.8438H19.4976"
                                        stroke="black"
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                      />
                                      <path
                                        d="M6.21631 6.15625V15.5312"
                                        stroke="black"
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                      />
                                    </svg>
                                  </div>
                                  <Typography
                                    variant="body2"
                                    className="card-head-txt mb-2"
                                  >
                                    {
                                      accountCount?.sourced_content_from_tasks
                                        ?.count
                                    }
                                  </Typography>
                                </div>
                                <Typography
                                  sx={{ fontSize: 14 }}
                                  color="text.secondary"
                                  gutterBottom
                                  className="cardContent_head"
                                >
                                  Total content sourced from tasks
                                </Typography>
                                <div className="content_stat">
                                  {accountCount?.sourced_content_from_tasks &&
                                    accountCount?.sourced_content_from_tasks
                                      ?.type === "increase" ? (
                                    <span className="stat_up">
                                      <BsArrowUp />
                                      {accountCount?.sourced_content_from_tasks?.percentage?.toFixed(
                                        2
                                      )}
                                      %
                                    </span>
                                  ) : accountCount?.sourced_content_from_tasks
                                    ?.type === "decrease" ? (
                                    <span className="stat_down">
                                      <BsArrowDown />
                                      {accountCount?.sourced_content_from_tasks?.percentage?.toFixed(
                                        2
                                      )}
                                      %
                                    </span>
                                  ) : null}
                                  <span>vs last month</span>
                                </div>
                              </CardContent>
                            </Card>
                          </Link>
                        </Col>
                        <Col>
                          <Link to={"/accounts-tables/total_funds_sourced"}>
                            <Card className="dash-top-cards">
                              <CardContent className="dash-c-body">
                                <div className="cardCustomHead">
                                  <div className="sortFilter_actions">
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
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                      />
                                      <path
                                        d="M0.747559 6.15625H19.4976"
                                        stroke="black"
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                      />
                                      <path
                                        d="M0.747559 10.8438H19.4976"
                                        stroke="black"
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                      />
                                      <path
                                        d="M6.21631 6.15625V15.5312"
                                        stroke="black"
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                      />
                                    </svg>
                                  </div>
                                  <Typography
                                    variant="body2"
                                    className="card-head-txt mb-2"
                                  >
                                    £
                                    {
                                      accountCount
                                        ?.total_fund_invested_source_content
                                        ?.count
                                    }
                                  </Typography>
                                </div>
                                <Typography
                                  sx={{ fontSize: 14 }}
                                  color="text.secondary"
                                  gutterBottom
                                  className="cardContent_head"
                                >
                                  Total funds invested for sourced content
                                </Typography>
                                <div className="content_stat">
                                  {accountCount?.total_fund_invested_source_content &&
                                    accountCount
                                      ?.total_fund_invested_source_content
                                      ?.type === "increase" ? (
                                    <span className="stat_up">
                                      <BsArrowUp />
                                      {accountCount?.total_fund_invested_source_content?.percent?.toFixed(
                                        2
                                      )}
                                      %
                                    </span>
                                  ) : accountCount
                                    ?.total_fund_invested_source_content
                                    ?.type === "decrease" ? (
                                    <span className="stat_down">
                                      <BsArrowDown />
                                      {accountCount?.total_fund_invested_source_content?.percent?.toFixed(
                                        2
                                      )}
                                      %
                                    </span>
                                  ) : null}
                                  <span>vs last month</span>
                                </div>
                              </CardContent>
                            </Card>
                          </Link>
                        </Col>
                        <Col>
                          <Link to={"/accounts-tables/pending_payments"}>
                            <Card className="dash-top-cards">
                              <CardContent className="dash-c-body">
                                <div className="cardCustomHead">
                                  <div className="sortFilter_actions">
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
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                      />
                                      <path
                                        d="M0.747559 6.15625H19.4976"
                                        stroke="black"
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                      />
                                      <path
                                        d="M0.747559 10.8438H19.4976"
                                        stroke="black"
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                      />
                                      <path
                                        d="M6.21631 6.15625V15.5312"
                                        stroke="black"
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                      />
                                    </svg>
                                  </div>
                                  <Typography
                                    variant="body2"
                                    className="card-head-txt mb-2"
                                  >
                                    £ 700
                                  </Typography>
                                </div>
                                <Typography
                                  sx={{ fontSize: 14 }}
                                  color="text.secondary"
                                  gutterBottom
                                  className="cardContent_head"
                                >
                                  Pending payments
                                </Typography>
                                <div className="content_stat d-flex justify-content-between align-items-center">
                                  <span className="text-pink">OVERDUE</span>
                                  <span className="payPending">PAY</span>
                                </div>
                              </CardContent>
                            </Card>
                          </Link>
                        </Col>
                      </Row>
                      <div className="transactionBank_wrap trns_tbl">
                        <Row>
                          <Col md={12}>
                            <Card className="tbl_crd bg_grey">
                              <div className="">
                                <div
                                  className="d-flex justify-content-between align-items-center tbl_hdr"
                                  px="20px"
                                  mb="10px"
                                >
                                  <Typography className="tbl_hdng">
                                    Transaction details
                                  </Typography>
                                  <div className="tbl_rt">
                                    <div className="fltrs_prnt">
                                      <Button
                                        className="sort_btn"
                                        onClick={() => {
                                          setOpenTransactionDetail(true);
                                          setChartName({
                                            ...chartName,
                                            transactionDetails:
                                              "transactionDetails",
                                          });
                                        }}
                                      >
                                        Sort
                                        <BsChevronDown />
                                      </Button>
                                      {openTransactionDetail && (
                                        <AccountsFilter
                                          closeComponent={() =>
                                            setOpenTransactionDetail(false)
                                          }
                                          rangeTimeValues={timeValuesHandler}
                                        />
                                      )}
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
                                        <th className="cnt_prchsd_th">
                                          Content purchased online
                                        </th>
                                        <th>Licence</th>
                                        <th>Type</th>
                                        <th>Volume</th>
                                        <th>Category</th>
                                        <th>Time & date</th>
                                        <th>Location</th>
                                        <th>Transaction</th>
                                        <th>Invoice</th>
                                        <th>Total paid</th>
                                      </tr>
                                    </thead>
                                    <tbody>
                                      {transaction_details &&
                                        transaction_details.map((curr) => {
                                          if (
                                            curr?.content_id &&
                                            curr?.content_id !== null
                                          ) {
                                            return (
                                              <tr>
                                                <td className="">
                                                  <div className="cont_wrp d-flex flex-column">
                                                    <div className="d-flex cnt_inn">
                                                      {curr?.content_id?.content
                                                        ?.slice(0, 3)
                                                        .map((item) => {
                                                          return (
                                                            <img
                                                              src={
                                                                item?.media_type ===
                                                                  "video"
                                                                  ?
                                                                  item?.thumbnail ||
                                                                  process.env.REACT_APP_CONTENT_MEDIA +
                                                                  item?.thumbnail
                                                                  : item?.media_type ===
                                                                    "audio"
                                                                    ? audiosm
                                                                    : item?.thumbnail || process.env.REACT_APP_CONTENT_MEDIA +
                                                                    item?.media
                                                              }
                                                              className="content_img"
                                                            />
                                                          );
                                                        })}
                                                    </div>
                                                    <Link
                                                      to={`/purchased-content-detail/${curr?._id}`}
                                                      className="link view_link d-flex align-items-center"
                                                    >
                                                      <BsEye />
                                                      View content
                                                    </Link>
                                                  </div>
                                                </td>
                                                <td className="text-center">
                                                  {/* tooptip Start */}
                                                  <Tooltip title="Licence">
                                                    <img
                                                      src={
                                                        curr?.content_id
                                                          ?.type === "exclusive"
                                                          ? exclusiveic
                                                          : shared
                                                      }
                                                      className="tbl_ic"
                                                      alt="Exclusive"
                                                    />
                                                  </Tooltip>
                                                  {/* tooptip End */}
                                                </td>
                                                <td>
                                                  <div className="d-flex cont_type_wrp flex-column align-items-center">
                                                    <Tooltip title="Camera">
                                                      <img
                                                        src={cameraic}
                                                        className="tbl_ic"
                                                        alt="camera"
                                                      />
                                                    </Tooltip>
                                                  </div>
                                                </td>
                                                <td>
                                                  <p className="d-flex flex-column align-items-center volum">
                                                    <span>
                                                      {
                                                        curr?.content_id
                                                          ?.content?.length
                                                      }
                                                    </span>
                                                  </p>
                                                </td>
                                                <td className="text-center">
                                                  <Tooltip title="Celebrity">
                                                    <img
                                                      src={celebrity}
                                                      className="tbl_ic"
                                                      alt="Content category"
                                                    />
                                                  </Tooltip>
                                                </td>
                                                <td className="timedate_wrap">
                                                  <p className="timedate">
                                                    <img
                                                      src={watchic}
                                                      className="icn_time"
                                                    />
                                                    {moment(
                                                      curr?.content_id
                                                        ?.updatedAt
                                                    ).format("hh:mm A")}
                                                  </p>
                                                  <p className="timedate">
                                                    <img
                                                      src={calendar}
                                                      className="icn_time"
                                                    />
                                                    {moment(
                                                      curr?.content_id
                                                        ?.updatedAt
                                                    ).format("DD MMMM, YYYY")}
                                                  </p>
                                                </td>
                                                <td>
                                                  {curr?.content_id?.location}
                                                </td>
                                                <td className="timedate_wrap">
                                                  <p className="timedate">
                                                    <img
                                                      src={idic}
                                                      className="icn_time"
                                                    />
                                                    ID- {curr?._id}
                                                  </p>
                                                  <Link
                                                    to={`/transactionDetail/${curr._id}`}
                                                    className="link view_link"
                                                  >
                                                    <BsEye className="icn_time" />
                                                    View transaction
                                                  </Link>
                                                </td>

                                                <td className="timedate_wrap">
                                                  <p className="timedate">
                                                    <img
                                                      src={invic}
                                                      className="icn_time"
                                                    />
                                                    INV- {curr?.invoiceNumber}
                                                  </p>

                                                  <Link
                                                    to={`/transactionDetail/${curr._id}`}
                                                    className="link view_link"
                                                  >
                                                    <BsEye className="icn_time" />
                                                    View transaction
                                                  </Link>
                                                </td>
                                                <td>
                                                  <p className="ttl_prc text-center">
                                                    £
                                                    {
                                                      curr?.content_id
                                                        ?.amount_paid
                                                    }
                                                  </p>
                                                </td>
                                              </tr>
                                            );
                                          }
                                        })}
                                    </tbody>
                                  </table>
                                </div>
                              </div>
                            </Card>
                          </Col>
                          <Col md={5}>
                            <div className="transactionList">
                              <div className="allBanks">
                                <div className="statChartHead align-items-center">
                                  <p className="sub_hdng mb-0">Banks</p>
                                  <Button variant="primary">
                                    <MdAdd className="addFont" /> Add bank
                                  </Button>
                                </div>
                                <div className="bank_card">
                                  <div className="bankInfo_wrap">
                                    <img
                                      className="bankLogo"
                                      src={barclays}
                                      alt=""
                                    />
                                    <div className="bankInfo d-flex flex-column">
                                      <h5 className="addedBank">
                                        Barclays Bank
                                      </h5>
                                      <small className="bankLocatn">
                                        Mayfair, London
                                      </small>
                                    </div>
                                  </div>
                                  <span className="defaultTag">Default</span>
                                </div>
                                <div className="bank_card">
                                  <div className="bankInfo_wrap">
                                    <img
                                      className="bankLogo"
                                      src={lloyds}
                                      alt=""
                                    />
                                    <div className="bankInfo d-flex flex-column">
                                      <h5 className="addedBank">Lloyds Bank</h5>
                                      <small className="bankLocatn">
                                        Thorn Apple street, London
                                      </small>
                                    </div>
                                  </div>
                                  <div className="bankActions">
                                    <span className="editBank me-2">
                                      <FiEdit />
                                    </span>
                                    <span className="removeBank">
                                      <FiX />
                                    </span>
                                  </div>
                                </div>
                              </div>
                              <div className="allCards">
                                <div className="statChartHead align-items-center">
                                  <p className="sub_hdng mb-0">Cards</p>
                                  <Button variant="primary">
                                    <MdAdd className="addFont" /> Add card
                                  </Button>
                                </div>
                                <div className="debitCard_wrap">
                                  <Row>
                                    <Col md={6}>
                                      <img
                                        className="dbt_card"
                                        src={debitL}
                                        alt=""
                                      />
                                    </Col>
                                    <Col md={6}>
                                      <img
                                        className="dbt_card"
                                        src={debitM}
                                        alt=""
                                      />
                                    </Col>
                                  </Row>
                                </div>
                              </div>
                            </div>
                          </Col>
                          <Col md={7}>
                            <Link to="/accounts-table/vat-data">
                              <Card className="tbl_crd bg_grey vt_dtl_wrp">
                                <div className="">
                                  <div
                                    className="d-flex justify-content-between align-items-center tbl_hdr"
                                    px="20px"
                                    mb="10px"
                                  >
                                    <Typography className="tbl_hdng">
                                      VAT details
                                    </Typography>
                                    <div className="tbl_rt">
                                      {/* <div className="fltrs_prnt">
                                        <Button
                                          className="sort_btn"
                                          onClick={() => {
                                            setOpenVatDetails(true);
                                            setChartName({
                                              ...chartName,
                                              vatDetails: "vatDetails",
                                            });
                                          }}
                                        >
                                          Sort
                                          <BsChevronDown />
                                        </Button>
                                        {openVatDetails && (
                                          <AccountsFilter
                                            closeComponent={() =>
                                              setOpenVatDetails(false)
                                            }
                                            rangeTimeValues={timeValuesHandler}
                                          />
                                        )}
                                      </div> */}
                                    </div>
                                  </div>
                                  <div className="fix_ht_table">
                                    <table
                                      width="100%"
                                      mx="20px"
                                      variant="simple"
                                      className="common_table vat_dtls"
                                    >
                                      <thead>
                                        <tr>
                                          <th>Invoice date</th>
                                          <th className="inv_th">Invoice</th>
                                          <th className="pmnt_dt_th">
                                            Payment date
                                          </th>
                                          <th>Nett paid</th>
                                          <th>20% VAT paid</th>
                                          <th>Total paid</th>
                                        </tr>
                                      </thead>
                                      <tbody>
                                        {transaction_details &&
                                          transaction_details.map((curr) => {
                                            const amount = curr?.amount ?? 0; // Default to 0 if curr?.amount is undefined or null
                                            const vat = curr?.Vat ?? 0; // Default to 0 if curr?.Vat is undefined or null
                                            const result = amount - vat;
                                            if (
                                              curr?.content_id &&
                                              curr?.content_id !== null
                                            ) {
                                              return (
                                                <tr>
                                                  <td className="timedate_wrap">
                                                    <p className="timedate">
                                                      <img
                                                        src={calendar}
                                                        className="icn_time"
                                                      />
                                                      {moment(
                                                        curr?.content_id
                                                          ?.updatedAt
                                                      ).format("DD MMMM, YYYY")}
                                                    </p>
                                                  </td>
                                                  <td className="timedate_wrap">
                                                    <p className="timedate">
                                                      <img
                                                        src={invic}
                                                        className="icn_time"
                                                      />
                                                      INV- 628192
                                                    </p>
                                                    <Link
                                                      className="link view_link"
                                                      to={`/transactionDetail/${curr._id}`}
                                                    >
                                                      <BsEye className="icn_time" />
                                                      View transaction
                                                    </Link>
                                                  </td>
                                                  <td className="timedate_wrap">
                                                    <p className="timedate">
                                                      <img
                                                        src={calendar}
                                                        className="icn_time"
                                                      />
                                                      {moment(
                                                        curr?.content_id
                                                          ?.updatedAt
                                                      ).format("DD MMMM, YYYY")}
                                                    </p>
                                                  </td>
                                                  <td>
                                                    <p className="ttl_prc text-center">
                                                      £{result}
                                                    </p>
                                                  </td>
                                                  <td>
                                                    <p className="ttl_prc text-center">
                                                      £{curr?.Vat ?? "0"}
                                                    </p>
                                                  </td>
                                                  <td>
                                                    <p className="ttl_prc text-center">
                                                      £{curr?.amount ?? "0"}
                                                    </p>
                                                  </td>
                                                </tr>
                                              );
                                            }
                                          })}
                                      </tbody>
                                    </table>
                                  </div>
                                </div>
                              </Card>
                            </Link>
                          </Col>
                        </Row>
                      </div>

                      {/* Tasks */}
                      <div className="taskSummaryBar mt-4">
                        <div className="reportCard">
                          {/* <div className="sortingStat">
                            <button
                              className="sortTrigger"
                              onClick={() => {
                                setOpenSortTask(true);
                                setChartName({ ...chartName, task: "task" });
                              }}
                            >
                              Sort <AiFillCaretDown />
                            </button>
                            {openSortTask && (
                              <Fundsinvested
                                rangeTimeValues={timeValuesHandler}
                                closeSortComponent={() =>
                                  setOpenSortTask(false)
                                }
                              />
                            )}
                          </div> */}
                          <div className="sortingStat">
                            <button
                              className="sortTrigger"
                              onClick={() => {
                                setOpenSortTask(true);
                                setChartName({ ...chartName, task: "task" });
                              }}
                            >
                              Sort <AiFillCaretDown />
                            </button>
                            {openSortTask && (
                              <ChartsSort
                                rangeTimeValues={timeValuesHandler}
                                closeSortComponent={() =>
                                  setOpenSortTask(false)
                                }
                              />
                            )}
                          </div>
                          <Tabs
                            defaultActiveKey="tasks"
                            id="uncontrolled-tab-example"
                            className="mb-3"
                          >
                            <Tab
                              eventKey="tasks"
                              title="Funds invested summary"
                            >
                              <ReactApexChart
                                options={fundInvested.options}
                                series={fundInvested.series}
                                type="bar"
                                height={350}
                              />
                            </Tab>
                            <Tab
                              eventKey="content"
                              title="Content purchased online summary"
                            >
                              <ReactApexChart
                                options={fundInvested.options}
                                series={fundInvested.series}
                                type="bar"
                                height={350}
                              />
                            </Tab>
                            <Tab eventKey="funds" title="VAT summary">
                              <ReactApexChart
                                options={vatSummary.options}
                                series={vatSummary.series}
                                type="bar"
                                height={350}
                              />
                            </Tab>
                          </Tabs>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
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

export default Accounts;
