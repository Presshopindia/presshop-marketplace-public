import React, { memo, useEffect, useState } from "react";
import Col from "react-bootstrap/Col";
import Container from "react-bootstrap/Container";
import Modal from "react-bootstrap/Modal";
import Row from "react-bootstrap/Row";
import Form from "react-bootstrap/Form";
import chair from "../assets/images/chair.svg";
import user from "../assets/images/user.svg";
import lock from "../assets/images/sortIcons/lock.svg";
// import eye from "../assets/images/sortIcons/custom.svg"
import {
  Checkbox,
  FormControlLabel,
  Button,
  MenuItem,
  Select,
} from "@mui/material";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
// import { FaRegEyeSlash } from "react-icons/fa";
// import { IoEyeOffOutlin } from "react-icons/io";
import { BsEyeSlash, BsEye } from "react-icons/bs";
import { Get } from "../services/user.services";
import { toast } from "react-toastify";
import { successToasterFun } from "./commonFunction";

const AdminDetailsPopup = (props) => {
  const navigate = useNavigate();
  const [designation, setDesignation] = useState([]);
  const [submit, setSubmit] = useState(false);
  const [details, setDetails] = useState({
    first_name: "",
    last_name: "",
    designation_id: "",
    password: "",
    cnfm_password: "",
  });
  const [visibility1, setVisibility1] = useState(false);
  const [visibility2, setVisibility2] = useState(false);

  const [isChecked, setIsChecked] = useState({
    check1: false,
    check2: false,
    check3: false,
    check4: false,
  });

  const [validations, setValidations] = useState({
    length: false,
    special: false,
    number: false,
    uppercase: false,
    lowercase: false,
    isequal: false,
  });

  const handleChange = (e) => {
    setDetails({ ...details, [e.target.name]: e.target.value });

    if (e.target.name == "password") {
      const length = e.target.value.length >= 8;
      const special = /[!@#$%^&*(),.?":{}|<>]/.test(e.target.value);
      const number = /\d/.test(e.target.value);
      const uppercase = /[A-Z]/.test(e.target.value);
      const lowercase = /[a-z]/.test(e.target.value);

      setValidations({ length, special, number, uppercase, lowercase });
    }
    if(e.target.name == "cnfm_password"){
      console.log("testing")
      if(details.password===e.target.value){
      setValidations(old=>({...old,isequal:true}));
      }
    }
    if(e.target.name === "cnfm_password"){
      console.log("miketesting")
      if(details.password != e.target.value){
      setValidations(old=>({...old,isequal:false}));
      // setValidations({...validations, isequal: false})
      }
    }
  };

  const handleCheck = (e) => {
    setIsChecked({ ...isChecked, [e.target.name]: e.target.checked });
  };

  const Navigate = () => {
    if (
      isChecked.check1 &&
      isChecked.check2 &&
      isChecked.check3 &&
      isChecked.check4
    ) {
      localStorage.setItem("AdminPopup", JSON.stringify(details));
      navigate("/signup");
    }
  };

  const getDesignation = async () => {
    const list = await Get(`mediaHouse/getCategoryType?type=designation`);
    setDesignation(list.data.data);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    setSubmit(true);
    if (details.designation_id === "") {
      // I have to write something that I will write later.
      return;
    } 
    if (details.password !== details.cnfm_password) {
      setValidations(old=>({...old,isequal:false}));
      toast.error("Password does not match");
    return
      // I have to write something that I will write later.
      // return successToasterFun("Password does not match");
    }
     else if (!validations.length || !validations.lowercase || !validations.number || !validations.uppercase || !validations.lowercase){
      return;
    } 
    else {
      Navigate();
    }
  };
console.log("validations",validations)
  useEffect(() => {
    getDesignation();
  }, []);

  return (
    <div className="admin_popup_dtl">
      <Modal
        {...props}
        aria-labelledby="contained-modal-title-hcenter profile_mdl"
        className="modal_wrapper "
        dialogClassName="my-modal adm_reg_mdl mdl_dsn"
      >
        <Form onSubmit={handleSubmit}>
          <Modal.Header
            className="modal-header profile_mdl_hdr_wrap"
            closeButton
          >
            <Modal.Title className="modal-title profile_modal_ttl">
              <p className="mb-0">Hello Administrator</p>
            </Modal.Title>
          </Modal.Header>
          <Modal.Body className="show-grid modal-body border-0">
            <Container>
              <Row>
                <Col xs={12} md={6}>
                  <Form.Group className="mb-3 form-group">
                    <img src={user} alt="" />
                    <Form.Control
                      type="text"
                      pattern="\S.*"
                      title="First Name should not start with space"
                      size="sm"
                      name="first_name"
                      className="user"
                      placeholder="Enter first name"
                      required
                      onChange={handleChange}
                    />
                  </Form.Group>
                </Col>
                <Col xs={12} md={6}>
                  <Form.Group className="mb-3 form-group">
                    <img src={user} alt="" />
                    <Form.Control
                      type="text"
                      pattern="\S.*"
                      title="Last Name should not start with space"
                      size="sm"
                      name="last_name"
                      className="user"
                      placeholder="Enter last name"
                      required
                      onChange={handleChange}
                    />
                  </Form.Group>
                </Col>
              </Row>

              <Row>
                <Col xs={12} md={6}>
                  <Form.Group className="mb-4 position-relative form-group">
                    <img className="privacy" src={lock} alt="" />
                    <Form.Control
                      type={!visibility1 ? "password" : "text"}
                      required
                      className=""
                      pattern=".{8,}"
                      title="Password should not be less than 8 letters"
                      placeholder="Choose password * "
                      name="password"
                      onChange={handleChange}
                      value={details?.password}
                    />
                    {!visibility1 ? (
                      <div
                        color="#000"
                        className="pass_ic_wrap"
                        onClick={() => setVisibility1(true)}
                      >
                        <BsEyeSlash />
                      </div>
                    ) : (
                      <div
                        color="#000"
                        className="pass_ic_wrap"
                        onClick={() => setVisibility1(false)}
                      >
                        <BsEye />
                      </div>
                    )}
                    <div className="validation-messages">
                      <p style={{ color: validations.length ? 'green' : 'red' }}>
                        {validations.length ? '✔' : '✘'} Must be at least 08 characters
                      </p>
                      <p style={{ color: validations.special ? 'green' : 'red' }}>
                        {validations.special ? '✔' : '✘'} Contains at least 01 special character
                      </p>
                      <p style={{ color: validations.number ? 'green' : 'red' }}>
                        {validations.number ? '✔' : '✘'} Contains at least 01 number
                      </p>
                    </div>

                  </Form.Group>

                </Col>
                <Col xs={12} md={6}>
                  <Form.Group className="mb-4 form-group position-relative">
                    <img src={lock} alt="" />
                    <Form.Control
                      type={!visibility2 ? "password" : "text"}
                      required
                      className=""
                      placeholder="Confirm password * "
                      name="cnfm_password"
                      onChange={(e) => {
                        handleChange(e);
                        // setValidations({...validations, isequal: false})
                      }}
                      value={details?.cnfm_password}
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
                    <div className="validation-messages">
                      <p style={{ color: validations.uppercase ? 'green' : 'red' }}>
                        {validations.uppercase ? '✔' : '✘'} Contains at least 01 uppercase character
                      </p>
                      <p style={{ color: validations.lowercase ? 'green' : 'red' }}>
                        {validations.lowercase ? '✔' : '✘'} Contains at least 01 lowercase character
                      </p>
                    {!validations?.isequal && details?.cnfm_password ?
                      <p style={{ color: validations.isequal ? 'green' : 'red' }}>
                        {validations.isequal ? '✔' : '✘'} Password does not match
                      </p> : null}
                    </div> 
                  </Form.Group>
                </Col>
              </Row>
              <Row className="">
                <Col xs={12} md={6}>
                  <Form.Group className="mb-4 form-group designtn_sel">
                    <img src={chair} alt="" />
                    <Select
                      className="w-100 "
                      value={
                        details.designation_id
                          ? details.designation_id
                          : "option1"
                      }
                      name="designation_id"
                      onChange={handleChange}
                    >
                      <MenuItem
                        value="option1"
                        disabled
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
                      {/* <MenuItem value="option3">Option 3</MenuItem> */}
                    </Select>
                  </Form.Group>
                </Col>
              </Row>
              <Col md={12} className="mb-3">
                <Row>
                  <div className="term_conditions">
                    <p className="text_condition mb-0">
                      As the administrator, we are giving you important &
                      exclusive privileges across the Presshop platform. Please
                      check the boxes below, and confirm that you are
                      responsible for the following actions across all your
                      offices
                    </p>
                  </div>
                </Row>
              </Col>
              <Col md={12}>
                <div className="administrator_checkbox">
                  <Col md="12" className="mb-3 position-relative">
                    <FormControlLabel
                      className="check_label"
                      control={<Checkbox />}
                      name="check1"
                      label="I am responsible for allowing user rights for all our official employees and associates"
                      checked={isChecked.check1}
                      onChange={(e) => {
                        handleCheck(e);
                      }}
                    />
                    {submit && !isChecked.check1 && (
                      <span className="req_inp" style={{ color: "red" }}>
                        *
                      </span>
                    )}
                  </Col>
                  <Col md="12" className="mb-3 position-relative">
                    <FormControlLabel
                      className="check_label"
                      control={<Checkbox />}
                      name="check2"
                      checked={isChecked.check2}
                      onChange={handleCheck}
                      label="I am responsible and authorised by the Company for granting  purchasing & broadcasting task permissions to all official employees and associates, across all our offices on the Presshop platform"
                    />
                    {submit && !isChecked.check2 && (
                      <span className="req_inp" style={{ color: "red" }}>
                        *
                      </span>
                    )}
                  </Col>
                  <Col md="12" className="mb-3 position-relative">
                    <FormControlLabel
                      className="check_label"
                      control={<Checkbox />}
                      name="check3"
                      checked={isChecked.check3}
                      onChange={handleCheck}
                      label="I am responsible and authorised by the Company for fixing minimum and maximum financial limits for all official employees and associates, across all our offices on the Presshop platform"
                    />
                    {submit && !isChecked.check3 && (
                      <span className="req_inp" style={{ color: "red" }}>
                        *
                      </span>
                    )}
                  </Col>
                  <Col md="12" className="mb-3 position-relative">
                    <FormControlLabel
                      className="check_label"
                      control={<Checkbox />}
                      name="check4"
                      checked={isChecked.check4}
                      onChange={handleCheck}
                      label="I confirm that I will not share, or transfer the administrator password to anybody else without informing, and requesting access from Presshop"
                    />
                    {submit && !isChecked.check4 && (
                      <span className="req_inp" style={{ color: "red" }}>
                        *
                      </span>
                    )}
                  </Col>
                </div>
              </Col>

              <Col md={12}></Col>
            </Container>
          </Modal.Body>
          <Modal.Footer className="border-0 mb-4">
            <Button
              className="w-50 m-auto d-inline-block py-2 text-lowercase mdl_btn"
              variant="primary"
              type="submit"
            // onClick={() => {
            //     setSubmit(true)
            //     Navigate()
            // }}
            >
              <div className="link_white">Save & Continue</div>
            </Button>
          </Modal.Footer>
        </Form>
      </Modal>
    </div>
  );
};

export default memo(AdminDetailsPopup);
