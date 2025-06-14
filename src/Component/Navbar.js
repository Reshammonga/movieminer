import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';

function Navbar({ setsearchItem }) {
  const [search, setsearch] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    setsearchItem(search);
  };

  return (
    <div className="mb-3">
      <nav className="navbar navbar-expand-lg bg-dark" data-bs-theme="dark">
        <div className="container-fluid">
          <NavLink className="navbar-brand" to="/">Movie-Miner</NavLink>
          <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
              <li className="nav-item">
                <NavLink
                  to="/"
                  className={({ isActive }) =>
                    'nav-link' + (isActive ? ' active' : '')
                  }
                >
                  Home
                </NavLink>
              </li>
              <li className="nav-item">
                <NavLink
                  to="/favs"
                  className={({ isActive }) =>
                    'nav-link' + (isActive ? ' active' : '')
                  }
                >
                  Favourite
                </NavLink>
              </li>
            </ul>
            <form className="d-flex" onSubmit={handleSubmit} role="search">
              <input
                className="form-control me-2"
                value={search}
                onChange={(e) => setsearch(e.target.value)}
                type="search"
                placeholder="Search"
                aria-label="Search"
              />
              <button className="btn btn-light" type="submit">
                Search
              </button>
            </form>
          </div>
        </div>
      </nav>
    </div>
  );
}

export default Navbar;
