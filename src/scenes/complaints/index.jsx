import React, { useEffect, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addComplaint, getComplaintList } from "../../redux/complaintSlice";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import Box from "@mui/material/Box";
import Header from "../../components/Header";
import { getUserById } from '../../redux/userSlice';
import { selectCommodityById, getCommodityList } from '../../redux/commoditySlice';
import { getLocationList, selectLocationById } from '../../redux/locationSlice';

const columns = [
  { field: "commodityName", headerName: "COMMODITY", flex: 1 },
  { field: "description", headerName: "DESCRIPTION", flex: 1 },
  {
    field: "location_id",
    headerName: "LOCATION",
    flex: 1,
    // valueGetter: (params) => params.value || "", // Return the value as is if available
  },
];

const Complaints = () => {
  const dispatch = useDispatch();
  const complaintList = useSelector((state) => state.complaint.complaintList);
  const loading = useSelector((state) => state.complaint.loading);
  const error = useSelector((state) => state.complaint.error);
  const commodityList = useSelector((state) => state.commodity.commodityList);
  const locationList = useSelector((state) => state.location.locationList);

  useEffect(() => {
    dispatch(getComplaintList());
    dispatch(getCommodityList());
    dispatch(getLocationList());
  }, [dispatch]);

  const commodityById = useMemo(() => {
    const commodityMap = {};
    commodityList.forEach((commodity) => {
      commodityMap[commodity.id] = commodity.Name;
    });
    return commodityMap;
  }, [commodityList]);

  const locationById = useMemo(() => {
    const locationMap = {};
    locationList.forEach((location) => {
      locationMap[location.id] = location.location_name;
    });
    return locationMap;
  }, [locationList]);

  const updatedComplaintList = complaintList.map((complaint) => ({
    ...complaint,
    commodityName: commodityById[complaint.commodity_id] || "",
    location_id: locationById[complaint.location_id] || "",
  }));

  return (
    <Box m="20px">
      <Header title="Complaint Info" subtitle="List of Complaints" />
      {loading ? (
        <p>Loading...</p>
      ) : error ? (
        <p>Error: {error}</p>
      ) : (
        <DataGrid
          rows={updatedComplaintList}
          columns={columns}
          components={{ Toolbar: GridToolbar }}
        />
      )}
    </Box>
  );
};

export default Complaints;
