import AddSharpIcon from "@mui/icons-material/AddSharp";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import CancelIcon from "@mui/icons-material/Cancel";
import PlaceIcon from "@mui/icons-material/Place";
import {
  Box,
  Button,
  CardActionArea,
  CardActions,
  Divider,
} from "@mui/material";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";

import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import * as React from "react";
import { useState } from "react";
import dummyImage from "../../assets/dummyImg.png";
import MakeReport from "../NewReport/MakeReport";
import Details from "../PopupScreens/Details";

export default function ReportCard({ data }) {
  const [detailsOpen, setDetailsOpen] = useState(false);

  const handleDetailsOpen = () => {
    setDetailsOpen(true);
  };

  const handleDetailsClose = () => {
    setDetailsOpen(false);
  };
  return (
    <Card
      sx={{
        // maxWidth: "390px",
        borderBottom: "3px solid #000000",
        borderRadius: "15px",
        "&:hover": {
          transition: "all .3s",
          transform: "scale(1.001)",
          boxShadow: "10px 10px 10px rgba(0,0,0,0.1)",
        },
      }}
    >
      <CardMedia
        component="img"
        height="150"
        image={data.imgUrl}
        alt="image"
        sx={{ backgroundColor: "#D9D9D9", objectFit: "contain" }}
      />
      <CardContent>
        <Typography variant="h4" noWrap component="div">
          {data.objName}
        </Typography>
        <Typography
          // variant="h6"
          sx={{
            display: "flex",
            alignItems: "end",
            fontSize: ".9rem",
            textTransform: "uppercase",
            fontWeight: "light",
          }}
        >
          <PlaceIcon /> {data.location}
        </Typography>
      </CardContent>
      <CardActions sx={{ marginLeft: "auto", justifyContent: "end" }}>
        <Button
          size="small"
          onClick={handleDetailsOpen}
          sx={{ padding: "5px", margin: "5px", color: "#000" }}
        >
          View more <ArrowForwardIosIcon />
        </Button>
        {/* => dialog ka jsx pasted here cause too lazy to make new component :) */}
        <Dialog
          open={detailsOpen}
          onClose={handleDetailsClose}
          maxWidth={"lg"}
          fullWidth={true}
          style={{ overflow: "hidden", borderRadius: "20px" }}
        >
          <DialogTitle
            sx={{
              m: 0,
              px: "2rem",
              fontSize: "2.5em",
              display: "flex",
              justifyContent: "space-between",
            }}
          >
            <span>Details</span>
            <IconButton
              aria-label="close"
              onClick={handleDetailsClose}
              sx={
                {
                  // color: (theme) => theme.palette.grey[500],
                }
              }
            >
              <CancelIcon sx={{ color: "red", fontSize: "45px" }} />
            </IconButton>
          </DialogTitle>
          <Divider />
          {/* here is the content */}
          <Details
            data={data}
            openDeatilsDialog={handleDetailsOpen}
            closeDetailsDialog={handleDetailsClose}
          />
        </Dialog>
      </CardActions>
    </Card>
  );
}
