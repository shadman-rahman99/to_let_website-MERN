import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { GoogleLogin } from 'react-google-login'
import { Avatar, TextField, Button, Paper, Typography, Container, Grid } from '@material-ui/core'
import { Alert } from 'react-bootstrap'
import LockOutlined from '@material-ui/icons/LockOutlined'
import makeStyles from './style'
import Input from './Input'
import { OWNER, TENANT } from '../../constants/actionTypes'


// ************************************************** //
// !  Backend and all logical functions disabled
// ************************************************** //

function AdminAuth() {
    const [error, setError] = useState('')
    const [username, setUsername] = useState('')
    const admin = { userType: 'ADMIN' }
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const classes = makeStyles()

    const handleSubmit = (e) => {
        e?.preventDefault();
        if (username === 'USERNAME') {
            localStorage.setItem('profile', JSON.stringify(admin))
            navigate('/adminHome')
        } else {
            setError('Invalid Credentials')
        }
    }
    const handleChange = (e) => {
        setUsername(e.target.value)
    }

    return (
        <Container component='main' maxWidth='xs'>
            <Paper className={classes.paper} elevation={3}>
                <Avatar className={classes.avatar}>
                    <LockOutlined />
                </Avatar>
                <Typography variant='h5'>Sign In</Typography>
                {error && <Alert variant="danger" > {error} </Alert>}
                <form className={classes.form} onSubmit={handleSubmit} >
                    <Grid container spacing={2}>
                        <Input name="username" label="Username" handleChange={handleChange} autoFocus />
                    </Grid>
                    <Button style={{ marginRight: '2px' }} type="submit" fullWidth variant="contained" color="primary" className={classes.submit}
                        onClick={() => {
                            setError('')
                        }}
                    >
                        Sign In
                    </Button>

                </form>
            </Paper>
        </Container>
    )
}

export default AdminAuth
