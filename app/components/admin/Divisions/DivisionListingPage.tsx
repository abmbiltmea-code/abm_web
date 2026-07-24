"use client";

import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { RiDeleteBinLine, RiEyeLine, RiEyeOffLine } from "react-icons/ri";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";

interface DivisionListItem {
  _id: string;
  slug: string;
  name: string;
  isHidden: boolean;
}

export default function DivisionsListPage() {
  const router = useRouter();
  const [divisions, setDivisions] = useState<DivisionListItem[]>([]);
  const [deleteTarget, setDeleteTarget] = useState<DivisionListItem | null>(
    null,
  );
  const [isDeleting, setIsDeleting] = useState(false);

  const fetchData = async () => {
    try {
      const res = await fetch("/api/admin/divisions");
      const contentType = res.headers.get("content-type");
      if (!res.ok || !contentType?.includes("application/json")) {
        toast.error("Failed to load divisions");
        return;
      }
      const { data } = await res.json();
      setDivisions(data || []);
    } catch (e) {
      console.error(e);
      toast.error("Failed to load divisions");
    }
  };

  const toggleHidden = async (e: React.MouseEvent, division: DivisionListItem) => {
    e.stopPropagation();
    try {
      const res = await fetch(`/api/admin/divisions/${division._id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ isHidden: !division.isHidden }),
      });
      if (res.ok) {
        setDivisions((prev) =>
          prev.map((d) =>
            d._id === division._id ? { ...d, isHidden: !d.isHidden } : d,
          ),
        );
        toast.success(division.isHidden ? "Division shown" : "Division hidden");
      } else {
        const { message } = await res.json();
        toast.error(message);
      }
    } catch {
      toast.error("Something went wrong");
    }
  };

  const confirmDelete = async () => {
    if (!deleteTarget) return;
    setIsDeleting(true);
    try {
      const res = await fetch(`/api/admin/divisions/${deleteTarget._id}`, {
        method: "DELETE",
      });
      if (res.ok) {
        setDivisions((prev) => prev.filter((d) => d._id !== deleteTarget._id));
        toast.success("Division deleted");
        setDeleteTarget(null);
      } else {
        const { message } = await res.json();
        toast.error(message);
      }
    } catch {
      toast.error("Something went wrong");
    } finally {
      setIsDeleting(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div className="flex flex-col gap-5">
      <div className="bg-white border border-black/20 rounded-xl p-5 flex flex-col gap-4">
        <div className="flex items-center justify-between border-b border-black/20 pb-3">
          <Label className="text-base font-bold">Divisions</Label>
          <Button
            type="button"
            addItem
            onClick={() => router.push("/admin/divisions/new")}
          >
            + Add Division
          </Button>
        </div>
        <div className="grid grid-cols-1 gap-5">
          {divisions.length === 0 && (
            <p className="text-sm text-black/40">No divisions added yet.</p>
          )}
          {divisions.map((division) => (
            <div
              key={division._id}
              className="flex items-center justify-between border border-black/10 rounded-md px-4 py-3 hover:shadow-sm transition-all cursor-pointer"
              onClick={() => router.push(`/4bm-4dm1n/divisions/${division._id}`)}
            >
              <span className="text-sm font-medium flex flex-col items-start gap-2">
                {division.name || "Untitled Division"}
                <span className="text-xs text-black/40">{division.slug}</span>
                {division.isHidden && (
                  <span className="text-[10px] uppercase font-semibold text-red-500 border border-red-300 rounded px-1.5 py-0.5">
                    Hidden
                  </span>
                )}
              </span>
              <div className="flex items-center gap-3">
                <button onClick={(e) => toggleHidden(e, division)} type="button" className="cursor-pointer">
                  {division.isHidden ? (
                    <RiEyeOffLine className="text-gray-500" size={22} />
                  ) : (
                    <RiEyeLine className="text-green-600" size={22} />
                  )}
                </button>
                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    setDeleteTarget(division);
                  }}
                >
                  <RiDeleteBinLine
                    className="text-red-400 hover:text-red-600 hover:scale-110 transition-all cursor-pointer"
                    size={22}
                  />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Delete confirm dialog */}
      <Dialog
        open={!!deleteTarget}
        onOpenChange={(open) => !open && setDeleteTarget(null)}
      >
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Delete Division</DialogTitle>
          </DialogHeader>
          <p className="text-sm text-black/60">
            Are you sure you want to delete{" "}
            <span className="font-semibold font-tasa text-secondary">{deleteTarget?.name}</span>? This
            cannot be undone.
          </p>
          <DialogFooter>
            <Button variant="outline" type="button" onClick={() => setDeleteTarget(null)}>
              No
            </Button>
            <Button
              type="button"
              disabled={isDeleting}
              onClick={confirmDelete}
            >
              {isDeleting ? "Deleting..." : "Yes, Delete"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}