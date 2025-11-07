import { auth } from '@/lib/auth';
import { headers } from 'next/headers';
import NavbarClient from './Navbar';

export default async function LogButton() {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  console.log('Navbar session:', session);

  return <NavbarClient session={session} />;
}
