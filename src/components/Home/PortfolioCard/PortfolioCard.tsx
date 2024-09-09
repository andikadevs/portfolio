import React from 'react';
import Image from 'next/image';
import { markupAccents } from '@/utils/Global'; 
import { PortfolioCardProps } from './PortfolioCardPropsInterface';
import { Button } from '@/components/Global';
import { FaChrome } from 'react-icons/fa';
import { BsSlashCircle } from 'react-icons/bs';

export const PortfolioCard: React.FC<PortfolioCardProps> = ({ imgSrc, title, description, stacks, url }) => {
  return (
    <div className='bg-secondary shadow-xl rounded-lg overflow-hidden flex flex-col p-3'>
      <div className='relative w-full' style={{ paddingTop: '56.25%' }}>
        <Image
          loading='lazy'
          src={imgSrc}
          alt={title}
          layout='fill'
          objectFit='contain'
          className='absolute top-0 left-0'
        />
      </div>
      <div className='flex-1 text-text flex flex-col justify-between'>
        <div>
          <h3
            className='text-xl mb-2 border-b border-accent'
            dangerouslySetInnerHTML={{ __html: markupAccents(title) }}
          />
          <p
            className='mb-3 text-sm'
            dangerouslySetInnerHTML={{ __html: markupAccents(description) }}
          />
        </div>

        <div className='border-t border-dark flex justify-between pt-2 gap-3 overflow-hidden'>
          <div className='flex gap-2 overflow-x-auto scrollbar-hidden'>
            {stacks.map((item, index) => (
              <div key={index} className='relative h-[30px] w-[30px]'>
                <Image
                  src={`/assets/static/img/Icons/${item}.svg`}
                  alt={`${item} Icon`}
                  layout='fill'
                  objectFit='contain'
                  className={item.toLowerCase() === 'react' ? 'animate-rotate' : ''}
                />
              </div>
            ))}
          </div>

          <Button variant='outline' size='sm' disabled={url === 'forbidden'}>
            {url === 'forbidden' ? <><BsSlashCircle className='text-accent' /> Forbidden</> : <><FaChrome /> Visit</>}
          </Button>
        </div>
      </div>
    </div>
  );
};
