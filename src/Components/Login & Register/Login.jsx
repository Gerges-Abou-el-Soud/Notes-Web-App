import React, { useState } from 'react'
import Axios from 'axios';
import { useNavigate } from 'react-router-dom';

export default function Login() {
  const [user, setUser] = useState({
    email: '',
    password: ''
  });

  const [error, setError] = useState('');

  let navigate = useNavigate();

  const [loadingAnimation, setLoadingAnimation] = useState(false);

  function getUserData(e) {
    let myUser = { ...user };
    myUser[e.target.name] = e.target.value;
    setUser(myUser);
  };


  async function submitLoginForm(e) {
    e.preventDefault();
    setLoadingAnimation(true);
    let { data } = await Axios.post('https://route-egypt-api.herokuapp.com/signin', user);
    setLoadingAnimation(false);
    if (data.message === 'success') {
      localStorage.setItem('token', data.token);
      navigate('/home');
    } else {
      setError(data.message);
      console.log(data);
    };
  };

  return (
    <>
      <div className="container my-5 py-5">
        <div className="col-md-5 m-auto text-center">
          <form onSubmit={submitLoginForm}>
            <div className="form-group">
              <input onChange={getUserData} placeholder="Enter email" type="email" name="email" className="form-control" />
            </div>
            <div className="form-group my-2">
              <input onChange={getUserData} placeholder="Enter you password" type="password" name="password" className=" form-control" />
            </div>
            {error && <div className="alert alert-danger mt-2">{error}</div>}
            <button type="submit" className={'btn btn-info w-100' + (loadingAnimation ? " disabled" : "")}> {loadingAnimation ? <i className="fa fa-spinner fa-spin" aria-hidden="true"></i> : 'SignIn'}  </button>
          </form>
        </div>
      </div>


    </>
  )
}
