import { NextResponse } from 'next/server'
import jwt from 'jsonwebtoken'
import { cookies } from 'next/headers'

const SECRET = 'HELLO_WORLD'

export async function POST(req) {
    const { email, password } = await req.json()
    
    // Dummy credentials check
    if (email === 'admin@example.com' && password === 'password') {
      const cookieStore = await cookies()
    const token = jwt.sign({ email }, SECRET, { expiresIn: '7d' })

    
    

    return  NextResponse.json({ success: true , token})
    
  

  }

  return NextResponse.json({ error: 'Email or Password is Incorrect' }, { status: 401 })
}
