import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Field, Form, Formik, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { useDispatch } from 'react-redux';
import { login } from '../../redux/userSlice';

function SignIn({ setIsAuthenticated }) {
  const [errortext, setErrortext] = useState('');
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleSubmit = async (values) => {
    try {
      setLoading(true);
      const resultAction = await dispatch(
        login({
          email: values.email,
          password: values.password,
        })
      );
      setLoading(false);

      if ('error' in resultAction.payload) {
        setErrortext(resultAction.payload.error || 'Login failed');
      } else {
        setErrortext('');
        setIsAuthenticated(true); // Set isAuthenticated to true upon successful login
        navigate('/');
      }
    } catch (error) {
      setLoading(false);
      setErrortext('Login failed');
    }
  };

  return (
    <div className="flex h-full font-poppins">
      <div className="hidden sm:block w-1/2">
        <div className="bg-bgsecondary  w-full h-full  flex justify-center items-center ">
          <div className="w-full h-full main--login-bg p-16 md:p-8">
            {/* inner bg */}

            <div className="backdrop-blur-md bg-white/30 h-full border-4 border-white w-full rounded-xl relative">
              <div className="flex ml-10 mt-10">
                {/* rome-ignore lint/a11y/useAltText: <explanation> */}
                <img
                  src="/assets/rwanda.svg"
                  className="w-24 h-24 md:w-20 md:h-20"
                />
                <h2 className="text-gray-400 font-semibold text-lg px-10 py-10 md:py-5">
                  {" "}
                  - Your Price, Our Priority
                </h2>
              </div>
              {/* rome-ignore lint/a11y/useAltText: <explanation> */}
              <img src="/assets/quotes.png" className="w-6 h-6 ml-10 mt-12" />

              <div className="">
                <h1 className="ml-5 mb-5 px-20 font-bold text-2xl text-bgprimary ">
                  no longer High Price on the market
                </h1>
                <div className="flex justify-start">
                  <h1 className="px-24 py-5 font-semibold text-3xl text-bgyellow lg:font-medium md:text-2xl ">
                    -Paccy
                  </h1>
                </div>
                {/* rome-ignore lint/a11y/useAltText: <explanation> */}
                <img
                  src="/assets/shelter_bus.png"
                  className=" ml-32 mt-8  w-3/5  md:mt-10"
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* form side */}
      <div className="md:w-1/2 flex flex-col justify-center lg:px-40 px-10 py-10">
        <h1 className="text-2xl font-bold mb-1 text-dark-green">
          Login to Minicom Price Control{" "}
        </h1>
        <p className="py-1 text-sm border-gray-300 text-gray-400 mb-3">
          Welcome back to your account
        </p>
         <Formik
          initialValues={{ email: '', password: '' }}
          validationSchema={Yup.object({
            email: Yup.string().email('Invalid email address').required('Required'),
            password: Yup.string().required('Required'),
          })}
          onSubmit={handleSubmit}
        >
          <Form className="flex flex-col justify-center">
            <label
              htmlFor="email"
              className="mb-2 mt-6 font-base text-dark-green font-semibold"
            >
              Email
            </label>
             <Field
              name="email"
              type="email"
              className="focus:shadow-outline w-full  appearance-none rounded-md border border-gray-300 p-3 leading-tight text-gray-700 focus:outline-none text-sm"
              placeholder="Please Enter Your Email"
            />
            <ErrorMessage name="email">
              {(msg) => <div className="my-1 text-red-500 text-sm">{msg}</div>}
            </ErrorMessage>

            <label
              htmlFor="password"
              className="mb-2 mt-6 font-base text-dark-green font-semibold"
            >
              Password
            </label>
            <Field
              name="password"
              type="password"
              className="focus:shadow-outline w-full appearance-none rounded-md border border-gray-300 p-3 leading-tight text-gray-700 focus:outline-none text-sm"
              placeholder="Please Enter Your Password"
            />
            <ErrorMessage name="password">
              {(msg) => <div className="my-1 text-red-500 text-sm">{msg}</div>}
            </ErrorMessage>
            <div>
              {errortext && (
                <div className="my-1 text-red-500 text-xs">{errortext}</div>
              )}
            </div>
            <Link to="/forgot-password">
              <div className="text-bgyellow mt-2 text-sm">
                {" "}
                Forgot your password?
              </div>
            </Link>
            <button
              type="submit"
              className="flex items-center justify-center focus:shadow-outline mt-10 font-semibold bg-bgprimary text-white py-3 rounded text-sm"
            >
              {loading ? (
                <p>Loading...</p>
              ) : (
                "Sign In"
              )}
            </button>
            <div className="text-bgprimary mt-6 text-sm font-medium">
              Do not have an account yet?{" "}
              <a className="text-bgyellow" href="">
                <Link to="/signup">
                Register here
                </Link>
              </a>
            </div>
          </Form>
        </Formik>
      </div>
    </div>
  );
}

export default SignIn