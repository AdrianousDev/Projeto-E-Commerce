import { Prisma } from "@prisma/client";
import { prisma } from "../libs/prisma";

export const createCliente = async (data: Prisma.ClienteCreateInput) => {
  try {
    const user = await prisma.cliente.create({ data });
    return user;
  } catch (error) {
    return false;
  }
};

export const findCliente = async (email: string) => {
  try {
    const user = await prisma.cliente.findUnique({ where: { email } });
    return user;
  } catch (error) {
    return false;
  }
};
