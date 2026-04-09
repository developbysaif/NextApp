import mongoose from 'mongoose';

const UserSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'Please provide a name'],
    },
    email: {
      type: String,
      required: [true, 'Please provide an email'],
      unique: true,
      match: [
        /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
        'Please provide a valid email',
      ],
    },
    password: {
      type: String,
      required: [true, 'Please provide a password'],
      minlength: 6,
      select: false, // Don't return password by default
    },
    role: {
      type: String,
      enum: ['user', 'admin', 'customer', 'doctor'],
      default: 'customer',
    },
    // Optional fields they might add during profile updates
    phone: { type: String, default: '+92 300 0000000' },
    avatar: { type: String, default: '' },
    dob: { type: String, default: '1995-05-15' },
    gender: { type: String, default: 'Male' },
    address: { type: String, default: 'Karachi, Pakistan' },
    bio: { type: String, default: 'I am passionate about natural healing and maintaining a healthy lifestyle through diet.' },
    bloodGroup: { type: String, default: 'O+' },
    height: { type: String, default: "5'10\"" },
    weight: { type: String, default: '75 kg' },
  },
  {
    timestamps: true,
  }
);

// If model already exists, use that, otherwise create a new one
export default mongoose.models.User || mongoose.model('User', UserSchema);
