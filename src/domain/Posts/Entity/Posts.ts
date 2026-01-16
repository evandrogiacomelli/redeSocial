import {PostMedia} from "./PostMedia";

export class Posts {
    private id: string;
    private authorId: string;
    private title: string;
    private content: string;
    private media: PostMedia;
    private visibility: boolean;
    private createdAt: Date;
    private updatedAt: Date;
    private deletedAt: Date | null;

    private constructor(id: string, authorId: string, title: string, content: string, media: PostMedia) {
        this.id = id;
        this.authorId = authorId;
        this.title = title;
        this.content = content;
        this.media = media;
        this.visibility = true;
        this.createdAt = new Date();
        this.updatedAt = new Date();
        this.deletedAt = null;
    }

    public create(id: string, authorId: string, title: string, content: string, media: PostMedia): Posts {
        return this.constructor(id, authorId, title, content, media);
    }
}