import {
  Button,
  Checkbox,
  FormControlLabel,
  MenuItem,
  Select,
} from "@mui/material";
import moment from "moment/moment";
import React, { memo, useEffect, useState } from "react";
import Col from "react-bootstrap/Col";
import Container from "react-bootstrap/Container";
import Form from "react-bootstrap/Form";
import Modal from "react-bootstrap/Modal";
import Row from "react-bootstrap/Row";
import PhoneInput from "react-phone-number-input";
import "react-phone-number-input/style.css";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import calendaric from "../assets/images/calendar.svg";
import departmentic from "../assets/images/chair.svg";
import followersic from "../assets/images/follower.svg";
import emailic from "../assets/images/mail.svg";
import officeic from "../assets/images/office.svg";
import user from "../assets/images/user.svg";
import { Get, Patch, Post } from "../services/user.services";
import Loader from "./Loader";
import { Slide } from 'react-toastify';
import editProfileIcn from "../assets/images/editProfileIc.svg";
import { useDarkMode } from "../context/DarkModeContext";
const Myprofilemdl = (props) => {
  const [loading, setLoading] = useState(false);
  const [profile, setProfile] = useState();
  const [edit, setEdit] = useState(false);
  const [designation, setDesignation] = useState([]);
  const toggle = () => setEdit(!edit);
  const { setProfileChange, profileData } = useDarkMode();
  const Profile = async () => {
    // setLoading(true);
    try {
      // setLoading(false);
      const resp = await Get(`mediaHouse/getProfile`);
      setProfile(resp.data.profile);
      // console.log(resp, `<<<<<<<<profile details to edit`)
    } catch (error) {
      // setLoading(false);
    }
  };

  const handleChange = (e) => {
    setProfile((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleImageChange = async (e) => {
    const file = e.target.files[0];
    const formData = new FormData();
    formData.append("path", "user");
    formData.append("media", file);

    setLoading(true);
    try {
      const response = await Post("mediaHouse/uploadUserMedia", formData);
      setProfile((prev) => ({
        ...prev,
        profile_image: response.data.path, // Update profile image URL with the uploaded image URL
      }));
      setLoading(false);
    } catch (error) {
      setLoading(false);
      console.error("Error uploading image:", error);
    }
  };

  const handleAdminImageChange = async (e) => {
    const file = e.target.files[0];
    const formData = new FormData();
    formData.append("path", "user");
    formData.append("media", file);

    setLoading(true);
    try {
      const response = await Post("mediaHouse/uploadUserMedia", formData);
      setProfile((prev) => ({
        ...prev,
        admin_detail: {
          ...prev.admin_detail,
          admin_profile: response.data.path
        },
      }));
      setLoading(false);
    } catch (error) {
      console.error("Error uploading image:", error);
      setLoading(false);
    }
  };

  // const filepath = await Post("mediaHouse/uploadUserMedia", Formdata);

  // I have this api for uploading media-

  console.log('profile------>', profile)

  const EditProfile = async () => {
    setLoading(true);

    let obj = {
      first_name: profile?.role !== "User_mediaHouse" ? profile?.first_name : profile?.user_first_name,
      last_name: profile?.role !== "User_mediaHouse" ? profile?.last_name : profile?.user_last_name,
      full_name: profile?.role !== "User_mediaHouse" ? `${profile?.first_name} ${profile?.last_name}` : `${profile?.user_first_name} ${profile?.user_last_name}`,
      phone: profile?.phone,
      email: profile?.email,
      designation_id: profile?.designation_id,
      country_code: profile?.country_code,
      profile_image: profile?.profile_image,
      admin_detail: profile?.admin_detail
    };

    if (profile?.role !== "User_mediaHouse") {
      obj.company_name = profile?.company_name
    }

    try {
      const resp = await Patch(`mediaHouse/editProfile`, obj);
      // console.log(resp, "<---------resp of edit profile");
      if (resp) {
        setProfileChange((prev) => !prev)
        props.update();
        setLoading(false);
        toast.success('Successfully updated. Thank you', {
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
      }
    } catch (error) {
      setLoading(false);
    }
  };

  const getDesignation = async () => {
    const list = await Get(`mediaHouse/getCategoryType?type=designation`);
    setDesignation(list.data.data);
  };

  useEffect(() => {
    Profile();
    getDesignation();
  }, []);

  return (
    <>
      {
        loading && <Loader />
      }
      <div className="admin_popup_dtl">
        <Modal
          show={props.show}
          aria-labelledby="contained-modal-title-hcenter"
          onHide={() => props.update()}
          className="modal_wrapper my_profile_modal"
          dialogClassName="my-modal">
          <Modal.Header className="profile_mdl_hdr_wrap" closeButton>
            <Modal.Title className="modal-title profile_modal_ttl">
              <p className="mb-0">{props.profileType === "My" ? "My profile" : "Edit Profile"}</p>
            </Modal.Title>
          </Modal.Header>
          <Modal.Body className="show-grid modal-body border-0 profile_mdl_body">
            <Container className="p-0">
              <div className="profile_img">
                <img src={profile?.profile_image} />
                {
                  props.profileType != "My" ?
                    <div className="EditProfileImgWrap">
                      <label htmlFor="profilePicInput" className="editProfilepic">
                        <img src={editProfileIcn} alt="Upload Profile Image" />
                        <input
                          type="file"
                          id="profilePicInput"
                          onChange={handleImageChange}
                          disabled={props.profileType == "My"}
                        />
                      </label>
                    </div>
                    : null
                }
              </div>
              <Row>
                <Col xs={12} md={6} sm={6} className="rw_inn_flex mb-0">
                  <label>Company name</label>
                  <Form.Group className="mb-4 form-group">
                    <img src={followersic} alt="" />
                    <Form.Control
                      type="text"
                      size="sm"
                      name="company_name"
                      disabled={props.profileType == "My" || profile?.role == "User_mediaHouse"}
                      value={profile?.company_name}
                      className="user"
                      placeholder="Reuters Media"
                      onChange={handleChange}
                    />
                  </Form.Group>
                  {/* </div> */}
                </Col>
                <Col xs={12} md={6} sm={6} className="rw_inn_flex mb-0">
                  <label>Onboarded on</label>
                  <Form.Group className="mb-4 form-group">
                    <img className="privacy inp_icn" src={calendaric} alt="" />
                    <Form.Control
                      type="text"
                      disabled
                      placeholder="dd/mm/yyyy"
                      value={moment(profile?.createdAt).format("DD/MM/YY")}
                    />
                  </Form.Group>
                </Col>
              </Row>
              {
                profile?.role != "User_mediaHouse" ? <div className="profile_img">
                  <img src={profile?.admin_detail?.admin_profile} />
                  {
                    props.profileType != "My" ?
                      <div className="EditProfileImgWrap">
                        <label htmlFor="profilePicInputs" className="editProfilepic">
                          <img src={editProfileIcn} alt="Upload Profile Image" />
                          <input
                            type="file"
                            id="profilePicInputs"
                            style={{ display: "none" }}
                            onChange={handleAdminImageChange}
                            disabled={props.profileType == "My"}
                          />
                        </label>
                      </div> : null
                  }
                </div> : null
              }
              <Row>
                <Col xs={12} md={6} sm={6} className="rw_inn_flex mb-0">
                  <label>First name</label>
                  <Form.Group className="mb-4 form-group">
                    <img src={user} alt="" />
                    <Form.Control
                      type="text"
                      size="sm"
                      disabled={props.profileType == "My"}
                      className="user"
                      name="first_name"
                      placeholder="First Name"
                      value={profile?.role !== "User_mediaHouse" ? profile?.first_name : profile?.user_first_name}
                      onChange={handleChange}
                      onKeyPress={(event) => {
                        if (!/[A-Za-z]/.test(event.key)) {
                          event.preventDefault();
                        }
                      }}
                    />
                  </Form.Group>
                </Col>
                <Col xs={12} md={6} sm={6} className="rw_inn_flex mb-0">
                  <label>Last name</label>
                  <Form.Group className="mb-4 form-group">
                    <img className="privacy icn" src={user} alt="" />
                    <Form.Control
                      type="text"
                      className=""
                      disabled={props.profileType == "My"}
                      name="last_name"
                      placeholder="Last Name"
                      value={profile?.role !== "User_mediaHouse" ? profile?.last_name : profile?.user_last_name}
                      onChange={handleChange}
                      onKeyPress={(event) => {
                        if (!/[A-Za-z]/.test(event.key)) {
                          event.preventDefault();
                        }
                      }}
                    />
                  </Form.Group>
                </Col>
              </Row>
              <Row>
                <Col xs={12} md={6} sm={6} className="rw_inn_flex mb-0">
                  <label>Office name</label>
                  <Form.Group className="mb-4 form-group">
                    <img src={officeic} alt="" />
                    <Form.Control
                      type="text"
                      size="sm"
                      disabled={props.profileType == "My"}
                      value={profile?.select_office_name || profile?.office_details?.[0]?.name}
                      className="user"
                    />
                  </Form.Group>
                </Col>
                {props.profileType == "My" ? (
                  <Col xs={12} md={6} sm={6} className="rw_inn_flex mb-0">
                    <label>Department</label>
                    <Form.Group className="mb-4 form-group">
                      <img
                        className="privacy inp_icn"
                        src={departmentic}
                        alt=""
                      />
                      <Form.Control
                        type="text"
                        className=""
                        value={profile?.designation_id?.name}
                        disabled={props.profileType == "My"}
                      />
                    </Form.Group>
                  </Col>
                ) : (
                  <Col xs={12} md={6} sm={6} className="rw_inn_flex mb-0">
                    <label>Department</label>
                    <Form.Group className="mb-4 d-flex position-relative form-group">
                      <img
                        className="privacy inp_icn"
                        src={departmentic}
                        alt=""
                      />
                      <Select
                        className="w-100 "
                        value={
                          profile?.designation_id?._id
                            ? profile?.designation_id?._id
                            : profile?.designation_id
                        }
                        name="designation_id"
                        onChange={handleChange}
                      >
                        <MenuItem
                          value="option1"
                          // disabled
                          className="selectPlaceholder"
                        >
                          Select Designation
                        </MenuItem>
                        {designation &&
                          designation.map((item) => {
                            return (
                              <MenuItem value={item._id}>{item.name}</MenuItem>
                            );
                          })}
                      </Select>
                    </Form.Group>
                  </Col>
                )}
              </Row>
              <Row>
                <Col xs={12} md={6} sm={6} className="rw_inn_flex">
                  <label>Mobile number</label>
                  {/* <Form.Group className="mb-4 form-group">
                  <img src={officeic} alt="" />
                  <Form.Control
                    type="number"
                    size="sm"
                    disabled={!edit}
                    name="phone"
                    value={profile?.phone}
                    pattern="^\d{10}$" 
                    onChange={handleChange}
                  />
                </Form.Group> */}
                  <div className="mb-4 number_inp_wrap dsblBgClr">
                    {/* Phone start */}
                    <input
                      className="input_nmbr"
                      type="number"
                      size="sm"
                      disabled={props.profileType == "My"}
                      name="phone"
                      value={profile?.phone}
                      pattern="^\d{10}$"
                      onChange={handleChange}
                    />
                    <PhoneInput
                      className="f_1 cntry_code"
                      international
                      required
                      countryCallingCodeEditable={true}
                      name="country_code"
                      value={profile?.role == "User_mediaHouse" ? profile?.country_code : profile?.admin_detail?.country_code}
                      onChange={(value) => setProfile((prevProfile) => ({
                        ...prevProfile,
                        country_code: value
                      }))}
                      disabled={props.profileType == "My"}
                    />
                  </div>
                </Col>
                <Col xs={12} md={6} sm={6} className="rw_inn_flex">
                  <label>Email address</label>
                  <Form.Group className="mb-4 form-group">
                    <img className="privacy icn" src={emailic} alt="" />
                    <Form.Control
                      type="text"
                      disabled={!edit}
                      name="email"
                      value={profile?.email}
                      onChange={handleChange}
                    />
                  </Form.Group>
                </Col>
              </Row>
              {/* <div className="administrator_checkbox">
                <Row>
                  <Col md={4} sm={6} xs={12} className="mb-3">
                    <FormControlLabel
                      className="check_label"
                      control={<Checkbox />}
                      checked={profile?.admin_rignts?.allowed_complete_access}
                      label="Allowed complete access"
                    />
                  </Col>
                  <Col md={4} sm={6} xs={12} className="mb-3">
                    <FormControlLabel
                      className="check_label"
                      control={<Checkbox />}
                      checked={profile?.admin_rignts?.allowed_to_broadcast_tasks}
                      label="Allowed to broadcast tasks"
                    />
                  </Col>
                  <Col md={4} sm={6} xs={12} className="mb-3">
                    <FormControlLabel
                      className="check_label"
                      control={<Checkbox />}
                      checked={profile?.admin_rignts?.allowed_to_onboard_users}
                      label="Allowed to chat externally"
                    />
                  </Col>
                  <Col md={4} sm={6} xs={12} className="mb-3 pe-0">
                    <FormControlLabel
                      className="check_label"
                      control={<Checkbox />}
                      checked={
                        profile?.admin_rignts?.allowed_to_set_financial_limit
                      }
                      label="Allowed to purchase content"
                    />
                  </Col>
                  <Col md={8} sm={8} xs={12} className="res_no_ps ps-5 mb-3">
                    <div className="price_range">
                      <p className="mb-0">Price range</p>
                      <input
                        type="text"
                        value={profile?.admin_rignts?.price_range?.minimum_price}
                        disabled = {props.profileType == "My"}
                      />
                      <span>to</span>
                      <input
                        type="text"
                        value={profile?.admin_rignts?.price_range?.maximum_price}
                        disabled = {props.profileType == "My"}
                      />
                    </div>
                  </Col>
                </Row>
              </div> */}
            </Container>
          </Modal.Body>
          {props.profileType === "My" ? null : <Modal.Footer className="profile_mdl_ftr border-0 mb-4">
            <Button
              className="mdl_ftr_btn w-50 m-auto d-inline-block py-2 text-lowercase"
              variant="primary"
              onClick={() => { toggle(); EditProfile(); }}
            >
              <Link className="mdl_btn mdl_link white">
                {"Save Profile"}
              </Link>
            </Button>
          </Modal.Footer>}

        </Modal>
      </div>
    </>
  );
};

export default memo(Myprofilemdl);
