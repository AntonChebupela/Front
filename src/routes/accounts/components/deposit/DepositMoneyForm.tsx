import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import * as z from "zod"
import {
    Form,
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { useState } from "react"
import formSchema from "./depositMoneyFormSchema";
import api from "@/lib/http"

const DepositMoneyForm = ({ id }: { id: number }) => {
    const [isOpen, setIsOpen] = useState(false);
    const form = useForm<z.infer<typeof formSchema>>({ resolver: zodResolver(formSchema) })
    const onSubmit = (values: z.infer<typeof formSchema>) => {
        api.patch(`/v1/account/deposit/${id}`, values)
            .then(() => {
                form.reset()
                setIsOpen(false)
            })
    }
    return (
        <Dialog open={isOpen} onOpenChange={() => setIsOpen(!isOpen)}>
            <Button onClick={() => setIsOpen(true)} className="w-full">Пополнить</Button>
            <DialogContent className="bg-white">
                <DialogHeader>
                    <DialogTitle>Пополнить счет</DialogTitle>
                    <DialogDescription>
                        Сколько денег вы хотите положить на счет?
                    </DialogDescription>
                </DialogHeader>
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8 mx-4">
                        <FormField
                            control={form.control}
                            name="amount"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Сумма</FormLabel>
                                    <FormControl>
                                        <Input placeholder="10 000 ₽" {...field} />
                                    </FormControl>
                                    <FormDescription>
                                        Сумма для внесения
                                    </FormDescription>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <div className="flex justify-between">
                            <Button type="button" variant="secondary" onClick={() => setIsOpen(false)}>Отменить</Button>
                            <Button type="submit" >Пополнить</Button>
                        </div>
                    </form>
                </Form>
            </DialogContent>
        </Dialog>
    );
}

export default DepositMoneyForm;