import Message from "../models/messageModel.js";
import { StatusCodes } from "http-status-codes";
import { BadRequestError } from "../errors/customErrors.js";

export const getMessages = async (req, res) => {
  const { userId } = req.query;

  if (req.user.role === "admin") {
    if (!userId) {
      throw new BadRequestError("Please provide a user ID");
    }
    const messages = await Message.find({
      $or: [
        { sender: req.user.userId, receiver: userId },
        { sender: userId, receiver: req.user.userId },
        { sender: userId, senderType: "user", receiver: { $exists: false } },
      ],
    }).sort("createdAt");
    return res.status(StatusCodes.OK).json({ messages });
  }

  const messages = await Message.find({
    $or: [
      { sender: req.user.userId },
      { receiver: req.user.userId },
    ],
  }).sort("createdAt");
  
  res.status(StatusCodes.OK).json({ messages });
};

export const sendMessage = async (req, res) => {
  const { text, receiverId } = req.body;

  if (!text) {
    throw new BadRequestError("Please provide message text");
  }

  const senderType = req.user.role === "admin" ? "admin" : "user";
  
  // Format local time string
  const date = new Date();
  let hours = date.getHours();
  const minutes = date.getMinutes().toString().padStart(2, "0");
  const ampm = hours >= 12 ? "PM" : "AM";
  hours = hours % 12;
  hours = hours ? hours : 12;
  const time = `${hours}:${minutes} ${ampm}`;

  const messageData = {
    sender: req.user.userId,
    text,
    senderType,
    time,
  };

  if (receiverId) {
    messageData.receiver = receiverId;
  }

  const message = await Message.create(messageData);
  res.status(StatusCodes.CREATED).json({ message });
};
