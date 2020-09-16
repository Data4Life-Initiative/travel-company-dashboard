import React, { useEffect, Fragment } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Table } from "antd";
import { CheckCircleOutlined, CloseCircleOutlined } from '@ant-design/icons';


const ConnectionTable = (props) => {

  const {connections=[], proofRecords={}} = props.props.patient;
  const dataSource = Object.keys(proofRecords).map(key => { return {'ConnectionID': key} });

  const columns = [
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
          return proofRecords[value]['collectionDate']
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
  ];

  const dispatch = useDispatch();
  console.log(props);


  return (<Table dataSource={dataSource} columns={columns} />);
};

export default ConnectionTable;
