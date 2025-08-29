"use client";

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { User } from 'lucide-react';

interface StoredUser {
  name?: string;
  email?: string;
}

export default function ProfileIcon() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [userName, setUserName] = useState<string | undefined>(undefined);

  useEffect(() => {
    try {
      const token = typeof window !== 'undefined' ? localStorage.getItem('token') : null;
      const userRaw = typeof window !== 'undefined' ? localStorage.getItem('user') : null;
      if (token && userRaw) {
        setIsAuthenticated(true);
        const parsed: StoredUser | null = JSON.parse(userRaw);
        setUserName(parsed?.name);
      } else {
        setIsAuthenticated(false);
      }
    } catch {
      setIsAuthenticated(false);
    }
  }, []);

  if (!isAuthenticated) return null;

  const initials = userName
    ? userName
        .split(' ')
        .map((part) => part[0])
        .slice(0, 2)
        .join('')
        .toUpperCase()
    : undefined;

  return (
    <Link href="/dashboard" className="inline-flex items-center group">
      <span
        className="w-9 h-9 rounded-full bg-blue-600 text-white flex items-center justify-center shadow hover:bg-blue-700 transition-colors"
        title={userName ? `${userName} • View dashboard` : 'View dashboard'}
      >
        {initials ? (
          <span className="text-sm font-semibold">{initials}</span>
        ) : (
          <User className="w-5 h-5" />
        )}
      </span>
    </Link>
  );
}


