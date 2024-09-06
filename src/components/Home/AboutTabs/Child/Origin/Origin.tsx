import { Clock } from '@/components/Global';
import { calculateAgeDetails } from '@/utils/Global';


export const Origin: React.FC = () => {
  const birthDate = new Date('2005-07-09');
  const { years, days, time } = calculateAgeDetails(birthDate);

  return (
    <div>
      <h3 className="text-text text-3xl mb-6">
        My <span className="text-accent">Origin</span>
      </h3>

      <p className='text-text mb-6'>
        I was born in <span className="text-accent">Banjarnegara </span> 
        on July 9th, 2005, and I have lived there ever since. Computers 
        were not really my thing, I have no access to "computer" back then. 
        My first time handling a computer was when I was in Senior High 
        School. I couldn't even switch on a computer back then. However, 
        I found my passion there. I have always studied hard ever since, 
        working on building myself to become a future-ready 
        <span className="text-accent"> Programmer</span> .
      </p>

      <p className="text-text mb-2">
        <span className="text-accent">
          Fullname :&nbsp; 
        </span>
        Andika Dwi Saputra
      </p>
      <p className="text-text mb-2">
        <span className="text-accent">
          Nationality :&nbsp; 
        </span>
        Indonesia
      </p>
      <p className="text-text mb-2">
        <span className="text-accent">
          Origin :&nbsp; 
        </span>
        Central Java, Indonesia
      </p>
      <p className="text-text mb-2">
        <span className="text-accent">
          Age :&nbsp; 
        </span>
        {years} years {days} days <Clock/>
      </p>
    </div>
  );
};