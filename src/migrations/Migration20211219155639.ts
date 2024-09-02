import { Migration } from '@mikro-orm/migrations';

export class Migration20211219155639 extends Migration {

  async up(): Promise<void> {
    this.addSql('create table "user" ("id" serial primary key, "username" varchar(255) not null, "email" varchar(255) not null, "bio" varchar(255) not null, "image" varchar(255) not null, "password" varchar(255) not null);');

    this.addSql('create table "user_to_follower" ("follower" int not null, "following" int not null);');
    this.addSql('alter table "user_to_follower" add constraint "user_to_follower_pkey" primary key ("follower", "following");');
    this.addSql('create index "user_to_follower_follower_index" on "user_to_follower" ("follower");');
    this.addSql('create index "user_to_follower_following_index" on "user_to_follower" ("following");');

    this.addSql('create table "tag" ("id" serial primary key, "tag" varchar(255) not null);');

    this.addSql('create table "article" ("id" serial primary key, "slug" varchar(255) not null, "title" varchar(255) not null, "description" varchar(255) not null, "body" varchar(255) not null, "created_at" timestamptz not null, "updated_at" timestamptz not null, "tag_list" text not null, "author_id" int not null, "favorites_count" int not null);');
    this.addSql('create index "article_author_id_index" on "article" ("author_id");');

    this.addSql('create table "comment" ("id" serial primary key, "created_at" timestamptz not null, "updated_at" timestamptz not null, "body" varchar(255) not null, "article_id" int not null, "author_id" int not null);');
    this.addSql('create index "comment_article_id_index" on "comment" ("article_id");');
    this.addSql('create index "comment_author_id_index" on "comment" ("author_id");');

    this.addSql('create table "user_favorites" ("user_id" int not null, "article_id" int not null);');
    this.addSql('alter table "user_favorites" add constraint "user_favorites_pkey" primary key ("user_id", "article_id");');
    this.addSql('create index "user_favorites_user_id_index" on "user_favorites" ("user_id");');
    this.addSql('create index "user_favorites_article_id_index" on "user_favorites" ("article_id");');

    this.addSql('alter table "user_to_follower" add constraint "user_to_follower_follower_foreign" foreign key ("follower") references "user" ("id") on update cascade on delete cascade;');
    this.addSql('alter table "user_to_follower" add constraint "user_to_follower_following_foreign" foreign key ("following") references "user" ("id") on update cascade on delete cascade;');

    this.addSql('alter table "article" add constraint "article_author_id_foreign" foreign key ("author_id") references "user" ("id") on update cascade;');

    this.addSql('alter table "comment" add constraint "comment_article_id_foreign" foreign key ("article_id") references "article" ("id") on update cascade;');
    this.addSql('alter table "comment" add constraint "comment_author_id_foreign" foreign key ("author_id") references "user" ("id") on update cascade;');

    this.addSql('alter table "user_favorites" add constraint "user_favorites_user_id_foreign" foreign key ("user_id") references "user" ("id") on update cascade on delete cascade;');
    this.addSql('alter table "user_favorites" add constraint "user_favorites_article_id_foreign" foreign key ("article_id") references "article" ("id") on update cascade on delete cascade;');
  }

}