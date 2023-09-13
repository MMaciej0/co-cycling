import { prisma } from '../libs/db';

const getUserById = async (id: string) => {
  try {
    const user = await prisma.user.findUnique({
      where: {
        id,
      },
    });

    if (!user) throw new Error('No user');

    return user;
  } catch (error: any) {
    throw new Error(error.message);
  }
};

export default getUserById;
