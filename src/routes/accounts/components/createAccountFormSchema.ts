import * as z from 'zod';
const formSchema = z.object({
    balance: z.coerce.number(),
    overdraftAllowed: z.boolean(),
    type: z.string()
})
export default formSchema;