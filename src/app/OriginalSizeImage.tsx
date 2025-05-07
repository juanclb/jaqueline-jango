import React, { useState, useEffect, useRef } from "react";
import Image from "next/image";

interface OriginalSizeImageProps {
  src: string;
  alt: string;
  className?: string;
}

const OriginalSizeImage: React.FC<OriginalSizeImageProps> = ({
  src,
  alt,
  className,
}) => {
  // Estado inicial temporário
  const [dimensions, setDimensions] = useState<{
    width: number;
    height: number;
  }>({ width: 50, height: 50 });
  const [loaded, setLoaded] = useState<boolean>(false);
  const imageRef = useRef<HTMLImageElement>(null);

  useEffect(() => {
    // Função para obter as dimensões reais
    const loadImage = (): void => {
      const img = new window.Image();
      img.onload = () => {
        setDimensions({
          width: img.naturalWidth,
          height: img.naturalHeight,
        });
        setLoaded(true);
      };
      img.src = src;
    };

    loadImage();
  }, [src]);

  return (
    <>
      {!loaded ? (
        <div style={{ width: "50px", height: "50px" }}></div>
      ) : (
        <Image
          ref={imageRef}
          src={src}
          alt={alt}
          width={dimensions.width}
          height={dimensions.height}
          className={className}
          style={{
            maxWidth: "100%",
            height: "auto",
            width: "auto",
          }}
          unoptimized={true} // Importante: evita qualquer otimização do Next
        />
      )}
    </>
  );
};

export default OriginalSizeImage;
