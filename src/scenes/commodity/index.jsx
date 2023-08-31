import React, { useState, useEffect, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import Box from "@mui/material/Box";
import Header from "../../components/Header";
import { getCommodityList } from "../../redux/commoditySlice";
import { getLocationList } from "../../redux/locationSlice";
import { Button, TextField, useTheme } from "@mui/material";
import { Link } from 'react-router-dom';
import DownloadOutlinedIcon from "@mui/icons-material/DownloadOutlined";
import { tokens } from "../../theme";
import { Document, Page, Text, View, StyleSheet, PDFDownloadLink, Image } from '@react-pdf/renderer';
import logo from '../../assets/images.jpeg'

const columns = [
  { field: "id", headerName: "ID", flex: 0.5 },
  { field: "Name", headerName: "Name", flex: 1, cellClassName: "name-column--cell no-border-bottom" },
  { field: "category", headerName: "CATEGORY", flex: 1 },
  { field: "current_price", headerName: "EXISTED PRICE", type: "number", headerAlign: "left", align: "left", flex: 1},
  { field: "unity_price", headerName: "NEW PRICE", type: "number", headerAlign: "left", align: "left", flex: 1},
  // { field: "locationName", headerName: "LOCATION", flex: 1},
  { field: "createdAt", headerName: "DATE OF PUBLISHED", flex: 1 },
];

const styles = StyleSheet.create({
  footer:{
    fontSize: 10,
    textAlign: 'right',
    position: 'absolute',
    bottom: 20,
    left: 0,
    right: 0,
    marginRight: 20,
  },
  page: {
    flexDirection: 'column',
    backgroundColor: '#ffffff',
    color: '#000000',
    padding: 20,
  },
  title: {
    fontSize: 18,
    marginBottom: 10,
    marginTop: 20,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  table: {
    display: 'table',
    width: 'auto',
    margin: 'auto',
    borderStyle: 'solid',
    borderColor: '#bfbfbf',
    borderWidth: 1,
    borderRightWidth: 0,
    borderBottomWidth: 0,
  },
  tableRow: { margin: 'auto', flexDirection: 'row', marginTop: 0, marginBottom: 0 },
  tableColHeader: {
    width: '20%',
    borderStyle: 'solid',
    borderColor: '#bfbfbf',
    borderBottomColor: '#000000',
    borderWidth: 1,
    borderLeftWidth: 0,
    borderTopWidth: 0,
    padding: 4,
    backgroundColor: '#f0f0f0',
    textAlign: 'center',
    fontWeight: 'bold',
  },
  tableCol: {
    fontSize: 14,
    width: '20%',
    borderStyle: 'solid',
    borderColor: '#bfbfbf',
    borderWidth: 1,
    borderLeftWidth: 0,
    borderTopWidth: 0,
    padding: 4,
    textAlign: 'center',
  },
  logoContainer: {
    flexDirection: 'column',
    justifyContent: 'flex-end',
    marginRight: 20,
    marginBottom: 20,
  },
  logo: {
    width: 100,
    height: 100,
  },
  addresses: {
    flexDirection: 'column',
    marginTop: 10,
    marginRight: 20,
    fontSize: 12
},
  
});

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

  const generateAndDownloadPDF = () => {
    const fileName = 'commodity_report.pdf';

    const MyDocument = (
      <Document>
        <Page style={styles.page}>
          <view style={styles.logoContainer}>
            <Image src={logo} style={styles.logo} /><br></br>
            <View style={styles.addresses}>
              <Text style={styles.address}>Ministry Trade and Industry</Text><br></br>
              <Text style={styles.address}>Address: KG 1 Roundabaout Kigali</Text><br></br>
              <Text style={styles.address}>Phone: +250 788 000 000</Text><br></br>
              <Text style={styles.address}>Email: </Text><br></br>
              <Text style={styles.address}>P.O Box: 73 Kigali-Rwanda</Text>
            </View>
          </view>
          <Text style={styles.title}>Commodity Report</Text>
          <View style={styles.tableRow}>
            <Text style={styles.tableColHeader}>ID</Text>
            <Text style={styles.tableColHeader}>Name</Text>
            <Text style={styles.tableColHeader}>Category</Text>
            <Text style={styles.tableColHeader}>Existing Price</Text>
            <Text style={styles.tableColHeader}>New Price</Text>
          </View>
          {filteredCommodityList.map((commodity) => (
            <View key={commodity.id} style={styles.tableRow}>
              <Text style={styles.tableCol}>{commodity.id}</Text>
              <Text style={styles.tableCol}>{commodity.Name}</Text>
              <Text style={styles.tableCol}>{commodity.category}</Text>
              <Text style={styles.tableCol}>{commodity.current_price}</Text>
              <Text style={styles.tableCol}>{commodity.unity_price}</Text>
            </View>
          ))}
          <Text style={styles.footer}>Done By MINACOM</Text>
        </Page>
      </Document>
    );

    return (
      <PDFDownloadLink document={MyDocument} fileName={fileName}>
        {({ blob, url, loading, error }) =>
          loading ? 'Loading document...' : (
            <Button
              sx={{
                backgroundColor: colors.blueAccent[700],
                color: colors.grey[100],
                fontSize: "14px",
                fontWeight: "bold",
                padding: "10px 20px",
              }}
            >
              <DownloadOutlinedIcon sx={{ mr: "10px" }} />
              Download Reports
            </Button>
          )
        }
      </PDFDownloadLink>
    );
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
          {generateAndDownloadPDF()}
        </Box>
      </Box>
      {loading ? <p>Loading...</p> : error ? <p>Error: {error}</p> : (
        <div id="commodity-report">
          <DataGrid rows={filteredCommodityList} columns={columns} components={{ Toolbar: GridToolbar }} />
        </div>
      )}
    </Box>
  );
};

export default Commodity;
