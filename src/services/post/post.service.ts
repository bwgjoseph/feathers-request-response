// Initializes the `post` service on path `/post`
import { Service } from '@feathersjs/feathers';
import { Application } from '../../declarations';
import { hooks, model, Post, PostRequest, PostResponse } from './index';

// Add this service to the service type index
declare module '../../declarations' {
  interface ServiceTypes {
    'post': Service<PostRequest, PostResponse> & Post;
  }
}

export default function (app: Application): void {
  const options = {
    Model: model(app),
    paginate: app.get('paginate')
  };

  // Initialize our service with any options it requires
  app.use('/post', new Post(options, app));

  // Get our initialized service so that we can register hooks
  const service = app.service('post');

  service.hooks(hooks);
}
