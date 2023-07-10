import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import Box from "@mui/material/Box";
import Header from "../../components/Header";
import { addCommodity, getCommodityList } from "../../redux/commoditySlice";
import { Button, TextField } from "@mui/material";
import { Link } from 'react-router-dom'

const columns = [
  { field: "id", headerName: "ID", flex: 0.5 },
  {
    field: "Name",
    headerName: "Name",
    flex: 1,
    cellClassName: "name-column--cell no-border-bottom",
  },
  { field: "category", headerName: "CATEGORY",flex: 1 },
  { field: "current_price", headerName: "EXISTED PRICE", type: "number", headerAlign: "left", align: "left", flex: 1},
  { field: "unity_price", headerName: "NEW PRICE", type: "number", headerAlign: "left", align: "left", flex: 1},
  { field: "createdAt", headerName: "DATE OF PUBLISHED", flex: 1 },
  
];

const Commodity = () => {
  const dispatch = useDispatch();
  const commodityList = useSelector((state) => state.commodity.commodityList);
  const commodity = useSelector((state) => state.commodity.commodity);
  const loading = useSelector((state) => state.commodity.loading);
  const error = useSelector((state) => state.commodity.error);

  useEffect(() => {
    dispatch(getCommodityList());
  }, [dispatch]);

  return (
    <Box m="20px">
      <Header title="Commodity Info" subtitle="List of Commodities" />
      <Box display="flex" justifyContent="end" mt="20px" mb="10px">
              <Link to='/addcommodity'><Button type="submit" color="secondary" variant="contained">
                Add Commodity
              </Button>
              </Link>
            </Box>
      {loading ? (
        <p>Loading...</p>
      ) : error ? (
        <p>Error: {error}</p>
      ) : (
        <DataGrid rows={commodityList} columns={columns} components={{ Toolbar: GridToolbar }} />
      )}
    </Box>
  );
};

export default Commodity;
