import React, { useEffect, useState } from "react";
import { Container, Row, Col, Accordion } from "react-bootstrap";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import { Link, useNavigate } from "react-router-dom";
import Typography from "@mui/material/Typography";
import Header from "../../component/Header";
import loginimg from "../../assets/images/login-images/faq-img.svg";
import { Get, Post } from "../../services/user.services";
import { toast } from "react-toastify";
import user from "../../assets/images/user.svg";
import lock from "../../assets/images/sortIcons/lock.svg";
import eye from "../../assets/images/sortIcons/custom.svg";
import DbFooter from "../../component/DbFooter";
import { BsEyeSlash, BsEye } from "react-icons/bs";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import { BsArrowLeft } from 'react-icons/bs';

const FAQPostLogin = () => {

  const token = localStorage.getItem("token")
  const [faqs, setFaqs] = useState([])

  const FAQ = async () => {
    const resp = await Get(`mediaHouse/getGenralMgmt?faq=faq`)
    // console.log(resp, "<----------resp")
    setFaqs(resp.data.status)
  }

  useEffect(() => {
    FAQ()
  }, [])

  return (
    <>
      <Header />
      <div className="login-page post_faq_pg">
        <Container fluid className="pdng">
          <div className="log-wrap">
            <Row className="row-w-m m-0 position-relative">
              <Col lg="6" className="p-0">
                <div className="left-side bg-white cstm_ht">
                  <Link className='back_link'><BsArrowLeft className='text-pink' onClick={() => window.history.back()} /> Back </Link>
                  <div className="pg_heading">
                    <h1>FAQ</h1>
                  </div>
                  <div className="log_txt no_border">
                    <Typography variant="body2" className="mb-0">
                      Please check the answers below to our most frequently
                      asked questions. You can also use the search bar above to
                      instantly search for any specific answers that you need.
                      If you still wish to speak to one of our experienced team
                      members regarding a query or any questions, please{" "}
                      <Link to={"/contact-us"} className="link">contact us</Link> and we will be glad to
                      help. Cheers!
                    </Typography>
                  </div>
                  <div className="faqs_wrp">
                    <Accordion className="mb_20" defaultActiveKey="0">
                      {faqs && faqs.map((item, index) => {
                        return (
                          <Accordion.Item eventKey={index} key={index}>
                            <Accordion.Header><span className='questnTag'>Q</span>{item.ques}</Accordion.Header>
                            <Accordion.Body>
                              {item.ans}
                            </Accordion.Body>
                          </Accordion.Item>
                        )
                      })}
                    </Accordion>
                    {/* <Accordion className="mb_20" defaultActiveKey="0">
                      <Accordion.Item eventKey="1">
                        <Accordion.Header>
                          <span className="questnTag">Q</span>
                          Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolores, totam?
                        </Accordion.Header>
                        <Accordion.Body>
                          <span className="questnTag">A</span>
                          Lorem ipsum dolor, sit amet consectetur adipisicing elit. Quibusdam animi quisquam voluptatibus nam repudiandae ad earum nisi totam suscipit est!
                        </Accordion.Body>
                      </Accordion.Item>
                    </Accordion>
                    <Accordion className="mb_20" defaultActiveKey="0">
                      <Accordion.Item eventKey="1">
                        <Accordion.Header>
                          <span className="questnTag">Q</span>
                          Lorem ipsum amet consectetur, adipisicing elit. Natus inventore beatae maiores?
                        </Accordion.Header>
                        <Accordion.Body>
                          <span className="questnTag">A</span>
                          Lorem ipsum dolor, sit amet consectetur adipisicing elit. Quibusdam animi quisquam voluptatibus nam repudiandae ad earum nisi totam suscipit est!
                        </Accordion.Body>
                      </Accordion.Item>
                    </Accordion>
                    <Accordion className="mb_20" defaultActiveKey="0">
                      <Accordion.Item eventKey="1">
                        <Accordion.Header>
                          <span className="questnTag">Q</span>
                          Lorem consectetur adipisicing elit. Nobis, fuga?
                        </Accordion.Header>
                        <Accordion.Body>
                          <span className="questnTag">A</span>
                          Lorem ipsum dolor, sit amet consectetur adipisicing elit. Quibusdam animi quisquam voluptatibus nam repudiandae ad earum nisi totam suscipit est!
                        </Accordion.Body>
                      </Accordion.Item>
                    </Accordion>
                    <Accordion className="mb_20" defaultActiveKey="0">
                      <Accordion.Item eventKey="1">
                        <Accordion.Header>
                          <span className="questnTag">Q</span>
                          Lorem ipsum dolor sit amet, consectetur adipisicing elit. Natus, quas?
                        </Accordion.Header>
                        <Accordion.Body>
                          <span className="questnTag">A</span>
                          Lorem ipsum dolor sit amet consectetur adipisicing elit. Illum possimus sint non velit nam est eius unde assumenda voluptate fugiat.
                        </Accordion.Body>
                      </Accordion.Item>
                    </Accordion> */}
                  </div>
                </div>
              </Col>
              <Col lg="6 pos_stick">
                <div className="right-side position-relative">
                  <div className="tri"></div>
                  <div className="circle"></div>
                  <div className="big_circle"></div>
                  <div className="">
                    <img src={loginimg} alt="" />
                  </div>
                  <div className="right_txt">
                    <p>
                      Got questions? We've got you{" "}
                      <span className="txt_bld">covered!</span>
                    </p>
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

export default FAQPostLogin;
