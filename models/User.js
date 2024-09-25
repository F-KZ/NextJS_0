import { Schema, model, models } from 'mongoose'

const UserSchema = new Schema({
    email: {
        unique : [true, "Email already exist"],
        required : [true, "Email is required"],
        type: String
    },
    username: {
        type: String,
        required : [true, "Username is required"],
        unique : [true, "Username already exist"],

    },
    image: {
        type: String
    },
    bookmarks: [{
        type: Schema.Types.ObjectId,
        ref: 'Property'
    
}]
},
{
    timestamps : true
})

const User = models.User || model('User', UserSchema)

export default User