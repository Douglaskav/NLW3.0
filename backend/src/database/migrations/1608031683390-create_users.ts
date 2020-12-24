import {MigrationInterface, QueryRunner, Table} from "typeorm";

export class createUser1608031683390 implements MigrationInterface { 
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(new Table({
      name: 'users',
      columns: [{
        name: 'id',
        type: 'integer',
        unsigned: true, 
        isPrimary: true,
        isGenerated: true,
        generationStrategy: 'increment'
      },
      {
        name: 'username',
        type: 'varchar'
      },
      {
        name: 'email',
        type: 'varchar',
        isUnique: true
      },
      {
        name: 'password',
        type: 'varchar'
      },
      {
        name: 'passwordResetToken',
        type: 'varchar',
        isNullable: true
      },
      {
        name: 'passwordResetExpires',
        type: 'date',
        isNullable: true
      }]
    }))  
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('users')
  }
}
