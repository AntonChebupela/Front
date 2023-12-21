import {
    AlertDialog,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
} from "@/components/ui/alert-dialog"
import { Button } from "@/components/ui/button";
import { useState } from "react";
import api from "@/lib/http";
import { Trash } from "lucide-react";
import { useNavigate } from "react-router-dom";

const DeleteAccountDialog = ({ id, name }: { id: number, name: string }) => {
    const [isOpen, setIsOpen] = useState(false);
    const navigate = useNavigate();
    const deleteItem = async () => {
        await api.delete(`/v1/account/${id}`)
            .then(() => navigate("/profile"));
    }
    return (
        <AlertDialog open={isOpen} onOpenChange={() => setIsOpen(!open)}>
            <Button onClick={() => setIsOpen(true)} variant="ghost" className="flex flex-row gap-x-2"> <Trash size={15} />Удалить</Button>
            <AlertDialogContent className="bg-white">
                <AlertDialogHeader>
                    <AlertDialogTitle>Вы точно хотите удалить {name}?</AlertDialogTitle>
                    <AlertDialogDescription>
                        Это действие нельзя отменить. Счет будет навсегда удален из базы данных.
                    </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                    <AlertDialogCancel>Отменить</AlertDialogCancel>
                    <Button variant="destructive" onClick={deleteItem}>Да, удалить</Button>
                </AlertDialogFooter>
            </AlertDialogContent>
        </AlertDialog>

    );
}

export default DeleteAccountDialog;