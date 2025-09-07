"use client";

import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { BookOpen, MessageSquare } from 'lucide-react';

interface ModeSelectorProps {
  value: string;
  onValueChange: (value: string) => void;
}

export function ModeSelector({ value, onValueChange }: ModeSelectorProps) {
  return (
    <Tabs value={value} onValueChange={onValueChange} className="w-full">
      <TabsList className="grid w-full grid-cols-2">
        <TabsTrigger 
          value="story" 
          className="flex items-center space-x-2 data-[state=active]:bg-blue-500 dark:data-[state=active]:bg-blue-600 data-[state=active]:text-white"
        >
          <BookOpen className="h-4 w-4" />
          <span>Story Mode</span>
        </TabsTrigger>
        <TabsTrigger 
          value="dialogue"
          className="flex items-center space-x-2 data-[state=active]:bg-purple-500 dark:data-[state=active]:bg-purple-600 data-[state=active]:text-white"
        >
          <MessageSquare className="h-4 w-4" />
          <span>Dialogue Mode</span>
        </TabsTrigger>
      </TabsList>
    </Tabs>
  );
}