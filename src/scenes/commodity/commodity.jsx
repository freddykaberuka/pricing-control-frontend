import React, { useState } from 'react';
import { Box, Button, TextField } from '@mui/material';
import { Formik } from 'formik';
import * as yup from 'yup';
import useMediaQuery from '@mui/material/useMediaQuery';
import { useDispatch } from 'react-redux';
import { addCommodity } from '../../redux/commoditySlice';

import Header from '../../components/Header';

const CommodityForm = () => {
  const dispatch = useDispatch();
  const isNonMobile = useMediaQuery('(min-width:600px)');
  const [successMessage, setSuccessMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const handleFormSubmit = async (values, { resetForm }) => {
    try {
      await dispatch(addCommodity(values));
      setSuccessMessage('Commodity added successfully');
      resetForm();
    } catch (error) {
      setErrorMessage('Failed to add commodity');
    }
  };

  return (
    <Box m="20px">
      <Header title="ADD COMMODITY" subtitle="Create a new commodity" />

      <Formik
        onSubmit={handleFormSubmit}
        initialValues={initialValues}
        validationSchema={checkoutSchema}
      >
        {({
          values,
          errors,
          touched,
          handleBlur,
          handleChange,
          handleSubmit,
        }) => (
          <form onSubmit={handleSubmit}>
            <Box
              display="grid"
              gap="30px"
              gridTemplateColumns="repeat(4, minmax(0, 1fr))"
              sx={{
                '& > div': { gridColumn: isNonMobile ? undefined : 'span 4' },
              }}
            >
              <TextField
                fullWidth
                variant="filled"
                type="text"
                label="Product Name"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.Name}
                name="Name"
                error={!!touched.Name && !!errors.Name}
                helperText={touched.Name && errors.Name}
                sx={{ gridColumn: 'span 3' }}
              />

              <TextField
                fullWidth
                variant="filled"
                type="text"
                label="Current Price"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.current_price}
                name="current_price"
                error={!!touched.current_price && !!errors.current_price}
                helperText={touched.current_price && errors.current_price}
                sx={{ gridColumn: 'span 3' }}
              />
              <TextField
                fullWidth
                variant="filled"
                type="text"
                label="New Price"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.unity_price}
                name="unity_price"
                error={!!touched.unity_price && !!errors.unity_price}
                helperText={touched.unity_price && errors.unity_price}
                sx={{ gridColumn: 'span 3' }}
              />
              <TextField
                fullWidth
                variant="filled"
                type="text"
                label="Category"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.category}
                name="category"
                error={!!touched.category && !!errors.category}
                helperText={touched.category && errors.category}
                sx={{ gridColumn: 'span 3' }}
              />
            </Box>
            <Box display="flex" justifyContent="" mt="20px">
              <Button type="submit" color="secondary" variant="contained">
                Add New Commodity
              </Button>
            </Box>
          </form>
        )}
      </Formik>
    </Box>
  );
};

const phoneRegExp =
  /^((\+[1-9]{1,4}[ -]?)|(\([0-9]{2,3}\)[ -]?)|([0-9]{2,4})[ -]?)*?[0-9]{3,4}[ -]?[0-9]{3,4}$/;

const checkoutSchema = yup.object().shape({
  // Validation schema...
});

const initialValues = {
  Name: '',
  current_price: '',
  unity_price: '',
  category: '',
};

export default CommodityForm;
