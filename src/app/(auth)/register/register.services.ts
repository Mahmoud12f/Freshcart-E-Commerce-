import { userDataType } from "./register";
import { handleUserRegister } from "./register.action";

export async function sendUserData(userData: userDataType) {
    // إحنا بننادي السيرفر أكشن وبنرجع النتيجة للكومبوننت
    const response = await handleUserRegister(userData);
    
    // بنرجع الرد زي ما هو (سواء true أو رسالة الخطأ) 
    // والكومبوننت هو اللي هيقرر يظهر toast أو يحول الصفحة
    return response;
}