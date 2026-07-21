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
import { useParams, useRouter } from "next/navigation";
import { RiArrowLeftLine } from "react-icons/ri";

interface SectorForm {
  isHidden: boolean;
  title: string;
  description: string;
  thumbnail: string;
  thumbnailAlt: string;
  button: {
    text: string;
    link: string;
  };
  homePageImage: string;
  homePageImageAlt: string;
  homePageIcon: string;
  homePageIconAlt: string;
  homePageButton: {
    text: string;
    link: string;
  };
  homePageDescription: string;
}

export default function SectorItemDetail() {
  const router = useRouter();
  const params = useParams<{ id: string }>();
  const isNew = params.id === "new";

  const { register, handleSubmit, setValue, control, watch } =
    useForm<SectorForm>();
  const [isSaving, setIsSaving] = useState(false);

  const fetchSector = async () => {
    try {
      const res = await fetch(`/api/admin/sector/items/${params.id}`);
      const contentType = res.headers.get("content-type");
      if (!res.ok || !contentType?.includes("application/json")) {
        toast.error("Failed to load sector");
        return;
      }
      const { data } = await res.json();
      setValue("isHidden", data.isHidden ?? false);
      setValue("title", data.title);
      setValue("description", data.description);
      setValue("thumbnail", data.thumbnail);
      setValue("thumbnailAlt", data.thumbnailAlt);
      setValue("button", data.button);
      setValue("homePageImage", data.homePageImage);
      setValue("homePageImageAlt", data.homePageImageAlt);
      setValue("homePageIcon", data.homePageIcon);
      setValue("homePageIconAlt", data.homePageIconAlt);
      setValue("homePageButton", data.homePageButton);
      setValue("homePageDescription", data.homePageDescription);
    } catch (e) {
      console.error(e);
      toast.error("Failed to load sector");
    }
  };

  const onSubmit = async (formData: SectorForm) => {
    setIsSaving(true);
    try {
      const res = await fetch(
        isNew
          ? "/api/admin/sector/items"
          : `/api/admin/sector/items/${params.id}`,
        {
          method: isNew ? "POST" : "PATCH",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(formData),
        },
      );
      const { message } = await res.json();
      if (res.ok) {
        toast.success(message || "Sector saved");
        router.push("/admin/sectors");
      } else {
        toast.error(message || "Failed to save sector");
      }
    } catch (e) {
      console.error(e);
      toast.error("Something went wrong");
    } finally {
      setIsSaving(false);
    }
  };

  useEffect(() => {
    if (!isNew) fetchSector();
  }, []);

  return (
    <div className="flex flex-col gap-5">
      <form className="flex flex-col gap-5" onSubmit={handleSubmit(onSubmit)}>
        <AdminItemContainer>
          <Label main>Sector Details</Label>
          <div className="p-5 flex flex-col gap-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="flex flex-col gap-2">
                <Label className="font-bold">Thumbnail</Label>
                <Controller
                  name="thumbnail"
                  control={control}
                  render={({ field }) => (
                    <ImageUploader
                      value={field.value}
                      onChange={field.onChange}
                    />
                  )}
                />
                <Label className="font-bold">Thumbnail Alt</Label>
                <Input
                  {...register("thumbnailAlt")}
                  placeholder="Thumbnail Alt"
                />
              </div>
              <div className="flex flex-col gap-2">
                <Label className="font-bold">Title</Label>
                <Input {...register("title")} placeholder="Sector Title" />
                <Label className="font-bold">Description</Label>
                <Textarea
                  {...register("description")}
                  placeholder="Description"
                />
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="flex flex-col gap-2">
                <Label className="font-bold">Button Text</Label>
                <Input {...register("button.text")} placeholder="Learn More" />
              </div>
              <div className="flex flex-col gap-2">
                <Label className="font-bold">Button Link</Label>
                <Input
                  {...register("button.link")}
                  placeholder="/projects?sector=Residential"
                />
              </div>
            </div>
          </div>
        </AdminItemContainer>

        <AdminItemContainer>
          <Label main>Home Page Sector Section</Label>
          <div className="p-5 flex flex-col gap-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="flex flex-col gap-2">
                <Label className="font-bold">Home Page Image</Label>
                <Controller
                  name="homePageImage"
                  control={control}
                  render={({ field }) => (
                    <ImageUploader
                      value={field.value}
                      onChange={field.onChange}
                    />
                  )}
                />
                <Label className="font-bold">Image Alt</Label>
                <Input
                  {...register("homePageImageAlt")}
                  placeholder="Image Alt"
                />
              </div>
              <div className="flex flex-col gap-2">
                <Label className="font-bold">Home Page Icon</Label>
                <Controller
                  name="homePageIcon"
                  control={control}
                  render={({ field }) => (
                    <ImageUploader
                      value={field.value}
                      onChange={field.onChange}
                    />
                  )}
                />
                <Label className="font-bold">Icon Alt</Label>
                <Input
                  {...register("homePageIconAlt")}
                  placeholder="Icon Alt"
                />
              </div>
            </div>
            <Label className="font-bold">Home Page Description</Label>
            <Textarea
              {...register("homePageDescription")}
              placeholder="Description shown on homepage"
            />
            <div className="grid grid-cols-2 gap-4">
              <div className="flex flex-col gap-2">
                <Label className="font-bold">Home Page Button Text</Label>
                <Input
                  {...register("homePageButton.text")}
                  placeholder="Explore"
                />
              </div>
              <div className="flex flex-col gap-2">
                <Label className="font-bold">Home Page Button Link</Label>
                <Input
                  {...register("homePageButton.link")}
                  placeholder="/projects?sector=Residential"
                />
              </div>
            </div>
          </div>
        </AdminItemContainer>

        <div className="fixed top-4 right-8 z-50">
          <Button
            type="submit"
            disabled={isSaving}
            className="cursor-pointer border-2 border-white hover:text-white text-[14px] shadow-lg"
          >
            {isSaving ? "Saving..." : "Save Sector"}
          </Button>
        </div>
      </form>
    </div>
  );
}
