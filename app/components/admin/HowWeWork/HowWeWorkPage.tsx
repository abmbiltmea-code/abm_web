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
import TinyEditor from "../common/TinyMceEditor";

interface HowWeWorkForm {
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
    image: string;
    imageAlt: string;
    title: string;
    description: string;
  };
  thirdSection: {
    isHidden: boolean;
    sectionLabel: string;
    title: string;
    items: { title: string; content: string }[];
  };
  fourthSection: {
    isHidden: boolean;
    sectionLabel: string;
    title: string;
    description: string;
    image: string;
    imageAlt: string;
    items: { icon: string; iconAlt: string; title: string }[];
  };
  fifthSection: {
    isHidden: boolean;
    sectionLabel: string;
    title: string;
    description: string;
    items: {
      image: string;
      imageAlt: string;
      title: string;
      description: string;
    }[];
  };
  sixthSection: {
    isHidden: boolean;
    sectionLabel: string;
    title: string;
    description: string;
    items: {
      image: string;
      imageAlt: string;
      title: string;
      description: string;
    }[];
  };
  seventhSection: {
    isHidden: boolean;
    title: string;
    description: string;
    image: string;
    imageAlt: string;
    button: { text: string; link: string };
  };
}

export default function HowWeWorkDetail() {
  const { register, handleSubmit, setValue, control, watch } =
    useForm<HowWeWorkForm>();

  const {
    fields: thirdItems,
    append: appendThird,
    remove: removeThird,
    replace: replaceThird,
  } = useFieldArray({ control, name: "thirdSection.items" });

  const {
    fields: fourthItems,
    append: appendFourth,
    remove: removeFourth,
    replace: replaceFourth,
  } = useFieldArray({ control, name: "fourthSection.items" });

  const {
    fields: fifthItems,
    append: appendFifth,
    remove: removeFifth,
    replace: replaceFifth,
  } = useFieldArray({ control, name: "fifthSection.items" });

  const {
    fields: sixthItems,
    append: appendSixth,
    remove: removeSixth,
    replace: replaceSixth,
  } = useFieldArray({ control, name: "sixthSection.items" });

  const fetchData = async () => {
    try {
      const res = await fetch("/api/admin/how-we-work");
      const contentType = res.headers.get("content-type");
      if (!res.ok || !contentType?.includes("application/json")) {
        toast.error("Failed to load How We Work data");
        return;
      }

      const { data } = await res.json();
      setValue("seo", data.seo);
      setValue("bannerSection", data.bannerSection);
      setValue("firstSection", data.firstSection);
      setValue("secondSection", data.secondSection);
      setValue("thirdSection.isHidden", data.thirdSection?.isHidden);
      setValue("thirdSection.sectionLabel", data.thirdSection?.sectionLabel);
      setValue("thirdSection.title", data.thirdSection?.title);
      setValue("fourthSection.isHidden", data.fourthSection?.isHidden);
      setValue("fourthSection.sectionLabel", data.fourthSection?.sectionLabel);
      setValue("fourthSection.title", data.fourthSection?.title);
      setValue("fourthSection.description", data.fourthSection?.description);
      setValue("fourthSection.image", data.fourthSection?.image);
      setValue("fourthSection.imageAlt", data.fourthSection?.imageAlt);
      setValue("fifthSection.isHidden", data.fifthSection?.isHidden);
      setValue("fifthSection.sectionLabel", data.fifthSection?.sectionLabel);
      setValue("fifthSection.title", data.fifthSection?.title);
      setValue("fifthSection.description", data.fifthSection?.description);
      setValue("sixthSection.isHidden", data.sixthSection?.isHidden);
      setValue("sixthSection.sectionLabel", data.sixthSection?.sectionLabel);
      setValue("sixthSection.title", data.sixthSection?.title);
      setValue("sixthSection.description", data.sixthSection?.description);
      setValue("seventhSection", data.seventhSection);

      replaceThird(data.thirdSection?.items || []);
      replaceFourth(data.fourthSection?.items || []);
      replaceFifth(data.fifthSection?.items || []);
      replaceSixth(data.sixthSection?.items || []);
    } catch (e) {
      console.error(e);
      toast.error("Failed to load How We Work data");
    }
  };

  const onSubmit = async (data: HowWeWorkForm) => {
    try {
      const res = await fetch("/api/admin/how-we-work", {
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
            <div className="grid grid-cols-2 gap-4">
              <div className="flex flex-col gap-2">
                <Label className="font-bold">Image</Label>
                <Controller
                  name="secondSection.image"
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
                  {...register("secondSection.imageAlt")}
                  placeholder="Alt Tag"
                />
              </div>
              <div className="flex flex-col gap-2">
                <Label className="font-bold">Title</Label>
                <Input
                  {...register("secondSection.title")}
                  placeholder="Title"
                />
                <Label className="font-bold">Description</Label>
                <Controller
                  name={`secondSection.description`}
                  control={control}
                  render={({ field }) => (
                    <TinyEditor
                      setNewsContent={field.onChange}
                      newsContent={field.value}
                    />
                  )}
                />
              </div>
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
            <div className="flex items-center justify-between">
              <Label className="font-bold">Items</Label>
              <Button
                type="button"
                addItem
                onClick={() => appendThird({ title: "", content: "" })}
              >
                + Add Item
              </Button>
            </div>
            <div className="grid grid-cols-3 gap-4">
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
                  <Label className="font-bold">Content</Label>
                  <Controller
                    name={`thirdSection.items.${index}.content`}
                    control={control}
                    render={({ field }) => (
                      <TinyEditor
                        setNewsContent={field.onChange}
                        newsContent={field.value}
                      />
                    )}
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
            <Label className="font-bold">Section Label</Label>
            <Input
              {...register("fourthSection.sectionLabel")}
              placeholder="Section Label"
            />
            <div className="grid grid-cols-2 gap-4">
              <div className="flex flex-col gap-2">
                <Label className="font-bold">Image</Label>
                <Controller
                  name="fourthSection.image"
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
                  {...register("fourthSection.imageAlt")}
                  placeholder="Alt Tag"
                />
              </div>
              <div className="flex flex-col gap-2">
                <Label className="font-bold">Title</Label>
                <Input
                  {...register("fourthSection.title")}
                  placeholder="Title"
                />
                <Label className="font-bold">Description</Label>
                <Textarea
                  {...register("fourthSection.description")}
                  placeholder="Description"
                />
              </div>
            </div>
            <div className="flex items-center justify-between">
              <Label className="font-bold">Items</Label>
              <Button
                type="button"
                addItem
                onClick={() =>
                  appendFourth({ icon: "", iconAlt: "", title: "" })
                }
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
                  <Label className="font-bold">Title</Label>
                  <Input
                    {...register(`fourthSection.items.${index}.title`)}
                    placeholder="Title"
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
            <Label className="font-bold">Section Label</Label>
            <Input
              {...register("fifthSection.sectionLabel")}
              placeholder="Section Label"
            />
            <Label className="font-bold">Title</Label>
            <Input {...register("fifthSection.title")} placeholder="Title" />
            <Label className="font-bold">Description</Label>
            <Textarea
              {...register("fifthSection.description")}
              placeholder="Description"
            />
            <div className="flex items-center justify-between">
              <Label className="font-bold">Items</Label>
              <Button
                type="button"
                addItem
                onClick={() =>
                  appendFifth({
                    image: "",
                    imageAlt: "",
                    title: "",
                    description: "",
                  })
                }
              >
                + Add Item
              </Button>
            </div>
            <div className="grid grid-cols-2 gap-4">
              {fifthItems.map((field, index) => (
                <div
                  key={field.id}
                  className="border border-black/10 rounded-lg p-4 flex flex-col gap-3"
                >
                  <div className="flex items-center justify-between">
                    <Label className="font-bold">Item {index + 1}</Label>
                    <Button type="button" onClick={() => removeFifth(index)}>
                      <RiDeleteBinLine size={16} />
                    </Button>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="flex flex-col gap-2">
                      <Label className="font-bold">Image</Label>
                      <Controller
                        name={`fifthSection.items.${index}.image`}
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
                        {...register(`fifthSection.items.${index}.imageAlt`)}
                        placeholder="Image Alt"
                      />
                    </div>
                    <div className="flex flex-col gap-2">
                      <Label className="font-bold">Title</Label>
                      <Input
                        {...register(`fifthSection.items.${index}.title`)}
                        placeholder="Title"
                      />
                      <Label className="font-bold">Description</Label>
                      <Textarea
                        {...register(`fifthSection.items.${index}.description`)}
                        placeholder="Description"
                      />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </AdminItemContainer>

        {/* Sixth Section */}
        <AdminItemContainer>
          <Label
            main
            isHidden={watch("sixthSection.isHidden")}
            onToggleHidden={() =>
              setValue("sixthSection.isHidden", !watch("sixthSection.isHidden"))
            }
          >
            Sixth Section
          </Label>
          <div className="p-5 flex flex-col gap-4">
            <Label className="font-bold">Section Label</Label>
            <Input
              {...register("sixthSection.sectionLabel")}
              placeholder="Section Label"
            />
            <Label className="font-bold">Title</Label>
            <Input {...register("sixthSection.title")} placeholder="Title" />
            <Label className="font-bold">Description</Label>
            <Textarea
              {...register("sixthSection.description")}
              placeholder="Description"
            />
            <div className="flex items-center justify-between">
              <Label className="font-bold">Items</Label>
              <Button
                type="button"
                addItem
                onClick={() =>
                  appendSixth({
                    image: "",
                    imageAlt: "",
                    title: "",
                    description: "",
                  })
                }
              >
                + Add Item
              </Button>
            </div>
            <div className="grid grid-cols-2 gap-4">
              {sixthItems.map((field, index) => (
                <div
                  key={field.id}
                  className="border border-black/10 rounded-lg p-4 flex flex-col gap-3"
                >
                  <div className="flex items-center justify-between">
                    <Label className="font-bold">Item {index + 1}</Label>
                    <Button type="button" onClick={() => removeSixth(index)}>
                      <RiDeleteBinLine size={16} />
                    </Button>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="flex flex-col gap-2">
                      <Label className="font-bold">Image</Label>
                      <Controller
                        name={`sixthSection.items.${index}.image`}
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
                        {...register(`sixthSection.items.${index}.imageAlt`)}
                        placeholder="Image Alt"
                      />
                    </div>
                    <div className="flex flex-col gap-2">
                      <Label className="font-bold">Title</Label>
                      <Input
                        {...register(`sixthSection.items.${index}.title`)}
                        placeholder="Title"
                      />
                      <Label className="font-bold">Description</Label>
                      <Textarea
                        {...register(`sixthSection.items.${index}.description`)}
                        placeholder="Description"
                      />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </AdminItemContainer>

        {/* Seventh Section */}
        <AdminItemContainer>
          <Label
            main
            isHidden={watch("seventhSection.isHidden")}
            onToggleHidden={() =>
              setValue(
                "seventhSection.isHidden",
                !watch("seventhSection.isHidden"),
              )
            }
          >
            Seventh Section
          </Label>
          <div className="p-5 flex flex-col gap-4">
            <Label className="font-bold">Title</Label>
            <Input {...register("seventhSection.title")} placeholder="Title" />
            <Label className="font-bold">Description</Label>
            <Textarea
              {...register("seventhSection.description")}
              placeholder="Description"
            />
            <div className="grid grid-cols-2 gap-4">
              <div className="flex flex-col gap-2">
                <Label className="font-bold">Button Text</Label>
                <Input
                  {...register("seventhSection.button.text")}
                  placeholder="Button Text"
                />
              </div>
              <div className="flex flex-col gap-2">
                <Label className="font-bold">Button Link</Label>
                <Input
                  {...register("seventhSection.button.link")}
                  placeholder="/link"
                />
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="flex flex-col gap-2">
                <Label className="font-bold">Image</Label>
                <Controller
                  name="seventhSection.image"
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
                  {...register("seventhSection.imageAlt")}
                  placeholder="Alt Tag"
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
