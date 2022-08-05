export enum errorEnum {
  INVALID_EMAIL_OR_PASS = 'Invalid email or password',
  USER_EXISTS = 'This user already exists',
  CODE_EXISTS = 'This code is already in use',
  INVALID_ID = 'Invalid id',
  CODE_NOT_EMPTY = 'Code cannot be empty',
  USER_NOT_FOUND = 'User not found',
  INVALID_TOKEN = 'Invalid token',
  TOKEN_EXPIRED = 'Token expired',
  TOKEN_NOT_FOUND = 'Token not found',
  INVALID_PHONE_NUMBER = 'Invalid phone number',
  PASSWORD_CANNOT_EMPTY = 'The password field cannot be empty.',
  PASSWORD_MUST_CONTAIN_AT_LEAST_ONE_NUMBER = 'The password must contain at least one number, , one uppercase letter, one special character and at least 8 characters.',
  PASSWORD_AT_LEASTED_8_CHARACTERS = 'The password must be at least 8 characters.',
  EMAIL_CANNOT_EMPTY = 'The email field cannot be empty.',
  EMAIL_MAX_LENGTH = 'The email cannot be longer than 60 characters.',
  NAME_MIN_LENGTH = 'The name must be at least 3 characters.',
  NAME_IS_REQUIRED = 'The name is required.',
  VALID_EMAIL_REQUIRED = 'A valid email address is required.',
  ELEMENT_NOT_FOUND = 'Element not found',
}