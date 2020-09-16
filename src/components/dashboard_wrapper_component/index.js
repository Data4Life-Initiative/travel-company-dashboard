import React from "react";
import { Drawer, Button } from "antd";
import { PlusOutlined } from "@ant-design/icons";
import MapContainer from "../map/MapContainer";
import IssueCertificate from "../issue_certificate/IssueCertificate";
import AdminLayoutComponent from "../shared/admin-layout";
import "./main-style.css";
import {getPatientConnections} from "../../actions/patient";
import ConnectionTable from "../connection_table/ConnectionTable"

export default class DashboradWrapperComponent extends React.Component {
    state = { showAddPatientVisible: false, showIssueCertificateVisible: false };

    showAddPatientDrawer = () => {
        this.setState({
            showAddPatientVisible: true,
        });
    };

    showIssueCertificateDrawer = () => {
        this.setState({
            showIssueCertificateVisible: true,
        });
    };

    onClose = () => {
        this.setState({
            showAddPatientVisible: false,
            showIssueCertificateVisible: false
        });
    };

    componentDidMount() {
        this.props.getPatientConnections();
        this.props.getPresentProofRecords();
    }

    render() {
        return (
            <AdminLayoutComponent props={this.props}>
                <Drawer
                    title="Issue Credentials"
                    className="custom-drawer"
                    onClose={this.onClose}
                    visible={this.state.showIssueCertificateVisible}
                    bodyStyle={{ paddingBottom: 80 }}
                    destroyOnClose={true}
                >
                    <IssueCertificate onCancel={this.onClose} />
                </Drawer>

                <Button type="primary issue-certificate-button dashboard-buttons" onClick={this.showIssueCertificateDrawer}>
                    <PlusOutlined /> Issue Credentials
                </Button>
                <div className="map-container site-layout-background">
                    <ConnectionTable
                        props={this.props}
                        style={{ position: "relative" }}
                    />
                </div>
            </AdminLayoutComponent>
        );
    }
}
