"use client";

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Controller, useFieldArray, useForm } from "react-hook-form";
import { ImageUploader } from "@/components/ui/image-uploader";
import { Textarea } from "@/components/ui/textarea";
import AdminItemContainer from "@/app/components/admin/common/AdminItemContainer";
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
import Image from "next/image";

interface SectorItem {
  _id: string;
  isHidden: boolean;
  title: string;
  thumbnail: string;
}

interface SectorsForm {
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
  };
  thirdSection: {
    isHidden: boolean;
    sectionLabel: string;
    title: string;
    items: { title: string }[];
  };
  fourthSection: {
    isHidden: boolean;
    title: string;
    button: { text: string; link: string };
  };
  fifthSection: {
    isHidden: boolean;
    title: string;
    description: string;
    image: string;
    imageAlt: string;
    button: { text: string; link: string };
  };
}

export default function SectorsPage() {
  const router = useRouter();
  const { register, handleSubmit, setValue, control, watch } =
    useForm<SectorsForm>();
  const [sectors, setSectors] = useState<SectorItem[]>([]);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [selectedSector, setSelectedSector] = useState<SectorItem | null>(null);

  const {
    fields: thirdItems,
    append: appendThird,
    remove: removeThird,
    replace: replaceThird,
  } = useFieldArray({
    control,
    name: "thirdSection.items",
  });

  const fetchData = async () => {
    try {
      const res = await fetch("/api/admin/sector");
      const contentType = res.headers.get("content-type");
      if (!res.ok || !contentType?.includes("application/json")) {
        toast.error("Failed to load sectors data");
        return;
      }

      const { data } = await res.json();
      setValue("seo", data.seo);
      setValue("bannerSection", data.bannerSection);
      setValue("firstSection", data.firstSection);
      setValue("secondSection.isHidden", data.secondSection?.isHidden);
      setValue("thirdSection", data.thirdSection);
      setValue("thirdSection.items", data.thirdSection.items);
      setValue("fourthSection", data.fourthSection);
      setValue("fifthSection", data.fifthSection);

      replaceThird(data.thirdSection.items || []);
      setSectors(data.secondSection?.sectors || []);
    } catch (e) {
      console.error(e);
      toast.error("Failed to load sectors data");
    }
  };

  const onSubmit = async (data: SectorsForm) => {
    try {
      const res = await fetch("/api/admin/sector", {
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

  const deleteSector = async (id: string) => {
    try {
      const res = await fetch(`/api/admin/sector/items/${id}`, {
        method: "DELETE",
      });

      if (res.ok) {
        setSectors((prev) => prev.filter((s) => s._id !== id));
        toast.success("Sector deleted");
        setDeleteDialogOpen(false);
        setSelectedSector(null);
      } else {
        const { message } = await res.json();
        toast.error(message);
      }
    } catch {
      toast.error("Something went wrong");
    }
  };

  const toggleSectorHidden = async (
    e: React.MouseEvent,
    sector: SectorItem,
  ) => {
    e.stopPropagation();
    try {
      const res = await fetch(`/api/admin/sector/items/${sector._id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ isHidden: !sector.isHidden }),
      });
      if (res.ok) {
        setSectors((prev) =>
          prev.map((s) =>
            s._id === sector._id ? { ...s, isHidden: !s.isHidden } : s,
          ),
        );
        toast.success(sector.isHidden ? "Sector shown" : "Sector hidden");
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

  return (
    <div className="flex flex-col gap-5">
      <form className="flex flex-col gap-5" onSubmit={handleSubmit(onSubmit)}>
        {/* Banner Section */}
        <AdminItemContainer>
          <Label main>Banner Section</Label>
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

        {/* Second Section — settings only, sectors handled below */}
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
            Second Section — Sectors List
          </Label>
        </AdminItemContainer>

        {/* Third Section */}
        <AdminItemContainer>
          <Label
            main
            isHidden={watch("thirdSection.isHidden")}
            onToggleHidden={() =>
              setValue("thirdSection.isHidden", !watch("thirdSection.isHidden"))
            }
          >
            Third Section
          </Label>
          <div className="p-5 flex flex-col gap-4">
            <Label className="font-bold">Section Label</Label>
            <Input
              {...register("thirdSection.sectionLabel")}
              placeholder="Section Label"
            />
            <Label className="font-bold">Title</Label>
            <Input {...register("thirdSection.title")} placeholder="Title" />
            <div className="flex items-center justify-between">
              <Label className="font-bold">Items</Label>
              <Button
                type="button"
                addItem
                onClick={() => appendThird({ title: "" })}
              >
                + Add Item
              </Button>
            </div>
            <div className="grid grid-cols-2 gap-4">
              {thirdItems.map((field, index) => (
                <div
                  key={field.id}
                  className="border border-black/10 rounded-lg p-4 flex flex-col gap-3"
                >
                  <div className="flex items-center justify-between">
                    <Label className="font-bold">Item {index + 1}</Label>
                    <Button type="button" onClick={() => removeThird(index)}>
                      <RiDeleteBinLine size={16} />
                    </Button>
                  </div>
                  <Label className="font-bold">Title</Label>
                  <Input
                    {...register(`thirdSection.items.${index}.title`)}
                    placeholder="Title"
                  />
                </div>
              ))}
            </div>
          </div>
        </AdminItemContainer>

        {/* Fourth Section */}
        <AdminItemContainer>
          <Label
            main
            isHidden={watch("fourthSection.isHidden")}
            onToggleHidden={() =>
              setValue(
                "fourthSection.isHidden",
                !watch("fourthSection.isHidden"),
              )
            }
          >
            Fourth Section
          </Label>
          <div className="p-5 flex flex-col gap-4">
            <Label className="font-bold">Title</Label>
            <Input {...register("fourthSection.title")} placeholder="Title" />
            <div className="grid grid-cols-2 gap-4">
              <div className="flex flex-col gap-2">
                <Label className="font-bold">Button Text</Label>
                <Input
                  {...register("fourthSection.button.text")}
                  placeholder="Button Text"
                />
              </div>
              <div className="flex flex-col gap-2">
                <Label className="font-bold">Button Link</Label>
                <Input
                  {...register("fourthSection.button.link")}
                  placeholder="/link"
                />
              </div>
            </div>
          </div>
        </AdminItemContainer>

        {/* Fifth Section */}
        <AdminItemContainer>
          <Label
            main
            isHidden={watch("fifthSection.isHidden")}
            onToggleHidden={() =>
              setValue("fifthSection.isHidden", !watch("fifthSection.isHidden"))
            }
          >
            Fifth Section
          </Label>
          <div className="p-5 flex flex-col gap-4">
            <Label className="font-bold">Title</Label>
            <Input {...register("fifthSection.title")} placeholder="Title" />
            <Label className="font-bold">Description</Label>
            <Textarea
              {...register("fifthSection.description")}
              placeholder="Description"
            />
            <div className="grid grid-cols-2 gap-4">
              <div className="flex flex-col gap-2">
                <Label className="font-bold">Button Text</Label>
                <Input
                  {...register("fifthSection.button.text")}
                  placeholder="Button Text"
                />
              </div>
              <div className="flex flex-col gap-2">
                <Label className="font-bold">Button Link</Label>
                <Input
                  {...register("fifthSection.button.link")}
                  placeholder="/link"
                />
              </div>
            </div>
            <div className="flex flex-col gap-2">
              <Label className="font-bold">Image</Label>
              <Controller
                name="fifthSection.image"
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
                {...register("fifthSection.imageAlt")}
                placeholder="Alt Tag"
              />
            </div>
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

      {/* Sectors list — separate from page form */}
      <div className="bg-white border border-black/20 rounded-xl p-5 flex flex-col gap-4">
        <div className="flex items-center justify-between border-b border-black/20 pb-3">
          <Label className="text-base font-bold">Sectors</Label>
          <Button
            type="button"
            addItem
            onClick={() => router.push("/admin/sectors/sector/new")}
          >
            + Add Sector
          </Button>
        </div>
        <div className="grid gap-5">
          {sectors.length === 0 && (
            <p className="text-sm text-black/40">No sectors added yet.</p>
          )}
          {sectors.map((sector) => (
            <div
              key={sector._id}
              className="flex items-center justify-between border border-black/10 rounded-md px-4 py-3 hover:shadow-sm transition-all cursor-pointer"
              onClick={() => router.push(`/admin/sectors/sector/${sector._id}`)}
            >
              <div className="flex gap-3">
                <Image
                  width={100}
                  height={100}
                  src={sector.thumbnail}
                  alt={sector.title || ""}
                  className="w-8 h-8 object-cover rounded"
                />
                <span className="text-sm font-medium flex items-center gap-2">
                  {sector.title || "Untitled Sector"}
                  {sector.isHidden && (
                    <span className="text-[10px] uppercase font-semibold text-red-500 border border-red-300 rounded px-1.5 py-0.5">
                      Hidden
                    </span>
                  )}
                </span>
              </div>
              <div className="flex items-center gap-3">
                <button
                  onClick={(e) => toggleSectorHidden(e, sector)}
                  type="button"
                  className="cursor-pointer"
                >
                  {sector.isHidden ? (
                    <RiEyeOffLine className="text-gray-500" size={22} />
                  ) : (
                    <RiEyeLine className="text-green-600" size={22} />
                  )}
                </button>
                <button
                  type="button"
                  className="cursor-pointer"
                  onClick={(e) => {
                    e.stopPropagation();
                    setSelectedSector(sector);
                    setDeleteDialogOpen(true);
                  }}
                >
                  <RiDeleteBinLine
                    className="text-red-400 hover:text-red-600 hover:scale-110 transition-all"
                    size={22}
                  />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Category Dialog */}
      <Dialog open={deleteDialogOpen} onOpenChange={setDeleteDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Delete Sector</DialogTitle>
          </DialogHeader>

          <p className="text-sm text-black/60">
            Are you sure you want to delete{" "}
            <span className="font-semibold font-tasa text-secondary">
              {selectedSector?.title}
            </span>
            ? This cannot be undone.
          </p>

          <DialogFooter>
            <Button
              type="button"
              variant="outline"
              onClick={() => {
                setDeleteDialogOpen(false);
                setSelectedSector(null);
              }}
            >
              No
            </Button>

            <Button
              type="button"
              onClick={() => selectedSector && deleteSector(selectedSector._id)}
            >
              Yes
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
