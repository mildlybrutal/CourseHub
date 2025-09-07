import type { NextConfig } from "next";

const nextConfig = {
	eslint: {
		// Disable ESLint during production builds
		ignoreDuringBuilds: true,
	},
	typescript: {
		// Disable type checking during production builds (not recommended)
		// ignoreBuildErrors: true,
	},
};

export default nextConfig;
