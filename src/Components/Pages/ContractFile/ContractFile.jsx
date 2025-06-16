import React from 'react'
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

function ContractFile() {
    const navigate = useNavigate()
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
                            <h3 className='result'>1</h3>
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
                            <h3 className='result'>1</h3>
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
                      <th scope="col" className="status-box">
                       Status
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr onClick={()=>navigate('/list/preview')} className='contract-result-list'>
                      <th scope="col">
                        <input type="checkbox" />
                      </th>
                      <td className="doc-box">SRM Pharma Contract</td>
                      <td className="id-box">IOP890</td>
                      <td className="type-box">PDF</td>
                      <td className="ver-box">1.0.0</td>
                      <td className="status-box">Completed</td>
                      
                    </tr>

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