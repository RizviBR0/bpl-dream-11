import { Suspense } from 'react';
import Banner from '../components/Banner';
import Players from '../components/Players';

const fetchPlayers = () => fetch('/data.json').then((r) => r.json());

const SkeletonGrid = () => (
  <div className="grid lg:grid-cols-3 sm:grid-cols-2 grid-cols-1 gap-5 mt-6">
    {Array.from({ length: 6 }).map((_, i) => (
      <div key={i} className="rounded-lg border border-[#131313]/10 p-5 space-y-4">
        <div className="skeleton h-60 w-full rounded-md"></div>
        <div className="skeleton h-5 w-40"></div>
        <div className="skeleton h-4 w-full"></div>
        <div className="skeleton h-4 w-full"></div>
        <div className="skeleton h-4 w-3/4"></div>
      </div>
    ))}
  </div>
);

export default function Home() {
  return (
    <>
      <Banner />
      <Suspense fallback={<SkeletonGrid />}>
        <Players playersPromise={fetchPlayers()} />
      </Suspense>
    </>
  );
}
