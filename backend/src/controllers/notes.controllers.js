const NotesControls = {};
const Note = require("../models/Note");

NotesControls.getNotes = async (req, res, next) => {
  const notes = await Note.find();
  res.json(notes);
};

NotesControls.createNotes = async (req, res, next) => {
  const { title, content, date, author } = req.body;
  const newNote = new Note({ title, content, date, author });
  await newNote.save();
  console.log(newNote);
  res.json({ message: "Note created successfully" });
};

NotesControls.getNote = async (req, res, next) => {
  const note = await Note.findById(req.params.id);
  res.json(note);
};

NotesControls.deleteNotes = async (req, res, next) => {
  await Note.findByIdAndDelete(req.params.id);
  res.send("DELETE - Notes Deleted");
};

NotesControls.updateNotes = async (req, res, next) => {
  const { title, content, author } = req.body;
  await Note.findByIdAndUpdate(req.params.id, { title, content, author });
  res.send("PUT - Notes Update");
};

module.exports = NotesControls;
