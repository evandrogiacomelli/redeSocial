import { IPostRepository } from "../../../domain/Posts/ports/IPostRepository";
import { Post } from "../../../domain/Posts/Entity/Post";
import { postgresPool } from "../../db/postgresPool";

export class PostgresPostRepository implements IPostRepository {
    private readonly pool = postgresPool;

    async create(post: Post): Promise<void> {
        const media = post.getMedia().map((item) => item.toJSON());

        const columns = [
            "id",
            "author_id",
            "title",
            "content",
            "media",
            "visibility",
            "created_at",
            "updated_at",
            "deleted_at",
        ];

        const values: (string | Date | null | object)[] = [
            post.getId(),
            post.getAuthorId(),
            post.getTitle(),
            post.getContent(),
            media.length > 0 ? JSON.stringify(media) : null,
            post.getVisibility(),
            post.getCreatedAt(),
            post.getUpdatedAt(),
            post.getDeletedAt(),
        ];

        const placeholders = columns.map((_, index) => `$${index + 1}`).join(", ");
        const text = `INSERT INTO posts (${columns.join(", ")}) VALUES (${placeholders})`;

        await this.pool.query(text, values);
    }
}
