import React,{ useEffect,useState } from 'react';
import { Box, Button, IconButton, Typography, useTheme } from "@mui/material";
import { tokens } from "../../theme";
import { mockTransactions } from "../../data/mockData";
import DownloadOutlinedIcon from "@mui/icons-material/DownloadOutlined";
import EmailIcon from "@mui/icons-material/Email";
import PointOfSaleIcon from "@mui/icons-material/PointOfSale";
import PersonAddIcon from "@mui/icons-material/PersonAdd";
import TrafficIcon from "@mui/icons-material/Traffic";
import Header from "../../components/Header";
import LineChart from "../../components/LineChart";
import GeographyChart from "../../components/GeographyChart";
import BarChart from "../../components/BarChart";
import StatBox from "../../components/StatBox";
import ProgressCircle from "../../components/ProgressCircle";
import MainChart from "../../components/MainChart";
import { useDispatch, useSelector } from 'react-redux';
import { getUserList } from '../../redux/userSlice';
import { getComplaintList } from "../../redux/complaintSlice";
import { getCommodityList } from "../../redux/commoditySlice";

const Dashboard = () => {
  const dispatch = useDispatch();
  const [revenueGenerated, setRevenueGenerated] = useState(0);
  const userList = useSelector((state)=>state.user.userList);
  const complaintList = useSelector((state) => state.complaint.complaintList);
  const commodityList = useSelector((state) => state.commodity.commodityList);
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  useEffect(() => {
      dispatch(getUserList());
    }, []);
    useEffect(() => {
      dispatch(getComplaintList());
    }, []);
    useEffect(() => {
      dispatch(getCommodityList());
    }, []);


  useEffect(() => {
  if (commodityList.length > 0) {
    const totalPrice = commodityList.reduce((total, commodity) => {
      return total + Number(commodity.current_price);
    }, 0);

    const totalUnity = commodityList.reduce((total, commodity) => {
      return total + Number(commodity.unity_price);
    }, 0);

    const revenue = totalPrice - totalUnity;
    setRevenueGenerated(revenue);
  }
}, [commodityList]);
  const formattedRevenue = revenueGenerated.toLocaleString(undefined, {
    style: 'currency',
    currency: 'RWF',
  });

  return (
    <Box m="20px">Welcome to MINACOM Dashboard
      {/* HEADER */}
      <Box display="flex" justifyContent="space-between" alignItems="center">
        <Header title="Market Price Control and Analytic System" subtitle="Welcome to Rwanda Pricing and analytic Control" />

        <Box>
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
        </Box>
      </Box>

      {/* GRID & CHARTS */}
      <Box
        display="grid"
        gridTemplateColumns="repeat(12, 1fr)"
        gridAutoRows="140px"
        gap="20px"
      >
        {/* ROW 1 */}
        <Box
          gridColumn="span 3"
          backgroundColor={colors.primary[400]}
          display="flex"
          alignItems="center"
          justifyContent="center"
        >
          <StatBox
            title={complaintList.length}
            subtitle="Total Complaint"
            progress={complaintList.length<10 ? ( "0.10") : complaintList.length<20 ? "0.20":"0.30"}
            increase={"+"+complaintList.length+"%"}
            icon={
              <EmailIcon
                sx={{ color: colors.greenAccent[600], fontSize: "26px" }}
              />
            }
          />
        </Box>
        <Box
          gridColumn="span 3"
          backgroundColor={colors.primary[400]}
          display="flex"
          alignItems="center"
          justifyContent="center"
        >
          <StatBox
            title={commodityList.length}
            subtitle="Total Commodity"
            progress={commodityList.length<10 ? ( "0.10") : commodityList.length<20 ? "0.20":"0.30"}
            increase={"+"+commodityList.length+"%"}
            icon={
              <PointOfSaleIcon
                sx={{ color: colors.greenAccent[600], fontSize: "26px" }}
              />
            }
          />
        </Box>
        <Box
          gridColumn="span 3"
          backgroundColor={colors.primary[400]}
          display="flex"
          alignItems="center"
          justifyContent="center"
        >
          <StatBox
            title={userList.length}
            subtitle="Registered User"
            progress={userList.length<10 ? ( "0.10") : userList.length<20 ? "0.20":"0.30"}
            increase={"+"+userList.length+"%"}
            icon={
              <PersonAddIcon
                sx={{ color: colors.greenAccent[600], fontSize: "26px" }}
              />
            }
          />
        </Box>
        <Box
          gridColumn="span 3"
          backgroundColor={colors.primary[400]}
          display="flex"
          alignItems="center"
          justifyContent="center"
        >
          <StatBox
            title="0"
            subtitle="Traffic Received"
            progress="0"
            increase="+0%"
            icon={
              <TrafficIcon
                sx={{ color: colors.greenAccent[600], fontSize: "26px" }}
              />
            }
          />
        </Box>

        {/* ROW 3 */}
        <Box
          gridColumn="span 4"
          gridRow="span 2"
          backgroundColor={colors.primary[400]}
          p="30px"
        >
          <Typography variant="h5" fontWeight="600">
            Revenue
          </Typography>
          <Box
            display="flex"
            flexDirection="column"
            alignItems="center"
            mt="25px"
          >
            <ProgressCircle size="125" />
            <Typography
              variant="h5"
              color={colors.greenAccent[500]}
              sx={{ mt: "15px" }}
            >
               {formattedRevenue} revenue generated
            </Typography>
            <Typography>Includes extra misc expenditures and costs</Typography>
          </Box>
        </Box>
        <Box
          gridColumn="span 4"
          gridRow="span 2"
          backgroundColor={colors.primary[400]}
        >
          <Typography
            variant="h5"
            fontWeight="600"
            sx={{ padding: "20px 20px 10px 20px" }}
          >
            Average Product Price
          </Typography>
          <Box height="280px" mt="-20px">
            <LineChart isDashboard={true} />
          </Box>
        </Box>
        <Box
          gridColumn="span 4"
          gridRow="span 2"
          backgroundColor={colors.primary[400]}
          padding="30px"
        >
          <Typography
            variant="h5"
            fontWeight="600"
            sx={{ marginBottom: "15px" }}
          >
            Geography Based Price
          </Typography>
          <Box height="240px">
            <MainChart isDashboard={true} />
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default Dashboard;
