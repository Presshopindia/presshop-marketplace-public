import React, { useEffect, useState } from "react";
import HeaderN from "../component/HeaderN";
import DbFooter from "../component/DbFooter";
import { Container, Row, Col, Modal } from "react-bootstrap";
import accessCenter from "../assets/images/accessCenter.png";
import addPic from "../assets/images/add-square.svg";
import attachmentic from "../assets/images/attachmentic.svg";
import docicon from "../assets/images/docicon.png";
import pdficon from "../assets/images/pdficon.png";
import { Slide } from 'react-toastify';
// import 'react-phone-number-input/style.css';
import docupld from "../assets/images/img-upld.svg";
import {
  Checkbox,
  FormControlLabel,
  Button,
  Select,
  MenuItem,
} from "@mui/material";

import { Link, useNavigate } from "react-router-dom";
import { Get, Patch, Post } from "../services/user.services";
import uplddocimg from "../assets/images/login-images/upload_docs.png";
import closeic from "../assets/images/close.svg";
import Header from "../component/Header";
import { BsCircleFill, BsFillCheckCircleFill } from "react-icons/bs";
import { toast } from "react-toastify";
import Loader from "../component/Loader";

const Uploaddocs = () => {
  const token = localStorage.getItem("token");
  const [show, setShow] = useState(false);
  const [type, setType] = useState(false);
  const navigate = useNavigate();
  const [docs, setDocs] = useState([]);
  const [isChecked, setIsChecked] = useState(true);
  const [docList, setDocList] = useState([]);
  const [loading, setLoading] = useState(false);
  const [upload_docs, setUpload_docs] = useState({
    delete_doc_when_onboading_completed: isChecked,
    govt_id: "",
    photography_licence: "",
    comp_incorporation_cert: "",
  });

  // console.log("docs------->", docs)

  const handleShow = () => {
    setShow(!show);
  };

  const handleClose = () => {
    setShow(false);
  };

  const AddDocuments = async (file, extraData) => {
    setLoading(true);
    // console.log("extraData1312312312", extraData, file)
    const Formdata = new FormData();
    Formdata.append("image", file);
    const filepath = await Post("mediaHouse/uploadMedia", Formdata);
    setLoading(false);
    if (filepath) {
      setUpload_docs((prev) => ({
        ...prev,
        [type]:
          "https://uat-presshope.s3.eu-west-2.amazonaws.com/public/docToBecomePro/" +
          filepath.data.image,
      }));
      setDocs((prev) => [
        ...docs,
        {
          url:
            "https://uat-presshope.s3.eu-west-2.amazonaws.com/public/docToBecomePro/" +
            filepath.data.image,
          type: file.type,
          name: extraData,
        },
      ]);
    }
    setLoading(false);
  };

  // console.log("docs131231231", docs)

  const UploadDocs = async () => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      // toast.success("Uploaded", { hideProgressBar: true });
      toast.success('All done. Thanks', {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
        transition: Slide,
        });
    }, 1000);
    // const resp = await Patch(`mediaHouse/uploadDocToBecomePro`, upload_docs);
    // if (resp) {
    //
    //   setLoading(false);
    // }
  };

  const NextPage = () => {
    localStorage.setItem("Page2", JSON.stringify(upload_docs));
    localStorage.setItem("docs", JSON.stringify(docs));
    if (localStorage.getItem("Page2")) {
      navigate("/add-payment-details");
    }
  };

  const getDocuments = async () => {
    try {
      const res = await Get(`mediaHouse/getalltypeOfdocList`);
      if (res) {
        setDocList(res?.data?.data);
      }
    } catch (error) {
      // console.log(error);
    }
  };
  useEffect(() => {
    getDocuments();
  }, []);

  // console.log("docList31312312312", docList)

  const handleToggleSelect = (itemId) => {
    // console.log(itemId, `<<<<<<what is this`)
    const updatedData = docList.map((item) => {
      if (item._id === itemId) {
        return { ...item, selected: !item.selected }; // Toggle the "selected" key
      }
      return item;
    });
    setDocList(updatedData);
  };

  const deleteDocHandler = (url) => {
    setDocs((prev) => {
      const filterredData = prev.filter((el) => el.url != url);
      return filterredData;
    });
  };

  return (
    <>
      {token ? <Header /> : <HeaderN />}
      {loading && <Loader />}
      <div className="page-wrap login-page upld_docs_page p-0">
        <Container fluid className="pdng">
          <div className="log-wrap">
            <Row className="row-w-m m-0">
              <Col lg={6} md={6} sm={12} xs={12} className="lft_colm p-0">
                <img src={uplddocimg} alt="" className="resp_bg" />
                <div className="left-side login_stepsWrap left-pdng bg-white">
                  <div className="onboardMain">
                    <div className="onboardIntro sign_section">
                      <h1 className="mb-0">Upload docs</h1>
                      <div className="onboardStep b_border">
                        <p className="mb-0">
                          Please upload the following documents for our review &
                          records. Once the on-boarding is completed, we can
                          delete the docs from our system should you wish
                        </p>
                        <div className="d-flex align-items-start mt-20">
                          <FormControlLabel
                            className="check_label me-0"
                            control={<Checkbox />}
                            checked={isChecked}
                            onChange={(e) => {
                              setIsChecked(e.target.checked);
                            }}
                          />
                          <p className="mb-0">
                            Please delete the docs from your system once the
                            onboarding is completed
                          </p>
                        </div>
                      </div>
                    </div>
                    <div className="onboardStep upload_docs">
                      <Row>
                        <Col md={9}>
                          <ul className="docs_list">
                            {docList &&
                              docList.map((curr) => {
                                return (
                                  <li>
                                    {curr?.selected !== true ? (
                                      <span className="doc_items_ic">
                                        <BsCircleFill />
                                      </span>
                                    ) : (
                                      <span className="doc_items_ic doc_uplded">
                                        <BsFillCheckCircleFill />
                                      </span>
                                    )}
                                    {curr?.document_name}
                                  </li>
                                );
                              })}
                          </ul>
                        </Col>
                        <Col md={12} className="docs_ins_wrp mt-3">
                          <Row className="align-items-end">
                            <Col md={6}>
                              <label className="upld_doc_lbl">
                                Select document
                              </label>
                              <Select
                                className="w-100 slct_sign doc_slct_wrp"
                                placeholder="Select Documents"
                                onChange={(e) => setType(e.target.value)}
                              >
                                {docList &&
                                  docList.map((curr) => (
                                    <MenuItem value={curr._id} key={curr._id}>
                                      <input
                                        type="file"
                                        id={`sngl_doc_up_${curr._id}`}
                                        className="sngl_doc_inp"
                                        name={curr.document_name}
                                        onChange={(e) => {
                                          AddDocuments(
                                            e.target.files[0],
                                            curr.document_name
                                          );
                                        }}
                                      />
                                      <label
                                        htmlFor={`sngl_doc_up_${curr._id}`}
                                        onClick={() =>
                                          handleToggleSelect(curr._id)
                                        }
                                      >
                                        {curr.document_name}
                                      </label>
                                    </MenuItem>
                                  ))}
                              </Select>
                            </Col>

                            <Col md={12} className="mt-5">
                              <div className="justify-content-between align-items-center d-flex flex-wrap gap-3">
                                {docs?.map((el) => (
                                  <div className="vw_doc position-relative">
                                    <div className="cls_icn">
                                      <img
                                        src={closeic}
                                        className="close_ic"
                                        alt="close"
                                        onClick={() => deleteDocHandler(el.url)}
                                        style={{ cursor: "pointer" }}
                                      />
                                    </div>
                                    {el.type.includes("image") ? (
                                      <img
                                        src={el.url}
                                        className="doc_uploaded"
                                        alt="document"
                                      />
                                    ) : (
                                      <img
                                        src={pdficon}
                                        className="doc_uploaded docIcon"
                                        alt="document"
                                      />
                                    )}
                                  </div>
                                ))}
                              </div>
                            </Col>
                          </Row>
                        </Col>
                      </Row>
                    </div>
                    <Button
                      type="submit"
                      onClick={NextPage}
                      className="w-100"
                      variant="primary"
                    >
                      Next
                    </Button>
                    <h6 className="text-center mt-3">2 of 4</h6>
                  </div>
                </div>
              </Col>
              <Col lg={6} md={6} sm={12} xs={12} className="rt_col p-0">
                <div className="right-side text-center position-relative">
                  <div className="tri"></div>
                  <div className="circle"></div>
                  <div className="big_circle"></div>
                  <span className="shape yl_sqr pos-abs"></span>
                  <img src={uplddocimg} className="rt_img rt_bg_img" />
                  <h2 className="mt-3 text-center">
                    Source authentic <span className="txt_bld">news</span> from
                    thousands of users
                  </h2>
                </div>
              </Col>
            </Row>
          </div>
        </Container>
      </div>
      <DbFooter />
    </>
  );
};

export default Uploaddocs;