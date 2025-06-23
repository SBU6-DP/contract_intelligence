import React, { useEffect, useState } from 'react'
import Layouts from '../Layouts/Layouts'
import './contractfile.css'
import { Col, Row } from 'reactstrap'

import uploadImg from '../../../images/icons/upload-ico.svg'
import editImg from "../../../images/icons/edit-02.svg";
import minusImg from "../../../images/icons/minus-circle.svg";
import addFiles from "../../../images/icons/add_files.svg";
import fileImg from "../../../images/icons/file-06.svg";
import fileCheckImg from "../../../images/icons/file-check.svg";
import fileSearchImg from "../../../images/icons/file-search.svg";
import { useNavigate } from 'react-router-dom'
import request from '../../../api/api'
import axios from 'axios'

function ContractFile() {
    const navigate = useNavigate()
    const [isLoading,setIsLoading]= useState(true)
    const [contractList,setContractList] = useState([])

    const getContractList = async()=>{
      setIsLoading(true)
      request({
        url:'/icontract/backend/columns/names'
      }).then((res)=>{
        setIsLoading(false)
        setContractList(res.data)
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


    const sendtoPreview =(contract)=>{
      navigate('/list/preview',{state:{contractNum:contract}})
    }

  return (
    <Layouts>
        {/* <div className='px-4 pt-3'>
            <div className="list-head">
                <h5>Contract Documents</h5>
                <div>
                  <button className='contract-upld-btn' onClick={()=>navigate('/list/upload')}><img src={uploadImg} />Upload Contract Docs</button>
                </div>
              </div>
        <div className="no-trail-found">
          <div className="no-trail-container">
            <div>
              <img src={addFiles}/>
            </div>
            <div className="no-trail">No Clinical Trials Found</div>
            <div className="no-trail-start">
              Start by clicking the “Add Clinical Trial” button to set up your
              first study and define its eligibility criteria.
            </div>
          </div>
        </div>
        </div> */}
      <div className="list-container">
        <div className='list-card-contract'>
            <Row>
                <Col lg='4'>
                    <div className='total-contract '>
                        <div className='count-round blue'>
                            <img src={fileImg}/>
                        </div>
                        <div className='count-result'>
                            <h5 className='head'>Total Contract</h5>
                            <h3 className='result'>{contractList?.length}</h3>
                        </div>
                    </div>
                </Col>
                <Col lg='4'>
                    <div className='total-contract '>
                        <div className='count-round green'>
                            <img src={fileCheckImg}/>
                        </div>
                        <div className='count-result'>
                            <h5 className='head'>Ready for Review</h5>
                            <h3 className='result'>{contractList?.length}</h3>
                        </div>
                    </div>
                </Col>
                <Col lg='4'>
                    <div className='total-contract '>
                        <div className='count-round orange'>
                            <img src={fileSearchImg}/>
                        </div>
                        <div className='count-result'>
                            <h5 className='head'>Processing Contract</h5>
                            <h3 className='result'>0</h3>
                        </div>
                    </div>
                </Col>
            </Row>
        </div>
        <Row>
          <Col className="" lg="12">
            <div className="contract-file-list">
              <div className="list-head">
                <h5>Contract Documents</h5>
                <div>
                  <button className='contract-upld-btn' onClick={()=>navigate('/list/upload')}><img src={uploadImg}/>Upload More Docs</button>
                </div>
              </div>
              <div>
                 <table className="Table-contract-list">
                  <thead>
                    <tr className="table-row">
                      <th scope="col" className="check-box-table">
                        <input type="checkbox" />
                      </th>
                      <th scope="col" className="doc-box">
                        Document Name
                      </th>
                      <th scope="col" className="id-box">
                       Document ID
                      </th>
                      <th scope="col" className="type-box">
                        Doc Type
                      </th>
                      <th scope="col" className="ver-box">
                        Ver. Number
                      </th>
                      <th scope="col" className="ver-box">
                        Start Date
                      </th>
                       <th scope="col" className="ver-box">
                        End Date
                      </th>
                       <th scope="col" className="ver-box">
                        Customer
                      </th>
                      <th scope="col" className="ver-box">
                        Author
                      </th>
                      <th scope="col" className="status-box">
                       Status
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {
                      isLoading ? <div>Loading...</div> : (
                        contractList.length>0 && contractList?.map((doc)=>{
                            return <tr onClick={()=>sendtoPreview(doc?.contract_number)} className='contract-result-list'>
                      <th scope="col">
                        <input type="checkbox" />
                      </th>
                      <td className="doc-box">{doc?.document_name}</td>
                      <td className="id-box">{doc?.contract_number}</td>
                      <td className="type-box">{doc?.document_type}</td>
                      <td className="ver-box">{doc?.document_version_number}</td>
                      <td className="ver-box">{doc?.start_date}</td>
                      <td className="ver-box">{doc?.end_date}</td>
                      <td className="ver-box">{doc?.owner}</td>
                      <td className="ver-box">{doc?.author}</td>
                      <td className="status-box">{doc?.document_status}</td>
                      
                    </tr>
                        })
                      )
                    }
                    

                  </tbody>
                </table>
              </div>
            </div>
          </Col>
          <Col className="" lg="4"></Col>
        </Row>
      </div>
    </Layouts>
  );
}

export default ContractFile