import React, { Component } from "react";
import axios from "axios";

const API_KEY = process.env.REACT_APP_MM_KEY;

const Context = React.createContext();

const reducer = (state, action) => {
  switch (action.type) {
    case "Search":
      return {
        ...state,
        heading: "Tracks Based on Search",
        track_list: action.payload
      };
    default:
      return state;
  }
};
export class Provider extends Component {
  state = {
    track_list: [],
    heading: "Top 10 Songs",
    dispatch: action => {
      this.setState(state => reducer(state, action));
    }
  };
  componentDidMount() {
    axios
      .get(
        `https://cors-anywhere.herokuapp.com/http://api.musixmatch.com/ws/1.1/chart.tracks.get?page=1&page_size=10&country=it&f_has_lyrics=1&apikey=${API_KEY}`
      )
      .then(res => {
        //console.log("dat", res.data);
        this.setState({ track_list: res.data.message.body.track_list });
      })
      .catch(err => console.log(err));
  }

  render() {
    return (
      <Context.Provider value={this.state}>
        {this.props.children}
      </Context.Provider>
    );
  }
}

export const Consumer = Context.Consumer;
