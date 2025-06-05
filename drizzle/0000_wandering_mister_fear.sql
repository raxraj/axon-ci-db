CREATE TABLE `users` (
	`id` int AUTO_INCREMENT NOT NULL,
	`email` varchar(255) NOT NULL,
	`name` varchar(255),
	`avatar_url` varchar(500),
	`company` varchar(255),
	`location` varchar(255),
	`bio` text,
	`is_active` boolean DEFAULT true,
	`last_login_at` timestamp,
	`created_at` timestamp DEFAULT (now()),
	`updated_at` timestamp DEFAULT (now()) ON UPDATE CURRENT_TIMESTAMP,
	CONSTRAINT `users_id` PRIMARY KEY(`id`),
	CONSTRAINT `users_email_unique` UNIQUE(`email`)
);
--> statement-breakpoint
CREATE TABLE `user_oauth_connections` (
	`id` int AUTO_INCREMENT NOT NULL,
	`user_id` int NOT NULL,
	`oauth_provider` enum('github','gitlab','google') NOT NULL,
	`oauth_id` varchar(100) NOT NULL,
	`username` varchar(100) NOT NULL,
	`profile_url` varchar(500),
	`access_token` text NOT NULL,
	`refresh_token` text,
	`token_expires_at` timestamp,
	`scopes` text,
	`connected_at` timestamp DEFAULT (now()),
	`last_used_at` timestamp DEFAULT (now()),
	CONSTRAINT `user_oauth_connections_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
ALTER TABLE `user_oauth_connections` ADD CONSTRAINT `user_oauth_connections_user_id_users_id_fk` FOREIGN KEY (`user_id`) REFERENCES `users`(`id`) ON DELETE no action ON UPDATE no action;