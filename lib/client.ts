import { getFileAsset } from "@sanity/asset-utils";
import sanityClient from "@sanity/client";
import imageUrlBuilder from "@sanity/image-url";

export const client = sanityClient({
  projectId: "l4wrpsh5",
  dataset: "production",
  apiVersion: "2023-01-16",
  useCdn: true,
  token: process.env.NEXT_PUBLIC_SANITY_TOKEN,
});

const builder = imageUrlBuilder(client);

export const urlFor = (source: any): any => {
  if (source) return builder.image(source);
};

export const videoAssetFor = (source: any): any => {
  if (source) {
    return getFileAsset(source, client.config());
  }
};
