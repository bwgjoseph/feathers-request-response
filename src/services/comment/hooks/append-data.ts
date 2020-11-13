import { HookContext, Service } from '@feathersjs/feathers';
import { CommentRequest, CommentResponse, ServerCommentRequest } from '../comment.interface';

const appendData = async (context: HookContext<CommentRequest, CommentResponse>):
    Promise<HookContext<CommentRequest, CommentResponse, Service<CommentRequest, CommentResponse>>> => {

  const { data } = context;

  if (data) {
    const sr: ServerCommentRequest = {
      ...data,
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    context.data = sr;
  }

  return context;
};

export default appendData;
