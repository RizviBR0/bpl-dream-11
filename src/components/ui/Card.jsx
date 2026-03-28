import { FaUser } from 'react-icons/fa';
import { IoIosFlag } from 'react-icons/io';
import { toast } from 'react-toastify';
import { useTeam, ROLE_RULES } from '../../context/TeamContext';

const roleColors = {
  Batsman: 'bg-blue-50 text-blue-700',
  Bowler: 'bg-green-50 text-green-700',
  'All-rounder': 'bg-purple-50 text-purple-700',
  'Wicket-keeper': 'bg-amber-50 text-amber-700',
};

const Card = ({ player }) => {
  const { coin, addPlayer, removePlayer, isSelected, selectedPlayers, teamSize, getRoleCount } = useTeam();
  const selected = isSelected(player);

  const handleChoosePlayer = () => {
    if (selected) return;

    if (selectedPlayers.length >= teamSize) {
      toast.error(`Team is full! You can only select ${teamSize} players.`);
      return;
    }

    if (coin - player.price < 0) {
      toast.error('Not enough coins! 💸 Remove a player to free up budget.');
      return;
    }

    // Check role limit
    const roleRule = ROLE_RULES[player.role];
    if (roleRule && getRoleCount(player.role) >= roleRule.max) {
      toast.error(`You can have at most ${roleRule.max} ${player.role}${roleRule.max > 1 ? 's' : ''}.`);
      return;
    }

    addPlayer(player);
    toast.success(`${player.name} added to your team! 🏏`);
  };

  const handleRemove = () => {
    removePlayer(player);
    toast.info(`${player.name} removed from your team.`);
  };

  return (
    <div
      className={`rounded-lg overflow-hidden border p-5 space-y-4 transition ${selected ? 'border-[#E7FE29] bg-[#E7FE29]/5' : 'border-[#131313]/10'
        }`}
    >
      <div className="relative">
        <img
          className="w-full h-52 sm:h-60 object-cover object-center rounded-md bg-gray-200/40"
          src={player.image}
          alt={player.name}
        />
        {selected && (
          <div className="absolute top-2 right-2 bg-[#E7FE29] text-[#131313] text-xs font-bold px-2 py-1 rounded-full">
            ✓ In Team
          </div>
        )}
        <div
          className="absolute bottom-2 left-2 text-white text-xs font-bold px-2 py-1 rounded-full"
          style={{ backgroundColor: player.teamColor || '#131313' }}
        >
          {player.team}
        </div>
      </div>

      <div className="space-y-4">
        <h3 className="text-xl font-semibold flex gap-2 items-center">
          <FaUser className="text-lg text-[#131313]/50 shrink-0" />
          {player.name}
        </h3>

        <div className="flex justify-between items-center">
          <p className="text-[#131313]/50 flex items-center gap-1">
            <IoIosFlag className="text-2xl" />
            {player.country}
          </p>
          <p className={`text-sm px-2.5 py-1.5 rounded-md font-medium ${roleColors[player.role] || 'bg-[#131313]/5 text-[#131313]'}`}>
            {player['player type']}
          </p>
        </div>

        <hr className="border-[#131313]/10" />

        <div className="flex justify-between items-center">
          <p className="text-[#131313] font-semibold">Rating</p>
          <p className="text-[#131313]/70 text-sm">{player.rating}</p>
        </div>

        <div className="flex justify-between items-center">
          <p className="text-[#131313] font-semibold">Batting</p>
          <p className="text-[#131313]/70 text-sm">{player['batting style']}</p>
        </div>

        <div className="flex justify-between items-center">
          <p className="text-[#131313] font-semibold">Bowling</p>
          <p className="text-[#131313]/70 text-sm">{player['bowling style']}</p>
        </div>

        <div className="flex justify-between items-center">
          <p className="text-[#131313] font-bold text-2xl">
            🪙 {player.price.toLocaleString()}
          </p>
          {selected ? (
            <button
              className="btn btn-sm btn-error text-white"
              onClick={handleRemove}
            >
              Remove
            </button>
          ) : (
            <button
              className="btn btn-neutral btn-sm text-sm"
              onClick={handleChoosePlayer}
              disabled={coin < player.price && !selected}
            >
              Choose Player
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default Card;