import { PostMedia } from "../../../../../domain/Posts/Entity/PostMedia";

export type PostMediaDto = PostMedia;

export interface PostDto {
    id: string;
    authorId: string;
    title: string;
    content: string;
    media: PostMediaDto[];
    visibility: "PUBLIC" | "PRIVATE";
    createdAt: string;
    updatedAt: string;
    deletedAt: string | null;
}

export type CreatePostRequestDto = Pick<PostDto, "authorId" | "title" | "content" | "media" | "visibility">;
export type CreatePostResponseDto = Omit<PostDto, "deletedAt">;
