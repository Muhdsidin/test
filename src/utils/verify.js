import jwt from "jsonwebtoken"
const SECRET = new TextEncoder().encode('HELLO_WORLD')
import { jwtVerify } from 'jose'

export async function verifyToken(token) {
  try {
    console.log(token, "========================")
    const test = await jwtVerify(token, SECRET)
    console.log(test.payload , "testttttttttttttttttttttttttttttttttttttttttttttttt")
    return test.payload
  } catch (error) {
    console.error("JWT verification failed:", error.message)
    return null
  }
}
