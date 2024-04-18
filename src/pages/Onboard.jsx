import { React, useState } from "react";
import { Container, Row, Col } from "react-bootstrap";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import { Link } from "react-router-dom";
import Typography from "@mui/material/Typography";
import HeaderN from "../component/HeaderN";
import loginimg from "../assets/images/login-images/onbrdimg.svg";
import {
  Checkbox,
  FormControlLabel,
  MenuItem,
  Select,
  FormControl,
  InputLabel,
} from "@mui/material";
import AdminDetailsPopup from "../component/AdminDetailsPopup";
import Footerlandingpage from "../component/Footerlandingpage";
import UserDetailsPopup from "../component/UserDetailsPopup";

const Login = () => {
  const [modalShow, setModalShow] = useState(false);
  const [modalShow1, setModalShow1] = useState(false);

  const [isChecked, setIsChecked] = useState(false);
  const [isChecked1, setIsChecked1] = useState(false);


  const [submit, setSubmit] = useState(false);

  return (
    <>
      <HeaderN />
      <div className="login-page">
        <Container fluid className="pdng">
          <div className="log-wrap">
            <Row className="row-w-m m-0">
              <Col lg={6} md={6} sm={12} xs={12} className="p-0 lft_colm">
                <img src={loginimg} alt="" className="resp_bg obj_fit_contain" />
                <div className="left-side bg-white cstm_ht">
                  <div className="pg_heading">
                    <h1>Onboard now</h1>
                  </div>
                  <div className="log_txt">
                    <p class="mb-0">
                      Join our growing tribe, and connect directly with the
                      people. Please add your company, offices, and employee
                      details to register
                    </p>
                  </div>
                  <Form>
                    <div className="walkthr_wrap txt_wrap d-flex align-items-start position-relative">
                      {submit && !isChecked && (
                        <span className="req_inp" style={{ color: "red" }}>
                          *
                        </span>
                      )}
                      <FormControlLabel
                        className="onbrd_chk"
                        control={<Checkbox />}
                        checked={isChecked}
                        onChange={(e) => {
                          setIsChecked(e.target.checked);
                          setIsChecked1(false)
                        }}
                      />
                      <div className="onboardText log_txt no_border mb-0 pb-0">
                        <Typography>
                          Are you the administrator? If yes, please check the
                          box to proceed ahead
                        </Typography>
                      </div>
                    </div>

                    <div className="walkthr_wrap txt_wrap d-flex align-items-start position-relative">
                      {submit && !isChecked && !isChecked1 && (
                        <span className="req_inp" style={{ color: "red" }}>
                          *
                        </span>
                      )}
                      <FormControlLabel
                        className="onbrd_chk"
                        control={<Checkbox />}
                        checked={isChecked1}
                        onChange={(e) => {
                          setIsChecked1(e.target.checked);
                          setIsChecked(false)
                        }}
                      />
                      <div className="onboardText log_txt no_border">
                        <Typography>
                          Are you a new user? If yes, please check the box to
                          proceed. You will need to request the adminstrator to
                          register you onto the Presshop platform, and assign
                          user rights to you
                        </Typography>
                        <Typography variant="body2">
                          It is essential that this onboarding process is
                          completed by a company nominated adminstrator as user
                          rights have to be granted to all official employees,
                          and associates across the offices
                        </Typography>
                        <Typography variant="body2" className="mb-0">
                          If you have any questions regarding the onboarding
                          process, please <a className="link">chat</a> with our
                          helpful team members, or send us an{" "}
                          <a className="link"> email</a>
                        </Typography>
                      </div>
                    </div>

                    {/* <Link to={"/Signup "}> */}
                    <Button
                      variant=""
                      onClick={() => {
                        setSubmit(true);
                        if (isChecked) {
                          setModalShow(true)
                        } else if (isChecked1) {
                          setModalShow1(true)
                        }
                      }}
                      className="theme-btn theme_btn custom-ab mb-4 w-100"
                    >
                      <span>Next</span>
                    </Button>

                    <AdminDetailsPopup
                      show={modalShow}
                      onHide={() => {
                        setModalShow(false)
                      }}
                    />

                    <UserDetailsPopup
                      show={modalShow1}
                      onHide={() => {
                        setModalShow1(false)
                      }

                      }
                    />
                    <h6 className="text-center mt-3">1 of 4</h6>
                  </Form>
                </div>
              </Col>
              <Col lg={6} md={6} sm={12} xs={12} className="rt_col">
                <div className="right-side position-relative">
                  <span className="shape yl_sqr pos-abs"></span>
                  <span className="shape bl_crcl pos_abs"></span>
                  {/* <span className='shape gr_tri pos_abs'></span> */}
                  <span className="shape rd_crcl pos_abs"></span>
                  <div className="">
                    <img src={loginimg} className="rt_bg_img" alt="" srcset="" />
                  </div>
                  <div className="right_txt">
                    <p>
                      Let's start delivering{" "}
                      <span className="txt_bld">news</span>
                    </p>
                  </div>
                </div>
              </Col>
            </Row>
          </div>
        </Container>
      </div>
      <Footerlandingpage />
    </>
  );
};

export default Login;
