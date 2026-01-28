/* eslint-disable @typescript-eslint/no-explicit-any */
import { NextResponse } from "next/server";
import { adminAuth } from "@/src/server/firebase/admin";

export async function POST(req: Request) {
    try {
        const { email } = await req.json();

        try {
            await adminAuth.getUserByEmail(email);

            await adminAuth.generatePasswordResetLink(email);
            console.log(`Reset email sent to ${email}`);
        } catch (error: any) {
            if (error.code === "auth/user-not-found") {
            } else {
                console.error("Unexpected error:", error);
            }
        }

        return NextResponse.json({
            success: true,
            message: `Письмо отправлено на введенный Email`,
        });
    } catch (error: any) {
        console.error("Reset password error:", error);
        return NextResponse.json({
            success: false,
            message: "Письмо не отправлено на введенный Email",
        });
    }
}
// export async function POST(req: Request) {
//   try {
//     const { email } = await req.json();

//     try {
//       await adminAuth.getUserByEmail(email);
      
//       // Только для существующих пользователей
//       await adminAuth.generatePasswordResetLink(email);
//       console.log(`✅ Reset email sent to ${email}`);
      
//       return NextResponse.json({
//         success: true,
//         message: `✅ Письмо отправлено на ${email}`,
//       });
      
//     } catch (error: any) {
//       if (error.code === "auth/user-not-found") {
//         console.log(`❌ User ${email} NOT FOUND`);
//         return NextResponse.json({  // ← ДОБАВЬ return!
//           success: false,
//           message: `❌ Пользователь ${email} не найден`,
//         });
//       } else {
//         console.error("Unexpected error:", error);
//         return NextResponse.json({
//           success: false,
//           message: "Ошибка сервера",
//         });
//       }
//     }

//     // Этот код НЕ ДОЙДЁТ при ошибке!
//     return NextResponse.json({
//       success: true,
//       message: `Письмо отправлено на введенный Email`,
//     });
//   } catch (error: any) {
//     console.error("Reset password error:", error);
//     return NextResponse.json({
//       success: false,
//       message: "Письмо не отправлено",
//     });
//   }
// }
