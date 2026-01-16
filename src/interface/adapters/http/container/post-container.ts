import { IPostRepository } from "../../../../domain/Posts/ports/IPostRepository";
import { PostgresPostRepository } from "../../../../infra/persistence/post/PostgresPostRepository";
import { CreatePostService } from "../../../../application/posts/use-cases/create-post";

class PostContainer {
    private postRepository: IPostRepository = new PostgresPostRepository();

    createPost: CreatePostService = new CreatePostService(this.postRepository);
}

export const postContainer = new PostContainer();
