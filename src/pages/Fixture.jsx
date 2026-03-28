import { useEffect, useState } from 'react';

const statusBadge = {
  completed: 'badge badge-success badge-sm text-white',
  live: 'badge badge-error badge-sm text-white animate-pulse',
  upcoming: 'badge badge-neutral badge-sm',
};

const teamAbbrev = {
  'Comilla Victorians': 'CV',
  'Rangpur Riders': 'RR',
  'Dhaka Capitals': 'DC',
  'Sylhet Strikers': 'SS',
  'Khulna Tigers': 'KT',
  'Fortune Barishal': 'FB',
  'Chattogram Challengers': 'CC',
};

const teamColor = {
  'Comilla Victorians': '#1B3C73',
  'Rangpur Riders': '#FF6B35',
  'Dhaka Capitals': '#DC143C',
  'Sylhet Strikers': '#228B22',
  'Khulna Tigers': '#FF8C00',
  'Fortune Barishal': '#800080',
  'Chattogram Challengers': '#008B8B',
};

export default function Fixture() {
  const [fixtures, setFixtures] = useState([]);
  const [filter, setFilter] = useState('all');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('/fixtures.json')
      .then((r) => r.json())
      .then((data) => {
        setFixtures(data);
        setLoading(false);
      });
  }, []);

  const league = fixtures.filter((f) => !f.playoff);
  const playoffs = fixtures.filter((f) => f.playoff);

  if (loading) {
    return (
      <div className="mt-12 space-y-4">
        {Array.from({ length: 5 }).map((_, i) => (
          <div key={i} className="skeleton h-24 w-full rounded-xl"></div>
        ))}
      </div>
    );
  }

  return (
    <div className="mt-12 mb-20">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-8">
        <div>
          <h1 className="text-3xl font-bold text-[#131313]">BPL 2024-25 Fixtures</h1>
          <p className="text-[#131313]/60 mt-1">Bangladesh Premier League — 11th Edition</p>
        </div>
        <div className="flex gap-2">
          {['all', 'league', 'playoffs'].map((f) => (
            <button
              key={f}
              onClick={() => setFilter(f)}
              className={`px-4 py-2 rounded-lg text-sm font-semibold capitalize cursor-pointer transition ${
                filter === f
                  ? 'bg-[#131313] text-white'
                  : 'border border-[#131313]/15 text-[#131313]/70 hover:border-[#131313]/40'
              }`}
            >
              {f}
            </button>
          ))}
        </div>
      </div>

      {filter !== 'playoffs' && filter !== 'league' && league.length > 0 && (
        <h2 className="text-lg font-bold text-[#131313]/60 uppercase tracking-wider mb-3">
          League Stage
        </h2>
      )}

      <div className="space-y-3">
        {(filter === 'all' ? league : filter === 'league' ? league : []).map((match) => (
          <MatchCard key={match.id} match={match} teamAbbrev={teamAbbrev} teamColor={teamColor} statusBadge={statusBadge} />
        ))}
      </div>

      {(filter === 'all' || filter === 'playoffs') && playoffs.length > 0 && (
        <>
          <h2 className="text-lg font-bold text-[#131313]/60 uppercase tracking-wider mt-10 mb-3">
            Playoffs
          </h2>
          <div className="space-y-3">
            {playoffs.map((match) => (
              <MatchCard key={match.id} match={match} teamAbbrev={teamAbbrev} teamColor={teamColor} statusBadge={statusBadge} />
            ))}
          </div>
        </>
      )}
    </div>
  );
}

function MatchCard({ match, teamAbbrev, teamColor, statusBadge }) {
  const isPlayoff = match.playoff;
  const homeAbbrev = teamAbbrev[match.home_team] || match.home_team.substring(0, 2).toUpperCase();
  const awayAbbrev = teamAbbrev[match.away_team] || match.away_team.substring(0, 2).toUpperCase();
  const homeColor = teamColor[match.home_team] || '#131313';
  const awayColor = teamColor[match.away_team] || '#131313';

  return (
    <div
      className={`border rounded-xl p-5 flex flex-col sm:flex-row sm:items-center gap-4 ${
        isPlayoff ? 'border-[#E7FE29] bg-[#E7FE29]/5' : 'border-[#131313]/10 bg-white'
      }`}
    >
      {isPlayoff && (
        <span className="text-xs font-bold text-[#131313]/50 uppercase tracking-widest">
          {match.playoff_round}
        </span>
      )}

      <div className="flex items-center gap-3 flex-1">
        <div
          className="w-10 h-10 rounded-full flex items-center justify-center text-white text-xs font-bold shrink-0"
          style={{ backgroundColor: homeColor }}
        >
          {homeAbbrev}
        </div>
        <div className="min-w-0">
          <p className="font-semibold text-[#131313] truncate">{match.home_team}</p>
          {match.status === 'completed' && (
            <p className="text-sm text-[#131313]/60">{match.home_score}</p>
          )}
        </div>
      </div>

      <div className="text-center shrink-0 px-2">
        <p className="text-xs text-[#131313]/50 font-medium">VS</p>
        <p className="text-xs text-[#131313]/50 mt-1">
          {new Date(match.date).toLocaleDateString('en-GB', {
            day: 'numeric',
            month: 'short',
          })}
        </p>
        <p className="text-xs text-[#131313]/40">{match.time} (BST)</p>
        <span className={`mt-1 inline-block ${statusBadge[match.status]}`}>{match.status}</span>
      </div>

      <div className="flex items-center gap-3 flex-1 flex-row-reverse sm:flex-row">
        <div
          className="w-10 h-10 rounded-full flex items-center justify-center text-white text-xs font-bold shrink-0"
          style={{ backgroundColor: awayColor }}
        >
          {awayAbbrev}
        </div>
        <div className="min-w-0 text-right sm:text-left">
          <p className="font-semibold text-[#131313] truncate">{match.away_team}</p>
          {match.status === 'completed' && (
            <p className="text-sm text-[#131313]/60">{match.away_score}</p>
          )}
        </div>
      </div>

      {match.status === 'completed' && (
        <div className="border-t sm:border-t-0 sm:border-l border-[#131313]/10 sm:pl-4 pt-3 sm:pt-0 shrink-0 max-w-xs sm:max-w-40">
          <p className="text-xs font-semibold text-[#131313]/80 leading-snug">{match.result}</p>
          {match.man_of_match && (
            <p className="text-xs text-[#131313]/50 mt-1">🏅 {match.man_of_match}</p>
          )}
        </div>
      )}
    </div>
  );
}
