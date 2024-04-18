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
import priceic from "../../../assets/images/sortIcons/payment.svg";
import task from "../../../assets/images/task.svg";
import content from '../../../assets/images/sortIcons/content.svg';
import money from '../../../assets/images/sortIcons/money.svg';
import pending from '../../../assets/images/sortIcons/pending.svg';
import eye from '../../../assets/images/sortIcons/custom.svg'


import Form from "react-bootstrap/Form";
import { BsEye } from "react-icons/bs";

const AccountsFilter = ({closeComponent, rangeTimeValues}) => {

  const [active, setActive] = useState("")

  const handleClose = (values) => {
    closeComponent(values)
  }

  const handleClickTime = (values) => {
    rangeTimeValues(values)
    setActive(values)
  }


  return (
    <>
      <div className="filter_wrap">
        <div className="srt_fltr_hdr">
          <img src={closeic} height="17px" className="icn close" alt="Close" onClick={() => handleClose(false)} />
          <p className="hdng">Sort and Filter</p>
          <div className="notf_icn_wrp">
            <a className="link">Clear all</a>
          </div>
        </div>
        <div className="srt_sub_hdng">
          <p className="sort_hdng" alt="">
            Sort
          </p>
        </div>
        <div className="sort_list">
          <div className={`sort_item ${active === "daily" ? "active" : null}`} style={{cursor:"pointer"}} onClick={() => handleClickTime("daily")} >
            <img src={dailyic} className="icn" alt="Daily" />
            <p className="sort_txt">View daily</p>
          </div>
          <div className={`sort_item ${active === "weekly" ? "active" : null}`} style={{cursor:"pointer"}} onClick={() => handleClickTime("weekly")}>
            <img src={weeklyic} className="icn" alt="Weekly" />
            <p className="sort_txt">View weekly</p>
          </div>
          <div className={`sort_item ${active === "monthly" ? "active" : null}`} style={{cursor:"pointer"}} onClick={()=> handleClickTime("monthly")} >
            <img src={monthlyic} className="icn" alt="Monthly" />
            <p className="sort_txt">View monthly</p>
          </div>
          <div className={`sort_item ${active === "yearly" ? "active" : null}`} style={{cursor:"pointer"}} onClick={()=> handleClickTime("yearly")} >
            <img src={calendaric} className="icn" alt="yearly" />
            <p className="sort_txt">View yearly</p>
          </div>
          {/* <div className="sort_item">
            <div className="d-flex align-items-center justify-content-between w-100">
              <div className="fltr_lft">
                <img src={priceic} className="icn" alt="Scans" />
                <p className="sort_txt">Price</p>
              </div>
              <div className="fltr_rt d-flex gap-2">
                <Form.Group>
                  <Form.Select>
                    <option selected>From</option>
                  </Form.Select>
                </Form.Group>
                <Form.Group>
                  <Form.Select>
                    <option selected>To</option>
                  </Form.Select>
                </Form.Group>
              </div>
            </div>
          </div> */}
          {/* <div className="srt_sub_hdng mt-3">
          <p className="sort_hdng" alt="">
            Filter
          </p>
        </div> */}
          {/* <div className="sort_list">
            <div className="sort_item">
              <img src={task} alt="" />
              <span className='sort_txt'>View tasks</span>
            </div>
            <div className="sort_item">
              <img src={content} alt="" />
              <span className='sort_txt'>View content</span>
            </div>
            <div className="sort_item selected">
              <img src={money} alt="" />
              <span className='sort_txt'>View payments made</span>
            </div>
            <div className="sort_item">
              <img src={pending} alt="" />
              <span className='sort_txt'>View payments pending</span>
            </div>
            <div className="sort_item">
              <div className="d-flex align-items-center w-100">
                  <img src={eye} className="icn me-3" alt="Scans" />
                  <div className="fltr_rt d-flex gap-2">
                    <Form.Group>
                      <Form.Select>
                        <option selected>From</option>
                      </Form.Select>
                    </Form.Group>
                    <Form.Group>
                      <Form.Select>
                        <option selected>To</option>
                      </Form.Select>
                    </Form.Group>
                  </div>
              </div>
            </div>
            <button className="fltr_btn mt-3">Apply</button>
          </div> */}
        </div>
      </div>
    </>
  );
};

export default AccountsFilter;
