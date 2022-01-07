import { Router } from "express";
import {
  createMockUpPlans,
  createPlan,
  deletePlan,
  getAllPlans,
  IPlan,
  updateDTO,
  updatePlan,
} from "./routes/dbScripts";

const apiRouter = Router();

// eslint-disable-next-line @typescript-eslint/no-unsafe-call

apiRouter.get("/", (req, res) => {
  console.log("Data fetched");

  getAllPlans().then((data) => {
    console.log(data);
    return res.send(data);
  });
  // eslint-disable-next-line @typescript-eslint/no-unsafe-return
});

apiRouter.post("/", (req, res) => {
  const dataToCreate: IPlan = {
    name: req.body.name,
    price: req.body.price,
    annualDisc: req.body.annualDisc,
    repos: req.body.repos,
    members: req.body.members,
    storage: req.body.storage,
    support: req.body.support,
  };

  createPlan(dataToCreate);

  return res.sendStatus(200);
});

apiRouter.post("/mockup", (req, res) => {
  createMockUpPlans();

  return res.sendStatus(200);
});

apiRouter.put("/", (req, res) => {
  const dataToUpdate: updateDTO = {
    valuesToUpdate: req.body.update,
    namePlanToUpdate: req.body.name,
  };
  // eslint-disable-next-line no-console
  updatePlan(dataToUpdate);

  return res.sendStatus(200);
});

apiRouter.delete("/", (req, res) => {
  const dataToDelete = req.body.name;

  deletePlan({ namePlanToDelete: dataToDelete }).then((data) => res.json(data));
});

const BaseRouter = Router();
BaseRouter.use("/api", apiRouter);
export default BaseRouter;
