import React from "react";
import {
  Button,
  TextField,
  Grid,
  Paper,
  Typography,
  InputAdornment,
  IconButton,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import Link from "@mui/material/Link";
import { axiosApi } from "../../api/api";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
} from "@mui/material";
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import { useState } from "react";
import { useTheme } from "@mui/material/styles";


const Login = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = React.useState({
    email: "",
    password: "",
  });
  const [open, setOpen] = React.useState(false);
  const [errorOpen, setErrorOpen] = React.useState(false);
  const [errorMessage, setErrorMessage] = React.useState("");
  const [showPassword, setShowPassword] = useState(false);
  const theme = useTheme();


  const redLogo =
    "https://fontmeme.com/permalink/240222/a38b5a781021948c273517b66664cf81.png";
  const blueLogo =
    "https://fontmeme.com/permalink/240228/e37ab60c16940879ba3d04f5e125157a.png";

  const handleModalClose = () => {
    setOpen(false);
    setErrorOpen(false);
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleClickShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await axiosApi.post("/login", formData);
      localStorage.setItem("token", response.data.token);
      setOpen(true);
      navigate("/");
    } catch (error) {
      console.error("There was an error signing in:", error);
      setErrorMessage("Incorrect Email or Password");
      setErrorOpen(true);
    }
  };

  return (
    <Grid
      container
      justifyContent="center"
      alignItems="center"
      style={{ minHeight: "auto", marginTop: "80px" }}
    >
      <Grid
        item
        xs={12}
        sm={8}
        md={6}
        lg={4}
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Paper elevation={3} style={{ padding: 20, width: "100%" }}>
          <img
            // src="https://fontmeme.com/permalink/240228/e37ab60c16940879ba3d04f5e125157a.png"
            src={theme.palette.mode === "dark" ? redLogo : blueLogo}
            alt="Logo"
            style={{ display: "block", margin: "10px auto", width: "55%" }}
          />
          <Typography
            component="h6"
            variant="h5"
            marginBottom="10px"
            style={{ textAlign: "center" }}
          >
            Login
          </Typography>
          <form onSubmit={handleSubmit}>
            <div>
              <TextField
                id="email"
                name="email"
                label="Email"
                type="email"
                variant="outlined"
                value={formData.email}
                onChange={handleChange}
                fullWidth
                required
              />
            </div>
            <br />
            <div>
              <TextField
                id="password"
                name="password"
                label="Password"
                type={showPassword ? "text" : "password"}
                variant="outlined"
                value={formData.password}
                onChange={handleChange}
                fullWidth
                required
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
            </div>
            <br />
            <div>
              <Button
                type="submit"
                variant="contained"
                color={theme.palette.mode === "dark" ? 'error' : 'primary'}
                fullWidth
              >
                Login
              </Button>
              <Grid container justifyContent="flex-end">
                <Grid item style={{ marginTop: "10px" }}>
                  <Link href="/register" variant="body2">
                    Belum Punya akun?? Daftar dulu
                  </Link>
                </Grid>
              </Grid>
            </div>
          </form>
        </Paper>
      </Grid>

      <Dialog
        open={open}
        onClose={handleModalClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          {open ? "Login Error" : "Sign Up Successful"}
        </DialogTitle>
        <DialogContent>
          <DialogContent>
            <p>
              {open
                ? "Incorrect Email or Password"
                : "You have successfully logged in. Please proceed to the movies page."}
            </p>
          </DialogContent>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleModalClose} color="primary" autoFocus>
            Ok
          </Button>
        </DialogActions>
      </Dialog>

      <Dialog
        open={errorOpen}
        onClose={handleModalClose}
        aria-labelledby="error-dialog-title"
        aria-describedby="error-dialog-description"
      >
        <DialogTitle id="error-dialog-title">{"Login Error"}</DialogTitle>
        <DialogContent>
          <DialogContent>
            <p>{errorMessage}</p>
          </DialogContent>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleModalClose} color="primary" autoFocus>
            Ok
          </Button>
        </DialogActions>
      </Dialog>
    </Grid>
  );
};

export default Login;
