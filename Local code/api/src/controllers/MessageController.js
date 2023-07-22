// MessagesController.js

import sql from 'mssql';
import config from '../db/config.js';

// Get all messages
export const getAllMessages = async (req, res) => {
  try {
    const pool = await sql.connect(config.sql);
    const result = await pool.request().query('SELECT * FROM Messages');
    res.status(200).json(result.recordset);
  } catch (error) {
    res.status(500).json({ message: 'Error retrieving messages' });
  } finally {
    sql.close();
  }
};

// Get messages by sender ID and recipient ID
export const getMessagesByUsers = async (req, res) => {
  const { senderId, recipientId } = req.params;
  try {
    const pool = await sql.connect(config.sql);
    const result = await pool
      .request()
      .input('senderId', sql.Int, senderId)
      .input('recipientId', sql.Int, recipientId)
      .query('SELECT * FROM Messages WHERE senderId = @senderId AND recipientId = @recipientId');
    res.status(200).json(result.recordset);
  } catch (error) {
    res.status(500).json({ message: 'Error retrieving messages' });
  } finally {
    sql.close();
  }
};

// Create a new message
export const createMessage = async (req, res) => {
  const { senderId, recipientId, content } = req.body;
  try {
    const pool = await sql.connect(config.sql);
    await pool
      .request()
      .input('senderId', sql.Int, senderId)
      .input('recipientId', sql.Int, recipientId)
      .input('content', sql.NVarChar, content)
      .query('INSERT INTO Messages (senderId, recipientId, content) VALUES (@senderId, @recipientId, @content)');
    res.status(201).json({ message: 'Message created successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error creating message' });
  } finally {
    sql.close();
  }
};

// Delete a message
export const deleteMessage = async (req, res) => {
  const { id } = req.params;
  try {
    const pool = await sql.connect(config.sql);
    await pool
      .request()
      .input('id', sql.Int, id)
      .query('DELETE FROM Messages WHERE id = @id');
    res.status(200).json({ message: 'Message deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error deleting message' });
  } finally {
    sql.close();
  }
};

