-- CreateTable
CREATE TABLE `User` (
    `id` VARCHAR(191) NOT NULL,
    `email` VARCHAR(191) NOT NULL,
    `name` VARCHAR(191) NOT NULL,
    `password` VARCHAR(191) NOT NULL DEFAULT '',
    `pollTags` VARCHAR(191) NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    UNIQUE INDEX `User_id_key`(`id`),
    UNIQUE INDEX `User_email_key`(`email`),
    UNIQUE INDEX `User_name_key`(`name`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Launcher` (
    `id` VARCHAR(191) NOT NULL,
    `dataType` VARCHAR(191) NOT NULL,
    `dataValue` LONGTEXT NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    UNIQUE INDEX `Launcher_id_key`(`id`),
    UNIQUE INDEX `Launcher_dataType_key`(`dataType`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Motd` (
    `id` VARCHAR(191) NOT NULL,
    `motd` LONGTEXT NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    UNIQUE INDEX `Motd_id_key`(`id`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Server` (
    `id` VARCHAR(191) NOT NULL,
    `serverId` INTEGER NOT NULL,
    `name` VARCHAR(191) NOT NULL,
    `desc` VARCHAR(191) NOT NULL DEFAULT '',
    `mcVersion` VARCHAR(191) NOT NULL DEFAULT '1.7.10',
    `difficulty` INTEGER NOT NULL DEFAULT 2,
    `assets` VARCHAR(191) NOT NULL DEFAULT '',
    `core` VARCHAR(191) NOT NULL DEFAULT '',
    `modpack` VARCHAR(191) NOT NULL DEFAULT '',
    `available` BOOLEAN NOT NULL DEFAULT false,
    `modded` BOOLEAN NOT NULL DEFAULT false,
    `featured` VARCHAR(191) NOT NULL DEFAULT '',
    `periodic` BOOLEAN NOT NULL DEFAULT false,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    UNIQUE INDEX `Server_id_key`(`id`),
    UNIQUE INDEX `Server_serverId_key`(`serverId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `ServerTag` (
    `id` VARCHAR(191) NOT NULL,
    `tagId` INTEGER NOT NULL,
    `name` VARCHAR(191) NOT NULL,
    `desc` VARCHAR(191) NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    UNIQUE INDEX `ServerTag_id_key`(`id`),
    UNIQUE INDEX `ServerTag_tagId_key`(`tagId`),
    UNIQUE INDEX `ServerTag_name_key`(`name`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Articles` (
    `id` VARCHAR(191) NOT NULL,
    `articleId` INTEGER NOT NULL,
    `serverId` INTEGER NOT NULL DEFAULT -1,
    `tabName` VARCHAR(191) NOT NULL,
    `pageOrder` INTEGER NOT NULL DEFAULT 0,
    `title` VARCHAR(191) NOT NULL DEFAULT '',
    `subtitle` VARCHAR(191) NOT NULL DEFAULT '',
    `text` LONGTEXT NOT NULL,
    `available` BOOLEAN NOT NULL DEFAULT true,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    UNIQUE INDEX `Articles_id_key`(`id`),
    UNIQUE INDEX `Articles_articleId_key`(`articleId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `_ServerToServerTag` (
    `A` VARCHAR(191) NOT NULL,
    `B` VARCHAR(191) NOT NULL,

    UNIQUE INDEX `_ServerToServerTag_AB_unique`(`A`, `B`),
    INDEX `_ServerToServerTag_B_index`(`B`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `_ServerToServerTag` ADD CONSTRAINT `_ServerToServerTag_A_fkey` FOREIGN KEY (`A`) REFERENCES `Server`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `_ServerToServerTag` ADD CONSTRAINT `_ServerToServerTag_B_fkey` FOREIGN KEY (`B`) REFERENCES `ServerTag`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
