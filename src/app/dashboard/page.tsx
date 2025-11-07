

import NavbarClient from '@/components/Navbar';
import { auth } from '@/lib/auth'
import { headers } from 'next/headers'
import { redirect } from 'next/navigation';
import React from 'react'

const DashboardPage = async () => {
  const session = await auth.api.getSession({
    headers: await headers(),
});

  console.log('Dashboard session:', session);

  if (!session) {
    redirect('/login');
  }

  return (
    <>
      
      <div>Dashboard Page</div>
    </>
  )
  
}

export default DashboardPage