const HomeCard = ({ today, total, type }) => {
  let bg = '';
  if (type === 'Deaths') bg = 'bg-red-200';
  if (type === 'Recovered') bg = 'bg-green-200';
  if (type === 'Confirmed') bg = 'bg-gray-200';

  return (
    <div
      className={`${bg} group h-64 px-4 py-2 flex flex-col justify-center 
      rounded-lg shadow-lg hover:shadow-xl`}
      style={{ width: '30%' }}
    >
      <div className="flex flex-col items-center tracking-wider text-center">
        <p className="md:text-3xl lg:text-4xl uppercase text-gray-800">
          New {type}
        </p>
        <p className="md:text-2xl lg:text-2xl text-gray-600 group-hover:text-6xl">
          {today}
        </p>
      </div>
      <div className="flex flex-col items-center mt-5 text-center">
        <p className="uppercase text-lg">Total {type}</p>
        <p className="text-gray-600">{total}</p>
      </div>
    </div>
  );
};

export default HomeCard;
