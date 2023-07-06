import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addComplaint, getComplaintList } from "../../redux/complaintSlice";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import Box from "@mui/material/Box";
import Header from "../../components/Header";

const columns = [
    { field: "commodity_id", headerName: "ID", flex: 0.5 },
    { field: "description", headerName: "DESCRIPTION" , flex: 1},
    {
      field: "user_id",
      headerName: "COMPLAINING USER",
      flex: 1,
      cellClassName: "name-column--cell no-border-bottom",
    },
    { field: "location_id", headerName: "LOCATION", flex: 1 },
];

const Complaints = () => {
  const dispatch = useDispatch();
  const complaintList = useSelector((state) => state.complaint.complaintList);
  const complaint = useSelector((state) => state.complaint.complaint);
  const loading = useSelector((state) => state.complaint.loading);
  const error = useSelector((state) => state.complaint.error);

  useEffect(() => {
    dispatch(getComplaintList());
  }, [dispatch]);

  return (
    <Box m="20px">
      <Header title="Complaint Info" subtitle="List of Complaints" />
      {loading ? (
        <p>Loading...</p>
      ) : error ? (
        <p>Error: {error}</p>
      ) : (
        <DataGrid rows={complaintList} columns={columns} components={{ Toolbar: GridToolbar }} />
      )}
    </Box>
  );
};

export default Complaints;
