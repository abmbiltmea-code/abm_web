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

interface Category {
  _id: string;
  title: string;
}

interface GalleryItem {
  _id: string;
  isHidden: boolean;
  title: string;
  images: { url: string; alt: string }[];
  category: string | null;
}

interface GalleryForm {
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
  };
}

export default function GalleryDetail() {
  const router = useRouter();
  const { register, handleSubmit, setValue, control, watch } =
    useForm<GalleryForm>();

  const [categories, setCategories] = useState<Category[]>([]);
  const [items, setItems] = useState<GalleryItem[]>([]);

  const [dialogOpen, setDialogOpen] = useState(false);
  const [editingCategory, setEditingCategory] = useState<Category | null>(null);
  const [categoryTitle, setCategoryTitle] = useState("");
  const [isSavingCategory, setIsSavingCategory] = useState(false);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [selectedGalleryItem, setSelectedGalleryItem] =
    useState<GalleryItem | null>(null);

  const openDeleteGalleryItem = (e: React.MouseEvent, sector: GalleryItem) => {
    e.stopPropagation();
    setSelectedGalleryItem(sector);
    setDeleteDialogOpen(true);
  };

  const fetchData = async () => {
    try {
      const res = await fetch("/api/admin/gallery");
      const contentType = res.headers.get("content-type");
      if (!res.ok || !contentType?.includes("application/json")) {
        toast.error("Failed to load gallery data");
        return;
      }

      const { data } = await res.json();
      setValue("seo", data.seo);
      setValue("bannerSection", data.bannerSection);
      setValue("firstSection", data.firstSection);

      setCategories(data.categories || []);
      setItems(data.items || []);
    } catch (e) {
      console.error(e);
      toast.error("Failed to load gallery data");
    }
  };

  const onSubmit = async (data: GalleryForm) => {
    try {
      const res = await fetch("/api/admin/gallery", {
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
    setDialogOpen(true);
  };

  const openEditCategory = (category: Category) => {
    setEditingCategory(category);
    setCategoryTitle(category.title);
    setDialogOpen(true);
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
          ? `/api/admin/gallery/categories/${editingCategory._id}`
          : "/api/admin/gallery/categories",
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
        setDialogOpen(false);
      } else {
        toast.error(message);
      }
    } catch {
      toast.error("Something went wrong");
    } finally {
      setIsSavingCategory(false);
    }
  };

  const deleteCategory = async (id: string) => {
    try {
      const res = await fetch(`/api/admin/gallery/categories/${id}`, {
        method: "DELETE",
      });
      if (res.ok) {
        setCategories((prev) => prev.filter((c) => c._id !== id));
        setItems((prev) =>
          prev.map((i) => (i.category === id ? { ...i, category: null } : i)),
        );
        toast.success("Category deleted");
      } else {
        const { message } = await res.json();
        toast.error(message);
      }
    } catch {
      toast.error("Something went wrong");
    }
  };

  const deleteItem = async (id: string) => {
    try {
      const res = await fetch(`/api/admin/gallery/items/${id}`, {
        method: "DELETE",
      });
      if (res.ok) {
        setItems((prev) => prev.filter((i) => i._id !== id));
        setDeleteDialogOpen(false);
        toast.success("Item deleted");
      } else {
        const { message } = await res.json();
        toast.error(message);
      }
    } catch {
      toast.error("Something went wrong");
    }
  };

  const toggleItemHidden = async (e: React.MouseEvent, item: GalleryItem) => {
    e.stopPropagation();
    try {
      const res = await fetch(`/api/admin/gallery/items/${item._id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ isHidden: !item.isHidden }),
      });
      if (res.ok) {
        setItems((prev) =>
          prev.map((i) =>
            i._id === item._id ? { ...i, isHidden: !i.isHidden } : i,
          ),
        );
        toast.success(item.isHidden ? "Item shown" : "Item hidden");
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

      {/* Categories + Items — separate from page form */}
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
                    onClick={() => deleteCategory(category._id)}
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

        {/* Items */}
        <div className="bg-white border border-black/20 rounded-xl p-5 flex flex-col gap-4">
          <div className="flex items-center justify-between border-b border-black/20 pb-3">
            <Label className="text-base font-bold">Gallery Items</Label>
            <Button
              type="button"
              addItem
              onClick={() => router.push("/admin/gallery/items/new")}
            >
              + Add Item
            </Button>
          </div>
          <div className="grid grid-cols-2 gap-4">
            {items.length === 0 && (
              <p className="text-sm text-black/40">No items added yet.</p>
            )}
            {items.map((item) => (
              <div
                key={item._id}
                className="flex items-center justify-between border border-black/10 rounded-md px-4 py-3 hover:shadow-sm transition-all cursor-pointer"
                onClick={() => router.push(`/admin/gallery/items/${item._id}`)}
              >
                <div className="flex items-center gap-3">
                  {item.images?.[0]?.url && (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img
                      src={item.images[0].url}
                      alt={item.images[0].alt || ""}
                      className="w-10 h-10 object-cover rounded"
                    />
                  )}
                  <div className="flex flex-col">
                    <span className="text-sm font-medium flex items-center gap-2">
                      {item.title || "Untitled Item"}
                      {item.isHidden && (
                        <span className="text-[10px] uppercase font-semibold text-red-500 border border-red-300 rounded px-1.5 py-0.5">
                          Hidden
                        </span>
                      )}
                    </span>
                    <span className="text-xs text-black/40">
                      {categoryTitleFor(item.category)}
                    </span>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <button
                    onClick={(e) => toggleItemHidden(e, item)}
                    type="button"
                    className="cursor-pointer"
                  >
                    {item.isHidden ? (
                      <RiEyeOffLine className="text-gray-500" size={22} />
                    ) : (
                      <RiEyeLine className="text-green-600" size={22} />
                    )}
                  </button>
                  <button
                    type="button"
                    onClick={(e) => openDeleteGalleryItem(e, item)}
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
      </div>

      {/* Category Dialog */}
      <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
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

      {/* Delete Gallery Item Dialog */}
      <Dialog open={deleteDialogOpen} onOpenChange={setDeleteDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Delete Gallery Item</DialogTitle>
          </DialogHeader>

          <p className="text-sm text-black/60">
            Are you sure you want to delete{" "}
            <span className="font-semibold font-tasa text-secondary">{selectedGalleryItem?.title}</span>? This
            cannot be undone.
          </p>

          <DialogFooter>
            <Button
              type="button"
              variant="outline"
              onClick={() => {
                setDeleteDialogOpen(false);
                setSelectedGalleryItem(null);
              }}
            >
              No
            </Button>

            <Button
              type="button"
              onClick={() => {
                if (selectedGalleryItem) {
                  deleteItem(selectedGalleryItem._id);
                }
              }}
            >
              Yes
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
