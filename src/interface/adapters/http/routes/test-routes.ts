// @ts-ignore
import { Router, Request, Response } from "express";

export const testRoutes = Router();

testRoutes.get("/", (_req: Request, res: Response) => {
  res.status(200).json({ status: "ok" });
});

testRoutes.post("/", (_req: Request, res: Response) => {
    res.status(200).json({ status: "ok" });
});

testRoutes.patch("/", (_req: Request, res: Response) => {
    res.status(200).json({ status: "ok" });
});

testRoutes.delete("/", (_req: Request, res: Response) => {
    res.status(200).json({ status: "ok" });
});

