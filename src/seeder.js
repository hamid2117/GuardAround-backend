import users from './data/UsersData.js'
import incidents from './data/IncidentData.js'
import likes from './data/LikeData.js'
import comments from './data/CommentData.js'
import feedbacks from './data/FeedbackData.js'
// Models
import Users from './models/usersModel.js'
import Incident from './models/incidentModel.js'
import Comment from './models/commentModel.js'
import Feedback from './models/feedbackModel.js'
import Like from './models/likeModel.js'
// other
import dotenv from 'dotenv'
import connectDB from './config/db.js'
dotenv.config()
connectDB()

// Don't do that in Production it will replace all data

const importData = async () => {
  try {
    await Users.deleteMany()
    await Incident.deleteMany()
    await Comment.deleteMany()
    await Like.deleteMany()
    await Feedback.deleteMany()

    const createdUsers = await Users.insertMany(users)
    const firstUser = createdUsers[0]._id

    const sampleIncident = incidents.map((incidents) => {
      return { ...incidents, user: firstUser }
    })

    const createdIncident = await Incident.insertMany(sampleIncident)
    const firstIncident = createdIncident[0]._id
    const sampleLike = likes.map((like) => {
      return { ...like, incident: firstIncident }
    })
    const sampleComment = comments.map((comm) => {
      const newComment = comm.comments.map((data) => {
        return { ...data, user: firstUser }
      })
      return {
        ...comm,
        incident: firstIncident,
        comments: newComment,
      }
    })
    const createdLike = await Like.insertMany(sampleLike)
    const createdComment = await Comment.insertMany(sampleComment)
    const firstLike = createdLike[0]._id
    const firstComment = createdComment[0]._id

    console.log(createdIncident)
    // console.log('insertLikeComment', insertLikeComment._doc)
    // await Incident.insertMany(insertLikeComment)
    const sampleFeedback = feedbacks.map((feedbacks) => {
      return { ...feedbacks, user: firstUser }
    })

    const createdFeedback = await Feedback.insertMany(sampleFeedback)

    console.log(users)
    console.log(createdIncident)
    console.log(sampleComment)
    console.log(sampleLike)
    console.log(createdFeedback)

    console.log('data Inserted !')
    process.exit()
  } catch (error) {
    console.error(`Your Error is : ${error}`)
    process.exit(1)
  }
}

const destroyData = async () => {
  try {
    await Users.deleteMany()
    console.log('data is destroyed ')
    process.exit(0)
  } catch (error) {
    console.error(`Error of destroy Data is : ${error}`)
    process.exit(1)
  }
}

if (process.argv[2] === '-d') {
  destroyData()
} else {
  importData()
}
