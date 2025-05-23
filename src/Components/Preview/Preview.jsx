import React, { useEffect, useState } from "react";
import Layouts from "../Pages/Layouts/Layouts";
import "./preview.css";
import classnames from "classnames";
import loadingImg from "../../images/icons/Group 3.svg";
import fileImg from "../../images/icons/Excel-default.svg";

import contractPdf from './SRM Pharma Contract.pdf'
import pricingPdf from './Product_Pricing_Table.pdf'
import demoexcel from './demovalues.xlsx'


import {
  Accordion,
  AccordionBody,
  AccordionHeader,
  AccordionItem,
  Button,
  Col,
  Nav,
  NavItem,
  NavLink,
  Row,
  TabContent,
  TabPane,
} from "reactstrap";
import toast from "react-hot-toast";
import FileSaver from "file-saver";

const accordionData = [
  {
    name: "Contract Offer",
    data: Object.entries({
      author: "Admnistrator",
      customer: "39882",
      startDate: "7/1/2025",
      endDate: "6/30/2028",
      'document Id': "SM23457890",
      'document Name': "Premier Health Alliance Agreement",
      'document Type': "GPO",
      'document Status': "Active",
      'document Version Number': "DOC1.0",
      'document Version Creation Date': "5/23/2025",
      'contract Sub Type': "Contract",
      owner: "Administrator",
      programOnly: false,
      sourceType: "New",
    }),
  },
  {
    name: "Business Segment",
    data: Object.entries({
      'import Action': "add Modify",
      'business Segment Template Name': "Business Segment",
      'section Name': "Business Segment",
    }),
  },
  {
    name: "Product Group",
    data: Object.entries({
      'adjust By': "%",
      'category Pricing': "Pricing",
      'price List Name': "WAC",
      'pricing Method': "Tier",
      'number Of Tiers': 3,
    }),
  },
  {
    name: "Tiered LI",
    data: Object.entries({
     ' base Price': "$20,000",
      'product Number': "PR456678",
      'direct Or Indirect': "DIRECT",
      'minimum Order Quantity': 50000,
      'minimum Order Block': true,
      'minimumOrderPenalty': "$2,500",
    }),
  },
];


function Preview() {
  const [isLoading, setIsLoading] = useState(true);
  const [activeTab, setActiveTab] = useState("1");
  const [accordionOpen, setAccordionOpen] = useState("");

  const toggleTab = (tab) => {
    if (activeTab !== tab) {
      setActiveTab(tab);
    }
  };

  const toggleAccordion = (id) => {
    if (accordionOpen.includes(id)) {
      setAccordionOpen((prev) => prev.filter((item) => item !== id)); // remove if already open
    } else {
      setAccordionOpen((prev) => [...prev, id]); // add if not open
    }
  };

  useEffect(() => {
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
    }, 2000);
  }, []);

  const exportHandle =(data)=>{
    toast.success(`Successfully Downloaded as Excel`)
    FileSaver.saveAs(demoexcel,`Contract Excel`)
  }

  return (
    <Layouts>
      {isLoading ? (
        <>
          <div className="container my-5 p-0">
            <div className="w-50 m-auto text-center">
              <img src={loadingImg} className="loadingimg" />
              <h5 className="loading-info">
                <i>Getting your contract entities ready...</i>
              </h5>
            </div>
          </div>
        </>
      ) : (
        <div className="container-fluid position-relative">
          <Row>
            {/* Left Side: File Preview */}
            <Col md="8" className="left-nav">
              <Nav tabs className="pt-2 preview-nav">
                <NavItem>
                  <NavLink
                    className={classnames({
                      active: activeTab === "1",
                      "text-white": true,
                    })}
                    onClick={() => toggleTab("1")}
                    style={{ cursor: "pointer" }}
                  >
                    Contract - SRM Pharma Contract
                  </NavLink>
                </NavItem>
                <NavItem>
                  <NavLink
                    className={classnames({
                      active: activeTab === "2",
                      "text-white": true,
                    })}
                    onClick={() => toggleTab("2")}
                    style={{ cursor: "pointer" }}
                  >
                    Price- Product Pricing Table
                  </NavLink>
                </NavItem>
              </Nav>

              <TabContent
                activeTab={activeTab}
                className="bg-white p-4"
                style={{ minHeight: "100vh",overflow:'auto' }}
              >
                <TabPane tabId="1">
                    <iframe src={contractPdf} width={'100%'} height={'900px'}></iframe>
                </TabPane>
                <TabPane tabId="2">
                 <iframe src={pricingPdf} width={'100%'} height={'900px'}></iframe>
                </TabPane>
              </TabContent>
            </Col>

            {/* Right Side: Contract Entities */}
            <Col
              md="4"
              className="d-flex flex-column justify-content-between right-tab"
            >
              <div className="p-3 prev-acc-box">
                <h6 className="text-light mb-3">Contract Entities</h6>
               
               <div className="preview-acc-box">
                 <Accordion
                  open={accordionOpen}
                  toggle={toggleAccordion}
                  flush
                  className="preview-acc"
                >
                  {accordionData.map((detail, idx) => (
                    <AccordionItem key={idx}>
                        {
                            detail.name ==='Tiered LI' ? <>
                            <AccordionHeader targetId={String(idx)}>
                        {detail.name}
                      </AccordionHeader>
                      <AccordionBody accordionId={String(idx)}>
                        <ul className="acc-list-data tiered">
                          <li className="hdr">
                            <div className="d-flex justify-content-between">
                                <div className="ndc-num">
                                    <span>NDC Number</span>
                                    <h5>65483-1021-30</h5>
                                </div>
                                <div className="wac-price">
                                    <span>WAC Price</span>
                                    <h5 className="text-end">$425</h5>
                                </div>
                            </div>
                          </li>
                          <li className="split-li">
                            <div className="d-flex align-items-center justify-content-between tier-split">
                                <div className="">
                                    <h6>Tier 1</h6>
                                </div>
                                <div className="">
                                    <h6><span>Discount </span>: 10%</h6>
                                </div>
                                <div>
                                    <h6><span>Final Price</span> : $175.5</h6>
                                </div>
                            </div>
                          </li>
                          <li className="split-li">
                            <div className="d-flex align-items-center justify-content-between tier-split">
                                <div className="">
                                    <h6>Tier 2</h6>
                                </div>
                                <div className="">
                                    <h6><span>Discount </span>: 15%</h6>
                                </div>
                                <div>
                                    <h6><span>Final Price</span> : $165.8</h6>
                                </div>
                            </div>
                          </li>
                          <li className="split-li">
                            <div className="d-flex align-items-center justify-content-between tier-split">
                                <div className="">
                                    <h6>Tier 3</h6>
                                </div>
                                <div className="">
                                    <h6><span>Discount </span>: 20%</h6>
                                </div>
                                <div>
                                    <h6><span>Final Price</span> : $156</h6>
                                </div>
                            </div>
                          </li>
                        </ul>
                        {/* <ul className="acc-list-data tiered">
                          <li className="hdr">
                            <div className="d-flex justify-content-between">
                                <div className="ndc-num">
                                    <span>NDC Number</span>
                                    <h5>65483-1021-30</h5>
                                </div>
                                <div className="wac-price">
                                    <span>WAC Price</span>
                                    <h5 className="text-end">$200</h5>
                                </div>
                            </div>
                          </li>
                          <li className="split-li">
                            <div className="d-flex align-items-center justify-content-between tier-split">
                                <div className="">
                                    <h6>Tier 1</h6>
                                </div>
                                <div className="">
                                    <h6><span>Discount </span>: 10%</h6>
                                </div>
                                <div>
                                    <h6><span>Final Price</span> : $180</h6>
                                </div>
                            </div>
                          </li>
                          <li className="split-li">
                            <div className="d-flex align-items-center justify-content-between tier-split">
                                <div className="">
                                    <h6>Tier 2</h6>
                                </div>
                                <div className="">
                                    <h6><span>Discount </span>: 15%</h6>
                                </div>
                                <div>
                                    <h6><span>Final Price</span> : $170</h6>
                                </div>
                            </div>
                          </li>
                          <li className="split-li">
                            <div className="d-flex align-items-center justify-content-between tier-split">
                                <div className="">
                                    <h6>Tier 3</h6>
                                </div>
                                <div className="">
                                    <h6><span>Discount </span>: 20%</h6>
                                </div>
                                <div>
                                    <h6><span>Final Price</span> : $160</h6>
                                </div>
                            </div>
                          </li>
                        </ul> */}
                      </AccordionBody>
                            
                            </> :<>
                            <AccordionHeader targetId={String(idx)}>
                        {detail.name}
                      </AccordionHeader>
                      <AccordionBody accordionId={String(idx)}>
                        <ul className="acc-list-data">
                          {detail.data.map(([key, value], index) => (
                            <li key={index}>
                              <span className="text-capitalize">{key}:</span> {String(value)}
                            </li>
                          ))}
                        </ul>
                      </AccordionBody>
                            </>
                        }
                      
                    </AccordionItem>
                  ))}
                </Accordion>
               </div>
                 
              </div>

              {/* Export Buttons */}
             <div className="p-3 d-flex justify-content-evenly  gap-2 export-btn">
                <Button
                  className="exportxl-btn"
                  
                  onClick={()=>exportHandle('Pricing')}
                >
                  <img src={fileImg}/> Export as
                  Excel
                </Button>
                <Button
                  className="exportxl-btn"
                >
                 <img src={fileImg}/> Export as XML
                </Button>
              </div>
            </Col>
          </Row>
        </div>
      )}
    </Layouts>
  );
}

export default Preview;
