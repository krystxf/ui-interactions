/** @type {import("next").NextConfig} */
const config = {
	images: {
		remotePatterns: [{ protocol: "https", hostname: "i.pravatar.cc" }],
	},
};

export default config;
