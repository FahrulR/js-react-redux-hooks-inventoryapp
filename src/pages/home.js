import React, {useState, useEffect, Fragment} from 'react'
import axios from 'axios'
import { Route } from 'react-router-dom'
import { Navbar, Nav, Button, Image, Container, Spinner } from 'react-bootstrap'
import Sidebar from 'react-sidebar'

import Inventory from '../V-Inventory-Logo-negative.png'
import ProductList from '../components/ProductList'
import DropDownCategory from '../components/Dropdown/DropDownCategory'
import SideBarUser from '../components/SideBar'
import { SearchProduct } from '../components/SearchProducts'
import DropDownLimit from '../components/Dropdown/DropDownLimit'
import DropDownSortBy from '../components/Dropdown/DropDownSort'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBars } from '@fortawesome/free-solid-svg-icons'
import DetailProducts from './DetailProducts'

const Home = props => {
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
            <DropDownCategory history={props.history}/>
            <DropDownSortBy history={props.history}/>
            {/* <DropDownLimit history={props.history}/> */}
            &nbsp;
            <SearchProduct history={props.history}/>
           
          </Nav>
                    <Navbar.Brand href="/">
          <Image src={Inventory} style={{width:'200px', height:'50px'}}/>
          </Navbar.Brand>
        </Navbar>

        <Route 
          path="/home" 
          exact={true}
          render={() => {
            let params = new URLSearchParams(window.location.search)
            return(
              <div className="container md-5">
                
                <ProductList
                  sortby={params.get("sortby")} 
                  search={params.get("search")}
                  limit={params.get("limit")}
                  dataSource={`http://localhost:5000/products`} 
                  key={window.location.href} />
              </div>
            );
          }} 
        />
         <Route
              path={'/products/:id'}
              exact={true}
              component={(props) => {
                return <DetailProducts 
                {...props} productId={props.match.params.productid} 
                productUrl={`products/${props.match.params.id}`}
                productId = {props.match.params.id}
                key={props.history.location}/>
              }} 
        />
      </div>
    )
  }


export default Home
