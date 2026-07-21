"use client";

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Controller, useFieldArray, useForm } from "react-hook-form";
import { ImageUploader } from "@/components/ui/image-uploader";
import { Textarea } from "@/components/ui/textarea";
import AdminItemContainer from "@/app/components/admin/common/AdminItemContainer";
import { toast } from "sonner";
import { useEffect } from "react";
import { RiDeleteBinLine } from "react-icons/ri";

interface ClientsForm {
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
    items: { icon: string; iconAlt: string }[];
  };
  thirdSection: {
    isHidden: boolean;
    sectionLabel: string;
    title: string;
    description: string;
  };
  fourthSection: {
    isHidden: boolean;
    items: { icon: string; iconAlt: string }[];
  };
  fifthSection: {
    isHidden: boolean;
    title: string;
    button: { text: string; link: string };
  };
}

export default function ClientsPage() {
  const { register, handleSubmit, setValue, control, watch } =
    useForm<ClientsForm>();

  const {
    fields: secondItems,
    append: appendSecond,
    remove: removeSecond,
    replace: replaceSecond,
  } = useFieldArray({ control, name: "secondSection.items" });

  const {
    fields: fourthItems,
    append: appendFourth,
    remove: removeFourth,
    replace: replaceFourth,
  } = useFieldArray({ control, name: "fourthSection.items" });

  const fetchData = async () => {
    try {
      const res = await fetch("/api/admin/clients");
      const contentType = res.headers.get("content-type");
      if (!res.ok || !contentType?.includes("application/json")) {
        toast.error("Failed to load clients data");
        return;
      }

      const { data } = await res.json();
      setValue("seo", data.seo);
      setValue("bannerSection", data.bannerSection);
      setValue("firstSection", data.firstSection);
      setValue("secondSection.isHidden", data.secondSection?.isHidden);
      setValue("thirdSection", data.thirdSection);
      setValue("fourthSection.isHidden", data.fourthSection?.isHidden);
      setValue("fifthSection", data.fifthSection);

      replaceSecond(data.secondSection?.items || []);
      replaceFourth(data.fourthSection?.items || []);
    } catch (e) {
      console.error(e);
      toast.error("Failed to load clients data");
    }
  };

  const onSubmit = async (data: ClientsForm) => {
    try {
      const res = await fetch("/api/admin/clients", {
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
            <div className="flex items-center justify-between">
              <Label className="font-bold">Items</Label>
              <Button
                type="button"
                addItem
                onClick={() => appendSecond({ icon: "", iconAlt: "" })}
              >
                + Add Item
              </Button>
            </div>
            <div className="grid grid-cols-4 gap-4">
              {secondItems.map((field, index) => (
                <div
                  key={field.id}
                  className="border border-black/10 rounded-lg p-4 flex flex-col gap-3"
                >
                  <div className="flex items-center justify-between">
                    <Label className="font-bold">Item {index + 1}</Label>
                    <Button type="button" onClick={() => removeSecond(index)}>
                      <RiDeleteBinLine size={16} />
                    </Button>
                  </div>
                  <Controller
                    name={`secondSection.items.${index}.icon`}
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
                    {...register(`secondSection.items.${index}.iconAlt`)}
                    placeholder="Icon Alt"
                  />
                </div>
              ))}
            </div>
          </div>
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
            <Label className="font-bold">Description</Label>
            <Textarea
              {...register("thirdSection.description")}
              placeholder="Description"
            />
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
            <div className="flex items-center justify-between">
              <Label className="font-bold">Items</Label>
              <Button
                type="button"
                addItem
                onClick={() => appendFourth({ icon: "", iconAlt: "" })}
              >
                + Add Item
              </Button>
            </div>
            <div className="grid grid-cols-4 gap-4">
              {fourthItems.map((field, index) => (
                <div
                  key={field.id}
                  className="border border-black/10 rounded-lg p-4 flex flex-col gap-3"
                >
                  <div className="flex items-center justify-between">
                    <Label className="font-bold">Item {index + 1}</Label>
                    <Button type="button" onClick={() => removeFourth(index)}>
                      <RiDeleteBinLine size={16} />
                    </Button>
                  </div>
                  <Controller
                    name={`fourthSection.items.${index}.icon`}
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
                    {...register(`fourthSection.items.${index}.iconAlt`)}
                    placeholder="Icon Alt"
                  />
                </div>
              ))}
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
