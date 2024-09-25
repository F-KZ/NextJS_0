import { convertObject } from '@/utils/convertObject';
import { Schema, model, models } from 'mongoose';

const MessageSchema = new Schema(
  {
    sender: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    recipient: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    property: {
      type: Schema.Types.ObjectId,
      ref: 'Property',
      required: true,
    },
    name: {
      type: String,
      required: [true, 'Please provide your name.'],
    },
    email: {
      type: String,
      required: [true, 'Please provide your email.'],
    },
    phone: String,
    body: {
      type: String,
      default: '',
    },
    read: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true, // Automatically add createdAt and updatedAt fields
  }
);

// Check if the model already exists in the models object to avoid recompilation
const Message = models.Message || model('Message', MessageSchema);


export default Message;
