import { MdOutlineDelete } from "react-icons/md";
import Button from "./ui/Button";

const SelectedPlayer = ({ selectedPlayers, setSelectedPlayers, coin, setCoin, setSelectedBtn }) => {
    const handleDeletePlayer = (player) => {
        setSelectedPlayers(selectedPlayers.filter(selectedPlayer => player.name !== selectedPlayer.name));
        setCoin(coin + Number(player.price));
    }

    const handleClick = () => {
        setSelectedBtn("available");
    }

    if (selectedPlayers.length === 0) {
        return (
            <div className="text-center py-10 space-y-3 mt-6">
                <p className="text-2xl font-semibold text-[#131313]/60">No players selected yet.</p>
                <p className="text-[#131313]/60">Go to available players to select some!</p>
                <Button value="Available Players" onSelect={handleClick} />
            </div>
        );
    }

    return (
        <ul className="mt-6 flex flex-col gap-5">
            {selectedPlayers.map((player, idx) => {
                return (
                    <li key={idx} className="border border-[#131313]/10 rounded-lg p-5 flex items-center gap-5">
                        <img className="w-20 rounded-lg bg-[#D9D9D9]" src={player.image} alt={player.name} />

                        <div className="space-y-2 flex-1">
                            <h3 className="font-semibold text-2xl text-[#131313]">{player.name}</h3>
                            <p className="text-base font-normal text-[#131313]/60">{player['player type']}</p>
                        </div>

                        <div className="rounded-full p-3 border border-[#131313]/10 hover:bg-[#131313]/10 flex justify-center items-center cursor-pointer duration-100" onClick={() => handleDeletePlayer(player)}>
                            <MdOutlineDelete className="text-3xl text-red-400 pointer-events-none" />
                        </div>
                    </li>
                )
            })}

            <div>
                <Button value="Add players" onSelect={handleClick} />
            </div>
        </ul>
    );
};

export default SelectedPlayer;