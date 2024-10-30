'use client'

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import Link from 'next/link';
import { useSession, signIn, signOut } from 'next-auth/react';
import { 
  Menu, 
  X, 
  User, 
  LogOut, 
  Settings 
} from 'lucide-react';

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger
} from '@/components/ui/dropdown-menu';

import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Dialog } from '@/components/ui/dialog';  // Ensure Dialog is correctly imported
import { cn } from '@/lib/utils'; // Ensure the `cn` utility function exists or adjust imports

export default function Navigation() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const router = useRouter();
  const { data: session, status } = useSession();
  const loading = status === 'loading';

  // Handle navbar background on scroll
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 0);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav
      className={cn(
        'fixed top-0 w-full z-50 transition-all duration-300',
        scrolled || isOpen ? 'bg-white shadow-md' : 'bg-transparent'
      )}
    >
      <div className="container-lg">
        <div className="flex items-center justify-between h-16">
          <Link href="/" className="flex items-center">
            <span className="text-xl font-bold text-primary">VC Platform</span>
          </Link>

          <div className="hidden md:flex items-center space-x-8">
            <Link href="/how-it-works" className="text-gray-600 hover:text-gray-900">How It Works</Link>
            <Link href="/resources" className="text-gray-600 hover:text-gray-900">Resources</Link>
            <Link href="/about" className="text-gray-600 hover:text-gray-900">About</Link>
          </div>

          <div className="hidden md:flex items-center space-x-4">
            {loading ? (
              <div className="h-8 w-8 rounded-full bg-gray-200 animate-pulse" />
            ) : session ? (
              <Dialog>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" className="relative h-8 w-8 rounded-full">
                      <Avatar>
                        <AvatarImage src={session.user.image} alt={session.user.name} />
                        <AvatarFallback>{session.user.name?.charAt(0).toUpperCase()}</AvatarFallback>
                      </Avatar>
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent className="w-56" align="end">
                    <DropdownMenuLabel>My Account</DropdownMenuLabel>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem>
                      <User className="mr-2 h-4 w-4" />
                      Profile
                    </DropdownMenuItem>
                    <DropdownMenuItem>
                      <Settings className="mr-2 h-4 w-4" />
                      Settings
                    </DropdownMenuItem>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem onClick={() => signOut()}>
                      <LogOut className="mr-2 h-4 w-4" />
                      Log out
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </Dialog>
            ) : (
              <>
                <Button variant="ghost" onClick={() => signIn()}>Sign In</Button>
                <Button onClick={() => router.push('/submit')}>Submit Pitch</Button>
              </>
            )}
          </div>

          <div className="md:hidden">
            <Button variant="ghost" size="icon" onClick={() => setIsOpen(!isOpen)} aria-label="Toggle menu">
              <Menu className="h-6 w-6" />
            </Button>
          </div>
        </div>
      </div>

      <div
        className={cn(
          'md:hidden fixed inset-0 z-50 transform transition-transform duration-300 ease-in-out',
          isOpen ? 'translate-x-0' : 'translate-x-full'
        )}
      >
        <div className="relative w-screen h-screen bg-white">
          <div className="p-6">
            <div className="flex items-center justify-between mb-8">
              <Link href="/" className="text-xl font-bold text-primary">VC Platform</Link>
              <Button variant="ghost" size="icon" onClick={() => setIsOpen(false)} aria-label="Close menu">
                <X className="h-6 w-6" />
              </Button>
            </div>

            <div className="space-y-6">
              <Link href="/how-it-works" className="block text-lg text-gray-600 hover:text-gray-900" onClick={() => setIsOpen(false)}>How It Works</Link>
              <Link href="/resources" className="block text-lg text-gray-600 hover:text-gray-900" onClick={() => setIsOpen(false)}>Resources</Link>
              <Link href="/about" className="block text-lg text-gray-600 hover:text-gray-900" onClick={() => setIsOpen(false)}>About</Link>

              <div className="pt-6 border-t">
                {session ? (
                  <div className="space-y-4">
                    <div className="flex items-center space-x-3">
                      <Avatar>
                        <AvatarImage src={session.user.image} alt={session.user.name} />
                        <AvatarFallback>{session.user.name?.charAt(0).toUpperCase()}</AvatarFallback>
                      </Avatar>
                      <div>
                        <p className="font-medium">{session.user.name}</p>
                        <p className="text-sm text-gray-500">{session.user.email}</p>
                      </div>
                    </div>
                    <Button variant="outline" className="w-full" onClick={() => { signOut(); setIsOpen(false); }}>Sign Out</Button>
                  </div>
                ) : (
                  <div className="space-y-4">
                    <Button variant="outline" className="w-full" onClick={() => { signIn(); setIsOpen(false); }}>Sign In</Button>
                    <Button className="w-full" onClick={() => { router.push('/submit'); setIsOpen(false); }}>Submit Pitch</Button>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
}
