import React, {useState, useEffect, Fragment} from 'react'
import axios from 'axios'
import Table from '@material-ui/core/Table';
import {Alert, Modal, Button, Badge} from 'react-bootstrap'
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';
import IconButton from '@material-ui/core/IconButton';
import ModalEditCategory from '../components/Modal/ModalEditCategory'
import Loader from '../components/Loader'
import { confirmAlert } from 'react-confirm-alert'; // Import
import 'react-confirm-alert/src/react-confirm-alert.css'; // Import css



const CategoryList = props => {
   const [categoryList, setcategoryList] = useState([])
   const [redirectOnCloseModal, setredirectOnCloseModal] = useState(false)
   const [showModal, setshowModal] = useState(false)
   const [modalTitle, setmodalTitle] = useState('')
   const [modalMessage, setmodalMessage] = useState('')
   const [history, setHistory] = useState(props.history)

useEffect(() => {
   const token = localStorage.getItem('token')
   axios.get('http://localhost:5000/category', {headers: {authorization: token}})
   .then(response => setcategoryList(response.data.data))
    }, []);

const handleDelete = (event, id) => {
    event.preventDefault()
     confirmAlert({
      title: 'Confirm to delete',
      message: 'Are you sure you want to delete this?.',
      buttons: [
        {
          label: 'Yes',
          onClick: () => axios.delete(`http://localhost:5000/category/${id}`, {
            headers:{
                authorization: window.localStorage.getItem("token")
            }
        })
      .then(() => {
            setshowModal(true)
            setmodalTitle("Success")
            setmodalMessage("Category successfully deleted!")
            setredirectOnCloseModal(true)
    })
      .catch(() => {
            setshowModal(true)
            setmodalTitle("Failed")
            setmodalMessage("Failed to delete! category is a foreign key constant")
    })
        },
        {
          label: 'No',
          onClick: () => history.push(`/category`)
        }
      ]
    });

}

  
    const handleClose = () => {
        setshowModal(false)
        if (redirectOnCloseModal)
        history.push('/')
    }
  
    let no = 1;

  return (
    <div>
    
    <Paper style={{width: "100%", marginTop: "124px", overflowX: "auto"}}>
      <Table style={{minWidth: "650"}}>
        <TableHead>
          <TableRow>
          <TableCell><h3><b>No</b></h3></TableCell>
          <TableCell><h3><b>Categories</b></h3></TableCell>
            <TableCell><h3><b>Action</b></h3></TableCell>

          </TableRow>
        </TableHead>
        <TableBody>
              {categoryList.length !== 0 ? categoryList.map((category) => {
              return <TableRow key ={category.name}>
              <TableCell component="th" scope="row"> {no++} </TableCell>

                 <TableCell component="th" scope="row" key={category.id}> {category.name} </TableCell>
                 <TableCell component="th" scope="row" >
                   
                 <ModalEditCategory history={props.history} categoryId = {category.id} categoryData={category} />
                 <IconButton aria-label="Delete" onClick={(event) => handleDelete(event, category.id)}>
                                           <DeleteIcon /> 
                                        </IconButton>
                 </TableCell>
                 </TableRow>
              })
              : <Loader />
              } 
        </TableBody>
      </Table>
    </Paper>
    <Modal show={showModal} onHide={handleClose}>
                <Modal.Header>
                  <Modal.Title>{modalTitle}</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                  {modalMessage}
                </Modal.Body>
                <Modal.Footer>
                  <Button variant="secondary" onClick={handleClose}>
                    Close
                  </Button>
                </Modal.Footer>
            </Modal>
    </div>
  );

}

export default CategoryList