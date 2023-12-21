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
import { Checkbox } from "@/components/ui/checkbox"
import { Button } from "@/components/ui/button"
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover"

import { cn } from "@/lib/utils"
import { useCallback, useContext, useState } from "react"
import {
    Command,
    CommandEmpty,
    CommandGroup,
    CommandInput,
    CommandItem,
} from "@/components/ui/command"
import formSchema from "./createAccountFormSchema";
import { ChevronsUpDown, Check } from "lucide-react"
import { IAccount } from "@/models/IAccount"
import { toast } from "@/components/ui/use-toast"
import { Context } from "@/main"

const CreateAccountForm = ({ id }: { id: number }) => {
    const {store} = useContext(Context)
    const [isOpen, setIsOpen] = useState(false);
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            balance: 0,
            overdraftAllowed: false,
            type: "DEBIT"
        },
    })
    const accountTypes = [
        {
            id: "DEBIT",
            label: "Дебетовый счет",
        },
        {
            id: "CREDIT",
            label: "Кредитный счет"
        },
        {
            id: "SAVING",
            label: "Накопительный счет"
        },
        {
            id: "BROKERAGE",
            label: "Брокерский счет"
        }
    ]
    const onError = useCallback(() => {
        if (store.error) {
            let description;
            if (store.error === 409) {
                description = 'У вас уже есть счет такого типа'
            } 
            store.setError(undefined)
            toast({
                variant: 'destructive',
                title: "Ошибка!",
                description,
                duration: 2500
            })
        }else {
            toast({
                variant: 'default',
                title: "Успех",
                description: "Аккаунт успешно создан",
                duration: 2500
            })
            setIsOpen(false)
        }
    }, [store])
    const onSubmit = (values: z.infer<typeof formSchema>) => {
        const newAccount: IAccount = {
            type: values.type,
            userId: id,
            overdraftAllowed: values.overdraftAllowed,
            balance: 0
        }
        store.createAccount(newAccount)
        .then(() => onError())
    }
    return (
        <Dialog open={isOpen} onOpenChange={() => setIsOpen(!isOpen)}>
            <Button onClick={() => setIsOpen(true)}>Открыть новый счет</Button>
            <DialogContent className="bg-white">
                <DialogHeader>
                    <DialogTitle>Открыть новый счет</DialogTitle>
                    <DialogDescription>
                        Настройте новый счет
                    </DialogDescription>
                </DialogHeader>
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8 mx-4">
                        <FormField
                            control={form.control}
                            name="overdraftAllowed"
                            render={({ field }) => (
                                <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4">
                                    <FormControl>
                                        <Checkbox
                                            checked={field.value}
                                            onCheckedChange={field.onChange}
                                        />
                                    </FormControl>
                                    <div className="space-y-1 leading-none">
                                        <FormLabel>
                                            Разрешить овердрафт?
                                        </FormLabel>
                                        <FormDescription>
                                            Ваш баланс сможет становиться отрицательным
                                        </FormDescription>
                                    </div>
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="type"
                            render={({ field }) => (
                                <FormItem className="flex flex-col">
                                    <FormLabel>Тип счета</FormLabel>
                                    <Popover>
                                        <PopoverTrigger asChild>
                                            <FormControl>
                                                <Button
                                                    variant="outline"
                                                    role="combobox"
                                                    className={cn(
                                                        "w-auto justify-between",
                                                        !field.value && "text-muted-foreground"
                                                    )}
                                                >
                                                    {field.value
                                                        ? accountTypes.find(
                                                            (accountType) => accountType.id === field.value
                                                        )?.label
                                                        : "Выбрать тип счета"}
                                                    <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                                                </Button>
                                            </FormControl>
                                        </PopoverTrigger>
                                        <PopoverContent className="w-[200px] p-0">
                                            <Command>
                                                <CommandInput placeholder="Найти тип    ..." />
                                                <CommandEmpty>Тип не найден.</CommandEmpty>
                                                <CommandGroup>
                                                    {accountTypes.map((accountType) => (
                                                        <CommandItem
                                                            value={accountType.label}
                                                            key={accountType.id}
                                                            onSelect={() => {
                                                                form.setValue("type", accountType.id)
                                                            }}
                                                        >
                                                            <Check
                                                                className={cn(
                                                                    "mr-2 h-4 w-4",
                                                                    accountType.id === field.value
                                                                        ? "opacity-100"
                                                                        : "opacity-0"
                                                                )}
                                                            />
                                                            {accountType.label}
                                                        </CommandItem>
                                                    ))}
                                                </CommandGroup>
                                            </Command>
                                        </PopoverContent>
                                    </Popover>
                                    <FormDescription>
                                        Это тип вашего нового счета
                                    </FormDescription>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <div className="flex justify-between">
                            <Button type="button" variant="secondary" onClick={() => setIsOpen(false)}>Отменить</Button>
                            <Button type="submit" >Открыть</Button>
                        </div>
                    </form>
                </Form>
            </DialogContent>
        </Dialog>
    );
}

export default CreateAccountForm;