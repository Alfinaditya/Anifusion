/** @type {import('next').NextConfig} */
const nextConfig = {
	experimental: {
		appDir: true,
		enableUndici: true,
	},
	images: {
		unoptimized: true,
		remotePatterns: [
			{
				protocol: 'https',
				hostname: 'cdn.myanimelist.net',
				port: '',
				pathname: '/**',
			},
		],
	},
};

module.exports = nextConfig;
