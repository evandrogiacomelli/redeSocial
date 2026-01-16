const MAX_TITLE_LENGTH: number = 20;
const MIN_TITLE_LENGTH: number = 3;
const MAX_CONTENT_LENGTH: number = 120;
const MIN_CONTENT_LENGTH: number = 5;
const MEDIA_TYPES: string[] = ["IMAGE", "VIDEO"];
const VISIBILITY_VALUES: string[] = ["PUBLIC", "PRIVATE"];
const URL_REGEX: RegExp = /^https?:\/\/\S+$/i;


class CreatePostValidator {
    private errors: Array<[string, string]> = [];
    private body: any;


    constructor(body: any) {
        this.body = body;
    }

    public validate(body: Body): void {
        this.validateTitle();
        this.validateContent();
        this.validateVisibility();
        this.validateMedia();
    }

    public result(): Array<[string, string]> {
        return this.errors;
    }

    private validateTitle(): void {
        const title: string = this.body.title;
        if (!title) this.errors.push(["title", "Post must contain an title"])
        if (title.length > MAX_TITLE_LENGTH) this.errors.push(["title", `max ${MAX_TITLE_LENGTH} characters`]);
        if (title.length < MIN_TITLE_LENGTH) this.errors.push(["title", `min ${MIN_TITLE_LENGTH} characters`]);
    }

    private validateContent(): void {
        const content: string = this.body.content;
        if (!content) this.errors.push(["content", "cannot be empty"]);
        if (content.length > MAX_CONTENT_LENGTH) this.errors.push(["content", `max ${MAX_CONTENT_LENGTH} characters`]);
        if (content.length < MIN_CONTENT_LENGTH) this.errors.push(["content", `min ${MIN_CONTENT_LENGTH} characters`]);
    }

    private validateVisibility(): void {
        const visibility: string = this.body.visibility;
        if (!visibility) this.errors.push(["visibility", "cannot be empty"]);
        if (visibility && !VISIBILITY_VALUES.includes(visibility)) this.errors.push(["visibility", "invalid value"]);
    }

    private validateMedia(): void {
        const media = this.body.media;
        if (!media) return;
        if (!Array.isArray(media)) {
            this.errors.push(["media", "must be an array"]);
            return;
        }

        media.forEach((item, index) => {
            this.validateMediaType(item, index);
            this.validateMediaUrl(item, index);
        });
    }

    private validateMediaType(item: any, index: number): void {
        const type = item?.type;
        if (!type) this.errors.push([`media[${index}].type`, "cannot be empty"]);
        if (type && !MEDIA_TYPES.includes(type)) this.errors.push([`media[${index}].type`, "invalid value"]);
    }

    private validateMediaUrl(item: any, index: number): void {
        const url = item?.url;
        if (!url) this.errors.push([`media[${index}].url`, "cannot be empty"]);
        if (url && !URL_REGEX.test(url)) this.errors.push([`media[${index}].url`, "invalid url"]);
    }
}

export function validatePost(body: Body): Array<[string, string]> {
    const validator = new CreatePostValidator(body);
    validator.validate(body);
    return validator.result();
}
