import React, { Component } from 'react';
import { Route } from 'react-router-dom'
import Home from './Home'
import Search from './Search'
import './App.css'



class BooksApp extends Component {
  state = {books: []
    /**
     * TODO: Instead of using this state variable to keep track of which page
     * we're on, use the URL in the browser's address bar. This will ensure that
     * users can use the browser's back and forward buttons to navigate between
     * pages, as well as provide a good URL they can bookmark and share.
     */
    // showSearchPage: false
  }


render() {
      return (
        <div className="app">
          {/* Rendering the exact page which is Home page. */}
            <Route exact path="/" render={() => ( 
            <Home 
            books={this.state.books}
            />
            )}/>
          {/* Rendering the exact page which is page for
           searching book to add it in hom page. */}
            <Route exact path="/search" render={() => 
              ( <Search
                books={this.state.books}
                />
              )}/>
              
            </div> 
          );
        };
}
export default BooksApp
