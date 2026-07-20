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

interface AboutForm {
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
    subTitle: string;
    description: string;
    items: { icon: string; iconAlt: string; value: string; label: string }[];
  };
  secondSection: {
    isHidden: boolean;
    video: string;
    videoAlt: string;
    poster: string;
    posterAlt: string;
  };
  thirdSection: {
    isHidden: boolean;
    sectionLabel: string;
    title: string;
    description: string;
  };
  fourthSection: {
    isHidden: boolean;
    sectionLabel: string;
    items: {
      icon: string;
      iconAlt: string;
      title: string;
      description: string;
    }[];
  };
  fifthSection: {
    isHidden: boolean;
    sectionLabel: string;
    title: string;
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
      year: string;
      title: string;
      description: string;
    }[];
  };
  seventhSection: {
    isHidden: boolean;
    sectionLabel: string;
    title: string;
    items: {
      icon: string;
      iconAlt: string;
      title: string;
      description: string;
      button: { text: string; link: string };
    }[];
  };
  eighthSection: {
    isHidden: boolean;
    sectionLabel: string;
    title: string;
    items: {
      image: string;
      imageAlt: string;
      title: string;
      description: string;
    }[];
  };
  ninthSection: {
    isHidden: boolean;
    title: string;
    description: string;
    button: { text: string; link: string };
  };
}

export default function AboutPage() {
  const { register, handleSubmit, setValue, control, watch } =
    useForm<AboutForm>();

  const {
    fields: firstItems,
    append: appendFirst,
    remove: removeFirst,
    replace: replaceFirst,
  } = useFieldArray({ control, name: "firstSection.items" });
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
  const {
    fields: seventhItems,
    append: appendSeventh,
    remove: removeSeventh,
    replace: replaceSeventh,
  } = useFieldArray({ control, name: "seventhSection.items" });
  const {
    fields: eighthItems,
    append: appendEighth,
    remove: removeEighth,
    replace: replaceEighth,
  } = useFieldArray({ control, name: "eighthSection.items" });

  const fetchData = async () => {
    try {
      const res = await fetch("/api/admin/about");
      if (res.ok) {
        const { data } = await res.json();
        setValue("seo", data.seo);
        setValue("bannerSection", data.bannerSection);
        setValue("firstSection", data.firstSection);
        setValue("secondSection", data.secondSection);
        setValue("thirdSection", data.thirdSection);
        setValue("fourthSection", data.fourthSection);
        setValue("fifthSection", data.fifthSection);
        setValue("sixthSection", data.sixthSection);
        setValue("seventhSection", data.seventhSection);
        setValue("eighthSection", data.eighthSection);
        setValue("ninthSection", data.ninthSection);

        replaceFirst(data.firstSection?.items || []);
        replaceFourth(data.fourthSection?.items || []);
        replaceFifth(data.fifthSection?.items || []);
        replaceSixth(data.sixthSection?.items || []);
        replaceSeventh(data.seventhSection?.items || []);
        replaceEighth(data.eighthSection?.items || []);
      } else {
        const { message } = await res.json();
        toast.error(message);
      }
    } catch (e) {
      console.error(e);
    }
  };

  const onSubmit = async (data: AboutForm) => {
    try {
      const res = await fetch("/api/admin/about", {
        method: "PATCH",
        body: JSON.stringify(data),
      });
      if (res.ok) {
        const { message } = await res.json();
        toast.success(message);
      } else {
        const { message } = await res.json();
        toast.error(message);
      }
    } catch (e) {
      console.error(e);
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
            <Label className="font-bold">Sub Title</Label>
            <Input
              {...register("firstSection.subTitle")}
              placeholder="Sub Title"
            />
            <Label className="font-bold">Description</Label>
            <Controller
              name="firstSection.description"
              control={control}
              rules={{ required: "Content is required" }}
              render={({ field }) => {
                return (
                  <TinyEditor
                    setNewsContent={field.onChange}
                    newsContent={field.value}
                  />
                );
              }}
            />
            <div className="flex items-center justify-between mt-2">
              <Label className="font-bold">Items</Label>
              <Button
                type="button"
                addItem
                onClick={() =>
                  appendFirst({ icon: "", iconAlt: "", value: "", label: "" })
                }
              >
                + Add Item
              </Button>
            </div>
            <div className="grid grid-cols-2 gap-4">
              {firstItems.map((field, index) => (
                <div
                  key={field.id}
                  className="border border-black/10 rounded-lg p-4 flex flex-col gap-3"
                >
                  <div className="flex items-center justify-between">
                    <Label className="font-bold">Item {index + 1}</Label>
                    <Button
                      type="button"
                      onClick={() => removeFirst(index)}
                    >
                      <RiDeleteBinLine size={16} />
                    </Button>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="flex flex-col gap-2">
                      <Label className="font-bold">Icon</Label>
                      <Controller
                        name={`firstSection.items.${index}.icon`}
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
                        {...register(`firstSection.items.${index}.iconAlt`)}
                        placeholder="Icon Alt"
                      />
                    </div>
                    <div className="flex flex-col gap-2">
                      <Label className="font-bold">Value</Label>
                      <Input
                        {...register(`firstSection.items.${index}.value`)}
                        placeholder="Value"
                      />
                      <Label className="font-bold">Label</Label>
                      <Input
                        {...register(`firstSection.items.${index}.label`)}
                        placeholder="Label"
                      />
                    </div>
                  </div>
                </div>
              ))}
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
            <div className="grid grid-cols-2 gap-4">
              <div className="flex flex-col gap-2">
                <Label className="font-bold">Video</Label>
                <Controller
                  name="secondSection.video"
                  control={control}
                  render={({ field }) => (
                    <ImageUploader
                      value={field.value}
                      onChange={field.onChange}
                    />
                  )}
                />
                <Label className="font-bold">Video Alt</Label>
                <Input
                  {...register("secondSection.videoAlt")}
                  placeholder="Video Alt"
                />
              </div>
              <div className="flex flex-col gap-2">
                <Label className="font-bold">Poster</Label>
                <Controller
                  name="secondSection.poster"
                  control={control}
                  render={({ field }) => (
                    <ImageUploader
                      value={field.value}
                      onChange={field.onChange}
                    />
                  )}
                />
                <Label className="font-bold">Poster Alt</Label>
                <Input
                  {...register("secondSection.posterAlt")}
                  placeholder="Poster Alt"
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
            <Label className="font-bold">Section Label</Label>
            <Input
              {...register("fourthSection.sectionLabel")}
              placeholder="Section Label"
            />
            <div className="flex items-center justify-between mt-2">
              <Label className="font-bold">Items</Label>
              <Button
                type="button"
                addItem
                onClick={() =>
                  appendFourth({
                    icon: "",
                    iconAlt: "",
                    title: "",
                    description: "",
                  })
                }
              >
                + Add Item
              </Button>
            </div>
            <div className="grid grid-cols-2 gap-4">
              {fourthItems.map((field, index) => (
                <div
                  key={field.id}
                  className="border border-black/10 rounded-lg p-4 flex flex-col gap-3"
                >
                  <div className="flex items-center justify-between">
                    <Label className="font-bold">Item {index + 1}</Label>
                    <Button
                      type="button"
                      onClick={() => removeFourth(index)}
                    >
                      <RiDeleteBinLine size={16} />
                    </Button>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="flex flex-col gap-2">
                      <Label className="font-bold">Icon</Label>
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
                    <div className="flex flex-col gap-2">
                      <Label className="font-bold">Title</Label>
                      <Input
                        {...register(`fourthSection.items.${index}.title`)}
                        placeholder="Title"
                      />
                      <Label className="font-bold">Description</Label>
                      <Textarea
                        {...register(
                          `fourthSection.items.${index}.description`,
                        )}
                        placeholder="Description"
                      />
                    </div>
                  </div>
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
            <div className="flex items-center justify-between mt-2">
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
                    <Button
                      type="button"
                      onClick={() => removeFifth(index)}
                    >
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
            <div className="flex items-center justify-between mt-2">
              <Label className="font-bold">Items</Label>
              <Button
                type="button"
                addItem
                onClick={() =>
                  appendSixth({
                    image: "",
                    imageAlt: "",
                    year: "",
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
                    <Button
                      type="button"
                      onClick={() => removeSixth(index)}
                    >
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
                      <Label className="font-bold">Year</Label>
                      <Input
                        {...register(`sixthSection.items.${index}.year`)}
                        placeholder="Year"
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
            <Label className="font-bold">Section Label</Label>
            <Input
              {...register("seventhSection.sectionLabel")}
              placeholder="Section Label"
            />
            <Label className="font-bold">Title</Label>
            <Input {...register("seventhSection.title")} placeholder="Title" />
            <div className="flex items-center justify-between mt-2">
              <Label className="font-bold">Items</Label>
              <Button
                type="button"
                addItem
                onClick={() =>
                  appendSeventh({
                    icon: "",
                    iconAlt: "",
                    title: "",
                    description: "",
                    button: { text: "", link: "" },
                  })
                }
              >
                + Add Item
              </Button>
            </div>
            <div className="grid grid-cols-2 gap-4">
              {seventhItems.map((field, index) => (
                <div
                  key={field.id}
                  className="border border-black/10 rounded-lg p-4 flex flex-col gap-3"
                >
                  <div className="flex items-center justify-between">
                    <Label className="font-bold">Item {index + 1}</Label>
                    <Button
                      type="button"
                      onClick={() => removeSeventh(index)}
                    >
                      <RiDeleteBinLine size={16} />
                    </Button>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="flex flex-col gap-2">
                      <Label className="font-bold">Icon</Label>
                      <Controller
                        name={`seventhSection.items.${index}.icon`}
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
                        {...register(`seventhSection.items.${index}.iconAlt`)}
                        placeholder="Icon Alt"
                      />
                    </div>
                    <div className="flex flex-col gap-2">
                      <Label className="font-bold">Title</Label>
                      <Input
                        {...register(`seventhSection.items.${index}.title`)}
                        placeholder="Title"
                      />
                      <Label className="font-bold">Description</Label>
                      <Textarea
                        {...register(
                          `seventhSection.items.${index}.description`,
                        )}
                        placeholder="Description"
                      />
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="flex flex-col gap-2">
                      <Label className="font-bold">Button Text</Label>
                      <Input
                        {...register(
                          `seventhSection.items.${index}.button.text`,
                        )}
                        placeholder="Button Text"
                      />
                    </div>
                    <div className="flex flex-col gap-2">
                      <Label className="font-bold">Button Link</Label>
                      <Input
                        {...register(
                          `seventhSection.items.${index}.button.link`,
                        )}
                        placeholder="Button Link"
                      />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </AdminItemContainer>

        {/* Eighth Section */}
        <AdminItemContainer>
          <Label
            main
            isHidden={watch("eighthSection.isHidden")}
            onToggleHidden={() =>
              setValue(
                "eighthSection.isHidden",
                !watch("eighthSection.isHidden"),
              )
            }
          >
            Eighth Section
          </Label>
          <div className="p-5 flex flex-col gap-4">
            <Label className="font-bold">Section Label</Label>
            <Input
              {...register("eighthSection.sectionLabel")}
              placeholder="Section Label"
            />
            <Label className="font-bold">Title</Label>
            <Input {...register("eighthSection.title")} placeholder="Title" />
            <div className="flex items-center justify-between mt-2">
              <Label className="font-bold">Items</Label>
              <Button
                type="button"
                addItem
                onClick={() =>
                  appendEighth({
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
              {eighthItems.map((field, index) => (
                <div
                  key={field.id}
                  className="border border-black/10 rounded-lg p-4 flex flex-col gap-3"
                >
                  <div className="flex items-center justify-between">
                    <Label className="font-bold">Item {index + 1}</Label>
                    <Button
                      type="button"
                      onClick={() => removeEighth(index)}
                    >
                      <RiDeleteBinLine size={16} />
                    </Button>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="flex flex-col gap-2">
                      <Label className="font-bold">Image</Label>
                      <Controller
                        name={`eighthSection.items.${index}.image`}
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
                        {...register(`eighthSection.items.${index}.imageAlt`)}
                        placeholder="Image Alt"
                      />
                    </div>
                    <div className="flex flex-col gap-2">
                      <Label className="font-bold">Title</Label>
                      <Input
                        {...register(`eighthSection.items.${index}.title`)}
                        placeholder="Title"
                      />
                      <Label className="font-bold">Description</Label>
                      <Textarea
                        {...register(
                          `eighthSection.items.${index}.description`,
                        )}
                        placeholder="Description"
                      />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </AdminItemContainer>

        {/* Ninth Section */}
        <AdminItemContainer>
          <Label
            main
            isHidden={watch("ninthSection.isHidden")}
            onToggleHidden={() =>
              setValue("ninthSection.isHidden", !watch("ninthSection.isHidden"))
            }
          >
            Ninth Section
          </Label>
          <div className="p-5 flex flex-col gap-4">
            <Label className="font-bold">Title</Label>
            <Input {...register("ninthSection.title")} placeholder="Title" />
            <Label className="font-bold">Description</Label>
            <Textarea
              {...register("ninthSection.description")}
              placeholder="Description"
            />
            <div className="grid grid-cols-2 gap-4">
              <div className="flex flex-col gap-2">
                <Label className="font-bold">Button Text</Label>
                <Input
                  {...register("ninthSection.button.text")}
                  placeholder="Button Text"
                />
              </div>
              <div className="flex flex-col gap-2">
                <Label className="font-bold">Button Link</Label>
                <Input
                  {...register("ninthSection.button.link")}
                  placeholder="Button Link"
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
