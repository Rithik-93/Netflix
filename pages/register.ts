import bcrypt from 'bcrypt';
import { NextApiRequest, NextApiResponse } from 'next';
import prismadb from '@/lib/prismadb'
import { NextResponse } from 'next/server';

export async function POST(req : Request ) {
    if (req.method !== 'POST') {
        return NextResponse.json({ status: 403 });
    }

    try {
        const {email, name, password} = await req.json();
        const existingUser = await prismadb.user.findUnique({
            where : {
                email : email
            }
        });

        if (existingUser) {
            return NextResponse.json({ message: "Email already taken" }, { status: 422 });
        }
        
        const hashedPassword = await bcrypt.hash(password, 12);

        const user = await prismadb.user.create({
            data: {
                email,
                hashedPassword,
                name,
                emailVerified : new Date(),
                image : ""   
            }
        });

        return NextResponse.json({ message: user }, { status: 200 });

    } catch(error) {
        console.log(error)
        
        return NextResponse.json({ message: "error" }, { status: 400 });
    }
}
