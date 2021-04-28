import axios from 'axios';
import parseISO from 'date-fns/parseISO';
import format from 'date-fns/format';
import HomeCard from '../components/HomeCard';
import { GetServerSideProps, GetStaticProps } from 'next';

const Home = ({ data, countries }) => {
  const { Global: global } = data;
  console.log(countries);

  return (
    <div className="">
      <h1 className="sm:text-5xl md:text-7xl lg:text-8xl text-center">
        Todays Global Covid Status
      </h1>
      <div className="flex justify-around w-ful mt-10 container w-5/6 mx-auto">
        <HomeCard
          type="Confirmed"
          today={global.NewConfirmed}
          total={global.TotalConfirmed}
        />
        <HomeCard
          type="Recovered"
          today={global.NewRecovered}
          total={global.TotalRecovered}
        />
        <HomeCard
          type="Deaths"
          today={global.NewDeaths}
          total={global.TotalDeaths}
        />
      </div>
      <div className="container w-5/6 mx-auto text-center my-3 mt-20">
        <p className="mb-2 text-gray-900">Select a Country</p>

        <select
          name="Country"
          id="country"
          placeholder="Choose a country"
          className="w-80 rounded-md h-9 px-1 
          border border-gray-400
          focus:ring-2 focus:ring-blue-600 focus:outline-none
          shadow-lg
          "
        >
          <option value="">Global</option>
          {countries.map((c: any) => (
            <option value={c.Slug} key={c.Slug}>
              {c.Country}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
};

export const getServerSideProps: GetServerSideProps = async () => {
  const { data } = await axios.get('https://api.covid19api.com/summary');
  const { data: countries } = await axios.get(
    'https://api.covid19api.com/countries'
  );

  return {
    props: { data, countries },
  };
};

export default Home;
