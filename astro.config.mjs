import { defineConfig } from 'astro/config';

// https://astro.build/config
export default defineConfig({
    server: {
        cors: true,
        host: true,
        proxy: {
            '/api': {
                target: 'https://api.apiopen.top/',
                changeOrigin: true,
                configure: (proxy, options) => {
                    console.log(proxy, options);
                }
            }
        }
    }
});
