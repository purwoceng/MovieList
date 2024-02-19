import { Router } from "express";
// import prisma from "../prisma.js";
import { PrismaClient } from "@prisma/client";
import bcrypt from "bcrypt"


const prisma = new PrismaClient();
const router = Router();

router.get("/", (req, res) => {
    res.send("Hello World!");
});

router.post("/users/register", async (req, res) => {
    const {name, email, password, image} = req.body
    
    if(!name || !email || !password) {
        return res.status(400).json({message: "All fields are required"})
    }
    
    const existUser = await prisma.user.findUnique({
        where: {
            email: email,
        },
    });

    if(existUser) {
        return res.status(400).json({message: "Email is already in use"})
    }

    const pass = await bcrypt.hash(password, 12)
        const user = await prisma.user.create({
            data: {
                name,
                email,
                password : pass,
                role_id : 1
                
            }
        })
        if(!user) return res.status(400).json({message: "User not created"})
        res.status(201).json({user})   
});

router.post("/users/login", async (req, res) => {
    const {email, password} = req.body

    if (!email || !password) {
        return res.status(400).json({message: "email or password is required"})
} 
    
    const user = await prisma.user.findUnique({
        where: {
            email: email
        },
    })
    if(!user) {
        return res.status(400).json({message: "Invalid email or password"})
    }
    const validPassword = bcrypt.compareSync(password, user.password)
    if(!validPassword) {
        return res.status(400).json({message: "Invalid credential"})
    }

     return res.status(200).json({ message: "Login successful", user: user });

})
export default router