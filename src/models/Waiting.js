import mongoose from "mongoose";

const waitingSchema = new mongoose.Schema({
  phoneNum: {
    type: String,
    required: true,
  },
  // ! 추가 필요
});

const Waiting = mongoose.model("Waiting", waitingSchema);

export default Waiting;
