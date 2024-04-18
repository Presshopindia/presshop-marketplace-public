import React, { useEffect, useState } from 'react';
import DbFooter from '../component/DbFooter';
import { Container, Row, Col } from "react-bootstrap";
import tandcimg from "../assets/images/login-images/post_tandc.png";
import { Button } from '@mui/material';
import { Link } from "react-router-dom";
import Header from '../component/Header';
import { BsArrowLeft } from 'react-icons/bs';
import { Get } from '../services/user.services';
import moment from 'moment/moment';
import html2pdf from 'html2pdf.js';

const PostPrivacyPolicy = () => {

    const [privacy, setPrivacy] = useState()

    const PrivacyPolicy = async () => {
        const resp = await Get(`mediaHouse/getGenralMgmt?privacy_policy=privacy_policy`)
        setPrivacy(resp.data.status)
        // console.log(resp, "<-----------mediaHouse/getGenralMgmt?privacy_policy=privacy_policy")
    }

    const handlePrintClick = () => {
        const printContent = document.getElementById('print-content');
        const iframe = document.createElement('iframe');
        iframe.setAttribute('style', 'position:absolute;width:0px;height:0px;left:-500px;top:-500px;');
        document.body.appendChild(iframe);
        const iframeWindow = iframe.contentWindow;
        const printWindow = iframeWindow || iframe.contentDocument || iframe;

        printWindow.document.write(printContent.innerHTML);
        printWindow.document.close();
        printWindow.focus();
        printWindow.print();
        document.body.removeChild(iframe);
    };

    const handlePdfDownloadClick = () => {
        const printContent = document.getElementById('print-content');
        html2pdf()
            .set({
                margin: [10, 10],
                filename: 'Presshop Privacy Policy.pdf',
                image: { type: 'jpeg', quality: 0.98 },
                html2canvas: { scale: 4 },
                jsPDF: { unit: 'mm', format: 'a4', orientation: 'portrait' },
            })
            .from(printContent)
            .save();
    };

    useEffect(() => {
        PrivacyPolicy()
    }, [])

    return (
        <>
            <Header />
            <div className="page-wrap login-page p-0 post-tandc_page">
                <Container fluid className="pdng">
                    <div className="log-wrap">
                        <Row className="row-w-m m-0">
                            <Col lg="6" className="bg-white p-0">
                                <div className="login_stepsWrap left-pdng post_lgn">
                                    <div className='onboardMain' id="print-content">
                                        <div className="onboardIntro sign_section post">
                                            <h1 className="mb-0 pg_hdng">Privacy Policy</h1>
                                            <span className="txt_updated">Updated on {moment(privacy?.updatedAt).format("DD MMMM, YYYY")}</span>
                                            <div className="onboardStep b_border top_txt">
                                                <p>Please find our privacy policy listed below. If you have any questions, and would like to have a quick chat have with our helpful team members, kindly <a className="link"> contact us</a>. Thanks!
                                                </p>
                                            </div>
                                        </div>
                                        <div className="onboardStep upload_docs">
                                            <div className="onboardStep b_border top_txt mb-4">
                                                <div className="txt_tandc" dangerouslySetInnerHTML={{ __html: privacy?.description }} />
                                                {/* <p className="sub_sub_h">What & Why</p>
                                                <p className='mb-4' >{privacy?.description}</p>
                                            </div> */}
                                                {/* <div className="txt_tandc">
                                                    <p className="sub_sub_h">What & Why</p>
                                                    <p className='mb-4'>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</p>
                                                </div>
                                                <div className="txt_tandc">
                                                    <p className="sub_sub_h">What & Why</p>
                                                    <p className='mb-4'>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</p>
                                                </div>
                                                <div className="txt_tandc">
                                                    <p className="sub_sub_h">What & Why</p>
                                                    <p className='mb-4'>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</p>
                                                </div>
                                                <div className="txt_tandc">
                                                    <p className="sub_sub_h mb-3">What & Why</p>
                                                    <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</p>
                                                </div>
                                                <div className="txt_tandc">
                                                    <p className="sub_sub_h">What & Why</p>
                                                    <p className='mb-4'>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</p>
                                                </div>
                                                <div className="txt_tandc">
                                                    <p className="sub_sub_h">What & Why</p>
                                                    <p className='mb-4'>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</p>
                                                </div>
                                                <div className="txt_tandc">
                                                    <p className="sub_sub_h">What & Why</p>
                                                    <p className='mb-4'>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</p>
                                                </div>
                                                <div className="txt_tandc">
                                                    <p className="sub_sub_h">What & Why</p>
                                                    <p className='mb-4'>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</p>
                                                </div>
                                                <div className="txt_tandc">
                                                    <p className="sub_sub_h mb-3">What & Why</p>
                                                    <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</p>
                                                </div> */}
                                            </div>
                                        </div>
                                    </div>
                                    <div className="d-flex justify-content-between tandc_btns">
                                        <Button className='w-100' variant='secondary' onClick={handlePdfDownloadClick}>Download</Button>
                                        <Button className='w-100 theme_btn' variant='primary' onClick={handlePrintClick}>Print</Button>
                                    </div>
                                </div>
                            </Col>
                            <Col lg="6" className="">
                                {/* <div className="left-side">
                                    <img src={tandcimg} alt="" />
                                    <h2 className="mt-3 text-center">View, chat, negotiate, and buy <span className='txt_bld'> content</span> instantly</h2>
                                </div> */}
                                <div className="right-side text-center position-relative">
                                    <div className="tri"></div>
                                    <div className="circle"></div>
                                    <div className="big_circle"></div>
                                    <img src={tandcimg} alt="" className="rt_img_bg" />
                                    <h2>Source <span className="txt_bld">authentic content</span> from millions of users</h2>
                                </div>
                            </Col>
                        </Row>
                    </div>
                </Container >
            </div >
            <DbFooter />
        </>
    )
}

export default PostPrivacyPolicy
