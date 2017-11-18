import React from 'react';
import { FormattedMessage } from 'react-intl';
import { Link } from 'react-router-dom';
import { Row, Col, ListGroup, ListGroupItem } from 'reactstrap';
import FontAwesome from 'react-fontawesome';
import ConfirmationDialog from "components/ConfirmationDialog/ConfirmationDialog";
// imported components


class SurveyItemActions extends React.Component {

    state = {
        modalVisible : false,
        modalTitle : ""
    }

  render() {
        let {surveyId, enabled, toggleType, editEnabled, toggleEnabled, deleteEnabled} = this.props;

        if (true) {
            return (<span>
                {
                    editEnabled ? 
                    <a href="javascript:;" onClick={this.props.editSurveyClicked} title="Anketi düzenlemek için tıklayınız"><FontAwesome name="pencil-square" size="lg" /></a> 
                    : null
                }
                {
                    <a href="javascript:;" onClick={this.props.copySurveyClicked} title="Anketi kopyalamak için tıklayınız"><FontAwesome name="clone" size="lg" style={{marginLeft : 15}} /></a> 
                }                
                {
                    toggleEnabled ?
                    <a href="javascript:;" onClick={this.props.toggleSurveyStatusClicked} title="Anketi pasife almak için tıklayınız">
                        {
                            toggleType == "pause" ? 
                            <FontAwesome name="stop-circle" size="lg" style={{color : "blue", marginLeft : 15}} />
                            :
                            <FontAwesome name="play-circle" size="lg" style={{color : "green", marginLeft : 15}} />
                        }
                    </a>
                    : null 
                }
                {
                    deleteEnabled ?
                    <a href="javascript:;" onClick={() => this._showHideDeleteModal(true)} title="Anketi silmek için tıklayınız"><FontAwesome name="trash" size="lg" style={{color : "red", marginLeft : 10}} /></a>
                    : null
                }

                <ConfirmationDialog showModal={this.state.modalVisible} 
                        title={"Anketi silmek istediğinize emin misiniz ?"}
                        onConfirmClicked={() => this._confirmDeleteModal()} 
                        onCancelClicked={() => this._cancelDeleteModal()} />

                </span>);
        }

        return <span><FontAwesome name="ban" size="lg" /></span>;
  }

  _showHideDeleteModal(flag) {
      this.setState({
          modalVisible : flag
      });
  }

  _confirmDeleteModal() {
    this._showHideDeleteModal(false);
    this.props.onConfirmDeleteClicked();
  }

  _cancelDeleteModal() {
    this._showHideDeleteModal(false);
  }
}

export default SurveyItemActions;
