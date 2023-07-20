import React, { useState } from 'react';
import { Box, Button, TextField } from "@mui/material";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as yup from "yup";
import { useDispatch,useSelector } from 'react-redux';
import { addComplaint } from '../../redux/complaintSlice';

const AddComplaintForm = () => {
  const dispatch = useDispatch();
  const [successMessage, setSuccessMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const user = useSelector((state) => state.user.user);
  
  const handleFormSubmit = async (values, { resetForm }) => {
  try {
    console.log('Form values:', values);
    await dispatch(
      addComplaint({
        user_id: user.id, // Access the user's ID from the user object
        ...values,
      })
    );
    setSuccessMessage('Complaint added successfully');
    resetForm();
  } catch (error) {
    console.error('Form Submission Error:', error);
    setErrorMessage('Failed to add Complaint');
  }
};


    // Check if user is not logged in
  if (!user || !user.id) {
    return (
      <Box m="20px">
        <h1>Add New Complaint</h1>
        <div>Please log in to add a complaint.</div>
      </Box>
    );
  }

  return (
    <Box m="20px">
      <h1>Add New Complaint</h1>
      <Formik
        initialValues={{ commodity_id: "", locationId: "", description: "" }}
        // validationSchema={yup.object({
        //   commodity_id: yup.string().required('Commodity is required'),
        //   locationId: yup.string().required('Location is required'),
        //   description: yup.string().required('Description is required'),
        // })}
        onSubmit={handleFormSubmit}
      >
        <Form>
          <Field
            as={TextField}
            fullWidth
            variant="filled"
            type="text"
            label="Commodity"
            name="commodity_id"
          />
          <ErrorMessage name="commodity_id" component="div" />

          <Field
            as={TextField}
            fullWidth
            variant="filled"
            type="text"
            label="Location"
            name="locationId"
          />
          <ErrorMessage name="locationId" component="div" />

          <Field
            as={TextField}
            fullWidth
            variant="filled"
            type="text"
            label="Complaint"
            name="description"
          />
          <ErrorMessage name="description" component="div" />

          <Button type="submit" color="secondary" variant="contained">
            ADD COMPLAINT
          </Button>

          {successMessage && <div>{successMessage}</div>}
          {errorMessage && <div>{errorMessage}</div>}
        </Form>
      </Formik>
    </Box>
  );
};

export default AddComplaintForm;
