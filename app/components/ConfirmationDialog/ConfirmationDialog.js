import React, { PureComponent } from 'react';
import { FormattedMessage } from 'react-intl';
import { Link } from 'react-router-dom';
import { Alert, Container, Table, Row, Col, Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import FontAwesome from 'react-fontawesome';
// imported components

class ConfirmationDialog extends PureComponent { // eslint-disable-line react/prefer-stateless-function
  
    render() {
        if (!this.props.showModal) {
            return null;
          }
    
          return (<Modal isOpen={this.props.showModal}>
            <ModalHeader>{this.props.title}</ModalHeader>
            <ModalFooter>
              <Button color="danger" onClick={this.props.onConfirmClicked}>{this.props.confirmText || "Evet"}</Button>{' '}
              <Button color="secondary" onClick={this.props.onCancelClicked}>{this.props.cancelText || "İptal"}</Button>
            </ModalFooter>
          </Modal>);
    }
}

export default ConfirmationDialog;
