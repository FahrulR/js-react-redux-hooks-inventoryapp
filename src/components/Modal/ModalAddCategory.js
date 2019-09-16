import React, {useState, Fragment} from 'react'
import {Modal, Button} from 'react-bootstrap'
import FormAddCategory from '../Form/FormAddCategory'

const ModalAddCategory = props =>{
 const [showModal, setshowModal] = useState(false)
    return(
      <Fragment>
        <Button 
          variant={props.variant || "light"} 
          onClick={() => {setshowModal(true)}}
          style={{width:'100%'}}>
          Add Category
        </Button>
        <Modal
          show={showModal}
          onHide={() => {setshowModal(false)}}
          size="lg"
          aria-labelledby="contained-modal-title-vcenter"
          centered
        >
          <Modal.Header closeButton>
            <Modal.Title id="contained-modal-title-vcenter">
              Add Category
            </Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <FormAddCategory closeModal={()=>{setshowModal(true)}} history={props.history}/>
          </Modal.Body>
        </Modal>
      </Fragment>
    )
  }


export default ModalAddCategory  