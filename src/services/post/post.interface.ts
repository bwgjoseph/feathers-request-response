import { Base } from './../../base.interface';

// Client facing interface
interface PostRequest {
    title: string;
    body: string;
    comments?: string[];
}

// Base fields generated at server side
interface ServerPostRequest extends PostRequest, Omit<Base, '_id'> {}

interface PostResponse extends Omit<PostRequest, 'comments'>, Base {}

export { PostRequest, ServerPostRequest, PostResponse };
