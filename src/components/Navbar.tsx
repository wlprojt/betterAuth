'use client'
import { useState } from 'react';
import { Button } from './ui/button';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { authClient } from '@/lib/auth-client';

export default function NavbarClient({ session }: { session: any }) {
  const router = useRouter();
  const [currentSession, setCurrentSession] = useState(session);

  async function handleSignOut() {
    await authClient.signOut();
    setCurrentSession(null);  // ✅ update local state
    router.push('/');
  }

  return (
    <nav className="p-4 md:p-6 shadow-md bg-gray-900 text-white">
      <div className="container mx-auto flex flex-col md:flex-row justify-between items-center">
        <Link
          href="/"
          className="text-xl font-bold mb-4 md:mb-0 hover:text-blue-400 transition-colors"
        >
          W L Project
        </Link>

        <div className="flex items-center space-x-4">
          {currentSession ? (
            <>
              <span className="mr-4">
                Welcome, {currentSession.user?.name || currentSession.user?.email}
              </span>
              <Button
                onClick={handleSignOut}
                className="bg-red-600 hover:bg-red-700 text-white transition"
              >
                Logout
              </Button>
            </>
          ) : (
            <Link href="/login">
              <Button className="bg-blue-600 hover:bg-blue-700 text-white transition">
                Login
              </Button>
            </Link>
          )}
        </div>
      </div>
    </nav>
  );
}
