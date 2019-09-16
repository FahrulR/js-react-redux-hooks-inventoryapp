import React, {useState, useEffect, Fragment} from 'react'
import axios from 'axios'
import { Link2, Redirect } from 'react-router-dom'
import { Form, Modal } from 'react-bootstrap'

import { makeStyles } from '@material-ui/styles';
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

const FormRegister = props => {
   const [style, setStyle] = useState(props.style)
   const [formData, setFormData] = useState({
        username: '',
        fullname: '',
        email: '',
        password: ''
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
        axios.post('http://localhost:5000/users/register', formData)
         .then(res => {
            setshowModal(true)
            setmodalTitle("Success Register")
            setmodalMessage(res.data.message)
            setredirectOnCloseModal(true)
         })
         .catch(() => {
            setshowModal(true)
            setmodalTitle("Failed Register")
            setmodalMessage("Data is not valid")
      })
    }

    const {username, fullname, email, password } = formData;
    const isEnabled = username.length > 0 && fullname.length > 0  && email.length > 0 && password.length;
    const classes = useStyles();
    const formclasses = formStyle();
    return (
      <Grid container component="main" styles={{height: '100%'}}>
      <CssBaseline />
      <Grid item xs={false} sm={4} md={7} style={{backgroundImage: 'url(https://source.unsplash.com/random)',
      backgroundRepeat: 'no-repeat',
      backgroundSize: 'cover',
      backgroundPosition: 'center',}} />
      <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
        <div style={{margin:'70px 75px', display: 'flex',
      flexDirection: 'column',
      alignItems: 'center'}}>
          <Avatar style={{margin: '2px', backgroundColor: 'grey'}}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Sign Up
          </Typography>
          <form style={{width: '100%', marginTop: '8px'}} noValidate onSubmit={handleSubmit}>
            <TextField
              variant="outlined"
              margin="normal"
              fullWidth
              className={formclasses.root}
              id="username"
              label="Username"
              name="username"
              value={username}
              onChange={handleChange}
              autoComplete="username"
              autoFocus
              required
            />
            <TextField
              variant="outlined"
              margin="normal"
              fullWidth
              className={formclasses.root}
              id="fullname"
              label="Full Name"
              name="fullname"
              value={fullname}
              onChange={handleChange}
              autoComplete="fullname"
              required
            />
            <TextField
              variant="outlined"
              margin="normal"
              fullWidth
              className={formclasses.root}
              id="email"
              label="Email Address"
              name="email"
              value={email}
              onChange={handleChange}
              autoComplete="email"
              required
            />
            <TextField
              variant="outlined"
              margin="normal"
              required
              className={formclasses.root}
              fullWidth
              name="password"
              label="Password"
              type="password"
              value={password}
              onChange={handleChange}
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
              Sign Up
            </Button>
            <Grid container>
            <Grid item xs>
              </Grid>
              <Grid item>
                <Link href="/login" variant="body2">
                  {"Already have an account? Sign in"}
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


export default FormRegister
