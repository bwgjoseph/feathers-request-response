import { HookContext, Service } from '@feathersjs/feathers';
import { Application } from '../../../declarations';
import { PostRequest, PostResponse, ServerPostRequest } from '../post.interface';

const createComment = async (context: HookContext<PostRequest, PostResponse>):
    Promise<HookContext<PostRequest, PostResponse, Service<PostRequest, PostResponse>>> => {

  const { data, app } = context;

  if (data) {
    const commentsPromise = data.comments?.map(async (comment: string) => {
      (app as Application)
        .service('comment')
        .create({
          text: comment,
        });
    });

    if (commentsPromise) {
      await Promise.all(commentsPromise);
    }

    const { comments, ...clientRequest } = data;

    const sr: ServerPostRequest = {
      ...clientRequest,
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    context.data = sr;
  }

  return context;
};

export default createComment;
