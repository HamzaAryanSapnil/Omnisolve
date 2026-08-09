"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

import ROUTES from "@/constants/routes";

const FALLBACK_LOGO = "/images/site-logo.svg";

interface EmployerLogoProps {
  src?: string;
  alt: string;
  href?: string;
  size?: number;
}

const EmployerLogo = ({
  src,
  alt,
  href,
  size = 64,
}: EmployerLogoProps) => {
  const [logoSrc, setLogoSrc] = useState(src || FALLBACK_LOGO);
  const isFallback = logoSrc === FALLBACK_LOGO;

  const image = isFallback ? (
    <Image
      src={FALLBACK_LOGO}
      alt={alt}
      width={size}
      height={size}
      className="rounded-[10px]"
    />
  ) : (
    <Link
      href={href ?? ROUTES.JOBS}
      className="bg-light-800! dark:bg-dark-400! relative shrink-0 rounded-xl"
      style={{ width: size, height: size }}
    >
      <Image
        src={logoSrc}
        alt={alt}
        fill
        className="object-contain p-2"
        onError={() => setLogoSrc(FALLBACK_LOGO)}
      />
    </Link>
  );

  return image;
};

export default EmployerLogo;
