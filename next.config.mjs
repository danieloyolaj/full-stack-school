/** @type {import('next').NextConfig} */
const nextConfig = {
  images:{
    remotePatterns:[{hostname: 'images.pexels.com'}], //This will allow to read data from this specific hostname
  },
};

export default nextConfig;
