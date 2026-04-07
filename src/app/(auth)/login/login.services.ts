
import { sendUserDataLogin } from "./login.action";
import { LoginData } from "./loginFormShap";

export async function handleLogin(data:LoginData){
    
   const message =await sendUserDataLogin(data);
   return message;

}