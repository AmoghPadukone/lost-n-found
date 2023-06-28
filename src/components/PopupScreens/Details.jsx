import CancelIcon from "@mui/icons-material/Cancel";
import FlagIcon from "@mui/icons-material/Flag";
import { Box, Button, Divider, Typography } from "@mui/material";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import IconButton from "@mui/material/IconButton";
import MakeReport from "../NewReport/MakeReport";
// import app from "../../firebaseConfig";
import { styled } from "@mui/material/styles";
import { useState } from "react";
import { useMediaQuery } from "react-responsive";
import ClaimInfo from "./ClaimInfo";
import classes from "./Details.module.css";
import MobileClaimInfo from "./MobileComponents/Mobile-ClaimInfo";
const StyledBox = styled(Box)`
  box-shadow: 5px 5px 1px rgb(0, 0, 0);
  border: 1px solid #000;
  margin-bottom: 2rem;
  width: 100%;
  min-height: 60px;
  font-weight: 500;
  font-size: 1.25rem;
  line-height: 1.4375em;
  display: flex;
  word-wrap: break-word;
  align-items: flext-start;
  padding: 20px;
`;

const Details = ({ data, openDeatilsDialog, closeDetailsDialog }) => {
  const [openClaim, setOpenClaim] = useState(false);

  const handleClaimClose = () => {
    setOpenClaim(false);
  };
  const handleClaimOpen = (e) => {
    setOpenClaim(true);
  };
  const isMobile = useMediaQuery({ maxWidth: 750 });

  return (
    <>
      <Box sx={{ display: "flex" }}>
        <Box
          sx={{
            overflow: "auto",
            maxHeight: "80vh",
            width: "180%",
            // height: "120%",
          }}
        >
          <div style={{ minWidth: "100%", padding: " 5% 10%" }}>
            <span
              style={{
                letterSpacing: ".11ch",
                // opacity: ".9",

                fontSize: "1rem",
              }}
            >
              Name of the lost item:
            </span>
            <StyledBox sx={{}}>
              <p>{data.objName}</p>
            </StyledBox>
            <span
              style={{
                letterSpacing: ".11ch",
                // opacity: ".9",

                fontSize: "1rem",
              }}
            >
              It was found in:
            </span>
            <StyledBox sx={{}}>
              <p>{data.location}</p>
            </StyledBox>
            <span
              style={{
                letterSpacing: ".11ch",
                // opacity: ".9",

                fontSize: "1rem",
              }}
            >
              More details on the location:
            </span>
            <StyledBox sx={{}}>
              <p>{data.details}</p>
            </StyledBox>
            <Typography sx={{ paddingLeft: ".5rem", mb: "1rem" }} variant="h4">
              Claim Logs:
            </Typography>
            <StyledBox>
              {data.claimLogs.length === 0 && (
                <p
                  style={{
                    letterSpacing: ".11ch",
                    opacity: ".9",
                    fontSize: ".8rem",
                  }}
                >
                  No one has claimed this lost item yet
                </p>
              )}
              {data.claimLogs.length >= 1 && (
                <div>
                  {data.claimLogs.map((item, index) => (
                    <li key={index}>{` ${item.name} - ${item.srn} `}</li>
                  ))}
                </div>
              )}
            </StyledBox>
            <Typography
              sx={{
                mt: "2rem",
                letterSpacing: ".15ch",
                textAlign: "center",
              }}
            >
              To know more about how to go about retrieving your lost item click
              on claim <br />
              ╰⁠(⁠ ⁠･⁠ ⁠ᗜ⁠ ⁠･⁠ ⁠)⁠➝
            </Typography>
          </div>
        </Box>

        <Box
          className={classes.uploadContainer}
          id="sdaa"
          sx={{
            width: "100%",
            // height: "100%",
            display: "flex",
            flexDirection: "column",
            // alignItems: "center",
            justifyContent: "center",
            paddingTop: "2%",
            gap: "4rem",
          }}
        >
          <Box sx={{ textAlign: "center", paddingTop: "5%", margin: "auto" }}>
            <Box
              sx={{
                // padding: "7px 0px 10px 10px",
                margin: "15px",
                padding: "5%",
                borderRadius: "10px",
                border: "2.5px solid ",
              }}
            >
              <img
                src={data.imgUrl}
                style={{
                  objectFit: "contain",
                  // margin: "5px",
                  // boxShadow: "10px 10px 1px rgb(0, 0, 0)",
                  // border: "2.5px solid #000 ",
                  maxHeight: "50vh",
                }}
                id="outputImage"
                alt="user uploaded image"
                width="100%"
              />
            </Box>
          </Box>
          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              paddingBottom: "10%",
            }}
          >
            <Button
              onClick={handleClaimOpen}
              // onClick={closeDialog}
              sx={{
                justifySelf: "flex-end",
                width: "70%",
                height: "65px",
                margin: "auto",
                // padding: "1.1em 0",
                fontSize: "1.5rem",
                color: "#000",
                backgroundColor: "#E5FFD1",
                border: "1px solid #000",
                // boxShadow: " 5px 5px  rgb(0,0,0)",
                borderRadius: "10px",

                "&:hover": {
                  boxShadow: " 5px 5px  rgb(0,0,0)",
                  backgroundColor: "#E5FFD1",

                  border: "2px solid #000",
                  //   border: "2px solid #000",
                },
                "&:active": {
                  backgroundColor: "#E5FFD1",

                  boxShadow: " none",
                  transform: "translate(5px ,5px)",
                  //   transform: "scale(.9)",
                  transition: "none",
                  border: "2px solid #000",
                },
              }}
              disableElevation
              size="large"
              variant="contained"
              endIcon={
                <FlagIcon
                  style={{
                    fontSize: "1.5em",
                  }}
                />
              }
            >
              CLAIM
            </Button>{" "}
            <Dialog
              open={openClaim}
              onClose={handleClaimClose}
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
                <span>Claim the item</span>
                <IconButton
                  aria-label="close"
                  onClick={handleClaimClose}
                  sx={
                    {
                      // color: (theme) => theme.palette.grey[500],
                    }
                  }
                >
                  <CancelIcon sx={{ color: "red", fontSize: "2rem" }} />
                </IconButton>
              </DialogTitle>
              <Divider />
              {isMobile ? (
                <MobileClaimInfo
                  data={data}
                  closeDetailsDialog={closeDetailsDialog}
                  closeClaimInfo={handleClaimClose}
                />
              ) : (
                <ClaimInfo
                  data={data}
                  closeDetailsDialog={closeDetailsDialog}
                  closeClaimInfo={handleClaimClose}
                />
              )}
            </Dialog>
          </Box>
        </Box>
      </Box>

      {/* <DialogActions>
        <Button onClick={onClose}>Cancel</Button>
        <Button onClick={onClose}>Subscribe</Button>
      </DialogActions> */}
    </>
  );
};

export default Details;
