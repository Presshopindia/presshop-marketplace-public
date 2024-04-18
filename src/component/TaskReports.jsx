import React, { memo, useEffect, useState } from "react";
import { Row, Col, Tabs, Tab } from "react-bootstrap";
import { Card, CardContent, Typography } from "@mui/material";
import { BsArrowDown, BsArrowUp } from "react-icons/bs";
import ReactApexChart from "react-apexcharts";
import taskIcon from "../assets/images/taskIcon.svg";
import { AiFillCaretDown, AiOutlineClose } from "react-icons/ai";
import { Get } from "../services/user.services";
import SortingDialog from "../popups/SortingDialog";
import Loader from "./Loader";
import Fundsinvested from "./Sortfilters/Dashboard/Fundsinvested";
import ChartsSort from "./Sortfilters/Dashboard/ChartsSort";
import { Link, useNavigate } from "react-router-dom";
// import { Get } from '../services/user.services';
const TaskReports = ({ timeValuesProps }) => {
  const navigate = useNavigate();
  const [contentType, setContentType] = useState({
    series: [],
    labels: [],
    chart: {
      type: "pie",
    },
    legend: {
      position: "bottom",
      color: "red",
    },
    tooltip: {
      theme: "custom-tooltip", // Use a custom tooltip theme
    },
    colors: ["#20639B", "#53C5AE", "#FFEC00"],
  });

  const [taskLocation, setTaskLocation] = useState({
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

  const [taskSummary, setTaskSummary] = useState({
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

  const chartOptions = {
    labels: ["Business", "Political", "Crime", "Fashion", "Others"],
    series: [90, 40, 45, 50, 9],
    chart: {
      type: "pie",
    },
    legend: {
      position: "bottom",
    },
    colors: ["#EC4E54", "#53C5AE", "#FFEC00", "#20639B", "#9A7B4F"],
    tooltip: {
      theme: "custom-tooltip", // Use a custom tooltip theme
    },
  };

  const [chartData3] = useState({
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
      colors: ["#53C5AE"],
    },
    series: [
      {
        name: "sales",
        data: [30, 40, 45, 50, 49, 60, 70, 91, 75, 60, 45, 30],
      },
    ],
  });

  const [openSortComponent, setOpenSortComponent] = useState(false);

  const [openSortContentType, setOpenSortContentType] = useState(false);
  const [openSortLocation, setOpenSortLocation] = useState(false);
  const [openSortCategory, setOpenSortCategory] = useState(false);
  const [openSortTask, setOpenSortTask] = useState(false);

  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [timeValues, setTimeValues] = useState("");
  const [chartName, setChartName] = useState({
    category: "",
    type: "",
    location: "",
    task: "",
  });

  const timeValuesHandler = (values) => {
    setTimeValues(values);
  };

  // open and close sort component-
  const handleCloseSortComponent = (values) => {
    setOpenSortComponent(values);
  };

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const TaskType = async () => {
    setLoading(true);

    try {
      const resp = await Get(
        `mediaHouse/reportcontentType?${(chartName.type == "contentType" && timeValues) || timeValuesProps
        }=${(chartName.type == "contentType" && timeValues) || timeValuesProps}`
      );
      // console.log(resp.data, "<--------resp.data.data 150")
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

  const TaskLocation = async () => {
    setLoading(true);

    try {
      const resp = await Get(
        `mediaHouse/reportlocation?${(chartName.location == "taskLocation" && timeValues) ||
        timeValuesProps
        }=${(chartName.location == "taskLocation" && timeValues) ||
        timeValuesProps
        }`
      );
      // console.log(resp.data, "<--------resp.data.data")
      if (resp) {
        setTaskLocation((prev) => ({
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

  const TaskCategories = async () => {
    setLoading(true);

    try {
      const resp = await Get(
        `mediaHouse/reportTaskcategory?${(chartName.category == "taskCategories" && timeValues) ||
        timeValuesProps
        }=${(chartName.category == "taskCategories" && timeValues) ||
        timeValuesProps
        }`
      );
      // console.log(resp.data, "<--------resp.data.data")
      if (resp) {
        // console.log(resp, `<---there are responser of categories`);
        setTaskCategories((prev) => ({
          ...prev,
          series: [
            resp.data.data.buisnesscount,
            resp.data.data.politics,
            resp.data.data.crimecount,
            resp.data.data.fashoncount,
            resp.data.data.others,
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

  const TaskSummary = async () => {
    setLoading(true);

    try {
      const resp = await Get(
        `mediahouse/reportgraphoftask?${(chartName.task == "task" && timeValues) || timeValuesProps
        }=${(chartName.task == "task" && timeValues) || timeValuesProps}`
      );
      // console.log(resp.data.data, "<--------resp.data.data")
      if (resp) {
        setTaskSummary((prevTaskSummary) => ({
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
        `mediahouse/reportcontentsourced?${(chartName.task == "task" && timeValues) || timeValuesProps
        }=${(chartName.task == "task" && timeValues) || timeValuesProps}`
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
        setChartName({ ...chartName, task: "" });
      }
    } catch (error) {
      // console.log(error);
      setLoading(false);
      setChartName({ ...chartName, task: "" });
    }
  };

  const FundInvested = async () => {
    setLoading(true);

    try {
      const resp = await Get(
        `mediahouse/reportfundInvested?${(chartName.task == "task" && timeValues) || timeValuesProps
        }=${(chartName.task == "task" && timeValues) || timeValuesProps}`
      );
      // console.log(resp.data.data, "<--------resp.data.data")
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

  const [report, setReport] = useState();
  // reports card
  const getReports = async () => {
    try {
      const res = await Get(`mediahouse/reportTaskCount`);
      if (res) {
        // console.log(res, `<---there are `);
        setReport(res?.data);
      }
    } catch (er) { }
  };

  // const Navigate=(type)=>{
  //   navigate(`/reports-tables-task/${type}`)

  // }

  useEffect(() => {
    TaskLocation();
    TaskType();
    TaskSummary();
    ContentSourced();
    FundInvested();
    TaskCategories();
    getReports();
  }, [timeValues, timeValuesProps]);

  const formatAmountInMillion = (amount) =>
    amount?.toLocaleString('en-US', {
      maximumFractionDigits: 2,
    });

  return (
    <>
      {/* {console.log(taskCategories, `<----123`)} */}
      {loading && <Loader />}
      <div className="taskReports_container tsk rep_tsk">
        <Row>
          <Col md={2}>
            <Link to={`/reports-tables-task/task_broadcasted_today`}>
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
                      {report?.task_broadcasted_today?.count ?? 0}
                    </Typography>
                  </div>
                  <Typography
                    sx={{ fontSize: 14 }}
                    color="text.secondary"
                    gutterBottom
                    className="cardContent_head"
                  >
                    Tasks broadcasted today
                  </Typography>
                  <div className="content_stat">
                    {report?.task_broadcasted_today?.type === "increase" ? (
                      <span className="stat_up">
                        <BsArrowUp />
                        {report?.task_broadcasted_today?.percent}%
                      </span>
                    ) : (
                      <span className="stat_down">
                        <BsArrowDown />
                        {report?.task_broadcasted_today?.percent}%
                      </span>
                    )}
                    <span>vs yesterday</span>
                  </div>
                </CardContent>
              </Card>
            </Link>
          </Col>
          <Col md={2}>
            <Link to={"/reports-tables-task/content_sourced_task"}>
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
                      {report?.today_content_sourced_from_task?.count ?? 0}
                    </Typography>
                  </div>
                  <Typography
                    sx={{ fontSize: 14 }}
                    color="text.secondary"
                    gutterBottom
                    className="cardContent_head"
                  >
                    Content sourced from tasks today
                  </Typography>
                  <div className="content_stat">
                    {report?.today_content_sourced_from_task?.type ===
                      "increase" ? (
                      <span className="stat_up">
                        <BsArrowUp />
                        {report?.today_content_sourced_from_task?.percent}%
                      </span>
                    ) : (
                      <span className="stat_down">
                        <BsArrowDown />
                        {report?.today_content_sourced_from_task?.percent}%
                      </span>
                    )}
                    <span>vs yesterday</span>
                  </div>
                </CardContent>
              </Card>
            </Link>
          </Col>
          <Col md={2}>
            <Link to={"/reports-tables-task/total_content_sourced_today"}>
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
                      {report?.total_content_sourced_from_task?.count ?? 0}
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
                    {report?.total_content_sourced_from_task?.type ===
                      "increase" ? (
                      <span className="stat_up">
                        <BsArrowUp />
                        {report?.total_content_sourced_from_task?.percent}%
                      </span>
                    ) : (
                      <span className="stat_down">
                        <BsArrowDown />
                        {report?.total_content_sourced_from_task?.percent}%
                      </span>
                    )}
                    <span>vs last month</span>
                  </div>
                </CardContent>
              </Card>
            </Link>
          </Col>
          <Col md={2}>
            <Link to={"/reports-tables-task/funds_invested_today"}>
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
                      £{report?.today_fund_invested?.count ?? 0}
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
                    {report?.today_fund_invested?.type === "increase" ? (
                      <span className="stat_up">
                        <BsArrowUp />
                        {report?.today_fund_invested?.percentage}%
                      </span>
                    ) : (
                      <span className="stat_down">
                        <BsArrowDown />
                        {report?.today_fund_invested?.percentage}%
                      </span>
                    )}
                    <span>vs yesterday</span>
                  </div>
                </CardContent>
              </Card>
            </Link>
          </Col>
          <Col md={2} className="pe-0">
            <Link to={"/reports-tables-task/total_fund_invested_today"}>
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
                      £
                      {formatAmountInMillion(report?.total_fund_invested?.count || 0)}
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
                    {report?.total_fund_invested?.type === "increase" ? (
                      <span className="stat_up">
                        <BsArrowUp />
                        {report?.total_fund_invested?.percentage}%
                      </span>
                    ) : (
                      <span className="stat_down">
                        <BsArrowDown />
                        {report?.total_fund_invested?.percentage}%
                      </span>
                    )}

                    <span>vs yesterday</span>
                  </div>
                </CardContent>
              </Card>
            </Link>
          </Col>
          <Col md={2} className="ps-4">
            <Link to={"/reports-tables-task/deadline_met"}>
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
                      {formatAmountInMillion(report?.deadline_met?.task || 0)}%
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
                  <div className="content_stat">
                    {report?.deadline_met?.type === "increase" ? (
                      <span className="stat_up">
                        <BsArrowUp />
                        {(report?.deadline_met?.percentage || 0)?.toFixed(2)}%
                      </span>
                    ) : (
                      <span className="stat_down">
                        <BsArrowDown />
                        {(report?.deadline_met?.percentage || 0)?.toFixed(2)}%
                      </span>
                    )}{" "}
                    <span>vs yesterday</span>
                  </div>
                </CardContent>
              </Card>
            </Link>
          </Col>
        </Row>

        {/* 3 Task Chart */}
        <div className="taskstat_chart chrts">
          <Row>
            <Col md={4}>
              <div className="reportCard">
                <div className="statChartHead align-items-center">
                  <Link
                    to={"/reports-tables-task/task_categories"}
                    className="text-dark"
                  >
                    <p className="cht_hdngs">Task categories</p>
                  </Link>
                  <div className="statSort">
                    <Link
                      to={"/reports-tables-task/task_categories"}
                      className="text-dark"
                    >
                      <img src={taskIcon} className="tbl_icn" alt="" />
                      {/* <button className='sortTrigger' onClick={() => {handleOpen(); setChartName({...chartName, category: "taskCategories"})}}>Sort <AiFillCaretDown /></button> */}
                    </Link>
                    <div className="fltrs_prnt">
                      <button
                        className="sortTrigger"
                        onClick={() => {
                          setOpenSortCategory(true);
                          setChartName({
                            ...chartName,
                            category: "taskCategories",
                          });
                        }}
                      >
                        Sort <AiFillCaretDown />
                      </button>
                      {openSortCategory && (
                        <ChartsSort
                          rangeTimeValues={timeValuesHandler}
                          closeSortComponent={() => setOpenSortCategory(false)}
                        />
                      )}
                    </div>
                  </div>
                </div>
                <div className="statChartBody">
                  <Link
                    to={"/reports-tables-task/task_categories"}
                    className="text-dark"
                  >
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
            <Col md={4}>
              <div className="reportCard">
                <div className="statChartHead align-items-center">
                  <Link
                    to={"/reports-tables-task/content_type"}
                    className="text-dark"
                  >
                    <p className="cht_hdngs">Content type</p>
                  </Link>
                  <div className="statSort">
                    <Link
                      to={"/reports-tables-task/content_type"}
                      className="text-dark"
                    >
                      <img src={taskIcon} className="tbl_icn" />
                    </Link>
                    {/* <button className='sortTrigger' onClick={() => {handleOpen(); setChartName({...chartName, type: "contentType"})}}>Sort <AiFillCaretDown /></button> */}
                    <div className="fltrs_prnt">
                      <button
                        className="sortTrigger"
                        onClick={() => {
                          setOpenSortContentType(true);
                          setChartName({ ...chartName, type: "contentType" });
                        }}
                      >
                        Sort <AiFillCaretDown />
                      </button>
                      {openSortContentType && (
                        <ChartsSort
                          rangeTimeValues={timeValuesHandler}
                          closeSortComponent={() =>
                            setOpenSortContentType(false)
                          }
                        />
                      )}
                    </div>
                  </div>
                </div>
                <div className="statChartBody">
                  <Link
                    to={"/reports-tables-task/content_type"}
                    className="text-dark"
                  >
                    <ReactApexChart
                      options={contentType && contentType}
                      series={contentType?.series}
                      type="pie"
                      width="350"
                    />
                  </Link>
                </div>
              </div>
            </Col>
            <Col md={4}>
              <div className="reportCard">
                <div className="statChartHead align-items-center">
                  <Link
                    to={"/reports-tables-task/task_location"}
                    className="text-dark"
                  >
                    <p className="cht_hdngs">Task locations</p>
                  </Link>
                  <div className="statSort">
                    <Link
                      to={"/reports-tables-task/task_location"}
                      className="text-dark"
                    >
                      <img src={taskIcon} className="tbl_icn" />
                    </Link>
                    {/* <button className='sortTrigger' onClick={() => {handleOpen(); setChartName({...chartName, location: "taskLocation"})}}>Sort <AiFillCaretDown /></button> */}
                    <div className="fltrs_prnt">
                      <button
                        className="sortTrigger"
                        onClick={() => {
                          setOpenSortLocation(true);
                          setChartName({
                            ...chartName,
                            location: "taskLocation",
                          });
                        }}
                      >
                        Sort <AiFillCaretDown />
                      </button>
                      {openSortLocation && (
                        <ChartsSort
                          rangeTimeValues={timeValuesHandler}
                          closeSortComponent={() => setOpenSortLocation(false)}
                        />
                      )}
                    </div>
                  </div>
                </div>
                <div className="statChartBody">
                  <Link
                    to={"/reports-tables-task/task_location"}
                    className="text-dark"
                  >
                    <ReactApexChart
                      options={taskLocation}
                      series={taskLocation.series}
                      type="pie"
                      width="350"
                    />
                  </Link>
                </div>
              </div>
            </Col>
          </Row>
        </div>

        {/* Sorting Dialogue */}
        <div className="taskSummaryBar mt-4">
          <div className="reportCard">
            {/* <div className='sortingStat'>
              <button className='sortTrigger' onClick={handleOpen}>Sort <AiFillCaretDown /></button>
              <SortingDialog
                rangeTimeValues={timeValuesHandler}
                open={open}
                onClose={handleClose}
                actions={<AiOutlineClose onClick={handleClose} />}
              />
            </div> */}
            {/* <div className="tbl_icn_th"> */}
            {/* </div> */}

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
              className="mb-3 grph_tbs"
            >
              <Tab eventKey="tasks" title="Task summary">
                <Link
                  to={"/reports-tables-task/task_summary"}
                  className="text-dark"
                >
                  <img src={taskIcon} alt="" className="tbles_icn" />
                </Link>
                <Link
                  to={"/reports-tables-task/task_summary"}
                  className="text-dark"
                >
                  <ReactApexChart
                    options={taskSummary.options}
                    series={taskSummary.series}
                    type="bar"
                    height={350}
                  />
                </Link>
              </Tab>

              <Tab
                eventKey="content"
                title="Content sourced from tasks summary"
              >
                <Link
                  to={"/reports-tables-task/content_sourced_from_task_summary"}
                  className="text-dark"
                >
                  <img src={taskIcon} alt="" className="tbles_icn" />
                </Link>
                <Link
                  to={"/reports-tables-task/content_sourced_from_task_summary"}
                  className="text-dark"
                >
                  <ReactApexChart
                    options={contentsourced.options}
                    series={contentsourced.series}
                    type="bar"
                    height={350}
                  />
                </Link>
              </Tab>

              <Tab eventKey="funds" title="Funds invested summary">
                <Link
                  to={"/reports-tables-task/fund_invested_summary"}
                  className="text-dark"
                >
                  <img src={taskIcon} alt="" className="tbles_icn" />
                </Link>
                <Link
                  to={"/reports-tables-task/fund_invested_summary"}
                  className="text-dark"
                >
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

export default memo(TaskReports);
