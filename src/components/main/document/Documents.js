import { useState, useRef } from 'react';
import { UserContext } from '../../../userContext';
import { useContext } from 'react';

import DocumentList from './document-list/DocumentList';

import Loupe from './loupe.js';

import './Documents.css';

const Documents = () => {
  const {
    data: { documents },
  } = useContext(UserContext);
  const [items, setItems] = useState(documents);

  const inputRef = useRef();

  const toggleInput = (e) => {
    inputRef.current.classList.add('search__input-open');
    e.target.closest('.search__label').classList.add('search__label-open');
  };

  const searchItems = (e) => {
    const value = e.target.value;
    if (value !== '' || value.trim() !== '') {
      setItems(documents.filter(({ name }) => name.includes(value)));
    } else {
      setItems(documents);
    }
  };

  const filterItems = (e) => {
    const filterType = e.target.value;

    if (filterType === 'show-all') {
      setItems(documents);
    } else {
      const sortedDocuments = []
        .concat(documents)
        .sort((a, b) => ('' + a[filterType]).localeCompare(b[filterType]));
      setItems(sortedDocuments);
    }
  };

  const categoryItems = () => {};

  const deleteItem = (itemId) => {
    setItems(items.filter(({ id }) => id !== itemId));
  };

  return (
    <div className="documents">
      <div className="document__top">
        <div className="filter__group">
          <div className="select__box">
            <select onChange={filterItems}>
              <option hidden>Sort By</option>
              <option value="show-all">Show All</option>
              <option value="tipe">Tipe</option>
              <option value="date">Date</option>
              <option value="status">Status</option>
            </select>
          </div>
          <div className="select__box">
            <select onChange={categoryItems}>
              <option hidden>Category</option>
              <option value="show-all">Show All</option>
              <option value="financial">Financial</option>
              <option value="technology">Technology</option>
              <option value="healthcare">Healthcare</option>
            </select>
          </div>
          <div className="search__form">
            <input
              id="search__input"
              type="text"
              ref={inputRef}
              className="search__input"
              onChange={searchItems}
            />
            <label
              onClick={toggleInput}
              className="search__label"
              htmlFor="search__input"
            >
              <Loupe />
            </label>
          </div>
        </div>
        <div className="upload__form">
          <label htmlFor="upload" className="btn">
            Upload document
          </label>
          <input type="file" id="upload" hidden />
        </div>
      </div>
      <DocumentList documents={items} deleteItem={deleteItem} />
    </div>
  );
};

export default Documents;
