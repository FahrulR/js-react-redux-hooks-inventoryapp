import React, {useState, useEffect, Fragment} from 'react'
import {Row, Col, Form, Button, Modal} from 'react-bootstrap'
import axios from 'axios'

const FormAddProduct = props => {
   
   const [categoryList, setcategoryList] = useState([])
   const [formData, setFormData] = useState({
        name: '',
        description:'',
        image:'',
        id_category:'',
        quantity:''
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
        axios.post('http://localhost:5000/products', formData, {headers: {authorization: token}})
         .then(res => {
            setshowModal(true)
            setmodalTitle("Success")
            setmodalMessage("Product successfully added!")
            setredirectOnCloseModal(true)
         })
    }

    useEffect(() => {
        axios.get('http://localhost:5000/category')
        .then(response => setcategoryList(response.data.data))
    }, []);

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

            <Form.Group as={Row} controlId="formPlaintextDescription">
                <Form.Label column sm="2">
                    Description
                </Form.Label>
                <Col sm="10">
                <Form.Control onChange={handleChange} type="text" name="description" placeholder="Description..." required/>
                </Col>
            </Form.Group>

            <Form.Group as={Row} controlId="formPlaintextImageURL">
                <Form.Label column sm="2">
                    Image URL
                </Form.Label>
                <Col sm="10">
                <Form.Control onChange={handleChange} type="text" name="image" placeholder="Image URL..." required />
                </Col>
            </Form.Group>

            <Form.Group as={Row} controlId="formPlaintextDateReleased">
                <Form.Label column sm="2">
                    Stocks
                </Form.Label>
                <Col sm="10">
                <Form.Control onChange={handleChange} name="quantity" type="number" min="0" required/>
                </Col>
            </Form.Group>

            <Form.Group as={Row} controlId="formPlaintextCategory">
                <Form.Label column sm="2">Category</Form.Label>
                <Col sm="10">
                <Form.Control onChange={handleChange} as="select" name="id_category" required>
                    <option>--Select Category--</option>
                    {categoryList.length !== 0 ? categoryList.map((category) => {
                    return <option value={category.id} key={category.id}> {category.name} </option>
                    })
                    :<option>Loading...</option>
                }
                </Form.Control>
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


export default(FormAddProduct)
