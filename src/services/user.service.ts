import status from '@modules/status.module';
import message from '@modules/message.module';
import { success, fail } from '@modules/response.module';
import AppDataSource from '@configs/dataSource';
import { User } from '@entities/user.entity';

const getUserByName = async (userName: string): Promise<User | null> => {
  try {
    const user: User | null = await User.createQueryBuilder()
      .select()
      .where(`name = :userName`, { userName })
      .getOne();

    return user;
  } catch (error: any) {
    throw Error(error);
  }
};

const signup = async (name: string) => {
  try {
    const user: User | null = await getUserByName(name);

    if (user) {
      return fail(status.BAD_REQUEST, message.DUPLICATE_USER);
    }

    await AppDataSource.createQueryBuilder()
      .insert()
      .into(User)
      .values([{ name: name }])
      .execute();

    return success(status.CREATED, message.CREATED);
  } catch (error: any) {
    return fail(
      status.INTERAL_SERVER_ERROR,
      message.INTERNAL_SERVER_ERROR,
      error
    );
  }
};

export default {
  getUserByName,
  signup,
};
