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
import TinyEditor from "../common/TinyMceEditor";

interface Entry {
  _id: string;
  title: string;
}

interface ProjectItemForm {
  isHidden: boolean;
  title: string;
  slug: string;
  featured: boolean;
  status: string;
  location: string;
  division: string;
  sector: string;
  thumbImage: string;
  thumbImageAlt: string;
  images: { url: string; alt: string }[];
  client: string;
  consultant: string;
  duration: string;
  projectValue: string;
  scopeOfWorks: {
    items: { title: string; description: string }[];
  };
}

export default function ProjectItemDetail() {
  const router = useRouter();
  const params = useParams<{ id: string }>();
  const isNew = params.id === "new";

  const { register, handleSubmit, setValue, control, watch } =
    useForm<ProjectItemForm>({
      defaultValues: {
        images: [],
        scopeOfWorks: { items: [] },
        isHidden: false,
        featured: false,
      },
    });

  const {
    fields: imageFields,
    append: appendImage,
    remove: removeImage,
  } = useFieldArray({ control, name: "images" });

  const {
    fields: scopeFields,
    append: appendScope,
    remove: removeScope,
  } = useFieldArray({ control, name: "scopeOfWorks.items" });

  const [content, setContent] = useState("");
  const [statuses, setStatuses] = useState<Entry[]>([]);
  const [locations, setLocations] = useState<Entry[]>([]);
  const [divisions, setDivisions] = useState<Entry[]>([]);
  const [sectors, setSectors] = useState<Entry[]>([]);
  const [isLoading, setIsLoading] = useState(!isNew);
  const [isSaving, setIsSaving] = useState(false);

  const fetchLookups = async () => {
    try {
      const [projectsRes, divisionsRes, sectorsRes] = await Promise.all([
        fetch("/api/admin/projects"),
        fetch("/api/admin/divisions"),
        fetch("/api/admin/sector"),
      ]);

      if (projectsRes.ok) {
        const { data } = await projectsRes.json();
        setStatuses(data.statuses || []);
        setLocations(data.locations || []);
      }

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

  const fetchProject = async () => {
    try {
      const res = await fetch(`/api/admin/projects/items/${params.id}`);
      const contentType = res.headers.get("content-type");
      if (!res.ok || !contentType?.includes("application/json")) {
        toast.error("Failed to load project");
        return;
      }
      const { data } = await res.json();
      setValue("isHidden", data.isHidden ?? false);
      setValue("title", data.title);
      setValue("slug", data.slug);
      setValue("featured", data.featured ?? false);
      setValue("status", data.status || "");
      setValue("location", data.location || "");
      setValue("division", data.division || "");
      setValue("sector", data.sector || "");
      setValue("thumbImage", data.thumbImage);
      setValue("thumbImageAlt", data.thumbImageAlt);
      setValue("images", data.images || []);
      setValue("client", data.client);
      setValue("consultant", data.consultant);
      setValue("duration", data.duration);
      setValue("projectValue", data.projectValue);
      setValue("scopeOfWorks", data.scopeOfWorks || { items: [] });
      setContent(data.content || "");
    } catch (e) {
      console.error(e);
      toast.error("Failed to load project");
    } finally {
      setIsLoading(false);
    }
  };

  const onSubmit = async (formData: ProjectItemForm) => {
    setIsSaving(true);
    try {
      const payload = { ...formData, content };
      const res = await fetch(
        isNew
          ? "/api/admin/projects/items"
          : `/api/admin/projects/items/${params.id}`,
        {
          method: isNew ? "POST" : "PATCH",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload),
        },
      );
      const { message } = await res.json();
      if (res.ok) {
        toast.success(message || "Project saved");
        router.push("/admin/projects");
      } else {
        toast.error(message || "Failed to save project");
      }
    } catch (e) {
      console.error(e);
      toast.error("Something went wrong");
    } finally {
      setIsSaving(false);
    }
  };

  useEffect(() => {
    fetchLookups();
    if (!isNew) fetchProject();
  }, []);

  return (
    <div className="flex flex-col gap-5">
      <form className="flex flex-col gap-5" onSubmit={handleSubmit(onSubmit)}>
        <AdminItemContainer>
          <Label main>Project Details</Label>
          <div className="p-5 flex flex-col gap-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="flex flex-col gap-2">
                <Label className="font-bold">Title</Label>
                <Input {...register("title")} placeholder="Project Title" />
              </div>
              <div className="flex flex-col gap-2">
                <Label className="font-bold">Slug</Label>
                <div className="flex gap-3">
                  <Input {...register("slug")} placeholder="project-slug" />
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
              <div className="flex gap-2">
                <Label className="font-bold">Featured(Show in Home Page)</Label>
                <Controller
                  name="featured"
                  control={control}
                  render={({ field }) => (
                    <Input
                      type="checkbox"
                      checked={field.value}
                      onChange={(e) => field.onChange(e.target.checked)}
                      onBlur={field.onBlur}
                      name={field.name}
                      ref={field.ref}
                      className="w-5 h-5"
                    />
                  )}
                />
              </div>
            </div>

            <div className="grid grid-cols-4 gap-4">
              <div className="flex flex-col gap-2">
                <Label className="font-bold">Status</Label>
                <select
                  {...register("status")}
                  className="border border-black/20 rounded-md px-3 py-2 text-sm"
                >
                  <option value="">Select Status</option>
                  {statuses.map((s) => (
                    <option key={s._id} value={s._id}>
                      {s.title}
                    </option>
                  ))}
                </select>
              </div>
              <div className="flex flex-col gap-2">
                <Label className="font-bold">Location</Label>
                <select
                  {...register("location")}
                  className="border border-black/20 rounded-md px-3 py-2 text-sm"
                >
                  <option value="">Select Location</option>
                  {locations.map((l) => (
                    <option key={l._id} value={l._id}>
                      {l.title}
                    </option>
                  ))}
                </select>
              </div>
              <div className="flex flex-col gap-2">
                <Label className="font-bold">Division</Label>
                <select
                  {...register("division")}
                  className="border border-black/20 rounded-md px-3 py-2 text-sm"
                >
                  <option value="">Select Division</option>
                  {divisions.map((d) => (
                    <option key={d._id} value={d._id}>
                      {d.title}
                    </option>
                  ))}
                </select>
              </div>
              <div className="flex flex-col gap-2">
                <Label className="font-bold">Sector</Label>
                <select
                  {...register("sector")}
                  className="border border-black/20 rounded-md px-3 py-2 text-sm"
                >
                  <option value="">Select Sector</option>
                  {sectors.map((s) => (
                    <option key={s._id} value={s._id}>
                      {s.title}
                    </option>
                  ))}
                </select>
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
          <Label main>Images</Label>
          <div className="p-5 flex flex-col gap-4">
            <div className="flex justify-end">
              <Button
                type="button"
                addItem
                onClick={() => appendImage({ url: "", alt: "" })}
              >
                + Add Image
              </Button>
            </div>
            <div className="grid grid-cols-3 gap-4">
              {imageFields.map((field, index) => (
                <div
                  key={field.id}
                  className="border border-black/10 rounded-lg p-4 flex flex-col gap-3"
                >
                  <div className="flex items-center justify-between">
                    <Label className="font-bold">Image {index + 1}</Label>
                    <Button type="button" onClick={() => removeImage(index)}>
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

        <AdminItemContainer>
          <Label main>Project Info</Label>
          <div className="p-5 grid grid-cols-4 gap-4">
            <div className="flex flex-col gap-2">
              <Label className="font-bold">Client</Label>
              <Input {...register("client")} placeholder="Client" />
            </div>
            <div className="flex flex-col gap-2">
              <Label className="font-bold">Consultant</Label>
              <Input {...register("consultant")} placeholder="Consultant" />
            </div>
            <div className="flex flex-col gap-2">
              <Label className="font-bold">Duration</Label>
              <Input {...register("duration")} placeholder="e.g. 18 months" />
            </div>
            <div className="flex flex-col gap-2">
              <Label className="font-bold">Project Value</Label>
              <Input {...register("projectValue")} placeholder="e.g. AED 50M" />
            </div>
          </div>
        </AdminItemContainer>

        <AdminItemContainer>
          <Label main>Scope of Works</Label>
          <div className="p-5 flex flex-col gap-4">
            <div className="flex justify-end">
              <Button
                type="button"
                addItem
                onClick={() => appendScope({ title: "", description: "" })}
              >
                + Add Item
              </Button>
            </div>
            <div className="grid grid-cols-2 gap-4">
              {scopeFields.map((field, index) => (
                <div
                  key={field.id}
                  className="border border-black/10 rounded-lg p-4 flex flex-col gap-3"
                >
                  <div className="flex items-center justify-between">
                    <Label className="font-bold">Item {index + 1}</Label>
                    <Button type="button" onClick={() => removeScope(index)}>
                      <RiDeleteBinLine size={16} />
                    </Button>
                  </div>
                  <Label className="font-bold">Title</Label>
                  <Input
                    {...register(`scopeOfWorks.items.${index}.title`)}
                    placeholder="Title"
                  />
                  <Label className="font-bold">Description</Label>
                  <Input
                    {...register(`scopeOfWorks.items.${index}.description`)}
                    placeholder="Description"
                  />
                </div>
              ))}
            </div>
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
            {isSaving ? "Saving..." : "Save Project"}
          </Button>
        </div>
      </form>
    </div>
  );
}
