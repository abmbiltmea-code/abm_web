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
import { RiDeleteBinLine } from "react-icons/ri";
import TinyEditor from "../common/TinyMceEditor";

interface Entry {
  _id: string;
  title: string;
}

interface FeaturedProject {
  _id: string;
  title: string;
  thumbImage: string;
}

interface HomeForm {
  seo: { metaTitle: string; metaDescription: string; script: string };
  firstSection: {
    isHidden: boolean;
    items: {
      image: string;
      imageAlt: string;
      title: string;
      subTitle: string;
      subDescription: string;
    }[];
  };
  secondSection: {
    isHidden: boolean;
    sectionLabel: string;
    title: string;
    description: string;
    icon: string;
    iconAlt: string;
    items: { value: string; label: string }[];
  };
  thirdSection: {
    isHidden: boolean;
    sectionLabel: string;
    title: string;
    description: string;
    divisionIds: string[];
  };
  fourthSection: {
    isHidden: boolean;
    sectionLabel: string;
    title: string;
    description: string;
    sectorIds: string[];
  };
  fifthSection: {
    isHidden: boolean;
    title: string;
    description: string;
    items: { icon: string; iconAlt: string; title: string }[];
  };
  sixthSection: {
    isHidden: boolean;
    sectionLabel: string;
    title: string;
    description: string;
    button: { text: string; link: string };
  };
  seventhSection: {
    isHidden: boolean;
    sectionLabel: string;
    title: string;
    description: string;
    items: { image: string; imageAlt: string }[];
  };
  eighthSection: {
    isHidden: boolean;
    title: string;
    description: string;
    items: {
      icon: string;
      iconAlt: string;
      title: string;
      description: string;
    }[];
  };
}

export default function HomeDetail() {
  const { register, handleSubmit, setValue, control, watch } =
    useForm<HomeForm>({
      defaultValues: {
        thirdSection: { divisionIds: [] },
        fourthSection: { sectorIds: [] },
      },
    });

  const {
    fields: firstItems,
    append: appendFirst,
    remove: removeFirst,
    replace: replaceFirst,
  } = useFieldArray({ control, name: "firstSection.items" });

  const {
    fields: secondItems,
    append: appendSecond,
    remove: removeSecond,
    replace: replaceSecond,
  } = useFieldArray({ control, name: "secondSection.items" });

  const {
    fields: fifthItems,
    append: appendFifth,
    remove: removeFifth,
    replace: replaceFifth,
  } = useFieldArray({ control, name: "fifthSection.items" });

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

  const [divisions, setDivisions] = useState<Entry[]>([]);
  const [sectors, setSectors] = useState<Entry[]>([]);
  const [featuredProjects, setFeaturedProjects] = useState<FeaturedProject[]>(
    [],
  );

  const fetchLookups = async () => {
    try {
      const [divisionsRes, sectorsRes] = await Promise.all([
        fetch("/api/admin/divisions"),
        fetch("/api/admin/sector"),
      ]);

      if (divisionsRes.ok) {
        const { data } = await divisionsRes.json();
        setDivisions(
          (data || []).map((d: { _id: string; name: string }) => ({
            _id: d._id,
            title: d.name,
          })),
        );
      }

      if (sectorsRes.ok) {
        const { data } = await sectorsRes.json();
        setSectors(
          (data.secondSection?.sectors || []).map(
            (s: { _id: string; title: string }) => ({
              _id: s._id,
              title: s.title,
            }),
          ),
        );
      }
    } catch (e) {
      console.error(e);
    }
  };

  const fetchData = async () => {
    try {
      const res = await fetch("/api/admin/home");
      const contentType = res.headers.get("content-type");
      if (!res.ok || !contentType?.includes("application/json")) {
        toast.error("Failed to load home data");
        return;
      }

      const { data } = await res.json();
      setValue("seo", data.seo);
      setValue("firstSection.isHidden", data.firstSection?.isHidden);
      setValue("secondSection.isHidden", data.secondSection?.isHidden);
      setValue("secondSection.sectionLabel", data.secondSection?.sectionLabel);
      setValue("secondSection.title", data.secondSection?.title);
      setValue("secondSection.description", data.secondSection?.description);
      setValue("secondSection.icon", data.secondSection?.icon);
      setValue("secondSection.iconAlt", data.secondSection?.iconAlt);

      setValue("thirdSection.isHidden", data.thirdSection?.isHidden);
      setValue("thirdSection.sectionLabel", data.thirdSection?.sectionLabel);
      setValue("thirdSection.title", data.thirdSection?.title);
      setValue("thirdSection.description", data.thirdSection?.description);
      setValue(
        "thirdSection.divisionIds",
        (data.thirdSection?.divisionIds || []).map(
          (d: { _id: string } | string) => (typeof d === "string" ? d : d._id),
        ),
      );

      setValue("fourthSection.isHidden", data.fourthSection?.isHidden);
      setValue("fourthSection.sectionLabel", data.fourthSection?.sectionLabel);
      setValue("fourthSection.title", data.fourthSection?.title);
      setValue("fourthSection.description", data.fourthSection?.description);
      setValue("fourthSection.sectorIds", data.fourthSection?.sectorIds || []);

      setValue("fifthSection.isHidden", data.fifthSection?.isHidden);
      setValue("fifthSection.title", data.fifthSection?.title);
      setValue("fifthSection.description", data.fifthSection?.description);

      setValue("sixthSection", data.sixthSection);

      setValue("seventhSection.isHidden", data.seventhSection?.isHidden);
      setValue(
        "seventhSection.sectionLabel",
        data.seventhSection?.sectionLabel,
      );
      setValue("seventhSection.title", data.seventhSection?.title);
      setValue("seventhSection.description", data.seventhSection?.description);

      setValue("eighthSection.isHidden", data.eighthSection?.isHidden);
      setValue("eighthSection.title", data.eighthSection?.title);
      setValue("eighthSection.description", data.eighthSection?.description);

      replaceFirst(data.firstSection?.items || []);
      replaceSecond(data.secondSection?.items || []);
      replaceFifth(data.fifthSection?.items || []);
      replaceSeventh(data.seventhSection?.items || []);
      replaceEighth(data.eighthSection?.items || []);

      setFeaturedProjects(data.sixthSection?.featuredProjects || []);
    } catch (e) {
      console.error(e);
      toast.error("Failed to load home data");
    }
  };

  const onSubmit = async (data: HomeForm) => {
    try {
      const res = await fetch("/api/admin/home", {
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

  const toggleDivisionId = (id: string) => {
    const current = watch("thirdSection.divisionIds") || [];
    setValue(
      "thirdSection.divisionIds",
      current.includes(id) ? current.filter((d) => d !== id) : [...current, id],
    );
  };

  const toggleSectorId = (id: string) => {
    const current = watch("fourthSection.sectorIds") || [];
    setValue(
      "fourthSection.sectorIds",
      current.includes(id) ? current.filter((s) => s !== id) : [...current, id],
    );
  };

  useEffect(() => {
    fetchLookups();
    fetchData();
  }, []);

  return (
    <div className="flex flex-col gap-5">
      <form className="flex flex-col gap-5" onSubmit={handleSubmit(onSubmit)}>
        {/* First Section — Hero Slides */}
        <AdminItemContainer>
          <Label
            main
            isHidden={watch("firstSection.isHidden")}
            onToggleHidden={() =>
              setValue("firstSection.isHidden", !watch("firstSection.isHidden"))
            }
          >
            First Section — Hero Slides
          </Label>
          <div className="p-5 flex flex-col gap-4">
            <div className="flex justify-end">
              <Button
                type="button"
                addItem
                onClick={() =>
                  appendFirst({
                    image: "",
                    imageAlt: "",
                    title: "",
                    subTitle: "",
                    subDescription: "",
                  })
                }
              >
                + Add Slide
              </Button>
            </div>
            <div className="grid grid-cols-2 gap-4">
              {firstItems.map((field, index) => (
                <div
                  key={field.id}
                  className="border border-black/10 rounded-lg p-4 flex flex-col gap-3"
                >
                  <div className="flex items-center justify-between">
                    <Label className="font-bold">Slide {index + 1}</Label>
                    <Button type="button" onClick={() => removeFirst(index)}>
                      <RiDeleteBinLine size={16} />
                    </Button>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="flex flex-col gap-2">
                      <Label className="font-bold">Image</Label>
                      <Controller
                        name={`firstSection.items.${index}.image`}
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
                        {...register(`firstSection.items.${index}.imageAlt`)}
                        placeholder="Image Alt"
                      />
                    </div>
                    <div className="flex flex-col gap-2">
                      <Label className="font-bold">Title</Label>
                      <Input
                        {...register(`firstSection.items.${index}.title`)}
                        placeholder="Title"
                      />
                      <Label className="font-bold">Sub Title</Label>
                      <Input
                        {...register(`firstSection.items.${index}.subTitle`)}
                        placeholder="Sub Title"
                      />
                      <Label className="font-bold">Sub Description</Label>
                      <Textarea
                        {...register(
                          `firstSection.items.${index}.subDescription`,
                        )}
                        placeholder="Sub Description"
                      />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </AdminItemContainer>

        {/* Second Section — Stats */}
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
            Second Section — Stats
          </Label>
          <div className="p-5 flex flex-col gap-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="flex flex-col gap-2">
                <Label className="font-bold">Icon</Label>
                <Controller
                  name="secondSection.icon"
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
                  {...register("secondSection.iconAlt")}
                  placeholder="Icon Alt"
                />
              </div>
              <div className="flex flex-col gap-2">
                <Label className="font-bold">Section Label</Label>
                <Input
                  {...register("secondSection.sectionLabel")}
                  placeholder="Section Label"
                />
                <Label className="font-bold">Title</Label>
                <Input
                  {...register("secondSection.title")}
                  placeholder="Title"
                />
                <Label className="font-bold">Description</Label>
                <Controller
                  name="secondSection.description"
                  control={control}
                  render={({ field }) => (
                    <TinyEditor
                      newsContent={field.value}
                      setNewsContent={field.onChange}
                    />
                  )}
                />
              </div>
            </div>
            <div className="flex items-center justify-between">
              <Label className="font-bold">Stats</Label>
              <Button
                type="button"
                addItem
                onClick={() => appendSecond({ value: "", label: "" })}
              >
                + Add Stat
              </Button>
            </div>
            <div className="grid grid-cols-4 gap-4">
              {secondItems.map((field, index) => (
                <div
                  key={field.id}
                  className="border border-black/10 rounded-lg p-4 flex flex-col gap-3"
                >
                  <div className="flex items-center justify-between">
                    <Label className="font-bold">Stat {index + 1}</Label>
                    <Button type="button" onClick={() => removeSecond(index)}>
                      <RiDeleteBinLine size={16} />
                    </Button>
                  </div>
                  <Label className="font-bold">Value</Label>
                  <Input
                    {...register(`secondSection.items.${index}.value`)}
                    placeholder="e.g. 25+"
                  />
                  <Label className="font-bold">Label</Label>
                  <Input
                    {...register(`secondSection.items.${index}.label`)}
                    placeholder="e.g. Years of Experience"
                  />
                </div>
              ))}
            </div>
          </div>
        </AdminItemContainer>

        {/* Third Section — Divisions */}
        <AdminItemContainer>
          <Label
            main
            isHidden={watch("thirdSection.isHidden")}
            onToggleHidden={() =>
              setValue("thirdSection.isHidden", !watch("thirdSection.isHidden"))
            }
          >
            Third Section — Divisions
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
            <Label className="font-bold">Select Divisions</Label>
            <div className="grid grid-cols-3 gap-2">
              {divisions.length === 0 && (
                <p className="text-sm text-black/40">No divisions found.</p>
              )}
              {divisions.map((division) => {
                const selected = (
                  watch("thirdSection.divisionIds") || []
                ).includes(division._id);
                return (
                  <label
                    key={division._id}
                    className={`flex items-center gap-2 border rounded-md px-3 py-2 text-sm cursor-pointer ${
                      selected ? "border-black bg-black/5" : "border-black/10"
                    }`}
                  >
                    <input
                      type="checkbox"
                      checked={selected}
                      onChange={() => toggleDivisionId(division._id)}
                    />
                    {division.title}
                  </label>
                );
              })}
            </div>
          </div>
        </AdminItemContainer>

        {/* Fourth Section — Sectors */}
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
            Fourth Section — Sectors
          </Label>
          <div className="p-5 flex flex-col gap-4">
            <Label className="font-bold">Section Label</Label>
            <Input
              {...register("fourthSection.sectionLabel")}
              placeholder="Section Label"
            />
            <Label className="font-bold">Title</Label>
            <Input {...register("fourthSection.title")} placeholder="Title" />
            <Label className="font-bold">Description</Label>
            <Textarea
              {...register("fourthSection.description")}
              placeholder="Description"
            />
            <Label className="font-bold">Select Sectors</Label>
            <div className="grid grid-cols-3 gap-2">
              {sectors.length === 0 && (
                <p className="text-sm text-black/40">No sectors found.</p>
              )}
              {sectors.map((sector) => {
                const selected = (
                  watch("fourthSection.sectorIds") || []
                ).includes(sector._id);
                return (
                  <label
                    key={sector._id}
                    className={`flex items-center gap-2 border rounded-md px-3 py-2 text-sm cursor-pointer ${
                      selected ? "border-black bg-black/5" : "border-black/10"
                    }`}
                  >
                    <input
                      type="checkbox"
                      checked={selected}
                      onChange={() => toggleSectorId(sector._id)}
                    />
                    {sector.title}
                  </label>
                );
              })}
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
            <div className="flex items-center justify-between">
              <Label className="font-bold">Items</Label>
              <Button
                type="button"
                addItem
                onClick={() =>
                  appendFifth({ icon: "", iconAlt: "", title: "" })
                }
              >
                + Add Item
              </Button>
            </div>
            <div className="grid grid-cols-4 gap-4">
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
                  <Controller
                    name={`fifthSection.items.${index}.icon`}
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
                    {...register(`fifthSection.items.${index}.iconAlt`)}
                    placeholder="Icon Alt"
                  />
                  <Label className="font-bold">Title</Label>
                  <Input
                    {...register(`fifthSection.items.${index}.title`)}
                    placeholder="Title"
                  />
                </div>
              ))}
            </div>
          </div>
        </AdminItemContainer>

        {/* Sixth Section — Featured Projects (read-only preview) */}
        <AdminItemContainer>
          <Label
            main
            isHidden={watch("sixthSection.isHidden")}
            onToggleHidden={() =>
              setValue("sixthSection.isHidden", !watch("sixthSection.isHidden"))
            }
          >
            Sixth Section — Featured Projects
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
            <div className="grid grid-cols-2 gap-4">
              <div className="flex flex-col gap-2">
                <Label className="font-bold">Button Text</Label>
                <Input
                  {...register("sixthSection.button.text")}
                  placeholder="Button Text"
                />
              </div>
              <div className="flex flex-col gap-2">
                <Label className="font-bold">Button Link</Label>
                <Input
                  {...register("sixthSection.button.link")}
                  placeholder="/link"
                />
              </div>
            </div>
            <div className="flex flex-col gap-2">
              <Label className="font-bold">
                Currently Featured (mark projects as featured on the Projects
                page)
              </Label>
              <div className="grid grid-cols-4 gap-3">
                {featuredProjects.length === 0 && (
                  <p className="text-sm text-black/40">
                    No projects marked as featured yet.
                  </p>
                )}
                {featuredProjects.map((project) => (
                  <div
                    key={project._id}
                    className="flex items-center gap-2 border border-black/10 rounded-md px-3 py-2"
                  >
                    {project.thumbImage && (
                      // eslint-disable-next-line @next/next/no-img-element
                      <img
                        src={project.thumbImage}
                        alt=""
                        className="w-8 h-8 object-cover rounded"
                      />
                    )}
                    <span className="text-sm">{project.title}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </AdminItemContainer>

        {/* Seventh Section — Logo Strip */}
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
            <Label className="font-bold">Description</Label>
            <Textarea
              {...register("seventhSection.description")}
              placeholder="Description"
            />
            <div className="flex items-center justify-between">
              <Label className="font-bold">Images</Label>
              <Button
                type="button"
                addItem
                onClick={() => appendSeventh({ image: "", imageAlt: "" })}
              >
                + Add Image
              </Button>
            </div>
            <div className="grid grid-cols-4 gap-4">
              {seventhItems.map((field, index) => (
                <div
                  key={field.id}
                  className="border border-black/10 rounded-lg p-4 flex flex-col gap-3"
                >
                  <div className="flex items-center justify-between">
                    <Label className="font-bold">Image {index + 1}</Label>
                    <Button type="button" onClick={() => removeSeventh(index)}>
                      <RiDeleteBinLine size={16} />
                    </Button>
                  </div>
                  <Controller
                    name={`seventhSection.items.${index}.image`}
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
                    {...register(`seventhSection.items.${index}.imageAlt`)}
                    placeholder="Image Alt"
                  />
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
            <Label className="font-bold">Title</Label>
            <Input {...register("eighthSection.title")} placeholder="Title" />
            <Label className="font-bold">Description</Label>
            <Textarea
              {...register("eighthSection.description")}
              placeholder="Description"
            />
            <div className="flex items-center justify-between">
              <Label className="font-bold">Items</Label>
              <Button
                type="button"
                addItem
                onClick={() =>
                  appendEighth({
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
            <div className="grid grid-cols-3 gap-4">
              {eighthItems.map((field, index) => (
                <div
                  key={field.id}
                  className="border border-black/10 rounded-lg p-4 flex flex-col gap-3"
                >
                  <div className="flex items-center justify-between">
                    <Label className="font-bold">Item {index + 1}</Label>
                    <Button type="button" onClick={() => removeEighth(index)}>
                      <RiDeleteBinLine size={16} />
                    </Button>
                  </div>
                  <Controller
                    name={`eighthSection.items.${index}.icon`}
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
                    {...register(`eighthSection.items.${index}.iconAlt`)}
                    placeholder="Icon Alt"
                  />
                  <Label className="font-bold">Title</Label>
                  <Input
                    {...register(`eighthSection.items.${index}.title`)}
                    placeholder="Title"
                  />
                  <Label className="font-bold">Description</Label>
                  <Textarea
                    {...register(`eighthSection.items.${index}.description`)}
                    placeholder="Description"
                  />
                </div>
              ))}
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
