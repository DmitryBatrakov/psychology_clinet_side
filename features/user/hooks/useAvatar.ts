"use client";

import { useRef, useState } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { uploadAvatar } from "../api/uploadAvatar";
import { deleteAvatar } from "../api/deleteAvatar";
import { notify } from "@/lib/notify";

interface UseAvatarOptions {
    uid: string | null;
    currentPhotoUrl: string | null | undefined;
    onUrlChange: (url: string | null) => void;
}

export function useAvatar({ uid, currentPhotoUrl, onUrlChange }: UseAvatarOptions) {
    const queryClient = useQueryClient();
    const fileInputRef = useRef<HTMLInputElement>(null);
    const [avatarPreview, setAvatarPreview] = useState<string | null>(null);
    // URL старого фото — удаляем из R2 только после успешного сохранения профиля
    const pendingDeleteUrl = useRef<string | null>(null);

    const { mutate: upload, isPending: isUploading } = useMutation({
        mutationFn: uploadAvatar,
        onSuccess: ({ url }) => {
            onUrlChange(url);
            notify.success("תמונה הועלתה בהצלחה");
        },
        onError: (err: Error) => {
            setAvatarPreview(null);
            pendingDeleteUrl.current = null;
            notify.error(err.message ?? "שגיאה בהעלאת תמונה");
        },
    });

    const { mutate: remove, isPending: isDeleting } = useMutation({
        mutationFn: deleteAvatar,
        onSuccess: () => {
            onUrlChange(null);
            setAvatarPreview(null);
            if (uid) {
                queryClient.invalidateQueries({ queryKey: ["user", uid] });
            }
        },
        onError: (err: Error) => {
            notify.error(err.message ?? "שגיאה במחיקת התמונה");
        },
    });

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        e.target.value = "";
        if (!file) return;

        // Запоминаем текущий URL — удалим из R2 после сохранения профиля
        if (currentPhotoUrl) {
            pendingDeleteUrl.current = currentPhotoUrl;
        }

        setAvatarPreview(URL.createObjectURL(file));
        upload(file);
    };

    const handleRemove = () => {
        if (!currentPhotoUrl) return;
        remove(currentPhotoUrl);
    };

    // Вызывается из onSuccess профиля — чистит preview и удаляет старое фото из R2
    const onProfileSaved = () => {
        setAvatarPreview(null);
        const oldUrl = pendingDeleteUrl.current;
        pendingDeleteUrl.current = null;
        if (oldUrl) {
            deleteAvatar(oldUrl).catch(() => {
                // не блокируем UX — старый файл просто останется в R2
            });
        }
    };

    return {
        fileInputRef,
        avatarPreview,
        isUploading,
        isDeleting,
        handleFileChange,
        handleRemove,
        onProfileSaved,
    };
}
