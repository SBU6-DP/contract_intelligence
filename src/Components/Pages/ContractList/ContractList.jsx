import React, { useEffect, useState } from "react";
import Layouts from "../Layouts/Layouts";
import './contractlist.css'

import maximize from "../../../images/icons/maximize.svg";
import request from "../../../api/api";
import serachImg from '../../../images/icons/search-sm.svg'
import { Badge, Nav, NavItem, NavLink } from "reactstrap";

function ContractList() {

  const [isLoading,setIsLoading]= useState(true)
    const [contractList,setContractList] = useState([])
    const [activeTab,setActiveTab] = useState(1)

    const getContractList = ()=>{
      setIsLoading(true)
      request({
        url:'/contract',
        method:'GET'
      }).then((res)=>{
        setIsLoading(false)
          setContractList(res)
      }).catch((err)=>{
        console.log(err)
        setIsLoading(false)
        // setContractList([
        //     {
        //       contract_number: "PPPH18SR01",
        //       agreement_number: "NP-PHA-2025-C4761",
        //       pharma_company: "SRM Pharmaceuticals, Inc.",
        //       channel_partner_name: "Premier Health Alliance, LLC",
        //       channel_partner_type: "GPO",
        //       start_date: "2025-07-01",
        //       end_date: "2025-10-31",
        //       contract_status: "Active",
        //       document_path: null,
        //       author: "Administrator",
        //       document_name:
        //         "Premier Health Alliance Agreement with SRM Pharmaceuticals",
        //       document_type: "GPO",
        //       document_status: "Active",
        //       document_version_number: "1",
        //       document_version_creation_date: "2025-07-01",
        //       contract_sub_type: "Contract",
        //       owner: "Administrator",
        //       program_only: 0,
        //       source_type: "NEW",
        //       adjust_by: "%",
        //       category_pricing: "PRICE",
        //       price_list_name: "WAC",
        //       pricing_method: "Tier",
        //       number_of_tiers: 3,
        //       created_at: "2025-06-17T09:21:22",
        //       updated_at: "2025-06-17T09:21:22",
        //     },
        //   ]);
      })
    }

    useEffect(()=>{
      getContractList()
    },[])
  return (
    <Layouts>
        <div class="container-fluid contract-list">
      <div class="contract-search-box">
          <div className="search-box-head">
            <h3>Contract Documents</h3>
          </div>
          <div className="search-box">
            <img src={serachImg}/>
            <input className="contract-search-inp" placeholder="Search"/>
          </div>
          <div>
            
            <div className="contract-doc-list">
              <label class="checkbox-container">
                      <input type="checkbox" />
                      <span class="custom-checkbox"></span>
                    </label>
              <div className="doc-name-id">
                <h5 className="name">
                  PBM_Contract_Amgen_2025_Q1_v1.0.pdf
                </h5>
                <h5 className="id">
                  SM125678
                </h5>
              </div>
            </div>
            <div className="contract-doc-list">
              <label class="checkbox-container">
                      <input type="checkbox" />
                      <span class="custom-checkbox"></span>
                    </label>
              <div className="doc-name-id">
                <h5 className="name">
                  PBM_Contract_Amgen_2025_Q1_v1.0.pdf
                </h5>
                <h5 className="id">
                  SM125678
                </h5>
              </div>
            </div>
            <div className="contract-doc-list">
              <label class="checkbox-container">
                      <input type="checkbox" />
                      <span class="custom-checkbox"></span>
                    </label>
              <div className="doc-name-id">
                <h5 className="name">
                  PBM_Contract_Amgen_2025_Q1_v1.0.pdf
                </h5>
                <h5 className="id">
                  SM125678
                </h5>
              </div>
            </div>
          </div>
      </div>
      <div class="contract-details-box">
        <div className="details-head">
            <h3>Contract Details</h3>
            <div>
                <img src={maximize}/>
            </div>
        </div>
        <div className="contract-tabs-container">
                <Nav tabs className="contract-profile-tabs">
                  <NavItem>
                    <NavLink
                      NavLink
                      onClick={() => setActiveTab(1)}
                      className={`nav-link ${
                        activeTab === 1 ? "active" : ""
                      }`}
                    >
                      Profile Overview
                    </NavLink>
                  </NavItem>
                  <NavItem>
                    <NavLink
                      onClick={() => setActiveTab(2)}
                      className={`nav-link ${
                        activeTab === 2 ? "active" : ""
                      }`}
                    >
                      Publication & Insights
                    </NavLink>
                  </NavItem>
                  <NavItem>
                    <NavLink
                      onClick={() => setActiveTab(3)}
                      className={`nav-link ${
                        activeTab === 3 ? "active" : ""
                      }`}
                    >
                      Engagement Triggerers{" "}
                      <Badge color="light" className="ai-badge">
                        ⚡ AI Generated
                      </Badge>
                    </NavLink>
                  </NavItem>
                </Nav>
              </div>
      </div>
      <div class="tier-details-box">3</div>
      <div class="pricing-table-box">4</div>
    </div>
    </Layouts>
  );
}

export default ContractList;
