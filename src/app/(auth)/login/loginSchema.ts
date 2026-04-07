import * as zod from "zod"

export const schemaLogin = zod.object({
   
    email: zod.string().regex(/^((?!\.)[\w\-_.]*[^.])(@\w+)(\.\w+(\.\w+)?[^.\W])$/, 'Enter Valid Email'),
    password: zod.string().regex(/^(?=.*\d)(?=.*[A-Z])(?=.*[a-z])(?=.*[^\w\d\s:])([^\s]){8,16}$/, 'Enter Valid Password'),
   
})