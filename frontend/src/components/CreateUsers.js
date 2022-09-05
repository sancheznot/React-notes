import React, { Component } from "react";
import axios from "axios";

export default class CreateUsers extends Component {
  state = {
    users: [],
    username: "",
  };

  async componentDidMount() {
    this.getUsers()
  }
  // funtion for get user from data base
  async getUsers() {
    const res = await axios.get("http://localhost:3200/api/users");
    this.setState({ users: res.data });
  }
  // funtion for get user from input
  OnchangeUsers = (event) => {
    this.setState({ username: event.target.value });
  };
// funtion for save users
  OnsaveUsers = async (event) => {
    event.preventDefault();
    await axios.post("http://localhost:3200/api/users", {
      username: this.state.username,
    });
    this.setState({username: ''})
    this.getUsers();
  };
// funtion for deleteUser
  deleteUser = async (id) => {
    await axios.delete("http://localhost:3200/api/users/" + id)
    this.getUsers();
  }
  render() {
    return (
      <div className="row">
        <div className="col-md-4">
          <div className="card card-body">
            <h3>Create a new user</h3>
            <form onSubmit={this.OnsaveUsers}>
              <div className="form-group">
                <input
                  type="text"
                  className="form-control"
                  value={this.state.username}
                  onChange={this.OnchangeUsers}
                />
              </div>
              <button type="submit" className="btn btn-primary mt-2">
                Save
              </button>
            </form>
          </div>
        </div>
        <div className="col-md-8">
          <ul className="list-group">
            {this.state.users.map((user) => (
              <li 
              className="list-group-item list-group-action" 
              key={user._id}
              onDoubleClick={() => this.deleteUser(user._id)}
              >
                {user.username}
              </li>
            ))}
          </ul>
        </div>
      </div>
    );
  }
}
