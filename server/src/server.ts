import express, { Response, Request } from "express";
import cors from "cors";
import companies from "./companies.json";
import { filterName, filterService } from "./utils";

const app = express();

app.use(cors());

//return just all companies
app.get("/companies", async (req: Request, res: Response) => {
  res.json(companies);
});

//route for server side search handling
app.get("/companies/search", async (req: Request, res: Response) => {
  const { q, services } = req.query;

  //filter for search term
  let results = q ? filterName(q as string, companies) : companies;

  //filter for selected services
  if (services) {
    results = filterService((services as string).split(","), results);
  }
  res.json(results);
});

const host = process.env.BIND_HOST || "localhost";
const port = process.env.PORT ? parseInt(process.env.PORT) : 8080;

app.listen(port, host, () => {
  console.log(`server started at http://${host}:${port}`);
});
