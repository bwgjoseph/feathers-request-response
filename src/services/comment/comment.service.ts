// Initializes the `comment` service on path `/comment`
import { Service } from '@feathersjs/feathers';
import { Application } from '../../declarations';
import createModel from '../../models/comment.model';
import { Comment } from './comment.class';
import hooks from './comment.hooks';
import { CommentRequest, CommentResponse } from './comment.interface';

// Add this service to the service type index
declare module '../../declarations' {
  interface ServiceTypes {
    'comment': Service<CommentRequest, CommentResponse> & Comment;
  }
}

export default function (app: Application): void {
  const options = {
    Model: createModel(app),
    paginate: app.get('paginate')
  };

  // Initialize our service with any options it requires
  app.use('/comment', new Comment(options, app));

  // Get our initialized service so that we can register hooks
  const service = app.service('comment');

  service.hooks(hooks);
}
