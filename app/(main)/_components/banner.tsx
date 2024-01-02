"use client";

import { Button } from "@/components/ui/button";
import { api } from "@/convex/_generated/api";
import { Id } from "@/convex/_generated/dataModel";
import { useMutation } from "convex/react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { ConfirmModal } from "@/components/modals/confirm-modal";

interface BannerProps {
  documentId: Id<"documents">;
}

export const Banner = ({ documentId }: BannerProps) => {
  const router = useRouter();
  const removee = useMutation(api.documents.remove);
  const restoree = useMutation(api.documents.restore);

  const onRemove = () => {
    const promise = removee({ id: documentId });

    toast.promise(promise, {
      loading: "Removing document...",
      success: "Document removed",
      error: "Failed to remove document",
    });
    router.push("/documents");
  };

  const onRestore = () => {
    const promise = restoree({ id: documentId });
    toast.promise(promise, {
      loading: "Restoring document...",
      success: "Document restored",
      error: "Failed to restore document",
    });

    router.push("/documents");
  };

  return (
    <div className="w-full bg-rose-500 text-center text-sm p-2 text-white flex items-center gap-x-2 justify-center">
      <p>This page is in the Trash</p>
      <Button
        size="sm"
        onClick={onRestore}
        variant="outline"
        className="border-white bg-transparent hover:bg-primary/5 text-white hove:text-white hover:border-white p-1 px-2 h-auto font-normal"
      >
        Restore Page
      </Button>
      <ConfirmModal onConfirm={onRemove}>
        <Button
          size="sm"
          variant="outline"
          className="border-white bg-transparent hover:bg-primary/5 text-white hove:text-white hover:border-white p-1 px-2 h-auto font-normal"
        >
          Delete Forever
        </Button>
      </ConfirmModal>
    </div>
  );
};
