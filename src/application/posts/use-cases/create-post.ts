import {IPostRepository} from "../../../domain/Posts/ports/IPostRepository";
import {Post} from "../../../domain/Posts/Entity/Post";
import {CreatePostRequestDto} from "../../../interface/adapters/http/dtos/post/create-post-dto";

export class CreatePostService {
    constructor(
        private postRepository: IPostRepository
    ) {}

    async execute(dto: CreatePostRequestDto): Promise<Post> {
        const post: Post = Post.createFromDto(dto);

        await this.postRepository.create(post);
        return post;
    }
}
