import { Migration } from '@mikro-orm/migrations';

export class Migration20240114224028 extends Migration {

  async up(): Promise<void> {
    this.addSql('alter table "user" alter column "bio" set not null;');
    this.addSql('alter table "user" alter column "image" set not null;');
  }

  async down(): Promise<void> {
    this.addSql('alter table "user" alter column "bio" drop not null;');
    this.addSql('alter table "user" alter column "image" drop not null;');
  }

}