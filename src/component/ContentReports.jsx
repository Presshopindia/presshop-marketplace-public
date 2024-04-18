import { Card, CardContent, Typography } from "@mui/material";
import React, { memo, useEffect, useState } from "react";
import ReactApexChart from "react-apexcharts";
import { Col, Row, Tab, Tabs } from "react-bootstrap";
import { AiFillCaretDown, AiOutlineClose } from "react-icons/ai";
import { BsArrowDown, BsArrowRight, BsArrowUp } from "react-icons/bs";
import { Link } from "react-router-dom";
import audioic from "../assets/images/audimg.svg";
import exclusive from "../assets/images/exclusive.png";
import share from "../assets/images/share.png";
import taskIcon from "../assets/images/taskIcon.svg";
import ContentSortingDialog from "../popups/ContentSortingDialog";
import { Get, Post } from "../services/user.services";
import Loader from "./Loader";
import ChartsSort from "./Sortfilters/Dashboard/ChartsSort";
import ReportPurchasedSourced from "./Sortfilters/Dashboard/ReportPurchasedSourced";
const ContentReports = ({ timeValuesProps }) => {
  const [ContentData, setContentData] = useState({});
  const [loading, setLoading] = useState(false);
  const [pur_content, setPur_content] = useState([]);
  const [pub_content, setPub_Content] = useState([]);
  const [open, setOpen] = useState(false);
  const [timeValues, setTimeValues] = useState("");
  const [chartName, setChartName] = useState({
    category: "",
    type: "",
    split: "",
    location: "",
    purchased: "",
    sourced: "",
    task: "",
  });
  const timeValuesHandler = (values) => {
    setTimeValues(values);
  };

  const [contentTimeValues, setContentTimeValues] = useState("");
  const contentTimeValuesHandler = (values) => {
    setContentTimeValues(values);
  };

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
  // configure dialog box
  const [open2, setOpen2] = useState(false);

  const handleClickOpen = () => {
    setOpen2(true);
  };
  const handleClose2 = () => {
    setOpen2(false);
  };

  // open components -
  const [openSortSplit, setOpenSortSplit] = useState(false);
  const [openSortType, setOpenSortType] = useState(false);
  const [openSortCategory, setOpenSortCategory] = useState(false);
  const [openSortLocation, setOpenSortLocation] = useState(false);
  const [openSortTask, setOpenSortTask] = useState(false);
  const [openreportPurchased, setOpenReportPurchased] = useState(false);

  const handleCloseReportPurchasedSortComponent = (value) => {
    setOpenReportPurchased(value);
  };

  const [contentLocation, setContentLocation] = useState({
    series: [],
    labels: [],
    chart: {
      type: "pie",
    },
    legend: {
      position: "bottom",
    },
    colors: ["#EC4E54", "#53C5AE", "#FFEC00", "#20639B"],
  });

  const [contentType, setContentType] = useState({
    series: [],
    labels: [],
    chart: {
      type: "pie",
    },
    legend: {
      position: "bottom",
    },
    colors: ["#20639B", "#53C5AE", "#FFEC00"],
  });

  const [contentSummary, setContentSummary] = useState({
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


  const chartOptions = {
    labels: ["Business", "Fashion"],
    series: [90, 40],
    chart: {
      type: "pie",
    },
    legend: {
      position: "bottom",
    },
    colors: ["#FFEC00", "#20639B"],
  };

  const chartOptionsSplit = {
    labels: ["Business", "Fashion"],
    series: [90, 40],
    chart: {
      type: "pie",
    },
    legend: {
      position: "bottom",
    },
    colors: ["#FFEC00", "#20639B"],
  };

  const [chartData] = useState({
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
      colors: ["#EC4E54"],
    },
    series: [
      {
        name: "sales",
        data: [30, 40, 45, 50, 49, 60, 70, 91, 75, 60, 45, 30],
      },
    ],
  });

  const [contentsourced, setContentsourced] = useState({
    options: {
      chart: {
        id: "basic-bar",
      },
      xaxis: {
        categories: [],
      },
      colors: ["#20639B"],
    },
    series: [
      {
        name: "sales",
        data: [],
      },
    ],
  });

  const [taskCategories, setTaskCategories] = useState({
    series: [],
    labels: [],
    chart: {
      type: "pie",
    },
    legend: {
      position: "bottom",
    },
    colors: ["#EC4E54", "#53C5AE", "#FFEC00", "#20639B", "#9A7B4F"],
  });

  const [fundInvested, setFundInvested] = useState({
    options: {
      chart: {
        id: "basic-bar",
      },
      xaxis: {
        categories: [],
      },
      colors: ["#20639B"],
    },
    series: [
      {
        name: "sales",
        data: [],
      },
    ],
  });


  const CountReport = async () => {
    await Get(`mediaHouse/report/count`).then((res) => {
      setContentData(res.data);
    });
  };

  const PurchasedContent = async () => {
    setLoading(true);
    try {
      const resp = await Get(
        `mediaHouse/publish/content?${(chartName.purchased == "purchased" && contentTimeValues) ||
        timeValuesProps
        }=${(chartName.purchased == "purchased" && contentTimeValues) ||
        timeValuesProps
        }`
      );

      setPur_content(resp.data.content);
      if (resp) {
        setLoading(false);
        setChartName({ ...chartName, purchased: "" });
      }
    } catch (error) {
      // console.log(error);
      setLoading(false);
      setChartName({ ...chartName, purchased: "" });
    }
  };

  const ContentLocation = async () => {
    setLoading(true);

    try {
      const resp = await Get(
        `mediaHouse/report/content/location?${(chartName.location == "contentLocation" && timeValues) ||
        timeValuesProps
        }=${(chartName.location == "contentLocation" && timeValues) ||
        timeValuesProps
        }`
      );
      if (resp) {
        setContentLocation((prev) => ({
          ...prev,
          series: [
            resp.data.data.north,
            resp.data.data.south,
            resp.data.data.east,
            resp.data.data.west,
          ],
          labels: ["North", "South", "East", "West"],
        }));
        setLoading(false);
        setChartName({ ...chartName, location: "" });
      }
    } catch (error) {
      // console.log(error);
      setLoading(false);
      setChartName({ ...chartName, location: "" });
    }
  };

  const ContentCategories = async () => {
    setLoading(true);

    try {
      const resp = await Get(
        `mediaHouse/report/content/category?${(chartName.category == "contentCategories" && timeValues) ||
        timeValuesProps
        }=${(chartName.category == "contentCategories" && timeValues) ||
        timeValuesProps
        }`
      );
      if (resp) {
        setTaskCategories((prev) => ({
          ...prev,
          series: [
            resp.data.data.buisness_count,
            resp.data.data.politics_count,
            resp.data.data.crime_count,
            resp.data.data.fashion_count,
            resp?.data?.data?.other ?? 0,
          ],
          labels: ["Business", "Political", "Crime", "Fashion", "Others"],
        }));
        setLoading(false);
        setChartName({ ...chartName, category: "" });
      }
    } catch (error) {
      // console.log(error);
      setLoading(false);
      setChartName({ ...chartName, category: "" });
    }
  };

  const ContentType = async () => {
    setLoading(true);

    try {
      const resp = await Get(
        `mediaHouse/report/content/type?${(chartName.type == "contentType" && timeValues) || timeValuesProps
        }=${(chartName.type == "contentType" && timeValues) || timeValuesProps}`
      );
      // console.log(resp.data, "<--------resp.data.data")
      if (resp) {
        setContentType((prev) => ({
          ...prev,
          series: [
            resp.data.data.video,
            resp.data.data.interview,
            resp.data.data.image,
          ],
          labels: ["Videos", "Interview", "Photos"],
        }));
        setLoading(false);
        setChartName({ ...chartName, type: "" });
      }
    } catch (error) {
      // console.log(error);
      setLoading(false);
      setChartName({ ...chartName, type: "" });
    }
  };

  const ContentSummary = async () => {
    setLoading(true);

    try {
      const resp = await Get(
        `mediahouse/reportgraphofContentforPaid?${(chartName.task == "task" && timeValues) || timeValuesProps
        }=${(chartName.task == "task" && timeValues) || timeValuesProps}`
      );
      // console.log(resp.data.data, "<--------resp.data.data")
      if (resp) {
        setContentSummary((prevTaskSummary) => ({
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

  const ContentSourced = async () => {
    setLoading(true);

    try {
      const resp = await Get(
        `mediahouse/reportgraphofContent?${(chartName.task == "task" && contentTimeValues) || timeValuesProps
        }=${(chartName.task == "task" && contentTimeValues) || timeValuesProps}`
      );
      // console.log(resp.data.data, "<--------resp.data.data")
      if (resp) {
        setContentsourced((prevTaskSummary) => ({
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
      }
    } catch (error) {
      // console.log(error);
      setLoading(false);
    }
  };

  const FundInvested = async () => {
    setLoading(true);

    try {
      const resp = await Get(`mediahouse/reportfundInvestedforContent?${(chartName.task == "task" && timeValues) || timeValuesProps}=${(chartName.task == "task" && timeValues) || timeValuesProps}`);
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

  const PublishedContent = async () => {
    setLoading(true);
    try {
      const resp = await Post(
        `mediaHouse/view/published/content?${(chartName.sourced == "sourced" && contentTimeValues) ||
        timeValuesProps
        }=${(chartName.sourced == "sourced" && contentTimeValues) ||
        timeValuesProps
        }`
      );
      setPub_Content(resp.data.content);
      if (resp) {
        setLoading(false);
        setChartName({ ...chartName, purchased: "" });
      }
    } catch (error) {
      // console.log(error);
      setLoading(false);
      setChartName({ ...chartName, purchased: "" });
    }
  };

  useEffect(() => {
    CountReport();
    PurchasedContent();
    ContentLocation();
    ContentType();
    ContentSummary();
    ContentSourced();
    FundInvested();
    ContentCategories();
    PublishedContent();
  }, [timeValues, contentTimeValues, timeValuesProps]);

  const formatAmountInMillion = (amount) =>
    amount?.toLocaleString('en-US', {
      maximumFractionDigits: 2,
    });




  return (
    <>
      {loading && <Loader />}
      <div className="taskReports_container tsk cnt">
        <Row className="top_crds_wrp">
          <Col>
            <Link to={"/reports-tables-content/content_purchased_online_today"}>
              <Card className="dash-top-cards">
                <CardContent className="dash-c-body">
                  <div className="cardCustomHead">
                    <div className="sortFilter_actions">
                      <svg
                        width="20"
                        height="17"
                        viewBox="0 0 20 17"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg">
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
                          strokeLinejoin="round" />
                      </svg>
                    </div>
                    <Typography variant="body2" className="card-head-txt mb-2">
                      {ContentData?.content_online?.count || 0}
                    </Typography>
                  </div>
                  <Typography
                    sx={{ fontSize: 14 }}
                    color="text.secondary"
                    gutterBottom
                    className="cardContent_head">
                    Content purchased online
                  </Typography>
                  <div className="content_stat">
                    {ContentData?.content_online?.type === "decrease" ? (
                      <span className="stat_down">
                        <BsArrowDown />{" "}
                        {ContentData?.content_online?.percent?.toFixed(2)}%
                      </span>
                    ) : (
                      <span className="stat_up">
                        <BsArrowUp />{" "}
                        {ContentData?.content_online?.percent?.toFixed(2)}%
                      </span>
                    )}

                    <span>vs yesterday</span>
                  </div>
                </CardContent>
              </Card>
            </Link>
          </Col>
          <Col>
            <Link to={"/reports-tables-content/content_avg_price"}>
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
                    <Typography variant="body2" className="card-head-txt mb-2">
                      £{" "}
                      {formatAmountInMillion(ContentData?.average_content_price?.count || 0)}
                    </Typography>
                  </div>
                  <Typography
                    sx={{ fontSize: 14 }}
                    color="text.secondary"
                    gutterBottom
                    className="cardContent_head"
                  >
                    Content average price
                  </Typography>
                  <div className="content_stat">
                    {ContentData?.average_content_price?.type === "decrease" ? (
                      <span className="stat_down">
                        <BsArrowDown />{" "}
                        {ContentData?.average_content_price?.percent?.toFixed(
                          2
                        )}
                        %
                      </span>
                    ) : (
                      <span className="stat_up">
                        <BsArrowUp />{" "}
                        {ContentData?.average_content_price?.percent?.toFixed(
                          2
                        )}
                        %
                      </span>
                    )}
                    <span>vs yesterday</span>
                  </div>
                </CardContent>
              </Card>
            </Link>
          </Col>
          <Col>
            <Link to={"/reports-tables-content/content_purchase_volume_moment"}>
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
                    <Typography variant="body2" className="card-head-txt mb-2">
                      {(ContentData?.content_purchase_moment?.count || 0)?.toFixed(2)}%
                    </Typography>
                  </div>
                  <Typography
                    sx={{ fontSize: 14 }}
                    color="text.secondary"
                    gutterBottom
                    className="cardContent_head"
                  >
                    Content purchase volume movement
                  </Typography>
                  <div className="content_stat">
                    {ContentData?.content_purchase_moment?.type ===
                      "increase" ? (
                      <span className="stat_up">
                        <BsArrowUp />
                        {ContentData?.content_purchase_moment?.percent?.toFixed(
                          2
                        )}
                        %
                      </span>
                    ) : ContentData?.content_purchase_moment?.type ===
                      "decrease" ? (
                      <span className="stat_down">
                        <BsArrowUp />
                        {ContentData?.content_purchase_moment?.percent?.toFixed(
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
            <Link to={"/reports-tables-content/fund_invested_today"}>
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
                    <Typography variant="body2" className="card-head-txt mb-2">
                      £{" "}
                      {formatAmountInMillion(ContentData?.today_fund_invested?.count || 0)}
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
                  <div className="content_stat">
                    {ContentData?.today_fund_invested?.type === "decrease" ? (
                      <span className="stat_down">
                        <BsArrowDown />{" "}
                        {ContentData?.today_fund_invested?.percent?.toFixed(2)}%
                      </span>
                    ) : (
                      <span className="stat_up">
                        <BsArrowUp />{" "}
                        {ContentData?.today_fund_invested?.percent?.toFixed(2)}%
                      </span>
                    )}
                    <span>vs yesterday</span>
                  </div>
                </CardContent>
              </Card>
            </Link>
          </Col>
          <Col>
            <Link to={"/reports-tables-content/total_fund_invested"}>
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
                    <Typography variant="body2" className="card-head-txt mb-2">
                      {`£${formatAmountInMillion(ContentData?.total_fund_invested?.count || 0)}`}
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
                  <div className="content_stat">
                    {ContentData?.total_fund_invested?.type === "decrease" ? (
                      <span className="stat_down">
                        <BsArrowDown />{" "}
                        {ContentData?.total_fund_invested?.percent?.toFixed(2)}%
                      </span>
                    ) : (
                      <span className="stat_up">
                        <BsArrowUp />{" "}
                        {ContentData?.total_fund_invested?.percent?.toFixed(2)}%
                      </span>
                    )}
                    <span>vs last month</span>
                  </div>
                </CardContent>
              </Card>
            </Link>
          </Col>
        </Row>
        <div className="taskstat_chart chrts">
          <Row>
            <Col md={8}>
              <div className="contentChartsWrap">
                <Row>
                  <Col md={6}>
                    <div className="reportCard">
                      <div className="statChartHead align-items-center">
                        <Link to={"/reports-tables-content/content_categories"}>
                          <p className="cht_hdngs">Content categories</p>
                        </Link>
                        <div className="statSort">
                          <Link
                            to={"/reports-tables-content/content_categories"}
                          >
                            <img src={taskIcon} className="tbl_icn" />
                          </Link>
                          {/* <button className='sortTrigger' onClick={() => {handleOpen(); setChartName({...chartName, category: "contentCategories"})}}>Sort <AiFillCaretDown /></button> */}
                          <div className="fltrs_prnt">
                            <button
                              className="sortTrigger"
                              onClick={() => {
                                setOpenSortCategory(true);
                                setChartName({
                                  ...chartName,
                                  category: "contentCategories",
                                });
                              }}
                            >
                              Sort <AiFillCaretDown />
                            </button>
                            {openSortCategory && (
                              <ChartsSort
                                rangeTimeValues={timeValuesHandler}
                                closeSortComponent={() =>
                                  setOpenSortCategory(false)
                                }
                              />
                            )}
                          </div>
                        </div>
                      </div>
                      <div className="statChartBody">
                        <Link to={"/reports-tables-content/content_categories"}>
                          <ReactApexChart
                            options={taskCategories}
                            series={taskCategories.series}
                            type="pie"
                            width="350"
                          />
                        </Link>
                      </div>
                    </div>
                  </Col>

                  <Col md={6}>
                    <div className="reportCard mb-0">
                      <div className="statChartHead align-items-center">
                        <Link to={"/reports-tables-content/content_type"}>
                          <p className="cht_hdngs">Content type</p>
                        </Link>
                        <div className="statSort">
                          <Link to={"/reports-tables-content/content_type"}>
                            <img src={taskIcon} className="tbl_icn" />
                            {/* <button className='sortTrigger' onClick={() => {handleOpen(); setChartName({...chartName, type: "contentType"})}}>Sort <AiFillCaretDown /></button> */}
                          </Link>
                          <div className="fltrs_prnt">
                            <button
                              className="sortTrigger"
                              onClick={() => {
                                setOpenSortType(true);
                                setChartName({
                                  ...chartName,
                                  type: "contentType",
                                });
                              }}
                            >
                              Sort <AiFillCaretDown />
                            </button>
                            {openSortType && (
                              <ChartsSort
                                rangeTimeValues={timeValuesHandler}
                                closeSortComponent={() =>
                                  setOpenSortType(false)
                                }
                              />
                            )}
                          </div>
                        </div>
                      </div>
                      <div className="statChartBody">
                        <Link to={"/reports-tables-content/content_type"}>
                          <ReactApexChart
                            options={contentType}
                            series={contentType.series}
                            type="pie"
                            width="350"
                          />
                        </Link>
                      </div>
                    </div>
                  </Col>
                  <Col md={6}>
                    <div className="reportCard mb-0">
                      <div className="statChartHead">
                        <Link to={"/reports-tables-content/content_split"}>
                          <p className="cht_hdngs">Content split</p>
                        </Link>
                        <div className="statSort">
                          <Link to={"/reports-tables-content/content_split"}>
                            <img src={taskIcon} className="tbl_icn" />
                          </Link>
                          {/* <button className='sortTrigger' onClick={() => {handleOpen(); setChartName({...chartName, split: "contentSplit"})}}>Sort <AiFillCaretDown /></button> */}
                          <div className="fltrs_prnt">
                            <button
                              className="sortTrigger"
                              onClick={() => {
                                setOpenSortSplit(true);
                                setChartName({
                                  ...chartName,
                                  split: "contentSplit",
                                });
                              }}
                            >
                              Sort <AiFillCaretDown />
                            </button>
                            {openSortSplit && (
                              <ChartsSort
                                rangeTimeValues={timeValuesHandler}
                                closeSortComponent={() =>
                                  setOpenSortSplit(false)
                                }
                              />
                            )}
                          </div>
                        </div>
                      </div>
                      <div className="statChartBody">
                        <Link to={"/reports-tables-content/content_split"}>
                          <ReactApexChart
                            options={taskCategories}
                            series={taskCategories.series}
                            type="pie"
                            width="350"
                          />
                        </Link>
                      </div>
                    </div>
                  </Col>
                  <Col md={6}>
                    <div className="reportCard mb-0">
                      <div className="statChartHead">
                        <Link to={"/reports-tables-content/content_location"}>
                          <p className="cht_hdngs">Content locations</p>
                        </Link>
                        <div className="statSort">
                          <Link to={"/reports-tables-content/content_location"}>
                            <img src={taskIcon} className="tbl_icn" />
                          </Link>
                          {/* <button className='sortTrigger' onClick={() => {handleOpen(); setChartName({...chartName, location: "contentLocation"})}}>Sort <AiFillCaretDown /></button> */}
                          <div className="fltrs_prnt">
                            <button
                              className="sortTrigger"
                              onClick={() => {
                                setOpenSortLocation(true);
                                setChartName({
                                  ...chartName,
                                  location: "contentLocation",
                                });
                              }}
                            >
                              Sort <AiFillCaretDown />
                            </button>
                            {openSortLocation && (
                              <ChartsSort
                                rangeTimeValues={timeValuesHandler}
                                closeSortComponent={() =>
                                  setOpenSortLocation(false)
                                }
                              />
                            )}
                          </div>
                        </div>
                      </div>
                      <div className="statChartBody">
                        <Link to={"/reports-tables-content/content_location"}>
                          <ReactApexChart
                            options={contentLocation}
                            series={contentLocation.series}
                            type="pie"
                            width="350"
                          />
                        </Link>
                      </div>
                    </div>
                  </Col>
                </Row>
              </div>
            </Col>
            <Col md={4}>
              <div className="typeContentsWrap bg-grey h-100">
                <Tabs
                  defaultActiveKey="purchased"
                  id="uncontrolled-tab-example"
                  className="mb-3"
                >
                  <Tab eventKey="purchased" title="Purchased">
                    {/* <button className='sortTrigger' onClick={() => { handleClickOpen(); setChartName({ ...chartName, purchased: "purchased" }) }}>Sort <AiFillCaretDown /></button> */}
                    <div className="fltrs_prnt rport_cont_fltrprnt">
                      <button
                        className="sortTrigger"
                        onClick={() => {
                          setOpenReportPurchased(true);
                        }}
                      >
                        Sort <AiFillCaretDown />
                      </button>
                      {openreportPurchased && (
                        <ReportPurchasedSourced
                          rangeTimeValues={timeValuesHandler}
                          closeSortComponent={() =>
                            setOpenReportPurchased(false)
                          }
                        />
                      )}
                      {/* <ReportPurchasedSourced /> */}
                    </div>
                    <Row>
                      {pur_content &&
                        pur_content.slice(-6).map((curr) => {
                          return (
                            <Col md={6} className="">
                              <div className="contentCard">
                                <img
                                  className="reportcontentImg img-fluid"
                                  src={
                                    curr?.content[0]?.media_type === "video"
                                      ? process.env.REACT_APP_CONTENT_MEDIA +
                                      curr?.content[0]?.thumbnail
                                      : curr?.content[0]?.media_type === "audio"
                                        ? audioic
                                        : process.env.REACT_APP_CONTENT_MEDIA +
                                        curr?.content[0]?.media
                                  }
                                  alt=""
                                />
                                <div className="contInfo d-flex">
                                  <h6 className="contentHeadng">
                                    {curr?.description}
                                  </h6>
                                  {curr?.type === "shared" ? (
                                    <img
                                      className="contentTag"
                                      src={share}
                                      alt="Shared Content"
                                    />
                                  ) : (
                                    <img
                                      className="contentTag"
                                      src={exclusive}
                                      alt="Exclusive Content"
                                    />
                                  )}
                                </div>
                                <div className="contInfo d-flex justify-content-between align-items-center">
                                  <h6 className="mb-0 typeText font-md">
                                    {curr?.type === "shared"
                                      ? "Shared"
                                      : "Exclusive"}
                                  </h6>
                                  <span className="priceTag">
                                    {" "}
                                    £{curr?.ask_price}
                                  </span>
                                </div>
                              </div>
                            </Col>
                          );
                        })}
                    </Row>
                    <div className="viewAllContn text-end">
                      <Link className="view_link">
                        View All <BsArrowRight className="text-pink ms-1" />
                      </Link>
                    </div>
                  </Tab>
                  <Tab eventKey="sourced" title="Sourced">
                    {/* <button className='sortTrigger' onClick={() => { handleClickOpen(); setChartName({ ...chartName, sourced: "sourced" }) }}>Sort <AiFillCaretDown /></button> */}
                    <div className="fltrs_prnt rport_cont_fltrprnt">
                      <button
                        className="sortTrigger"
                        onClick={() => {
                          setOpenReportPurchased(true);
                        }}
                      >
                        Sort <AiFillCaretDown />
                      </button>
                      {openreportPurchased && (
                        <ReportPurchasedSourced
                          rangeTimeValues={timeValuesHandler}
                          closeSortComponent={() =>
                            setOpenReportPurchased(false)
                          }
                        />
                      )}
                      {/* <ReportPurchasedSourced /> */}
                    </div>
                    <Row>
                      {pub_content &&
                        pub_content.slice(0, 6).map((curr, index) => {
                          return (
                            <Col md={6} className="">
                              <div className="contentCard">
                                <img
                                  className="reportcontentImg img-fluid"
                                  src={
                                    curr?.content[0]?.media_type === "video"
                                      ? process.env.REACT_APP_CONTENT_MEDIA +
                                      curr?.content[0]?.thumbnail
                                      : curr?.content[0]?.media_type === "audio"
                                        ? audioic
                                        : process.env.REACT_APP_CONTENT_MEDIA +
                                        curr?.content[0]?.media
                                  }
                                  alt=""
                                />
                                <div className="contInfo d-flex">
                                  <h6 className="contentHeadng">
                                    {curr?.description}
                                  </h6>
                                  {curr?.type === "shared" ? (
                                    <img
                                      className="contentTag"
                                      src={share}
                                      alt="Shared Content"
                                    />
                                  ) : (
                                    <img
                                      className="contentTag"
                                      src={exclusive}
                                      alt="Exclusive Content"
                                    />
                                  )}
                                </div>
                                <div className="contInfo d-flex justify-content-between align-items-center">
                                  <h6 className="mb-0 typeText font-md">
                                    {curr?.type === "shared"
                                      ? "Shared"
                                      : "Exclusive"}
                                  </h6>
                                  <span className="priceTag">
                                    £{curr?.ask_price}
                                  </span>
                                </div>
                              </div>
                            </Col>
                          );
                        })}
                    </Row>
                    <div className="viewAllContn text-end">
                      <Link className="view_link">
                        View All <BsArrowRight className="text-pink ms-1" />
                      </Link>
                    </div>
                  </Tab>
                </Tabs>
                <ContentSortingDialog
                  rangeContentTimeValues={contentTimeValuesHandler}
                  open={open2}
                  onClose={handleClose2}
                  actions={<AiOutlineClose onClick={handleClose2} />}
                />
              </div>
            </Col>
          </Row>
        </div>

        {/* Tasks */}
        <div className="taskSummaryBar mt-4">
          <div className="reportCard">
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
                  closeSortComponent={() => setOpenSortTask(false)}
                />
              )}
            </div>
            <Tabs
              defaultActiveKey="tasks"
              id="uncontrolled-tab-example"
              className="mb-3">
              <Tab eventKey="tasks" title="Content purchased summary">
                <Link to={"/reports-tables-content/content_purchased_summary"}>
                  <img src={taskIcon} alt="" className="tbles_icn" />
                </Link>
                <Link to={"/reports-tables-content/content_purchased_summary"}>
                  <ReactApexChart
                    options={contentSummary.options}
                    series={contentSummary.series}
                    type="bar"
                    height={350}
                  />
                </Link>
              </Tab>

              <Tab eventKey="content" title="Content sourced summary">
                <Link to="/reports-tables-content/content_sourced_summary">
                  <img src={taskIcon} alt="Task Icon" className="tbles_icn" />
                </Link>
                <Link to="/reports-tables-content/content_sourced_summary">
                  <ReactApexChart
                    options={contentsourced.options}
                    series={contentsourced.series}
                    type="bar"
                    height={350}
                  />
                </Link>
              </Tab>

              <Tab eventKey="funds" title="Funds Invested summary">
                <Link to={"/reports-tables-content/fund_invested_summary"}>
                  <img src={taskIcon} alt="" className="tbles_icn" />
                </Link>
                <Link to={"/reports-tables-content/fund_invested_summary"}>
                  <ReactApexChart
                    options={fundInvested.options}
                    series={fundInvested.series}
                    type="bar"
                    height={350}
                  />
                </Link>
              </Tab>
            </Tabs>
          </div>
        </div>
      </div>
    </>
  );
};

export default memo(ContentReports);
