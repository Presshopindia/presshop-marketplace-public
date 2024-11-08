import React, { useState } from "react";
import closeic from "../../../assets/images/sortIcons/close.svg";
import calendaric from "../../../assets/images/calendar.svg";
import dailyic from "../../../assets/images/sortIcons/daily.svg";
import weeklyic from "../../../assets/images/sortIcons/weekly.svg";
import monthlyic from "../../../assets/images/sortIcons/monthly.svg";
import lowestprcdic from "../../../assets/images/sortIcons/Lowest-rated.svg";
import highestprcdic from "../../../assets/images/sortIcons/highest-rated.svg";
import { initStateOfUnderOffer } from "../../staticData";

const UnderOfferSort = ({ setContentUnderOffer, contentUnderOffer }) => {

    // Handle click-
    const handleClick = (type, value) => {
        if (type != "submit") {
            setContentUnderOffer({ ...contentUnderOffer, sort: { ...contentUnderOffer.sort, field: value } })
        }
        else {
            setContentUnderOffer(prev => ({
                ...prev,
                sort: {
                    ...prev.sort,
                    active: prev.sort.active === "true" ? "false" : "true",
                    sort: "false"
                }
            }));
        }
    }

    return (
        <>
            <div className="filter_wrap">
                <div className="srt_fltr_hdr">
                    <img src={closeic} height="17px" className="icn close" alt="Close" onClick={() =>
                        setContentUnderOffer(prev => ({
                            ...prev,
                            sort: {
                                ...prev.sort,
                                sort: "false"
                            }
                        }))
                    } />
                    <p className="hdng">Sort and filter</p>
                    <div className="notf_icn_wrp" onClick={() => setContentUnderOffer({ ...contentUnderOffer, sort: initStateOfUnderOffer.sort })}>
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
                        className={`sort_item ${contentUnderOffer?.sort?.field == "low_price_content" ? "active" : ""}`}
                        style={{ cursor: "pointer" }}
                        onClick={() => handleClick("sort", "low_price_content")}
                    >
                        <img
                            src={lowestprcdic}
                            className="icn"
                            alt="Lowest priced content"
                        />
                        <p className="sort_txt">Lowest priced content</p>
                    </div>
                    <div
                        className={`sort_item ${contentUnderOffer?.sort?.field == "high_price_content" ? "active" : ""}`}
                        style={{ cursor: "pointer" }}
                        onClick={() => handleClick("sort", "high_price_content")}
                    >
                        <img
                            src={highestprcdic}
                            className="icn"
                            alt="Highest priced content"
                        />
                        <p className="sort_txt">Highest priced content</p>
                    </div>
                    <div className={`sort_item ${contentUnderOffer?.sort?.field == "day" ? "active" : ""}`} style={{ cursor: "pointer" }} onClick={() => handleClick("sort", "day")}>
                        <img src={dailyic} className="icn" alt="Daily" />
                        <p className="sort_txt">View daily</p>
                    </div>
                    <div className={`sort_item ${contentUnderOffer?.sort?.field == "week" ? "active" : ""}`} style={{ cursor: "pointer" }} onClick={() => handleClick("sort", "week")}>
                        <img src={weeklyic} className="icn" alt="Weekly" />
                        <p className="sort_txt">View weekly</p>
                    </div>
                    <div className={`sort_item ${contentUnderOffer?.sort?.field == "month" ? "active" : ""}`} style={{ cursor: "pointer" }} onClick={() => handleClick("sort", "month")}>
                        <img src={monthlyic} className="icn" alt="Monthly" />
                        <p className="sort_txt">View monthly</p>
                    </div>
                    <div className={`sort_item ${contentUnderOffer?.sort?.field == "year" ? "active" : ""}`} style={{ cursor: "pointer" }} onClick={() => handleClick("sort", "year")}>
                        <img src={calendaric} className="icn" alt="yearly" />
                        <p className="sort_txt">View yearly</p>
                    </div>
                </div>
                <button className="fltr_btn mt-3" onClick={() => handleClick("submit", "")}>Apply</button>
            </div>
        </>
    );
};

export default UnderOfferSort;
