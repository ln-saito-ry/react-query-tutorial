import { useState } from 'react';
import Navbar from './components/Navbar';
import Planets from './components/Planets';
import People from './components/People';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';

function App() {
  const [page, setPage] = useState('planets');
  return (
    <>
      <div className="App">
        <h1>Star Wars Info</h1>
        <Navbar setPage={setPage} />
        <div className="content">
          {page === 'planets' ? <Planets /> : <People />}
        </div>
      </div>
      {/* queryの状態を確認可能なツール */}
      <ReactQueryDevtools />
    </>
  );
}

export default App;
