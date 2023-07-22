import sql from 'mssql';
import config from '../db/config.js';

// Get all posts
export const getAllPosts = async (req, res) => {
  try {
    const pool = await sql.connect(config.sql);
    const result = await pool.request().query('SELECT * FROM Posts');
    res.status(200).json(result.recordset);
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
      .query('SELECT * FROM Posts WHERE id = @id');
    if (result.recordset.length === 0) {
      return res.status(404).json({ message: 'Post not found' });
    }
    res.status(200).json(result.recordset[0]);
  } catch (error) {
    res.status(500).json({ message: 'Error retrieving post' });
  } finally {
    sql.close();
  }
};

// Create a new post
export const createPost = async (req, res) => {
  const { user_id, content, image } = req.body;
  try {
    const pool = await sql.connect(config.sql);
    await pool
      .request()
      .input('user_id', sql.VarChar, user_id)
      .input('content', sql.Text, content)
      .input('image', sql.VarChar, image)
      .query('INSERT INTO Posts (user_id, content, image) VALUES (@user_id, @content, @image)');
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
