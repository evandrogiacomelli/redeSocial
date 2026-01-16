import { CreatePostRequestDto } from "../dtos/post/create-post-dto";

export function toCreatePostDto(authorId: string, body: any): CreatePostRequestDto {
    return {
        authorId,
        title: body.title,
        content: body.content,
        media: body.media,
        visibility: body.visibility,
    };
}
