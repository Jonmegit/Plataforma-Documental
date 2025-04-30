import dotenv from 'dotenv';
dotenv.config();

console.log('NEXT_PUBLIC_AUTH_API_URL:', process.env.NEXT_PUBLIC_AUTH_API_URL);
console.log('NEXT_PUBLIC_DOCS_API_URL:', process.env.NEXT_PUBLIC_DOCS_API_URL);

/** @type {import('next').NextConfig} */
const nextConfig = {
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: true,
  },
  images: {
    unoptimized: true,
  },
  env: {
    NEXT_PUBLIC_AUTH_API_URL: process.env.NEXT_PUBLIC_AUTH_API_URL,
    NEXT_PUBLIC_DOCS_API_URL: process.env.NEXT_PUBLIC_DOCS_API_URL,
  },
}

export default {
  env: {
    NEXT_PUBLIC_AUTH_API_URL: process.env.NEXT_PUBLIC_AUTH_API_URL,
    NEXT_PUBLIC_DOCS_API_URL: process.env.NEXT_PUBLIC_DOCS_API_URL,
  },
};
