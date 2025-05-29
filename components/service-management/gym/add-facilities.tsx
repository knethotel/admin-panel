'use client';

import React, { useState } from 'react';
import { Plus, Camera } from 'lucide-react';
import Image from 'next/image';

const AddFacilities = () => {
  const [images, setImages] = useState<(string | null)[]>(Array(12).fill(null));

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>, index: number) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const updated = [...images];
        updated[index] = reader.result as string;
        setImages(updated);
      };
      reader.readAsDataURL(file);
    }
  };

  const triggerFileInput = (index: number) => {
    const input = document.getElementById(`upload-${index}`) as HTMLInputElement;
    input?.click();
  };

  return (
    <div className="p-4 sm:p-6 rounded-lg shadow-md bg-[#FAF6EF] w-full mx-auto">
      <h2 className="text-lg font-semibold text-gray-800 mb-4">Upload Gym Equipments</h2>
      <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 gap-4 mb-6">
        {images.map((img, index) => (
          <div
            key={index}
            onClick={() => triggerFileInput(index)}
            className="aspect-square bg-[#F6EEE0] rounded-md flex items-center justify-center cursor-pointer hover:opacity-80 transition"
          >
            {img ? (
              <Image
                src={img}
                alt={`equipment-${index}`}
                width={80}
                height={80}
                className="object-cover w-full h-full rounded-md"
              />
            ) : (
              <Camera className="text-[#a67c52] w-6 h-6 font-light" />
            )}
            <input
              id={`upload-${index}`}
              type="file"
              accept="image/*"
              onChange={(e) => handleImageChange(e, index)}
              className="hidden"
            />
          </div>
        ))}
      </div>
      <hr className="border-t border-gray-300 mb-4" />
      <div className="flex justify-end gap-4">
        <button
          className="px-4 py-2 bg-[#F6EEE0] text-gray-800 rounded-md hover:bg-gray-200 transition"
          onClick={() => setImages(Array(12).fill(null))}
        >
          Cancel
        </button>
        <button className="px-6 py-2 bg-[#a67c52] text-white rounded-md hover:bg-[#8a633d] transition">
          Save
        </button>
      </div>
    </div>
  );
};

export default AddFacilities;