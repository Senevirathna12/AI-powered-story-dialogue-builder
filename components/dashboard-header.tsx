"use client";

import { Button } from '@/components/ui/button';
import { LogOut, Sparkles } from 'lucide-react';
import { useAuth } from './auth-provider';
import { ThemeToggle } from './theme-toggle';
import { toast } from 'sonner';
import { useRouter } from 'next/navigation';

export function DashboardHeader() {
  const { user, signOut } = useAuth();
  const router = useRouter();

  const handleLogout = () => {
    signOut();
    toast.success('Logged out successfully');
    router.push('/');
  };

  return (
    <header className="border-b bg-white/95 dark:bg-gray-900/95 backdrop-blur supports-[backdrop-filter]:bg-white/60 dark:supports-[backdrop-filter]:bg-gray-900/60">
      <div className="flex h-16 items-center justify-between px-6">
        <div className="flex items-center space-x-2">
          <Sparkles className="h-8 w-8 text-blue-600 dark:text-blue-400" />
          <h1 className="text-xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 dark:from-blue-400 dark:to-purple-400 bg-clip-text text-transparent">
            AI Story Generator
          </h1>
        </div>
        
        <div className="flex items-center space-x-4">
          <span className="text-sm text-gray-600 dark:text-gray-300">
            Welcome, {user?.name}
          </span>
          <ThemeToggle />
          <Button
            variant="outline"
            size="sm"
            onClick={handleLogout}
            className="flex items-center space-x-2"
          >
            <LogOut className="h-4 w-4" />
            <span>Logout</span>
          </Button>
        </div>
      </div>
    </header>
  );
}