import dollarImg from '../assets/dollar_1.svg'
import logo from '../assets/logo.png'

const navLinks = [
    { name: 'Home', href: '/' },
    { name: 'Fixture', href: '/fixture' },
    { name: 'Teams', href: '/teams' },
    { name: 'Schedules', href: '/schedules' }
];

const Navbar = ({ coin }) => {
    return (
        <div className="navbar bg-base-100 justify-between border-none">
            <div>
                <img className='h-20' src={logo} alt="" />
            </div>

            <div className='flex justify-center items-center gap-8'>
                <ul className='hidden gap-8 sm:flex'>
                    {navLinks.map((link, index) => {
                        return (
                            <li key={index}>
                                <a href={link.href} className='text-base text-[#131313]/70'>{link.name}</a>
                            </li>
                        )
                    })}
                </ul>
                <button className="flex justify-center items-center space-x-2 w-fit border border-[#131313]/10 rounded-lg px-4 py-3">
                    <span className='font-bold text-xl'>{coin} Coins</span>
                    <img className='w-5' src={dollarImg} alt="Dollar" />
                </button>
            </div>
        </div >
    );
};

export default Navbar;