import closeic from "../../assets/images/sortIcons/close.svg";
import calendaric from "../../assets/images/calendar.svg";
import dailyic from "../../assets/images/sortIcons/daily.svg";
import weeklyic from "../../assets/images/sortIcons/weekly.svg";
import monthlyic from "../../assets/images/sortIcons/monthly.svg";
import "react-datepicker/dist/react-datepicker.css";
import { useState } from "react";

// CommonSort.jsx
import React from "react";

const CommonSort = ({
  sort,
  setSort,
  dashboardSort,
  setDashboardSort,
  setSortState,
}) => {
  const handleSortClick = (sortOption) => {
    setSort(sortOption);
  };

  const handleApplyClick = () => {
    setSortState(sort);
    setDashboardSort((prev) => ({ ...prev, time: sort }));
  };
  const handleClearSort = () => {
    setSortState("");
    setDashboardSort((prev) => ({ ...prev, time: "" }));
  };
  return (
    <>
      <div
        className={`filter_wrap ${
          dashboardSort.type === "content_purchased_online"
            ? "fltrMaxWidth"
            : ""
        }`}
      >
        <div className="srt_fltr_hdr">
          <img
            src={closeic}
            height="17px"
            className="icn close"
            alt="Close"
            onClick={() => setDashboardSort({ type: "" })}
          />
          <p className="hdng">Sort</p>
          <div className="notf_icn_wrp" onClick={handleClearSort}>
            <a className="link">Clear all</a>
          </div>
        </div>
        <div className="srt_sub_hdng">
          <p className="sort_hdng" alt="">
            Sort
          </p>
        </div>
        <div className="sort_list">
          <div
            className={`sort_item ${sort === "daily" ? "active" : ""}`}
            onClick={() => handleSortClick("daily")}
          >
            <img src={dailyic} className="icn" alt="Daily" />
            <p className="sort_txt">View daily</p>
          </div>
          <div
            className={`sort_item ${sort === "weekly" ? "active" : ""}`}
            onClick={() => handleSortClick("weekly")}
          >
            <img src={weeklyic} className="icn" alt="Weekly" />
            <p className="sort_txt">View weekly</p>
          </div>
          <div
            className={`sort_item ${sort === "monthly" ? "active" : ""}`}
            onClick={() => handleSortClick("monthly")}
          >
            <img src={monthlyic} className="icn" alt="Monthly" />
            <p className="sort_txt">View monthly</p>
          </div>
          <div
            className={`sort_item ${sort === "yearly" ? "active" : ""}`}
            onClick={() => handleSortClick("yearly")}
          >
            <img src={calendaric} className="icn" alt="yearly" />
            <p className="sort_txt">View yearly</p>
          </div>
          <button className="fltr_btn mt-3" onClick={handleApplyClick}>
            Apply
          </button>
        </div>
      </div>
    </>
  );
};
export default CommonSort;
