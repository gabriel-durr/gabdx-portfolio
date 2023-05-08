import { v4 as uuidv4 } from 'uuid'
import { Document, model, models, Schema, Model, Types } from 'mongoose'

export interface FeedbackUser {
  _id?: Types.ObjectId
  feedbackId: string
  userIp: string
  createdAt?: Date
  feedbackLevel: 'terrible' | 'bad' | 'regular' | 'good' | 'excellent'
  avatar?: string
  name: string
  comment: string
  likes?: String[]
  dislikes?: String[]
  reports?: {
    reportedBy_Id: String
    reportedByName: String
    typeOfReport: String
  }[]
}
export interface FeedbackDocument extends Document {
  postId: string
  feedbackList: FeedbackUser[]
}

const feedbackUserSchema = new Schema<FeedbackUser>(
  {
    _id: {
      type: Schema.Types.ObjectId,
      default: () => new Types.ObjectId()
    },
    feedbackId: { type: String, default: uuidv4 },
    userIp: { type: String, required: true },
    feedbackLevel: {
      type: String,
      enum: ['terrible', 'bad', 'regular', 'good', 'excellent'],
      required: true
    },
    name: { type: String, required: true },
    avatar: { type: String, default: '' },
    comment: { type: String, required: true },
    likes: { type: [String], required: true, default: [] },
    dislikes: { type: [String], required: true, default: [] },
    reports: {
      type: [
        {
          reportedBy_Id: { type: String, required: true },
          reportedByName: { type: String, required: true },
          typeOfReport: { type: String, required: true }
        }
      ],
      required: true,
      default: []
    }
  },
  { timestamps: true }
)

const feedbackSchema = new Schema<FeedbackDocument>({
  postId: { type: String, required: true, unique: true },
  feedbackList: { type: [feedbackUserSchema], required: true }
})

const FeedbackModel: Model<FeedbackDocument> =
  models['Feedback'] || model('Feedback', feedbackSchema)

export { Types }
export default FeedbackModel
