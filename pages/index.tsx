import { useState } from 'react';
import axios from 'axios';
import HomeCard from '../components/HomeCard';
import { GetServerSideProps } from 'next';

const Home = ({ data }) => {
  const [country, setCountry] = useState(data[0]);
  console.log(country);
  const handleCountryChange = (e) => {
    const found = data.filter((c) => c.slug === e.target.value);
    setCountry(found[0]);
  };

  return (
    <div className="mt-14">
      <h1 className="sm:text-5xl md:text-7xl lg:text-8xl text-center ">
        Todays {country.country} Covid Status
      </h1>
      <div className="flex justify-around w-ful mt-14 container w-5/6 mx-auto">
        <HomeCard
          type="Confirmed"
          today={country.newConfirmed}
          total={country.totalConfirmed}
        />
        <HomeCard
          type="Recovered"
          today={country.newRecovered}
          total={country.totalRecovered}
        />
        <HomeCard
          type="Deaths"
          today={country.newDeaths}
          total={country.totalDeaths}
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
          value={country.slug}
          onChange={handleCountryChange}
        >
          {data.map((c: any) => (
            <option value={c.slug} key={c.slug}>
              {c.country}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
};

export const getServerSideProps: GetServerSideProps = async () => {
  const { data } = await axios.get('https://api.covid19api.com/summary');
  const countries = data.Countries.map((c) => ({
    slug: c.Slug,
    country: c.Country,
    newConfirmed: c.NewConfirmed,
    newDeaths: c.NewDeaths,
    newRecovered: c.NewRecovered,
    totalConfirmed: c.TotalConfirmed,
    totalDeaths: c.TotalDeaths,
    totalRecovered: c.TotalRecovered,
  }));
  const global = {
    slug: 'global',
    country: 'Global',
    newConfirmed: data.Global.NewConfirmed,
    newDeaths: data.Global.NewDeaths,
    newRecovered: data.Global.NewRecovered,
    totalConfirmed: data.Global.TotalConfirmed,
    totalDeaths: data.Global.TotalDeaths,
    totalRecovered: data.Global.TotalRecovered,
  };
  countries.unshift(global);

  return {
    props: { data: countries },
  };
};

export default Home;
