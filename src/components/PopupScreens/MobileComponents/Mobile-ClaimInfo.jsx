import AddPhotoAlternateIcon from "@mui/icons-material/AddPhotoAlternate";
import CancelIcon from "@mui/icons-material/Cancel";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import { Box, Button, Divider, Typography } from "@mui/material";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import IconButton from "@mui/material/IconButton";
import TextField from "@mui/material/TextField";
import { arrayUnion, collection, doc, updateDoc } from "firebase/firestore";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { useState } from "react";
import { useMediaQuery } from "react-responsive";
import { v4 } from "uuid";
import { dbInstance, storage } from "../../../firebaseConfig";
import FinalDetails from "../FinalDetails";
import MobileFinalDetails from "../MobileFinalDetails";

const claim = {
  name: "",
  srn: "",
  phone: "",
  classAndSec: "",
  idCardImgUrl: "",
};

const MobileClaimInfo = ({ data, closeClaimInfo, closeDetailsDialog }) => {
  const [fileUploadStatus, setFileUploadStatus] = useState(false);
  const [imagePreview, setimagePreview] = useState();
  const [uploadedImage, setUploadedImage] = useState(null);
  const [openFinal, setOpenFinal] = useState(false);
  const isMobile = useMediaQuery({ maxWidth: 750 });

  //helper functions for the last popUp to open
  const handleFinalOpen = () => {
    setOpenFinal(true);
  };

  const handleCloseFinal = () => {
    setOpenFinal(false);
    console.log("BRUH");
    closeDetailsDialog();
    closeClaimInfo();
  };

  //claimLogs updation
  const [makeClaim, setMakeClaim] = useState({
    ...claim,
  });

  const onTextChange = (e) => {
    let changeClaim = {
      ...makeClaim,
      [e.target.name]: e.target.value,
    };

    setMakeClaim(changeClaim);
  };

  //function to upload image to browser
  const handleUpload = (e) => {
    setFileUploadStatus(true);
    setimagePreview(URL.createObjectURL(e.target.files[0]));
    setUploadedImage(e.target.files[0]);
  };

  async function handleSubmit(e) {
    if (uploadedImage === null) {
      alert("ID Card is a must to claim lost items");
      return;
    }

    //function to upload image
    async function uploadImage(imgData) {
      //firebase function to upload the image
      //imgData is the imgRef as a paramenter
      await uploadBytes(imgData, uploadedImage);

      //fetching the uploaded image url
      const responseUrl = await getDownloadURL(ref(storage, imgData));
      return responseUrl;
    }

    async function sendSubmission() {
      //creates reference to firebase
      const imageRef = ref(storage, `idCards/${uploadedImage.name + v4()}`);
      //uploads image and then gets image url
      const resUrl = await uploadImage(imageRef);

      const updatedMakeClaim = {
        ...makeClaim,
        idCardImgUrl: resUrl,
      };

      //basic validation for the time being
      if (makeClaim.name && makeClaim.srn && makeClaim.phone !== "") {
        try {
          //this gets the report ref hopefully
          const reportRef = doc(dbInstance, `${data.id}`);
          await updateDoc(reportRef, {
            claimLogs: arrayUnion(updatedMakeClaim),
          });

          alert("claim confirmed :)");
        } catch (err) {
          alert("Something went wrong :(");
          console.log(err.message);
        }
      } else {
        alert("Please enter your details to continue");
      }

      setMakeClaim(updatedMakeClaim);
      return true;
    }

    const confirmation = await sendSubmission();
    if (confirmation) {
      handleFinalOpen();
    }
  }

  return (
    <>
      <Box sx={{ display: "flex", flexDirection: "column" }}>
        <Box
          sx={{
            // width: "100%",
            display: "flex",
            flexDirection: "column",

            justifyContent: "space-between",
          }}
        >
          <Box sx={{ textAlign: "center", paddingTop: "5%" }}>
            {!fileUploadStatus && (
              <Box sx={{ padding: "0 1.5rem" }}>
                <Typography fontSize={"1.5rem"} sx={{ paddingBottom: "1rem" }}>
                  {" "}
                  Upload a image of your REVA ID Card{" "}
                </Typography>
                <Box
                  sx={{
                    padding: "6rem",
                    display: "flex",
                    borderRadius: "10px",
                    border: "2.5px solid ",
                    margin: "auto",
                    maxWidth: "350px",
                  }}
                >
                  <IconButton
                    color="primary"
                    aria-label="upload picture"
                    component="label"
                    sx={{
                      position: "relative",
                      margin: "auto",
                      width: "100%",
                    }}
                  >
                    <input
                      hidden
                      accept="image/*"
                      type="file"
                      onChange={handleUpload}
                    />
                    {}
                    <AddPhotoAlternateIcon
                      fontSize={"large"}
                      sx={{
                        color: "#000",
                        fontSize: "3em",
                        "&:hover": {
                          //   backgroundColor: "#E5FFD1",
                          //   borderColor: "#E5FFD1",
                          transition: "all .3s",
                          padding: "5%",
                          borderRadius: "50%",
                          boxShadow: " 5px 5px 1px rgb(0,0,0)",
                          border: "2px solid #000",
                        },
                        "&:active": { transform: "scale(.9)" },
                      }}
                    />
                  </IconButton>
                </Box>
              </Box>
            )}
            {fileUploadStatus && (
              <Box>
                <Box
                  sx={
                    {
                      // display: "inline-flex",
                      // borderRadius: "10px",
                      // border: "2.5px solid ",
                    }
                  }
                >
                  <IconButton
                    color="primary"
                    aria-label="upload picture"
                    component="label"
                    sx={{
                      position: "relative",
                      margin: "auto",
                      //   width: "100%",
                    }}
                  >
                    <input
                      hidden
                      accept="image/*"
                      type="file"
                      onChange={handleUpload}
                    />
                    {}
                    <AddPhotoAlternateIcon
                      fontSize={"large"}
                      sx={{
                        color: "#000",
                        fontSize: "2em",
                        "&:hover": {
                          //   backgroundColor: "#E5FFD1",
                          //   borderColor: "#E5FFD1",
                          transition: "all .3s",
                          // padding: "5%",
                          borderRadius: "50%",
                          boxShadow: " 5px 5px 1px rgb(0,0,0)",
                          border: "2px solid #000",
                        },
                        "&:active": { transform: "scale(.9)" },
                      }}
                    />
                  </IconButton>
                </Box>

                <Box
                  sx={{
                    // padding: "7px 0px 10px 10px",
                    margin: "5%",
                    borderRadius: "10px",
                    border: "2.5px solid ",
                  }}
                >
                  <img
                    src={imagePreview}
                    style={{
                      maxWidth: "80%",
                      height: "100%",
                      objectFit: "cover",
                      margin: "5%",
                    }}
                    id="outputImage"
                    alt="user uploaded image"
                  />
                </Box>
              </Box>
            )}
            <Typography
              style={{
                letterSpacing: ".11ch",
                opacity: ".5",
                padding: "1rem 1rem 1rem 1rem",
                fontSize: ".9rem",
              }}
            >
              This is for extra security measure, Your ID card wont be made
              public
            </Typography>
          </Box>
        </Box>

        <Box
          sx={{
            overflow: "auto",
            // maxHeight: "80vh",
            // width: "180%",
          }}
        >
          <div style={{ minWidth: "100%", padding: " 5% 10%" }}>
            <p style={{ fontSize: "1.7rem", marginBottom: "2rem" }}>
              Fill out your details:
            </p>
            <TextField
              id="outlined-basic"
              label="Name"
              placeholder="Amogh Padukone"
              variant="outlined"
              fullWidth
              sx={{
                boxShadow: " 5px 5px 1px rgb(0,0,0)",
                marginBottom: "2rem",
              }}
              onChange={(e) => onTextChange(e)}
              name="name"
              value={makeClaim.name}
            />
            <TextField
              id="outlined-basic"
              label="SRN"
              variant="outlined"
              fullWidth
              placeholder="R21EJ094"
              sx={{
                boxShadow: " 5px 5px 1px rgb(0,0,0)",
                marginBottom: "2rem",
              }}
              onChange={(e) => onTextChange(e)}
              name="srn"
              value={makeClaim.srn}
            />
            <TextField
              id="outlined-basic"
              label="Phone Number"
              placeholder="+91 XXXXX XXXXX"
              variant="outlined"
              fullWidth
              type="number"
              sx={{
                boxShadow: " 5px 5px 1px rgb(0,0,0)",
                marginBottom: "2rem",
              }}
              onChange={(e) => onTextChange(e)}
              name="phone"
              value={makeClaim.phone}
            />
            <TextField
              id="outlined-basic"
              label="Class & Section"
              variant="outlined"
              placeholder="CSIT B"
              fullWidth
              sx={{
                boxShadow: " 5px 5px 1px rgb(0,0,0)",
                marginBottom: "2rem",
              }}
              onChange={(e) => onTextChange(e)}
              name="classAndSec"
              value={makeClaim.classAndSec}
            />
            <Box
              sx={{
                display: "flex",
                justifyContent: "center",
                paddingTop: "10%",
              }}
            >
              <Button
                onClick={handleSubmit}
                sx={{
                  width: "100%",

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
                  <CheckCircleIcon
                    style={{
                      fontSize: "1.5em",
                    }}
                  />
                }
              >
                Confirm
              </Button>{" "}
              <Dialog
                open={openFinal}
                onClose={handleCloseFinal}
                maxWidth={"lg"}
                fullWidth={true}
                style={{ overflow: "hidden", borderRadius: "20px" }}
              >
                <DialogTitle
                  sx={{
                    fontSize: "1.5rem",
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                  }}
                >
                  <span>Complete Details</span>
                  <IconButton
                    aria-label="close"
                    onClick={handleCloseFinal}
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
                {/* here is the content */}
                {isMobile ? (
                  <MobileFinalDetails data={data} />
                ) : (
                  <FinalDetails data={data} />
                )}
              </Dialog>
            </Box>
            <Typography
              sx={{
                mt: "2rem",
                letterSpacing: ".15ch",
                textAlign: "center",
                fontSize: ".8rem",
              }}
            >
              Please dont go about claiming something thats not yours
              <br /> (•́⁠ ⁠ ⁠‿⁠ ⁠,⁠•̀ ){" "}
            </Typography>
          </div>
        </Box>
      </Box>

      {/* <DialogActions>
        <Button onClick={onClose}>Cancel</Button>
        <Button onClick={onClose}>Subscribe</Button>
      </DialogActions> */}
    </>
  );
};

export default MobileClaimInfo;
