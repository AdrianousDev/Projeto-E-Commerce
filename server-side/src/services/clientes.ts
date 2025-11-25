import { Prisma } from "@prisma/client";
import { prisma } from "../libs/prisma";

export const createCliente = async (data: Prisma.ClienteCreateInput) => {
  try {
    const createdCliente = await prisma.cliente.create({ data });
    return createdCliente;
  } catch (error) {
    return false;
  }
};
