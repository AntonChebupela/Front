import * as z from 'zod';
const formSchema = z.object({
    amount: z.coerce.number(),
})
export default formSchema;