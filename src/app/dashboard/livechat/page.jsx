"use client";

import React from 'react';
import { Suspense } from 'react';

import Chatbot  from '@/components/chat/chatbot';

const Conversations = () => {
  

  return (
    <Suspense fallback={<div>Loading...</div>}>
    <div >
      <Chatbot/>
    </div>
    </Suspense>
  );
};

export default Conversations;




