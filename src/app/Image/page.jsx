"use client";
import { useEffect, useState } from "react";

export default function Home() {
  const [images, setImages] = useState([]);

  useEffect(() => {
    const fetchImages = async () => {
      try {
        const response = await fetch("/api/images");
        const data = await response.json();
        setImages(data);
      } catch (error) {
        console.error("Error fetching images:", error);
      }
    };

    fetchImages();
  }, []);

  return (
    <div className="p-8">
      <h1 className="text-2xl mb-4">Uploaded Images</h1>
      <div className="grid grid-cols-3 gap-4">
        {images.map((img) => (
          <div key={img.id} className="p-2 border rounded">
            <h2 className="text-lg">{img.name}</h2>
            <img
              src={img.image}
              alt={img.name}
              className="w-full h-auto mt-2"
            />
          </div>
        ))}
      </div>
    </div>
  );
}
