import { getServerSession } from 'next-auth';
import { authOptions } from '../api/auth/[...nextauth]/route';
import { prisma } from '../libs/db';
import { SafeUser } from '../types';

const getUserFavorites = async () => {
  const session = await getServerSession(authOptions);

  if (!session?.user) {
    return null;
  }

  const user = session.user as SafeUser;

  const userFavorites = await prisma.user.findUnique({
    where: {
      id: user.id,
    },
    select: {
      favoriteIds: true,
    },
  });

  return userFavorites?.favoriteIds || [];
};

export default getUserFavorites;
