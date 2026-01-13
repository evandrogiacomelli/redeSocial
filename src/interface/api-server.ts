// @ts-ignore
import express, { Express, Request, Response } from "express";
import {registerRoutes} from "./routes/register-routes";

export class ApiServer {
  start(): void {
    const app: Express = express();

    app.use(express.json());

    app.get("/status", (_req: Request, res: Response) => {
      res.json({
        status: "Running",
        timestamp: new Date().toISOString(),
      });
    });

    registerRoutes(app);
    const port = Number(process.env.PORT) || 3000;
    app.listen(port, () => console.log(`Server running on port ${port}`));
  }
}
