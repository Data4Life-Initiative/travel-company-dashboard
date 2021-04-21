import React from "react";
import { Table, Modal, Tooltip } from "antd";
import { CheckCircleOutlined, CloseCircleOutlined, EyeOutlined } from '@ant-design/icons';
import {
  fetchVerificatiorRecordUrl,
  apiKey
} from "../../constants";
import axios from "axios";

export default class ConnectionTable extends React.Component {
  
  componentDidMount() {
    this.FertchVerificationRecord()
  }
  
  state = { 
    visible: false ,
    verificationRecord: []
  };

  FertchVerificationRecord = async () => {
      const url = fetchVerificatiorRecordUrl;
      const axiosConfig = {
        headers: {
          Authorization: apiKey,
        },
      };
      try {
        const response = await axios.get(url, axiosConfig);
        const data = response.data.results;
        this.setState({verificationRecord: data})
      } catch (error) {
        this.setState({verificationRecord: []})
      }
  };

  

  showModal = () => {
    this.setState({
      visible: true,
    });
  };

  handleOk = e => {
    this.setState({
      visible: false,
    });
  };

  handleCancel = e => {
    this.setState({
      visible: false,
      rawJson: {}
    });
  };

  render() {
    if(this.props.refreshPrompt){
      this.FertchVerificationRecord()
      this.props.refreshVerificationTable() 
    } 
    const columns = [
      {
        title: 'Shared by',
        dataIndex: 'presentation_proposal_dict',
        key: 'Shared by',
        render: (value) => {
          let cellValue = ''
          value.presentation_proposal.attributes.forEach(attr => {
            if (attr.name === 'Name') cellValue = attr.value
          })
          return cellValue
        },
      },
      {
        title: 'Test Date',
        dataIndex: 'presentation_proposal_dict',
        key: 'Test Date',
        render: (value) => {
          let cellValue = ''
          value.presentation_proposal.attributes.forEach(attr => {
            if (attr.name === 'TestDate') cellValue = attr.value
          })
          return cellValue
        },
      },
      {
        title: 'Test Result',
        dataIndex: 'presentation_proposal_dict',
        key: 'Test Result',
        render: (value) => {
          let cellValue = ''
          value.presentation_proposal.attributes.forEach(attr => {
            if (attr.name === 'TestResult') cellValue = attr.value
          })
          return cellValue
        },
      },
      {
        title: 'Collection Date',
        dataIndex: 'updated_at',
        key: 'updated_at',
        render: (value) => {
            const date = new Date(value);
            return date.toLocaleString();
        },
        sorter: {
          compare: (a, b) => {
            const dateA = new Date(a.updated_at);
            const dateB = new Date(b.updated_at);
            return dateA - dateB
          },
          multiple: 3,
        },
        defaultSortOrder: "descend"
      },
      {
        title: 'State',
        dataIndex: 'state',
        key: 'state',
        render: (value) => {
          if(value === 'verified'){
            return <Tooltip title="Verified"><CheckCircleOutlined style={{ color: 'green'}}/></Tooltip>
          }
          else{
            return <Tooltip title="Tampered"><CloseCircleOutlined style={{ color: 'red'}}/></Tooltip>
          }
        },
      },
      {
        title: '',
        dataIndex: '',
        key: 'connection_id',
        render: (value) => {
          return <EyeOutlined  onClick={() => this.setState({
            rawJson: value || {},
            visible: true
          })}/>;
        },
      },
    ];
    return (<div>
      <Table dataSource={this.state.verificationRecord} columns={columns}/>
      <Modal
          title="Raw JSON"
          visible={this.state.visible}
          onOk={this.handleOk}
          onCancel={this.handleCancel}
      >
        <pre>
          {JSON.stringify(this.state.rawJson, null, 2)}
        </pre>
      </Modal>
    </div>);
  }
}