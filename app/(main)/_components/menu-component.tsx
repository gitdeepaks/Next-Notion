"use client";

import { Id } from "@/convex/_generated/dataModel";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useRouter } from "next/navigation";
import { useUser } from "@clerk/clerk-react";
import { useMutation } from "convex/react";
import { api } from "@/convex/_generated/api";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { MoreHorizontal, Trash } from "lucide-react";
import { Skeleton } from "@/components/ui/skeleton";

interface MenuComponentProps {
  documentId: Id<"documents">;
}

export const MenuComponent = ({ documentId }: MenuComponentProps) => {
  const router = useRouter();
  const { user } = useUser();

  const archivee = useMutation(api.documents.archive);

  const onArchive = () => {
    const promise = archivee({ id: documentId });

    toast.promise(promise, {
      loading: "Archiving document...",
      success: "Document archived",
      error: "Failed to archive document",
    });

    router.push("/documents");
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger>
        <Button size="sm" variant="ghost">
          <MoreHorizontal className="h-4 w-4" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent
        className="w-60"
        align="end"
        alignOffset={8}
        forceMount
      >
        <DropdownMenuItem onClick={onArchive}>
          <Trash className="h-4 w-4 mr-2" />
          Delete
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <div className="text-xs text-muted-foreground p-2">
          Last edited by {user?.fullName}
        </div>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

MenuComponent.Skeleton = function MenuComponentSkeleton() {
  return <Skeleton className="h-10 w-10" />;
};
