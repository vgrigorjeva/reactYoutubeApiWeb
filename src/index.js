import _ from 'lodash';
import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import YTSearch from 'youtube-api-search';
import SearchBar from './components/search_bar';
import VideoList from './components/video_list';
import VideoDetail from './components/video_detail';
const API_KEY = 'AIzaSyBW8xoQ8dCzGwH8mpyxn1y2cz8Xe0SqpTg';

// Create a new component. this component should produce some HTML
// downwards data flow means that only the most parent component should be responsible for fetching data 
class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      videos: [],
      selectedVideo: null,
    };
    this.videoSearch('simpsons');
  }

  // the method takes a single string - a search term. we take this method and pass it 
  // it down to the search bar under the property onsearchtermchange
  videoSearch(term) {
    YTSearch({ key: API_KEY, term }, (videos) => {
      this.setState({
        videos,
        selectedVideo: videos[0],
      }); // can write like this instead this.setState({ videos: videos }) when the key and the value are same strings 
    });
  }

  render() {
    const videoSearch = _.debounce((term) => { this.videoSearch(term); }, 500);
    return (
      <div>
        <SearchBar onSearchTermChange={videoSearch} />{/* passing prop videos to videolist */}
        <VideoDetail video={this.state.selectedVideo} />
        <VideoList
          onVideoSelect={selectedVideo => this.setState({ selectedVideo })}
          videos={this.state.videos}
        />
      </div>
    );
  }
}

// Take this component's generated HTML and put it on the page (in the DOM)
ReactDOM.render(<App />, document.querySelector('.container'));
