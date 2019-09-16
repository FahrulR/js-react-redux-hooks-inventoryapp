import React, {useState, Fragment} from 'react'
import {Modal, Button} from 'react-bootstrap'
import FormEditProduct from '../Form/FormEditProduct'

const ModalEditProduct = props => {
 const [showModal, setshowModal] = useState(false)
    return(
      <Fragment>
       <Button 
          variant={props.variant || "success"} 
          onClick={() => {setshowModal(true)}}>
          Edit Product
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
              Edit Product
            </Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <FormEditProduct 
              closeModal={()=>{setshowModal(true)}} 
              history={props.history}
              productId={props.productId}
              productData= {props.productData}
              />
          </Modal.Body>
        </Modal>
      </Fragment>
    )
  }


export default ModalEditProduct  