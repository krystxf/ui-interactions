/** @type {import("next").NextConfig} */
const config = {
	images: {
		formats: ["image/avif", "image/webp"],
		qualities: [80],
		minimumCacheTTL: 60 * 60 * 24 * 365,
		imageSizes: [16, 32, 48, 64, 96],
		deviceSizes: [640, 1080, 1920],
		remotePatterns: [{ protocol: "https", hostname: "i.pravatar.cc" }],
	},
};

export default config;
