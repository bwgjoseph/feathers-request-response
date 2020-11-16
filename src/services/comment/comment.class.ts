import { NedbServiceOptions, Service } from 'feathers-nedb';
import { ServiceSwaggerAddon, ServiceSwaggerOptions } from 'feathers-swagger';
import { Application } from '../../declarations';
import { CommentResponse } from './comment.interface';
import { requestSchema, responseSchema } from './comment.schema';

export class Comment extends Service<CommentResponse> implements ServiceSwaggerAddon {
  //eslint-disable-next-line @typescript-eslint/no-unused-vars
  constructor(options: Partial<NedbServiceOptions>, app: Application) {
    super(options);
  }

  docs: ServiceSwaggerOptions = {
    description: 'Service to manage Comments',
    securities: ['all'],
    definitions: {
      commentRequest: requestSchema,
      comment: responseSchema,
      comment_list: {
        title: 'Comment List',
        type: 'array',
        items: { $ref: '#/components/schemas/comment' },
      },
    },
    operations: {
      create: {
        'requestBody.content.application/json.schema.$ref': '#/components/schemas/commentRequest',
      },
    },
  };
}
