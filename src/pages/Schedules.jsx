import { useEffect, useState } from 'react';

const teamColor = {
  'Comilla Victorians': '#1B3C73',
  'Rangpur Riders': '#FF6B35',
  'Dhaka Capitals': '#DC143C',
  'Sylhet Strikers': '#228B22',
  'Khulna Tigers': '#FF8C00',
  'Fortune Barishal': '#800080',
  'Chattogram Challengers': '#008B8B',
};

const venues = [
  'Shere Bangla National Stadium, Dhaka',
  'Zahur Ahmed Chowdhury Stadium, Chattogram',
  'Sylhet International Cricket Stadium',
];

export default function Schedules() {
  const [fixtures, setFixtures] = useState([]);
  const [loading, setLoading] = useState(true);
  const [venueFilter, setVenueFilter] = useState('all');

  useEffect(() => {
    fetch('/fixtures.json')
      .then((r) => r.json())
      .then((data) => {
        setFixtures(data);
        setLoading(false);
      });
  }, []);

  const filtered =
    venueFilter === 'all'
      ? fixtures
      : fixtures.filter((f) => f.venue === venueFilter);

  // Group by date
  const byDate = filtered.reduce((acc, match) => {
    const key = match.date;
    if (!acc[key]) acc[key] = [];
    acc[key].push(match);
    return acc;
  }, {});

  const sortedDates = Object.keys(byDate).sort();

  const completedCount = fixtures.filter((f) => f.status === 'completed').length;
  const liveCount = fixtures.filter((f) => f.status === 'live').length;
  const upcomingCount = fixtures.filter((f) => f.status === 'upcoming').length;

  if (loading) {
    return (
      <div className="mt-12 space-y-6">
        {Array.from({ length: 4 }).map((_, i) => (
          <div key={i}>
            <div className="skeleton h-5 w-32 mb-3 rounded"></div>
            <div className="space-y-2">
              {Array.from({ length: 2 }).map((_, j) => (
                <div key={j} className="skeleton h-20 w-full rounded-xl"></div>
              ))}
            </div>
          </div>
        ))}
      </div>
    );
  }

  return (
    <div className="mt-12 mb-20">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-8">
        <div>
          <h1 className="text-3xl font-bold text-[#131313]">BPL 2024-25 Schedule</h1>
          <p className="text-[#131313]/60 mt-1">30 Jan – 19 Feb 2025</p>
        </div>

        {/* Stats */}
        <div className="flex gap-3 text-sm">
          <div className="text-center px-3 py-2 rounded-lg bg-green-50 border border-green-200">
            <p className="font-bold text-green-700">{completedCount}</p>
            <p className="text-green-600 text-xs">Done</p>
          </div>
          <div className="text-center px-3 py-2 rounded-lg bg-red-50 border border-red-200">
            <p className="font-bold text-red-600">{liveCount}</p>
            <p className="text-red-500 text-xs">Live</p>
          </div>
          <div className="text-center px-3 py-2 rounded-lg bg-gray-50 border border-gray-200">
            <p className="font-bold text-gray-600">{upcomingCount}</p>
            <p className="text-gray-500 text-xs">Upcoming</p>
          </div>
        </div>
      </div>

      {/* Venue Filter */}
      <div className="flex flex-wrap gap-2 mb-6">
        <button
          onClick={() => setVenueFilter('all')}
          className={`px-3 py-1.5 rounded-lg text-sm font-semibold cursor-pointer transition ${
            venueFilter === 'all'
              ? 'bg-[#131313] text-white'
              : 'border border-[#131313]/15 text-[#131313]/70 hover:border-[#131313]/40'
          }`}
        >
          All Venues
        </button>
        {venues.map((v) => (
          <button
            key={v}
            onClick={() => setVenueFilter(v)}
            className={`px-3 py-1.5 rounded-lg text-sm font-semibold cursor-pointer transition ${
              venueFilter === v
                ? 'bg-[#131313] text-white'
                : 'border border-[#131313]/15 text-[#131313]/70 hover:border-[#131313]/40'
            }`}
          >
            {v.split(',')[0]}
          </button>
        ))}
      </div>

      {sortedDates.length === 0 && (
        <p className="text-center text-[#131313]/50 py-16 text-lg">No matches at this venue.</p>
      )}

      {/* Schedule by date */}
      <div className="space-y-8">
        {sortedDates.map((date) => (
          <div key={date}>
            <h2 className="text-sm font-bold text-[#131313]/50 uppercase tracking-widest mb-3">
              {new Date(date).toLocaleDateString('en-GB', {
                weekday: 'long',
                day: 'numeric',
                month: 'long',
                year: 'numeric',
              })}
            </h2>

            <div className="space-y-2">
              {byDate[date].map((match) => (
                <div
                  key={match.id}
                  className={`rounded-xl border p-4 flex flex-col sm:flex-row sm:items-center gap-3 ${
                    match.playoff
                      ? 'border-[#E7FE29] bg-[#E7FE29]/5'
                      : 'border-[#131313]/10 bg-white'
                  }`}
                >
                  <div className="flex items-center gap-2 text-xs text-[#131313]/50 shrink-0 w-24">
                    <span>{match.time}</span>
                    <span>BST</span>
                  </div>

                  <div className="flex items-center gap-3 flex-1">
                    <TeamBadge name={match.home_team} color={teamColor[match.home_team]} />
                    <span className="text-xs text-[#131313]/40 font-bold">vs</span>
                    <TeamBadge name={match.away_team} color={teamColor[match.away_team]} />
                  </div>

                  <div className="text-xs text-[#131313]/50 shrink-0 truncate max-w-48">
                    🏟 {match.venue.split(',')[0]}
                  </div>

                  <div className="shrink-0 text-right">
                    {match.status === 'completed' ? (
                      <div>
                        <p className="text-xs font-semibold text-[#131313] leading-snug max-w-44">
                          {match.result}
                        </p>
                        {match.man_of_match && (
                          <p className="text-xs text-[#131313]/50 mt-0.5">
                            🏅 {match.man_of_match}
                          </p>
                        )}
                      </div>
                    ) : match.status === 'live' ? (
                      <span className="badge badge-error text-white badge-sm animate-pulse">
                        LIVE
                      </span>
                    ) : (
                      <span className="badge badge-neutral badge-sm">Upcoming</span>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function TeamBadge({ name, color }) {
  const short = name && name.trim() ? name.substring(0, 2).toUpperCase() : '??';
  return (
    <div className="flex items-center gap-1.5">
      <span
        className="w-5 h-5 rounded-full flex items-center justify-center text-white text-[9px] font-bold shrink-0"
        style={{ backgroundColor: color || '#131313' }}
      >
        {short}
      </span>
      <span className="text-sm font-medium text-[#131313] truncate">{name}</span>
    </div>
  );
}
