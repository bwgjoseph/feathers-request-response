/* eslint-disable @typescript-eslint/no-unused-vars */
import { Paginated } from '@feathersjs/feathers';
import assert from 'assert';
import app from '../../src/app';
import { CommentResponse } from '../../src/services/comment/comment.interface';
import { PostRequest, PostResponse } from '../../src/services/post/post.interface';

describe.only('\'post\' service', () => {
  it('registered the service', () => {
    const service = app.service('post');

    assert.ok(service, 'Registered the service');
  });

  it('should create post without comments', async () => {
    const postService = app.service('post');
    const commentService = app.service('comment');

    await postService._remove(null);
    await commentService._remove(null);

    const post: PostRequest = {
      title: 'post1',
      body: 'body1',
    };

    const postCreateEvent = new Promise((resolve) => app.service('post').once('created', resolve));

    // Service knows how to infer the Request and Response type (hover to see)
    const postResponse = await postService.create(post);
    // type postResponse would trigger the intellisense to provide typings

    const posts = await postService.find() as Paginated<PostResponse>;
    assert.strictEqual(posts.data.length, 1);
    // console.log('posts', posts);

    const comments = await commentService.find() as Paginated<CommentResponse>;
    assert.strictEqual(comments.data.length, 0);
    // console.log('comments', comments);

    // The data emitted would be of Response type too
    const data = await postCreateEvent as PostResponse;
    assert.ok(data._id);
    assert.ok(data.title);
    assert.ok(data.body);
  });

  it('should create post with comments', async () => {
    const postService = app.service('post');
    const commentService = app.service('comment');

    await postService._remove(null);
    await commentService._remove(null);

    const postWithCommentsRequest: PostRequest = {
      title: 'post1',
      body: 'body1',
      comments: ['comment1', 'comment2'],
    };

    const postCreateEvent = new Promise((resolve) => app.service('post').once('created', resolve));

    // Service knows how to infer the Request and Response type (hover to see)
    const postResponse = await postService.create(postWithCommentsRequest);
    // type postResponse would trigger the intellisense to provide typings

    const posts = await postService.find() as Paginated<PostResponse>;
    assert.strictEqual(posts.data.length, 1);
    // console.log('posts', posts);

    const comments = await commentService.find() as Paginated<CommentResponse>;
    assert.strictEqual(comments.data.length, 2);
    // console.log('comments', comments);

    // The data emitted would be of Response type too
    const data = await postCreateEvent as PostResponse;
    assert.ok(data._id);
    assert.ok(data.title);
    assert.ok(data.body);
  });

  it('should test crud', async () => {
    const postService = app.service('post');

    await postService._remove(null);

    const post: PostRequest = {
      title: 'post1',
      body: 'body1',
    };

    const postCreateEvent = new Promise((resolve) => app.service('post').once('created', resolve));

    // Service knows how to infer the Request and Response type (hover to see)
    const postResponse = await postService.create(post);

    // response
    assert.ok(postResponse._id);
    assert.ok(postResponse.createdAt);
    assert.ok(postResponse.updatedAt);

    // get
    const getResponse = await postService.get(postResponse._id);
    assert.ok(getResponse._id);
    assert.ok(getResponse.createdAt);
    assert.ok(getResponse.updatedAt);

    // find
    const findResponse = await postService.find({ _id: postResponse._id }) as Paginated<PostResponse>;
    const [fResponse] = findResponse.data;
    assert.ok(fResponse._id);
    assert.ok(fResponse.createdAt);
    assert.ok(fResponse.updatedAt);

    // update
    const uPost: PostRequest = {
      ...postResponse,
      title: 'updatePost1',
      body: 'updateBody1',
    };
    const updatePost = await postService.update(postResponse._id, uPost);
    assert.ok(updatePost._id);
    assert.ok(updatePost.createdAt);
    assert.ok(updatePost.updatedAt);
    assert.strictEqual(updatePost.title, 'updatePost1');
    assert.strictEqual(updatePost.body, 'updateBody1');

    // patch
    const patchPost = await postService.patch(postResponse._id, { title: 'patchPost1' });
    assert.ok(patchPost._id);
    assert.ok(patchPost.createdAt);
    assert.ok(patchPost.updatedAt);
    assert.strictEqual(patchPost.title, 'patchPost1');
    assert.strictEqual(patchPost.body, 'updateBody1');

    // remove
    const removePost = await postService.remove(postResponse._id);
    assert.ok(removePost._id);
    assert.ok(removePost.createdAt);
    assert.ok(removePost.updatedAt);
    const postLength = await postService.find() as Paginated<PostResponse>;
    assert.ok(postLength.data.length === 0);
  });
});
