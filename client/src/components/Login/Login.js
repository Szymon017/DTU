import React from 'react';
import '../../style.css'
import logo from '../../assets/images/logo.png'
import { useState } from 'react';
import { login } from '../../Services/OfficerService';
const Login = () => {
    const initialState = {
        login: "",
        password: ""
    }
    const [officer, setOfficer] = useState(initialState)
    const [error, setError] = useState({})

    const handleChange = (e) => {
        const { name, value } = e.target
        setOfficer({
            ...officer,
            [name]: value
        })
        console.log(officer);
    }

    const handleSubmit = async(event) => {
        event.preventDefault();
        const result = await login(officer);
        if(result.data){
            localStorage.setItem("token", result.data.token)            
            window.location.assign('/home');
        }else{
            setError({ error: result.response.data.error })
        }
        
    }
    return (
        <div className='loginContainer'>
            <div className='loginContainer'>
                <img src={logo} alt="Logo" width={170} />
                <h1>DETECTIVE TASK UNIT</h1>
                <hr></hr>
                <div className='loginForm'>
                    <p>ZALOGUJ SIĘ</p>
                    <form>
                        <p>Login</p>
                        <input
                            type='text'
                            name='login'
                            onChange={handleChange}
                            required
                            />
                        <p>Hasło</p>
                        <input
                            type='password'
                            name='password'
                            onChange={handleChange}
                            required
                            />
                             <p className="text-danger">{error.error}</p>
                        <input
                        type='submit'
                        onClick={handleSubmit}
                        value='zaloguj'/>
                    </form>
                </div>
            </div>
        </div>

    )
}

export default Login