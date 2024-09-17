"use client";
import React, { useEffect, useState } from "react";
import { useFormStatus } from "react-dom";
import Image from "next/image";

import { cn } from "@/lib/utils";
import { unsplash } from "@/config/generate-background-images";
import { fallbackImages } from "@/config/fallback-images";
import { Loader2 } from "lucide-react";
import Link from "next/link";
import FormErrors from "./form-errors";

type Props = {
  id: string;
  errors?: Record<string, string[] | undefined>;
};

const FormBackgroundPicker = ({ id, errors }: Props) => {
  const [images, setImages] = useState<Record<string, any>[]>(fallbackImages);

  const [isLoading, setIsLoading] = useState(true);
  const [selectedImage, setSelectedImage] = useState<any | null>(
    fallbackImages[0]
  );
  const { pending } = useFormStatus();

  useEffect(() => {
    const fetchImages = async () => {
      try {
        // throw new Error("no need to call unsplash api for the development");
        const result = await unsplash.photos.getRandom({
          collectionIds: ["317099"],
          count: 6,
        });
        if (result && result.response) {
          const fetchedImages = result.response as Record<string, any>[];
          setImages(fetchedImages);
        } else {
          console.log("Couldnt fetch any images");
        }
      } catch (error) {
        console.log("err for stoping unsplash api");
        setImages(fallbackImages);
      } finally {
        setIsLoading(false);
      }
    };
    fetchImages();
  }, []);

  if (isLoading)
    return (
      <div className="w-full h-full flex items-center justify-center">
        <Loader2 className="animate-spin" />
      </div>
    );

  return (
    <div className="relative">
      <div className="grid grid-cols-3 gap-2 my-2">
        {images.map((image) => {
          return (
            <div
              key={image.id}
              className={cn(
                "relative aspect-square bg-muted cursor-pointer group hover:opacity-75 transition",
                pending &&
                  "opacity-40 hover:opacity-40 cursor-not-allowed select-none"
              )}
              onClick={() => {
                if (selectedImage === image.id) {
                  setSelectedImage(null);
                } else {
                  setSelectedImage(image.id);
                }
              }}
            >
              <input
                type="radio"
                readOnly
                name={id}
                id={id}
                className="hidden"
                checked={selectedImage === image.id}
                disabled={pending}
                value={`${image.id}${process.env.NEXT_PUBLIC_SPLIT_CHAR}${image.user.name}${process.env.NEXT_PUBLIC_SPLIT_CHAR}${image.links.html}${process.env.NEXT_PUBLIC_SPLIT_CHAR}${image.urls.thumb}${process.env.NEXT_PUBLIC_SPLIT_CHAR}${image.urls.full}`}
              />

              <Image
                src={image.urls.thumb}
                fill
                alt="Unsplash Background Image"
                className={cn(
                  " object-cover rounded-md",
                  selectedImage === image.id ? "rounded-full transition" : ""
                )}
                sizes="15vw"
              />
              <Link
                href={image.links.html}
                target="_blank"
                className="pl-1 absolute text-[9px] bottom-0 left-0 opacity-0 group-hover:opacity-100 text-white bg-black/50 truncate w-full transition hover:underline"
              >
                {image.user.name}
              </Link>
            </div>
          );
        })}
      </div>
      <FormErrors id="image" errors={errors} />
    </div>
  );
};

export default FormBackgroundPicker;
