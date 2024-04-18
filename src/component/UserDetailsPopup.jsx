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
import { Get, Post } from "../services/user.services";
import { toast } from "react-toastify";
import Loader from "./Loader";
const UserDetailsPopup = (props) => {
  const navigate = useNavigate();
  const [designation, setDesignation] = useState([]);
  const [submit, setSubmit] = useState(false);
  const [show, setShow] = useState(true);
  const [error, setError] = useState({});
  const [details, setDetails] = useState({
    user_first_name: "",
    user_last_name: "",
    user_email: "",
    administator_first_name: "",
    administator_last_name: "",
    administator_email: "",
  });
  const [visibility1, setVisibility1] = useState(false);
  const [visibility2, setVisibility2] = useState(false);
  const [isChecked, setIsChecked] = useState({
    check1: false,
    check2: false,
    check3: false,
    check4: false,
  });
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setDetails({ ...details, [e.target.name]: e.target.value });
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
    }
  };

  const getDesignation = async () => {
    const list = await Get(`mediaHouse/getCategoryType?type=designation`);
    setDesignation(list.data.data);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    setLoading(true);

    try{
      const obj = {
        user_first_name: details.user_first_name,
        user_last_name: details.user_last_name,
        user_email: details.user_email,
        administator_first_name: details.administator_first_name,
        administator_last_name: details.administator_last_name,
        administator_email: details.administator_email,
      };
      const list = await Post(`mediaHouse/userRegisteration`, obj);
      if (list) {
        // console.log(list?.data?.data?._id, `<<<<<<this is the id of requsetregister`)
        toast.success("Onboarding request sent");
        localStorage.setItem("requsetregisterId", list?.data?.data?._id);
  
        setLoading(false);
  
        navigate("/landing-page");
      }
    }
    catch(error){
      setLoading(false);
      console.log(error);
      setError({
        email: error.response.data.errors.msg.includes("E11000") ? "This email already exists" : ""
      })
    }
  };

  useEffect(() => {
    getDesignation();
  }, []);

  return (
    <>
    {
      loading && <Loader/>
    }
      <div className="admin_popup_dtl">
        <Modal
          show={show}
          {...props}
          aria-labelledby="contained-modal-title-hcenter profile_mdl"
          className="modal_wrapper "
          dialogClassName="my-modal adm_reg_mdl mdl_dsn add_usr_mdl"
        >
          <Form onSubmit={handleSubmit}>
            <Modal.Header
              className="modal-header profile_mdl_hdr_wrap"
              closeButton
            >
              <Modal.Title className="modal-title profile_modal_ttl ">
                <p className="mb-0">Hello new user</p>
              </Modal.Title>
            </Modal.Header>
            <Modal.Body className="show-grid modal-body border-0">
              <Container>
                <Row>
                  <p className="bg_lbl">Your details</p>
                  <Col xs={12} md={6}>
                    <Form.Group className="mb-4 form-group">
                      <img src={user} alt="" />
                      <Form.Control
                        type="text"
                        pattern="\S.*"
                        title="First Name should not start with space"
                        size="sm"
                        name="user_first_name"
                        className="user"
                        placeholder="Enter first name"
                        required
                        onChange={handleChange}
                      />
                    </Form.Group>
                  </Col>
                  <Col xs={12} md={6}>
                    <Form.Group className="mb-4 form-group">
                      <img src={user} alt="" />
                      <Form.Control
                        type="text"
                        pattern="\S.*"
                        size="sm"
                        name="user_last_name"
                        className="user"
                        placeholder="Enter last name"
                        required
                        onChange={handleChange}
                      />
                    </Form.Group>
                  </Col>
                  <Col xs={12} md={6}>
                    <Form.Group className="mb-4 form-group">
                      <Form.Control
                        type="email"
                        pattern="\S.*"
                        size="sm"
                        name="user_email"
                        className="user"
                        placeholder="Enter official email id"
                        required
                        onChange={(e) => {
                          handleChange(e);
                          setError({...error, email: ""})
                        }}
                      />
                      {
                        error.email ? <span style={{ color: "red" }} className="eml_txt_dngr error_message">
                        {error.email}
                      </span> : null
                      }
                    </Form.Group>
                  </Col>
                </Row>

                <Row>
                  <p className="bg_lbl">Administrator details</p>
                  <Col xs={12} md={6}>
                    <Form.Group className="mb-4 form-group">
                      <img src={user} alt="" />
                      <Form.Control
                        type="text"
                        pattern="\S.*"
                        title="First Name should not start with space"
                        size="sm"
                        name="administator_first_name"
                        className="user"
                        placeholder="Enter first name"
                        required
                        onChange={handleChange}
                      />
                    </Form.Group>
                  </Col>
                  <Col xs={12} md={6}>
                    <Form.Group className="mb-4 form-group">
                      <img src={user} alt="" />
                      <Form.Control
                        type="text"
                        pattern="\S.*"
                        title="Last Name should not start with space"
                        size="sm"
                        name="administator_last_name"
                        className="user"
                        placeholder="Enter last name"
                        required
                        onChange={handleChange}
                      />
                    </Form.Group>
                  </Col>
                  <Col xs={12} md={6}>
                    <Form.Group className="mb-4 form-group">
                      <Form.Control
                        type="email"
                        pattern="\S.*"
                        size="sm"
                        name="administator_email"
                        className="user"
                        placeholder="Enter official email id"
                        required
                        onChange={handleChange}
                      />
                    </Form.Group>
                  </Col>
                </Row>

                <Col md={12} className="mb-3">
                  <Row>
                    <div className="term_conditions">
                      <p className="text_condition mb-3">
                        Please enter your details above, and send your
                        onboarding request to your company administrator. Once
                        the administrator onboards, and assigns user rights to
                        you, you can then log onto the <b>Presshop</b> platform
                      </p>
                      {/* <p className="text_condition mb-0">
                      Please enter your details above, and send your onboarding
                      request to your company administrator. Once the
                      administrator onboards, and assigns user rights to you,
                      you can then log onto the <b>Presshop</b> platform
                    </p> */}
                      <p className="text_condition mb-0">
                        If you have any questions regarding the onboarding
                        process, please <a className="link">chat</a> with our
                        helpful team members, or send us an{" "}
                        <a className="link"> email</a>
                      </p>
                    </div>
                  </Row>
                </Col>
              </Container>
            </Modal.Body>
            <Modal.Footer className="border-0 mb-4">
              <Button
                className="w-50 m-auto d-inline-block py-2 text-lowercase mdl_btn"
                variant="primary"
                type="submit"
              >
                <div className="link_white">Onboard Me</div>
              </Button>
            </Modal.Footer>
          </Form>
        </Modal>
      </div>
    </>
  );
};

export default memo(UserDetailsPopup);
