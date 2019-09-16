import React, {useState, useEffect, Fragment} from 'react'
import axios from 'axios'
import {Row, Col, Form, Button, Modal} from 'react-bootstrap'

const FormAddCategory = props =>{
   const [formData, setFormData] = useState({
        name: '',
   })
   const [redirectOnCloseModal, setredirectOnCloseModal] = useState(false)
   const [showModal, setshowModal] = useState(false)
   const [modalTitle, setmodalTitle] = useState('')
   const [modalMessage, setmodalMessage] = useState('')
   const [history, setHistory] = useState(props.history)

    const handleClose = () => {
        setshowModal(false)
        if (redirectOnCloseModal)
        history.push('/')
    }

    const handleChange = (event) =>{
        let newFormData = {...formData}
        const target = event.target
        const name = target.name
        const value = target.value
        newFormData[name] = value
        setFormData(newFormData)
        console.log(formData)
    }

    const handleSubmit = (event) => {
        event.preventDefault();
        const token = localStorage.getItem('token')
        axios.post('http://localhost:5000/category', formData, {headers: {authorization: token}})
         .then(res => {
            setshowModal(true)
            setmodalTitle("Success")
            setmodalMessage("Category successfully added!")
            setredirectOnCloseModal(true)
         })
    }

    return (
        <Fragment>
            <Form onSubmit={handleSubmit}>
            <Form.Group as={Row} controlId="formPlaintextName">
                <Form.Label column sm="2">
                    Name
                </Form.Label>
                <Col sm="10">
                <Form.Control onChange={handleChange} type="text" name="name" placeholder="Name..." required/>
                </Col>
            </Form.Group>

            <Button style={{float:"right"}} variant="warning" type="submit">
                    Save
            </Button>
            </Form>
            <Modal show={showModal} onHide={handleClose}>
            <Modal.Header>
                <Modal.Title>{modalTitle}</Modal.Title>
            </Modal.Header>
            <Modal.Body>{modalMessage}</Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={handleClose}>
                    Close
                </Button>
            </Modal.Footer>
            </Modal>
        </Fragment>
    );
  }

export default FormAddCategory
