import { User } from "../models/user.model"
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import { TOKEN_SECRET } from "../config";
import { Request, Response } from "express";
import { createAccessToken } from "../libs/jwt";

export const register = async (req: Request, res: Response) => {
   try {
    const { username, email, password } = req.body;

    const userFound = await User.findOne({ email });

    if (userFound) return res.status(400).json({ message: "The email already exists" });

    // hashing password
    const passwordHash = await bcrypt.hash(password, 10);

    // create a new user
    const newUser = new User({
        username,
        email,
        password: passwordHash
    });

    // saving the new user in the database
    const savedUser = await newUser.save();

    // create access token
    //const token = await createAccessToken({ id: savedUser._id });
    jwt.sign({ id: savedUser._id }, "secret123", { expiresIn: "1d" }, (err, token) => {
       if(err) console.log(err);
         res.json({ token });
    });


   //res.cookie("token", token, {
   //    httpOnly: process.env.NODE_ENV !== "development",
   //    secure: true,
   //    sameSite: "none"
   //);

   //res.json({
   //   id: savedUser._id,
   //   username: savedUser.username,
   //   email: savedUser.email
   //});
    } catch (error: any) {
        return res.status(500).json({ message: error.message });
    }
};

export const login = async (req: Request, res: Response) => {
    try {
        const { email, password} = req.body;
        const userFound = await User.findOne({ email });

        if (!userFound) return res.status(400).json({ message: "The email does not exists" });

        const matchPassword = await bcrypt.compare(password, userFound.password);

        if (!matchPassword) return res.status(401).json({ message: "Incorrect password" });

        const token = await createAccessToken({ id: userFound._id, username: userFound.username });

        res.cookie("token", token, {
            httpOnly: process.env.NODE_ENV !== "development",
            secure: true,
            sameSite: "none"
        });

        res.json({
            id: userFound._id,
            username: userFound.username,
            email: userFound.email
        })
    } catch (error: any) {
        return res.status(500).json({ message: error.message });
    }
};

export const verifyToken = async (req: Request, res: Response) => {
    const { token } = req.cookies;
    if (!token) return res.status(401).json({ message: false });

    jwt.verify(token, TOKEN_SECRET, async (err: any, user: any) => {
        if (err) return res.sendStatus(401).json({ message: false });

        const userFound = await User.findById(user.id);

        if (!userFound) return res.status(401).json({ message: false});

        return res.json({
            id: userFound._id,
            username: userFound.username,
            email: userFound.email
        });
        })
};

export const logout = async (req: Request, res: Response) => {
    res.cookie("token", "", {
        httpOnly: true,
        secure: true,
        expires: new Date(0)
    });

    res.sendStatus(200);
}
