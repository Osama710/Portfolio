/**
 * Optional Cloudinary helper.
 *
 * The portfolio does not require Cloudinary to function — every project
 * card currently renders with a local gradient + icon treatment. If you
 * later add real screenshots to your Cloudinary account, set
 * NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME in .env.local and use `cloudinaryUrl()`
 * below to build optimized delivery URLs, then pass them to next/image.
 *
 * Example:
 *   <Image src={cloudinaryUrl("portfolio/raptr-store-cover")} ... />
 */
const CLOUD_NAME = process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME;

interface CloudinaryOptions {
  width?: number;
  quality?: string | number;
}

export function cloudinaryUrl(
  publicId: string,
  { width = 1200, quality = "auto" }: CloudinaryOptions = {},
): string | null {
  if (!CLOUD_NAME) return null;

  const transforms = [`f_auto`, `q_${quality}`, `w_${width}`, `c_limit`].join(
    ",",
  );

  return `https://res.cloudinary.com/${CLOUD_NAME}/image/upload/${transforms}/${publicId}`;
}

export const isCloudinaryConfigured = Boolean(CLOUD_NAME);
