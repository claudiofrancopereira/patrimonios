import { MigrationInterface, QueryRunner, Table } from "typeorm";

export class createPatrimonios1603249148530 implements MigrationInterface {

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable( new Table({
      name: 'patrimonios',
      columns:[
        {
          name: 'id',
          type: 'integer',
          unsigned: true,
          isPrimary: true,
          isGenerated: true,
          generationStrategy: 'increment',
        },

        {
          name: 'name',
          type: 'varchar',
        },

        {
          name: 'address',
          type: 'varchar',
        },
        
        {
          name: 'latitude',
          type: 'varchar',
        },
        
        {
          name: 'longitude',
          type: 'varchar',
        },
        
        {
          name: 'notes',
          type: 'text',
        },
        

      ]
    }))

  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('patrimonios');
  }

}
