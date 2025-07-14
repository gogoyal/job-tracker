import React, { useRef, useState } from "react";
import Navbar from "../components/Navbar";
import ResumePreview from "../components/ResumePreview";
import jsPDF from "jspdf";
import { v4 as uuidv4 } from "uuid";
import { ArrowUp, ArrowDown } from "lucide-react";

const ResumeBuilder = () => {
  const previewRef = useRef();

  const [sections, setSections] = useState([
    { id: "name", title: "Name", value: "", type: "input" },
    { id: "email", title: "Email", value: "", type: "input" },
    { id: "phone", title: "Phone", value: "", type: "input" },
    { id: "education", title: "Education", value: "", type: "textarea" },
    { id: "experience", title: "Experience", value: "", type: "textarea" },
    { id: "skills", title: "Skills", value: "", type: "textarea" },
    { id: "projects", title: "Projects", value: "", type: "textarea" },
  ]);

  const [newSectionTitle, setNewSectionTitle] = useState("");
  const [showTitleInput, setShowTitleInput] = useState(false);
  const [profileImage, setProfileImage] = useState("");

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setProfileImage(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleCustomTitleSubmit = () => {
    if (!newSectionTitle.trim()) return;
    const newId = uuidv4();
    setSections([
      ...sections,
      {
        id: newId,
        title: newSectionTitle.trim(),
        value: "",
        type: "textarea",
      },
    ]);
    setNewSectionTitle("");
    setShowTitleInput(false);
  };

  const handleChange = (id, newValue) => {
    setSections((prev) =>
      prev.map((section) =>
        section.id === id ? { ...section, value: newValue } : section
      )
    );
  };

  const moveSection = (index, direction) => {
    const newSections = [...sections];
    const targetIndex = index + direction;
    if (targetIndex < 0 || targetIndex >= sections.length) return;
    const temp = newSections[targetIndex];
    newSections[targetIndex] = newSections[index];
    newSections[index] = temp;
    setSections(newSections);
  };

  const handleDownload = async () => {
    const filteredSections = sections.filter(
      (section) => section.value.trim() !== ""
    );

    const pdf = new jsPDF("p", "pt", "a4");
    const pageWidth = pdf.internal.pageSize.getWidth();
    const margin = 40;
    let y = margin;

    // If profile image is uploaded
    if (profileImage) {
      const img = new Image();
      img.src = profileImage;

      await new Promise((resolve) => {
        img.onload = () => {
          const imgWidth = 80;
          const imgHeight = 80;
          pdf.addImage(
            img,
            "PNG",
            pageWidth / 2 - imgWidth / 2,
            y,
            imgWidth,
            imgHeight
          );
          y += imgHeight + 20;
          resolve();
        };
      });
    }

    pdf.setFont("helvetica", "normal");

    filteredSections.forEach((section) => {
      pdf.setTextColor("#2563eb"); // blue title
      pdf.setFontSize(14);
      pdf.text(section.title, margin, y);
      y += 18;

      pdf.setTextColor("#000000"); // black text
      pdf.setFontSize(11);

      // Break long text into lines
      const lines = pdf.splitTextToSize(section.value, pageWidth - margin * 2);
      pdf.text(lines, margin, y);
      y += lines.length * 14 + 10;
    });

    pdf.save("resume.pdf");
  };

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900 text-gray-900 dark:text-white transition-all duration-300">
      <Navbar />
      <div className="flex flex-col lg:flex-row p-6 gap-10">
        {/* Form Section */}
        <div className="w-full lg:w-1/2 bg-white dark:bg-gray-800 p-6 rounded-lg shadow space-y-4">
          <h2 className="text-2xl font-bold text-blue-600 dark:text-blue-400">
            Build Your Resume
          </h2>

          {/* Profile Image Upload */}
          <div>
            <label className="font-semibold block mb-1">
              Upload Profile Image
            </label>
            <input
              type="file"
              accept="image/*"
              onChange={handleImageChange}
              className="text-sm"
            />
            {profileImage && (
              <img
                src={profileImage}
                alt="Profile Preview"
                className="mt-2 w-24 h-24 rounded-full border border-blue-500 object-cover"
              />
            )}
          </div>

          {sections.map((section, index) => (
            <div
              key={section.id}
              className="bg-gray-50 dark:bg-gray-700 border dark:border-gray-600 p-4 rounded"
            >
              <div className="flex justify-between items-center mb-2">
                <label className="block font-semibold">{section.title}</label>
                <div className="space-x-2">
                  <button
                    onClick={() => moveSection(index, -1)}
                    className="text-gray-400 hover:text-blue-500"
                    title="Move Up"
                  >
                    <ArrowUp size={16} />
                  </button>
                  <button
                    onClick={() => moveSection(index, 1)}
                    className="text-gray-400 hover:text-blue-500"
                    title="Move Down"
                  >
                    <ArrowDown size={16} />
                  </button>
                </div>
              </div>

              {section.type === "input" ? (
                <input
                  type="text"
                  value={section.value}
                  onChange={(e) => handleChange(section.id, e.target.value)}
                  className="w-full border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-black dark:text-white rounded px-4 py-2"
                />
              ) : (
                <textarea
                  rows={3}
                  value={section.value}
                  onChange={(e) => handleChange(section.id, e.target.value)}
                  className="w-full border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-black dark:text-white rounded px-4 py-2"
                />
              )}
            </div>
          ))}

          {/* Custom Section Input */}
          {showTitleInput ? (
            <div className="flex gap-2">
              <input
                type="text"
                placeholder="Enter section title"
                value={newSectionTitle}
                onChange={(e) => setNewSectionTitle(e.target.value)}
                className="border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-black dark:text-white px-4 py-2 rounded w-full"
              />
              <button
                onClick={handleCustomTitleSubmit}
                className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded"
              >
                Add
              </button>
              <button
                onClick={() => {
                  setShowTitleInput(false);
                  setNewSectionTitle("");
                }}
                className="bg-gray-400 hover:bg-gray-500 text-white px-4 py-2 rounded"
              >
                Cancel
              </button>
            </div>
          ) : (
            <div className="flex gap-4">
              <button
                onClick={() => setShowTitleInput(true)}
                className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded"
              >
                + Add Custom Section
              </button>
              <button
                onClick={handleDownload}
                className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded"
              >
                Download PDF
              </button>
            </div>
          )}
        </div>

        {/* Preview Section */}
        <div
          ref={previewRef}
          className="w-full lg:w-1/2 bg-white dark:bg-gray-800 p-6 border dark:border-gray-600 shadow rounded-lg"
        >
          <ResumePreview sections={sections} profileImage={profileImage} />
        </div>
      </div>
    </div>
  );
};

export default ResumeBuilder;
