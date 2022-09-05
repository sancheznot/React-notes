import React, { Component } from "react";
import axios from "axios";
import DayPicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

export default class CreateNotes extends Component {
  state = {
    users: [],
    selectUser: "",
    title: "",
    content: "",
    date: new Date(),
    editingNote: false,
    _id: "",
  };

  async componentDidMount() {
    const res = await axios.get("http://localhost:3200/api/users");
    if (res.data.length > 0) {
      this.setState({
        users: res.data.map((user) => user.username),
        selectUser: res.data[0].username,
      });
    }
    if (this.props.match.params.id) {
      const res = await axios.get(
        "http://localhost:3200/api/notes/" + this.props.match.params.id
      );
      console.log(res.data);
      this.setState({
        title: res.data.title,
        content: res.data.content,
        date: new Date(res.data.date),
        author: res.data.author,
        _id: res.data._id,
        editingNote: true,
      });
    }
  }

  onSubmit = async (e) => {
    e.preventDefault();
    if (this.state.editingNote) {
      const updatedNote = {
        title: this.state.title,
        content: this.state.content,
        author: this.state.selectUser,
        date: this.state.date,
      };
      await axios.put(
        "http://localhost:3200/api/notes/" + this.state._id,
        updatedNote
      );
    } else {
      const newNote = {
        title: this.state.title,
        content: this.state.content,
        date: this.state.date,
        author: this.state.selectUser,
      };
      await axios.post("http://localhost:3200/api/notes", newNote);
    }
    window.location.href = "/";
  };

  onChageInput = (e) => {
    this.setState({
      [e.target.name]: e.target.value,
    });
  };
  OnChageDate = (date) => {
    this.setState({ date });
  };

  render() {
    return (
      <div className="col-md-6 offset-md-3">
        <div className="card card-body">
          <h4>Create a Note</h4>
          <div className="from-group">
            <select
              name="selectUser"
              className="form-control"
              onChange={this.onChageInput}
              value={this.state.selectUser}
            >
              {this.state.users.map((user) => (
                <option key={user}>{user}</option>
              ))}
            </select>
          </div>
          <div className="form-group">
            <input
              type="text"
              className="form-control mt-2"
              placeholder="Title"
              name="title"
              required
              onChange={this.onChageInput}
              value={this.state.title}
            />
          </div>
          <div className="form-group">
            <textarea
              name="content"
              id="content"
              cols="30"
              rows="5"
              className="form-control mt-3"
              required
              onChange={this.onChageInput}
              value={this.state.content}
            ></textarea>
          </div>
          <div className="form-group">
            <DayPicker
              className="form-control mt-1"
              selected={this.state.date}
              onChange={this.OnChageDate}
            />
          </div>
          <form onSubmit={this.onSubmit}>
            <button className="btn btn-primary mt-3">save</button>
          </form>
        </div>
      </div>
    );
  }
}
