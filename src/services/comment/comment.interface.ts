import { Base } from '../../base.interface';

interface CommentRequest {
    text: string;
}

// Base fields generated at server side
interface ServerCommentRequest extends CommentRequest, Omit<Base, '_id'> {}

interface CommentResponse extends CommentRequest, Base {}

export { CommentRequest, ServerCommentRequest, CommentResponse };
