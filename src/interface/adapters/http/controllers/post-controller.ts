import { Request, Response } from "express";
import { validatePost } from "../validators/create-post-validator";
import { postContainer } from "../container/post-container";
import { toCreatePostResponse } from "../mappers/to-post-response";
import { toCreatePostDto } from "../mappers/to-post-request";
import { CreatePostRequestDto, CreatePostResponseDto } from "../dtos/post/create-post-dto";
import {Post} from "../../../../domain/Posts/Entity/Post";

export async function CreatePostController(req: Request, res: Response): Promise<void> {
    const id: string | undefined = req.userId;

    if (!id) {
        res.status(401).json({
            code: "UNAUTHORIZED",
            message: "Authentication required",
        });
        return;
    }

    const errors = validatePost(req.body);
    if (errors.length > 0) {
        res.status(400).json({
            code: "VALIDATION_ERROR",
            message: "Invalid input",
            details: Object.fromEntries(errors),
        });
        return;
    }

    const body: CreatePostRequestDto = toCreatePostDto(id, req.body);

    const post: Post = await postContainer.createPost.execute(body);
    const response: CreatePostResponseDto = toCreatePostResponse(post);

    res.status(201).json(response);
}
