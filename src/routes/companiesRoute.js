import { useParams } from 'react-router-dom';
import Home from '../components/companyList';

function CompaniesRoute() {
  const { sector } = useParams();

  return (
    <section>
      <Home sector={sector} />
    </section>
  );
}

export default CompaniesRoute;
