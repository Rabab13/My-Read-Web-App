import React, { Component } from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import BookList from "./BookList";
import * as BooksAPI from "./BooksAPI";


class Search extends Component {
  // Requerd moving books func to handel moving books from search page to home page.
  static propTypes = {
    movingBooks: PropTypes.func.isRequired,
  };
  // To change books between shelves so we need to use state, as props for unchangeable data.
  state = {
    books: [],
    query: "",
    searchResult: [],
    Error: false,
  };

  // Get all books from book API
  componentDidMount() {
    BooksAPI.getAll().then((books) => {
      this.setState({
        books: books,
      });
    });
  }
  // Searching book through BooksAPI.
  Search = (event) => {
    const query = event.target.value;
    this.setState({ query });
    if (query) {
      BooksAPI.search(query.trim()).then((booksResult) => {
        if (!booksResult || booksResult.hasOwnProperty("error")) {
          this.setState({ searchResult: [], Error: true });
        } else {
          this.setState({ searchResult: booksResult, Error: false });
          this.ctrSelf();
        }
      });
    } else {
      this.setState({ searchResult: [] });
    }
  };
  // organized books to have the same shelf status in both pages.
  //Function to assign books with the selected shelf name, and all others have the option Not Listed
  // instead of Remove from list as it's not make scence any more.
  ctrSelf = () => {
    const books = this.state.books;
    const searchResult = this.state.searchResult;
    if (searchResult.length > 0) {
      books.forEach((book) => {
        searchResult.forEach((resultOfBooks) => {
          if (book.id === resultOfBooks.id) {
            resultOfBooks.shelf = book.shelf;
          }
        });
      });
    }
    this.setState({ searchResult: searchResult });
  };

  render() {
    // Define state backage to render the data.
    const { books, query, searchResult, Error } = this.state;
    const { movingBooks } = this.props;

    return (
      <div className="search-books">
        <div className="search-books-bar">
          <Link to="/" className="close-search">
            Close
          </Link>
          <div className="search-books-input-wrapper">
            <input
              // Using input method to search for books
              value={query}
              type="text"
              onChange={this.Search}
              placeholder="Search by title or author"
            />
          </div>
        </div>
        <div className="search-books-results">
          {searchResult.length > 0 && (
            <div>
              <div>
                <h3>Search Result {searchResult.length} books</h3>
              </div>
              <ol className="books-grid">
                {searchResult.map((book) => (
                  <BookList
                    key={book.id}
                    book={book}
                    books={books}
                    // Using movingBooks func to move books from BooksAPI to the home page
                    //  accourding to the selected shelf.
                    movingBooks={movingBooks}
                  />
                ))}
              </ol>
            </div>
          )}
          {/* In case of searching for not existing book will get the below massage */}
          {Error && (
            <div>
              <h2 style={{ fontStyle: "italic", fontFamily: "strong" }}>
                Book Not Found. Please try again !
              </h2>
            </div>
          )}
        </div>
      </div>
    );
  }
}

export default Search;
