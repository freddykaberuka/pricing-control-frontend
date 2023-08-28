import React, { useState, useEffect, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import Box from "@mui/material/Box";
import Header from "../../components/Header";
import { getCommodityList } from "../../redux/commoditySlice";
import { getLocationList } from "../../redux/locationSlice";
import { Button, TextField, useTheme, IconButton } from "@mui/material";
import { Link } from 'react-router-dom';
import DownloadOutlinedIcon from "@mui/icons-material/DownloadOutlined";
import { tokens } from "../../theme";
import { saveAs } from 'file-saver';
import Papa from 'papaparse';

const columns = [
  { field: "id", headerName: "ID", flex: 0.5 },
  { field: "Name", headerName: "Name", flex: 1, cellClassName: "name-column--cell no-border-bottom" },
  { field: "category", headerName: "CATEGORY", flex: 1 },
  { field: "current_price", headerName: "EXISTED PRICE", type: "number", headerAlign: "left", align: "left", flex: 1},
  { field: "unity_price", headerName: "NEW PRICE", type: "number", headerAlign: "left", align: "left", flex: 1},
  // { field: "locationName", headerName: "LOCATION", flex: 1},
  { field: "createdAt", headerName: "DATE OF PUBLISHED", flex: 1 },
];

const Commodity = () => {
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const [nameFilter, setNameFilter] = useState("");
  const dispatch = useDispatch();
  const commodityList = useSelector((state) => state.commodity.commodityList);
  const locationList = useSelector((state) => state.location.locationList);
  const loading = useSelector((state) => state.commodity.loading);
  const error = useSelector((state) => state.commodity.error);
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  useEffect(() => {
    dispatch(getCommodityList());
    dispatch(getLocationList());
  }, [dispatch]);

  const locationById = useMemo(() => {
    const locationMap = {};
    locationList.forEach((location) => {
      locationMap[location.id] = location.locationName;
    });
    return locationMap;
  }, [locationList]);

  const updatedCommodityList = commodityList.map((commodity) => ({
    ...commodity,
    locationName: locationById[commodity.locationId] || "",
  }));

  const filteredCommodityList = useMemo(() => {
    let filteredList = updatedCommodityList;

    if (startDate && endDate) {
      const startDateTime = new Date(startDate).setHours(0, 0, 0, 0);
      const endDateTime = new Date(endDate).setHours(23, 59, 59, 999);

      filteredList = filteredList.filter((commodity) => {
        const publishedDate = new Date(commodity.createdAt);
        return publishedDate >= startDateTime && publishedDate <= endDateTime;
      });
    }

    if (nameFilter) {
      filteredList = filteredList.filter((commodity) =>
        commodity.Name.toLowerCase().includes(nameFilter.toLowerCase())
      );
    }

    return filteredList;
  }, [startDate, endDate, nameFilter, updatedCommodityList]);

  const generateAndDownloadReport = () => {
    const csvData = Papa.unparse(filteredCommodityList, { header: true });
    const blob = new Blob([csvData], { type: 'text/csv;charset=utf-8;' });
    saveAs(blob, 'commodity_report.csv');
  };

  return (
    <Box m="20px">
      <Header title="Commodity Info" subtitle="List of Commodities" />
      <Box display="flex" justifyContent="end" mt="20px" mb="10px">
        <Link to='/addcommodity'>
          <Button type="submit" color="secondary" variant="contained">
            Add Commodity
          </Button>
        </Link>
        <TextField
          label="Start Date"
          type="date"
          value={startDate || ""}
          onChange={(e) => setStartDate(e.target.value)}
          InputLabelProps={{ shrink: true }}
        />
        <TextField
          label="End Date"
          type="date"
          value={endDate || ""}
          onChange={(e) => setEndDate(e.target.value)}
          InputLabelProps={{ shrink: true }}
        />
        <TextField
          label="Search By Name"
          value={nameFilter}
          onChange={(e) => setNameFilter(e.target.value)}
        />

        <Box>
          <Button
            sx={{
              backgroundColor: colors.blueAccent[700],
              color: colors.grey[100],
              fontSize: "14px",
              fontWeight: "bold",
              padding: "10px 20px",
            }}
            onClick={generateAndDownloadReport}
          >
            <DownloadOutlinedIcon sx={{ mr: "10px" }} />
            Download Reports
          </Button>
        </Box>

      </Box>
      {loading ? <p>Loading...</p> : error ? <p>Error: {error}</p> : <DataGrid rows={filteredCommodityList} columns={columns} components={{ Toolbar: GridToolbar }} />}
    </Box>
  );
};

export default Commodity;
