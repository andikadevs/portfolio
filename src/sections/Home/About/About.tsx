import { Title } from '@/components/Global';
import { AboutTabs, Profile } from '@/components/Home';

export const About = () => {
  return (
    <div id='about' className='bg-secondary relative min-h-screen w-full px-0 py-6 md:p-6 shadow-xl mb-12'>
      
      {/* Top Vignette */}
      <div className='hidden z-10 lg:block bg-accent h-[300px] w-12 absolute top-0 left-0'></div>
      <div className='hidden z-10 lg:block bg-accent h-12 w-[300px] absolute top-0 left-0'></div>

      {/* Bottom Vignette */}
      <div className='hidden z-10 lg:block bg-accent h-[200px] w-12 absolute bottom-0 right-0'></div>
      <div className='hidden z-10 lg:block bg-accent h-12 w-[500px] absolute bottom-0 right-0'></div>

      <Title
        title='About [Me]'
        description='Let me [introduce] myself and tell you about my journey to becoming a [developer]'
      />

      <div className="grid grid-cols-1 md:grid-cols-5 w-full z-[1] px-0 py-2 md:p-2 relative">
        <div className="col-span-2 md:col-span-2 flex justify-center items-center relative py-6">
          <Profile
            src="/assets/static/img/person.webp"
            alt="Andika Dwi Saputra's Image Profile"
          />
        </div>

        <div className="col-span-3 md:col-span-3 py-6">
          <AboutTabs/>
        </div>
      </div>
    </div>
  );
};
