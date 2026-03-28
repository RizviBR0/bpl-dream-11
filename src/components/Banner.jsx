import { toast } from 'react-toastify';
import particle1 from '../assets/bg_blur_particle_1.png'
import particle2 from '../assets/bg_blur_particle_2.png'
import bannerImg from '../assets/banner-main.png'
import Button from './ui/Button';
import { useTeam } from '../context/TeamContext';

const Banner = () => {
    const { coin, setCoin } = useTeam();

    const handleClaimCredit = () => {
        setCoin(coin + 100000);
        toast.success("💥 Free credit claimed! Build your team.");
    };

    return (
        <div className='relative min-h-[500px] bg-[#131313] rounded-3xl mt-6 overflow-hidden flex justify-center items-center py-16 px-4'>
            <img className='w-150 absolute -bottom-56 -left-56 z-0' src={particle1} alt="Particle 1" />
            <img className='w-175 absolute -top-56 -right-56 z-0' src={particle2} alt="Particle 2" />

            <div className='absolute inset-0 z-1 backdrop-blur-[130px]'></div>

            <div className='relative z-2 flex items-center justify-center flex-col gap-8'>
                <img className='w-48 sm:w-62.5' src={bannerImg} alt="BPL Dream 11" />
                <div className='text-center space-y-6'>
                    <h1 className='font-bold text-3xl sm:text-4xl text-white'>Assemble Your Ultimate BPL Dream 11 Team</h1>
                    <p className='text-white/70 font-medium text-xl sm:text-2xl'>Beyond Boundaries Beyond Limits</p>
                    <div className='inline-block'>
                        <Button value="Claim Free Credit" onSelect={handleClaimCredit} />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Banner;