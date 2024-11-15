import Notemodel from "../Models/Notemodel.js";
//for create notes or get all the notes we have to pass the token after we get by login in the headers in postman with Bearer for the middleware checking

//@description     Create single Note
//@route           POST   http://localhost:8800/api/notes/createnote
//@access          Private ,have to pass the token in the header in postman

export const CreateNotecontroller = async (req, res) => {
  try {
    //getting data from body
    const { title, content, category } = req.body;

    //validation
    if (!title) {
      return res.send({ message: "title is required" });
    }
    if (!content) {
      return res.send({ message: "content is required" });
    }
    if (!category) {
      return res.send({ message: "category is required" });
    }
    const existingNote = await Notemodel.findOne({ title });

    if (existingNote) {
      return res
        .status(400)
        .json({ error: "A note with the same title already exists" });
    }

    const Note = await new Notemodel({
      title,
      content,
      category,
      user: req.user._id, // Associate note with the authenticated user
    }).save();
    res.status(201).send({
      success: true,
      message: "Note creation Successfull",
      Note,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error in Note creation",
      error,
    });
  }
};

//To get all the notes by one user , we have to pass the token after we get by login in the headers in postman with Bearer for the middleware checking
// @desc    Get logged in user notes
// @route   GET  http://localhost:8800/api/notes/getallnote
// @access  Private
export const GetallNotecontroller = async (req, res) => {
  try {
    // Retrieve all notes from the database
    const notes = await Notemodel.find({ user: req.user._id });
    res.json(notes); // Send the notes as JSON response
  } catch (error) {
    console.error("Error retrieving notes:", error);
    res.status(500).json({ error: "Error retrieving notes" });
  }
};
export const GetNotecontroller = async (req, res) => {
  try {
    // Retrieve all notes from the database
    const id = req.params.id;
    const notes = await Notemodel.findById(id);
    res.status(200).json(notes); // Send the notes as JSON response
  } catch (error) {
    console.error("Error retrieving notes:", error);
    res.status(500).json({ error: "Error retrieving notes" });
  }
};
export const DeleteNotecontroller = async (req, res) => {
  try {
    // const id = req.params.id;
    // if (
    //   existingnote.user &&
    //   existingnote.user.toString() !== req.user._id.toString()
    // ) {
    //   res.status(401).send({
    //     success: false,
    //     message: "You can't perform this action",
    //   });
    // }
    // const note = await Notemodel.findByIdAndDelete(id);
    // res.status(200).send({
    //   success: true,
    //   message: "deletion of note is successfull",
    // });

    const note = await Notemodel.findById(req.params.id);

    if (note.user.toString() !== req.user._id.toString()) {
      res.status(401);
      throw new Error("You can't perform this action");
    }

    if (note) {
      const deletedNote = await Notemodel.findByIdAndDelete(req.params.id);
      res.json({ message: "Note removed", deletedNote });
    } else {
      res.status(404);
      throw new Error("Note not Found");
    }
  } catch (error) {
    console.error("Error retrieving notes:", error);
    res.status(500).json({ error: "Error deleting note" });
  }
};

//To edit  the note by one user , we have to pass the token after we get by login in the headers in postman with Bearer for the middleware checking
// @desc    Update a note
// @route   PUT http://localhost:8800/api/notes/editnote/6609a600e6d18c039b5a106e
// @access  Private

export const EditNotecontroller = async (req, res) => {
  try {
    const id = await req.params.id;
    const { title, content, category } = req.body;
    if (!title || !content || !category) {
      return res.send({ message: "any field  is required for updation" });
    }
    const existingnote = await Notemodel.findById(id);
    //chechking the edit is by authenticated user or not ??
    if (
      existingnote.user &&
      existingnote.user.toString() !== req.user._id.toString()
    ) {
      res.status(401).send({
        success: false,
        message: "You can't perform this action",
      });
    }
    if (existingnote) {
      existingnote.title = title;
      existingnote.content = content;
      existingnote.category = category;

      const updatednote = await existingnote.save();

      res.status(200).send({
        success: true,
        message: "Updation of note is successfull",
        updatednote,
      });
    } else {
      res.status(404);
      throw new Error("Note not found");
    }
  } catch (error) {
    console.error("Error retrieving notes:", error);
    res.status(500).json({ error: "Error in updating note" });
  }
};
