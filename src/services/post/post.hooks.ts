
import createComment from './hooks/create-comment';
import printPost from './hooks/print-post';

export default {
  before: {
    all: [],
    find: [],
    get: [],
    create: [createComment],
    update: [],
    patch: [],
    remove: []
  },

  after: {
    all: [],
    find: [],
    get: [],
    create: [printPost],
    update: [],
    patch: [],
    remove: []
  },

  error: {
    all: [],
    find: [],
    get: [],
    create: [],
    update: [],
    patch: [],
    remove: []
  }
};
