import React,{useState,useContext,useEffect} from 'react';

import AuthContext from '../../context/auth/authContext';
import AlertContext from '../../context/alert/alertContext';

import{useNavigate} from 'react-router-dom'
import { set } from 'mongoose';


const Login = () => {
    const authContext = useContext(AuthContext);
    const alertContext = useContext(AlertContext);

    const {setAlert} = alertContext;
    const {login,error,clearErrors,isAuthenticated} = authContext;

    const navigate = useNavigate();

    useEffect(()=>{
        if(isAuthenticated){
            navigate('/')
        }

        if(error === 'Invalid Credentials'){
            setAlert(error ,'danger');
            clearErrors();
        }
    })


    const [user, setUser] = useState({
        email:'',
        password:''
    })

    const {email,password} = user;

    const onChange = e => {
        setUser({...user , [e.target.name] : e.target.value})
    }

    const onSubmit = e => {
        e.preventDefault();
        if(email === '' || password === ''){
            set('Please fill in all fields','danger')
        } else{
            login({
                email,
                password
            })
        }
    }
    return (
        <div className='form-container'>
            <h1>
                Account <span className='text-primary'>Login</span>
            </h1>      
            <form onSubmit={onSubmit}>
                <div className='form-group'>
                    <label htmlFor='email'>Email Adress</label>
                    <input type='text' name='email' value={email} onChange={onChange} required/>
                </div>
                <div className='form-group'>
                    <label htmlFor='password'>Password</label>
                    <input type='password' name='password' value={password} onChange={onChange} required/>
                </div>
                <input type='submit' value='Login' className='btn btn-primary btn-block'/>
            </form>
        </div>
    )
}

export default Login;
