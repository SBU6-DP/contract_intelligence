import React, { useState } from "react";
import "./chat.css";
import Layouts from "../Layouts/Layouts";
import { useMsal } from "@azure/msal-react";
import externalLink from "../../../images/icons/external-link.svg";
import logo from "../../../images/icons/SRM_chat-logo.svg";
import pdfRedIcon from "../../../images/icons/pdf-red-icon.svg";
import close from "../../../images/icons/x-close.svg";
import maximize from "../../../images/icons/maximize.svg";
import pricingPdf from "./Product_Pricing_Table.pdf";
import { Modal, ModalBody, ModalHeader } from "reactstrap";
import request from "../../../api/api";
import { useDispatch, useSelector } from "react-redux";
import ReactMarkdown from 'react-markdown';
import {
  addMessageByBot,
  addMessageByUser,
} from "../../redux/features/chat.bot";
import axios from "axios";

const messages = [
  {
    question: "who are all the teams in the formula 1?",
    thread_id: "memory-test",
  },
  {
    answer:
      "As of the 2023 Formula 1 season, there are 10 teams competing in the championship. Here is the list of teams:\n\n1. Mercedes-AMG Petronas Motorsport (Mercedes)\n2. Scuderia Ferrari (Ferrari)\n3. Red Bull Racing (Red Bull)\n4. McLaren F1 Team (McLaren)\n5. Alpine F1 Team (Alpine)\n6. Aston Martin Aramco Cognizant Formula One Team (Aston Martin)\n7. Scuderia AlphaTauri (AlphaTauri)\n8. Williams Racing (Williams)\n9. Haas F1 Team (Haas)\n10. Alfa Romeo F1 Team (Alfa Romeo)\n\nNote: In 2024, Alfa Romeo will be rebranded to Audi, and the team will be known as Audi F1 Team.\n\nPlease keep in mind that team names, sponsors, and liveries can change from season to season, so this information might not be valid in the future.",
    thread_id: "memory-test",
  },
];

function Chat() {
  const { chatMessages } = useSelector((state) => state.chat);
  const dispatch = useDispatch();
  const { instance, accounts } = useMsal();
  const [isMaxi, setIsMaxi] = useState(false);
  const [isPdfPreview, setIsPdfPreview] = useState(false);
  const [messages, setMessages] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [sendMessage, setSendMessage] = useState("");
  const[pdfUrl,setPdfUrl]= useState('')

  const chatMessage = () => {
    setIsLoading(true);
    dispatch(addMessageByUser(sendMessage));
    axios.post('https://intell-chatbot.srm-tech.com/icontract/chatbot/ask',{question:sendMessage}).then((res) => {
        setIsLoading(false);
        setSendMessage("");
        // setMessages(res?.data?.);
        dispatch(addMessageByBot(res?.data))
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const loadPdf =(filename)=>{
   axios.post(`https://icontract.srm-tech.com/icontract/backend/download/${filename}`).then((res)=>{
        setIsPdfPreview(!isPdfPreview)
        setPdfUrl(res)
    }).catch((err)=>{
        console.log(err)
    })
  }

  const renderBulletPoints = (text) => {
  const lines = text.split("\n").filter(line => line.trim() !== "");
  const bullets = lines.filter(line => line.trim().startsWith("-"));
  const otherText = lines.filter(line => !line.trim().startsWith("-"));

  return (
    <>
      {otherText.length > 0 && <p>{otherText[0]}</p>}
      <ul>
        {bullets.map((line, idx) => (
          <li key={idx} dangerouslySetInnerHTML={{ __html: line.replace(/^- /, "") }} />
        ))}
      </ul>
      {otherText.length > 1 && <p>{otherText.slice(1).join(" ")}</p>}
    </>
  );
};


  return (
    <Layouts>
      <div className="main-chat-box">
        <div className={`container chat ${isPdfPreview ? "preview" : ""}`}>
          <div className="chat-box">
            {chatMessages.length <= 0 ? (
              <div className="initial-chat">
                <h1 className="chat-user">
                  Hi, {accounts[0]?.name ?? "User"}!
                </h1>
                <h1 className="chat-help">How can I help you?</h1>
                <div className="initial-question">
                  <div className="row">
                    <div className="col-4">
                      <div className="q-box">
                        <h6>Explain how rebate tiers are calculated?</h6>
                        <div className="text-end ex-link">
                          <img src={externalLink} />
                        </div>
                      </div>
                    </div>
                    <div className="col-4">
                      <div className="q-box">
                        <h6>Explain how rebate tiers are calculated?</h6>
                        <div className="text-end ex-link">
                          <img src={externalLink} />
                        </div>
                      </div>
                    </div>
                    <div className="col-4">
                      <div className="q-box">
                        <h6>Explain how rebate tiers are calculated?</h6>
                        <div className="text-end ex-link">
                          <img src={externalLink} />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ) : (
              <>
                {chatMessages.map((msg) => {
                  return (
                    <>
                      {msg.role === "user" ? (
                        <div className="chat-right">
                          <div className="chat-msg right">
                            <div className="by">You</div>
                            <div className="msg right">{msg.message}</div>
                          </div>
                        </div>
                      ) : msg.role === "bot" ? (
                        <div className="chat-left">
                          <div className="logo-round">
                            <img src={logo} className="srm-bot" />
                          </div>
                          <div className="chat-msg ">
                            <div className="by">SRM Bot</div>
                            <div className="msg">
                              <ReactMarkdown>
                                {msg?.message?.answer}
                              </ReactMarkdown>
                              {/* {renderBulletPoints()} */}
                            </div>
                            {msg?.contract_filenames ?? (
                              <div className="mb-5">
                                <div>
                                  {msg?.message?.contract_filenames.length >
                                    0 && (
                                    <>
                                      Source{" "}
                                      {msg?.message?.contract_filenames?.map(
                                        (pdf) => {
                                          return (
                                            <>
                                              <img
                                                src={pdfRedIcon}
                                                className="pdf-icons"
                                                onClick={() => loadPdf(pdf)}
                                              />
                                            </>
                                          );
                                        }
                                      )}
                                    </>
                                  )}

                                  {/*                                   
                                  <img
                                    src={pdfRedIcon}
                                    className="pdf-icons"
                                    onClick={() =>
                                      setIsPdfPreview(!isPdfPreview)
                                    }
                                  /> */}
                                </div>
                              </div>
                            )}
                          </div>
                        </div>
                      ) : (
                        ""
                      )}
                    </>
                  );
                })}
                <>
                {
                    isLoading? <>
                            <div className="chat-left">
                              <div className="logo-round">
                                <img src={logo} className="srm-bot" />
                              </div>
                              <div className="chat-msg ">
                                <div className="by">SRM Bot</div>
                                <div>
                                  <div class="loader">
                                    <li class="ball"></li>
                                    <li class="ball"></li>
                                    <li class="ball"></li>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </>:''
                }
                </>
              </>
            )}
          </div>
          <div className="chat-search">
            <input
              className="chat-search-input"
              value={sendMessage}
              onChange={(e) => setSendMessage(e.target.value)}
            />
            <div>
              <button
                className="chat-send-btn"
                onClick={() => chatMessage()}
              ></button>
            </div>
          </div>
        </div>
        <div className={`chat-preview-pdf ${isPdfPreview ? "" : "preview"}`}>
          <div className="pdf-preview-head">
            <div className="pdf-head">Contract Document SM123455.PDF</div>
            <div>
              <button
                className="pdf-close me-4"
                onClick={() => setIsMaxi(!isMaxi)}
              >
                <img src={maximize} />
              </button>
              <button
                className="pdf-close"
                onClick={() => setIsPdfPreview(!isPdfPreview)}
              >
                <img src={close} />
              </button>
            </div>
          </div>
          <iframe src={pricingPdf} width={"90%"} height={"950px"}></iframe>
        </div>
      </div>
      <Modal
        isOpen={isMaxi}
        toggle={() => setIsMaxi(!isMaxi)}
        centered
        fullscreen
      >
        <ModalHeader toggle={() => setIsMaxi(!isMaxi)}></ModalHeader>
        <ModalBody>
          <iframe
            src={pricingPdf}
            width={"100%"}
            height={"950"}
            allowFullScreen
          ></iframe>
        </ModalBody>
      </Modal>
    </Layouts>
  );
}

export default Chat;
