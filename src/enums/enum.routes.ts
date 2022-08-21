export enum routesEnum {
  // User
  ME = 'me',
  CREATE_USER = 'create-user',
  USER_BY_ID = 'by-id',
  CHECK_EMAIL = 'check-email',
  NEW_REGISTRATION = 'new-registration',

  // Auth
  SIGN_IN = 'signin',
  SIGN_UP = 'signup',
  LOGOUT = 'logout',

  // Element
  CREATE_ELEMENT = 'create-element',
  GET_ALL_ELEMENTS = 'get-all-elements',
  GET_ELEMENT_BY_ID = 'get-element-by-id',
  GET_ELEMENT_BY_CODE = 'get-element-by-code',

  INITIAL_ROUTE = '/',
  CONFIRM_PAYMENT = 'confirm-payment',
}
