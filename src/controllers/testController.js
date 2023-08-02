import Test from "../models/Test";

export const postTest = async (req, res) => {
  const { title, artist } = req.body;

  try {
    const newTest = await Test.create({
      title,
      artist,
    });
    return res.json({ msg: "success" });
  } catch (error) {
    console.log(error);
    return res.json({ msg: "fail" });
  }
};
