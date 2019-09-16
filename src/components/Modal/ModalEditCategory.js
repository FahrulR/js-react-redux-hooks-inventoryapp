import React, {useState, Fragment} from 'react'
import {Modal, Button} from 'react-bootstrap'
import FormEditCategory from '../Form/FormEditCategory'
import EditIcon from '@material-ui/icons/Edit';
import IconButton from '@material-ui/core/IconButton';

const ModalEditCategory = props => {
 const [showModal, setshowModal] = useState(false)
    return(
      <Fragment>
       <IconButton aria-label="Edit"
        onClick={() => {setshowModal(true)}}>
        <EditIcon />
       </IconButton>
        <Modal
          show={showModal}
          onHide={() => {setshowModal(false)}}
          size="lg"
          aria-labelledby="contained-modal-title-vcenter"
          centered
        >
          <Modal.Header closeButton>
            <Modal.Title id="contained-modal-title-vcenter">
              Edit Category
            </Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <FormEditCategory 
              closeModal={()=>{setshowModal(true)}} 
              history={props.history}
              categoryId={props.categoryId}
              categoryData= {props.categoryData}
              />
          </Modal.Body>
        </Modal>
      </Fragment>
    )
  }


export default ModalEditCategory  