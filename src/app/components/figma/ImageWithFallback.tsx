import { useState } from "react";
import type { ImgHTMLAttributes, CSSProperties } from "react";

const ERROR_IMG_SRC =
  "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iODgiIGhlaWdodD0iODgiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyIgc3Ryb2tlPSIjMDAwIiBmaWxsPSJub25lIiBzdHJva2Utd2lkdGg9IjIiPjxjaXJjbGUgY3g9IjQ0IiBjeT0iNDQiIHI9IjQwIi8+PHBhdGggZD0iTTI4IDI4bDMyIDMyTTYwIDI4TDI4IDYwIi8+PC9zdmc+";

type Props = ImgHTMLAttributes<HTMLImageElement>;

export function ImageWithFallback(props: Props) {
  const [didError, setDidError] = useState(false);

  const handleError = () => {
    setDidError(true);
  };

  const { src, alt, style, className, ...rest } = props;

  return didError ? (
    <div
      className={`inline-block bg-gray-100 text-center align-middle ${className ?? ""}`}
      style={style as CSSProperties}
    >
      <div className="flex items-center justify-center w-full h-full">
        <img
          src={ERROR_IMG_SRC}
          alt="Error loading image"
          {...rest}
          data-original-url={src}
        />
      </div>
    </div>
  ) : (
    <img
      src={src}
      alt={alt}
      className={className}
      style={style as CSSProperties}
      {...rest}
      onError={handleError}
    />
  );
}