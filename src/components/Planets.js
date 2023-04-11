import React, { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import Planet from './Planet';

const fetchPlanets = async (page) => {
  const res = await fetch(`http://swapi.dev/api/planets/?page=${page}`);
  return res.json();
};

const Planets = () => {
  const [page, setPage] = useState(1);

  // 第二引数は基本的にasyncにすべき？asyncじゃなくてもOK
  const { isLoading, error, data, status } = useQuery(
    ['planets', page],
    // 引数を渡す場合はwrapするかbindを使う
    () => fetchPlanets(page),
    {
      staleTime: 1000,
      cacheTime: 100000,
      // status === successとなった際に実行される
      onSuccess: () => console.log('data fetched'),
      // status === errorとなった際に実行される
      onError: () => console.error('data fetch faild'),
    }
  );

  return (
    <div>
      <h2>Planets</h2>

      <button onClick={() => setPage(1)}>page 1</button>
      <button onClick={() => setPage(2)}>page 2</button>
      <button onClick={() => setPage(3)}>page 3</button>

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
