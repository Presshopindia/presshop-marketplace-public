import Header from "../component/Header"
import DbFooter from "../component/DbFooter"
import { Col, Container, Row } from "react-bootstrap"
import { useState } from "react"
import { Link } from "react-router-dom"
import { BsArrowLeft } from "react-icons/bs"
import { DateRangePicker } from 'react-date-range';


const ArchieveDates = () => {

    const [selectionRange, setSelectionRange] = useState({
        startDate: new Date(),
        endDate: new Date(),
        key: 'selection',
    });

    const handleSelect = (ranges) => {
        // console.log("ranges123123", ranges);
        setSelectionRange({ startDate: ranges?.selection?.startDate, endDate: ranges?.selection?.endDate, key: "selection" })
    };


    return (
        <>
            <Header />
            <div className="feedTags_search">
                <Container fluid>
                    <Row>
                        <Col sm={12}>
                            <div className="feedPreviews d-flex justify-content-between align-items-center">
                                <div className="FundsfeedHdTags_wrap">
                                    <Link className="backtoLink" onClick={() => history.back()}>
                                        <BsArrowLeft className="text-pink" /> Back
                                    </Link>
                                </div>
                            </div>
                        </Col>
                    </Row>
                </Container>
            </div>
            <div className="page-wrap dashb_page">
                <Container fluid>
                    <h1>Archived items</h1>
                    <div className="archivesWrap">
                        <DateRangePicker
                            ranges={[selectionRange]}
                            onChange={handleSelect}
                        />
                        <div className="text-center">
                            <Link className="btn MuiButton-primary" to={`/archieve-items/:${new Date(selectionRange.startDate).toISOString()}/:${new Date(selectionRange.endDate).toISOString()}`}>Check Archived Items</Link>
                        </div>
                    </div>
                </Container >

            </div >
            <DbFooter />
        </>

    )
}

export default ArchieveDates