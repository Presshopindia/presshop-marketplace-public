import React, { memo } from "react";
import Container from "react-bootstrap/Container";
import Navbar from "react-bootstrap/Navbar";
import LogoBlack1 from "../assets/images/darkLogo.png";
// import { Link } from "react-router-dom";
import Nav from "react-bootstrap/Nav";
import { NavLink, Link } from "react-router-dom";
const HeaderNPost = ({ scrollToDiv }) => {
    return (
        <>
            <Navbar className="headerNav">
                <Container fluid className="justify-content-between align-items-center cont-pdng p-0">
                    <div className="logo-wrap">
                        <Navbar.Brand>
                            <Link to={'/landing-page'}>
                                <img src={LogoBlack1} alt="Presshop" />
                            </Link>
                        </Navbar.Brand>
                    </div>
                    <div className="nav-right">
                        <Navbar.Toggle aria-controls="basic-navbar-nav" />
                        <Navbar.Collapse id="basic-navbar-nav">
                            <Nav className="me-auto center-links lndg_nav_links">
                                <NavLink to={'/dashboard/exclusive'} className="active nav-link">
                                    Dashboard
                                </NavLink>
                                <NavLink onClick={() => scrollToDiv('div1')} className="active nav-link">
                                    About Presshop
                                </NavLink>
                                <NavLink onClick={() => scrollToDiv('div2')} className="nav-link">
                                    Platform
                                </NavLink>
                                <NavLink onClick={() => scrollToDiv('div3')} className="nav-link">
                                    Features
                                </NavLink>
                                <NavLink onClick={() => scrollToDiv('div4')} className="nav-link">
                                    Reports
                                </NavLink>
                                <NavLink onClick={() => scrollToDiv('div5')} className="nav-link">
                                    FAQs
                                </NavLink>
                            </Nav>
                        </Navbar.Collapse>
                    </div>
                </Container>
            </Navbar>
        </>
    );
};

export default memo(HeaderNPost);