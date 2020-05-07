import {
  MigrationInterface,
  QueryRunner,
  TableColumn,
  TableForeignKey,
} from 'typeorm';

export default class AlterProviderFieldToProviderId1588618246381
  implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropColumn('appoitments', 'provider');

    await queryRunner.addColumn(
      'appoitments',
      new TableColumn({
        name: 'provider_id',
        type: 'uuid',
        isNullable: true,
      })
    );

    await queryRunner.createForeignKey(
      'appoitments',
      new TableForeignKey({
        name: 'Appoitmentprovider',
        columnNames: ['provider_id'],
        referencedColumnNames: ['id'],
        referencedTableName: 'users',
        onDelete: 'SET NULL',
        onUpdate: 'CASCADE',
      })
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropForeignKey('appoitments', 'Appoitmentprovider');

    await queryRunner.dropColumn('appoitments', 'provider_id');

    await queryRunner.addColumn(
      'appoitments',
      new TableColumn({
        name: 'provider',
        type: 'varchar',
      })
    );
  }
}
