// @ts-ignore
import express, { Express, Request, Response } from "express";
import { attachRoutes } from "./routes/routes";
import { errorMiddleware } from "./middlewares/error-middleware";

export class ApiServer {
  start(): void {
    const app: Express = express();

    app.use(express.json());

    app.get("/health", (_req: Request, res: Response) => {
      res.json({
        status: "Running",
        timestamp: new Date().toISOString(),
      });
    });

    attachRoutes(app);
    app.use(errorMiddleware);
    const port = Number(process.env.PORT) || 3000;
    app.listen(port, () => console.log(`Server running on port ${port}`));
  }
}
