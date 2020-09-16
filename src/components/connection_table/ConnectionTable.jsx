import React, { useEffect, Fragment } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Table } from "antd";

const dataSource = [
  {
    key: '1',
    name: 'Mike',
    age: 32,
    address: '10 Downing Street',
  },
  {
    key: '2',
    name: 'John',
    age: 42,
    address: '10 Downing Street',
  },
];

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
];

const ConnectionTable = (props) => {

  const dispatch = useDispatch();
  console.log(props);
  const dataSource = props.props.patient.connections;

  return (<Table dataSource={dataSource} columns={columns} />);
};

export default ConnectionTable;
