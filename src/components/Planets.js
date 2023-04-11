import React from 'react';
import { useQuery } from '@tanstack/react-query';
import Planet from './Planet';

const fetchPlanets = async () => {
  const res = await fetch('http://swapi.dev/api/planets/');
  return res.json();
};

const Planets = () => {
  // 第二引数は基本的にasyncにすべき？asyncじゃなくてもOKf
  const { isLoading, error, data, status } = useQuery(
    ['planets'],
    fetchPlanets,
    {
      staleTime: 0,
      cacheTime: 1000,
      // status === successとなった際に実行される
      onSuccess: () => console.log('data fetched'),
      // status === errorとなった際に実行される
      onError: () => console.error('data fetch faild'),
    }
  );
  console.log(data);
  return (
    <div>
      <h2>Planets</h2>
      {/* <p>{status}</p> */}
      {status === 'loading' && <div>Loading data...</div>}
      {status === 'error' && <div>Error fetching data</div>}
      {status === 'success' && (
        <div>
          {data.results.map((planet) => (
            <Planet key={planet.name} planet={planet} />
          ))}
        </div>
      )}
    </div>
  );
};

export default Planets;
