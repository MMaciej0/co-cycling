import { getServerSession } from 'next-auth';

const getCurrentUser = async () => {
  const session = await getServerSession();

  if (!session?.user) {
    return null;
  }

  return session.user;
};

export default getCurrentUser;
