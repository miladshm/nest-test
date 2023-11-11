import {MigrationInterface, QueryRunner} from "typeorm"

export class RefactorCoffees1698868170951 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.renameColumn('coffees', 'name', 'title')
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.renameColumn('coffees', 'title', 'name')

    }

}
