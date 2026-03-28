import Card from "./ui/Card";

const AvailablePlayer = ({ players }) => {
    if (players.length === 0) {
        return (
            <div className="text-center py-16 mt-6">
                <p className="text-2xl font-semibold text-[#131313]/60">No players found.</p>
                <p className="text-[#131313]/40 mt-2">Try adjusting your filters.</p>
            </div>
        );
    }

    return (
        <div className="grid lg:grid-cols-3 sm:grid-cols-2 grid-cols-1 gap-5 mt-6">
            {players.map((player) => (
                <Card key={player.id} player={player} />
            ))}
        </div>
    );
};

export default AvailablePlayer;