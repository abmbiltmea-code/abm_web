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
  RiEyeLine,
  RiEyeOffLine,
  RiPencilLine,
} from "react-icons/ri";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import Image from "next/image";

interface Category {
  _id: string;
  title: string;
}

interface NewsItem {
  _id: string;
  title: string;
  slug: string;
  category: string | null;
  date: string;
  thumbImage: string;
  thumbImageAlt: string;
  isHidden: boolean;
}

interface NewsForm {
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
    sectionLabel: string;
  };
}

export default function NewsDetail() {
  const router = useRouter();
  const { register, handleSubmit, setValue, control, watch } =
    useForm<NewsForm>();

  const [categories, setCategories] = useState<Category[]>([]);
  const [items, setItems] = useState<NewsItem[]>([]);

  const [categoryDialogOpen, setCategoryDialogOpen] = useState(false);
  const [editingCategory, setEditingCategory] = useState<Category | null>(null);
  const [categoryTitle, setCategoryTitle] = useState("");
  const [isSavingCategory, setIsSavingCategory] = useState(false);
  const [deleteCategoryTarget, setDeleteCategoryTarget] =
    useState<Category | null>(null);
  const [deleteItemTarget, setDeleteItemTarget] = useState<NewsItem | null>(
    null,
  );
  const [searchQuery, setSearchQuery] = useState("");

  const fetchData = async () => {
    try {
      const res = await fetch("/api/admin/news");
      const contentType = res.headers.get("content-type");
      if (!res.ok || !contentType?.includes("application/json")) {
        toast.error("Failed to load news data");
        return;
      }

      const { data } = await res.json();
      setValue("seo", data.seo);
      setValue("bannerSection", data.bannerSection);
      setValue("firstSection", data.firstSection);
      setValue("secondSection", data.secondSection);

      setCategories(data.categories || []);
      setItems(data.items || []);
    } catch (e) {
      console.error(e);
      toast.error("Failed to load news data");
    }
  };

  const onSubmit = async (data: NewsForm) => {
    try {
      const res = await fetch("/api/admin/news", {
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

  const openAddCategory = () => {
    setEditingCategory(null);
    setCategoryTitle("");
    setCategoryDialogOpen(true);
  };

  const openEditCategory = (category: Category) => {
    setEditingCategory(category);
    setCategoryTitle(category.title);
    setCategoryDialogOpen(true);
  };

  const toggleNewsHidden = async (e: React.MouseEvent, item: NewsItem) => {
    e.stopPropagation();
    try {
      const res = await fetch(`/api/admin/news/items/${item._id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ isHidden: !item.isHidden }),
      });
      if (res.ok) {
        setItems((prev) =>
          prev.map((p) =>
            p._id === item._id ? { ...p, isHidden: !p.isHidden } : p,
          ),
        );
        toast.success(item.isHidden ? "News shown" : "News hidden");
      } else {
        const { message } = await res.json();
        toast.error(message);
      }
    } catch {
      toast.error("Something went wrong");
    }
  };

  const saveCategory = async () => {
    if (!categoryTitle.trim()) {
      toast.error("Category title is required");
      return;
    }
    setIsSavingCategory(true);
    try {
      const res = await fetch(
        editingCategory
          ? `/api/admin/news/categories/${editingCategory._id}`
          : "/api/admin/news/categories",
        {
          method: editingCategory ? "PATCH" : "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ title: categoryTitle }),
        },
      );
      const { data, message } = await res.json();
      if (res.ok) {
        if (editingCategory) {
          setCategories((prev) =>
            prev.map((c) => (c._id === data._id ? data : c)),
          );
        } else {
          setCategories((prev) => [...prev, data]);
        }
        toast.success(message);
        setCategoryDialogOpen(false);
      } else {
        toast.error(message);
      }
    } catch {
      toast.error("Something went wrong");
    } finally {
      setIsSavingCategory(false);
    }
  };

  const confirmDeleteCategory = async () => {
    if (!deleteCategoryTarget) return;
    try {
      const res = await fetch(
        `/api/admin/news/categories/${deleteCategoryTarget._id}`,
        { method: "DELETE" },
      );
      if (res.ok) {
        setCategories((prev) =>
          prev.filter((c) => c._id !== deleteCategoryTarget._id),
        );
        setItems((prev) =>
          prev.map((i) =>
            i.category === deleteCategoryTarget._id
              ? { ...i, category: null }
              : i,
          ),
        );
        toast.success("Category deleted");
        setDeleteCategoryTarget(null);
      } else {
        const { message } = await res.json();
        toast.error(message);
      }
    } catch {
      toast.error("Something went wrong");
    }
  };

  const confirmDeleteItem = async () => {
    if (!deleteItemTarget) return;
    try {
      const res = await fetch(`/api/admin/news/items/${deleteItemTarget._id}`, {
        method: "DELETE",
      });
      if (res.ok) {
        setItems((prev) => prev.filter((i) => i._id !== deleteItemTarget._id));
        toast.success("News item deleted");
        setDeleteItemTarget(null);
      } else {
        const { message } = await res.json();
        toast.error(message);
      }
    } catch {
      toast.error("Something went wrong");
    }
  };

  const categoryTitleFor = (id: string | null) =>
    categories.find((c) => c._id === id)?.title || "Uncategorized";

  useEffect(() => {
    fetchData();
  }, []);

  const filteredItems = items.filter((item) =>
    item.title?.toLowerCase().includes(searchQuery.toLowerCase()),
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
            <Label className="font-bold">Section Label</Label>
            <Input
              {...register("secondSection.sectionLabel")}
              placeholder="Section Label"
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

      {/* Categories + News — separate from page form */}
      <div className="grid grid-cols-[1fr_2fr] gap-5">
        {/* Categories */}
        <div className="bg-white border border-black/20 rounded-xl p-5 flex flex-col gap-4 h-fit">
          <div className="flex items-center justify-between border-b border-black/20 pb-3">
            <Label className="text-base font-bold">Categories</Label>
            <Button type="button" addItem onClick={openAddCategory}>
              + Add
            </Button>
          </div>
          <div className="flex flex-col gap-2">
            {categories.length === 0 && (
              <p className="text-sm text-black/40">No categories yet.</p>
            )}
            {categories.map((category) => (
              <div
                key={category._id}
                className="flex items-center justify-between border border-black/10 rounded-md px-3 py-2"
              >
                <span className="text-sm font-medium">{category.title}</span>
                <div className="flex items-center gap-3">
                  <button
                    type="button"
                    onClick={() => openEditCategory(category)}
                  >
                    <RiPencilLine
                      size={18}
                      className="text-black hover:text-black/70 cursor-pointer"
                    />
                  </button>
                  <button
                    type="button"
                    onClick={() => setDeleteCategoryTarget(category)}
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

        {/* News */}
        <div className="bg-white border border-black/20 rounded-xl p-5 flex flex-col gap-4">
          <div className="flex items-center justify-between border-b border-black/20 pb-3">
            <Label className="text-base font-bold">
              News{" "}
              <div className="inline text-secondary px-2 py-1 border border-primary rounded-[5px]">
                Count: {filteredItems.length}
              </div>
            </Label>
            <div className="flex items-center gap-3">
              <Input
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search news..."
                className="w-85 rounded-[10px]"
              />
              <Button
                type="button"
                addItem
                onClick={() => router.push("/admin/news/items/new")}
              >
                + Add News
              </Button>
            </div>
          </div>
          <div className="grid gap-4">
            {filteredItems.length === 0 && (
              <p className="text-sm text-black/40">No news added yet.</p>
            )}
            {filteredItems.map((item) => (
              <div
                key={item._id}
                className="flex items-center justify-between border border-black/10 rounded-md px-4 py-3 hover:shadow-sm transition-all cursor-pointer"
                onClick={() => router.push(`/4bm-4dm1n/news/items/${item._id}`)}
              >
                <div className="flex items-center gap-3">
                  {item.thumbImage && (
                    <Image
                      width={100}
                      height={100}
                      src={item.thumbImage}
                      alt={item.thumbImageAlt || ""}
                      className="w-8 h-8 object-cover rounded"
                    />
                  )}
                  <div className="flex flex-col">
                    <span className="text-sm font-medium">
                      {item.title || "Untitled News"}
                    </span>
                    <span className="text-xs text-black/40">
                      {categoryTitleFor(item.category)}
                      {item.date &&
                        ` • ${new Date(item.date).toLocaleDateString()}`}
                    </span>
                  </div>
                </div>
                <div className="flex gap-3 items-center">
                  <button
                    className="cursor-pointer"
                    onClick={(e) => toggleNewsHidden(e, item)}
                    type="button"
                  >
                    {item.isHidden ? (
                      <RiEyeOffLine className="text-gray-500" size={20} />
                    ) : (
                      <RiEyeLine className="text-green-600" size={20} />
                    )}
                  </button>
                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      setDeleteItemTarget(item);
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
      </div>

      {/* Category Dialog */}
      <Dialog open={categoryDialogOpen} onOpenChange={setCategoryDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>
              {editingCategory ? "Edit Category" : "Add Category"}
            </DialogTitle>
          </DialogHeader>
          <div className="flex flex-col gap-2">
            <Label className="font-bold">Title</Label>
            <Input
              value={categoryTitle}
              onChange={(e) => setCategoryTitle(e.target.value)}
              placeholder="Category title"
            />
          </div>
          <DialogFooter>
            <Button
              type="button"
              disabled={isSavingCategory}
              onClick={saveCategory}
            >
              {isSavingCategory ? "Saving..." : "Save"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Delete Category Confirm */}
      <Dialog
        open={!!deleteCategoryTarget}
        onOpenChange={(open) => !open && setDeleteCategoryTarget(null)}
      >
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Delete Category</DialogTitle>
          </DialogHeader>
          <p className="text-sm text-black/60">
            Are you sure you want to delete{" "}
            <span className="font-semibold font-tasa text-secondary">
              {deleteCategoryTarget?.title}
            </span>
            ? News items in this category will become uncategorized.
          </p>
          <DialogFooter>
            <Button type="button" onClick={() => setDeleteCategoryTarget(null)}>
              No
            </Button>
            <Button type="button" onClick={confirmDeleteCategory}>
              Yes, Delete
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Delete News Confirm */}
      <Dialog
        open={!!deleteItemTarget}
        onOpenChange={(open) => !open && setDeleteItemTarget(null)}
      >
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Delete News</DialogTitle>
          </DialogHeader>
          <p className="text-sm text-black/60">
            Are you sure you want to delete{" "}
            <span className="font-semibold font-tasa text-secondary">
              {deleteItemTarget?.title}
            </span>
            ? This cannot be undone.
          </p>
          <DialogFooter>
            <Button
              variant="outline"
              type="button"
              onClick={() => setDeleteItemTarget(null)}
            >
              No
            </Button>
            <Button type="button" onClick={confirmDeleteItem}>
              Yes, Delete
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
