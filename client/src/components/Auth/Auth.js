import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { GoogleLogin } from 'react-google-login'
import { Avatar, TextField, Button, Paper, Typography, Container, Grid } from '@material-ui/core'
import { Alert } from 'react-bootstrap'
import LockOutlined from '@material-ui/icons/LockOutlined'
import makeStyles from './style'
import Input from './Input'
import Icon from './icon'
import { signUp, signIn } from '../../actions/auth'
import { OWNER, TENANT } from '../../constants/actionTypes'

const initialFormdata = { firstName:'', lastName:'', phoneNumber:'', email:'', password:'', confirmPassword:'', userType:'' } 

// ************************************************** //
// !  Backend and all logical functions disabled
// ************************************************** //

function Auth() {
    const [isSignup, setIsSignup] = useState(false)
    const [showPassword, setShowPassword] = useState(false)
    const [formData, setFormData] = useState(initialFormdata)
    const [error, setError] = useState('')
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const classes = makeStyles() 

    const handleSubmit = (e)=>{
        e.preventDefault();
        if(isSignup){
            const phoneno = /^\d{11}$/
            if(formData.password.length < 6 ) return setError('Password must be longer than 5 digits')
            if( formData.password !== formData.confirmPassword ) return setError('Passwords do not match')
            if(!(formData.phoneNumber.match(phoneno))) return setError('Invalid Phone Number ')
            dispatch(signUp(formData, navigate, setError))
        }else{
            dispatch(signIn(formData, navigate, setError))
        }
    }
    const handleChange = (e)=>{
        setFormData({...formData, [e.target.name]: e.target.value })
    }
    const switchMode = ()=> { 
        setIsSignup((prevIsSignup) => !prevIsSignup)
        if(showPassword !== false) return  handleShowPassword(false)
    } 
    const googleError = (error)=> {
        console.log(error);
    }
    const handleShowPassword = ()=> setShowPassword((prevShowPassword) => !prevShowPassword)

    return (
        <Container component='main' maxWidth='xs'>
            <Paper className={classes.paper} elevation={3}>
                <Avatar className={classes.avatar}>
                    <LockOutlined/>
                </Avatar>
                <Typography variant='h5'>{isSignup? 'Sign Up':'Sign In'} </Typography>
                {error && <Alert variant="danger" > {error} </Alert> }
                <form className={classes.form} onSubmit={handleSubmit} >
                    <Grid container spacing={2}>
                    { isSignup && (
                        <>
                        <Input name="firstName" label="First Name" handleChange={handleChange} autoFocus half />
                        <Input name="lastName" label="Last Name" handleChange={handleChange} half />
                        <Input name="phoneNumber" label="Phone Number" handleChange={handleChange} />
                        </>
                    )}
                        <Input name="email" label="Email Address" handleChange={handleChange} type="email" />
                        <Input name="password" label="Password" handleChange={handleChange} type={showPassword ? 'text' : 'password'} handleShowPassword={handleShowPassword} />
                        { isSignup && <Input name="confirmPassword" label="Repeat Password" handleChange={handleChange} type="password" /> }
                    </Grid>
                    {
                        isSignup && (
                           <div className='d-flex' >
                                <Button style={{marginRight:'2px'}} type="submit" fullWidth variant="contained" color="primary" className={classes.submit}
                                    onClick={()=> {
                                        setError('')
                                        setFormData({...formData, userType:TENANT })
                                    }}
                                >
                                    Sign Up as Tenant
                                </Button> 
                                <Button style={{marginLeft:'2px'}} type="submit" fullWidth variant="contained" color="primary" className={classes.submit}
                                    onClick={()=>{ 
                                        setError('')
                                        setFormData({...formData, userType:OWNER })
                                    }}
                                >
                                    Sign Up as Owner
                                </Button> 
                           </div> 
                        )
                    }
                     {
                        !isSignup && (
                            <>
                            <div className='d-flex' >
                                    <Button style={{marginRight:'2px'}} type="submit" fullWidth variant="contained" color="primary" className={classes.submit}
                                         onClick={()=> {
                                            setError('')
                                            setFormData({...formData, userType:TENANT })
                                        }}
                                    >
                                        Sign In as Tenant
                                    </Button> 
                                    <Button style={{marginLeft:'2px'}} type="submit" fullWidth variant="contained" color="primary" className={classes.submit}
                                         onClick={()=> {
                                            setError('')
                                            setFormData({...formData, userType:OWNER })
                                        }}
                                    >
                                        Sign In as Owner
                                    </Button> 
                            </div> 
                            <GoogleLogin
                                clientId="1010768141617-1vif3fordnjtcc4ap6nflfh4p9k43pum.apps.googleusercontent.com"
                                render={(renderProps) => (
                                <Button className={classes.googleButton} color="primary" fullWidth onClick={renderProps.onClick} disabled={renderProps.disabled} startIcon={<Icon />} variant="contained">
                                    Google Sign In As Owner
                                </Button>
                                )}
                                onSuccess = { async(res)=> {
                                    let result = res?.profileObj
                                    result = {...result, userType:OWNER }
                                    const token = res?.tokenId
                                    try{
                                        dispatch({ type: 'AUTH', data: {result, token}})
                                        navigate('/posts')
                                    }catch(error){
                                        console.log(error);
                                    }
                                }}
                                onFailure={googleError}
                                cookiePolicy="single_host_origin"
                            />
                            <GoogleLogin 
                                clientId="903468864900-msifdfrm8i5ln81bko2ehps7th2rspsf.apps.googleusercontent.com"
                                render={(renderProps) => (
                                <Button className={classes.googleButton} color="primary" fullWidth onClick={renderProps.onClick} disabled={renderProps.disabled} startIcon={<Icon />} variant="contained">
                                    Google Sign In As Tenant
                                </Button>
                                )}
                                onSuccess= { async(res)=> {
                                    let result = res?.profileObj
                                    result = {...result, userType:TENANT }
                                    const token = res?.tokenId
                                    try{
                                        dispatch({ type: 'AUTH', data: {result, token}})
                                        navigate('/posts')
                                    }catch(error){
                                        console.log(error);
                                    }
                                }}
                                onFailure={googleError}
                                cookiePolicy="single_host_origin"
                            />
                           </>
                        )
                    }
                    <Grid container justifyContent='center'>
                        <Grid item>
                            <Button onClick={switchMode}>
                                { isSignup? 'Already have an account? Sign In': 'Dont have an account? Sign Up'}
                            </Button>
                        </Grid>
                    </Grid>
                </form>
            </Paper>
        </Container>
    )
}

export default Auth
