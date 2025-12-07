import { Prisma } from "@prisma/client";
import { prisma } from "../libs/prisma";

export const createCliente = async (data: Prisma.ClienteCreateInput) => {
  try {
    const user = await prisma.cliente.create({ data });
    return user;
    /*
    INSERT INTO Cliente (nome, email, createdAt)
    VALUES ('nome', 'email');
    */
  } catch (error) {
    return false;
  }
};

export const findCliente = async (email: string) => {
  try {
    const user = await prisma.cliente.findUnique({ where: { email } });
    return user;
    /*
    SELECT *
    FROM Cliente
    WHERE email = 'EMAIL_DO_CLIENTE';
    */
  } catch (error) {
    return false;
  }
};
