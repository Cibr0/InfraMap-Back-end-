import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    match: [/^\S+@\S+\.\S+$/, "Email inválido"],
  },
  password: {
    type: String,
    required: true,
    minlength: [6, "A senha deve ter no mínimo 6 caracteres"],
  },
});

export default mongoose.model("User", userSchema);
