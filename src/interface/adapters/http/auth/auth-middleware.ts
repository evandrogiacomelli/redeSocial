// @ts-ignore
import { NextFunction, Request, Response } from "express";
import jwt, { JwtPayload } from "jsonwebtoken";
import { HttpError } from "../http/http-error";

export function authMiddleware(req: Request, res: Response, next: NextFunction): void {

    const header = req.header("authorization");
    if (!header) throw new HttpError(401, "UNAUTHORIZED", "Missing token");

    const [type, token] = header.split(" ");
    if (type !== "Bearer" || !token) throw new HttpError(401, "UNAUTHORIZED", "Missing token");

    //TODO mover isso aqui pra outro lugar.
    const secret: string | undefined = process.env.JWT_SECRET;
    if (!secret)  throw new Error("JWT_SECRET is required");

    const decoded: string | JwtPayload = jwt.verify(token, secret);
    if (typeof decoded === "string") throw new HttpError(401, "UNAUTHORIZED", "Invalid credentials");
    if (!decoded.sub) throw new HttpError(401, "UNAUTHORIZED", "Invalid credentials");

    // console.log(req.body.userId)
    // const userId: string = decoded.sub;
    // req.body.userId = userId;

    req.userId = decoded.sub;

    next();
}
