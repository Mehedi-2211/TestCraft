/**
 * Test Data Generators and Builders
 * Provides utilities for creating test data
 */

/**
 * Generate a random email address
 */
export function generateEmail(domain: string = 'test.com'): string {
  const timestamp = Date.now();
  const random = Math.random().toString(36).substring(7);
  return `test_${timestamp}_${random}@${domain}`;
}

/**
 * Generate a random username
 */
export function generateUsername(): string {
  return `user_${Date.now()}_${Math.random().toString(36).substring(7)}`;
}

/**
 * Generate a strong password
 */
export function generatePassword(): string {
  const length = 12;
  const charset = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%^&*';
  let password = '';
  for (let i = 0; i < length; i++) {
    password += charset.charAt(Math.floor(Math.random() * charset.length));
  }
  return password;
}

/**
 * Generate a random device ID
 */
export function generateDeviceId(prefix: string = 'DEV'): string {
  const timestamp = Date.now().toString(36);
  const random = Math.random().toString(36).substring(2, 8);
  return `${prefix}-${timestamp}-${random}`;
}

/**
 * Generate a random MAC address
 */
export function generateMacAddress(): string {
  const hex = () => Math.floor(Math.random() * 256).toString(16).padStart(2, '0');
  return `${hex()}:${hex()}:${hex()}:${hex()}:${hex()}:${hex()}`;
}

/**
 * Generate a random serial number
 */
export function generateSerialNumber(prefix: string = 'SN'): string {
  const timestamp = Date.now().toString().slice(-6);
  const random = Math.random().toString(36).substring(2, 6).toUpperCase();
  return `${prefix}${timestamp}${random}`;
}

/**
 * Generate a random phone number
 */
export function generatePhoneNumber(): string {
  return `+1${Math.floor(Math.random() * 9000000000) + 1000000000}`;
}

/**
 * Generate a random company name
 */
export function generateCompanyName(): string {
  const adjectives = ['Tech', 'Global', 'Digital', 'Smart', 'Cloud'];
  const nouns = ['Solutions', 'Systems', 'Inc', 'Corp', 'Labs'];
  const adjective = adjectives[Math.floor(Math.random() * adjectives.length)];
  const noun = nouns[Math.floor(Math.random() * nouns.length)];
  return `${adjective}${noun}`;
}

/**
 * Generate a random integer within range
 */
export function randomInt(min: number, max: number): number {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

/**
 * Pick a random item from array
 */
export function randomItem<T>(array: T[]): T {
  return array[Math.floor(Math.random() * array.length)];
}

/**
 * Generate a random date within range
 */
export function randomDate(start: Date, end: Date): Date {
  return new Date(start.getTime() + Math.random() * (end.getTime() - start.getTime()));
}

/**
 * User Data Builder Pattern
 */
export class UserDataBuilder {
  private data: Partial<User> = {};

  static create(): UserDataBuilder {
    return new UserDataBuilder();
  }

  withEmail(email: string): this {
    this.data.email = email;
    return this;
  }

  withUsername(username: string): this {
    this.data.username = username;
    return this;
  }

  withPassword(password: string): this {
    this.data.password = password;
    return this;
  }

  withRole(role: 'admin' | 'user' | 'guest' | 'readonly'): this {
    this.data.role = role;
    return this;
  }

  withPermissions(permissions: string[]): this {
    this.data.permissions = permissions;
    return this;
  }

  withFirstName(firstName: string): this {
    this.data.firstName = firstName;
    return this;
  }

  withLastName(lastName: string): this {
    this.data.lastName = lastName;
    return this;
  }

  withPhoneNumber(phone: string): this {
    this.data.phone = phone;
    return this;
  }

  withCompanyName(company: string): this {
    this.data.company = company;
    return this;
  }

  build(): User {
    return {
      email: this.data.email || generateEmail(),
      username: this.data.username || generateUsername(),
      password: this.data.password || generatePassword(),
      role: this.data.role || 'user',
      permissions: this.data.permissions || ['read'],
      firstName: this.data.firstName || 'Test',
      lastName: this.data.lastName || 'User',
      phone: this.data.phone || generatePhoneNumber(),
      company: this.data.company || generateCompanyName(),
      createdAt: new Date(),
    };
  }
}

/**
 * Device Data Builder Pattern
 */
export class DeviceDataBuilder {
  private data: Partial<Device> = {};

  static create(): DeviceDataBuilder {
    return new DeviceDataBuilder();
  }

  withName(name: string): this {
    this.data.name = name;
    return this;
  }

  withDeviceId(deviceId: string): this {
    this.data.deviceId = deviceId;
    return this;
  }

  withSerialNumber(serial: string): this {
    this.data.serialNumber = serial;
    return this;
  }

  withMacAddress(mac: string): this {
    this.data.macAddress = mac;
    return this;
  }

  withType(type: 'mobile' | 'tablet' | 'desktop' | 'laptop' | 'other'): this {
    this.data.type = type;
    return this;
  }

  withStatus(status: 'active' | 'inactive' | 'lost' | 'stolen'): this {
    this.data.status = status;
    return this;
  }

  withOs(os: string): this {
    this.data.os = os;
    return this;
  }

  build(): Device {
    return {
      name: this.data.name || `Device-${Date.now()}`,
      deviceId: this.data.deviceId || generateDeviceId(),
      serialNumber: this.data.serialNumber || generateSerialNumber(),
      macAddress: this.data.macAddress || generateMacAddress(),
      type: this.data.type || 'mobile',
      status: this.data.status || 'active',
      os: this.data.os || 'iOS 17',
      createdAt: new Date(),
    };
  }
}

/**
 * Type definitions
 */
export interface User {
  email: string;
  username: string;
  password: string;
  role: 'admin' | 'user' | 'guest' | 'readonly';
  permissions: string[];
  firstName: string;
  lastName: string;
  phone: string;
  company: string;
  createdAt: Date;
}

export interface Device {
  name: string;
  deviceId: string;
  serialNumber: string;
  macAddress: string;
  type: 'mobile' | 'tablet' | 'desktop' | 'laptop' | 'other';
  status: 'active' | 'inactive' | 'lost' | 'stolen';
  os: string;
  createdAt: Date;
}
