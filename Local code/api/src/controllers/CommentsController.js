import sql from 'mssql';
import config from '../db/config.js';

// Get all comments for a post
export const getCommentsByPostId = async (req, res) => {
  const { postId } = req.params;
  try {
    const pool = await sql.connect(config.sql);
    const result = await pool
      .request()
      .input('postId', sql.VarChar, postId)
      .query('SELECT * FROM Comments WHERE post_id = @postId');
    res.status(200).json(result.recordset);
  } catch (error) {
    res.status(500).json({ message: 'Error retrieving comments' });
  } finally {
    sql.close();
  }
};

// Create a new comment for a post
export const createComment = async (req, res) => {
  const { content, postId, userId } = req.body;
  try {
    const pool = await sql.connect(config.sql);
    await pool
      .request()
      .input('content', sql.Text, content)
      .input('postId', sql.VarChar, postId)
      .input('userId', sql.VarChar, userId)
      .query('INSERT INTO Comments (id, comment, post_id, user_id) VALUES (NEWID(), @content, @postId, @userId)');
    res.status(201).json({ message: 'Comment created successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error creating comment' });
  } finally {
    sql.close();
  }
};

// Delete a comment
export const deleteComment = async (req, res) => {
  const { id } = req.params;
  try {
    const pool = await sql.connect(config.sql);
    await pool
      .request()
      .input('id', sql.VarChar, id)
      .query('DELETE FROM Comments WHERE id = @id');
    res.status(200).json({ message: 'Comment deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error deleting comment' });
  } finally {
    sql.close();
  }
};

export default {
  getCommentsByPostId,
};
