import { useState } from 'react';
import { MdOutlineDelete } from "react-icons/md";
import { doc, setDoc } from 'firebase/firestore';
import { db } from '../firebase';
import { useAuth } from '../context/AuthContext';
import { useTeam, ROLE_RULES, INITIAL_COINS } from '../context/TeamContext';
import { toast } from 'react-toastify';
import Button from "./ui/Button";

const roleColors = {
  Batsman: 'bg-blue-50 text-blue-700 border-blue-200',
  Bowler: 'bg-green-50 text-green-700 border-green-200',
  'All-rounder': 'bg-purple-50 text-purple-700 border-purple-200',
  'Wicket-keeper': 'bg-amber-50 text-amber-700 border-amber-200',
};

const SelectedPlayer = ({ setActiveTab }) => {
  const { user } = useAuth();
  const { selectedPlayers, removePlayer, coin, resetTeam, teamSize, canConfirm, getCompositionWarnings, getRoleCount } = useTeam();
  const [confirmOpen, setConfirmOpen] = useState(false);
  const [saving, setSaving] = useState(false);

  const handleDelete = (player) => {
    removePlayer(player);
    toast.info(`${player.name} removed.`);
  };

  const handleConfirm = async () => {
    if (!canConfirm()) {
      toast.error('Your team is not ready yet. Check the requirements.');
      return;
    }
    setSaving(true);
    try {
      await setDoc(doc(db, 'teams', user.uid), {
        players: selectedPlayers,
        coinsSpent: INITIAL_COINS - coin,
        savedAt: new Date().toISOString(),
        uid: user.uid,
        displayName: user.displayName || user.email,
      });
      toast.success('🏆 Dream team saved! Good luck!');
      setConfirmOpen(false);
    } catch {
      toast.error('Failed to save team. Please try again.');
    } finally {
      setSaving(false);
    }
  };

  const handleReset = () => {
    resetTeam();
    toast.info('Team reset. Start fresh!');
  };

  if (selectedPlayers.length === 0) {
    return (
      <div className="text-center py-10 space-y-3 mt-6">
        <p className="text-2xl font-semibold text-[#131313]/60">No players selected yet.</p>
        <p className="text-[#131313]/60">Go to available players to build your team!</p>
        <Button value="Browse Players" onSelect={() => setActiveTab("available")} />
      </div>
    );
  }

  const warnings = getCompositionWarnings();
  const coinsSpent = INITIAL_COINS - coin;

  return (
    <>
      {/* Summary strip */}
      <div className="mt-6 p-4 rounded-xl bg-[#131313] text-white flex flex-wrap gap-4 justify-between items-center">
        <div className="flex gap-6 flex-wrap">
          <div className="text-center">
            <p className="text-2xl font-bold">{selectedPlayers.length}/{teamSize}</p>
            <p className="text-xs text-white/60">Players</p>
          </div>
          <div className="text-center">
            <p className="text-2xl font-bold">{coin.toLocaleString()}</p>
            <p className="text-xs text-white/60">Coins Left</p>
          </div>
          <div className="text-center">
            <p className="text-2xl font-bold">{coinsSpent.toLocaleString()}</p>
            <p className="text-xs text-white/60">Coins Spent</p>
          </div>
        </div>

        {/* Role breakdown */}
        <div className="flex gap-3 flex-wrap">
          {Object.keys(ROLE_RULES).map((role) => {
            const count = getRoleCount(role);
            const { min } = ROLE_RULES[role];
            return (
              <div key={role} className={`text-center px-2 py-1 rounded-lg border text-xs ${count >= min ? 'border-green-400 bg-green-400/10' : 'border-red-400 bg-red-400/10'}`}>
                <p className="font-bold">{count}</p>
                <p className="text-white/60 capitalize leading-tight">
                  {role === 'Wicket-keeper' ? 'WK' : role.split('-')[0].substring(0, 3)}
                </p>
              </div>
            );
          })}
        </div>
      </div>

      {/* Player list */}
      <ul className="mt-4 flex flex-col gap-3">
        {selectedPlayers.map((player) => (
          <li
            key={player.id}
            className="border border-[#131313]/10 rounded-lg p-4 flex items-center gap-4"
          >
            <img
              className="w-16 h-16 rounded-lg bg-[#D9D9D9] object-cover object-top shrink-0"
              src={player.image}
              alt={player.name}
            />

            <div className="flex-1 min-w-0">
              <h3 className="font-semibold text-lg text-[#131313] truncate">{player.name}</h3>
              <div className="flex items-center gap-2 mt-1 flex-wrap">
                <span
                  className={`text-xs px-2 py-0.5 rounded border font-medium ${roleColors[player.role] || 'bg-gray-50 text-gray-700 border-gray-200'}`}
                >
                  {player['player type']}
                </span>
                <span className="text-xs text-[#131313]/50">{player.team}</span>
              </div>
            </div>

            <div className="shrink-0 text-right">
              <p className="font-bold text-[#131313]">🪙 {player.price.toLocaleString()}</p>
            </div>

            <button
              className="rounded-full p-2.5 border border-[#131313]/10 hover:bg-red-50 hover:border-red-200 flex justify-center items-center cursor-pointer duration-100 shrink-0"
              onClick={() => handleDelete(player)}
              aria-label={`Remove ${player.name}`}
            >
              <MdOutlineDelete className="text-2xl text-red-400 pointer-events-none" />
            </button>
          </li>
        ))}
      </ul>

      {/* Actions */}
      <div className="mt-6 flex flex-wrap gap-3 items-center justify-between">
        <div className="flex gap-3 flex-wrap">
          <Button value="Add Players" onSelect={() => setActiveTab("available")} />
          <button
            onClick={handleReset}
            className="px-4 py-2 border border-red-200 text-red-500 font-semibold rounded-lg hover:bg-red-50 transition text-sm cursor-pointer"
          >
            Reset Team
          </button>
        </div>

        <button
          onClick={() => setConfirmOpen(true)}
          disabled={!canConfirm()}
          className={`px-6 py-3 rounded-xl font-bold transition text-sm ${
            canConfirm()
              ? 'bg-[#131313] text-white hover:bg-[#131313]/80 cursor-pointer'
              : 'bg-[#131313]/20 text-[#131313]/40 cursor-not-allowed'
          }`}
        >
          {(() => {
            const remaining = teamSize - selectedPlayers.length;
            return canConfirm() ? '🏆 Confirm Dream Team' : `Need ${remaining} more player${remaining !== 1 ? 's' : ''}`;
          })()}
        </button>
      </div>

      {warnings.length > 0 && (
        <div className="mt-3 text-sm text-amber-600 space-y-0.5">
          {warnings.map((w, i) => <p key={i}>⚠️ {w}</p>)}
        </div>
      )}

      {/* Confirm modal */}
      {confirmOpen && (
        <dialog open className="modal modal-open">
          <div className="modal-box max-w-lg">
            <h3 className="font-bold text-xl mb-1">🏆 Confirm Your Dream Team</h3>
            <p className="text-[#131313]/60 text-sm mb-4">
              You have selected {selectedPlayers.length} players spending{' '}
              <strong>{coinsSpent.toLocaleString()} coins</strong>.
            </p>

            <div className="max-h-64 overflow-y-auto space-y-2 pr-1">
              {selectedPlayers.map((p) => (
                <div key={p.id} className="flex items-center gap-3 border border-[#131313]/10 rounded-lg p-2.5">
                  <img src={p.image} alt={p.name} className="w-10 h-10 rounded-lg object-cover object-top bg-gray-200" />
                  <div className="flex-1 min-w-0">
                    <p className="font-semibold text-sm truncate">{p.name}</p>
                    <p className="text-xs text-[#131313]/50">{p['player type']} · {p.team}</p>
                  </div>
                  <p className="text-sm font-bold shrink-0">🪙 {p.price.toLocaleString()}</p>
                </div>
              ))}
            </div>

            <div className="modal-action mt-5">
              <button
                className="btn btn-ghost"
                onClick={() => setConfirmOpen(false)}
                disabled={saving}
              >
                Cancel
              </button>
              <button
                className="btn btn-neutral"
                onClick={handleConfirm}
                disabled={saving}
              >
                {saving ? 'Saving…' : '✅ Save Dream Team'}
              </button>
            </div>
          </div>
          <div className="modal-backdrop" onClick={() => setConfirmOpen(false)}></div>
        </dialog>
      )}
    </>
  );
};

export default SelectedPlayer;