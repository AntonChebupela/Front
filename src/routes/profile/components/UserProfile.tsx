import { AlertDialog, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle } from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import { Context } from "@/main";
import { IUser } from "@/models/IUser";
import { Label } from "@radix-ui/react-label";
import { FC, useState, useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";

interface UserProfileProps {
    user: IUser
}

const UserProfile: FC<UserProfileProps> = ({ user }) => {
    const [role, setRole] = useState("Клиент")
    const [open, setOpen] = useState(false)
    const { store } = useContext(Context);
    const navigate = useNavigate()
    useEffect(() => {
        if (user.role === "EMPLOYEE") {
            setRole("Сотдрудник")
        }
    }, []);
    const onClick = async () => {
        await store.logout()
        .finally(() => navigate('/auth'))

    }
    return (
        <div className="w-full flex flex-col gap-y-4">
            <div>
                <h1 className="text-2xl font-bold tracking-tight">Данные пользователя</h1>
                <div className="flex flex-col gap-y-4 rounded-lg shadow-md bg-white p-4 mt-4">
                    <div className="flex flex-row gap-x-4">
                        <Label className="font-bold tracking-tight">Почта</Label>
                        <span>{user.email}</span>
                    </div>
                    <div className="flex flex-row gap-x-4">
                        <Label className="font-bold tracking-tight">Роль</Label>
                        <span>{role}</span>
                    </div>
                </div>
            </div>
            <AlertDialog open={open} onOpenChange={() => setOpen(!open)}>
                <Button onClick={() => setOpen(true)} variant="outline" className="flex flex-row gap-x-2">Выйти</Button>
                <AlertDialogContent className="bg-white flex flex-col gap-y-8">
                    <AlertDialogHeader>
                        <AlertDialogTitle>Вы уверены что хотите выйти?</AlertDialogTitle>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                        <AlertDialogCancel>Отменить</AlertDialogCancel>
                        <Button variant="destructive" onClick={onClick}>Да, выйти</Button>
                    </AlertDialogFooter>
                </AlertDialogContent>
            </AlertDialog>
        </div>

    );
}

export default UserProfile;