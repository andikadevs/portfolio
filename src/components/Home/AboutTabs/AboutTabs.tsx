'use client';

import React from 'react';
import { Tabs } from '@/components/Global';
import { FaUser, FaMapMarkerAlt, FaHeart, FaTwitter } from 'react-icons/fa';
import { Hello, Hobbies, Origin, Sosmed } from './Child';

export const AboutTabs = () => {
  const tabs = [
    { name: 'hello', icon: <FaUser />, component: <Hello /> },
    { name: 'origin', icon: <FaMapMarkerAlt />, component: <Origin /> },
    { name: 'hobbies', icon: <FaHeart />, component: <Hobbies /> },
    { name: 'social media', icon: <FaTwitter />, component: <Sosmed /> },
  ];

  return (
    <div className="bg-secondary w-full p-0 min-h-[500px]">
      <Tabs 
        tabs={tabs} 
        contentRenderer={(activeTab: string) => 
          tabs.find(tab => tab.name === activeTab)?.component || null
        } 
      />
    </div>
  );
};