import React, { Component } from "react";
import { Consumer } from "../../context";
import axios from "axios";

const API_KEY = process.env.REACT_APP_MM_KEY;

class Search extends Component {
  state = {
    trackTitle: ""
  };

  onChange = e => {
    this.setState({ [e.target.name]: e.target.value });
  };
  searchTrack = (dispatch, e) => {
    e.preventDefault();
    axios
      .get(
        `https://cors-anywhere.herokuapp.com/http://api.musixmatch.com/ws/1.1/track.search?q_track=${
          this.state.trackTitle
        }&page_size=10&page=1&s_track_rating=desc&apikey=${API_KEY}`
      )
      .then(
        res =>
          dispatch({
            type: "Search",
            payload: res.data.message.body.track_list
          }),
        this.setState({ trackTitle: "" })
      )

      .catch(err => console.log(err));
  };
  render() {
    return (
      <Consumer>
        {value => {
          const { dispatch } = value;
          return (
            <div className="card card-body mb-4 p-4">
              <h1 className="display-4 text-center">
                <i className="fas fa-music" />
                Search Lyrics
              </h1>
              <p className="lead text-center">Get the lyric for any Song..</p>
              <form onSubmit={this.searchTrack.bind(this, dispatch)}>
                <div className="form-group">
                  <input
                    type="text"
                    className="form-control form-control-lg"
                    value={this.state.trackTitle}
                    name="trackTitle"
                    onChange={this.onChange}
                    placeholder="search track..."
                  />
                </div>
                <button
                  type="submit"
                  className="btn btn-success btn-large btn-block mb-5"
                >
                  Get Track Lyrics
                </button>
              </form>
            </div>
          );
        }}
      </Consumer>
    );
  }
}

export default Search;
