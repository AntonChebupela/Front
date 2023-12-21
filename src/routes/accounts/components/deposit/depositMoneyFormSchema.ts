import z from "zod";

const formSchema = z.object({
    amount: z.coerce.number().positive()
})
export default formSchema;