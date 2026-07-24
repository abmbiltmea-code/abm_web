"use client";

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Controller, useFieldArray, useForm } from "react-hook-form";
import { ImageUploader } from "@/components/ui/image-uploader";
import AdminItemContainer from "@/app/components/admin/common/AdminItemContainer";
import { toast } from "sonner";
import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { RiDeleteBinLine } from "react-icons/ri";

interface Category {
  _id: string;
  title: string;
}

interface GalleryItemForm {
  title: string;
  category: string;
  images: { url: string; alt: string }[];
}

export default function GalleryItemDetail() {
  const router = useRouter();
  const params = useParams<{ id: string }>();
  const isNew = params.id === "new";

  const { register, handleSubmit, setValue, control } =
    useForm<GalleryItemForm>({
      defaultValues: { images: [] },
    });
  const { fields, append, remove } = useFieldArray({
    control,
    name: "images",
  });

  const [categories, setCategories] = useState<Category[]>([]);
  const [isSaving, setIsSaving] = useState(false);

  const fetchCategories = async () => {
    try {
      const res = await fetch("/api/admin/gallery");
      const contentType = res.headers.get("content-type");
      if (!res.ok || !contentType?.includes("application/json")) return;
      const { data } = await res.json();
      setCategories(data.categories || []);
    } catch (e) {
      console.error(e);
    }
  };

  const fetchItem = async () => {
    try {
      const res = await fetch(`/api/admin/gallery/items/${params.id}`);
      const contentType = res.headers.get("content-type");
      if (!res.ok || !contentType?.includes("application/json")) {
        toast.error("Failed to load item");
        return;
      }
      const { data } = await res.json();
      setValue("title", data.title);
      setValue("category", data.category || "");
      setValue("images", data.images || []);
    } catch (e) {
      console.error(e);
      toast.error("Failed to load item");
    }
  };

  const onSubmit = async (formData: GalleryItemForm) => {
    if (!formData.category) {
      toast.error("Please select a category");
      return;
    }
    setIsSaving(true);
    try {
      const res = await fetch(
        isNew
          ? "/api/admin/gallery/items"
          : `/api/admin/gallery/items/${params.id}`,
        {
          method: isNew ? "POST" : "PATCH",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(formData),
        },
      );
      const { message } = await res.json();
      if (res.ok) {
        toast.success(message || "Item saved");
        router.push("/4bm-4dm1n/gallery");
      } else {
        toast.error(message || "Failed to save item");
      }
    } catch (e) {
      console.error(e);
      toast.error("Something went wrong");
    } finally {
      setIsSaving(false);
    }
  };

  useEffect(() => {
    fetchCategories();
    if (!isNew) fetchItem();
  }, []);

  return (
    <div className="flex flex-col gap-5">
      <form className="flex flex-col gap-5" onSubmit={handleSubmit(onSubmit)}>
        <AdminItemContainer>
          <Label main>Item Details</Label>
          <div className="p-5 flex flex-col gap-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="flex flex-col gap-2">
                <Label className="font-bold">Title</Label>
                <Input {...register("title")} placeholder="Item Title" />
              </div>
              <div className="flex flex-col gap-2">
                <Label className="font-bold">Category</Label>
                <select
                  {...register("category")}
                  className="border border-black/20 rounded-md px-3 py-2 text-sm"
                >
                  <option value="">Uncategorized</option>
                  {categories.map((c) => (
                    <option key={c._id} value={c._id}>
                      {c.title}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          </div>
        </AdminItemContainer>

        <AdminItemContainer>
          <Label main>Images</Label>
          <div className="p-5 flex flex-col gap-4">
            <div className="flex justify-end">
              <Button
                type="button"
                addItem
                onClick={() => append({ url: "", alt: "" })}
              >
                + Add Image
              </Button>
            </div>
            <div className="grid grid-cols-3 gap-4">
              {fields.map((field, index) => (
                <div
                  key={field.id}
                  className="border border-black/10 rounded-lg p-4 flex flex-col gap-3"
                >
                  <div className="flex items-center justify-between">
                    <Label className="font-bold">Image {index + 1}</Label>
                    <Button type="button" onClick={() => remove(index)}>
                      <RiDeleteBinLine size={16} />
                    </Button>
                  </div>
                  <Controller
                    name={`images.${index}.url`}
                    control={control}
                    render={({ field }) => (
                      <ImageUploader
                        value={field.value}
                        onChange={field.onChange}
                      />
                    )}
                  />
                  <Label className="font-bold">Alt Text</Label>
                  <Input
                    {...register(`images.${index}.alt`)}
                    placeholder="Image alt text"
                  />
                </div>
              ))}
            </div>
          </div>
        </AdminItemContainer>

        <div className="fixed top-4 right-8 z-50">
          <Button
            type="submit"
            disabled={isSaving}
            className="cursor-pointer border-2 border-white hover:text-white text-[14px] shadow-lg"
          >
            {isSaving ? "Saving..." : "Save Item"}
          </Button>
        </div>
      </form>
    </div>
  );
}
