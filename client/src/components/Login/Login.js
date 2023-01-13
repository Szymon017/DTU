import React from 'react';
import '../../style.css'
import logo from '../../assets/images/logo.png'
const Login = () => {
    return (

        <div className='Container'>
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
                            required
                            />
                        <p>Hasło</p>
                        <input
                            type='password'
                            name='password'
                            required
                            />
                        <input
                        type='submit'
                        value='zaloguj'/>
                    </form>
                </div>
            </div>
        </div>

    )
}

export default Login