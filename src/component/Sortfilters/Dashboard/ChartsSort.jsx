import React, { useEffect, useState } from "react";
import closeic from "../../../assets/images/sortIcons/close.svg";
import calendaric from "../../../assets/images/calendar.svg";
import dailyic from "../../../assets/images/sortIcons/daily.svg";
import weeklyic from "../../../assets/images/sortIcons/weekly.svg";
import monthlyic from "../../../assets/images/sortIcons/monthly.svg";
import "react-datepicker/dist/react-datepicker.css";
import { useLocation, useNavigate } from "react-router-dom";

const ChartsSort = ({ rangeTimeValues, closeSortComponent, active, setActive, setChartName }) => {
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const sortParam = queryParams.get("sort");

  const navigate = useNavigate();
  const [values, setValues] = useState(sortParam || "");

  const handleClose = (values) => {
    closeSortComponent(values)
  }

  const handleClear = () => {
    setChartName({
      category: "",
      type: "",
      location: "",
      task: "",
    })
    setActive("")
    navigate(`?sort=`);
    closeSortComponent(values)
  }

  const handleApply = () => {
    setActive(values)
    navigate(`?sort=${values}`);
    closeSortComponent(values)
  };

  return (
    <>
      <div className="filter_wrap">
        <div className="srt_fltr_hdr">
          <img src={closeic} height="17px" className="icn close" alt="Close" onClick={() => handleClose(false)} />
          <p className="hdng">Sort</p>
          <div className="notf_icn_wrp" onClick={() => handleClear()}>
            <a className="link">Clear all</a>
          </div>
        </div>
        <div className="srt_sub_hdng">
          <p className="sort_hdng" alt="">
            Sort
          </p>
        </div>
        <div className="sort_list">
          <div className={`sort_item ${values === "daily" ? "active" : null}`} style={{ cursor: "pointer" }} onClick={() => setValues("daily")}>
            <img src={dailyic} className="icn" alt="Daily" />
            <p className="sort_txt">View daily</p>
          </div>
          <div className={`sort_item ${values === "weekly" ? "active" : null}`} style={{ cursor: "pointer" }} onClick={() => setValues("weekly")}>
            <img src={weeklyic} className="icn" alt="Weekly" />
            <p className="sort_txt">View weekly</p>
          </div>
          <div className={`sort_item ${values === "monthly" ? "active" : null}`} style={{ cursor: "pointer" }} onClick={() => setValues("monthly")}>
            <img src={monthlyic} className="icn" alt="Monthly" />
            <p className="sort_txt">View monthly</p>
          </div>
          <div className={`sort_item ${values === "yearly" ? "active" : null}`} style={{ cursor: "pointer" }} onClick={() => setValues("yearly")}>
            <img src={calendaric} className="icn" alt="yearly" />
            <p className="sort_txt">View yearly</p>
          </div>
        </div>
        <button className="fltr_btn mt-3" onClick={handleApply}>
          Apply
        </button>
      </div>
    </>
  );
};

export default ChartsSort;
