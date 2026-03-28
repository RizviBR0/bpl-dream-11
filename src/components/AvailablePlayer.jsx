import Card from "./ui/Card";

const AvailablePlayer = ({ players, setCoin, coin, setSelectedPlayers, selectedPlayers }) => {
    return (
        <div className="grid lg:grid-cols-3 sm:grid-cols-2 grid-cols-1 gap-5 mt-6">
            {players.map((player, index) => (
                <Card
                    key={index}
                    player={player}
                    setCoin={setCoin}
                    coin={coin}
                    setSelectedPlayers={setSelectedPlayers}
                    selectedPlayers={selectedPlayers} />
            ))}
        </div>
    );
};

export default AvailablePlayer;