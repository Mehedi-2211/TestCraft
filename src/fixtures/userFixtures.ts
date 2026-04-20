import { test as base } from '@playwright/test';
import { UserDataBuilder } from '../src/datas/UserFactory';

/**
 * User Fixtures
 * Pre-configured test data for user-related tests
 */

export interface UserFixtures {
  adminUser: {
    firstName: string;
    lastName: string;
    email: string;
    password: string;
    role: 'admin' | 'user' | 'readonly';
    permissions: string[];
  };
  regularUser: {
    firstName: string;
    lastName: string;
    email: string;
    password: string;
    role: 'admin' | 'user' | 'readonly';
    permissions: string[];
  };
  testUser: {
    firstName: string;
    lastName: string;
    email: string;
    password: string;
    role: 'admin' | 'user' | 'readonly';
    permissions: string[];
  };
}

export const test = base.extend<UserFixtures>({
  adminUser: async ({}, use) => {
    const user = UserDataBuilder.create()
      .withFirstName('Admin')
      .withLastName('User')
      .withRole('admin')
      .withPermissions(['read', 'write', 'delete', 'admin'])
      .build();

    await use(user);
  },

  regularUser: async ({}, use) => {
    const user = UserDataBuilder.create()
      .withFirstName('Regular')
      .withLastName('User')
      .withRole('user')
      .withPermissions(['read', 'write'])
      .build();

    await use(user);
  },

  testUser: async ({}, use) => {
    const user = UserDataBuilder.create()
      .withFirstName('Test')
      .withLastName('User')
      .withEmail(`test_${Date.now()}@tuliptech.com`)
      .withRole('user')
      .withPermissions(['read', 'write'])
      .build();

    await use(user);
  },
});
