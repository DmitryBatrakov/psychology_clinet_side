import { NextRequest, NextResponse } from 'next/server';
import { getErrorMessage, type ApiError } from '@/lib/api-error'; // твой тип!
import { adminAuth, adminDb, adminFieldValue } from '@/src/server/firebase/admin';

export async function POST(request: NextRequest) {
  try {
    const { idToken } = await request.json();
    
    const decodedToken = await adminAuth.verifyIdToken(idToken);
    const uid = decodedToken.uid;
    
    const userDoc = await adminDb.collection("users").doc(uid).get();
    
    if (!userDoc.exists) {
      await adminDb.collection("users").doc(uid).set({
        role: "user",
        profileComplete: false,
        balance: 0,
        email: decodedToken.email,
        createdAt: adminFieldValue.serverTimestamp(),
      });
    }
    
    const customToken = await adminAuth.createCustomToken(uid);

    return NextResponse.json({ customToken });
  } catch (error: unknown) {
    console.error('Google login error:', error);
    
    const errorMessage = getErrorMessage(error);
    
    return NextResponse.json(
      { 
        message: errorMessage,
        code: error instanceof Error && 'code' in error ? error.code : undefined,
        status: 500 
      } as ApiError,
      { status: 500 }
    );
  }
}
