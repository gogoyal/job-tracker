import React from "react";

const ResumePreview = ({
  sections,
  profileImage,
  fontSize = "14px",
  theme = "blue",
}) => {
  // Get dynamic title color based on theme
  const getTitleColor = () => {
    return theme === "dark" ? "text-gray-700" : "text-blue-600";
  };

  return (
    <div className="space-y-4">
      {/* Profile Image */}
      {profileImage && (
        <div className="flex justify-center mb-4">
          <img
            src={profileImage}
            alt="Profile"
            className="w-[96px] h-[96px] mx-auto rounded-full object-cover border-2 border-blue-500"
          />
        </div>
      )}

      {/* Resume Sections */}
      {sections.map((section) =>
        section.value.trim() ? (
          <div key={section.id} className="mb-4">
            <h2 className={`text-lg font-bold ${getTitleColor()}`}>
              {section.title}
            </h2>
            <div
              className="text-sm whitespace-pre-line"
              style={{ fontSize }}
              dangerouslySetInnerHTML={{ __html: section.value }}
            />
          </div>
        ) : null
      )}
    </div>
  );
};

export default ResumePreview;
