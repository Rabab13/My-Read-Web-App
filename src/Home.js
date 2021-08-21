import React from "react";
import PropTypes from "prop-types";
import BookShelf from "./BookShelf";

const Home = (props) => {
  return (
    <div className="list-books-title">
      <h1>{props.webPageName}</h1>

      <div className="list-books">
        <BookShelf />
      </div>
    </div>
  );
};
// Set default props for Home Page title.
Home.defaultProps = {
  webPageName: "Reads Web App",
};

Home.propTypes = {
  webPageName: PropTypes.string.isRequired,
};

export default Home;
