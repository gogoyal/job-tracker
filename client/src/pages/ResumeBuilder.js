import React, { useRef, useState } from "react";
import Navbar from "../components/Navbar";
import ResumePreview from "../components/ResumePreview";
import { v4 as uuidv4 } from "uuid";
import jsPDF from "jspdf";
import html2canvas from "html2canvas";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { ArrowUp, ArrowDown } from "lucide-react";

const ResumeBuilder = () => {
  const previewRef = useRef();
  const printRef = useRef();

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
  const [imageSize, setImageSize] = useState(100);
  const [fontSize, setFontSize] = useState("14px");

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => setProfileImage(reader.result);
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
    if (targetIndex < 0 || targetIndex >= newSections.length) return;
    const temp = newSections[targetIndex];
    newSections[targetIndex] = newSections[index];
    newSections[index] = temp;
    setSections(newSections);
  };

  const handleDownload = async () => {
    const element = printRef.current;
    if (!element) return;

    const canvas = await html2canvas(element, {
      scale: 2,
      useCORS: true,
      backgroundColor: "#ffffff",
    });

    const imgData = canvas.toDataURL("image/png");
    const pdf = new jsPDF("p", "pt", "a4");

    const pdfWidth = pdf.internal.pageSize.getWidth();
    const imgProps = pdf.getImageProperties(imgData);
    const pdfHeight = (imgProps.height * pdfWidth) / imgProps.width;

    pdf.addImage(imgData, "PNG", 0, 0, pdfWidth, pdfHeight);
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

          {/* Image Upload */}
          <div>
            <label className="font-semibold block mb-1">Profile Image</label>
            <input type="file" accept="image/*" onChange={handleImageChange} />
            {profileImage && (
              <div className="mt-2">
                <img
                  src={profileImage}
                  alt="Profile"
                  style={{
                    width: `${imageSize}px`,
                    height: `${imageSize}px`,
                    borderRadius: "9999px",
                    objectFit: "cover",
                    border: "2px solid #2563eb",
                  }}
                />
                <input
                  type="range"
                  min={50}
                  max={200}
                  value={imageSize}
                  onChange={(e) => setImageSize(Number(e.target.value))}
                  className="w-full mt-2"
                />
                <button
                  onClick={() => setProfileImage("")}
                  className="text-sm text-red-500 underline mt-1"
                >
                  Remove Image
                </button>
              </div>
            )}
          </div>

          {/* Input Fields */}
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
                <ReactQuill
                  theme="snow"
                  value={section.value}
                  onChange={(value) => handleChange(section.id, value)}
                  className="bg-white dark:bg-gray-800"
                />
              )}
            </div>
          ))}

          {/* Custom Section */}
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
              <div className="flex items-center space-x-2">
                <label className="text-sm font-medium">Text Size:</label>
                <select
                  value={fontSize}
                  onChange={(e) => setFontSize(e.target.value)}
                  className="border rounded px-2 py-1"
                >
                  <option value="12px">Small</option>
                  <option value="14px">Medium</option>
                  <option value="16px">Large</option>
                  <option value="18px">X-Large</option>
                </select>
              </div>

              <button
                onClick={handleDownload}
                className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded"
              >
                Download PDF
              </button>
            </div>
          )}
        </div>

        {/* Live Preview */}
        <div
          ref={previewRef}
          className="w-full lg:w-1/2 bg-white dark:bg-gray-800 p-6 border dark:border-gray-600 shadow rounded-lg"
        >
          <ResumePreview sections={sections} profileImage={profileImage} />
        </div>
      </div>

      {/* HIDDEN PRINT AREA (off-screen but visible to DOM) */}
      <div
        ref={printRef}
        style={{
          position: "absolute",
          top: "-100000px",
          left: "-100000px",
          padding: 40,
          width: "595px",
          backgroundColor: "#ffffff",
          color: "#000000",
          fontFamily: "Arial, sans-serif",
        }}
      >
        <div style={{ maxWidth: 595, margin: "0 auto" }}>
          {profileImage && (
            <div style={{ textAlign: "center", marginBottom: 20 }}>
              <img
                src={profileImage}
                alt="Profile"
                style={{
                  width: `${imageSize}px`,
                  height: `${imageSize}px`,
                  objectFit: "cover",
                  borderRadius: "50%",
                  border: "2px solid #2563eb",
                }}
              />
            </div>
          )}
          {sections
            .filter((s) => s.value.trim() !== "")
            .map((section) => (
              <div key={section.id} style={{ marginBottom: 16 }}>
                <h3 style={{ color: "#2563eb", fontSize: 14 }}>
                  {section.title}
                </h3>
                <div
                  style={{ fontSize: 11, lineHeight: 1.5 }}
                  dangerouslySetInnerHTML={{ __html: section.value }}
                />
              </div>
            ))}
        </div>
      </div>
    </div>
  );
};

export default ResumeBuilder;
