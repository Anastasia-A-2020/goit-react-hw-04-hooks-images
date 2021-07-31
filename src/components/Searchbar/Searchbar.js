import React from "react";
import PropTypes from "prop-types";
import s from "./Searchbar.module.css";

const Searchbar = ({ onFormSubmit }) => {
  return (
    <div>
      <header className={s.Searchbar}>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            onFormSubmit(e.target.elements.imageName.value);
          }}
          className={s.SearchForm}
        >
          <button type="submit" className={s.SearchFormButton}>
            <span className={s.SearchFormButtonLabel}>Search</span>
          </button>

          <input
            className={s.SearchFormInput}
            type="text"
            name="imageName"
            autoComplete="off"
            autoFocus
            placeholder="Search images and photos"
          />
        </form>
      </header>
    </div>
  );
};

export default Searchbar;

Searchbar.propTypes = {
  onFormSubmit: PropTypes.func.isRequired,
};
