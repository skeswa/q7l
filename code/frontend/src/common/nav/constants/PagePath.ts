export enum AdminPagePath {
  Home = '/',
}

export enum ExternalPagePath {
  About = 'about',
  ContactUs = 'contact',
  Login = 'login',
  Register = 'register',
  Splash = '/',
}

export enum StudentPagePath {
  Home = '/',
}

export type PagePath = AdminPagePath | ExternalPagePath | StudentPagePath
