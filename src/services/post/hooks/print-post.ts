import { HookContext, Service } from '@feathersjs/feathers';
import { PostRequest, PostResponse } from '../post.interface';

const printPost = async (context: HookContext<PostRequest, PostResponse>):
    Promise<HookContext<PostRequest, PostResponse, Service<PostRequest, PostResponse>>> => {

  const { result } = context;

  console.log('created post:', result);

  return context;
};

export default printPost;
