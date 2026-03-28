import { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { toast } from 'react-toastify';
import particle1 from '../assets/bg_blur_particle_1.png'
import particle2 from '../assets/bg_blur_particle_2.png'
import logoFooter from '../assets/logo-footer.png'

const Footer = () => {
    const [email, setEmail] = useState('');

    const handleSubscribe = (e) => {
        e.preventDefault();
        if (!email || !/\S+@\S+\.\S+/.test(email)) {
            toast.error('Please enter a valid email address.');
            return;
        }
        toast.success('🎉 Subscribed! Stay tuned for BPL updates.');
        setEmail('');
    };

    return (
        <footer className="bg-[#131313] text-white sm:mt-64 mt-72">
            <div className="container mx-auto relative pb-10 px-4">
                <div className='sm:p-8 p-3 border-2 border-[#ffffff] bg-[#FFFFFF]/10 rounded-3xl absolute -translate-y-[55%] w-[calc(100%-2rem)]'>
                    <div className="relative overflow-hidden sm:p-20 p-8 bg-white border border-[#131313]/10 flex flex-col gap-4 items-center justify-center rounded-2xl">
                        <img className='w-150 absolute -bottom-56 -left-56 z-0' src={particle1} alt="" />
                        <img className='w-175 absolute -top-56 -right-56 z-0' src={particle2} alt="" />
                        <div className='absolute inset-0 z-1 backdrop-blur-[130px]'></div>
                        <div className='relative z-2 text-center'>
                            <h1 className='font-bold text-3xl text-[#131313] mb-3'>Subscribe to our Newsletter</h1>
                            <p className='font-medium text-xl text-[#131313]/70 mb-4'>Get the latest BPL updates right in your inbox!</p>
                            <form onSubmit={handleSubscribe} className='flex gap-4 items-center justify-center sm:flex-row flex-col'>
                                <input
                                    className='border border-[#131313]/15 px-4 py-3 text-black rounded-xl sm:max-w-96 w-full flex-1'
                                    type="email"
                                    placeholder="Enter your email"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                />
                                <button
                                    type="submit"
                                    className='bg-linear-to-r from-[#BE68A5] to-[#ECC256] text-black font-bold px-6 py-3 rounded-xl cursor-pointer shadow-[inset_4px_4px_20px_0px_rgba(19,19,19,0.50)] sm:w-fit w-full'
                                >
                                    Subscribe
                                </button>
                            </form>
                        </div>
                    </div>
                </div>

                <div className='sm:pt-56 pt-48'>
                    <img className='h-36 mx-auto mb-16' src={logoFooter} alt="BPL Dream 11" />

                    <div className='grid lg:grid-cols-3 md:grid-cols-2 grid-cols-1 gap-16'>
                        <div>
                            <h4 className='font-semibold text-white text-lg mb-3'>About Us</h4>
                            <p className='text-white/60 max-w-xs'>
                                BPL Dream 11 lets you build the ultimate fantasy cricket team from the Bangladesh Premier League. Pick wisely — your dream team awaits!
                            </p>
                        </div>
                        <div>
                            <h4 className='font-semibold text-white text-lg mb-3'>Quick Links</h4>
                            <ul className='flex gap-2 flex-col'>
                                {[
                                    { name: 'Home', to: '/' },
                                    { name: 'Fixture', to: '/fixture' },
                                    { name: 'Teams', to: '/teams' },
                                    { name: 'Schedules', to: '/schedules' },
                                ].map((l) => (
                                    <li key={l.to}>
                                        <NavLink to={l.to} onClick={() => window.scrollTo(0, 0)} className='text-white/60 hover:text-white hover:underline transition'>
                                            {l.name}
                                        </NavLink>
                                    </li>
                                ))}
                            </ul>
                        </div>
                        <div>
                            <h4 className='font-semibold text-white text-lg mb-3'>Subscribe</h4>
                            <p className='text-white/60 mb-3 max-w-xs'>Subscribe to our newsletter for BPL scores and updates.</p>
                            <form onSubmit={handleSubscribe} className='flex flex-row justify-center items-center overflow-hidden'>
                                <input
                                    className='bg-white border border-[#131313]/15 px-4 py-3 text-black rounded-l-xl w-full flex-1 outline-none'
                                    type="email"
                                    placeholder="Your email"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                />
                                <button
                                    type="submit"
                                    className='bg-linear-to-r from-[#BE68A5] to-[#ECC256] text-black font-bold px-6 py-3 rounded-r-xl cursor-pointer shadow-[inset_4px_4px_20px_0px_rgba(19,19,19,0.50)] w-fit'
                                >
                                    Go
                                </button>
                            </form>
                        </div>
                    </div>
                </div>
            </div>

            <div className='p-7 border-t border-[#FFFFFF]/15 flex items-center justify-center'>
                <p className='text-center text-white/60'>© {new Date().getFullYear()} BPL Dream 11. All Rights Reserved.</p>
            </div>
        </footer>
    );
};

export default Footer;