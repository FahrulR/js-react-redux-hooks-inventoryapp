import React, {useState, useEffect} from 'react'
import axios from 'axios'
import {Container, Row, Button, Image} from 'react-bootstrap'
import {Link} from 'react-router-dom'
import {connect} from 'react-redux'
import {getProfile} from '../publics/actions/users'
import ModalAddProduct from './Modal/ModalAddProduct'
import ModalAddCategory from './Modal/ModalAddCategory'

const SideBar = props => {

   const [image, setImage] = useState(props.image || "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ7OIaucSrpk8PYGcXaszuEt709_7oKcdt_cONFkc1kvMonUTZI")
   const [fullname, setfullName] = useState(props.image || "Admin")
   const [level, setLevel] = useState(props.level)
   const [userid, setuserId] = useState(props.userid)
   const [history, setHistory] = useState(props.history)

  const handleLogout = (event) => { 
    window.localStorage.removeItem("token")
    if(window.localStorage.getItem("token") === null)
      history.push('/')
  }

  useEffect(()=> {
    axios.get('192.168.1.18:5000/users/profile', {
            headers:{
                Authorization: window.localStorage.getItem("token")
            }
        })
    .then(res => {
      {setfullName(res.data.data.fullname); setLevel(res.data.data.level)}
    })
  })

    return (
      <div>
          <Image className="dashboard" src={image}/><hr/>
          <h3 style={{textAlign:'center'}}>Hello ..</h3>
          <h4 style={{textAlign:'center'}}>{fullname}</h4><hr/>
          <Container className="sidebar-buttons ">
            {
                  level === "regular" ? 
                  <Row className="justify-content-md-left">
                    <ModalAddProduct history={history}/>
                    <ModalAddCategory history={history}/>
                  </Row>
                  :''
              }
            <Row className="justify-content-md-left">
                <Button style={{width:'100%'}} variant="light" onClick={handleLogout} >Logout</Button>
            </Row>
          </Container>
      </div>
    )
  }


export default SideBar
