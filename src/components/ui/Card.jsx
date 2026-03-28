import { useState } from 'react';
import { FaUser } from 'react-icons/fa';
import { IoIosFlag } from 'react-icons/io';
import { toast } from 'react-toastify';

const Card = ({ player, setCoin, coin, setSelectedPlayers, selectedPlayers }) => {
    const [isSelected, setIsSelected] = useState(false);

    const handleChoosePlayer = () => {
        if (coin - player.price >= 0) {
            setCoin(coin - player.price);
            setIsSelected(true);
            setSelectedPlayers([...selectedPlayers, player]);
            toast.success(`${player.name} selected successfully!`, { hideProgressBar: false, closeOnClick: true });
        } else {
            toast.error("Not enough coin!", { hideProgressBar: false, closeOnClick: true });
        }
    }

    const handleDisable = () => {
        if (isSelected || selectedPlayers.find(p => p.name === player.name)) {
            return true;
        }
        return false;
    }

    return (
        <div className="rounded-lg overflow-hidden border border-[#131313]/10 p-5 space-y-4">
            <img className='w-full h-60 object-cover object-top rounded-md bg-gray-200/40' src={player.image} alt="" />
            <div className='space-y-4'>
                <h3 className="text-xl font-semibold flex gap-2 items-center"><FaUser className='text-lg' />{player.name}</h3>

                <div className='flex justify-between items-center'>
                    <p className='text-[#131313]/50 flex items-center gap-1'><IoIosFlag className='text-2xl' />{player.country}</p>
                    <p className='bg-[#131313]/5 text-[#131313] text-sm px-2.5 py-1.5 rounded-md'>{player['player type']}</p>
                </div>

                <hr className='border-[#131313]/10' />

                <div className='flex justify-between items-center'>
                    <p className='text-[#131313] font-semibold'>Rating</p>
                    <p className='text-[#131313]/70 text-base'>{player.rating}</p>
                </div>

                <div className='flex justify-between items-center'>
                    <p className='text-[#131313] font-semibold'>Batting</p>
                    <p className='text-[#131313]/70 text-base'>{player['batting style']}</p>
                </div>

                <div className='flex justify-between items-center'>
                    <p className='text-[#131313] font-semibold'>Bowling</p>
                    <p className='text-[#131313]/70 text-base'>{player['bowling style']}</p>
                </div>

                <div className='flex justify-between items-center'>
                    <p className='text-[#131313] font-bold text-2xl'>${player.price}</p>
                    <button className='btn btn-neutral text-sm' onClick={() => handleChoosePlayer()} disabled={handleDisable()}>
                        {!isSelected ? "Choose Player" : "Selected"}
                    </button>
                </div>
            </div>
        </div>
    );
};

export default Card;