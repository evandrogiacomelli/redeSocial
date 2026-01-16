import {MediaType} from "express";
import {PostType} from "./PostType";

export class PostMedia {
    private type: PostType;
    private url: string;

    private constructor(type: PostType, url: string) {
        this.type = type;
        this.url = url;
    }

    public create(type: MediaType, url: string): PostMedia  {
        return this.constructor(type, url);
    }
}