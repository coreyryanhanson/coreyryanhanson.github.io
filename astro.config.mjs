import { defineConfig } from 'astro/config';
import mdx from '@astrojs/mdx';
import sitemap from '@astrojs/sitemap';
import tailwind from "@astrojs/tailwind";
import lottie from "astro-integration-lottie";

// https://astro.build/config
export default defineConfig({
  site: 'https://astrofy-template.netlify.app',
  integrations: [mdx(), sitemap(), lottie(), tailwind()]
});