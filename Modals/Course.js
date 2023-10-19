import mongoose from "mongoose";
import validator from "validator";

const schema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, "Please enter a valid Title"],
    minLength: [4, "Title must be at least 4 character"],
    maxLength: [200, "Title can exceed at least 200 character"],
  },
  description: {
    type: String,
    required: [true, "Please enter a valid Title"],
    minLength: [20, "Title must be at least 4 character"],
    maxLength: [200, "Title can exceed at least 200 character"],
  },
  lectures: [
    {
      title: {
        type: String,
        required: true,
      },
      description: {
        type: String,
        required: true,
      },
      vedio: {
        public_id: {
          type: String,
          required: true,
        },
        url: {
          type: String,
          required: true,
        },
      },
    },
  ],
  poster: {
    public_id: {
      type: String,
      required: true,
    },
    url: {
      type: String,
      required: true,
    },
  },
  views: {
    type: Number,
    default: 0,
  },
  numOfVedios: {
    type: Number,
    default: 0,
  },
  category: {
    type: String,
    required: true,
  },
  createdBy: {
    type: String,
    required: [true, "Enter Course Creater Name"],
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

export const Course = mongoose.model("Course", schema);
