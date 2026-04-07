import * as zod from "zod"

export const schema = zod.object({
    name: zod.string().nonempty("Name is Required"),
    email: zod.string().regex(/^((?!\.)[\w\-_.]*[^.])(@\w+)(\.\w+(\.\w+)?[^.\W])$/, 'Enter Valid Email'),
    password: zod.string().regex(/^(?=.*\d)(?=.*[A-Z])(?=.*[a-z])(?=.*[^\w\d\s:])([^\s]){8,16}$/, 'Enter Valid Password'),
    rePassword: zod.string(),
    phone: zod.string().regex(/^01[0125][0-9]{8}$/, 'Must Be Egyptain Number')
}).refine((data) => data.password === data.rePassword, {
  path: ["rePassword"],
  message: "Password and Confirm Password should match", // Fixed key and typo
});