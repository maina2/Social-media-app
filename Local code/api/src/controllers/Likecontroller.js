import sql from 'mssql';
import config from '../db/config.js';

// Like a post
export const likePost = async (req, res) => {
  const { postId, userId } = req.body;
  try {
    const pool = await sql.connect(config.sql);
    await pool
      .request()
      .input('postId', sql.Int, postId)
      .input('userId', sql.Int, userId)
      .query('INSERT INTO Likes (postId, userId) VALUES (@postId, @userId)');
    res.status(201).json({ message: 'Post liked successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error liking post' });
  } finally {
    sql.close();
  }
};

// Unlike a post
export const unlikePost = async (req, res) => {
  const { postId, userId } = req.body;
  try {
    const pool = await sql.connect(config.sql);
    await pool
      .request()
      .input('postId', sql.Int, postId)
      .input('userId', sql.Int, userId)
      .query('DELETE FROM Likes WHERE postId = @postId AND userId = @userId');
    res.status(200).json({ message: 'Post unliked successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error unliking post' });
  } finally {
    sql.close();
  }
};