"use client";

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Controller, useForm } from "react-hook-form";
import AdminItemContainer from "@/app/components/admin/common/AdminItemContainer";
import { toast } from "sonner";
import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { RiArrowLeftLine } from "react-icons/ri";
import TinyEditor from "../common/TinyMceEditor";

interface JobForm {
  title: string;
  category: string;
  slug: string;
  specs: {
    location: string;
    experience: string;
    type: string;
  };
}

export default function JobEditPage() {
  const router = useRouter();
  const params = useParams<{ id: string }>();
  const isNew = params.id === "new";

  const { register, handleSubmit, setValue, control, watch } =
    useForm<JobForm>();
  const [content, setContent] = useState("");
  const [isLoading, setIsLoading] = useState(!isNew);
  const [isSaving, setIsSaving] = useState(false);

  const fetchJob = async () => {
    try {
      const res = await fetch(`/api/admin/careers/jobs/${params.id}`);
      const contentType = res.headers.get("content-type");
      if (!res.ok || !contentType?.includes("application/json")) {
        toast.error("Failed to load job");
        return;
      }
      const { data } = await res.json();
      setValue("title", data.title);
      setValue("category", data.category);
      setValue("slug", data.slug);
      setValue("specs", data.specs);
      setContent(data.content || "");
    } catch (e) {
      console.error(e);
      toast.error("Failed to load job");
    } finally {
      setIsLoading(false);
    }
  };

  const onSubmit = async (formData: JobForm) => {
    setIsSaving(true);
    try {
      const payload = { ...formData, content };
      const res = await fetch(
        isNew
          ? "/api/admin/careers/jobs"
          : `/api/admin/careers/jobs/${params.id}`,
        {
          method: isNew ? "POST" : "PATCH",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload),
        },
      );
      const { message } = await res.json();
      if (res.ok) {
        toast.success(message || "Job saved");
        router.push("/admin/careers");
      } else {
        toast.error(message || "Failed to save job");
      }
    } catch (e) {
      console.error(e);
      toast.error("Something went wrong");
    } finally {
      setIsSaving(false);
    }
  };

  useEffect(() => {
    if (!isNew) fetchJob();
  }, []);

  return (
    <div className="flex flex-col gap-5">
      <form className="flex flex-col gap-5" onSubmit={handleSubmit(onSubmit)}>
        <AdminItemContainer>
          <Label main>Job Details</Label>
          <div className="p-5 flex flex-col gap-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="flex flex-col gap-2">
                <Label className="font-bold">Title</Label>
                <Input {...register("title")} placeholder="Job Title" />
              </div>
              <div className="flex flex-col gap-2">
                <Label className="font-bold">Category</Label>
                <Input {...register("category")} placeholder="Category" />
              </div>
            </div>
            <div className="flex flex-col gap-2">
              <Label className="font-bold">Slug</Label>
              <div className="flex gap-3">
                <Input {...register("slug")} placeholder="job-slug" />{" "}
                <Button
                addItem
                  onClick={() =>
                    setValue(
                      "slug",
                      watch("title").toLowerCase().replace(/\s+/g, "-"),
                    )
                  }
                  type="button"
                >
                  Generate
                </Button>
              </div>
            </div>
          </div>
        </AdminItemContainer>

        <AdminItemContainer>
          <Label main>Specs</Label>
          <div className="p-5 grid grid-cols-3 gap-4">
            <div className="flex flex-col gap-2">
              <Label className="font-bold">Location</Label>
              <Input
                {...register("specs.location")}
                placeholder="Kochi, Kerala"
              />
            </div>
            <div className="flex flex-col gap-2">
              <Label className="font-bold">Experience</Label>
              <Input
                {...register("specs.experience")}
                placeholder="2-4 years"
              />
            </div>
            <div className="flex flex-col gap-2">
              <Label className="font-bold">Type</Label>
              <Input {...register("specs.type")} placeholder="Full Time" />
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
            {isSaving ? "Saving..." : "Save Job"}
          </Button>
        </div>
      </form>
    </div>
  );
}
