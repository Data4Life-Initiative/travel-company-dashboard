import React, { useEffect, useState } from "react";
import { Table, Modal, Tooltip, Button } from "antd";
import {
  CheckCircleOutlined,
  CloseCircleOutlined,
  EyeOutlined,
} from "@ant-design/icons";
import "./style.css";
import QRCode from "qrcode";
import {
  createQrEndpoint,
  apiKey,
  qrBaseURl,
  pollDataExchangeInfo,
} from "../../constants";
import axios from "axios";

const VerificationQR = (props) => {
  const [visible, setvisible] = useState(false);
  const [qrURL, setQRURL] = useState("");
  const [qrID, setQRID] = useState("");
  const [isDataExchanged, setIsDataExchanged] = useState(false);
  const [timeOutID, setTimeOutID] = useState("");

  const pollExchangedData = async (id) => {
    const url = pollDataExchangeInfo + id + "&state=verified";
    const response = await window.fetch(url, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: apiKey,
      },
    });
    if (response.status == 200) {
      let result = await response.json();
      if (result.results.length > 0) {
        setIsDataExchanged(true);
        return;
      }
    }
    const timeOutID = setTimeout(() => pollExchangedData(id), 5000);
    setTimeOutID(timeOutID);
  };

  const showModal = () => {
    const axiosConfig = {
      headers: {
        Authorization: apiKey,
      },
    };
    axios
      .post(createQrEndpoint, "", axiosConfig)
      .then((response) => {
        const newQR = qrBaseURl + response.data.qr_id;
        QRCode.toDataURL(newQR, function (error, url) {
          if (error) throw error;
          setQRURL(url);
          setQRID(response.data.qr_id);
          pollExchangedData(response.data.qr_id);
        });
      })
      .catch((err) => {
        setQRURL("");
        setQRID("");
      });
    setvisible(!visible);
  };
  const handleCancel = (e) => {
    setQRURL("");
    setQRID("");
    props.refreshVerificationTable()
    setIsDataExchanged(false)
    clearTimeout(timeOutID);
    setvisible(!visible);
  };

  return (
    <div className="btn-container">
      <Button className="exchange-btn" onClick={showModal}>
        Exchange Data
      </Button>
      <Modal
        title="Data Exchange QR Code"
        visible={visible}
        footer={null}
        onCancel={handleCancel}
        maskClosable={false}
      >
        <div className="qr">
          <div className="qr-hold-container">
            <img id="tick" src="/tick.png" hidden={!isDataExchanged} />
            {qrURL? 
              <img src={qrURL} alt="QR Code" className="qrImage" />
              :
              ""
            }
            
          </div>
        </div>
      </Modal>
    </div>
  );
};

export default VerificationQR;
