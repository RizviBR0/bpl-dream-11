import { useEffect, useState } from 'react';

export default function Teams() {
  const [teams, setTeams] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selected, setSelected] = useState(null);

  useEffect(() => {
    fetch('/teams.json')
      .then((r) => r.json())
      .then((data) => {
        setTeams(data.sort((a, b) => a.standing - b.standing));
        setLoading(false);
      });
  }, []);

  if (loading) {
    return (
      <div className="mt-12 grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
        {Array.from({ length: 7 }).map((_, i) => (
          <div key={i} className="skeleton h-48 w-full rounded-xl"></div>
        ))}
      </div>
    );
  }

  return (
    <div className="mt-12 mb-20">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-[#131313]">BPL 2024-25 Teams</h1>
        <p className="text-[#131313]/60 mt-1">All 7 franchises — Bangladesh Premier League</p>
      </div>

      {/* Points Table */}
      <div className="mb-10 overflow-x-auto rounded-xl border border-[#131313]/10">
        <table className="w-full text-sm">
          <thead>
            <tr className="bg-[#131313] text-white">
              <th className="px-4 py-3 text-left">#</th>
              <th className="px-4 py-3 text-left">Team</th>
              <th className="px-4 py-3 text-center">P</th>
              <th className="px-4 py-3 text-center">W</th>
              <th className="px-4 py-3 text-center">L</th>
              <th className="px-4 py-3 text-center">NRR</th>
              <th className="px-4 py-3 text-center font-bold">Pts</th>
            </tr>
          </thead>
          <tbody>
            {teams.map((team, idx) => (
              <tr
                key={team.id}
                onClick={() => setSelected(selected?.id === team.id ? null : team)}
                className={`border-t border-[#131313]/5 cursor-pointer transition hover:bg-[#131313]/5 ${
                  idx < 4 ? 'bg-green-50/30' : 'bg-white'
                }`}
              >
                <td className="px-4 py-3 font-semibold text-[#131313]/60">{team.standing}</td>
                <td className="px-4 py-3">
                  <div className="flex items-center gap-2">
                    <span
                      className="w-3 h-3 rounded-full shrink-0"
                      style={{ backgroundColor: team.color }}
                    ></span>
                    <span className="font-semibold text-[#131313]">{team.name}</span>
                    {idx === 0 && <span className="text-xs">🏆</span>}
                    {idx < 4 && idx > 0 && (
                      <span className="text-[10px] bg-green-100 text-green-700 px-1.5 py-0.5 rounded font-semibold">
                        Playoffs
                      </span>
                    )}
                  </div>
                </td>
                <td className="px-4 py-3 text-center text-[#131313]/70">{team.played}</td>
                <td className="px-4 py-3 text-center text-green-600 font-semibold">{team.won}</td>
                <td className="px-4 py-3 text-center text-red-500 font-semibold">{team.lost}</td>
                <td className="px-4 py-3 text-center text-[#131313]/70">{team.nrr}</td>
                <td className="px-4 py-3 text-center font-bold text-[#131313]">{team.points}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Team Cards */}
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
        {teams.map((team) => (
          <div
            key={team.id}
            onClick={() => setSelected(selected?.id === team.id ? null : team)}
            className={`rounded-xl border-2 p-5 cursor-pointer transition hover:shadow-md space-y-3 ${
              selected?.id === team.id ? 'shadow-lg scale-[1.02]' : ''
            }`}
            style={{
              borderColor: selected?.id === team.id ? team.color : '#13131310',
              background:
                selected?.id === team.id ? `${team.color}10` : 'white',
            }}
          >
            <div className="flex items-center gap-3">
              <div
                className="w-12 h-12 rounded-full flex items-center justify-center text-white font-bold text-sm shrink-0"
                style={{ backgroundColor: team.color }}
              >
                {team.shortName}
              </div>
              <div>
                <h3 className="font-bold text-[#131313] leading-tight">{team.name}</h3>
                <p className="text-xs text-[#131313]/50">Est. {team.founded}</p>
              </div>
            </div>

            <div className="flex gap-2 text-xs">
              <span className="bg-[#E7FE29] text-[#131313] px-2 py-0.5 rounded font-bold">
                🏆 {team.titles} titles
              </span>
              <span className="bg-[#131313]/5 text-[#131313]/70 px-2 py-0.5 rounded">
                #{team.standing} this season
              </span>
            </div>

            <p className="text-xs text-[#131313]/60 leading-snug">{team.description}</p>

            <div className="text-xs text-[#131313]/50 flex items-start gap-1">
              <span>🏟</span>
              <span>{team.home_ground}</span>
            </div>

            <div className="flex items-center gap-2 pt-1 border-t border-[#131313]/5">
              <span className="text-xs text-[#131313]/50">Captain:</span>
              <span className="text-xs font-semibold text-[#131313]">{team.captain}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
