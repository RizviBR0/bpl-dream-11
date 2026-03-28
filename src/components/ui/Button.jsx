const Button = ({ value, onSelect }) => {
    return (
        <div className='mt-2 border border-[#e7fe29] rounded-lg p-2 inline-block cursor-pointer' onClick={onSelect}>
            <button className='bg-[#E7FE29] rounded-sm px-3 py-2 font-bold text-base shadow-[inset_4px_4px_20px_0px_rgba(19,19,19,0.30)] pointer-events-none'>
                {value}
            </button>
        </div>
    );
};

export default Button;