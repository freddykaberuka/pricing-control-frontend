import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getComplaintsMiddleware } from "../../redux/complaintsMiddleware";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import Box from "@mui/material/Box";
import Header from "../../components/Header";

const columns = [
    { field: "id", headerName: "ID", flex: 0.5 },
    { field: "registrarId", headerName: "Registrar ID" },
    {
      field: "name",
      headerName: "Name",
      flex: 1,
      cellClassName: "name-column--cell no-border-bottom",
    },
    { field: "age", headerName: "Age", type: "number", headerAlign: "left", align: "left" },
    { field: "phone", headerName: "Phone Number", flex: 1 },
    { field: "email", headerName: "Email", flex: 1 },
    { field: "address", headerName: "Address", flex: 1 },
    { field: "city", headerName: "City", flex: 1 },
    { field: "zipCode", headerName: "Zip Code", flex: 1 },
];

const Complaints = () => {
  const dispatch = useDispatch();
  const { complaints, loading, error } = useSelector((state) => state.complaints);

  useEffect(() => {
    dispatch(getComplaintsMiddleware());
  }, [dispatch]);

  return (
    <Box m="20px">
      <Header title="Commodity Info" subtitle="List of Commodities" />

      {loading ? (
        <p>Loading...</p>
      ) : error ? (
        <p>Error: {error}</p>
      ) : (
        <DataGrid rows={complaints} columns={columns} components={{ Toolbar: GridToolbar }} />
      )}
    </Box>
  );
};

export default Complaints;
