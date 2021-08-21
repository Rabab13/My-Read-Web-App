import React, { Component } from "react";
import PropTypes from "prop-types";

class BookList extends Component {
  // isRequired func to call book as an object and movingBooks as a func
  static propTypes = {
    book: PropTypes.object.isRequired,
    movingBooks: PropTypes.func.isRequired,
    // books:PropTypes.array.isRequired
  };

  render() {
    const { book, movingBooks } = this.props;
    // Defind imageLinks the cover of the book.
    // searching for "poetry" and "biography",
    // now works fine to filter out books with missing thumbnails.
    const image = book.imageLinks && book.imageLinks.thumbnail;
    // console.log("Sel"+JSON.stringify(book)+shelf)
    console.log(this.props);
    // console.log(null == undefined)

    return (
      <li>
        <div className="book">
          <div className="book-top">
            <div
              className="book-cover"
              style={{
                width: 128,
                height: 193,
                backgroundImage: `url("${image}")`,
              }}
            ></div>
            <div className="book-shelf-changer">
              <select
                // Using onChange event to track the value with movingBooks func
                //  to chane books between the following shelves.
                onChange={(event) => movingBooks(book, event.target.value)}
                value={book.shelf ? book.shelf : "NotListed"}
              >
                <option value="ctr" disabled>
                  Move to...
                </option>
                <option value="currentlyReading">Currently Reading</option>
                <option value="wantToRead">Want to Read</option>
                <option value="read">Read</option>
                <option value="NotListed">Not Listed</option>
              </select>
            </div>
          </div>
          <div className="book-title">{book.title ? book.title : null}</div>
          {book.authors &&
            //  Author names show with book names
            book.authors.map((authors, index) => (
              <div className="book-authors" key={index}>
                {authors}
              </div>
            ))}
        </div>
      </li>
    );
  }
}

export default BookList;
