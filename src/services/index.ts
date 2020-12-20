import { Application } from '../declarations';
import { commentService } from './comment';
import { postService } from './post';
import { userService } from './users';
// Don't remove this comment. It's needed to format import lines nicely.

export default function (app: Application): void {
  app.configure(userService);
  app.configure(postService);
  app.configure(commentService);
}
