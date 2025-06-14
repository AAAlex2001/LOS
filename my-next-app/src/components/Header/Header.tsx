import React from 'react';
import '@/styles/components/header.scss';

const Header: React.FC = () => {
  return (
    <header className="header">
      <div className="header-main" />
      <div className="language-dropdown">
        <div className="text">
          <span>Выберите язык</span>
        </div>
        <div className="arrow">
          <div className="expand-arrow">
            <div className="vector" />
          </div>
        </div>
      </div>
      <div className="frame-228">
        <div className="logo" />
        <div className="frame-163">
          <span>Land of Soul</span>
        </div>
      </div>
      <div className="btn-sign-up-rent">
        <span>Аренда жилья</span>
      </div>
      <div className="btn-sign-up-board">
        <span>Доска объявлений</span>
      </div>
      <div className="guy-image" />
    </header>
  );
};

export default Header;