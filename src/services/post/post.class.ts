import { NedbServiceOptions, Service } from 'feathers-nedb';
import { ServiceSwaggerAddon, ServiceSwaggerOptions } from 'feathers-swagger/types';
import { Application } from '../../declarations';
import { PostResponse } from './post.interface';
import { requestSchema, responseSchema } from './post.schema';

export class Post extends Service<PostResponse> implements ServiceSwaggerAddon {
  //eslint-disable-next-line @typescript-eslint/no-unused-vars
  constructor(options: Partial<NedbServiceOptions>, app: Application) {
    super(options);
  }

  docs: ServiceSwaggerOptions = {
    description: 'Service to manage Posts',
    securities: ['all'],
    definitions: {
      postRequest: requestSchema,
      post: responseSchema,
      post_list: {
        title: 'Post List',
        type: 'array',
        items: { $ref: '#/components/schemas/post' },
      },
    },
    operations: {
      create: {
        'requestBody.content.application/json.schema.$ref': '#/components/schemas/postRequest',
      },
    },
  };
}
