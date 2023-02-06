import React from "react";
import { useState, useEffect } from "react";
import { FaSignInAlt } from "react-icons/fa";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { login, reset } from "../features/auth/authSlice";
import Spinner from "../components/Spinner";

function Login() {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const { email, password, } = formData;

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { user, isLoading, isSuccess, isError, message } = useSelector(
    (state) => state.auth
  );

  // useEffect
   useEffect(() => {
      if (isError) {
        toast.error(message)
      }

      if (isSuccess || user) {
        toast.success(message)
        navigate('/')
      }

      dispatch(reset())
    }, [user,isError,isSuccess,message,navigate,dispatch]);

    

  const onChange = (e) => {
    setFormData((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  // dispatch login function
  const onSubmit = (e) => {
    e.preventDefault();

    const userData ={
      email,
      password
    }

    dispatch(login(userData))
  };

  // spinnner
  if (isLoading) {
    return <Spinner />
  }

  return (
    <>
      <section className="heading">
        <h2>
          <FaSignInAlt /> Login
        </h2>
        <p>Login to your an Account</p>
      </section>
      <section className="form">
        <form action="" onSubmit={onSubmit}>
          <div className="form-group">
            <input
              type="email"
              className="form-control"
              id="email"
              name="email"
              value={email}
              placeholder="Enter Your Email"
              onChange={onChange}
            />
          </div>
          <div className="form-group">
            <input
              type="password"
              className="form-control"
              id="password"
              name="password"
              value={password}
              placeholder="Enter Your Password"
              onChange={onChange}
            />
          </div>
          <div className="form-group">
            <button type="submit" className="btn btn-block">
              Login
            </button>
          </div>
        </form>
      </section>
    </>
  );
}

export default Login;
