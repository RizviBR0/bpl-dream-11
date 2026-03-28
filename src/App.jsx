import { Suspense, useState } from 'react'
import Banner from './components/Banner'
import Navbar from './components/Navbar'
import Players from './components/Players';
import { ToastContainer } from 'react-toastify';
import Footer from './components/Footer';

const fetchPlayers = async () => {
  const res = await fetch("data.json");
  return res.json();
}

function App() {
  const [coin, setCoin] = useState(5000);

  return (
    <>
      <div className='container mx-auto'>
        <Navbar coin={coin} />
        <Banner />

        <Suspense fallback={<div className="mx-auto mt-12 flex w-52 flex-col gap-4">
          <div className="skeleton h-32 w-full"></div>
          <div className="skeleton h-4 w-28"></div>
          <div className="skeleton h-4 w-full"></div>
          <div className="skeleton h-4 w-full"></div>
        </div>}>
          <Players playersPromise={fetchPlayers()} setCoin={setCoin} coin={coin} />
        </Suspense>
      </div>

      <Footer />

      <ToastContainer stacked />
    </>
  )
}

export default App