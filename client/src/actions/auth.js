// Initializing every action type for dispatch as a const variable rather
// than string because misspelling string will not always be specifically 
// mentioned in our console but even if we misspell variables it will be
//  accurately shown on console. 
import { AUTH } from '../constants/actionTypes'
// importing everything from api folder's index.js (by default system chooses
// index.js if any js file not mentioned).
import * as api from '../api'

export const signIn = (formData, navigate, setError)=> async(dispatch)=> {
    try{
        const { data } = await api.signIn(formData) 
        if(data?.message) return setError(data?.message); 
        dispatch({type: AUTH, data })
        navigate('/posts')
    }catch(error){
        console.log(error);
    }
}

export const signUp = (formData, navigate, setError)=> async(dispatch)=> {
    try{
        const { data } = await api.signUp(formData) 
        if(data?.message) return setError(data?.message); 
        dispatch({type: AUTH, data })
        navigate('/posts')
    }catch(error){
        console.log(error);
    }
}