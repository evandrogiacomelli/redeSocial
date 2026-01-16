import { Post } from "../../../../domain/Posts/Entity/Post";
import { CreatePostResponseDto } from "../dtos/post/create-post-dto";

export function toCreatePostResponse(post: Post): CreatePostResponseDto {
    return {
        id: post.getId(),
        authorId: post.getAuthorId(),
        title: post.getTitle(),
        content: post.getContent(),
        media: post.getMedia(),
        visibility: post.getVisibility(),
        createdAt: post.getCreatedAt().toISOString(),
        updatedAt: post.getUpdatedAt().toISOString(),
    };
}
