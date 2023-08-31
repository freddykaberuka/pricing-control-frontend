import React, { useState, useEffect, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import Box from "@mui/material/Box";
import Header from "../../components/Header";
import { getComplaintList } from "../../redux/complaintSlice";
import { getCommodityList } from "../../redux/commoditySlice";
import { getLocationList } from "../../redux/locationSlice";
import { Button, TextField, useTheme } from "@mui/material";
import { tokens } from "../../theme";
import { Document, Page, Text, View, StyleSheet, PDFDownloadLink, Image } from '@react-pdf/renderer';
import logo from '../../assets/images.jpeg'

const columns = [
  { field: "commodityName", headerName: "COMMODITY", flex: 1 },
  { field: "description", headerName: "DESCRIPTION", flex: 1 },
  { field: "locationName", headerName: "LOCATION", flex: 1 },
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
    width: '100%',
    margin: 'auto',
    borderStyle: 'solid',
    borderColor: '#bfbfbf',
    borderWidth: 1,
    borderRightWidth: 0,
    borderBottomWidth: 0,
  },
  tableRow: { margin: 'auto', flexDirection: 'row', marginTop: 0, marginBottom: 0 },
  tableColHeader: {
    width: '33%',
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
    width: '33%',
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

const Complaints = () => {
  const [commodityFilter, setCommodityFilter] = useState("");
  const [locationFilter, setLocationFilter] = useState("");

  const dispatch = useDispatch();
  const complaintList = useSelector((state) => state.complaint.complaintList);
  const commodityList = useSelector((state) => state.commodity.commodityList);
  const locationList = useSelector((state) => state.location.locationList);
  const loading = useSelector((state) => state.complaint.loading);
  const error = useSelector((state) => state.complaint.error);
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

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
      locationMap[location.id] = location.locationName;
    });
    return locationMap;
  }, [locationList]);

  const updatedComplaintList = complaintList.map((complaint) => ({
    ...complaint,
    commodityName: commodityById[complaint.commodity_id] || "",
    locationName: locationById[complaint.locationId] || "",
  }));

  const filteredComplaintList = useMemo(() => {
    let filteredList = updatedComplaintList;

    if (commodityFilter) {
      filteredList = filteredList.filter((complaint) =>
        complaint.commodityName.toLowerCase().includes(commodityFilter.toLowerCase())
      );
    }

    if (locationFilter) {
      filteredList = filteredList.filter((complaint) =>
        complaint.locationName.toLowerCase().includes(locationFilter.toLowerCase())
      );
    }

    return filteredList;
  }, [commodityFilter, locationFilter, updatedComplaintList]);

  const generateAndDownloadPDF = () => {
    const fileName = 'complaint_report.pdf';

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
          <Text style={styles.title}>Complaint Report</Text>
          <View style={styles.tableRow}>
            <Text style={styles.tableColHeader}>Commodity</Text>
            <Text style={styles.tableColHeader}>Description</Text>
            <Text style={styles.tableColHeader}>Location</Text>
          </View>
          {filteredComplaintList.map((complaint) => (
          <View key={complaint.id} style={styles.tableRow}>
            <Text style={styles.tableCol}>{complaint.commodityName}</Text>
            <Text style={styles.tableCol}>{complaint.description}</Text>
            <Text style={styles.tableCol}>{complaint.locationName}</Text>
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
              Download Complaint Reports
            </Button>
          )
        }
      </PDFDownloadLink>
    );
  };

  return (
    <Box m="20px">
      <Header title="Complaint Info" subtitle="List of Complaints" />
      <Box display="flex" justifyContent="end" mt="20px" mb="10px">
        <TextField
          label="Filter by Commodity"
          value={commodityFilter}
          onChange={(e) => setCommodityFilter(e.target.value)}
        />
        <TextField
          label="Filter by Location"
          value={locationFilter}
          onChange={(e) => setLocationFilter(e.target.value)}
        />
        <Box>
          {generateAndDownloadPDF()}
        </Box>
      </Box>
      {loading ? (
        <p>Loading...</p>
      ) : error ? (
        <p>Error: {error}</p>
      ) : (
        <DataGrid
          rows={filteredComplaintList}
          columns={columns}
          components={{ Toolbar: GridToolbar }}
        />
      )}
    </Box>
  );
};

export default Complaints;
