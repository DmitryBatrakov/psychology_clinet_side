import { useMutation } from "@tanstack/react-query";
import { uploadDocument } from "../api/uploadDocument";

export function useUploadDocuments() {
    const { mutateAsync, isPending } = useMutation({
        mutationFn: (files: File[]) => Promise.all(files.map(uploadDocument)),
    });

    return { uploadDocuments: mutateAsync, isUploading: isPending };
}
