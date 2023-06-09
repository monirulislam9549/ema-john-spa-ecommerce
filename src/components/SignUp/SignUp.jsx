import React, { useContext, useState } from 'react';
import './SignUp.css'
import { Link } from 'react-router-dom';
import { AuthContext } from '../providers/AuthProvider';

const SignUp = () => {
    const [show, setShow] = useState(false)
    const [error, setError] = useState('')
    const { createUser } = useContext(AuthContext)
    const handleSignUp = (event) => {
        event.preventDefault()
        const form = event.target;
        const email = form.email.value;
        const password = form.password.value
        const confirm = form.confirm.value;
        console.log(email, password, confirm);
        setError('')
        if (password !== confirm) {
            setError('Your password did not match')
            return
        }
        else if (password.length < 6) {
            setError('Provide at least 6 character')
            return;
        }

        createUser(email, password)
            .then(loggedUser => {
                const result = result.user;
                console.log(loggedUser);
                form.reset();
            })
            .catch(error => {
                console.log(error);
            })
    }
    return (
        <div className='form-container'>
            <h2 className='form-title'>Sign Up</h2>
            <form onSubmit={handleSignUp}>
                <div className='form-control'>
                    <label htmlFor="email">Email</label>
                    <input
                        type="email"
                        name="email"
                        placeholder='Your Email'
                        required
                    />

                </div>
                <div className='form-control'>
                    <label htmlFor="password">Password</label>
                    <input
                        type={show ? "text" : "password"}
                        name="password"
                        placeholder='Your Password'
                        required
                    />
                    <p onClick={() => setShow(!show)}>
                        <small>
                            {
                                show ?
                                    <span>Hide Password</span> :
                                    <span>Show Password</span>
                            }
                        </small>
                    </p>
                </div>
                <div className='form-control'>
                    <label htmlFor="confirm">Confirm Password</label>
                    <input
                        type="password"
                        name="confirm"
                        placeholder='Your Password'
                        required
                    />
                </div>
                <input className='btn-submit' type="submit" value="Sign Up" />
            </form>
            <p><small>Already have an account?<Link to='/login'>Login</Link></small></p>
            <p className='text-error'>{error}</p>
        </div>
    );
};

export default SignUp;