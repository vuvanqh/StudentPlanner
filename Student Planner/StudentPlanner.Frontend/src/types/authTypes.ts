export type loginRequest = {
    email: string,
    password: string
}

export type loginResponse = {
  token: string,
  firstName: string,
  lastName: string,
  email: string,
  userRole: string
}

export type registerRequest = {
    email: string,
    password: string
}