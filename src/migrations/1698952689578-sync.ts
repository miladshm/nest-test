import {MigrationInterface, QueryRunner} from "typeorm";

export class Sync1698952689578 implements MigrationInterface {
    name = 'Sync1698952689578'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`events\` DROP COLUMN \`description\``);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`events\`
            ADD \`description\` varchar(255) NULL`);
    }

}
