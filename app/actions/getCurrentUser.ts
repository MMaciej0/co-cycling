import { getServerSession } from 'next-auth';
import { authOptions } from '../api/auth/[...nextauth]/route';
import { SafeUser } from '../types';

const getCurrentUser = async () => {
  const session = await getServerSession(authOptions);

  if (!session?.user) {
    return null;
  }

  return session.user as SafeUser;
};

export default getCurrentUser;
