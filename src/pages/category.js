import React, {useState, useEffect} from 'react'
import { Route } from 'react-router-dom'
import { Navbar, Nav, Button, Image} from 'react-bootstrap'
import Sidebar from 'react-sidebar'

import CategoryList from '../components/CategoryList'
import Inventory from '../the-inventory-vector-logo.svg'
import SideBarUser from '../components/SideBar'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBars } from '@fortawesome/free-solid-svg-icons'

const Category = props => {
  const [sidebarOpen, setsidebarOpen] = useState(false)

  const onSetSidebarOpen = (open) => {
    setsidebarOpen(open)
  }

  if(window.localStorage.getItem("token") === null)
    props.history.push('/')

    return ( 
      <div>
        <Sidebar
          sidebar={<SideBarUser
            history={props.history}
          />}
          open={sidebarOpen}
          onSetOpen={onSetSidebarOpen}
          styles={{ sidebar: { background: 'white', zIndex: '20', width: '20%', position: 'fixed' } }} />
        <Navbar bg='light' variant='light' className='shadow' fixed='top'>
          <Nav className='mr-auto'>
            <Button variant='light' onClick={() => onSetSidebarOpen(true)}>
              <FontAwesomeIcon icon={faBars} />
            </Button>
           <h3>List of Category</h3>
          </Nav>
          <Navbar.Brand href="/">
          <Image src={Inventory} style={{width:'50px', height:'50px'}}/>
            <b>Inventory</b>
          </Navbar.Brand>
        </Navbar>
        <Route 
          path="/category" 
          exact={true}
          render={() => {
            return(
              <div className="container md-5">
              <CategoryList history={props.history} key={window.location.href}/>
              </div>
            );
          }} 
        />
        
      </div>
    )
  }


export default Category
