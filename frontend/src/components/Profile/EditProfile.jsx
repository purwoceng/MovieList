// import React, { useEffect, useState } from "react";
// import Avatar from "@mui/material/Avatar";
// import Button from "@mui/material/Button";
// import CssBaseline from "@mui/material/CssBaseline";
// import TextField from "@mui/material/TextField";
// import Link from "@mui/material/Link";
// import Grid from "@mui/material/Grid";
// import Box from "@mui/material/Box";
// import AccountCircleIcon from "@mui/icons-material/AccountCircle";
// import Typography from "@mui/material/Typography";
// import Container from "@mui/material/Container";
// import { createTheme, ThemeProvider } from "@mui/material/styles";
// import { axiosApi } from "../../api/api";
// import IconButton from "@mui/material/IconButton";
// import InputAdornment from "@mui/material/InputAdornment";
// import VisibilityIcon from "@mui/icons-material/Visibility";
// import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
// import Dialog from "@mui/material/Dialog";
// import DialogTitle from "@mui/material/DialogTitle";
// import DialogContent from "@mui/material/DialogContent";
// import DialogActions from "@mui/material/DialogActions";
// import { useNavigate } from "react-router-dom";
// import { jwtDecode } from "jwt-decode";

// function SignUp() {
//   const [formData, setFormData] = useState({
//     name: "",
//     email: "",
//     password: "",
//     confirmPassword: "",
//   });
//   const [showPassword, setShowPassword] = useState(false);
//   const [showPassword1, setShowPassword1] = useState(false);
//   const [open, setOpen] = useState(false);
//   const [required, setRequired] = useState(false);
//   const [message, setMessage] = useState("");
//   const [emailError, setEmailError] = useState("");
//   const [emailTaken, setEmailTaken] = useState(false);
//   const [passwordError, setPasswordError] = useState("");
//   const [name, setName] = useState("");
//   const [email, setEmail] = useState("");

//   const handleClickShowPassword = () => {
//     setShowPassword(!showPassword);
//   };

//   const handleMouseDownPassword = (event) => {
//     event.preventDefault();
//   };
//   const handleClickShowPassword1 = () => {
//     setShowPassword1(!showPassword1);
//   };

//   const handleMouseDownPassword1 = (event) => {
//     event.preventDefault();
//   };

//   useEffect(() => {
//     const token = localStorage.getItem("token");
//     if (token) {
//       const decodedToken = jwtDecode(token);
//       const { name, email, exp } = decodedToken;
//       setFormData({ name, email });

//       const currentTime = Date.now() / 1000;
//       if (exp < currentTime) {
//         setTokenExpired(true);
//       }
//     }
//   }, []);

//   const handleChange = (event) => {
//     const { name, value } = event.target;
//     setFormData((prevState) => ({
//       ...prevState,
//       [name]: value,
//     }));
//   };

//   const navigate = useNavigate();

//   const handleModalClose = () => {
//     setOpen(false);
//     setEmailTaken(false);
//     setEmailError("");
//     setPasswordError("");
//   };

//   const handleRequired = () => {
//     setRequired(false);
//   };

//   const isEmailValid = (email) => {
//     const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
//     return emailRegex.test(email);
//   };

//   const handleSubmit = async (event) => {
//     event.preventDefault();

//     if (!formData.name || !formData.email) {
//       setRequired(true);
//       return;
//     }

//     // Check if email format is valid
//     if (!isEmailValid(formData.email)) {
//       setEmailError("Invalid email format");
//       return;
//     }

//     // Check if passwords match
//     if (formData.password !== formData.confirmPassword) {
//       setPasswordError("Passwords do not match");
//       return;
//     }

//     try {
//       const response = await axiosApi.put("/profile", null, {
//         headers: {
//           Authorization: `Bearer ${localStorage.getItem("token")}`,
//         },
//       });
//       setOpen(true);
//       setFormData({
//         name: "",
//         email: "",
//         password: "",
//       });
//       localStorage.setItem("token", response.data.token);
//       navigate("/");
//     } catch (error) {
//       console.error("There was an error signing up:", error.response.data);
//       if (error.response.data.message === "Email already in use") {
//         setEmailTaken(true);
//       } else {
//         setMessage(error.response.data.message);
//       }
//     }
//   };

//   return (
//     <ThemeProvider theme={createTheme()}>
//       <Container component="main" maxWidth="xs">
//         <CssBaseline />
//         <Box
//           sx={{
//             marginTop: 8,
//             display: "flex",
//             flexDirection: "column",
//             alignItems: "center",
//           }}
//         >
//           <Typography component="h1" variant="h5">
//             Sign Up
//           </Typography>
//           <Box
//             component="form"
//             noValidate
//             onSubmit={handleSubmit}
//             sx={{ mt: 3 }}
//           >
//             <Grid container spacing={2}>
//               <Grid item xs={12}>
//                 <TextField
//                   autoComplete="given-name"
//                   name="name"
//                   required
//                   fullWidth
//                   id="name"
//                   value={formData.name}
//                   onChange={handleChange}
//                   label="Name"
//                 />
//               </Grid>
//               <Grid item xs={12}>
//                 <TextField
//                   required
//                   fullWidth
//                   id="email"
//                   label="Email Address"
//                   name="email"
//                   autoComplete="email"
//                   value={formData.email}
//                   onChange={handleChange}
//                   helperText="Please enter your email address"
//                   error={!!emailError || emailTaken}
//                   FormHelperTextProps={{ error: true }}
//                 />
//               </Grid>
//               <Grid item xs={12}>
//                 <TextField
//                   required
//                   fullWidth
//                   value={formData.password}
//                   onChange={handleChange}
//                   autoComplete="new-password"
//                   name="password"
//                   label="Password"
//                   type={showPassword ? "text" : "password"}
//                   id="password"
//                   InputProps={{
//                     endAdornment: (
//                       <InputAdornment position="end">
//                         <IconButton
//                           aria-label="toggle password visibility"
//                           onClick={handleClickShowPassword}
//                           onMouseDown={handleMouseDownPassword}
//                         >
//                           {showPassword ? (
//                             <VisibilityIcon />
//                           ) : (
//                             <VisibilityOffIcon />
//                           )}
//                         </IconButton>
//                       </InputAdornment>
//                     ),
//                   }}
//                 />
//               </Grid>
//             </Grid>
//             <Button
//               type="submit"
//               fullWidth
//               variant="contained"
//               sx={{ mt: 3, mb: 2 }}
//             >
//               Sign Up
//             </Button>
//             {message ? <p>{message}</p> : null}
//             <Grid container justifyContent="flex-end">
//               <Grid item>
//                 <Link href="/login" variant="body2">
//                   Already have an account? Sign in
//                 </Link>
//               </Grid>
//             </Grid>
//           </Box>
//         </Box>
//       </Container>
//       {/* Modal alert */}
//       <Dialog open={open} onClose={handleModalClose}>
//         <DialogTitle>Sign Up Successful</DialogTitle>
//         <DialogContent>
//           <Typography variant="body1">
//             You have successfully registered.
//           </Typography>
//         </DialogContent>
//         <DialogActions>
//           <Button onClick={handleModalClose} color="primary">
//             Close
//           </Button>
//         </DialogActions>
//       </Dialog>

//       {/* Error Dialogs */}
//       <Dialog
//         open={emailTaken || !!emailError || required || !!passwordError}
//         onClose={handleModalClose}
//       >
//         <DialogTitle>Error</DialogTitle>
//         <DialogContent>
//           {emailTaken && (
//             <Typography variant="body1">
//               The email you entered is already associated with an existing
//               account. Please use a different email address.
//             </Typography>
//           )}
//           {!!emailError && (
//             <Typography variant="body1">
//               Please enter a valid email address.
//             </Typography>
//           )}
//           {required && (
//             <Typography variant="body1">All fields are required!</Typography>
//           )}
//           {!!passwordError && (
//             <Typography variant="body1">{passwordError}</Typography>
//           )}
//         </DialogContent>
//         <DialogActions>
//           <Button onClick={handleModalClose} color="primary">
//             Close
//           </Button>
//         </DialogActions>
//       </Dialog>
//     </ThemeProvider>
//   );
// }

// export default SignUp;
