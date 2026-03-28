import particle1 from '../assets/bg_blur_particle_1.png'
import particle2 from '../assets/bg_blur_particle_2.png'
import bannerImg from '../assets/banner-main.png'
import Button from './ui/Button';

const Banner = () => {
    return (
        <div className='relative min-h-screen bg-[#131313] rounded-3xl mt-6 overflow-hidden flex justify-center items-center'>
            <img className='w-150 absolute -bottom-56 -left-56 z-0' src={particle1} alt="Particle 1" />
            <img className='w-175 absolute -top-56 -right-56 z-0' src={particle2} alt="Particle 2" />

            <div className='absolute inset-0 z-1 backdrop-blur-[130px]'></div>

            <div className='relative z-2 flex items-center justify-center flex-col gap-8'>
                <img className='w-62.5' src={bannerImg} alt="" />
                <div className='text-center space-y-6'>
                    <h1 className='font-bold text-4xl text-white'>Assemble Your Ultimate Dream 11 Cricket Team</h1>
                    <p className='text-white/70 font-medium text-2xl'>Beyond Boundaries Beyond Limits</p>
                    <Button value="Claim Free Credit" />
                </div>
            </div>
        </div>
    );
};

export default Banner;