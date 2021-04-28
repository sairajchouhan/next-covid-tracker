import axios from 'axios';
import parseISO from 'date-fns/parseISO';
import format from 'date-fns/format';
import HomeCard from '../components/HomeCard';
import { GetServerSideProps, GetStaticProps } from 'next';

const Home = ({ data }) => {
  const { Global: global } = data;
  console.log(global);
  const parsed = parseISO(global.Date);
  const res = format(parsed, 'qo MMMM yyyy');

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
    </div>
  );
};

export const getServerSideProps: GetServerSideProps = async () => {
  const { data } = await axios.get('https://api.covid19api.com/summary');
  return {
    props: { data },
  };
};

export default Home;
