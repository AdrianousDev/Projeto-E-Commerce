-- DropForeignKey
ALTER TABLE `ItemPedido` DROP FOREIGN KEY `ItemPedido_pedidoId_fkey`;

-- DropIndex
DROP INDEX `ItemPedido_pedidoId_fkey` ON `ItemPedido`;

-- AddForeignKey
ALTER TABLE `ItemPedido` ADD CONSTRAINT `ItemPedido_pedidoId_fkey` FOREIGN KEY (`pedidoId`) REFERENCES `Pedido`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
