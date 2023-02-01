import React, { useEffect, useState } from 'react';
import Form from '../Form';
import './signin.css'
export const Signin = ({ loadUser, dashboard }) => {

    const [userInfo, setUserInfo] = useState({ email: '', password: '' });
    const [passwordEntered, setPasswordEntered] = useState('');
    const [emailEntered, setEmailEntered] = useState('');
    const getPassword = (e) => { return setPasswordEntered(e.target.value); }
    const getEmail = (e) => { return setEmailEntered(e.target.value); }

    useEffect(() => {
        setUserInfo({
            email: emailEntered,
            password: passwordEntered
        });
    }, [emailEntered, passwordEntered])

    const onSubmit = () => {
        //fetch is acting as sender this time...
        //using post instead of the usual get request fetch makes...
        //this is to make sure user info is safe in our hands
        async function getHostData() {

            try {
                const sendData = await fetch('http://localhost:4000/smartbrain.com/users/signin', {
                    method: 'post',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({
                        email: userInfo.email,
                        password: userInfo.password
                    })
                });
                const user = await sendData.json();
                console.log(user)
                if (user[0].id) {
                    loadUser(user[0]);
                    dashboard('home');
                }
            } catch (error) {
                console.log(error);
            }
        }
       return  getHostData();

    }

    return (
        <div className='cover ba dark-gray pt1 mv4 w-100 w-50-m w-25-l center tc br3 shadow-2 b--black-10'>
            <h3>{'Sign In'}</h3>
            {Form('section-input', getEmail, 'input shadow-2', 'email', 'email-address', 'email-address', 'Email')}
            {Form('section-input', getPassword, 'input shadow-2', 'password', 'mypassword', 'mypassword', 'Password')}
            {Form('pa3', onSubmit, 'shadow-2', 'submit', null, null, null, 'Sign in')}
        </div>
    );
};


