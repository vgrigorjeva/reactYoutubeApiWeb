import React, { Component } from 'react';
// functional component
/* const SearchBar = () =>
  <input /> // React.createElement
; */


// class component - should always have the render() method and return some JSX
// define a new class and give it access to all functionality that React.component class has
class SearchBar extends Component {
  constructor(props) {
    super(props);
    // create state
    this.state = { term: '' };
  }

  onInputChange(term) {
    this.setState({ term });
    this.props.onSearchTermChange(term);
  }

  // define methods on a class. must return some JSX
  render() {
    // this.state.term = event.target.value BAD!!!
    // change state with this.setState; use this.state to set value only in the constructor
    return (
      <div className="search-bar">
        <input
          value={this.state.term}
          onChange={event => this.onInputChange(event.target.value)}
        />
      </div>
    );
  }
}

export default SearchBar;
