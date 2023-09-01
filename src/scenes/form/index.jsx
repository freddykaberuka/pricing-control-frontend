import React, { useState, useEffect } from 'react';
import { Box, Button, TextField, MenuItem } from "@mui/material";
import { Formik } from "formik";
import * as yup from "yup";
import useMediaQuery from "@mui/material/useMediaQuery";
import Header from "../../components/Header";
import { addComplaint } from '../../redux/complaintSlice';
import { useDispatch, useSelector } from 'react-redux';
import { getCommodityList } from '../../redux/commoditySlice';
import { getLocationList } from '../../redux/locationSlice';

const Form = () => {
  const isNonMobile = useMediaQuery("(min-width:600px)");
  const dispatch = useDispatch();
  const [successMessage, setSuccessMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const userId = useSelector((state) => state.user.userId);

  useEffect(() => {
    dispatch(getCommodityList());
    dispatch(getLocationList());
  }, [dispatch]);

  const commodities = useSelector((state) => state.commodity.commodityList);
  const locationList = useSelector((state) => state.location.locationList);

  const handleFormSubmit = async (values, { resetForm }) => {
    try {
      const complaintData = {
        ...values,
        userId: userId, // Include the user ID in the complaint data
      };
      await dispatch(addComplaint(complaintData));
      setSuccessMessage('Complaint added successfully');
      resetForm();
    } catch (error) {
      setErrorMessage('Failed to add Complaint');
    }
  };

  return (
    <Box m="20px">
      <Header title="ADD COMPLAINT" subtitle="Create a new complaint" />

      <Formik
        onSubmit={handleFormSubmit}
        initialValues={{
          commodity_id: "",
          locationId: "",
          description: "",
        }}
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
                "& > div": { gridColumn: isNonMobile ? undefined : "span 4" },
              }}
            >
              <TextField
                select
                fullWidth
                variant="filled"
                label="Commodity"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.commodity_id}
                name="commodity_id"
                error={!!touched.commodity_id && !!errors.commodity_id}
                helperText={touched.commodity_id && errors.commodity_id}
                sx={{ gridColumn: "span 2" }}
              >
                {commodities.map((commodity) => (
                  <MenuItem key={commodity.id} value={commodity.id}>
                    {commodity.Name}
                  </MenuItem>
                ))}
              </TextField>

              <TextField
                select
                fullWidth
                variant="filled"
                label="Location"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.locationId}
                name="locationId"
                error={!!touched.locationId && !!errors.locationId}
                helperText={touched.locationId && errors.locationId}
                sx={{ gridColumn: "span 2" }}
              >
                {locationList.map((location) => (
                  <MenuItem key={location.id} value={location.id}>
                    {location.locationName}
                  </MenuItem>
                ))}
              </TextField>

              <TextField
                fullWidth
                variant="filled"
                type="text"
                label="Complaint"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.description}
                name="description"
                error={!!touched.description && !!errors.description}
                helperText={touched.description && errors.description}
                sx={{ gridColumn: "span 4" }}
              />
            </Box>
            <Box display="flex" justifyContent="end" mt="20px">
              <Button type="submit" color="secondary" variant="contained">
                ADD COMPLAINT
              </Button>
            </Box>
          </form>
        )}
      </Formik>
    </Box>
  );
};

const checkoutSchema = yup.object().shape({});

export default Form;
