import {PostType} from "./PostType";

export class PostMedia {
    private readonly type: PostType;
    private readonly url: string;

    private constructor(type: PostType, url: string) {
        this.type = type;
        this.url = url;
    }

    public static create(type: PostType, url: string): PostMedia  {
        return new PostMedia(type, url);
    }

    public getType(): PostType {
        return this.type;
    }

    public getUrl(): string {
        return this.url;
    }

    public toJSON(): { type: PostType; url: string } {
        return {
            type: this.type,
            url: this.url,
        };
    }
}
