import { SocialButton } from "@/components/Global";
import { AnimateOnView } from "@/components/Global/AnimateOnView";

export const Certificate: React.FC = () => {
  const certificates = [
    { src: "sql-advanced.webp", alt: "SQL Advanced Certification" },
    { src: "javascript-intermediate.webp", alt: "JavaScript Intermediate Certification" },
    { src: "webdev.webp", alt: "Web Development Certification" },
    { src: "data-programing.webp", alt: "SQL Advanced Certification" },
    { src: "tech.webp", alt: "Tech for Everyone Certification" },
    { src: "lks.webp", alt: "LKS Jateng Certification" },
  ];

  return (
    <div id="certificate" className='bg-secondary relative h-auto w-full p-4 md:px-10 shadow-xl'>
      <AnimateOnView direction="up">
        <h4 className='relative text-3xl text-text mb-4'>
          Certificates
          <div className="border-b-[3px] border-accent w-[80px]"></div>
        </h4>
      </AnimateOnView>

      <AnimateOnView direction="up" delay={150}>
        <p className="text-text md:w-[50%] w-full mb-8">
          Most of the skills I gained were <span className="text-accent">self-taught.</span> However, I also acquired some certifications through testing and competitions.
        </p>
      </AnimateOnView>

      <div className="flex gap-3 flex-col md:flex-row h-full">
        <div className="w-[100%] md:w-[75%] h-full">
          <div className='grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-3 gap-4 h-full'>
            {certificates.map((cert, index) => (
              <AnimateOnView key={cert.src} direction="up" delay={300 + (index * 100)}>
                <img 
                  src={`/assets/static/img/Portfolio/${cert.src}`} 
                  className="w-full h-full object-cover shadow-xl"
                  alt={cert.alt}
                />
              </AnimateOnView>
            ))}
          </div>
        </div>
        <div className="w-[calc(50%-8px)] md:w-[25%] h-full flex flex-1">
          <AnimateOnView direction="up" delay={900} className="h-full w-full">
            <img 
              src="/assets/static/img/Portfolio/toeic.webp" 
              className="w-full h-full object-cover shadow-xl"
              alt="Advanced TOEIC Certification"
            />
          </AnimateOnView>
        </div>
      </div>

      <AnimateOnView direction="up" delay={1000}>
        <div className="flex w-full justify-center mt-12 mb-32">
          <SocialButton
            href='https://instagram.com/andikads__'
            iconUrl='assets/static/img/Icons/instagram.svg'
            altText='Instagram'
            label='Follow me on Instagram'
            classNames='w-full md:w-auto'
          />
        </div>
      </AnimateOnView>
    </div>
  );
};
