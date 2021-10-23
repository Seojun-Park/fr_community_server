import { MigrationInterface, QueryRunner } from 'typeorm';
import { User } from '../user/entity/user.entity';

export class update1635008649742 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    const user = await queryRunner.manager.find(User);

    const updatedUser = await user.map(
      (elem) => (elem.verifiedCode = '000000'),
    );
    await queryRunner.manager.save(updatedUser);
    await queryRunner.commitTransaction();
  }

  public async down(queryRunner: QueryRunner): Promise<void> {}
}
