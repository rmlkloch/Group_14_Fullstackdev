const mongoose = require('mongoose');

const columnSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, 'Please add a column title'],
      trim: true,
    },
    position: {
      type: Number,
      default: 0,
    },
    color: {
      type: String,
      default: '#6366f1',
    },
  },
  {
    toJSON: {
      transform(doc, ret) {
        ret.id = ret._id;
        delete ret._id;
        return ret;
      },
    },
  }
);

const boardSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'Please add a board name'],
      trim: true,
      maxlength: [100, 'Board name cannot exceed 100 characters'],
    },
    description: {
      type: String,
      trim: true,
      default: '',
    },
    ownerId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: [true, 'Please add an owner ID'],
    },
    members: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
      },
    ],
    columns: {
      type: [columnSchema],
      default: [
        { title: 'To Do', position: 0, color: '#6366f1' },
        { title: 'Doing', position: 1, color: '#f59e0b' },
        { title: 'Done', position: 2, color: '#10b981' },
      ],
    },
  },
  {
    timestamps: true,
    toJSON: {
      transform(doc, ret) {
        ret.id = ret._id;
        delete ret._id;
        delete ret.__v;
        return ret;
      },
    },
  }
);

// Indexes for query optimization
boardSchema.index({ ownerId: 1 });
boardSchema.index({ members: 1 });

const Board = mongoose.model('Board', boardSchema);

module.exports = Board;
