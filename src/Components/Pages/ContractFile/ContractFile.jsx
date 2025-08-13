import React, { useEffect, useRef, useState } from 'react'
import Layouts from '../Layouts/Layouts'
import './contractfile.css'
import { Col, Row } from 'reactstrap'
import uploadLight from'./../../../images/icons/uploadlight.svg'
import uploadImg from '../../../images/icons/upload-ico.svg'
import editImg from "../../../images/icons/edit-02.svg";
import minusImg from "../../../images/icons/minus-circle.svg";
import addFiles from "../../../images/icons/add_files.svg";
import fileImg from "../../../images/icons/file-06.svg";
import fileCheckImg from "../../../images/icons/file-check.svg";
import fileSearchImg from "../../../images/icons/file-search.svg";
import { useLocation, useNavigate } from 'react-router-dom'
import request from '../../../api/api'
import axios from 'axios'
import { useDispatch } from 'react-redux'
import { saveContracts } from '../../redux/features/contractSlice'
import toast from 'react-hot-toast'
import { format } from 'date-fns'
import { useTheme } from '../../../Themecontext'

function ContractFile() {
  const dispatch = useDispatch()
    const navigate = useNavigate()
    const location = useLocation()
    const [isLoading,setIsLoading]= useState(true)
    const [contractList,setContractList] = useState([])
        const { theme, toogleTheme } = useTheme();

    const [isExtracting, setIsExtracting] = useState(false);
    const isProcessed = useRef(false);

    const getContractList = async()=>{
      setIsLoading(true)
      request({
        url:'/icontract/backend/columns/names',
        method:'GET'
      }).then((res)=>{
        setIsLoading(false)
        setContractList(res.data)
        dispatch(saveContracts(res.data))
      }).catch((err)=>{
        console.log(err)
        setIsLoading(false)
       })
    }

    useEffect(()=>{
      getContractList()

      if (!isProcessed.current && location?.state?.fromUpload && location?.state?.files?.length > 0) {
        isProcessed.current = true;
      const extractContracts = async () => {
        setIsExtracting(true);

        for (const li of location?.state?.files) {
          const formData = new FormData();
          formData.append("file", li.file);

          try {
            await axios.post("https://intell-ai.srm-tech.com/icontract/process_contract", formData);
          } catch (err) {
            console.error("Extraction failed for:", li.file.name);
            toast.error(`Failed to extract: ${li.file.name}`);
          }
        }

        setIsExtracting(false);
        toast.success("Extraction completed");
        navigate('/list',{replace:true,state:{}})
        getContractList(); // 🔁 refresh list
      };

      extractContracts();
    }
    },[])



    const sendtoPreview =(contract,version)=>{
      console.log(contract,version)
      navigate('/list/preview',{state:{contractNum:contract,version:version}})
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
        <div className="list-card-contract"></div>
        <Row>
          <Col className="" lg="12">
            <div className="contract-file-list">
              <div className="list-head">
                <h5>{contractList?.length} Contract Documents</h5>
                <div className="d-flex align-items-center">
                  <div className='me-4'>
                    <Row>
                      {/* <Col lg="4">
                        <div className="total-contract ">
                          <div className="count-round blue">
                            <img src={fileImg} />
                          </div>
                          <div className="count-result">
                            <h5 className="head">Total Contract</h5>
                            <h3 className="result">{contractList?.length}</h3>
                          </div>
                        </div>
                      </Col> */}
                      <Col >
                        <div className="total-contract">
                          <div className="count-round green">
                            <img src={fileCheckImg} />
                          </div>
                          <div className="count-result">
                            <h5 className="head">Ready for Review</h5>
                            <h3 className="result">{contractList?.length}</h3>
                          </div>
                        </div>
                      </Col>
                      <Col >
                        <div className="total-contract ">
                          <div className="count-round orange">
                            <img src={fileSearchImg} />
                          </div>
                          <div className="count-result">
                            <h5 className="head">Processing Contracts</h5>
                            <h3 className="result">{location?.state?.files?.length ?? 0}</h3>
                          </div>
                        </div>
                      </Col>
                    </Row>
                    
                  </div>
                  <div>
                      <button
                        className="contract-upld-btn"
                        onClick={() => navigate("/list/upload")}
                      >
                        <img src={theme==="Dark"?uploadImg:uploadLight} />
                        Upload More Docs
                      </button>
                    </div>
                </div>
              </div>
              <div>
                <table className="Table-contract-list">
                  <thead>
                    <tr className="table-row">
                      {/* <th scope="col" className="check-box-table">
                        <input type="checkbox" />
                      </th> */}
                      <th scope="col" className="doc-box">
                        Document Name
                      </th>
                      <th scope="col text-center" className="id-box">
                        Document ID
                      </th>
                      <th scope="col text-center" className="type-box">
                        Doc Type
                      </th>
                      <th scope="col text-center" className="ver-box">
                        Ver. Number
                      </th>
                      <th scope="col text-center" className="ver-box">
                        Start Date
                      </th>
                      <th scope="col text-center" className="ver-box">
                        End Date
                      </th>
                      <th scope="col text-center" className="ver-box">
                        Customer
                      </th>
                      <th scope="col text-center" className="ver-box">
                        Author
                      </th>
                      <th scope="col text-center" className="ver-box">
                        Created On
                      </th>
                      <th scope="col text-center" className="status-box">
                        Status
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {
                      isExtracting ? 
                      location?.state?.files.length>0 && location?.state?.files?.map((li)=>{
                        return <tr
                            className="contract-result-list"
                          >
                            <td className="doc-box">{li?.file?.name}</td>
                            <td className="id-box text-center">-</td>
                            <td className="type-box text-center">-</td>
                            <td className="ver-box text-center">-
                            </td>
                            <td className="ver-box text-center">-</td>
                            <td className="ver-box text-center">-</td>
                            <td className="ver-box text-center">-</td>
                            <td className="ver-box text-center">-</td>
                            <td className="ver-box text-center">-</td>
                            <td className="status-box text-center ">
                              <span className='analyse'>Analyzing Document...</span>
                            </td>
                          </tr>
                      })
                       :''
                    }
                    {isLoading ? (
                      <div>Loading...</div>
                    ) : (
                      contractList?.length > 0 &&
                      contractList?.map((doc) => {
                        return (
                          <tr
                            onClick={() => sendtoPreview(doc?.contract_number,doc?.document_version_number)}
                            className="contract-result-list"
                          >
                            {/* <th scope="col">
                        <input type="checkbox" />
                      </th> */}
                            <td className="doc-box">{doc?.document_name}</td>
                            <td className="id-box text-center">{doc?.contract_number}</td>
                            <td className="type-box text-center">{doc?.document_type}</td>
                            <td className="ver-box text-center">
                              {doc?.document_version_number}
                            </td>
                            <td className="ver-box text-center">{doc?.start_date}</td>
                            <td className="ver-box text-center">{doc?.end_date}</td>
                            <td className="ver-box text-center">{doc?.owner}</td>
                            <td className="ver-box text-center">{doc?.author}</td>
                            <td className="ver-box text-center">{doc?.created_at && format(new Date(doc?.created_at),'dd-MM-yyyy')}</td>
                            <td className="status-box text-center">
                             <span className='review'>{doc?.document_status ==="Active"? "Ready for Review" :''}</span>
                            </td>
                          </tr>
                        );
                      })
                    )}
                    
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