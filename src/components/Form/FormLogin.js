import React, {useState, useEffect, Fragment} from 'react'
import axios from 'axios'
import { Link2, Redirect } from 'react-router-dom'


import { makeStyles } from '@material-ui/styles';
import { Form, Modal } from 'react-bootstrap'
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import Link from '@material-ui/core/Link';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';

const useStyles = makeStyles({
  root: {
    background: 'linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%)',
    border: 0,
    borderRadius: 3,
    boxShadow: '0 3px 5px 2px rgba(255, 105, 135, .3)',
    color: 'white',
    height: 48,
    padding: '0 30px',
  },
});

const formStyle = makeStyles({
  root: {
      "& label.Mui-focused": {
      color: "red"
    },
      "& .MuiInput-underline:after": {
      borderBottomColor: "green"
    },
      "& .MuiOutlinedInput-root": {
      "& fieldset": {
        borderColor: "grey"
      },
      "&:hover fieldset": {
        borderColor: "blue"
      },
      "&.Mui-focused fieldset": {
        borderColor: "red"
      }
    }
  },
});

const FormLogin = props => {
   const [style, setStyle] = useState(props.style)
   const [email, setEmail] = useState('')
   const [password, setPassword] = useState('')
   const [loggedIn, setloggedIn] = useState(false)
   const [showModal, setshowModal] = useState(false)
   const [modalTitle, setmodalTitle] = useState('')
   const [modalMessage, setmodalMessage] = useState('')

  const handleClose = () => {
        setshowModal(false)
    }

  const handleEmail = (event) => {
        setEmail(event.target.value)
  }

  const handlePassword = (event) => {
        setPassword(event.target.value)
  }

  const handleSubmit = (event) => {
    event.preventDefault();
    const data = {
      email: email, 
      password: password
  }

  axios.post('http://localhost:5000/users/login', data)
         .then(res => {
          window.localStorage.setItem("token", res.data.token)
          console.log(window.localStorage.getItem('token'))
          setloggedIn(true)
         })
         .catch(err => {
            setshowModal(true)
            setmodalTitle("Failed Login")
            setmodalMessage("Username or Password is wrong")
      })
  }

    const isEnabled = email.length > 0 && password.length;
    const classes = useStyles();
    const formclasses = formStyle();
    if(window.localStorage.getItem("token")) return <Redirect to="../"/>
    else return (
      <Grid container component="main" styles={{height: '100%'}}>
    <CssBaseline />
    <Grid item xs={false} sm={4} md={7} style={{backgroundImage: 'url(https://source.unsplash.com/random)',
    backgroundRepeat: 'no-repeat',
    backgroundSize: 'cover',
    backgroundPosition: 'center',}} />
    <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
      <div style={{margin:'145px 75px', display: 'flex',
    flexDirection: 'column',
    alignItems: 'center'}}>
        <Avatar style={{margin: '8px', backgroundColor: 'grey'}}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Sign in
        </Typography>
        <form style={{width: '100%', marginTop: '8px'}} noValidate onSubmit={handleSubmit}>
          <TextField
            variant="outlined"
            margin="normal"
            fullWidth
            className={formclasses.root}
            id="email"
            label="Email Address"
            name="email"
            value={email}
            onChange={handleEmail}
            autoComplete="email"
            autoFocus
            required
          />
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            className={formclasses.root}
            name="password"
            label="Password"
            type="password"
            value={password}
            onChange={handlePassword}
            id="password"
            autoComplete="current-password"
          />
          <Button
            type="submit"
            fullWidth
            className={classes.root}
            variant="contained"
            color="primary"
            style={{margin: '24px 0px 16px'}}
            disabled= {!isEnabled}
          >
            Sign In
          </Button>
          <Grid container>
          <Grid item xs>
            </Grid>
            <Grid item>
              <Link href="/register" variant="body2">
                {"Don't have an account? Sign Up"}
              </Link>
            </Grid>
          </Grid>
          <Box mt={5}>
          <Typography variant="body2" color="textSecondary" align="center">
      {'Copyright © '}
      <Link color="inherit" href="#">
        Inventory App
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
          </Box>
        </form>
        <Modal show={showModal} onHide={handleClose}>
            <Modal.Header>
              <Modal.Title>{modalTitle}</Modal.Title>
            </Modal.Header>
            <Modal.Body>{modalMessage}</Modal.Body>
            <Modal.Footer>
              <Button variant="warning" onClick={handleClose}>
                Close
              </Button>
            </Modal.Footer>
        </Modal>
      </div>
    </Grid>
  </Grid>
    )
}

export default FormLogin
