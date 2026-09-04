const mongoose = require('mongoose');

const activitySchema = new mongoose.Schema(
  {
    boardId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Board',
      required: [true, 'Please add a board ID'],
    },
    taskId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Task',
      default: null,
    },
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: [true, 'Please add a user ID'],
    },
    action: {
      type: String,
      required: [true, 'Please add an activity action'],
      enum: {
        values: [
          'CREATED_TASK',
          'MOVED_TASK',
          'UPDATED_TASK',
          'DELETED_TASK',
          'ADDED_COMMENT',
          'MEMBER_ADDED',
        ],
        message: '{VALUE} is not a valid activity action',
      },
    },
    details: {
      type: mongoose.Schema.Types.Mixed,
      default: {},
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

// Indexes
activitySchema.index({ boardId: 1 });
activitySchema.index({ taskId: 1 });
activitySchema.index({ userId: 1 });
activitySchema.index({ createdAt: -1 });

const Activity = mongoose.model('Activity', activitySchema);

module.exports = Activity;
