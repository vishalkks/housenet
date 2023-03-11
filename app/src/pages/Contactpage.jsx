import React from "react";
import { Typography, Row, Col } from 'antd';
const { Title } = Typography;

const Contact = () => {
    return (
        <>
            <div style={{minHeight: "100vh", marginTop: "18rem"}}>
                <Row type="flex" justify="center" align="middle" style={{ flexDirection: 'column', marginBottom: "6rem"}}>
                    <Title>Contact Us</Title>
                </Row>
                <Row justify="center">
                    <Col span={4}>
                        <Row style={{flexDirection: "column", textAlign: "center"}}>
                            <Col><i style={{fontSize: "7rem", marginBottom: "2rem"}} className="fa fa-map-marker" /></Col>
                            <Col><Title level={4}>3869 Miramar St, 92092, La Jolla, CA</Title></Col>
                        </Row>
                    </Col>
                    <Col span={4}>
                        <Row style={{flexDirection: "column", textAlign: "center"}}>
                            <Col><i style={{fontSize: "7rem", marginBottom: "2rem"}} className="fa fa-mobile" /></Col>
                            <Col><Title level={4}>+1 (916)-123-122</Title></Col>
                        </Row>
                    </Col>
                    <Col span={4}>
                        <Row style={{flexDirection: "column", textAlign: "center"}}>
                            <Col><i style={{fontSize: "7rem", marginBottom: "2rem"}} className="fa fa-envelope" /></Col>
                            <Col><Title level={4}>housenet@gmail.com</Title></Col>
                        </Row>
                    </Col>
                </Row>
                
            </div>
        </>
    )
}

export default Contact;