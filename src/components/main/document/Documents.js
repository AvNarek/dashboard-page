import { useState } from 'react';
import { UserContext } from '../../../userContext';
import { useContext } from 'react';

import DocumentList from './document-list/DocumentList';

import { ReactComponent as Loupe } from './loupe.svg';

import './Documents.css';

const Documents = () => {
  const {
    data: { documents },
  } = useContext(UserContext);
  const [items, setItems] = useState(documents);
  const [active, setActive] = useState(false);
  const [error, setError] = useState(false);

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

  const createNewFile = (e) => {
    if (!e.target.value) return;
    const fileFormat = e.target.value.match(/(\w+)\.(\w+)/)[2];
    const fileName = e.target.value.match(/(\w+)\.(\w+)/)[1];
    const dateFormat = new Date().toLocaleDateString().replace(/\//g, '.');

    if (fileFormat !== ('pdf' || 'xlsx' || 'word')) {
      setError(true);
    } else {
      const newFile = {
        id: Math.random(),
        name: fileName,
        tipe: fileFormat,
        date: dateFormat,
        status: true,
      };
      setItems(items.concat(newFile));
      setError(false);
    }
    e.target.value = '';
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
              className={`search__input ${active && 'search__input-open'}`}
              onChange={searchItems}
            />
            <label
              onClick={() => setActive(!active)}
              className={`search__label ${active && 'search__label-open'}`}
              htmlFor="search__input"
            >
              <Loupe />
            </label>
          </div>
        </div>
        <div className="upload__form">
          <label
            htmlFor="upload"
            className={`btn btn__label ${error && 'danger'}`}
          >
            Upload document
          </label>
          <input type="file" id="upload" hidden onChange={createNewFile} />
        </div>
      </div>
      <DocumentList documents={items} deleteItem={deleteItem} />
    </div>
  );
};

export default Documents;
