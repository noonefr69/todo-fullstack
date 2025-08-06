"use client";

import { useState, useTransition } from "react";
import { Dialog, DialogTrigger, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Edit } from "lucide-react";
import { handleUpdate } from "@/actions/hadleTodoActions";
import { useRouter } from "next/navigation";

type Props = {
  id: string;
  initialTitle: string;
};

export default function EditDialog({ id, initialTitle }: Props) {
  const [title, setTitle] = useState(initialTitle);
  const [isPending, startTransition] = useTransition();
  const router = useRouter();

  const handleSubmit = () => {
    startTransition(async () => {
      try {
        await handleUpdate(id, title);
        router.refresh();
      } catch (error) {
        console.error("Update failed:", error);
      }
    });
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Edit
          size={20}
          className="cursor-pointer duration-300 text-slate-500 dark:text-slate-400 dark:hover:text-slate-50 hover:text-slate-800"
        />
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Edit Todo</DialogTitle>
        </DialogHeader>
        <Input value={title} onChange={(e) => setTitle(e.target.value)} />
        <DialogFooter>
          <Button className="cursor-pointer" disabled={isPending} onClick={handleSubmit}>
            Save
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
