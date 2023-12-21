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
import { useCallback, useContext, useState } from "react"
import formSchema from "./withdrawFromSchema";
import { toast } from "@/components/ui/use-toast"
import { Context } from "@/main"

const WithdrawMoneyForm = ({ id }: { id: number }) => {
    const { store } = useContext(Context)
    const [isOpen, setIsOpen] = useState(false);
    const form = useForm<z.infer<typeof formSchema>>({ resolver: zodResolver(formSchema) })

    const onError = useCallback(() => {
        if (store.error) {
            let description;
            if (store.error === 400) {
                description = 'У вас недостаточного денег на счете'
            }
            store.setError(undefined)
            toast({
                variant: 'destructive',
                title: "Ошибка!",
                description,
                duration: 2500
            })
        } else {
            toast({
                variant: 'default',
                title: "Успех",
                description: "Деньги сняты",
                duration: 2500
            })
            setIsOpen(false)
        }
    }, [store])

    const onSubmit = (values: z.infer<typeof formSchema>) => {
        store.withdrawMoney(values.amount, id)
            .then(() => onError());
    }
    return (
        <Dialog open={isOpen} onOpenChange={() => setIsOpen(!isOpen)}>
            <Button onClick={() => setIsOpen(true)} className="w-full" variant="secondary">Снять</Button>
            <DialogContent className="bg-white">
                <DialogHeader>
                    <DialogTitle>Снять со счета</DialogTitle>
                    <DialogDescription>
                        Сколько денег вы хотите снят со счета?
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
                                        Сумма для снятия
                                    </FormDescription>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <div className="flex justify-between">
                            <Button type="button" variant="secondary" onClick={() => setIsOpen(false)}>Отменить</Button>
                            <Button type="submit" >Снять</Button>
                        </div>
                    </form>
                </Form>
            </DialogContent>
        </Dialog>
    );
}

export default WithdrawMoneyForm;