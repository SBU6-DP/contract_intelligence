import React, { useEffect, useState } from "react";
import Layouts from "../Pages/Layouts/Layouts";
import "./preview.css";
import classnames from "classnames";
import loadingImg from "../../images/icons/Group 3.svg";
import fileImg from "../../images/icons/Excel-default.svg";

import contractPdf from './SRM Pharma Contract.pdf'
import pricingPdf from './Product_Pricing_Table.pdf'
import demoexcel from './ContractEntities.xlsx'


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
import request from "../../api/api";
import { useLocation } from "react-router-dom";
import * as XLSX from 'xlsx';
import { saveAs } from 'file-saver';

const result = {
  "result": {
    "Contract Offer": [
      {
        "field": "startDate",
        "answer": "2025/07/01"
      },
      {
        "field": "endDate",
        "answer": "2030/06/30"
      },
      {
        "field": "document Id",
        "answer": "PPPH18SR01"
      },
      {
        "field": "document Name",
        "answer": "Premier Health Alliance Agreement with SRM Pharmaceuticals"
      },
      {
        "field": "document Type",
        "answer": "GROUP"
      },
      {
        "field": "document Status",
        "answer": "Active"
      },
      {
        "field": "document Version Number",
        "answer": "1"
      },
      {
        "field": "document Version Creation Date",
        "answer": "5/23/2025"
      },
      {
        "field": "owner",
        "answer": "Administrator"
      },
      {
        "field": "program only",
        "answer": "NO"
      },
      {
        "field": "source type",
        "answer": "NEW"
      }
    ],
    "Product Group": [
      {
        "field": "adjust By",
        "answer": "%"
      },
      {
        "field": "category Pricing",
        "answer": "PRICE"
      },
      {
        "field": "price List Name",
        "answer": "WAC"
      },
      {
        "field": "Pricing Method",
        "answer": "TIER"
      },
      {
        "field": "Number of Tiers",
        "answer": "3"
      }
    ]
  }
}

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
      'owner': "Administrator",
      'program Only': false,
      'source Type': "New",
    }),
  },
  // {
  //   name: "Business Segment",
  //   data: Object.entries({
  //     'import Action': "add Modify",
  //     'business Segment Template Name': "Business Segment",
  //     'section Name': "Business Segment",
  //   }),
  // },
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
  const location = useLocation()
  const [isLoading, setIsLoading] = useState(true);
  const [activeTab, setActiveTab] = useState("1");
  const [accordionOpen, setAccordionOpen] = useState("");
  const [responseData,setResponseData] = useState({})
  const [contractOffer,setContractOffer] = useState([])
  const [productGroup,setProductGroup] = useState([])
  const { files } = location.state || {};

const [contractUrl, setContractUrl] = useState('');
const [priceUrl, setPriceUrl] = useState('');

  

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

  const fetchPreviewData = ()=>{
    request({
      url:'/extract-fields',
      method:'POST',
    }).then((res)=>{
        setResponseData(res.result)
        setContractOffer(res.result['Contract Offer'])
        setProductGroup(res.result['Product Group'])
    }).catch((err)=>{
      setContractOffer(result.result['Contract Offer'])
      setProductGroup(result.result['Product Group'])
      console.log(err)
    })
  }

  useEffect(()=>{
    fetchPreviewData()
  },[])

  useEffect(() => {
  if (files?.contract) {
    setContractUrl(URL.createObjectURL(files.contract));
  }
  if (files?.price) {
    setPriceUrl(URL.createObjectURL(files.price));
  }

  return () => {
    // Revoke URLs on cleanup
    if (contractUrl) URL.revokeObjectURL(contractUrl);
    if (priceUrl) URL.revokeObjectURL(priceUrl);
  };
}, [files]);

const exportResultToExcel = () => {
  toast.loading('Downloading....')
  if(responseData?.result){
const dataSections = responseData?.result || result.result;
  const combinedSheetData = [];

  Object.entries(dataSections).forEach(([sectionName, data]) => {
    if (!Array.isArray(data)) return;

    // Section heading
    combinedSheetData.push({ Field: sectionName.toUpperCase(), Answer: '' });

    // Rows for this section
    data.forEach(({ field, answer }) => {
      combinedSheetData.push({ Field: field, Answer: answer });
    });

    // Add an empty row between sections
    combinedSheetData.push({});
  });

  const workbook = XLSX.utils.book_new();
  const worksheet = XLSX.utils.json_to_sheet(combinedSheetData);
  XLSX.utils.book_append_sheet(workbook, worksheet, 'Combined');

  const excelBuffer = XLSX.write(workbook, {
    bookType: 'xlsx',
    type: 'array',
  });

  const blob = new Blob([excelBuffer], {
    type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
  });

  toast.remove()
 toast.success('Downloaded Successfully')

  saveAs(blob, 'Contract_Result.xlsx');
  }else{
    toast.remove()
    toast.success('Downloaded Successfully')
    saveAs(demoexcel,'Contract_Result')
  }
  
};

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
                    <iframe src={contractUrl? `${contractUrl}`:contractPdf} width={'100%'} height={'900px'}></iframe>
                </TabPane>
                <TabPane tabId="2">
                 <iframe src={priceUrl? `${priceUrl}` :pricingPdf} width={'100%'} height={'900px'}></iframe>
                </TabPane>
              </TabContent>
            </Col>

            {/* Right Side: Contract Entities */}
            <Col
              md="4"
              className="d-flex flex-column justify-content-between right-tab"
            >
              <div className="p-3 prev-acc-box">
                <h6 className="text-light mb-3 acc-head">Contract Entities</h6>
               
               <div className="preview-acc-box">
                 <Accordion
                  open={accordionOpen}
                  toggle={toggleAccordion}
                  flush
                  className="preview-acc"
                >
                  <AccordionItem>
                    <AccordionHeader targetId={1}>
                        Contract Offer
                      </AccordionHeader>
                      <AccordionBody accordionId={1}>
                        <ul className="acc-list-data">
                          {contractOffer.map((data, index) => (
                            <li key={index}>
                              <span className="text-capitalize">{data.field}:</span> {String(data.answer)}
                            </li>
                          ))}
                        </ul>
                      </AccordionBody>
                  </AccordionItem>
                  <AccordionItem>
                    <AccordionHeader targetId={2}>
                       Product Group
                      </AccordionHeader>
                      <AccordionBody accordionId={2}>
                        <ul className="acc-list-data">
                          {productGroup.map((data, index) => (
                            <li key={index}>
                              <span className="text-capitalize">{data.field}:</span> {String(data.answer)}
                            </li>
                          ))}
                        </ul>
                      </AccordionBody>
                  </AccordionItem>
                  {accordionData.map((detail, idx) => (
                    <AccordionItem key={idx}>
                        {
                            detail.name ==='Tiered LI' ? <>
                            <AccordionHeader targetId={3}>
                        {detail.name}
                      </AccordionHeader>
                      <AccordionBody accordionId={3}>
                        <ul className="acc-list-data tiered">
                          <li className="hdr">
                            <div className="d-flex justify-content-between">
                                <div className="ndc-num">
                                    <span>NDC Number</span>
                                    <h5>65483-1021-30</h5>
                                </div>
                                <div className="wac-price">
                                    <span>WAC Price</span>
                                    <h5 className="text-end">$195</h5>
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
                        <ul className="acc-list-data tiered">
                          <li className="hdr">
                            <div className="d-flex justify-content-between">
                                <div className="ndc-num">
                                    <span>NDC Number</span>
                                    <h5>65483-2041-60</h5>
                                </div>
                                <div className="wac-price">
                                    <span>WAC Price</span>
                                    <h5 className="text-end">$425</h5>
                                </div>
                            </div>
                          </li>
                          {/* <li className="split-li">
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
                          </li> */}
                        </ul>
                      </AccordionBody>
                            
                            </> : ''
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
                  
                  onClick={()=>exportResultToExcel('Pricing')}
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
