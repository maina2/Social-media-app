import sql from 'mssql';
import config from '../db/config.js';

// Get all posts
export const getAllPosts = async (req, res) => {
  try {
    const pool = await sql.connect(config.sql);
    const result = await pool.request().query(`
      SELECT 
        Posts.*,
        Users.username AS user_username,
        Comments.comment,
        Comments.user_id AS comment_user_id,
        CommentUsers.username AS comment_username,
        Likes.user_id AS liked_by_user_id
      FROM Posts
      JOIN Users ON Posts.user_id = Users.id
      LEFT JOIN Comments ON Posts.id = Comments.post_id
      LEFT JOIN Users AS CommentUsers ON Comments.user_id = CommentUsers.id
      LEFT JOIN Likes ON Posts.id = Likes.post_id
    `);

    // Group the results by post ID to combine multiple comments and likes for the same post
    const groupedResults = {};
    result.recordset.forEach((row) => {
      if (!groupedResults[row.id]) {
        groupedResults[row.id] = {
          ...row,
          comments: row.comment
            ? [
                {
                  user_id: row.comment_user_id,
                  username: row.comment_username,
                  comment: row.comment,
                },
              ]
            : [],
        };
      } else if (row.comment) {
        groupedResults[row.id].comments.push({
          user_id: row.comment_user_id,
          username: row.comment_username,
          comment: row.comment,
        });
      }
    });

    const posts = Object.values(groupedResults);

    res.status(200).json(posts);
  } catch (error) {
    res.status(500).json({ message: 'Error retrieving posts' });
  } finally {
    sql.close();
  }
};


// Get a post by ID
export const getPostById = async (req, res) => {
  const { id } = req.params;
  try {
    const pool = await sql.connect(config.sql);
    const result = await pool
      .request()
      .input('id', sql.VarChar, id)
      .query(`
        SELECT 
          Posts.*,
          Users.username,
          Comments.comment,
          Comments.user_id AS comment_user_id
        FROM Posts
        JOIN Users ON Posts.user_id = Users.id
        LEFT JOIN Comments ON Posts.id = Comments.post_id
        WHERE Posts.id = @id
      `);

    if (result.recordset.length === 0) {
      return res.status(404).json({ message: 'Post not found' });
    }

    const post = result.recordset[0];

    // If the post has comments, we need to group them together in an array
    if (post.comment) {
      post.comments = result.recordset
        .filter((row) => row.comment !== null && row.comment_user_id !== null) // Filter out rows with null comments or comment_user_id
        .map((row) => ({
          user_id: row.comment_user_id,
          comment: row.comment,
        }));
    } else {
      post.comments = [];
    }

    const userId = req.userId; // Assuming you have the user ID stored in the request object

    const likeResult = await pool
      .request()
      .input('postId', sql.VarChar, id)
      .input('userId', sql.VarChar, userId)
      .query(`
        SELECT user_id
        FROM Likes
        WHERE post_id = @postId AND user_id = @userId
      `);

    post.liked_by_user_id = likeResult.recordset.length > 0 ? likeResult.recordset[0].user_id : null;

    res.status(200).json(post);
  } catch (error) {
    res.status(500).json(error.message);
  } finally {
    sql.close();
  }
};



// Create a new post
export const createPost = async (req, res) => {
  const {id, user_id, content, image } = req.body;
  try {
    const pool = await sql.connect(config.sql);
    await pool
      .request()
      .input('id', sql.VarChar, id)
      .input('user_id', sql.VarChar, user_id)
      .input('content', sql.Text, content)
      .input('image', sql.VarChar, image)
      .query('INSERT INTO Posts (id,user_id, content, image) VALUES (NEWID(),@user_id, @content, @image)');
    res.status(201).json({ message: 'Post created successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error creating post' });
  } finally {
    sql.close();
  }
};

// Update a post
export const updatePost = async (req, res) => {
  const { id } = req.params;
  const { user_id, content, image } = req.body;
  try {
    const pool = await sql.connect(config.sql);
    await pool
      .request()
      .input('id', sql.VarChar, id)
      .input('user_id', sql.VarChar, user_id)
      .input('content', sql.Text, content)
      .input('image', sql.VarChar, image)
      .query('UPDATE Posts SET user_id = @user_id, content = @content, image = @image WHERE id = @id');
    res.status(200).json({ message: 'Post updated successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error updating post' });
  } finally {
    sql.close();
  }
};

// Delete a post
export const deletePost = async (req, res) => {
  const { id } = req.params;
  try {
    const pool = await sql.connect(config.sql);
    await pool
      .request()
      .input('id', sql.VarChar, id)
      .query('DELETE FROM Posts WHERE id = @id');
    res.status(200).json({ message: 'Post deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error deleting post' });
  } finally {
    sql.close();
  }
};
