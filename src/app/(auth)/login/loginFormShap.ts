// بيانات تسجيل الدخول
export interface LoginData {
  email: string;
  password?: string; // علامة الاستفهام لو الحقل اختياري في بعض الحالات
}

// شكل الرد اللي جاي من الـ API (Response)
export interface AuthResponse {
  message: string;
  user?: {
    name: string;
    email: string;
    role: string;
  };
  token?: string;
  statusMsg?: string; // بعض الـ APIs بترجع ده في حالة الخطأ
}