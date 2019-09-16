import React, { useState } from 'react'
import { Route } from 'react-router-dom'

import FormLogin from '../components/Form/FormLogin'
import FormRegister from '../components/Form/FormRegister'

const Auth = props => {

  const [loggedIn, setloggedIn] = useState(false)


  const isLoggedIn = ()=>{
    return window.localStorage.getItem('token')
  }


    return (
      <div>
          <Route
            path={'/login'}
            render={() => {
              return (
                loggedIn ? props.history.push('/')
                  : <div>
                    <FormLogin />
                  </div>
              )
            }}
          />
          <Route
            path={'/register'}
            render={() => {
              return (
                  <div>
                    <FormRegister history={props.history}/>
                  </div>
              )
            }}
          />
          <br />
        </div>
    )
  }


export default Auth
