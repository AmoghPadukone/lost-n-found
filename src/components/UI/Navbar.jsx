import AddSharpIcon from "@mui/icons-material/AddSharp";
import CancelIcon from "@mui/icons-material/Cancel";
import QuizIcon from "@mui/icons-material/Quiz";
import { Box, Button, Divider } from "@mui/material";
import Dialog from "@mui/material/Dialog";

import DialogTitle from "@mui/material/DialogTitle";
import IconButton from "@mui/material/IconButton";
import { useMediaQuery } from "react-responsive";

import { styled } from "@mui/material/styles";
import { useState } from "react";
import { Link } from "react-router-dom";
import logo from "../../assets/logo.webp";
import MakeReport from "../NewReport/MakeReport";
import MobileMakeReport from "../NewReport/Mobile-MakeReport";
import classes from "./Navbar.module.css";

const Navbar = () => {
  const [open, setOpen] = useState(false);
  const isMobile = useMediaQuery({ maxWidth: 750 });

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
  return (
    <nav className={classes.navbar}>
      <Link to="/">
        <img className={classes.logo} src={logo} alt="logo"></img>
      </Link>
      <div>
        <Button
          onClick={handleClickOpen}
          sx={{
            minWidth: "50%",
            color: "#000",
            borderRadius: "8px",
            // boxShadow: "none",
            textTransform: "none",
            fontSize: "1rem",
            fontWeight: "900",
            // padding: "6px 12px",
            border: "1px solid",
            lineHeight: 1.5,
            backgroundColor: "#db6378",
            borderColor: " .5px solid #000",
            // margin: "10px",
            "&:hover": {
              backgroundColor: "#cc5a6e",
              // boxShadow: "none",
            },
            "&:active": {
              transform: "scale(0.95)",
            },
          }}
          // variant="filled"
          startIcon={
            <AddSharpIcon
              style={{
                fontSize: "1.2rem",
              }}
            />
          }
        >
          Report a lost item
        </Button>
        <Dialog
          open={open}
          onClose={handleClose}
          maxWidth={"lg"}
          fullWidth={true}
          style={{ overflow: "hidden", borderRadius: "20px" }}
        >
          <DialogTitle
            sx={{
              m: 0,
              px: "2rem",
              fontSize: "2rem",
              display: "flex",
              justifyContent: "space-between",
            }}
          >
            <span>Make new Report</span>
            <IconButton
              aria-label="close"
              onClick={handleClose}
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

          {isMobile ? (
            <MobileMakeReport closeDialog={handleClose} />
          ) : (
            <MakeReport closeDialog={handleClose} />
          )}
        </Dialog>
        <Link to="/info">
          <IconButton
            color="primary"
            aria-label="help"
            sx={{
              color: "#000",
              margin: 0,
              "&:hover": {
                backgroundColor: "transparent",
              },
              "&:active": {
                transform: "scale(0.9)",
                backgroundColor: "transparent",
              },
            }}
          >
            <QuizIcon sx={{ fontSize: 40 }} />
          </IconButton>
        </Link>
      </div>
    </nav>
  );
};

export default Navbar;
