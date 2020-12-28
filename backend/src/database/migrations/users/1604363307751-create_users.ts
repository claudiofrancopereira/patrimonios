import { MigrationInterface, QueryRunner, Table } from "typeorm";

export class createUsers1604363307751 implements MigrationInterface {

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query('CREATE EXTENSION IF NOT EXISTS "uuid-ossp"');

    await queryRunner.createTable( new Table({
      name: 'users',
      columns:[
        {
          name: 'id',
          type: 'uuid',
          isPrimary: true,
          generationStrategy: 'uuid',
          default: 'uuid_generate_v4()',
          //isUnique: true,
        },

        {
          name: 'name',
          type: 'varchar',
          //isUnique: true,
        },

        {
          name: 'email',
          type: 'varchar',
          //isUnique: true,
        },        

        {
          name: 'registration',
          type: 'integer',
          //isUnique: true,
        },

        {
          name: 'password',
          type: 'varchar',
        },

        {
          name: 'image',
          type: 'varchar'
        }
        
      ]
    }));
      
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('users');
    await queryRunner.query('DROP EXTENSION "uuid-ossp"');
    
  }

}