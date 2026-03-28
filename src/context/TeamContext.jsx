/* eslint-disable react-refresh/only-export-components */
import { createContext, useContext } from 'react';
import useLocalStorage from '../hooks/useLocalStorage';

const TeamContext = createContext(null);

export const INITIAL_COINS = 8000;
export const DEFAULT_TEAM_SIZE = 11;
export const ROLE_RULES = {
  'Wicket-keeper': { min: 1, max: 2 },
  Batsman: { min: 3, max: 6 },
  'All-rounder': { min: 1, max: 4 },
  Bowler: { min: 3, max: 6 },
};

export function TeamProvider({ children }) {
  const [coin, setCoin] = useLocalStorage('bpl_coin', INITIAL_COINS);
  const [selectedPlayers, setSelectedPlayers] = useLocalStorage('bpl_selected', []);
  const [teamSize, setTeamSize] = useLocalStorage('bpl_team_size', DEFAULT_TEAM_SIZE);

  const addPlayer = (player) => {
    setCoin(coin - player.price);
    setSelectedPlayers([...selectedPlayers, player]);
  };

  const removePlayer = (player) => {
    setSelectedPlayers(selectedPlayers.filter((p) => p.id !== player.id));
    setCoin(coin + player.price);
  };

  const resetTeam = () => {
    setCoin(INITIAL_COINS);
    setSelectedPlayers([]);
  };

  const isSelected = (player) => selectedPlayers.some((p) => p.id === player.id);

  const getRoleCount = (role) => selectedPlayers.filter((p) => p.role === role).length;

  const getCompositionWarnings = () => {
    const warnings = [];
    Object.entries(ROLE_RULES).forEach(([role, { min }]) => {
      const count = getRoleCount(role);
      if (count < min) {
        warnings.push(`Need at least ${min} ${role}${min > 1 ? 's' : ''} (have ${count})`);
      }
    });
    return warnings;
  };

  const canConfirm = () =>
    selectedPlayers.length === teamSize && getCompositionWarnings().length === 0;

  return (
    <TeamContext.Provider
      value={{
        coin,
        setCoin,
        selectedPlayers,
        setSelectedPlayers,
        teamSize,
        setTeamSize,
        addPlayer,
        removePlayer,
        resetTeam,
        isSelected,
        getRoleCount,
        getCompositionWarnings,
        canConfirm,
        INITIAL_COINS,
      }}
    >
      {children}
    </TeamContext.Provider>
  );
}

export function useTeam() {
  const ctx = useContext(TeamContext);
  if (!ctx) throw new Error('useTeam must be used inside TeamProvider');
  return ctx;
}
