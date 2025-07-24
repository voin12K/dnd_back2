import mongoose from 'mongoose'
import bcrypt from 'bcrypt'

const { Schema, model, Types } = mongoose

const userSchema = new Schema({
  username: { type: String, required: true, unique: true },
  name: String,
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  profileImage: String,
  description: String,
  userRooms: [{ type: Types.ObjectId, ref: 'Room' }],
  connectedRooms: [{ type: Types.ObjectId, ref: 'Room' }],
  userCharacters: [{ type: Types.ObjectId, ref: 'Character' }],
  userContent: [{ type: Types.ObjectId, ref: 'Content' }],
  savedContent: [{ type: Types.ObjectId, ref: 'Content' }],
  friends: [{ type: Types.ObjectId, ref: 'User' }],
  isVerified: { type: Boolean, default: false },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },

  customContent: {
    races: [{ type: Types.ObjectId, ref: 'Race' }],
    classes: [{ type: Types.ObjectId, ref: 'Class' }],
    spells: [{ type: Types.ObjectId, ref: 'Spell' }],
    templates: [{ type: Types.ObjectId, ref: 'Template' }],
    campaigns: [{ type: Types.ObjectId, ref: 'Campaign' }],
  },

  language: String,
  tags: [String],
  achievements: [{ type: Types.ObjectId, ref: 'Achievement' }],
  mainRole: String,
  skills: [String],
  premium: { type: Boolean, default: false },
  gamesMaster: String,
  gamesPlayer: String,
})

userSchema.pre('save', async function (next) {
  this.updatedAt = Date.now()

  if (!this.isModified('password')) return next()

  try {
    const salt = await bcrypt.genSalt(10)
    this.password = await bcrypt.hash(this.password, salt)
    next()
  } catch (err) {
    next(err)
  }
})

const User = model('User', userSchema)

export default User
