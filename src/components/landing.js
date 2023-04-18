import { NavLink, useLocation } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { useEffect } from 'react';
import PropTypes from 'prop-types';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGear, faChevronLeft } from '@fortawesome/free-solid-svg-icons';
import { fetchCompany } from '../API/dataAPI';
import style from '../styles/Company.module.css';

function Details({ symbol }) {
  const dispatch = useDispatch();
  const location = useLocation();
  const { sector } = location.state || {};
  const { company } = useSelector((state) => state.company);

  useEffect(() => {
    dispatch(fetchCompany(symbol));
  }, [dispatch, symbol]);

  if (!Object.keys(company).length) {
    return (
      <section className="animated">
        <header>
          <div>
            <NavLink to={`/sectors/${encodeURI(company)}`}>
              <FontAwesomeIcon icon={faChevronLeft} />
            </NavLink>
          </div>
          <div>
            <h1>
              Finance Details
            </h1>
          </div>
          <div><FontAwesomeIcon icon={faGear} /></div>
        </header>
      </section>
    );
  }
  const {
    companyWrapper, companyContainer, companyTitle, companyChanges, companyInfo, companyDescription,
  } = style;
  const {
    image, changes, companyName, price, currency, industry, description,
  } = company;
  return (
    <section className="animated">
      <header>
        <div>
          <NavLink to={`/sectors/${sector}`}>
            <FontAwesomeIcon icon={faChevronLeft} />
          </NavLink>
        </div>
        <div>Stock Screaner</div>
        <div><FontAwesomeIcon icon={faGear} /></div>
      </header>

      <div className={companyWrapper}>
        <div className={companyContainer}>
          <div>
            <img src={image} alt={company.symbol} />
          </div>
          <div>
            <div className={companyTitle}>{symbol}</div>
            <div className={companyChanges}>{changes}</div>
          </div>
        </div>
      </div>
      <h2>Company name</h2>
      <div className={companyInfo}>{companyName}</div>
      <h2>Stock price</h2>
      <div className={companyInfo}>{price}</div>
      <h2>Currency</h2>
      <div className={companyInfo}>{currency}</div>
      <h2>Industry</h2>
      <div className={companyInfo}>{industry}</div>
      <h2>Sector</h2>
      <div className={companyInfo}>{company.sector}</div>
      <h2>Description</h2>
      <p className={companyDescription}>{description}</p>
    </section>
  );
}

Details.propTypes = {
  symbol: PropTypes.string.isRequired,
};

export default Details;
