import React, {useState} from 'react'
import {Dropdown} from 'react-bootstrap'

const DropDownCategory = props =>{
 
  const [history, setHistory] = useState(props.history)

  const goToCategoryPath = () => {
    history.push(`/category`)
  }

    return(
      <Dropdown>
        <Dropdown.Toggle variant="light" id="dropdown-basic">
          All Categories
        </Dropdown.Toggle>
        <Dropdown.Menu>
            <Dropdown.Item onClick={()=>{goToCategoryPath()}}>List of Category</Dropdown.Item>
        </Dropdown.Menu>
      </Dropdown>
    )
  }

export default DropDownCategory
