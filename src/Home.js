import React, {Component} from 'react'
import BookShelf from './BookShelf'

class Home extends Component {
    // Set default props for Home Page title.
    static defaultProps = {
        webPageName: 'Reads Web App'
    }
       
    render() {
        const webPageName = this.props.webPageName;
    return(
        <div className='list-books-title'>
                <h1>{webPageName}</h1>
            
        <div className="list-books">
         <BookShelf/>
        </div>
        </div>
    )
}}


export default Home