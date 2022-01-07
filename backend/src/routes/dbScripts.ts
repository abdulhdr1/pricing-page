import db from "./dbConnection";
import _, { create } from "lodash";
import { DataTypes } from "../../node_modules/sequelize";

export const Plan = db.define(
  "plan",
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    monthlyPrice: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    annuallyDiscount: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    repos: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    members: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    storage: {
      type: DataTypes.FLOAT,
      allowNull: false,
    },
    support: {
      type: DataTypes.STRING,
    },
  },
  {
    tableName: "Plans",
    updatedAt: "updateTimestamp",
  }
);

export interface IPlan {
  name: string;
  price: number;
  annualDisc: number;
  repos: number;
  members: number;
  storage: number;
  support?: string;
}

export async function createPlan(planObj: IPlan) {
  return await Plan.create({
    name: planObj.name,
    monthlyPrice: planObj.price,
    annuallyDiscount: planObj.annualDisc,
    repos: planObj.repos,
    members: planObj.members,
    storage: planObj.storage,
    support: planObj.support,
  }).then(() => {
    return console.log("plano " + planObj.name + " adicionado");
  });
}

export function createMockUpPlans() {
  const mockupPlans: IPlan[] = [
    {
      name: "Free",
      price: 0,
      annualDisc: 0,
      repos: 2,
      members: 5,
      storage: 10,
    },
    {
      name: "Plus",
      price: 999,
      annualDisc: 15,
      repos: 10,
      members: 15,
      storage: 50,
      support: "24/7",
    },
    {
      name: "Pro",
      price: 4999,
      annualDisc: 15,
      repos: 111,
      members: 111,
      storage: 1000,
    },
  ];
  mockupPlans.map((plan) => {
    createPlan(plan);
  });
}

export async function getAllPlans() {
  const plans = await Plan.findAll();
  return JSON.stringify(plans);
}

export interface updateDTO {
  valuesToUpdate: {
    name?: string;
    price?: number;
    repos?: number;
    members?: number;
    storage?: number;
    support?: string;
  };
  namePlanToUpdate: string;
}

export async function updatePlan(updateObj: updateDTO) {
  return await Plan.update(updateObj.valuesToUpdate, {
    where: {
      // eslint-disable-next-line @typescript-eslint/no-unsafe-call
      name: updateObj.namePlanToUpdate,
    },
  });
}

export interface deleteDTO {
  namePlanToDelete: string;
}

export async function deletePlan(deleteObj: deleteDTO) {
  return await Plan.destroy({
    where: {
      // eslint-disable-next-line @typescript-eslint/no-unsafe-call
      name: _.capitalize(deleteObj.namePlanToDelete),
    },
  });
}
