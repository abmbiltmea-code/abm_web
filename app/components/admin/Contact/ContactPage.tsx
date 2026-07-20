"use client";

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Controller, useForm } from "react-hook-form";
import { ImageUploader } from "@/components/ui/image-uploader";
import { Textarea } from "@/components/ui/textarea";
import AdminItemContainer from "@/app/components/admin/common/AdminItemContainer";
import { toast } from "sonner";
import { useEffect } from "react";

interface ContactForm {
  seo: { metaTitle: string; metaDescription: string; script: string };
  bannerSection: {
    isHidden: boolean;
    image: string;
    imageAlt: string;
    title: string;
  };
  firstSection: {
    isHidden: boolean;
    title: string;
    description: string;
    image: string;
    imageAlt: string;
    address: string;
    phone: string;
    email: string;
    fax: string;
  };
  secondSection: {
    isHidden: boolean;
    title: string;
    description: string;
  };
  thirdSection: {
    isHidden: boolean;
    map: string;
  };
}

export default function ContactDetail() {
  const { register, handleSubmit, setValue, control, watch } =
    useForm<ContactForm>();

  const fetchData = async () => {
    try {
      const res = await fetch("/api/admin/contact");
      const contentType = res.headers.get("content-type");
      if (!res.ok || !contentType?.includes("application/json")) {
        toast.error("Failed to load contact data");
        return;
      }

      const { data } = await res.json();
      setValue("seo", data.seo);
      setValue("bannerSection", data.bannerSection);
      setValue("firstSection", data.firstSection);
      setValue("secondSection", data.secondSection);
      setValue("thirdSection", data.thirdSection);
    } catch (e) {
      console.error(e);
      toast.error("Failed to load contact data");
    }
  };

  const onSubmit = async (data: ContactForm) => {
    try {
      const res = await fetch("/api/admin/contact", {
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
            <div className="grid grid-cols-2 gap-4">
              <div className="flex flex-col gap-2">
                <Label className="font-bold">Image</Label>
                <Controller
                  name="firstSection.image"
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
                  {...register("firstSection.imageAlt")}
                  placeholder="Alt Tag"
                />
              </div>
              <div className="flex flex-col gap-2">
                <Label className="font-bold">Title</Label>
                <Input
                  {...register("firstSection.title")}
                  placeholder="Title"
                />
                <Label className="font-bold">Description</Label>
                <Textarea
                  {...register("firstSection.description")}
                  placeholder="Description"
                />
              </div>
            </div>
            <div className="grid grid-cols-3 gap-4">
              <div className="flex flex-col gap-2">
                <Label className="font-bold">Address</Label>
                <Input
                  {...register("firstSection.address")}
                  placeholder="Address"
                />
              </div>
              <div className="flex flex-col gap-2">
                <Label className="font-bold">Phone</Label>
                <Input
                  {...register("firstSection.phone")}
                  placeholder="Phone"
                />
              </div>
              <div className="flex flex-col gap-2">
                <Label className="font-bold">Email</Label>
                <Input
                  {...register("firstSection.email")}
                  placeholder="Email"
                />
              </div>
              <div className="flex flex-col gap-2">
                <Label className="font-bold">Fax</Label>
                <Input
                  {...register("firstSection.fax")}
                  placeholder="Fax"
                />
              </div>
            </div>
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
          </div>
        </AdminItemContainer>

        {/* Third Section — Map */}
        <AdminItemContainer>
          <Label
            main
            isHidden={watch("thirdSection.isHidden")}
            onToggleHidden={() =>
              setValue("thirdSection.isHidden", !watch("thirdSection.isHidden"))
            }
          >
            Third Section — Map
          </Label>
          <div className="p-5 flex flex-col gap-4">
            <Label className="font-bold">Map Embed URL</Label>
            <Textarea
              {...register("thirdSection.map")}
              placeholder="https://www.google.com/maps/embed?..."
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
    </div>
  );
}
