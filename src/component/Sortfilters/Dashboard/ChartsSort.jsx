import React, { useEffect, useState } from "react";
import closeic from "../../../assets/images/sortIcons/close.svg";
import { FiSearch } from "react-icons/fi";
import livetasksic from "../../../assets/images/sortIcons/livetasks.png";
import completedtaskic from "../../../assets/images/sortIcons/completedtask.svg";
import taskintimeic from "../../../assets/images/sortIcons/taskintime.svg";
import delayedtaskic from "../../../assets/images/sortIcons/delayedtask.svg";
import calendaric from "../../../assets/images/calendar.svg";
import locationic from "../../../assets/images/location.svg";
import latestic from "../../../assets/images/sortIcons/latest.svg";
import celebrityic from "../../../assets/images/sortIcons/celebrity.svg";
import crimeic from "../../../assets/images/sortIcons/crime.svg";
import politicalic from "../../../assets/images/sortIcons/political.svg";
import businessic from "../../../assets/images/sortIcons/business.svg";
import fashionic from "../../../assets/images/Fashion.svg";
import dailyic from "../../../assets/images/sortIcons/daily.svg";
import weeklyic from "../../../assets/images/sortIcons/weekly.svg";
import monthlyic from "../../../assets/images/sortIcons/monthly.svg";
import custom from '../../../assets/images/sortIcons/custom.svg';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import lowestprcdic from "../../../assets/images/sortIcons/Lowest-rated.svg";
import highestprcdic from "../../../assets/images/sortIcons/highest-rated.svg";

import Form from "react-bootstrap/Form";

const ChartsSort = ({ rangeTimeValues, closeSortComponent, dateOneValue, dateTwoValue }) => {

  const [active, setActive] = useState("")

  const handleClose = (values) => {
    closeSortComponent(values)
  }

  const handleClickTime = (values) => {
    rangeTimeValues(values)
    setActive(values);
  }

  const [selectedDateOne, setSelectedDateOne] = useState(null);
  const [selectedDateTwo, setSelectedDateTwo] = useState(null);

  const handleSelectedDateOne = (values) => {
    setSelectedDateOne(values);
    let date1 = new Date(values);
    date1 = date1.toISOString();
    dateOneValue(date1)
  }
  const handleSelectedDateTwo = (values) => {
    setSelectedDateTwo(values);
    let date2 = new Date(values);
    date2 = date2.toISOString();
    dateTwoValue(date2)
  }


  return (
    <>
      <div className="filter_wrap">
        <div className="srt_fltr_hdr">
          <img src={closeic} height="17px" className="icn close" alt="Close" onClick={() => handleClose(false)} />
          <p className="hdng">Sort</p>
          <div className="notf_icn_wrp" onClick={() => handleClose(false)}>
            <a className="link">Clear all</a>
          </div>
        </div>
        <div className="srt_sub_hdng">
          <p className="sort_hdng" alt="">
            Sort
          </p>
        </div>
        <div className="sort_list">
          <div className={`sort_item ${active === "daily" ? "active" : null}`} style={{cursor:"pointer"}} onClick={() => handleClickTime("daily")}>
            <img src={dailyic} className="icn" alt="Daily" />
            <p className="sort_txt">View daily</p>
          </div>
          <div className={`sort_item ${active === "weekly" ? "active" : null}`} style={{cursor:"pointer"}} onClick={() => handleClickTime("weekly")}>
            <img src={weeklyic} className="icn" alt="Weekly" />
            <p className="sort_txt">View weekly</p>
          </div>
          <div className={`sort_item ${active === "monthly" ? "active" : null}`} style={{cursor:"pointer"}} onClick={() => handleClickTime("monthly")}>
            <img src={monthlyic} className="icn" alt="Monthly" />
            <p className="sort_txt">View monthly</p>
          </div>
          <div className={`sort_item ${active === "yearly" ? "active" : null}`} style={{cursor:"pointer"}} onClick={() => handleClickTime("yearly")}>
            <img src={calendaric} className="icn" alt="yearly" />
            <p className="sort_txt">View yearly</p>
          </div>
          {/* <div className="sort_item" onClick={() => handleClickTime("latest-lowPrice")}>
            <img
              src={lowestprcdic}
              className="icn"
              alt="Lowest priced content"
            />
            <p className="sort_txt">Lowest priced content</p>
          </div> */}
          {/* <div className="sort_item" onClick={() => handleClickTime("latest-highPrice")}>
            <img
              src={highestprcdic}
              className="icn"
              alt="Highest priced content"
            />
            <p className="sort_txt">Highest priced content</p>
          </div> */}
          {/* <div className="sort_item opnlist d-flex">
            <img src={custom} alt="" />
            <div className='optnVlaue custmView d-flex'>
              <span className='fromDate'>
                From
                <DatePicker
                  selected={selectedDateOne}
                  onChange={(e) => handleSelectedDateOne(e)}
                />
              </span>
              <span className='toDate'>
                To
                <DatePicker
                  selected={selectedDateTwo}
                  onChange={(e) => handleSelectedDateTwo(e)}
                />
              </span>
            </div>

          </div> */}
        </div>
        <button className="fltr_btn mt-3">
          Apply
        </button>
      </div>
    </>
  );
};

export default ChartsSort;
