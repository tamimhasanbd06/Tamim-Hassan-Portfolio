import Image from 'next/image';
import { useEffect, useState } from 'react';

/**
 * AdminAvatar component displays the admin logo if available.
 * If the logo image fails to load, it falls back to an initials placeholder.
 * The component is reusable across the project.
 */
export default function AdminAvatar({ size = 40, alt = 'Admin Avatar' }: { size?: number; alt?: string }) {
  const [hasImage, setHasImage] = useState(true);

  const logoPath = '/assets/brand/tamim-hassan-logo.png';

  const handleError = () => setHasImage(false);

  useEffect(() => {
    setHasImage(true);
  }, []);

  return (
    <div className="flex items-center justify-center" style={{ width: size, height: size }}>
      {hasImage ? (
        <Image src={logoPath} alt={alt} width={size} height={size} onError={handleError} priority />
      ) : (
        <span className="inline-flex items-center justify-center w-full h-full bg-gray-800 text-white rounded-full text-sm font-medium">
          AD
        </span>
      )}
    </div>
  );
}
