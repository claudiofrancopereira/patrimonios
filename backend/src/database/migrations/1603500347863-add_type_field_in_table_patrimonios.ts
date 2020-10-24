import { query } from "express";
import {Column, MigrationInterface, QueryRunner, TableColumn } from "typeorm";

export class addTypeFieldInTablePatrimonios1603500347863 implements MigrationInterface {

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.addColumn('patrimonios',
      new TableColumn({
        name: 'type',
        type: 'varchar',
      }));
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropColumn('patrimonios', 'type');
  }

}


