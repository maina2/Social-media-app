import {
  updateUser,
  deleteUser,
  getFollowersAndFollowing,
  getAllUsers
} from '../controllers/UsersController.js';

import {
  getAllPosts,
  getPostById,
  createPost,
  updatePost,
  deletePost,
} from '../controllers/PostsController.js';

import {
  getCommentsByPostId,
  createComment,
  deleteComment
} from '../controllers/CommentsController.js';

import {
  getAllMessages,
  createMessage,
  deleteMessage,
  getMessagesByUsers
} from '../controllers/MessageController.js';

import {
  login,
  signup
} from '../controllers/Authentication.js';

import {
  followUser,
  unfollowUser,
  getFollowers,
  getFollowing
} from '../controllers/FollowController.js';

import{
  likePost,
  unlikePost
} from '../controllers/Likecontroller.js';

const routes = (app) => {
  // User routes
      app.route('/users/:id')
        .get(getFollowersAndFollowing)
        .put(updateUser)
        .delete(deleteUser);
      app.route('/users')
          .get(getAllUsers);
      // Post routes
      app.route('/posts')
        .get(getAllPosts)
        .post(createPost);

      app.route('/posts/:id')
        .get(getPostById)
        .put(updatePost)
        .delete(deletePost);

        

      // Comment routes
      app.route('/comments/:postId')
        .get(getCommentsByPostId)
        .post(createComment)
        .delete(deleteComment);

      app.route('/comments/:id')
        .delete(deleteComment);

      // Message routes
      app.route('/messages')
        .get(getAllMessages)
        .post(createMessage);

      app.route('/messages/:senderId/:recipientId')
        .get(getMessagesByUsers);

      app.route('/messages/:id')
        .delete(deleteMessage);

      // Authentication routes
      app.route('/auth/login')
        .post(login);

      app.route('/auth/signup')
        .post(signup);

      // Follow routes
      app.route('/follow')
        .post(followUser);

      app.route('/unfollow')
        .post(unfollowUser);

      app.route('/followers/:userId')
        .get(getFollowers);

      app.route('/following/:userId')
        .get(getFollowing);

      // Like routes
      app.route('/posts/:id/like')
        .put(unlikePost)
        .put(likePost);
};

export default routes;








// import {
  
//   updateUser,
//   deleteUser,
//   getFollowersAndFollowing,
// } from '../controllers/UsersController.js';

// import {
//   getAllPosts,
//   getPostById,
//   createPost,
//   updatePost,
//   deletePost,
// } from '../controllers/PostsController.js';

// import {
//   getCommentsByPostId,
//   createComment,
//   deleteComment
// } from '../controllers/CommentsController.js';

// import {
//   getAllMessages,
//   createMessage,
//   deleteMessage,
//   getMessagesByUsers
// } from '../controllers/MessageController.js';
// import {
//   login,
//   signup
// } from '../controllers/Authentication.js';
// import {
//   followUser,
//   unfollowUser,
//   getFollowers,
//   getFollowing
// } from '../controllers/FollowController.js'

// import{
//   likePost,
//   unlikePost
// } from '../controllers/Likecontroller.js'

// const routes =(app)=>{
//     // User routes
    
//     app.route('/users/:id')
//     .get(getFollowersAndFollowing)
//     .put(updateUser)
//     .delete(deleteUser)

   

//     // Post routes
//     app.route('/posts')
//     .get(getAllPosts)
//     .post(createPost);

//     app.route('/posts/:id')
//     .get(getPostById)
//     .put(updatePost)
//     .delete(deletePost);

//     // Comment routes
//     app.route('/comments/:postId')
//     .get(getCommentsByPostId)
//     .post(createComment)
//     .delete(deleteComment);

//     app.route('/comments/:id')
//     .delete(deleteComment);

//     // Message routes
//     app.route('/messages')
//     .get(getAllMessages)
//     .post(createMessage);

//     app.route('/messages/:senderId/:recipientId')
//     .get(getMessagesByUsers)


//     app.route('/messages/:id')
//     .delete(deleteMessage);
    
//     //Authentication routes
//     app.route('/auth/login')
//     .post(login);

//    app.route('/auth/signup')
//     .post(signup);

//     //Follow routes
//     app.route('/follow')
//       .post(followUser)

//     app.route('/unfollow')
//       .post(unfollowUser)

//     app.route('/followers/:userId')
//       .get(getFollowers)

//      app.route('/following/:userId')
//       .get(getFollowing)

//       //Like routes
//     app.route('/posts/:id/like')
//       .put(unlikePost)
//       .put(likePost)




// }

// export default routes;

