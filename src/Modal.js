import Modal from "react-bootstrap/Modal";
import "bootstrap/dist/css/bootstrap.min.css";
import Form from './Form'

const MyModal = (props) => {
    const modalTitle = props.evpn ? 'Edit EVPN:' + props.evpn.vni : 'New EVPN';
    return (
        <Modal show={props.isOpen}
            onHide={props.hideModal}
            backdrop="static"
            keyboard={false}
        >
            <Modal.Header closeButton>
                <Modal.Title>{modalTitle}</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form handleSubmit={props.handleSubmit} evpn={props.evpn} index={props.index}/>
            </Modal.Body>
        </Modal>
    )
}

export default MyModal