import { db } from "../../../prisma/db";

// TODO
interface IUserRepository {
  createUser(input: CreateUserInput): Promise<IUser>;
  findByEmail(id: string): Promise<IUser | null>;
}
interface IUser {
  id: string;
  email: string;
  displayName: string | null;
  avatarUrl: string | null;
  lastLoginAt: Date | null;
  createdAt: Date;
}

interface CreateUserInput {
  email: string;
  displayName: string;
  googleSubject: string;
  avatarUrl: string;
}

export type UserOrm = Pick<typeof db.orm.public, "User">;

export class UserRepository implements IUserRepository {
  constructor(private readonly orm: UserOrm = db.orm.public) {}

  private users() {
    return this.orm.User.select(
      "id",
      "email",
      "displayName",
      "avatarUrl",
      "lastLoginAt",
      "createdAt",
    );
  }

  async createUser(input: CreateUserInput): Promise<IUser> {
    return await this.users().create(input);
  }
  async findByEmail(email: string): Promise<IUser | null> {
    const user = await this.users().where({ email }).first();
    return user;
  }
}
