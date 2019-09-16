import React, {useState,Fragment} from 'react'
import {Modal, Button} from 'react-bootstrap'
import FormAddProduct from '../Form/FormAddProduct'


const ModalAddProduct = props =>{
 const [showModal, setshowModal] = useState(false)
    return(
      <Fragment>
        <Button 
          variant={props.variant || "light"} 
          onClick={() => {setshowModal(true)}}
          style={{width:'100%'}}>
          Add Product
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
              Add Product
            </Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <FormAddProduct closeModal={()=>{setshowModal(true)}} history={props.history}/>
          </Modal.Body>
        </Modal>
      </Fragment>
    )
  }

export default ModalAddProduct