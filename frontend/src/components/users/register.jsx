import React, { useState } from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import Link from "@mui/material/Link";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { axiosApi } from "../../api/api";
import IconButton from "@mui/material/IconButton";
import InputAdornment from "@mui/material/InputAdornment";
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";
import { useNavigate } from "react-router-dom";

function SignUp() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [showPassword, setShowPassword] = useState(false);
  const [showPassword1, setShowPassword1] = useState(false);
  const [open, setOpen] = useState(false);
  const [required, setRequired] = useState(false);
  const [message, setMessage] = useState("");
  const [emailError, setEmailError] = useState("");
  const [emailTaken, setEmailTaken] = useState(false);
  const [passwordError, setPasswordError] = useState("");

  const handleClickShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };
  const handleClickShowPassword1 = () => {
    setShowPassword1(!showPassword1);
  };

  const handleMouseDownPassword1 = (event) => {
    event.preventDefault();
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const navigate = useNavigate();

  const handleModalClose = () => {
    setOpen(false);
    setEmailTaken(false);
    setEmailError("");
    setPasswordError("");
  };

  const handleRequired = () => {
    setRequired(false);
  };

  const isEmailValid = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (
      !formData.name ||
      !formData.email ||
      !formData.password ||
      !formData.confirmPassword
    ) {
      setRequired(true);
      return;
    }

    // Check if email format is valid
    if (!isEmailValid(formData.email)) {
      setEmailError("Invalid email format");
      return;
    }

    // Check if passwords match
    if (formData.password !== formData.confirmPassword) {
      setPasswordError("Passwords do not match");
      return;
    }

    axiosApi
      .post("/register", {
        name: formData.name,
        email: formData.email,
        password: formData.password,
      })
      .then((response) => {
        console.log("Response:", response.data.response);
        setOpen(true);
        setFormData({
          name: "",
          email: "",
          password: "",
          confirmPassword: "",
        });
        localStorage.setItem("token", response.data.token);
        navigate("/");
      })
      .catch((error) => {
        console.error("There was an error signing up:", error.response.data);
        if (error.response.data.message === "Email already in use") {
          setEmailTaken(true);
        } else {
          setMessage(error.response.data.message);
        }
      });
  };

  return (
    <ThemeProvider theme={createTheme()}>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <img
            src="https://fontmeme.com/permalink/240225/faea312e9c50e22410269ab0d1bdc488.png"
            alt="Logo"
            style={{ display: "block", margin: "0px auto", width: "70%" }}
          />
          <Typography component="h1" variant="h5">
            Daftar Dulu ya!
          </Typography>
          <Box
            component="form"
            noValidate
            onSubmit={handleSubmit}
            sx={{ mt: 3 }}
          >
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <TextField
                  autoComplete="given-name"
                  name="name"
                  required
                  fullWidth
                  id="name"
                  value={formData.name}
                  onChange={handleChange}
                  label="Name"
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  id="email"
                  label="Email Address"
                  name="email"
                  autoComplete="email"
                  value={formData.email}
                  onChange={handleChange}
                  error={!!emailError || emailTaken}
                  FormHelperTextProps={{ error: true }}
                  type="email"
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  value={formData.password}
                  onChange={handleChange}
                  autoComplete="new-password"
                  name="password"
                  label="Password"
                  type={showPassword ? "text" : "password"}
                  id="password"
                  InputProps={{
                    endAdornment: (
                      <InputAdornment position="end">
                        <IconButton
                          aria-label="toggle password visibility"
                          onClick={handleClickShowPassword}
                          onMouseDown={handleMouseDownPassword}
                        >
                          {showPassword ? (
                            <VisibilityIcon />
                          ) : (
                            <VisibilityOffIcon />
                          )}
                        </IconButton>
                      </InputAdornment>
                    ),
                  }}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  autoComplete="new-password"
                  name="confirmPassword"
                  label="Confirm Password"
                  type={showPassword1 ? "text" : "password"}
                  id="confirmPassword"
                  error={!!passwordError}
                  helperText={passwordError}
                  FormHelperTextProps={{ error: true }}
                  InputProps={{
                    endAdornment: (
                      <InputAdornment position="end">
                        <IconButton
                          aria-label="toggle password visibility"
                          onClick={handleClickShowPassword1}
                          onMouseDown={handleMouseDownPassword1}
                        >
                          {showPassword1 ? (
                            <VisibilityIcon />
                          ) : (
                            <VisibilityOffIcon />
                          )}
                        </IconButton>
                      </InputAdornment>
                    ),
                  }}
                />
              </Grid>
            </Grid>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Sign Up
            </Button>
            {message ? <p>{message}</p> : null}
            <Grid container justifyContent="flex-end">
              <Grid item>
                <Link href="/login" variant="body2">
                  Udah Punya akun?? Masuk aja
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
      </Container>
      {/* Modal alert */}
      <Dialog open={open} onClose={handleModalClose}>
        <DialogTitle>Sign Up Successful</DialogTitle>
        <DialogContent>
          <Typography variant="body1">
            You have successfully registered.
          </Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleModalClose} color="primary">
            Close
          </Button>
        </DialogActions>
      </Dialog>

      {/* Modal for email already in use */}
      <Dialog open={emailTaken} onClose={handleModalClose}>
        <DialogTitle>Email Already in Use</DialogTitle>
        <DialogContent>
          <Typography variant="body1">
            The email you entered is already associated with an existing
            account. Please use a different email address.
          </Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleModalClose} color="primary">
            Close
          </Button>
        </DialogActions>
      </Dialog>

      {/* Modal for invalid email format */}
      <Dialog open={!!emailError} onClose={handleModalClose}>
        <DialogTitle>Invalid Email Format</DialogTitle>
        <DialogContent>
          <Typography variant="body1">
            Please enter a valid email address.
          </Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleModalClose} color="primary">
            Close
          </Button>
        </DialogActions>
      </Dialog>

      {/* Modal for required fields */}
      <Dialog open={required} onClose={handleRequired}>
        <DialogTitle>Required</DialogTitle>
        <DialogContent>
          <Typography variant="body1">All Fields are Required!</Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleRequired} color="primary">
            Close
          </Button>
        </DialogActions>
      </Dialog>
    </ThemeProvider>
  );
}

export default SignUp;
