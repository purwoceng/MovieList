import React from "react";
import { Button, TextField, Grid, Paper } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { axiosApi } from "../../api/api";
import {
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
} from "@mui/material";

const Login = () => {

    const navigate = useNavigate();
    const [formData, setFormData] = React.useState({
        email: "",
        password: "",
    });
    const [open, setOpen] = React.useState(false); // State for success modal
    const [errorOpen, setErrorOpen] = React.useState(false); // State for error modal
    const [errorMessage, setErrorMessage] = React.useState(""); // Error message

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

    const handleSubmit = async (event) => {
        event.preventDefault();

        try {
            const response = await axiosApi.post("/login", formData);
            console.log("Response:", response.data);
            localStorage.setItem("token", response.data.token);
            setOpen(true); // Set open to true when login is successful
            console.log(object);
        } catch (error) {
            console.error("There was an error signing in:", error);
            setErrorMessage("Incorrect Email or Password");
            setErrorOpen(true); // Set errorOpen to true when login fails
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
                        src="https://fontmeme.com/permalink/240221/06da7b28bee6adaad2438f1dec7814ac.png"
                        alt="Logo"
                        style={{ display: "block", margin: "20px auto", width: "75%" }}
                    />
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
                                type="password"
                                variant="outlined"
                                value={formData.password}
                                onChange={handleChange}
                                fullWidth
                                required
                            />
                        </div>
                        <br />
                        <div>
                            <Button
                                type="submit"
                                variant="contained"
                                color="primary"
                                fullWidth
                            >
                                Login
                            </Button>
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
                    {"Sign Up Successful"}
                </DialogTitle>
                <DialogContent>
                    <DialogContent>
                        <p>
                            You have successfully logged in. Please proceed to the movies
                            page.
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

