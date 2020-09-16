import React, { useEffect, Fragment } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Table } from "antd";

const ConnectionTable = (props) => {

  const {connections=[], proofRecords={}} = props.props.patient;
  const dataSource = connections;

  const columns = [
    {
      title: 'Name',
      dataIndex: 'Name',
      key: 'Name',
    },
    {
      title: 'Email',
      dataIndex: 'Email',
      key: 'Email',
    },
    {
      title: 'Phone Number',
      dataIndex: 'PhoneNumber',
      key: 'PhoneNumber',
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
          return proofRecords[value]['testResult']
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
        if(proofRecords[value]){
          return proofRecords[value]['state']
        }
        return 'Unknown';
      },
    },
  ];

  const dispatch = useDispatch();
  console.log(props);


  return (<Table dataSource={dataSource} columns={columns} />);
};

export default ConnectionTable;
