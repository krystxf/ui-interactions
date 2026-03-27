import type { MetadataRoute } from "next";

const BASE_URL = "https://ui-interactions-krystxf.vercel.app";

export default function sitemap(): MetadataRoute.Sitemap {
	return [
		{
			url: BASE_URL,
			lastModified: new Date(),
		},
		{
			url: `${BASE_URL}/toast`,
			lastModified: new Date(),
		},
		{
			url: `${BASE_URL}/squigglies`,
			lastModified: new Date(),
		},
		{
			url: `${BASE_URL}/blob`,
			lastModified: new Date(),
		},
	];
}
