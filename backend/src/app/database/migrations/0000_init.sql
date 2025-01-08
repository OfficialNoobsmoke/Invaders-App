CREATE TYPE "public"."faction" AS ENUM('Alliance', 'Horde');--> statement-breakpoint
CREATE TABLE "characters" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"name" varchar(12) NOT NULL,
	"faction" "faction" NOT NULL,
	"class" varchar(32) NOT NULL,
	"owner_id" uuid NOT NULL,
	"realm_server_id" uuid NOT NULL,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "realm_servers" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"name" varchar(50) NOT NULL,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "character_specializations" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"name" varchar(50) NOT NULL,
	"gear_score" numeric(4, 0) NOT NULL,
	"character_id" uuid,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "users" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"discord_id" varchar(18) NOT NULL,
	"username" varchar(32) NOT NULL,
	"displayname" varchar(32),
	"email" varchar(255),
	"isInDiscord" boolean,
	"profile_image_url" varchar(255) NOT NULL,
	"last_login" timestamp with time zone DEFAULT now() NOT NULL,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	CONSTRAINT "users_discord_id_unique" UNIQUE("discord_id"),
	CONSTRAINT "users_username_unique" UNIQUE("username"),
	CONSTRAINT "users_email_unique" UNIQUE("email")
);
--> statement-breakpoint
CREATE TABLE "tokens" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"user_id" uuid NOT NULL,
	"refresh_token" varchar(512) NOT NULL,
	"refresh_token_expires_at" timestamp with time zone NOT NULL,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "discord_tokens" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"refresh_token" varchar(512),
	"access_token_expires_at" timestamp with time zone NOT NULL,
	"refresh_token_expires_at" timestamp with time zone NOT NULL,
	"parent_id" uuid NOT NULL,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "instances" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"name" varchar(12) NOT NULL,
	"label" varchar(50) NOT NULL,
	"size" numeric(2, 0) NOT NULL,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "instances_realm_servers" (
	"instance_id" uuid NOT NULL,
	"realm_server_id" uuid NOT NULL,
	CONSTRAINT "instances_realm_servers_instance_id_realm_server_id_pk" PRIMARY KEY("instance_id","realm_server_id")
);
--> statement-breakpoint
CREATE TABLE "characters_preferred_instances" (
	"character_id" uuid NOT NULL,
	"instance_id" uuid NOT NULL,
	CONSTRAINT "characters_preferred_instances_character_id_instance_id_pk" PRIMARY KEY("character_id","instance_id")
);
--> statement-breakpoint
CREATE TABLE "characters_saved_instances" (
	"character_id" uuid NOT NULL,
	"instance_id" uuid NOT NULL,
	CONSTRAINT "characters_saved_instances_character_id_instance_id_pk" PRIMARY KEY("character_id","instance_id")
);
--> statement-breakpoint
CREATE TABLE "session" (
	"sid" text PRIMARY KEY NOT NULL,
	"sess" json NOT NULL,
	"expire" timestamp with time zone NOT NULL
);
--> statement-breakpoint
ALTER TABLE "characters" ADD CONSTRAINT "characters_owner_id_users_id_fk" FOREIGN KEY ("owner_id") REFERENCES "public"."users"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "characters" ADD CONSTRAINT "characters_realm_server_id_realm_servers_id_fk" FOREIGN KEY ("realm_server_id") REFERENCES "public"."realm_servers"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "character_specializations" ADD CONSTRAINT "character_specializations_character_id_characters_id_fk" FOREIGN KEY ("character_id") REFERENCES "public"."characters"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "tokens" ADD CONSTRAINT "tokens_user_id_users_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."users"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "discord_tokens" ADD CONSTRAINT "discord_tokens_parent_id_tokens_id_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."tokens"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "instances_realm_servers" ADD CONSTRAINT "instances_realm_servers_instance_id_instances_id_fk" FOREIGN KEY ("instance_id") REFERENCES "public"."instances"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "instances_realm_servers" ADD CONSTRAINT "instances_realm_servers_realm_server_id_realm_servers_id_fk" FOREIGN KEY ("realm_server_id") REFERENCES "public"."realm_servers"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "characters_preferred_instances" ADD CONSTRAINT "characters_preferred_instances_character_id_characters_id_fk" FOREIGN KEY ("character_id") REFERENCES "public"."characters"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "characters_preferred_instances" ADD CONSTRAINT "characters_preferred_instances_instance_id_instances_id_fk" FOREIGN KEY ("instance_id") REFERENCES "public"."instances"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "characters_saved_instances" ADD CONSTRAINT "characters_saved_instances_character_id_characters_id_fk" FOREIGN KEY ("character_id") REFERENCES "public"."characters"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "characters_saved_instances" ADD CONSTRAINT "characters_saved_instances_instance_id_instances_id_fk" FOREIGN KEY ("instance_id") REFERENCES "public"."instances"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
CREATE INDEX "IDX_session_expire" ON "session" USING btree ("expire");