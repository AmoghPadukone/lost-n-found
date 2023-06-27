import { Box, Button, Grid } from "@mui/material";
import { getDocs } from "firebase/firestore";
import { Link } from "react-router-dom";
import claim from "../assets/claim.png";
import Footer from "../components/UI/Footer";
import GithubButton from "../components/UI/GithubButton";
import InfoCard from "../components/UI/InfoCard";
import Navbar from "../components/UI/Navbar";

const Info = (props) => {
  const posts = [
    { title: "Here to report a article? ", image: "", imageAlt: "" },
    { title: "Here to claim a article as yours? ", image: "", imageAlt: "" },
    { title: "Someone else claimed your belongings?", image: "", imageAlt: "" },
  ];
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
            <InfoCard
              info={{
                title: "Here to report a article? ",
                image: "src/assets/report.png",
                imageAlt: "",
              }}
            />
          </Grid>
          <Grid
            sx={{ wordWrap: "break-word" }}
            item
            xs={12}
            sm={6}
            md={4}
            xl={4}
          >
            <InfoCard
              info={{
                title: "Here to claim a article as yours?  ",
                image: "src/assets/claim.png",
                imageAlt: "",
              }}
            />
          </Grid>
          <Grid
            sx={{ wordWrap: "break-word" }}
            item
            xs={12}
            sm={6}
            md={4}
            xl={4}
          >
            <InfoCard
              info={{
                title: "Someone  claimed your belongings? ",
                image: "src/assets/sad.png",
                imageAlt: "",
              }}
            />
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
