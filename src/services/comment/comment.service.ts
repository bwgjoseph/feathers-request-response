// Initializes the `comment` service on path `/comment`
import { Service } from '@feathersjs/feathers';
import { Application } from '../../declarations';
import { Comment, CommentRequest, CommentResponse, hooks, model } from './index';

// Add this service to the service type index
declare module '../../declarations' {
  interface ServiceTypes {
    'comment': Service<CommentRequest, CommentResponse> & Comment;
  }
}

export default function (app: Application): void {
  const options = {
    Model: model(app),
    paginate: app.get('paginate')
  };

  // Initialize our service with any options it requires
  app.use('/comment', new Comment(options, app));

  // Get our initialized service so that we can register hooks
  const service = app.service('comment');

  service.hooks(hooks);
}
