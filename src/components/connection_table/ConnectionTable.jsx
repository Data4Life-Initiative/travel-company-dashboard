import React, { useEffect, Fragment } from "react";
import { Table, Modal } from "antd";
import { CheckCircleOutlined, CloseCircleOutlined, EyeOutlined } from '@ant-design/icons';

export default class ConnectionTable extends React.Component {
  state = { visible: false };

  showModal = () => {
    this.setState({
      visible: true,
    });
  };

  handleOk = e => {
    console.log(e);
    this.setState({
      visible: false,
    });
  };

  handleCancel = e => {
    console.log(e);
    this.setState({
      visible: false,
      rawJson: {}
    });
  };

  render() {
    const {connections=[], proofRecords={}} = this.props.props.patient;
    const dataSource = Object.keys(proofRecords).map(key => { return {'ConnectionID': key} });

    const columns = [
      {
        title: 'Shared by',
        dataIndex: 'ConnectionID',
        key: 'ConnectionID',
        render: (value) => {
          const connectionID = proofRecords[value]['connectionID']
          const temp = connections.filter(agent => agent.ConnectionID === connectionID);
          if (temp.length > 0){
            return temp[0].Name
          }
          return 'Unknown';
        },
      },
      {
        title: 'Test Date',
        dataIndex: 'ConnectionID',
        key: 'testDate',
        render: (value) => {
          if(proofRecords[value]){
            return proofRecords[value]['testDate']
          }
          return 'Unknown';
        },
      },
      {
        title: 'Test Result',
        dataIndex: 'ConnectionID',
        key: 'testResult',
        render: (value) => {
          if(proofRecords[value]){
            return proofRecords[value]['testResults']
          }
          return 'Unknown';
        },
      },
      {
        title: 'Collection Date',
        dataIndex: 'ConnectionID',
        key: 'collectionDate',
        render: (value) => {
          if(proofRecords[value]){
            const date = new Date(proofRecords[value]['collectionDate']);
            return date.toLocaleDateString();
          }
          return 'Unknown';
        },
      },
      {
        title: 'State',
        dataIndex: 'ConnectionID',
        key: 'state',
        render: (value) => {
          if(proofRecords[value]['state'] === 'verified'){
            return <CheckCircleOutlined style={{ color: 'green'}}/>
          }
          else{
            return <CloseCircleOutlined style={{ color: 'red'}}/>
          }
        },
      },
      {
        title: '',
        dataIndex: 'ConnectionID',
        key: 'raw_value',
        render: (value) => {
          return <EyeOutlined  onClick={() => this.setState({
            rawJson: proofRecords[value]['rawInfo'] || {},
            visible: true
          })}/>;
        },
      },
    ];
    return (<div>
      <Table dataSource={dataSource} columns={columns} />
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