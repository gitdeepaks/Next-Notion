import { cn } from "@/lib/utils";
import Image from "next/image";
import { Button } from "./ui/button";
import { ImageIcon, X } from "lucide-react";
import { useCoverImage } from "@/hooks/use-cover-image";
import { api } from "@/convex/_generated/api";
import { useMutation } from "convex/react";
import { useParams } from "next/navigation";
import { Id } from "@/convex/_generated/dataModel";
import { useEdgeStore } from "@/lib/edgestore";
import { url } from "inspector";

interface CoverProps {
  url?: string;
  preview?: boolean;
}

export const Cover = ({ url, preview }: CoverProps) => {
  const params = useParams();
  const coverImage = useCoverImage();
  const removeCover = useMutation(api.documents.removeCoverImage);
  const { edgestore } = useEdgeStore();

  const onRemove = async () => {
    if (url) {
      await edgestore.publicFiles.delete({ url: url });
      removeCover({
        id: params.documentId as Id<"documents">,
      });
    }
  };
  return (
    <div
      className={cn("relative w-full h-[35vh] group", !url, url && "bg-muted")}
    >
      {!!url && <Image src={url} fill alt="Cover" className="object-cover" />}
      {url && !preview && (
        <div className="opacity-0 group-hover:opacity-100 absolute bottom-5 right-5 flex items-center gap-x-2">
          <Button
            onClick={() => coverImage.onReplace(url)}
            className="text-muted-foreground text-xs"
            variant="outline"
            size="sm"
          >
            <ImageIcon className="h-4 w04 mr-2" />
            Change Cover
          </Button>
          <Button
            onClick={onRemove}
            className="text-muted-foreground text-xs"
            variant="outline"
            size="sm"
          >
            <X className="h-4 w04 mr-2" />
            Remove Cover
          </Button>
        </div>
      )}
    </div>
  );
};
