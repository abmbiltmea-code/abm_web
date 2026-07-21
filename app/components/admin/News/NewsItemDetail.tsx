"use client";

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Controller, useForm } from "react-hook-form";
import { ImageUploader } from "@/components/ui/image-uploader";
import AdminItemContainer from "@/app/components/admin/common/AdminItemContainer";
import { toast } from "sonner";
import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { RiArrowLeftLine } from "react-icons/ri";
import TinyEditor from "../common/TinyMceEditor";

interface Category {
  _id: string;
  title: string;
}

interface NewsItemForm {
  title: string;
  slug: string;
  category: string;
  date: string;
  thumbImage: string;
  thumbImageAlt: string;
}

export default function NewsItemDetail() {
  const router = useRouter();
  const params = useParams<{ id: string }>();
  const isNew = params.id === "new";

  const { register, handleSubmit, setValue, control, watch } =
    useForm<NewsItemForm>();
  const [content, setContent] = useState("");
  const [categories, setCategories] = useState<Category[]>([]);
  const [isLoading, setIsLoading] = useState(!isNew);
  const [isSaving, setIsSaving] = useState(false);

  const fetchCategories = async () => {
    try {
      const res = await fetch("/api/admin/news");
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
      const res = await fetch(`/api/admin/news/items/${params.id}`);
      const contentType = res.headers.get("content-type");
      if (!res.ok || !contentType?.includes("application/json")) {
        toast.error("Failed to load news item");
        return;
      }
      const { data } = await res.json();
      setValue("title", data.title);
      setValue("slug", data.slug);
      setValue("category", data.category || "");
      setValue(
        "date",
        data.date ? new Date(data.date).toISOString().split("T")[0] : "",
      );
      setValue("thumbImage", data.thumbImage);
      setValue("thumbImageAlt", data.thumbImageAlt);
      setContent(data.content || "");
    } catch (e) {
      console.error(e);
      toast.error("Failed to load news item");
    } finally {
      setIsLoading(false);
    }
  };

  const onSubmit = async (formData: NewsItemForm) => {
    setIsSaving(true);
    try {
      const payload = { ...formData, content };
      const res = await fetch(
        isNew ? "/api/admin/news/items" : `/api/admin/news/items/${params.id}`,
        {
          method: isNew ? "POST" : "PATCH",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload),
        },
      );
      const { message } = await res.json();
      if (res.ok) {
        toast.success(message || "News item saved");
        router.push("/admin/news");
      } else {
        toast.error(message || "Failed to save news item");
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
          <Label main>News Details</Label>
          <div className="p-5 flex flex-col gap-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="flex flex-col gap-2">
                <Label className="font-bold">Title</Label>
                <Input {...register("title")} placeholder="News Title" />
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
            <div className="grid grid-cols-2 gap-4">
              <div className="flex flex-col gap-2">
                <Label className="font-bold">Slug</Label>
                <div className="flex gap-3">
                  <Input {...register("slug")} placeholder="news-slug" />
                  <Button
                    type="button"
                    className="bg-green-600 hover:bg-green-700"
                    onClick={() =>
                      setValue(
                        "slug",
                        watch("title")
                          .trim()
                          .toLowerCase()
                          .replace(/[^a-z0-9\s-]/g, "")
                          .replace(/\s+/g, "-"),
                      )
                    }
                  >
                    Generate
                  </Button>
                </div>
              </div>
              <div className="flex flex-col gap-2">
                <Label className="font-bold">Date</Label>
                <Input type="date" {...register("date")} />
              </div>
            </div>
          </div>
        </AdminItemContainer>

        <AdminItemContainer>
          <Label main>Thumbnail</Label>
          <div className="p-5 flex flex-col gap-4">
            <Controller
              name="thumbImage"
              control={control}
              render={({ field }) => (
                <ImageUploader value={field.value} onChange={field.onChange} />
              )}
            />
            <Label className="font-bold">Thumbnail Alt</Label>
            <Input {...register("thumbImageAlt")} placeholder="Thumbnail Alt" />
          </div>
        </AdminItemContainer>

        <AdminItemContainer>
          <Label main>Content</Label>
          <div className="p-5">
            <TinyEditor
              newsContent={content}
              setNewsContent={setContent}
              isLoading={isLoading}
            />
          </div>
        </AdminItemContainer>

        <div className="fixed top-4 right-8 z-50">
          <Button
            type="submit"
            disabled={isSaving}
            className="cursor-pointer border-2 border-white hover:text-white text-[14px] shadow-lg"
          >
            {isSaving ? "Saving..." : "Save News"}
          </Button>
        </div>
      </form>
    </div>
  );
}