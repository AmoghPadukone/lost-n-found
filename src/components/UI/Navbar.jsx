import AddSharpIcon from "@mui/icons-material/AddSharp";
import CancelIcon from "@mui/icons-material/Cancel";
import HelpIcon from "@mui/icons-material/Help";
import { Box, Button, Divider } from "@mui/material";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import IconButton from "@mui/material/IconButton";
import TextField from "@mui/material/TextField";
import { styled } from "@mui/material/styles";
import { useState } from "react";
import logo from "../../assets/logo.webp";
import MakeReport from "../NewReport/MakeReport";
import classes from "./Navbar.module.css";

const Navbar = () => {
  const [open, setOpen] = useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
  return (
    <nav className={classes.navbar}>
      <img className={classes.logo} src={logo} alt="logo"></img>
      <div>
        <Button
          onClick={handleClickOpen}
          sx={{
            color: "#000",
            borderRadius: "8px",
            // boxShadow: "none",
            textTransform: "none",
            fontSize: 18,
            fontWeight: "900",
            padding: "6px 12px",
            border: "1px solid",
            lineHeight: 1.5,
            backgroundColor: "#FFC3EE",
            borderColor: " .5px solid #000",
            margin: "10px",
            "&:hover": {
              backgroundColor: "#FFC3EE",
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
                fontSize: "1.5em",
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
              fontSize: "2.5em",
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
          <MakeReport />
        </Dialog>
        <IconButton
          color="primary"
          aria-label="help"
          sx={{
            color: "#000",
            margin: 0,
            "&:active": {
              transform: "scale(0.9)",
            },
          }}
        >
          <HelpIcon style={{ fontSize: 40 }} />
        </IconButton>
      </div>
    </nav>
  );
};

export default Navbar;
