import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  reactCompiler: true,
  async redirects(){
    return [
      {
        source: '/chartjs:suffix(\'+)',
        destination: '/chartjs',
        permanent: true,
      }
    ];
  }
};

export default nextConfig;
