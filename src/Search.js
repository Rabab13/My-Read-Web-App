import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import BookList from './BookList'
import * as BooksAPI from './BooksAPI'
// import PropTypes from 'prop-types'



class Search extends  Component {
 // To change books between shelves so we need to use state, as props for unchangeable data.
    state = {
        query: '',
        searchResult:[],
        Error:false
    }
 

    // Get all books from book API to filter books result while searching through BOOKSAPI.
    componentDidMount() {
        BooksAPI.getAll()
          .then((books) => {
            this.setState(() => ({books})
            )
          })
      }
      

    // Searching book through BooksAPI.
    Search = (event) => {
        const query = event.target.value
        this.setState({ query });
        if(query) {
            BooksAPI.search(query.trim()).then(books => {
                books.length > 0
                  ? this.setState({ searchResult: books, Error: false })
                  : this.setState({ searchResult: [], Error: true });
              });
        
              // if query is empty => reset state to default
            } else this.setState({ searchResult: [], Error: false });
          };
 // Changing books from shelf to another shelf.
    movingBooks = (book, newShelf) => {
        BooksAPI.update(book,newShelf).then((result) =>{
    // Change the shelf of the book.
            book.shelf = newShelf
    //  Filter books accuording to new result after changing the shelf of books. 
            const updatedBooks = this.state.books.filter((resultBook) => 
            resultBook.id !== book.id)
            updatedBooks.push(book)
    // Set the new state of the book.
            this.setState({books: updatedBooks})
        })}

    render() {
        // Define state backage to render the data.
            const { query, searchResult, Error} = this.state;
            
 


       return(
        <div className="search-books">
            <div className="search-books-bar">
            <Link to="/" className="close-search">Close</Link>
                    <div className="search-books-input-wrapper">
                    <input
                    // Using input method to search for books
                         value={query}
                         type="text"
                         onChange={this.Search}
                         placeholder="Search by title or author"/>
                    </div>
            </div>
            <div className="search-books-results">
                {searchResult.length>0 && (
                <div>
                    <div>
                        <h3>Search Result {searchResult.length} books</h3>
                    </div>
                    <ol className="books-grid">
                    {searchResult.map((book) =>(
                        <BookList
                            key={book.id}
                            book={book}
                            // Using movingBooks func to move books from BooksAPI to the home page
                            //  accourding to the selected shelf.
                            movingBooks={this.movingBooks}
                        />
                    ))}
                </ol>
                </div>
                )}
                {/* In case of searching for not existing book will get the below massage */}
                {Error && (
                    <div>
                        <h2 style={{fontStyle: "italic",
                         fontFamily:'strong'}}>Book Not Found. Please try again !</h2>
                    </div>
                )}
            </div>
        </div>
       )
   }
}

export default Search