import { faker } from '@faker-js/faker';

/**
 * User Factory - Generate test user data using Faker
 */
export class UserFactory {
  /**
   * Create a single user with random data
   */
  static create() {
    const firstName = faker.person.firstName();
    const lastName = faker.person.lastName();
    const username = faker.internet.userName({ firstName, lastName });

    return {
      firstName,
      lastName,
      username,
      email: faker.internet.email({ firstName, lastName }).toLowerCase(),
      password: this.generateStrongPassword(),
      phone: faker.phone.number(),
      role: this.getRandomRole(),
      department: faker.commerce.department(),
      createdAt: faker.date.past({ years: 1 }),
    };
  }

  /**
   * Create multiple users
   */
  static createMany(count: number) {
    return Array.from({ length: count }, () => UserFactory.create());
  }

  /**
   * Create admin user
   */
  static createAdmin() {
    const user = UserFactory.create();
    return {
      ...user,
      role: 'admin',
      permissions: ['read', 'write', 'delete', 'admin'],
    };
  }

  /**
   * Create regular user
   */
  static createRegularUser() {
    const user = UserFactory.create();
    return {
      ...user,
      role: 'user',
      permissions: ['read', 'write'],
    };
  }

  /**
   * Create readonly user
   */
  static createReadonlyUser() {
    const user = UserFactory.create();
    return {
      ...user,
      role: 'readonly',
      permissions: ['read'],
    };
  }

  /**
   * Create user with specific role
   */
  static createWithRole(role: 'admin' | 'user' | 'readonly') {
    switch (role) {
      case 'admin':
        return UserFactory.createAdmin();
      case 'readonly':
        return UserFactory.createReadonlyUser();
      default:
        return UserFactory.createRegularUser();
    }
  }

  /**
   * Generate strong password
   */
  private static generateStrongPassword(): string {
    const uppercase = faker.string.alpha({ length: 2, casing: 'upper' });
    const lowercase = faker.string.alpha({ length: 2, casing: 'lower' });
    const number = faker.string.numeric(2);
    const special = faker.string.fromCharacters('!@#$%^&*');
    const remaining = faker.string.alphanumeric(4);

    return `${uppercase}${lowercase}${number}${special}${remaining}`;
  }

  /**
   * Get random role
   */
  private static getRandomRole(): 'admin' | 'user' | 'readonly' {
    const roles: Array<'admin' | 'user' | 'readonly'> = ['admin', 'user', 'readonly'];
    return roles[Math.floor(Math.random() * roles.length)];
  }

  /**
   * Create user for specific department
   */
  static createForDepartment(department: string) {
    const user = UserFactory.create();
    return {
      ...user,
      department,
      email: faker.internet.email({ firstName: user.firstName, lastName: user.lastName, provider: 'tuliptech' }).toLowerCase(),
    };
  }
}
