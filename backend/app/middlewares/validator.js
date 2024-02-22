const validateLogin = (req, res, next) => {
    const errors = {}

    if (!req.body.email) {
        errors.email = 'Email is required'
    }

    // validate valid email
    if (!/^\S+@\S+\.\S+$/.test(req.body.email)) {
        errors.email = 'Must be a valid email'
    }

    if (!req.body.password) {
        errors.password = 'Password is required'
    }

    if (Object.keys(errors).length > 0) {
        return res.status(422).json(errors)
    }

    next()
}

const validateRegister = (req, res, next) => {

    const { name, email, password } = req.body;

    if (!name || !email || !password) {
        return res.status(400).json({ message: "All fields are required" });
    }

    if (!/^\S+@\S+\.\S+$/.test(email)) {
        return res.status(400).json({ message: "Must be a valid email" });
    }

    // minimum password length of 6

    if (password.length < 6) {
        return res.status(400).json({ message: "Password must be at least 6 characters" });
    }

    // all fields cannot be fills with white space

    if (name.trim() === '' || email.trim() === '' || password.trim() === '') {
        return res.status(400).json({ message: "Fields must not contain white space" });
    }

    next()

}

export { validateLogin, validateRegister }