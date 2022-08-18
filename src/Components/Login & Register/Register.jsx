import Axios from 'axios';
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';

export default function Register() {

  const [user, setUser] = useState({
    first_name: '',
    last_name: '',
    age: 0,
    email: '',
    password: ''
  });

  const [error, setError] = useState('');

  let navigate = useNavigate();


  const [loadingAnimation, setLoadingAnimation] = useState(false);

function getUserData(e){
  let myUser = {...user};
  myUser[e.target.name] = e.target.value ;
  setUser(myUser);
};

async function submitRegisterForm(e){
  e.preventDefault();
  setLoadingAnimation(true)
  let { data } = await Axios.post('https://route-egypt-api.herokuapp.com/signup', user)
  setLoadingAnimation(false)
  if (data.message === 'success') {
    navigate('/login')
  } else {
      setError(data.errors)
      console.log(data);
  }
};



  return (
    <>
      <div className="container my-5 py-5">
        <div className="col-md-5 m-auto text-center">
          <form onSubmit={submitRegisterForm}>
            <div className="form-group">
              <input onChange={getUserData} placeholder="Enter your First Name" name="first_name" type="text" className=" form-control" />
            </div>
            <div className="form-group my-2 ">
              <input onChange={getUserData} placeholder="Enter your Last Name" name="last_name" type="text" className="form-control" />
            </div>
            <div className="form-group my-2 ">
              <input onChange={getUserData} placeholder="Enter your Age" name="age" type="number" className="form-control" />
            </div>
            <div className="form-group">
              <input onChange={getUserData} placeholder="Enter email" type="email" name="email" className="form-control" />
              {error.email && <div className="alert alert-danger mt-2">{error.email.message}</div>}
            </div>
            <div className="form-group my-2">
              <input onChange={getUserData} placeholder="Enter you password" type="password" name="password" className=" form-control" />
              {error.password && <div className="alert alert-danger mt-2">{error.password.message}</div>}
            </div>
            <button type="submit" className={'btn btn-info w-100' + (loadingAnimation ? " disabled" : "")}> {loadingAnimation ? <i className="fa fa-spinner fa-spin" aria-hidden="true"></i> : 'SignUp'}  </button>
          </form>
        </div>
      </div>
    </>
  )
}
