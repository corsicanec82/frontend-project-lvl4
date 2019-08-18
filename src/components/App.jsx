import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';

import Channels from './Channels';
import Messages from './Messages';
import NewMessageForm from './NewMessageForm';
import NavigationBar from './NavigationBar';

const App = () => (
  <Container fluid>
    <Row>
      <Col md="2" className="overflow-auto vh-100 p-0 border-right bg-light">
        <Channels />
      </Col>
      <Col className="d-flex flex-column vh-100 p-0">
        <NavigationBar />
        <Messages />
        <NewMessageForm />
      </Col>
    </Row>
  </Container>
);

export default App;
