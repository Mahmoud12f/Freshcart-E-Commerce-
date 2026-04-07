import { toast } from "sonner";
import { RegisterResponse, User, userDataType } from "./register";
import { handleUserRegister } from "./register.action";

export async function sendUserData(userData:userDataType){
 const response = await handleUserRegister(userData)
    if(response === true){
        toast.success('User Added Successfully',{
            position: "top-right"
        })
    }
    else{
        toast.error(response,{
            position: "top-right"
        })
    }
}