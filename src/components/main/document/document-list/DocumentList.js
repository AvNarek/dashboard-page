import { useRef, useState } from 'react';

import Icons from '../../../../assets/icons/icons';
import { ReactComponent as DotButton } from './menu.svg';
import { ReactComponent as ExcelIcon } from './excel.svg';
import { ReactComponent as PdfIcon } from './pdf.svg';
import { ReactComponent as WordIcon } from './word.svg';

import './DocumentList.css';

const DocumentList = ({ documents, deleteItem }) => {
  const [activePage, setActivePage] = useState(1);
  const btnRef = useRef();

  const itemCount = documents.length;
  const pageItemCount = Math.ceil(window.innerHeight / 100);
  const buttonCount = Math.ceil(itemCount / pageItemCount);
  let count;

  const changeActivePage = (e) => {
    document
      .querySelector('.btn__page-active')
      .classList.remove('btn__page-active');
    e.target.classList.add('btn__page-active');
    setActivePage(e.target.id);
  };

  const createButtons = () => {
    let buttons = [];

    for (let i = 1; i <= buttonCount; i++) {
      buttons.push(
        <button
          className={`btn btn__page ${
            i === activePage ? 'btn__page-active' : ''
          }`}
          id={i}
          onClick={changeActivePage}
          key={i}
        >
          {i}
        </button>
      );
    }
    return buttons;
  };

  const showList = (documents) => {
    const newList = documents.slice(
      (activePage - 1) * pageItemCount,
      activePage * pageItemCount
    );
    count = newList.length;

    return newList;
  };

  const renderIcon = (iconName) => {
    switch (iconName) {
      case 'xlsx':
        return <ExcelIcon />;
      case 'pdf':
        return <PdfIcon />;
      default:
        return <WordIcon />;
    }
  };

  const toggleBox = (e) => {
    let boxElement;
    if (e.target.nodeName === 'svg') {
      boxElement = e.target.previousElementSibling;
    } else {
      boxElement = e.target.closest('svg').previousElementSibling;
    }
    boxElement.classList.toggle('actions__box-active');
  };

  const renderList = showList(documents).map(
    ({ id, name, tipe, date, status }) => (
      <tr key={id}>
        <td>{name}</td>
        <td>
          <div className="document__icon">
            {renderIcon(tipe)}
            {tipe}
          </div>
        </td>
        <td>{date}</td>
        <td>
          <span className={`status ${!status ? 'status__deactive' : ''}`}>
            {status ? 'Active' : 'Deactive'}
          </span>
        </td>
        <td>
          <div className="btn__dot">
            <div className="actions__box">
              <button className="btn__delete" onClick={() => deleteItem(id)}>
                Delete
              </button>
            </div>
            <DotButton onClick={toggleBox} />
          </div>
        </td>
      </tr>
    )
  );

  return (
    <div className="document__list">
      <header className="document__list-header">
        <div className="document__list-left">
          <Icons id="document" />
          <h2>Document List</h2>
          <span className="item__count">{count} items</span>
        </div>
        <div className="document__list-right">
          <div className="buttons__list" ref={btnRef}>
            {createButtons()}
          </div>
          <div className="go__to">
            Go To:
            <input
              type="number"
              onKeyUp={(e) => {
                e.key === 'Enter' &&
                  e.target.value <= buttonCount &&
                  setActivePage(e.target.value);
              }}
            />
          </div>
        </div>
      </header>
      <table className="table">
        <thead className="thead">
          <tr>
            <th>Document Name</th>
            <th>Tipe</th>
            <th>Date</th>
            <th>Status</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody className="tbody">{renderList}</tbody>
      </table>
    </div>
  );
};

export default DocumentList;
