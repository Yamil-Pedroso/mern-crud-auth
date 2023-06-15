import jwt from "jsonwebtoken";
import { TOKEN_SECRET } from "../config";

export const auth = (req: any, res: any, next: any) => {
    try {
        const { token } = req.cookies;

        if (!token) return res.status(401).json({ message: "No token, Unauthorized" });

        jwt.verify(token, TOKEN_SECRET, (err: any, user: any) => {
            if (err) return res.status(401).json({ message: "Unauthorized, token is not valid" });

            req.user = user;
            next();
        });
    } catch (error: any) {
        return res.status(500).json({ message: error.message });
    }
};