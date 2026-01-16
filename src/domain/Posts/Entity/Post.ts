import { randomUUID } from "node:crypto";
import { PostMedia } from "./PostMedia";
import { CreatePostRequestDto } from "../../../interface/adapters/http/dtos/post/create-post-dto";

export class Post {
    private readonly id: string;
    private readonly authorId: string;
    private readonly title: string;
    private readonly content: string;
    private readonly media: PostMedia[];
    private readonly visibility: "PUBLIC" | "PRIVATE";
    private readonly createdAt: Date;
    private readonly updatedAt: Date;
    private readonly deletedAt: Date | null;

    private constructor(
        id: string,
        authorId: string,
        title: string,
        content: string,
        media: PostMedia[],
        visibility: "PUBLIC" | "PRIVATE",
        createdAt: Date,
        updatedAt: Date,
        deletedAt: Date | null
    ) {
        this.id = id;
        this.authorId = authorId;
        this.title = title;
        this.content = content;
        this.media = media;
        this.visibility = visibility;
        this.createdAt = createdAt;
        this.updatedAt = updatedAt;
        this.deletedAt = deletedAt;
    }

    public static create(
        authorId: string,
        title: string,
        content: string,
        media: PostMedia[],
        visibility: "PUBLIC" | "PRIVATE"
    ): Post {
        const now = new Date();
        return new Post(randomUUID(), authorId, title, content, media, visibility, now, now, null);
    }

    public static createFromDto(dto: CreatePostRequestDto): Post {
        const media: PostMedia[] = (dto.media ?? []).map((item) => {
            return PostMedia.create(item.type, item.url);
        });

        return Post.create(
            dto.authorId,
            dto.title,
            dto.content,
            media,
            dto.visibility,
        );
    }

    public getId(): string {
        return this.id;
    }

    public getAuthorId(): string {
        return this.authorId;
    }

    public getTitle(): string {
        return this.title;
    }

    public getContent(): string {
        return this.content;
    }

    public getMedia(): PostMedia[] {
        return this.media;
    }

    public getVisibility(): "PUBLIC" | "PRIVATE" {
        return this.visibility;
    }

    public getCreatedAt(): Date {
        return this.createdAt;
    }

    public getUpdatedAt(): Date {
        return this.updatedAt;
    }

    public getDeletedAt(): Date | null {
        return this.deletedAt;
    }
}
