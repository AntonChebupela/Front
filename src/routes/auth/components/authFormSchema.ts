import z from "zod";

const formSchema = z.object({
    email: z.string().email(),
    password: z.string().min(8)
})
export default formSchema;