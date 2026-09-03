import path from 'path';

/** @type {import('next').NextConfig} */
const nextConfig = {
  /* config options here */
  reactCompiler: true,
  sassOptions: {
    includePaths: [path.join(process.cwd(), 'node_modules')],
  },
};

export default nextConfig;
