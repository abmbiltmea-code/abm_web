"use client";

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Controller, useForm } from "react-hook-form";
import { ImageUploader } from "@/components/ui/image-uploader";
import { Textarea } from "@/components/ui/textarea";
import AdminItemContainer from "@/app/components/admin/common/AdminItemContainer";
import { toast } from "sonner";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import {
  RiDeleteBinLine,
  RiPencilLine,
  RiEyeLine,
  RiEyeOffLine,
} from "react-icons/ri";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import Image from "next/image";

interface Entry {
  _id: string;
  title: string;
}

interface ProjectItem {
  _id: string;
  isHidden: boolean;
  title: string;
  thumbImage: string;
  thumbImageAlt: string;
}

interface ProjectsForm {
  seo: { metaTitle: string; metaDescription: string; script: string };
  bannerSection: {
    isHidden: boolean;
    image: string;
    imageAlt: string;
    title: string;
  };
  firstSection: {
    isHidden: boolean;
    sectionLabel: string;
    title: string;
    description: string;
  };
  secondSection: {
    isHidden: boolean;
    title: string;
    description: string;
    image: string;
    imageAlt: string;
    button: {
      text: string;
      link: string;
    };
  };
}

type EntryKind = "locations" | "statuses";

export default function ProjectsDetail() {
  const router = useRouter();
  const { register, handleSubmit, setValue, control, watch } =
    useForm<ProjectsForm>();

  const [locations, setLocations] = useState<Entry[]>([]);
  const [statuses, setStatuses] = useState<Entry[]>([]);
  const [items, setItems] = useState<ProjectItem[]>([]);

  const [entryDialogOpen, setEntryDialogOpen] = useState(false);
  const [entryKind, setEntryKind] = useState<EntryKind>("locations");
  const [editingEntry, setEditingEntry] = useState<Entry | null>(null);
  const [entryTitle, setEntryTitle] = useState("");
  const [isSavingEntry, setIsSavingEntry] = useState(false);
  const [deleteEntryTarget, setDeleteEntryTarget] = useState<{
    kind: EntryKind;
    entry: Entry;
  } | null>(null);
  const [deleteProjectTarget, setDeleteProjectTarget] =
    useState<ProjectItem | null>(null);
  const [searchQuery, setSearchQuery] = useState("");

  const fetchData = async () => {
    try {
      const res = await fetch("/api/admin/projects");
      const contentType = res.headers.get("content-type");
      if (!res.ok || !contentType?.includes("application/json")) {
        toast.error("Failed to load projects data");
        return;
      }

      const { data } = await res.json();
      setValue("seo", data.seo);
      setValue("bannerSection", data.bannerSection);
      setValue("firstSection", data.firstSection);
      setValue("secondSection", data.secondSection);

      setLocations(data.locations || []);
      setStatuses(data.statuses || []);
      setItems(data.items || []);
    } catch (e) {
      console.error(e);
      toast.error("Failed to load projects data");
    }
  };

  const onSubmit = async (data: ProjectsForm) => {
    try {
      const res = await fetch("/api/admin/projects", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      const { message } = await res.json();
      if (res.ok) {
        toast.success(message);
      } else {
        toast.error(message);
      }
    } catch (e) {
      console.error(e);
      toast.error("Something went wrong");
    }
  };

  const openAddEntry = (kind: EntryKind) => {
    setEntryKind(kind);
    setEditingEntry(null);
    setEntryTitle("");
    setEntryDialogOpen(true);
  };

  const openEditEntry = (kind: EntryKind, entry: Entry) => {
    setEntryKind(kind);
    setEditingEntry(entry);
    setEntryTitle(entry.title);
    setEntryDialogOpen(true);
  };

  const saveEntry = async () => {
    if (!entryTitle.trim()) {
      toast.error("Title is required");
      return;
    }
    setIsSavingEntry(true);
    try {
      const res = await fetch(
        editingEntry
          ? `/api/admin/projects/${entryKind}/${editingEntry._id}`
          : `/api/admin/projects/${entryKind}`,
        {
          method: editingEntry ? "PATCH" : "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ title: entryTitle }),
        },
      );
      const { data, message } = await res.json();
      if (res.ok) {
        const setter = entryKind === "locations" ? setLocations : setStatuses;
        if (editingEntry) {
          setter((prev) => prev.map((e) => (e._id === data._id ? data : e)));
        } else {
          setter((prev) => [...prev, data]);
        }
        toast.success(message);
        setEntryDialogOpen(false);
      } else {
        toast.error(message);
      }
    } catch {
      toast.error("Something went wrong");
    } finally {
      setIsSavingEntry(false);
    }
  };

  const confirmDeleteEntry = async () => {
    if (!deleteEntryTarget) return;
    const { kind, entry } = deleteEntryTarget;
    try {
      const res = await fetch(`/api/admin/projects/${kind}/${entry._id}`, {
        method: "DELETE",
      });
      if (res.ok) {
        const setter = kind === "locations" ? setLocations : setStatuses;
        setter((prev) => prev.filter((e) => e._id !== entry._id));
        toast.success(
          `${kind === "locations" ? "Location" : "Status"} deleted`,
        );
        setDeleteEntryTarget(null);
      } else {
        const { message } = await res.json();
        toast.error(message);
      }
    } catch {
      toast.error("Something went wrong");
    }
  };

  const toggleProjectHidden = async (
    e: React.MouseEvent,
    project: ProjectItem,
  ) => {
    e.stopPropagation();
    try {
      const res = await fetch(`/api/admin/projects/items/${project._id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ isHidden: !project.isHidden }),
      });
      if (res.ok) {
        setItems((prev) =>
          prev.map((p) =>
            p._id === project._id ? { ...p, isHidden: !p.isHidden } : p,
          ),
        );
        toast.success(project.isHidden ? "Project shown" : "Project hidden");
      } else {
        const { message } = await res.json();
        toast.error(message);
      }
    } catch {
      toast.error("Something went wrong");
    }
  };

  const confirmDeleteProject = async () => {
    if (!deleteProjectTarget) return;
    try {
      const res = await fetch(
        `/api/admin/projects/items/${deleteProjectTarget._id}`,
        { method: "DELETE" },
      );
      if (res.ok) {
        setItems((prev) =>
          prev.filter((p) => p._id !== deleteProjectTarget._id),
        );
        toast.success("Project deleted");
        setDeleteProjectTarget(null);
      } else {
        const { message } = await res.json();
        toast.error(message);
      }
    } catch {
      toast.error("Something went wrong");
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const filteredItems = items.filter((project) =>
    project.title?.toLowerCase().includes(searchQuery.toLowerCase()),
  );

  return (
    <div className="flex flex-col gap-5">
      <form className="flex flex-col gap-5" onSubmit={handleSubmit(onSubmit)}>
        {/* Banner Section */}
        <AdminItemContainer>
          <Label
            main
            isHidden={watch("bannerSection.isHidden")}
            onToggleHidden={() =>
              setValue(
                "bannerSection.isHidden",
                !watch("bannerSection.isHidden"),
              )
            }
          >
            Banner Section
          </Label>
          <div className="p-5 flex flex-col gap-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="flex flex-col gap-2">
                <Label className="font-bold">Image</Label>
                <Controller
                  name="bannerSection.image"
                  control={control}
                  render={({ field }) => (
                    <ImageUploader
                      value={field.value}
                      onChange={field.onChange}
                    />
                  )}
                />
                <Label className="font-bold">Alt Tag</Label>
                <Input
                  {...register("bannerSection.imageAlt")}
                  placeholder="Alt Tag"
                />
              </div>
              <div className="flex flex-col gap-2">
                <Label className="font-bold">Title</Label>
                <Input
                  {...register("bannerSection.title")}
                  placeholder="Title"
                />
              </div>
            </div>
          </div>
        </AdminItemContainer>

        {/* First Section */}
        <AdminItemContainer>
          <Label
            main
            isHidden={watch("firstSection.isHidden")}
            onToggleHidden={() =>
              setValue("firstSection.isHidden", !watch("firstSection.isHidden"))
            }
          >
            First Section
          </Label>
          <div className="p-5 flex flex-col gap-4">
            <Label className="font-bold">Section Label</Label>
            <Input
              {...register("firstSection.sectionLabel")}
              placeholder="Section Label"
            />
            <Label className="font-bold">Title</Label>
            <Input {...register("firstSection.title")} placeholder="Title" />
            <Label className="font-bold">Description</Label>
            <Textarea
              {...register("firstSection.description")}
              placeholder="Description"
            />
          </div>
        </AdminItemContainer>

        {/* Second Section */}
        <AdminItemContainer>
          <Label
            main
            isHidden={watch("secondSection.isHidden")}
            onToggleHidden={() =>
              setValue(
                "secondSection.isHidden",
                !watch("secondSection.isHidden"),
              )
            }
          >
            Second Section
          </Label>
          <div className="p-5 flex flex-col gap-4">
            <Label className="font-bold">Title</Label>
            <Input {...register("secondSection.title")} placeholder="Title" />
            <Label className="font-bold">Description</Label>
            <Textarea
              {...register("secondSection.description")}
              placeholder="Description"
            />
            <Label className="font-bold">Image</Label>
            <Controller
              name="secondSection.image"
              control={control}
              render={({ field }) => (
                <ImageUploader value={field.value} onChange={field.onChange} />
              )}
            />
            <Label className="font-bold">Alt Tag</Label>
            <Input
              {...register("secondSection.imageAlt")}
              placeholder="Alt Tag"
            />
            <Label className="font-bold">Button Text</Label>
            <Input
              {...register("secondSection.button.text")}
              placeholder="Button Text"
            />
            <Label className="font-bold">Button Link</Label>
            <Input
              {...register("secondSection.button.link")}
              placeholder="Button Link"
            />
          </div>
        </AdminItemContainer>

        {/* SEO */}
        <AdminItemContainer>
          <Label main>SEO</Label>
          <div className="p-5 flex flex-col gap-4">
            <Label className="font-bold">Meta Title</Label>
            <Input {...register("seo.metaTitle")} placeholder="Meta Title" />
            <Label className="font-bold">Meta Description</Label>
            <Input
              {...register("seo.metaDescription")}
              placeholder="Meta Description"
            />
            <Label className="font-bold">Script</Label>
            <Textarea {...register("seo.script")} placeholder="Script" />
          </div>
        </AdminItemContainer>

        <div className="fixed top-4 right-8 z-50">
          <Button
            type="submit"
            className="cursor-pointer border-2 border-white hover:text-white text-[14px] shadow-lg"
          >
            Page Submit
          </Button>
        </div>
      </form>

      {/* Locations + Status */}
      <div className="grid grid-cols-2 gap-5">
        <div className="bg-white border border-black/20 rounded-xl p-5 flex flex-col gap-4 h-fit">
          <div className="flex items-center justify-between border-b border-black/20 pb-3">
            <Label className="text-base font-bold">Locations</Label>
            <Button
              type="button"
              addItem
              onClick={() => openAddEntry("locations")}
            >
              + Add
            </Button>
          </div>
          <div className="flex flex-col gap-2">
            {locations.length === 0 && (
              <p className="text-sm text-black/40">No locations yet.</p>
            )}
            {locations.map((location) => (
              <div
                key={location._id}
                className="flex items-center justify-between border border-black/10 rounded-md px-3 py-2"
              >
                <span className="text-sm font-medium">{location.title}</span>
                <div className="flex items-center gap-3">
                  <button
                    type="button"
                    onClick={() => openEditEntry("locations", location)}
                  >
                    <RiPencilLine
                      size={18}
                      className="text-black hover:text-black/70 cursor-pointer"
                    />
                  </button>
                  <button
                    type="button"
                    onClick={() =>
                      setDeleteEntryTarget({
                        kind: "locations",
                        entry: location,
                      })
                    }
                  >
                    <RiDeleteBinLine
                      size={18}
                      className="text-red-400 hover:text-red-600 cursor-pointer"
                    />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-white border border-black/20 rounded-xl p-5 flex flex-col gap-4 h-fit">
          <div className="flex items-center justify-between border-b border-black/20 pb-3">
            <Label className="text-base font-bold">Status</Label>
            <Button
              type="button"
              addItem
              onClick={() => openAddEntry("statuses")}
            >
              + Add
            </Button>
          </div>
          <div className="flex flex-col gap-2">
            {statuses.length === 0 && (
              <p className="text-sm text-black/40">No statuses yet.</p>
            )}
            {statuses.map((status) => (
              <div
                key={status._id}
                className="flex items-center justify-between border border-black/10 rounded-md px-3 py-2"
              >
                <span className="text-sm font-medium">{status.title}</span>
                <div className="flex items-center gap-3">
                  <button
                    type="button"
                    onClick={() => openEditEntry("statuses", status)}
                  >
                    <RiPencilLine
                      size={18}
                      className="text-black hover:text-black/70 cursor-pointer"
                    />
                  </button>
                  <button
                    type="button"
                    onClick={() =>
                      setDeleteEntryTarget({ kind: "statuses", entry: status })
                    }
                  >
                    <RiDeleteBinLine
                      size={18}
                      className="text-red-400 hover:text-red-600 cursor-pointer"
                    />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Projects — full width */}
      <div className="bg-white border border-black/20 rounded-xl p-5 flex flex-col gap-4">
        <div className="flex items-center justify-between border-b border-black/20 pb-3">
          <Label className="text-base font-bold">
            Projects{" "}
            <div className="inline text-secondary px-2 py-1 border border-primary rounded-[5px]">
              Count: {filteredItems.length}
            </div>
          </Label>
          <div className="flex items-center gap-3">
            <Input
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search projects..."
              className="w-85 rounded-[10px]"
            />
            <Button
              type="button"
              addItem
              onClick={() => router.push("/admin/projects/items/new")}
            >
              + Add Project
            </Button>
          </div>
        </div>
        <div className="grid gap-4">
          {filteredItems.length === 0 && (
            <p className="text-sm text-black/40">No projects added yet.</p>
          )}
          {filteredItems.map((project) => (
            <div
              key={project._id}
              className="flex items-center justify-between border border-black/10 rounded-md px-4 py-3 hover:shadow-sm transition-all cursor-pointer"
              onClick={() =>
                router.push(`/4bm-4dm1n/projects/items/${project._id}`)
              }
            >
              <div className="flex items-center gap-3">
                {project.thumbImage && (
                  <Image
                    width={100}
                    height={100}
                    src={project.thumbImage}
                    alt={project.thumbImageAlt || ""}
                    className="w-8 h-8 object-cover rounded"
                  />
                )}
                <span className="text-sm font-medium flex items-center gap-2">
                  {project.title || "Untitled Project"}
                  {project.isHidden && (
                    <span className="text-[10px] uppercase font-semibold text-red-500 border border-red-300 rounded px-1.5 py-0.5">
                      Hidden
                    </span>
                  )}
                </span>
              </div>
              <div className="flex items-center gap-3">
                <button
                  className="cursor-pointer"
                  onClick={(e) => toggleProjectHidden(e, project)}
                  type="button"
                >
                  {project.isHidden ? (
                    <RiEyeOffLine className="text-gray-500" size={20} />
                  ) : (
                    <RiEyeLine className="text-green-600" size={20} />
                  )}
                </button>
                <button
                  type="button"
                  className="cursor-pointer"
                  onClick={(e) => {
                    e.stopPropagation();
                    setDeleteProjectTarget(project);
                  }}
                >
                  <RiDeleteBinLine
                    className="text-red-400 hover:text-red-600 hover:scale-110 transition-all"
                    size={20}
                  />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Location/Status Dialog */}
      <Dialog open={entryDialogOpen} onOpenChange={setEntryDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>
              {editingEntry ? "Edit" : "Add"}{" "}
              {entryKind === "locations" ? "Location" : "Status"}
            </DialogTitle>
          </DialogHeader>
          <div className="flex flex-col gap-2">
            <Label className="font-bold">Title</Label>
            <Input
              value={entryTitle}
              onChange={(e) => setEntryTitle(e.target.value)}
              placeholder="Title"
            />
          </div>
          <DialogFooter>
            <Button type="button" disabled={isSavingEntry} onClick={saveEntry}>
              {isSavingEntry ? "Saving..." : "Save"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Delete Location/Status Confirm */}
      <Dialog
        open={!!deleteEntryTarget}
        onOpenChange={(open) => !open && setDeleteEntryTarget(null)}
      >
        <DialogContent>
          <DialogHeader>
            <DialogTitle>
              Delete{" "}
              {deleteEntryTarget?.kind === "locations" ? "Location" : "Status"}
            </DialogTitle>
          </DialogHeader>
          <p className="text-sm text-black/60">
            Are you sure you want to delete{" "}
            <span className="font-semibold font-tasa text-secondary">
              {deleteEntryTarget?.entry.title}
            </span>
            ?
          </p>
          <DialogFooter>
            <Button
              variant="outline"
              type="button"
              onClick={() => setDeleteEntryTarget(null)}
            >
              No
            </Button>
            <Button type="button" onClick={confirmDeleteEntry}>
              Yes, Delete
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Delete Project Confirm */}
      <Dialog
        open={!!deleteProjectTarget}
        onOpenChange={(open) => !open && setDeleteProjectTarget(null)}
      >
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Delete Project</DialogTitle>
          </DialogHeader>
          <p className="text-sm text-black/60">
            Are you sure you want to delete{" "}
            <span className="font-semibold font-tasa text-secondary">
              {deleteProjectTarget?.title}
            </span>
            ? This cannot be undone.
          </p>
          <DialogFooter>
            <Button
              variant="outline"
              type="button"
              onClick={() => setDeleteProjectTarget(null)}
            >
              No
            </Button>
            <Button type="button" onClick={confirmDeleteProject}>
              Yes, Delete
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
