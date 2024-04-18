import React, { useEffect, useRef, useState } from "react";
import HeaderN from "../component/HeaderN";
import DbFooter from "../component/DbFooter";
import { Container, Row, Col } from "react-bootstrap";
import Form from "react-bootstrap/Form";
import follower from "../assets/images/follower.svg";
import hash from "../assets/images/hash.svg";
import Receipt from "../assets/images/Receipt.svg";
import accessCenter from "../assets/images/accessCenter.png";
import office from "../assets/images/office.svg";
import chair from "../assets/images/chair.svg";
import location from "../assets/images/location.svg";
import call from "../assets/images/call.svg";
import website from "../assets/images/sortIcons/political.svg";
import addPic from "../assets/images/add-square.svg";
import user from "../assets/images/user.svg";
import mail from "../assets/images/mail.svg";
import "react-phone-number-input/style.css";
import Autocomplete from "react-google-autocomplete";
import {
  Checkbox,
  FormControlLabel,
  Button,
  MenuItem,
  Select,
  FormControl,
  InputLabel,
} from "@mui/material";
import { Link } from "react-router-dom";
import { Get, Patch, Post } from "../services/user.services";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import Header from "../component/Header";
import manageusers from "../assets/images/login-images/manage-users.svg";
import lockic from "../assets/images/sortIcons/lock.svg";
import { BsArrowLeft, BsEye, BsEyeSlash } from "react-icons/bs";
import callic from "../assets/images/call.svg";
import { useDarkMode } from "../context/DarkModeContext";
import PhoneInput from "react-phone-number-input";
import Loader from "../component/Loader";

const ManageUsers = () => {
  const { profileData } = useDarkMode();
  const user = profileData;
  const [url, setUrl] = useState();
  const [cnfm_password, setCnfmPassword] = useState("");
  const [officedetails, setOfficeDetails] = useState();
  const [visibility1, setVisibility1] = useState(false);
  const [visibility2, setVisibility2] = useState(false);
  const [submit, setSubmit] = useState(false);
  const [show, setShow] = useState(false);
  const [addedUsers, setAddedUsers] = useState([]);
  const [departmentTypes, setDepartmentTypes] = useState([]);
  const [designation, setDesignation] = useState([]);
  const [officeNames, setOfficeNames] = useState([]);
  const [removal_reason, setRemovalReason] = useState([]);
  const [loading, setLoading] = useState(false);
  const [removeUser, setRemoveUser] = useState({
    user_id: "option1",
    reason_for_removal: "option1",
    confirm_removal: false,
  });
  const [userIds, setUserId] = useState(null);

  const [userDetails, setUserDetails] = useState({
    admin_password: "",
    full_name: "",
    type: "",
    address: "",
    pincode: "",
    country_code: "",
    city: "",
    country: "",
    phone_no: "",
    website: "",
    first_name: "",
    last_name: "",
    designation: "",
    select_office_name: "",
    profile_image: null,
    select_user_office_department: "",
    email: "",
    phone_no: "",
    allow_to_complete: false,
    allow_to_broadcat: false,
    allow_to_chat_externally: false,
    allow_to_purchased_content: false,
    min_price: "",
    max_price: "",
    onboard_other_user: false,
    user_id: "",
    office_id: "",
  });

  const getDesignation = async () => {
    const list = await Get(`mediaHouse/getCategoryType?type=designation`);
    setDesignation(list.data.data);
  };

  const getDepartmentType = async () => {
    const list = await Get("mediaHouse/getDepartmentType");
    setDepartmentTypes(list.data.data);
  };

  const ConfirmPassword = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      if (userDetails.admin_password !== cnfm_password) {
        // toast.error("Password doesn't match")
      } else {
        const confirm = await Post("mediaHouse/confirm/password", {
          password: userDetails.admin_password,
        });
        if (confirm) {
          setShow(true);
          setLoading(false);
        }
      }
    } catch (error) {
      setLoading(false);
      toast.success("Password doesn't match");
      // console.log(error, "<000000000")
    }
  };

  const Profile = async (index) => {
    setLoading(true)

    try {
      const resp = await Get(`mediaHouse/getProfile`);
      if (resp) {
        setUserDetails((prev) => ({
          ...prev,
          user_id: resp.data.profile._id,
        }));
        const list = await Get(
          `mediaHouse/getOfficeDetail?company_vat=${resp.data.profile.company_vat}`
        );
        if (list) {
          setOfficeNames(list.data.data);
          setOfficeDetails(list.data.data[index]);
          setUserDetails((prev) => ({
            ...prev,
            full_name: list.data.data[index].name,
            type: list.data.data[index].office_type_id?._id,
            address: list.data.data[index].address.complete_address,
            pincode: list.data.data[index].address.pincode,
            country_code: list.data.data[index].country_code,
            city: list.data.data[index].address.city,
            country: list.data.data[index].address.country,
            phone_no: list.data.data[index].phone,
            website: list.data.data[index].website,
            select_office_name: list.data.data[index].name,
            office_id: list.data.data[index]._id,
          }));
          setLoading(false)
        }
      }
    } catch (error) {
      setLoading(false)
    }
  };

  const handleChange = (e) => {
    if(e.target.name == "phone"){
      console.log('e.target.value', e.target.value, e.target.value.length)
      if(e.target.value.length <=15){
        setUserDetails((prev) => ({
          ...prev,
          [e.target.name]: e.target.value,
        }));
      }
      setUserDetails((prev) => ({
        ...prev,
        [e.target.name]: e.target.value,
      }));
    }
    else{
      setUserDetails((prev) => ({
        ...prev,
        [e.target.name]: e.target.value,
      }));
    }
  };

  const handleCheck = (e) => {
    setUserDetails((prev) => ({
      ...prev,
      [e.target.name]: e.target.checked,
    }));
  };

  const AddUser = async (e) => {
    e.preventDefault();
    const formdata = new FormData();
    for (const key in userDetails) {
      formdata.append(key, userDetails[key]);
    }

    setLoading(true);

    try {
      if (userDetails.admin_password !== cnfm_password) {
        // toast.error("Password doesn't match")
      } else {
        const resp = await Post("mediaHouse/ManageUser", formdata);
        if (resp) {
          setUserDetails({
            admin_password: "",
            full_name: "",
            type: "",
            address: "",
            pincode: "",
            country_code: "",
            city: "",
            country: "",
            phone: "",
            website: "",
            first_name: "",
            last_name: "",
            designation: "",
            select_office_name: "",
            profile_image: null,
            select_user_office_department: "",
            email: "",
            phone_no: "",
            allow_to_complete: false,
            allow_to_broadcat: false,
            allow_to_chat_externally: false,
            allow_to_purchased_content: false,
            min_price: "",
            max_price: "",
            onboard_other_user: false,
            user_id: "",
            office_id: "",
          });
          setUrl()
          setCnfmPassword("");
          toast.success('User added successfully')
          setLoading(false);
        }
      }
    } catch (error) {
        setLoading(false);
      // console.log(error, "<------error")
    }
  };

  const SelectUser = async (id) => {
    try {
      const resp = await Get(`mediaHouse/getdesignatedUSer?role=${id}`);
      if (resp) {
        setAddedUsers(resp.data.response);
      }
    } catch (error) {
      // console.log(error, "<---------error")
    }
  };

  const handleRemoveUser = (e) => {
    setRemoveUser((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const RemovalReason = async () => {
    const resp = await Get(`mediaHouse/find`);
    setRemovalReason(resp.data.payment);
  };

  const RemoveUser = async (e) => {
    e.preventDefault();
    setSubmit(true);

    const obj = {
      user_id: removeUser.user_id,
      reason_for_removal: removeUser.reason_for_removal,
    };

    setLoading(true);

    try {
      if (
        removeUser.reason_for_removal &&
        removeUser.user_id === "option1" &&
        removeUser.reason_for_removal === "option1"
      ) {
      } else {
        const resp = await Patch(`mediaHouse/deleteadduser`, obj);
        setLoading(false);
        setRemoveUser({
            user_id: "",
            reason_for_removal: "",
            confirm_removal: false,
          })
          toast.success("User deleted successfully")
          SelectUser(userIds);
      }
    } catch (error) {
      // console.log(error, "<---------error")
      setLoading(false);
    }
  };

  useEffect(() => {
    getDepartmentType();
    getDesignation();
    Profile(0);
    RemovalReason();
  }, []);

  const phoneInputRef = useRef(null);
  useEffect(() => {
    if (userDetails?.country_code) {
      phoneInputRef?.current?.focus();
    }
  }, [userDetails?.country_code]);


  return (
    <>
      {loading && <Loader />}
      <Header />
      <div className="page-wrap login-page manage_usr_wrp sign p-0">
        <Container fluid className="pdng">
          <div className="log-wrap">
            <Row className="row-w-m m-0 position-relative">
              <Col lg="6" className="bg-white p-0">
                <div className="login_stepsWrap left-pdng mng_usr_pdng">
                  <div className="onboardMain">
                    <div className="onboardStep">
                      <Form onSubmit={ConfirmPassword}>
                        <div className="onboardIntro">
                          <h1 className="mb-0">Manage users</h1>
                          <div className="onboardStep b_border">
                            <p className="mb-0 tp_txt">
                              Hi {user?.first_name + " " + user?.last_name},
                              please enter your adminstrator password to add new
                              users, or remove existing users
                            </p>
                            <div className="ps_inp_wrp">
                              <Row>
                                <Col md={6} className="">
                                  <Form.Group className="form-group position-relative">
                                    <img src={lockic} alt="company" />
                                    <Form.Control
                                      type={!visibility1 ? "password" : "text"}
                                      disabled={show}
                                      value={userDetails.admin_password}
                                      pattern=".{8,}"
                                      title="Password should not be less than 8 letters"
                                      className="rnd"
                                      name="admin_password"
                                      required
                                      onChange={handleChange}
                                      placeholder="Enter password *"
                                    />
                                    {!visibility1 && (
                                      <div
                                        color="#000"
                                        className="pass_ic_wrap"
                                        onClick={() => {
                                          setVisibility1(true);
                                        }}
                                      >
                                        <BsEyeSlash />
                                      </div>
                                    )}
                                    {visibility1 && (
                                      <div
                                        color="#000"
                                        className="pass_ic_wrap"
                                        onClick={() => {
                                          setVisibility1(false);
                                        }}
                                      >
                                        <BsEye />
                                      </div>
                                    )}
                                  </Form.Group>
                                </Col>
                                <Col md={6}>
                                  <Form.Group className="form-group position-relative">
                                    <img src={lockic} alt="company" />
                                    <Form.Control
                                      type={!visibility2 ? "password" : "text"}
                                      disabled={show}
                                      value={cnfm_password}
                                      className="rnd"
                                      name="password"
                                      required
                                      onChange={(e) =>
                                        setCnfmPassword(e.target.value)
                                      }
                                      placeholder="Confirm password *"
                                    />
                                    {!visibility2 && (
                                      <div
                                        color="#000"
                                        className="pass_ic_wrap"
                                        onClick={() => {
                                          setVisibility2(true);
                                        }}
                                      >
                                        <BsEyeSlash />
                                      </div>
                                    )}
                                    {visibility2 && (
                                      <div
                                        color="#000"
                                        className="pass_ic_wrap"
                                        onClick={() => {
                                          setVisibility2(false);
                                        }}
                                      >
                                        <BsEye />
                                      </div>
                                    )}
                                  </Form.Group>
                                </Col>
                                <div className="stepFooter">
                                  <Button
                                    disabled={show}
                                    className="w-100 mt_25"
                                    type="submit"
                                    variant="primary"
                                  >
                                    Confirm
                                  </Button>
                                </div>
                              </Row>
                            </div>
                          </div>
                        </div>
                      </Form>
                      {/* <form> */}
                      {show && (
                        <Form onSubmit={AddUser}>
                          <div className="officeDetails sign_section">
                            <p className="onbrdheading sign_hdng">
                              Office details
                            </p>
                            <Row>
                              <Col md={6}>
                                <Form.Group className="mb-4 form-group">
                                  <img src={office} alt="" />
                                  <Form.Control
                                    type="text"
                                    className=""
                                    disabled
                                    value={officedetails?.name}
                                    name="name"
                                  />
                                </Form.Group>
                              </Col>
                              <Col md={6}>
                                <Form.Group className="mb-4 form-group">
                                  <img src={chair} alt="" />
                                  <Form.Control
                                    type="text"
                                    className=""
                                    disabled
                                    value={officedetails?.office_type_id?.name}
                                    name="office_name"
                                  />
                                  {/* <Select className="w-100 slct_sign" name='office_name' defaultValue={"option1"}>
                                                                    <MenuItem className="selectPlaceholder" value='option1'>Editorial</MenuItem>
                                                                    <MenuItem></MenuItem>
                                                                </Select> */}
                                </Form.Group>
                              </Col>
                              <Col md={12}>
                                <Form.Group className="mb-4 form-group">
                                  <img src={location} alt="" />
                                  <Autocomplete
                                    className="addr_custom_inp w-100"
                                    disabled
                                    value={
                                      officedetails?.address?.complete_address
                                    }
                                  />
                                </Form.Group>
                              </Col>
                              <Col md={3} className="">
                                <Form.Group className="mb-4 form-group">
                                  <img src={location} alt="" />
                                  <Form.Control
                                    type="number"
                                    className=""
                                    disabled
                                    value={officedetails?.address?.pincode}
                                    name="pincode"
                                  />
                                </Form.Group>
                              </Col>
                              <Col md={4}>
                                <Form.Group className="mb-4 form-group">
                                  <img src={location} alt="" />
                                  <Form.Control
                                    type="text"
                                    className=""
                                    value={officedetails?.address?.city}
                                    name="city"
                                    disabled
                                  />
                                </Form.Group>
                              </Col>
                              <Col md={5}>
                                <Form.Group className="mb-4 form-group">
                                  <img src={location} alt="" />
                                  <Form.Control
                                    type="text"
                                    className=""
                                    value={officedetails?.address?.country}
                                    name="United Kingdom"
                                    disabled
                                  />
                                </Form.Group>
                              </Col>
                              {/* <Col md={6}>
                                                            <div className="number_inp_wrap disabled">
                                                                <input className="input_nmbr" value={officedetails?.phone} name='phone' />
                                                                <div className="call_ic">
                                                                    <img src={callic} alt="" />
                                                                </div>
                                                            </div>
                                                        </Col> */}
                              <Col md={6}>
                                <div className="number_inp_wrap disabled">
                                  <input
                                    type="number"
                                    className="input_nmbr"
                                    placeholder="Phone"
                                    name="phone"
                                    value={officedetails?.phone}
                                    maxLength={15}
                                  />
                                  <PhoneInput
                                    className="f_1 cntry_code"
                                    international
                                    countryCallingCodeEditable={false}
                                    name="country_code"
                                    value={officedetails?.country_code}
                                  />
                                </div>
                              </Col>
                              <Col md={6}>
                                <Form.Group className="mb-4 form-group">
                                  <img src={website} alt="" />
                                  <Form.Control
                                    type="url"
                                    disabled
                                    className=""
                                    placeholder="Website"
                                    name="website"
                                    required
                                    value={officedetails?.website}
                                  />
                                </Form.Group>
                              </Col>
                              {/* <FormControlLabel className='anthr_office_check'
                                                            control={<Checkbox />} label="Onboard another office" /> */}
                              <Col md={6}>
                                <Form.Group className="mb-4 form-group">
                                  <img src={chair} alt="" />
                                  <Select
                                    className="w-100 slct_sign"
                                    name="office_name"
                                    defaultValue={"option1"}
                                  >
                                    <MenuItem
                                      className="selectPlaceholder"
                                      value="option1"
                                      disabled
                                    >
                                      Select another office
                                    </MenuItem>
                                    {officeNames &&
                                      officeNames.map((value, index) => {
                                        return (
                                          <MenuItem
                                            onClick={() => {
                                              Profile(index);
                                            }}
                                            value={value._id}
                                          >
                                            {value.name}
                                          </MenuItem>
                                        );
                                      })}
                                  </Select>
                                </Form.Group>
                              </Col>
                            </Row>
                          </div>
                          {/* </form> */}
                          <div className="adminDetails sign_section">
                            <p className="onbrdheading sign_hdng">
                              Add new user details
                            </p>
                            <Row>
                              <Col md={9}>
                                <Row>
                                  <Col md={6}>
                                    <Form.Group className="mb-4 form-group">
                                      <img src={user} alt="" />
                                      <Form.Control
                                        type="text"
                                        className=""
                                        value={userDetails.first_name}
                                        name="first_name"
                                        onChange={handleChange}
                                        placeholder="Enter first name"
                                      />
                                    </Form.Group>
                                  </Col>
                                  <Col md={6}>
                                    <Form.Group className="mb-4 form-group">
                                      <img src={user} alt="" />
                                      <Form.Control
                                        type="text"
                                        className=""
                                        value={userDetails.last_name}
                                        name="last_name"
                                        onChange={handleChange}
                                        placeholder="Enter last name"
                                      />
                                    </Form.Group>
                                  </Col>

                                  <Col md={6}>
                                    <Form.Group className="mb-4 form-group">
                                      <img src={chair} alt="" />
                                      <Select
                                        className="w-100 slct_sign"
                                        value={
                                          userDetails.designation
                                            ? userDetails.designation
                                            : "option1"
                                        }
                                        name="designation"
                                        onChange={handleChange}
                                      >
                                        <MenuItem
                                          className="selectPlaceholder"
                                          disabled
                                          value="option1"
                                        >
                                          Select designation
                                        </MenuItem>
                                        {designation &&
                                          designation.map((item) => {
                                            return (
                                              <MenuItem value={item._id}>
                                                {item.name}
                                              </MenuItem>
                                            );
                                          })}
                                      </Select>
                                    </Form.Group>
                                  </Col>

                                  <Col md={6}>
                                    <Form.Group className="mb-4 form-group">
                                      <img src={user} alt="" />
                                      <Form.Control
                                        type="text"
                                        className=""
                                        disabled
                                        value={officedetails?.name}
                                        name="name"
                                      />
                                    </Form.Group>
                                  </Col>
                                </Row>
                              </Col>
                              <Col md={3}>
                                <div className="currentPic adm_profile position-relative text-center">
                                  {url ? (
                                    <img
                                      className="uploaded"
                                      src={url}
                                      alt=""
                                    />
                                  ) : (
                                    <>
                                      <img src={addPic} alt="" />
                                      <span className="mt-2 d-block">
                                        Add current photo
                                      </span>
                                    </>
                                  )}
                                  <input
                                    type="file"
                                    required
                                    onChange={(e) => {
                                      setUrl(
                                        URL.createObjectURL(e.target.files[0])
                                      );
                                      setUserDetails((prev) => ({
                                        ...prev,
                                        profile_image: e.target.files[0],
                                      }));
                                    }}
                                  />
                                </div>
                              </Col>
                              <Col md={6}>
                                <Form.Group className="mb-4 form-group">
                                  <img src={chair} alt="" />
                                  <Select
                                    className="w-100 slct_sign"
                                    name="select_user_office_department"
                                    value={
                                      userDetails.select_user_office_department
                                        ? userDetails.select_user_office_department
                                        : "option1"
                                    }
                                    onChange={handleChange}
                                  >
                                    <MenuItem
                                      disabled
                                      className="selectPlaceholder"
                                      value="option1"
                                    >
                                      Select department
                                    </MenuItem>
                                    {departmentTypes &&
                                      departmentTypes.map((value, index) => {
                                        return (
                                          <MenuItem value={value._id}>
                                            {value.name}
                                          </MenuItem>
                                        );
                                      })}
                                  </Select>
                                </Form.Group>
                              </Col>
                              <Col md={6} className="admn_eml_wrp">
                                <Form.Group className="form-group position-relative w-100">
                                  <img
                                    src={mail}
                                    className="eml_inp_icn"
                                    alt=""
                                  />
                                  <Form.Control
                                    type="email"
                                    required
                                    className=""
                                    placeholder="Official email id *"
                                    onChange={handleChange}
                                    name="email"
                                  />
                                </Form.Group>
                              </Col>
                              <Col md={6} className="admn_numb_wrap">
                                <div className="number_inp_wrap w-100">
                                  <input
                                    type="number"
                                    required
                                    className="input_nmbr"
                                    placeholder=" phone"
                                    // onChange={handleChange}
                                    onChange={(e) => {
                                      if(e.target.value.length <= 12) {
                                        handleChange(e)
                                      }  
                                    }}
                                    maxLength={12}
                                    name="phone"
                                    value={userDetails?.phone}
                                    ref={phoneInputRef}
                                  />
                                  <PhoneInput
                                    className="f_1 cntry_code"
                                    international
                                    countryCallingCodeEditable={true}
                                    required
                                    name="country_code"
                                    // readOnly
                                    onChange={(e) => {
                                      setUserDetails((prev) => ({
                                        ...prev,
                                        country_code: e,
                                      }));
                                    }}
                                  />
                                </div>
                              </Col>
                            </Row>
                          </div>
                          <div className="adminDetails sign_section mng_usr_rt">
                            <p className="onbrdheading sign_hdng">
                              Add new user rights
                            </p>
                            <Row>
                              <Col md={4} className="mb-3">
                                <FormControlLabel
                                  className="check_label"
                                  checked={userDetails.allow_to_complete}
                                  onChange={handleCheck}
                                  control={<Checkbox />}
                                  name="allow_to_complete"
                                  label="Allowed complete access"
                                />
                              </Col>
                              <Col md={4} className="mb-3">
                                <FormControlLabel
                                  className="check_label"
                                  checked={userDetails.allow_to_broadcat}
                                  onChange={handleCheck}
                                  control={<Checkbox />}
                                  name="allow_to_broadcat"
                                  label="Allowed to broadcast tasks"
                                />
                              </Col>
                              <Col md={4} className="mb-3">
                                <FormControlLabel
                                  className="check_label"
                                  checked={userDetails.allow_to_chat_externally}
                                  onChange={handleCheck}
                                  control={<Checkbox />}
                                  name="allow_to_chat_externally"
                                  label="Allowed to chat externally"
                                />
                              </Col>
                              <Col md={4} className="mb-3">
                                <FormControlLabel
                                  className="check_label"
                                  checked={
                                    userDetails.allow_to_purchased_content
                                  }
                                  onChange={handleCheck}
                                  control={<Checkbox />}
                                  name="allow_to_purchased_content"
                                  label="Allowed to purchase content"
                                />
                              </Col>
                              <Col md={8} className="ps-5">
                                <div className="d-flex set_price mng_price">
                                  <p className="mb-0">Set price range</p>
                                  <Form.Group className="mb-4 form-group">
                                    {/* <Select
                                      disabled={
                                        !userDetails.allow_to_purchased_content
                                          ? true
                                          : false
                                      }
                                      className="w-100"
                                      value={userDetails.min_price}
                                      name="min_price"
                                      onChange={handleChange}
                                    >
                                      <MenuItem
                                        className="selectPlaceholder"
                                        value="no_min"
                                      >
                                        No min
                                      </MenuItem>
                                      <MenuItem value={0}>0</MenuItem>
                                      <MenuItem value={10}>10</MenuItem>
                                    </Select> */}
                                    <Form.Control
                                        type="text"
                                        className=""
                                        value={userDetails.min_price}
                                        name="min_price"
                                        onChange={handleChange}
                                        placeholder="Min"
                                    />
                                  </Form.Group>
                                  <Form.Group className="mb-4 form-group">
                                    {/* <Select
                                      disabled={
                                        !userDetails.allow_to_purchased_content
                                          ? true
                                          : false
                                      }
                                      className="w-100"
                                      value={userDetails.max_price}
                                      name="max_price"
                                      onChange={handleChange}
                                    >
                                      <MenuItem
                                        className="selectPlaceholder"
                                        value="no_max"
                                      >
                                        No max
                                      </MenuItem>
                                      <MenuItem value={172}>172</MenuItem>
                                      <MenuItem value={276}>276</MenuItem>
                                    </Select> */}
                                    <Form.Control
                                        type="text"
                                        className=""
                                        value={userDetails.max_price}
                                        name="max_price"
                                        onChange={handleChange}
                                        placeholder="Max"
                                    />
                                  </Form.Group>
                                </div>
                              </Col>
                              {/* <Col md={6} className="">
                                <FormControlLabel
                                  className="check_label"
                                  checked={userDetails.onboard_other_user}
                                  onChange={handleCheck}
                                  control={<Checkbox />}
                                  name="onboard_other_user"
                                  label="Onboard another user"
                                />
                              </Col> */}
                            </Row>
                            <div className="stepFooter">
                              <Button
                                className="w-100 mt_25"
                                type="submit"
                                variant="primary"
                              >
                                Save
                              </Button>
                            </div>
                          </div>
                        </Form>
                      )}
                      {show && (
                        <Form onSubmit={RemoveUser}>
                          <div className="adminDetails sign_section">
                            <p className="onbrdheading sign_hdng">
                              Remove existing user
                            </p>
                            <Row>
                              <Col md={12}>
                                <Row>
                                  <Col md={6}>
                                    <Form.Group className="mb-4 form-group">
                                      <img src={chair} alt="" />
                                      <Select
                                        className="w-100 slct_sign"
                                        name="office_name"
                                        defaultValue={"option1"}
                                        onChange={(e) => {
                                          SelectUser(e.target.value)
                                          setUserId(e.target.value)
                                        }
                                      }
                                      >
                                        <MenuItem
                                          className="selectPlaceholder"
                                          disabled
                                          value="option1"
                                        >
                                          Select office
                                        </MenuItem>
                                        {officeNames &&
                                          officeNames.map((value) => {
                                            return (
                                              <MenuItem value={value._id}>
                                                {value.name}
                                              </MenuItem>
                                            );
                                          })}
                                      </Select>
                                    </Form.Group>
                                  </Col>
                                  <Col md={6}>
                                    <Form.Group className="mb-4 form-group">
                                      <img src={user} alt="" />
                                      <Select
                                        className="w-100 slct_sign"
                                        name="user_id"
                                        onChange={handleRemoveUser}
                                        value={removeUser.user_id}
                                      >
                                        <MenuItem
                                          className="selectPlaceholder"
                                          disabled
                                          value="option1"
                                        >
                                          Select user
                                        </MenuItem>
                                        {addedUsers &&
                                          addedUsers.map((item) => {
                                            return (
                                              <MenuItem value={item._id}>
                                                {item.first_name +
                                                  " " +
                                                  item.last_name}
                                              </MenuItem>
                                            );
                                          })}
                                      </Select>
                                    </Form.Group>
                                  </Col>
                                  {/* <Col md={6}>
                                    <Form.Group className="mb-4 form-group">
                                      <Select
                                        className="w-100 slct_sign"
                                        name="reason_for_removal"
                                        value={removeUser.reason_for_removal}
                                        onChange={handleRemoveUser}
                                      >
                                        <MenuItem
                                          className="selectPlaceholder"
                                          disabled
                                          value="option1"
                                        >
                                          Reason for removal
                                        </MenuItem>
                                        {removal_reason &&
                                          removal_reason.map((item) => {
                                            return (
                                              <MenuItem value={item._id}>
                                                {item.reason}
                                              </MenuItem>
                                            );
                                          })}
                                      </Select>
                                    </Form.Group>
                                  </Col> */}
                                </Row>
                              </Col>
                              <Col md={12} className="mb-3 position-relative">
                                <FormControlLabel
                                  className="check_label"
                                  control={<Checkbox />}
                                  value={removeUser.confirm_removal}
                                  onChange={(e) => {
                                    setRemoveUser((prev) => ({
                                      ...prev,
                                      confirm_removal: e.target.checked,
                                    }));
                                  }}
                                  name="confirm_removal"
                                  label="Please check the box to confirm the removal of the selected user from the Presshop platform"
                                />
                                {submit && !removeUser.confirm_removal && (
                                  <span
                                    className="req_inp"
                                    style={{ color: "red" }}
                                  >
                                    *
                                  </span>
                                )}
                              </Col>
                              {/* <Col md={12} className="">
                                <FormControlLabel
                                  className="check_label"
                                  control={<Checkbox />}
                                  name="allowed_to_purchase_content"
                                  label="Remove another user"
                                />
                              </Col> */}
                            </Row>
                          </div>
                          <div className="stepFooter">
                            <Button
                              className="w-100"
                              type="submit"
                              variant="primary"
                            >
                              Remove
                            </Button>
                          </div>
                        </Form>
                      )}
                    </div>
                  </div>
                </div>
              </Col>
              <Col lg="6" className="pos_stick position-relative">
                <div className="right-side position-relative">
                  <span className="shape yl_sqr pos-abs"></span>
                  <span className="shape bl_crcl pos_abs"></span>
                  <span className="shape gr_tri pos_abs"></span>
                  <span className="shape rd_crcl pos_abs"></span>
                  <div className="text-center">
                    <img src={manageusers} alt="" />
                    <h2 className="mng_usr_rt_txt m-auto">
                      Get to see & hear the{" "}
                      <span className="txt_bld">news</span> first
                    </h2>
                  </div>
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

export default ManageUsers;
