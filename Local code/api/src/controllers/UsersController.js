import sql from 'mssql';
import config from '../db/config.js';

// Get a user by ID


// Update a user
export const updateUser = async (req, res) => {
  const { id } = req.params;
  const { username, email, password, firstname, lastname, profile_image, bio } = req.body;
  try {
    const pool = await sql.connect(config.sql);
    await pool
      .request()
      .input('id', sql.VarChar, id)
      .input('username', sql.NVarChar, username)
      .input('email', sql.NVarChar, email)
      .input('password', sql.NVarChar, password)
      .input('firstname', sql.NVarChar, firstname)
      .input('lastname', sql.NVarChar, lastname)
      .input('profile_image', sql.VarChar, profile_image)
      .input('bio', sql.Text, bio)
      .query('UPDATE Users SET username = @username, email = @email, password = @password, '
            + 'firstname = @firstname, lastname = @lastname, profile_image = @profile_image, bio = @bio '
            + 'WHERE id = @id');
    res.status(200).json({ message: 'User updated successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error updating user' });
  } finally {
    sql.close();
  }
};

// Delete a user
export const deleteUser = async (req, res) => {
  const { id } = req.params;
  try {
    const pool = await sql.connect(config.sql);
    await pool
      .request()
      .input('id', sql.VarChar, id)
      .query('DELETE FROM Users WHERE id = @id');
    res.status(200).json({ message: 'User deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error deleting user' });
  } finally {
    sql.close();
  }
};

// Get followers and following of a user
export const getFollowersAndFollowing = async (req, res) => {
  const { id } = req.params;
  try {
    const pool = await sql.connect(config.sql);
    const result = await pool
      .request()
      .input('id', sql.VarChar, id)
      .query('SELECT u.id, u.username, u.firstname, u.lastname, u.profile_image, u.bio, '
            + 'CASE WHEN f.follower_id = @id THEN 1 ELSE 0 END as is_followed '
            + 'FROM Users u '
            + 'LEFT JOIN Followers f ON u.id = f.following_id AND f.follower_id = @id '
            + 'WHERE u.id = @id OR f.follower_id = @id');
    res.status(200).json(result.recordset);
  } catch (error) {
    res.status(500).json({ message: 'Error retrieving followers and following' });
  } finally {
    sql.close();
  }
};
export const getAllUsers = async (req, res) => {
  try {
    const pool = await sql.connect(config.sql);
    const result = await pool.request().query('SELECT * FROM Users'); // Fetch all users from the "Users" table
    res.status(200).json(result.recordset);
  } catch (error) {
    res.status(500).json({ message: 'Error retrieving users' });
  } finally {
    sql.close();
  }
};

export default {
  getAllUsers,
  updateUser,
  deleteUser,
  getFollowersAndFollowing,
};
