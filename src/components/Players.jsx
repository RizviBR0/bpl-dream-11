import { use, useState } from "react";
import AvailablePlayer from "./AvailablePlayer";
import SelectedPlayer from "./SelectedPlayer";
import { useTeam, ROLE_RULES } from "../context/TeamContext";
import { FiSettings } from "react-icons/fi";

const ROLES = ['All', 'Batsman', 'Bowler', 'All-rounder', 'Wicket-keeper'];
const TEAMS = [
  'All',
  'Comilla Victorians',
  'Rangpur Riders',
  'Dhaka Capitals',
  'Sylhet Strikers',
  'Khulna Tigers',
  'Fortune Barishal',
  'Chattogram Challengers',
];

const Players = ({ playersPromise }) => {
  const players = use(playersPromise);
  const { selectedPlayers, teamSize, setTeamSize, getCompositionWarnings } = useTeam();
  const [activeTab, setActiveTab] = useState("available");
  const [searchQuery, setSearchQuery] = useState("");
  const [roleFilter, setRoleFilter] = useState("All");
  const [teamFilter, setTeamFilter] = useState("All");
  const [sortBy, setSortBy] = useState("default");
  const [showSettings, setShowSettings] = useState(false);

  const active = 'font-bold bg-[#E7FE29] text-[#131313]';
  const inActive = 'font-normal bg-transparent text-[#131313]/70';

  const filtered = players
    .filter((p) => {
      const matchesSearch = p.name.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesRole = roleFilter === 'All' || p.role === roleFilter;
      const matchesTeam = teamFilter === 'All' || p.team === teamFilter;
      return matchesSearch && matchesRole && matchesTeam;
    })
    .sort((a, b) => {
      if (sortBy === 'price_asc') return a.price - b.price;
      if (sortBy === 'price_desc') return b.price - a.price;
      if (sortBy === 'rating') return parseInt(b.rating) - parseInt(a.rating);
      return 0;
    });

  const warnings = getCompositionWarnings();

  return (
    <>
      {/* Header row */}
      <div className="flex justify-between items-center mt-12 flex-wrap gap-3">
        <p className="font-bold text-2xl">
          {activeTab === "available" ? "Available Players" : "Selected Players"}
        </p>

        <div className="flex items-center gap-3 flex-wrap">
          {/* Settings toggle */}
          <button
            onClick={() => setShowSettings(!showSettings)}
            className="p-2.5 border border-[#131313]/10 rounded-lg hover:bg-[#131313]/5 transition cursor-pointer"
            title="Team Settings"
          >
            <FiSettings className="text-xl text-[#131313]/60" />
          </button>

          {/* Tab toggle */}
          <div className="border border-[#131313]/10 rounded-lg">
            <button
              className={`px-4 py-2.5 ${activeTab === "available" ? active : inActive} cursor-pointer`}
              onClick={() => setActiveTab("available")}
            >
              Available
            </button>
            <button
              className={`px-4 py-2.5 ${activeTab === "selected" ? active : inActive} cursor-pointer`}
              onClick={() => setActiveTab("selected")}
            >
              Selected (<span>{selectedPlayers.length}</span>/{teamSize})
            </button>
          </div>
        </div>
      </div>

      {/* Settings panel */}
      {showSettings && (
        <div className="mt-4 p-5 border border-[#131313]/10 rounded-xl bg-[#131313]/2 space-y-4">
          <h3 className="font-bold text-lg text-[#131313]">Team Settings</h3>

          <div className="flex flex-col sm:flex-row sm:items-center gap-4">
            <div className="flex-1">
              <label className="text-sm font-semibold text-[#131313] block mb-1">
                Team Size: <span className="text-[#E7FE29] bg-[#131313] px-2 py-0.5 rounded font-bold">{teamSize}</span>
              </label>
              <input
                type="range"
                min={7}
                max={15}
                value={teamSize}
                onChange={(e) => setTeamSize(Number(e.target.value))}
                className="range range-xs w-full max-w-xs"
              />
              <div className="flex justify-between text-xs text-[#131313]/40 max-w-xs mt-1">
                <span>7</span><span>11</span><span>15</span>
              </div>
            </div>

            <div className="text-sm text-[#131313]/60 max-w-xs">
              <p className="font-semibold text-[#131313] mb-1">Role requirements:</p>
              {Object.entries(ROLE_RULES).map(([role, { min, max }]) => (
                <p key={role}>
                  • {role}: min {min}, max {max}
                </p>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Composition warnings */}
      {activeTab === "selected" && warnings.length > 0 && (
        <div className="mt-4 p-4 border border-amber-200 bg-amber-50 rounded-xl">
          <p className="font-semibold text-amber-700 text-sm mb-1">⚠️ Team incomplete:</p>
          <ul className="list-disc list-inside text-amber-600 text-sm space-y-0.5">
            {warnings.map((w, i) => <li key={i}>{w}</li>)}
          </ul>
        </div>
      )}

      {/* Filters — only show on available tab */}
      {activeTab === "available" && (
        <div className="mt-5 flex flex-wrap gap-3 items-center">
          {/* Search */}
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search players…"
            className="border border-[#131313]/15 rounded-lg px-4 py-2.5 text-sm outline-none focus:border-[#131313]/40 w-48"
          />

          {/* Role filter */}
          <select
            value={roleFilter}
            onChange={(e) => setRoleFilter(e.target.value)}
            className="border border-[#131313]/15 rounded-lg px-3 py-2.5 text-sm outline-none focus:border-[#131313]/40 bg-white"
          >
            {ROLES.map((r) => <option key={r} value={r}>{r}</option>)}
          </select>

          {/* Team filter */}
          <select
            value={teamFilter}
            onChange={(e) => setTeamFilter(e.target.value)}
            className="border border-[#131313]/15 rounded-lg px-3 py-2.5 text-sm outline-none focus:border-[#131313]/40 bg-white"
          >
            {TEAMS.map((t) => <option key={t} value={t}>{t === 'All' ? 'All Teams' : t}</option>)}
          </select>

          {/* Sort */}
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            className="border border-[#131313]/15 rounded-lg px-3 py-2.5 text-sm outline-none focus:border-[#131313]/40 bg-white"
          >
            <option value="default">Default</option>
            <option value="price_desc">Price: High → Low</option>
            <option value="price_asc">Price: Low → High</option>
            <option value="rating">Top Rated</option>
          </select>

          {/* Clear filters */}
          {(searchQuery || roleFilter !== 'All' || teamFilter !== 'All' || sortBy !== 'default') && (
            <button
              onClick={() => { setSearchQuery(''); setRoleFilter('All'); setTeamFilter('All'); setSortBy('default'); }}
              className="text-sm text-red-500 font-semibold hover:underline cursor-pointer"
            >
              Clear filters
            </button>
          )}
        </div>
      )}

      {/* Content */}
      {activeTab === "available" ? (
        <AvailablePlayer players={filtered} />
      ) : (
        <SelectedPlayer setActiveTab={setActiveTab} />
      )}
    </>
  );
};

export default Players;