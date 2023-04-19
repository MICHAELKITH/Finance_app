import { useState, useEffect, useRef } from 'react';
import { PropTypes } from 'prop-types';
import { Link, NavLink } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faGear,
  faChevronLeft,
  faArrowRight,
  faSpinner,
  faMagnifyingGlass,
} from '@fortawesome/free-solid-svg-icons';
import { useDispatch, useSelector } from 'react-redux';
// import { setFilter } from '../redux/companies/companiesSlice';
import fetchCompanies from '../API/dataAPI';
import style from '../styles/Companies.module.css';
import ICONS from '../assets/iconData';

function Companies({ sector }) {
  const [filter, setFilterState] = useState('');
  const { companies } = useSelector((state) => state.companies);
  const dispatch = useDispatch();
  const filterRef = useRef();
  const { companiesHeaderContainer, companiesSearch, companiesContainer } = style;

  useEffect(() => {
    dispatch(fetchCompanies(sector));
  }, [dispatch, sector]);

  const setFilterField = (e) => {
    if (e.key === 'Enter') setFilterState(e.target.value);
  };

  const setFilterFieldOnClick = () => {
    setFilterState(filterRef.current.value);
  };

  if (!companies.length) {
    return (
      <section className="animated">
        <header>
          <div>
            <NavLink to="/">
              <FontAwesomeIcon icon={faChevronLeft} />
            </NavLink>
          </div>
          <div>Loading ...  </div>
          <div><FontAwesomeIcon icon={faGear} /></div>
        </header>
        <div className={companiesHeaderContainer}>
          <FontAwesomeIcon icon={ICONS[sector]} />
          <div>{sector}</div>
        </div>
        <div className="loading">
          <span>Loading</span>
          <FontAwesomeIcon icon={faSpinner} />
        </div>
      </section>
    );
  }

  return (
    <section className="animated">
      <header>
        <div>
          <NavLink to="/">
            <FontAwesomeIcon icon={faChevronLeft} />
          </NavLink>
        </div>
        <div>Finance APP . LIST </div>
        <div><FontAwesomeIcon icon={faGear} /></div>
      </header>
      <div className={companiesHeaderContainer}>
        <FontAwesomeIcon icon={ICONS[sector]} />
        <div>{sector}</div>
      </div>

      <section className={companiesSearch}>
        <FontAwesomeIcon icon={faMagnifyingGlass} />
        <input ref={filterRef} type="text" placeholder="search" onKeyDown={setFilterField} />
        <button type="button" onClick={setFilterFieldOnClick}>search</button>
      </section>

      <section className={companiesContainer}>
        {
          companies
            .filter((company) => company.companyName.toLowerCase().includes(filter.toLowerCase())
              || company.symbol.toLowerCase().includes(filter.toLowerCase()))
            .map((company) => {
              const url = encodeURI(`/company/${company.symbol}`);
              return (
                <Link
                  to={{ pathname: url, state: { sector } }}
                  key={company.symbol}
                  className="animated"
                >
                  <div className={style.symbol}>{company.symbol}</div>
                  <div className={style.info}>
                    <div>{company.companyName}</div>
                    <div>{company.price}</div>
                  </div>
                  <div className={style.arrowRight}>
                    <FontAwesomeIcon icon={faArrowRight} />
                  </div>

                </Link>
              );
            })
        }
      </section>
    </section>
  );
}

Companies.propTypes = {
  sector: PropTypes.string.isRequired,
};

export default Companies;
