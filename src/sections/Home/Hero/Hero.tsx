import { HeroImage, SosmedChain } from '@/components/Home';
import { Particles, Typing } from '@/components/Global'; 

export const Hero = () => {
  const whatIam = ['Web Developer', 'Software Engineer', 'Determined Learner'];

  return (
    <div id='home' className='relative bg-main h-screen w-full'>

      <Particles id="particles"/>
      {/* <HeroImage /> */}
      <SosmedChain />

      <div className="relative h-screen grid grid-cols-1 md:grid-cols-2 w-full z-[1]">
        <div className='pl-12 flex w-full flex-col items-start justify-center'>
          <h1 className='text-center text-accent text-3xl md:text-4xl lg:text-5xl border-b-2 border-accent'>
            Andika Dwi Saputra
          </h1>
          <h2 className='text-center text-accent text-xl'>
            {`I’m `}
            <Typing texts={whatIam} />
          </h2>
        </div>
        <div className='p-4'>

        </div>
      </div>
    </div>
  );
};
