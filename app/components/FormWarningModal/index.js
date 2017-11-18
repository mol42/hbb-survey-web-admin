import React, { PureComponent } from 'react';
import { FormattedMessage } from 'react-intl';
import { Link } from 'react-router-dom';
import { ListGroup, ListGroupItem, Modal, ModalHeader, ModalBody, ModalFooter, Button, Alert} from 'reactstrap';
// imported components


class FormWarningModal extends PureComponent { // eslint-disable-line react/prefer-stateless-function
  
    render() {
        return (
            <Modal isOpen={this.props.modalVisible} backdrop={"static"}>
                <ModalHeader>{this.props.modalTitle}</ModalHeader>
                <ModalBody>
                <Alert color="warning">{this.props.modalBodyText}</Alert>
                </ModalBody>
                <ModalFooter>
                    <Button color="primary" onClick={this.props.onConfirmClicked}>Tamam</Button>
                </ModalFooter>
            </Modal>
        );
    }
}

export default FormWarningModal;


