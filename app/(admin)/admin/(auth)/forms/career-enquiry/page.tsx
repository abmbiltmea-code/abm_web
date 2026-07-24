"use client";

import AdminItemContainer from "@/app/components/admin/common/AdminItemContainer";
import { useEffect, useState } from "react";
import {
  Eye,
  Trash2,
  FileText,
  Download,
  Mail,
  Phone,
  MapPin,
  Calendar,
  MessageSquare,
} from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

// Shape matches CareerEnquiry model
interface Application {
  _id: string;
  firstName: string;
  secondName: string;
  phoneNumber: string;
  email: string;
  currentLocation: string;
  message: string;
  cvUrl: string;
  cvFileName: string;
  createdAt: string;
}

const MESSAGE_PREVIEW_LIMIT = 60;

// Dropbox share links use ?dl=0 for inline view, ?dl=1 to force download.
// This swaps the flag rather than assuming which one is already in cvUrl.
function getViewUrl(url: string) {
  if (url.includes("dl=1")) return url.replace("dl=1", "dl=0");
  if (url.includes("dl=0")) return url;
  return url.includes("?") ? `${url}&dl=0` : `${url}?dl=0`;
}

function getDownloadUrl(url: string) {
  if (url.includes("dl=0")) return url.replace("dl=0", "dl=1");
  if (url.includes("dl=1")) return url;
  return url.includes("?") ? `${url}&dl=1` : `${url}?dl=1`;
}

export default function CareerApplicationPage() {
  const [applications, setApplications] = useState<Application[]>([]);
  const [selectedIds, setSelectedIds] = useState<Set<string>>(new Set());
  const [loading, setLoading] = useState(true);
  const [deletingId, setDeletingId] = useState<string | null>(null);
  const [bulkDeleting, setBulkDeleting] = useState(false);
  const [viewApplication, setViewApplication] = useState<Application | null>(
    null,
  );

  const fetchApplications = async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/admin/forms/career-applications");
      const json = await res.json();
      setApplications(json.data || []);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchApplications();
  }, []);

  const toggleOne = (id: string) => {
    setSelectedIds((prev) => {
      const next = new Set(prev);
      next.has(id) ? next.delete(id) : next.add(id);
      return next;
    });
  };

  const toggleAll = () => {
    if (selectedIds.size === applications.length) {
      setSelectedIds(new Set());
    } else {
      setSelectedIds(new Set(applications.map((a) => a._id)));
    }
  };

  const handleDeleteOne = async (id: string) => {
    if (!confirm("Delete this application?")) return;

    setDeletingId(id);
    try {
      const res = await fetch(`/api/admin/forms/career-applications/${id}`, {
        method: "DELETE",
      });
      if (!res.ok) throw new Error("Delete failed");

      setApplications((prev) => prev.filter((a) => a._id !== id));
      setSelectedIds((prev) => {
        const next = new Set(prev);
        next.delete(id);
        return next;
      });
    } catch (err) {
      console.error(err);
      alert("Failed to delete application");
    } finally {
      setDeletingId(null);
    }
  };

  const handleBulkDelete = async () => {
    if (selectedIds.size === 0) return;
    if (!confirm(`Delete ${selectedIds.size} selected applications?`)) return;

    setBulkDeleting(true);
    try {
      const res = await fetch("/api/admin/forms/career-applications", {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ids: Array.from(selectedIds) }),
      });
      if (!res.ok) throw new Error("Bulk delete failed");

      setApplications((prev) => prev.filter((a) => !selectedIds.has(a._id)));
      setSelectedIds(new Set());
    } catch (err) {
      console.error(err);
      alert("Failed to delete selected applications");
    } finally {
      setBulkDeleting(false);
    }
  };

  const truncateMessage = (message: string) => {
    if (!message) return "—";
    if (message.length <= MESSAGE_PREVIEW_LIMIT) return message;
    return `${message.slice(0, MESSAGE_PREVIEW_LIMIT)}...`;
  };

  if (loading) {
    return <div className="p-6">Loading applications...</div>;
  }

  return (
    <AdminItemContainer>
      <div className="p-6">
        <div className="flex items-center justify-between mb-4">
          <h1 className="text-xl font-semibold">Career Applications</h1>

          {selectedIds.size > 0 && (
            <button
              onClick={handleBulkDelete}
              disabled={bulkDeleting}
              className="flex items-center gap-2 bg-red-600 text-white px-4 py-2 rounded disabled:opacity-50"
            >
              <Trash2 size={16} />
              {bulkDeleting
                ? "Deleting..."
                : `Delete Selected (${selectedIds.size})`}
            </button>
          )}
        </div>

        {applications.length === 0 ? (
          <p className="text-gray-500">No applications found.</p>
        ) : (
          <div className="overflow-x-auto border rounded">
            <table className="w-full text-sm">
              <thead className="bg-gray-100 text-left">
                <tr>
                  <th className="p-3">
                    <input
                      type="checkbox"
                      checked={
                        selectedIds.size === applications.length &&
                        applications.length > 0
                      }
                      onChange={toggleAll}
                    />
                  </th>
                  <th className="p-3">Name</th>
                  <th className="p-3">Email</th>
                  <th className="p-3">Phone</th>
                  <th className="p-3">Location</th>
                  <th className="p-3">Message</th>
                  <th className="p-3">Date</th>
                  <th className="p-3">Action</th>
                </tr>
              </thead>
              <tbody>
                {applications.map((app) => (
                  <tr key={app._id} className="border-t">
                    <td className="p-3">
                      <input
                        type="checkbox"
                        checked={selectedIds.has(app._id)}
                        onChange={() => toggleOne(app._id)}
                      />
                    </td>
                    <td className="p-3">
                      {app.firstName} {app.secondName}
                    </td>
                    <td className="p-3">{app.email}</td>
                    <td className="p-3">{app.phoneNumber}</td>
                    <td className="p-3">{app.currentLocation}</td>
                    <td className="p-3 max-w-[240px]">
                      {truncateMessage(app.message)}
                    </td>
                    <td className="p-3 whitespace-nowrap">
                      {new Date(app.createdAt).toLocaleDateString()}
                    </td>
                    <td>
                      <div className="flex items-center gap-5">
                        <button
                          onClick={() => setViewApplication(app)}
                          className="text-gray-600 hover:text-gray-900 cursor-pointer"
                          title="View"
                        >
                          <Eye size={22} />
                        </button>
                        <button
                          onClick={() => handleDeleteOne(app._id)}
                          disabled={deletingId === app._id}
                          className="text-red-600 hover:text-red-800 disabled:opacity-50 cursor-pointer"
                          title="Delete"
                        >
                          <Trash2 size={22} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

{/* View full application dialog */}
<Dialog
  open={!!viewApplication}
  onOpenChange={(open) => !open && setViewApplication(null)}
>
  <DialogContent className="max-w-max p-0 overflow-hidden">
    {viewApplication && (
      <>
        {/* Header block */}
        <DialogHeader className="px-6 pt-6 pb-4 border-b border-border-color">
          <DialogTitle className="text-16 font-bold text-secondary">
            {viewApplication.firstName} {viewApplication.secondName}
          </DialogTitle>
          <p className="text-14 text-secondary flex items-center gap-1 mt-1">
            <Calendar size={12} />
            Applied on {new Date(viewApplication.createdAt).toLocaleString()}
          </p>
        </DialogHeader>

        {/* Contact info block */}
        <div className="px-6 py-4 grid grid-cols-2 gap-4 border-b border-border-color bg-cream-background">
          <div className="flex items-start gap-2">
            <Mail size={15} className="text-secondary mt-0.5" />
            <div>
              <p className="text-16 font-bold text-secondary uppercase tracking-wide">
                Email
              </p>
              <p className="text-14 text-secondary break-all">
                {viewApplication.email}
              </p>
            </div>
          </div>
          <div className="flex items-start gap-2">
            <Phone size={15} className="text-secondary mt-0.5" />
            <div>
              <p className="text-16 font-bold text-secondary uppercase tracking-wide">
                Phone
              </p>
              <p className="text-14 text-secondary">
                {viewApplication.phoneNumber}
              </p>
            </div>
          </div>
          <div className="flex items-start gap-2 col-span-2">
            <MapPin size={15} className="text-secondary mt-0.5" />
            <div>
              <p className="text-16 font-bold text-secondary uppercase tracking-wide">
                Current Location
              </p>
              <p className="text-14 text-secondary">
                {viewApplication.currentLocation}
              </p>
            </div>
          </div>
        </div>

        {/* Message block */}
        <div className="px-6 py-4 border-b border-border-color">
          <p className="text-16 font-bold text-secondary uppercase tracking-wide flex items-center gap-1 mb-2">
            <MessageSquare size={12} />
            Message
          </p>
          <p className="text-14 text-secondary whitespace-pre-wrap max-h-48 overflow-y-auto leading-relaxed">
            {viewApplication.message || "No message provided."}
          </p>
        </div>

        {/* CV block */}
        <div className="px-6 py-4">
          <p className="text-16 font-bold text-secondary uppercase tracking-wide mb-2">
            CV / Resume
          </p>
          <div className="flex items-center justify-between gap-3 border border-border-color rounded-lg p-3 bg-cream-background">
            <div className="flex items-center gap-2 min-w-0">
              <FileText size={18} className="text-primary shrink-0" />
              <span className="text-14 text-secondary truncate">
                {viewApplication.cvFileName}
              </span>
            </div>
            <div className="flex items-center gap-2">
              <a
                href={getDownloadUrl(viewApplication.cvUrl)}
                download={viewApplication.cvFileName}
                className="flex items-center gap-1 text-14 text-white px-3 py-1.5 rounded bg-primary hover:opacity-90 transition-opacity"
              >
                <Download size={22} />
                Download
              </a>
            </div>
          </div>
        </div>
      </>
    )}
  </DialogContent>
</Dialog>
    </AdminItemContainer>
  );
}