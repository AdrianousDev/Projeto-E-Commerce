/*
  Warnings:

  - A unique constraint covering the columns `[titulo]` on the table `Produto` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX `Produto_titulo_key` ON `Produto`(`titulo`);
