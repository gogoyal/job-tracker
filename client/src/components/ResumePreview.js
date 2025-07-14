import React from "react";

const ResumePreview = ({ sections, profileImage }) => {
  return (
    <div className="space-y-4">
      {/* Profile Image (only if uploaded) */}
      {profileImage && (
        <div className="flex justify-center mb-4">
          <img
            src={profileImage}
            alt="Profile"
            className="w-[96px] h-[96px] mx-auto rounded-full object-cover border-2 border-blue-500"
          />
        </div>
      )}

      {/* Render each non-empty section */}
      {sections.map((section) =>
        section.value.trim() ? (
          <div key={section.id} className="mb-4">
            <h2 className="text-lg font-bold text-blue-600">{section.title}</h2>
            <p className="text-sm whitespace-pre-line">{section.value}</p>
          </div>
        ) : null
      )}
    </div>
  );
};

export default ResumePreview;
