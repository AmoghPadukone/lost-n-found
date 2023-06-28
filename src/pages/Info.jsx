import CancelIcon from "@mui/icons-material/Cancel";
import { Box, Button, CardActionArea, Divider, Grid } from "@mui/material";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import { getDocs } from "firebase/firestore";
import { useState } from "react";
import { Link } from "react-router-dom";

import claim from "../assets/claim.png";
import Footer from "../components/UI/Footer";
import GithubButton from "../components/UI/GithubButton";
import InfoCard from "../components/UI/InfoCard";
import Navbar from "../components/UI/Navbar";
//images
import reportImg from "../assets/Report-help content.webp";
import WrongClaimStep1 from "../assets/WrongClaim1.webp";
import WrongClaimStep2 from "../assets/WrongClaim2.webp";
import WrongClaimStep3 from "../assets/WrongClaim3.webp";
import claimStep1 from "../assets/claim1.webp";
import claimStep2 from "../assets/claim2.webp";
import claimStep3 from "../assets/claim3.webp";

const Info = (props) => {
  const [openReportDialog, setOpenReportDialog] = useState(false);
  const handleOpenReportDialog = () => {
    setOpenReportDialog(true);
  };

  const handleCloseReportDialog = () => {
    setOpenReportDialog(false);
  };
  const [openClaimDialog, setOpenClaimDialog] = useState(false);
  const handleOpenClaimDialog = () => {
    setOpenClaimDialog(true);
  };

  const handleCloseClaimDialog = () => {
    setOpenClaimDialog(false);
  };
  const [openWrongClaim, setOpenWrongClaim] = useState(false);
  const handleOpenWrongClaim = () => {
    setOpenWrongClaim(true);
  };

  const handleCloseWrongClaim = () => {
    setOpenWrongClaim(false);
  };
  return (
    <>
      <Navbar />
      <Box sx={{ padding: "3% 5%", minHeight: "88vh" }}>
        <Grid container spacing={3} justifyContent="flex-start">
          <Grid
            sx={{ wordWrap: "break-word" }}
            item
            xs={12}
            sm={6}
            md={4}
            xl={4}
          >
            {/* <InfoCard
              info={{
                title: "Here to report a article? ",
                image: "src/assets/report.png",
                imageAlt: "",
              }}
            /> */}
            <Card sx={{ border: "1px solid #000", borderRadius: "10px" }}>
              <CardActionArea onClick={handleOpenReportDialog}>
                <CardMedia
                  component="img"
                  height="200"
                  sx={{ objectFit: "contain", padding: "5px 0 0 0" }}
                  image="https://firebasestorage.googleapis.com/v0/b/lostnfound-2023.appspot.com/o/temp%2Freport.png?alt=media&token=555b06df-c94a-4cf9-91f8-46bd1149d013"
                  alt=""
                />
                <CardContent>
                  <Typography
                    gutterBottom
                    variant="h5"
                    component="div"
                    sx={{ textAlign: "center" }}
                  >
                    Here to report a article?
                  </Typography>
                  <Typography
                    variant="body2"
                    color="text.secondary"
                    sx={{ textAlign: "center" }}
                  >
                    [Click to open a step by step guide]
                  </Typography>
                </CardContent>
              </CardActionArea>
            </Card>
            <Dialog
              open={openReportDialog}
              onClose={handleCloseReportDialog}
              maxWidth={"lg"}
              fullWidth={true}
              style={{ overflow: "hidden", borderRadius: "20px" }}
            >
              <DialogTitle
                sx={{
                  m: 0,
                  // px: "2rem",
                  fontSize: "1rem",
                  display: "flex",
                  justifyContent: "space-between",
                }}
              >
                <IconButton
                  aria-label="close"
                  onClick={handleCloseReportDialog}
                  sx={{
                    marginLeft: "auto",
                    // color: (theme) => theme.palette.grey[500],
                  }}
                >
                  <CancelIcon sx={{ color: "red", fontSize: "50px" }} />
                </IconButton>
              </DialogTitle>

              <img src={reportImg} alt="" />
            </Dialog>
          </Grid>

          {/* /////////////////// */}

          <Grid
            sx={{ wordWrap: "break-word" }}
            item
            xs={12}
            sm={6}
            md={4}
            xl={4}
          >
            <Card sx={{ border: "1px solid #000", borderRadius: "10px" }}>
              <CardActionArea onClick={handleOpenClaimDialog}>
                <CardMedia
                  component="img"
                  height="200"
                  sx={{ objectFit: "contain", padding: "5px 0 0 0" }}
                  image="https://firebasestorage.googleapis.com/v0/b/lostnfound-2023.appspot.com/o/temp%2Fclaim.png?alt=media&token=d87f76e5-6414-46bc-8e0d-fe6b14c09525"
                  alt="{info.imageAlt}"
                />
                <CardContent>
                  <Typography
                    gutterBottom
                    variant="h5"
                    component="div"
                    sx={{ textAlign: "center" }}
                  >
                    Here to claim a article as yours?
                    {/* Here to report a article? */}
                  </Typography>
                  <Typography
                    variant="body2"
                    color="text.secondary"
                    sx={{ textAlign: "center" }}
                  >
                    [Click to open a step by step guide]
                  </Typography>
                </CardContent>
              </CardActionArea>
            </Card>
            <Dialog
              open={openClaimDialog}
              onClose={handleCloseClaimDialog}
              maxWidth={"lg"}
              fullWidth={true}
              style={{ overflow: "hidden", borderRadius: "20px" }}
            >
              <DialogTitle
                sx={{
                  m: 0,
                  // px: "2rem",
                  fontSize: "1rem",
                  display: "flex",
                  justifyContent: "space-between",
                }}
              >
                <IconButton
                  aria-label="close"
                  onClick={handleCloseClaimDialog}
                  sx={{
                    marginLeft: "auto",
                    // color: (theme) => theme.palette.grey[500],
                  }}
                >
                  <CancelIcon sx={{ color: "red", fontSize: "50px" }} />
                </IconButton>
              </DialogTitle>

              <img src={claimStep1} alt="" />
              <img src={claimStep2} alt="" loading="lazy" />
              <img src={claimStep3} alt="" loading="lazy" />
            </Dialog>
          </Grid>

          {/* \\\\\\\\\\\\\\\\\ */}

          <Grid
            sx={{ wordWrap: "break-word" }}
            item
            xs={12}
            sm={6}
            md={4}
            xl={4}
          >
            {/* <InfoCard
              info={{
                title: "Someone  claimed your belongings? ",
                image: "src/assets/sad.png",
                imageAlt: "",
              }}
            /> */}

            <Card sx={{ border: "1px solid #000", borderRadius: "10px" }}>
              <CardActionArea onClick={handleOpenWrongClaim}>
                <CardMedia
                  component="img"
                  height="200"
                  sx={{ objectFit: "contain", padding: "5px 0 0 0" }}
                  image="https://firebasestorage.googleapis.com/v0/b/lostnfound-2023.appspot.com/o/temp%2Fsad.png?alt=media&token=11143858-4a78-41cf-875f-cd61fa764b50"
                  alt=""
                />
                <CardContent>
                  <Typography
                    gutterBottom
                    variant="h5"
                    component="div"
                    sx={{ textAlign: "center" }}
                  >
                    Someone claimed your belongings?
                    {/* Here to report a article? */}
                  </Typography>
                  <Typography
                    variant="body2"
                    color="text.secondary"
                    sx={{ textAlign: "center" }}
                  >
                    [Click to open a step by step guide]
                  </Typography>
                </CardContent>
              </CardActionArea>
            </Card>
            <Dialog
              open={openWrongClaim}
              onClose={handleCloseWrongClaim}
              maxWidth={"lg"}
              fullWidth={true}
              style={{ overflow: "hidden", borderRadius: "20px" }}
            >
              <DialogTitle
                sx={{
                  m: 0,
                  // px: "2rem",
                  fontSize: "1rem",
                  display: "flex",
                  justifyContent: "space-between",
                }}
              >
                <IconButton
                  aria-label="close"
                  onClick={handleCloseWrongClaim}
                  sx={{
                    marginLeft: "auto",
                    // color: (theme) => theme.palette.grey[500],
                  }}
                >
                  <CancelIcon sx={{ color: "red", fontSize: "50px" }} />
                </IconButton>
              </DialogTitle>

              <img src={WrongClaimStep1} alt="" />
              <img src={WrongClaimStep2} alt="" loading="lazy" />
              <img src={WrongClaimStep3} alt="" loading="lazy" />
            </Dialog>
          </Grid>
        </Grid>
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            marginTop: "5%",
          }}
        >
          <GithubButton />
        </Box>
      </Box>

      <Footer />
    </>
  );
};

export default Info;
