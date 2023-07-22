import sql from 'mssql';
import config from '../db/config.js';

// Follow a user
export const followUser = async (req, res) => {
  const { followerId, followeeId } = req.body;
  try {
    const pool = await sql.connect(config.sql);
    await pool
      .request()
      .input('followerId', sql.VarChar, followerId) // Use sql.VarChar for VARCHAR columns
      .input('followeeId', sql.VarChar, followeeId) // Use sql.VarChar for VARCHAR columns
      .query('INSERT INTO Followers (follower_id, following_id) VALUES (@followerId, @followeeId)'); // Use correct column names
    res.status(201).json({ message: 'User followed successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error following user' });
  } finally {
    sql.close();
  }
};

// Unfollow a user
export const unfollowUser = async (req, res) => {
  const { followerId, followeeId } = req.body;
  try {
    const pool = await sql.connect(config.sql);
    await pool
      .request()
      .input('followerId', sql.VarChar, followerId) // Use sql.VarChar for VARCHAR columns
      .input('followeeId', sql.VarChar, followeeId) // Use sql.VarChar for VARCHAR columns
      .query('DELETE FROM Followers WHERE follower_id = @followerId AND following_id = @followeeId'); // Use correct column names
    res.status(200).json({ message: 'User unfollowed successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error unfollowing user' });
  } finally {
    sql.close();
  }
};

// Get followers of a user
export const getFollowers = async (req, res) => {
  const { userId } = req.params;
  try {
    const pool = await sql.connect(config.sql);
    const result = await pool
      .request()
      .input('userId', sql.VarChar, userId) // Use sql.VarChar for VARCHAR columns
      .query('SELECT * FROM Followers WHERE following_id = @userId'); // Use correct column names
    res.status(200).json(result.recordset);
  } catch (error) {
    res.status(500).json({ message: 'Error retrieving followers' });
  } finally {
    sql.close();
  }
};

// Get users followed by a user
export const getFollowing = async (req, res) => {
  const { userId } = req.params;
  try {
    const pool = await sql.connect(config.sql);
    const result = await pool
      .request()
      .input('userId', sql.VarChar, userId) // Use sql.VarChar for VARCHAR columns
      .query('SELECT * FROM Followers WHERE follower_id = @userId'); // Use correct column names
    res.status(200).json(result.recordset);
  } catch (error) {
    res.status(500).json({ message: 'Error retrieving following' });
  } finally {
    sql.close();
  }
};
