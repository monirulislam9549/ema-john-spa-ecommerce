import React from 'react';
import './SignUp.css'

const SignUp = () => {
    return (
        <div className='form-container'>
            <h2 className='form-title'>Sign Up</h2>
            <form>
                <div className='form-control'>
                    <label htmlFor="email">Email</label>
                    <input
                        type="email"
                        name="email" id=""
                        placeholder='Your Email'
                        required
                    />
                </div>
                <div className='form-control'>
                    <label htmlFor="password">Password</label>
                    <input
                        type="password"
                        name="password" id=""
                        placeholder='Your Password'
                        required
                    />
                </div>
                <div className='form-control'>
                    <label htmlFor="password">Confirm Password</label>
                    <input
                        type="password"
                        name="confirm" id=""
                        placeholder='Your Password'
                        required
                    />
                </div>
                <button className='btn-submit'>Sign Up</button>
            </form>
        </div>
    );
};

export default SignUp;