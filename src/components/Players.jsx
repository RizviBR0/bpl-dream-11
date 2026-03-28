import { use, useState } from "react";
import AvailablePlayer from "./AvailablePlayer";
import SelectedPlayer from "./SelectedPlayer";

const Players = ({ playersPromise, setCoin, coin }) => {
    const players = use(playersPromise);
    const [selectedBtn, setSelectedBtn] = useState("available");
    const [selectedPlayers, setSelectedPlayers] = useState([]);

    const active = 'font-bold bg-[#E7FE29] text-[#131313]';
    const inActive = 'font-normal bg-transparent text-[#131313]/70'

    return (
        <>
            <div className='flex justify-between items-center mt-12'>
                {selectedBtn === "available" ? <p className='font-bold text-2xl'>Available Players</p> : <p className='font-bold text-2xl'>Selected Players</p>}

                <div className='border border-[#131313]/10 rounded-lg'>
                    <button className={`px-4 py-2.5 ${selectedBtn === "available" ? active : inActive} cursor-pointer`} onClick={() => setSelectedBtn("available")}>
                        Available
                    </button>
                    <button className={`px-4 py-2.5 ${selectedBtn === "selected" ? active : inActive} cursor-pointer`} onClick={() => setSelectedBtn("selected")}>
                        Selected (<span>{selectedPlayers.length}</span>)
                    </button>
                </div>
            </div>

            {selectedBtn === "available" ? <AvailablePlayer players={players} setCoin={setCoin} coin={coin} selectedPlayers={selectedPlayers} setSelectedPlayers={setSelectedPlayers} /> : <SelectedPlayer setSelectedBtn={setSelectedBtn} selectedPlayers={selectedPlayers} setSelectedPlayers={setSelectedPlayers} setCoin={setCoin} coin={coin} />}
        </>
    );
};

export default Players;