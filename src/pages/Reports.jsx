import React, { useState } from 'react'
import Header from "../component/Header"
import DbFooter from "../component/DbFooter"
import { Container, Row, Col, Tabs, Tab } from "react-bootstrap";
import AccountsReports from "../component/AccountsReports";
import ContentReports from "../component/ContentReports";
import TaskReports from "../component/TaskReports";
import TopSearchesTipsCard from "../component/card/TopSearchesTipsCard";
import { Select, MenuItem, FormControl } from '@mui/material';
import SortingDialog from '../popups/SortingDialog';
import { AiFillCaretDown, AiOutlineClose } from 'react-icons/ai';
import Fundsinvested from '../component/Sortfilters/Dashboard/Fundsinvested';
import TopFilterComn from '../component/Sortfilters/Content/TopFilterComn';
import ChartsSort from '../component/Sortfilters/Dashboard/ChartsSort';

const Reports = () => {
  const [selectedOption, setSelectedOption] = useState('');
  const [timeValues, setTimeValues] = useState("");
  const [open, setOpen] = useState(false);

  const [openSortComponent, setOpenSortComponent] = useState(false);
  const [openFilterComponent, setOpenFilterComponent] = useState(false);

  const timeValuesHandler = (values) => {
    setTimeValues(values)
  }

  const handleChange = (event) => {
    setSelectedOption(event.target.value);
  };

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  // open and close sort filter component-
  const handleCloseSortComponent = (values) => {
    setOpenSortComponent(values)
  }

  const handleCloseFilterComponent = (values) => {
    setOpenFilterComponent(values)
  }

  return (
    <>
      <Header />
      <div className="page-wrap all-reports-wrap">
        <Container fluid className='p-0'>
          <Row>
            <Col sm={12}>
              <div className="reportsConainter">
                <div className="reportsFilter mb-4 d-flex justify-content-end align-items-center">
                  <div className="relevanceSelecter me-4">
                    <FormControl>
                      {/* <div className="fltrs_prnt top_fltr">
                      <p className="lbl_fltr">
                          Filter
                        </p>
                        <button className='sortTrigger' onClick={() => {handleOpen(); setOpenFilterComponent(true);}}>Filter <AiFillCaretDown /></button>
                      <div className="fltrs_prnt top_fltr">
                        <p className="lbl_fltr">Filter</p>
                        <button className='sortTrigger' onClick={() => { handleOpen(); setOpenFilterComponent(true); }}>Filter <AiFillCaretDown /></button>
                        {
                          openFilterComponent && <TopFilterComn
                            closeFilterComponent={handleCloseFilterComponent}
                          />
                        }
                      </div> */}
                    </FormControl>
                  </div>
                  <div className="relevanceSelecter">
                    <FormControl>
                      <div className="fltrs_prnt top_fltr">
                        <p className="lbl_fltr">
                          Sort
                        </p>
                        <button
                          className='sortTrigger'
                          onClick={() => { setOpenSortComponent(true); }}
                        >
                          Sort <AiFillCaretDown />
                        </button>
                        {openSortComponent && (<ChartsSort
                          rangeTimeValues={timeValuesHandler}
                          closeSortComponent={() => setOpenSortComponent(false)}
                        />
                        )}
                      </div>
                    </FormControl>
                  </div>
                </div>
                <div className="rprts_wrap allContent_report theme_card">
                  <Tabs
                    defaultActiveKey="tasks"
                    id="uncontrolled-tab-example"
                    className="reports_tabs_opts">
                    <Tab eventKey="tasks" title="Tasks">
                      <TaskReports timeValuesProps={timeValues} />
                    </Tab>
                    <Tab eventKey="content" title="Content">
                      <ContentReports timeValuesProps={timeValues} />
                    </Tab>
                    {/* <Tab eventKey="accounts" title="Accounts">
                      <AccountsReports />
                    </Tab> */}
                  </Tabs>
                </div>

              </div>

            </Col>
          </Row>
          <div className="mt-4">
            <TopSearchesTipsCard />
          </div>
        </Container>
      </div >
      <DbFooter />
    </>
  )
}

export default Reports