import {MigrationInterface, QueryRunner, Table } from "typeorm";

export class createUsers1604363307751 implements MigrationInterface {

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable( new Table({
      name: 'users',
      columns:[
        {
          name: 'id',
          type: 'varchar',
          isPrimary: true,
        },

        {
          name: 'name',
          type: 'varchar',
        },
          
        {
          name: 'registration',
          type: 'varchar',
        },

        {
          name: 'email',
          type: 'varchar',
        },      
      ]
    }));
      
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('users');
  }

}