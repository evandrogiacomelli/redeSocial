import {Post} from "../Entity/Post";

export interface IPostRepository {
    create(post: Post): Promise<void>;
}