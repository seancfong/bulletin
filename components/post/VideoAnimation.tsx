import React, { useEffect } from "react";
import { videoAssetFor } from "../../lib/client";

type Props = {
  webm?: any;
  fallback?: any;
  aspectratio?: any;
  alt?: any;
  caption?: any;
};

const VideoAnimation = ({ webm, fallback, alt, caption }: Props) => {
  if (!webm) {
    return null;
  }
  const webmAsset = videoAssetFor(webm);

  return (
    <figure className="rounded-xl overflow-hidden">
      <video title={alt} loop muted autoPlay playsInline>
        <source src={webmAsset.url} type={`video/${webmAsset.extension}`} />
        {/* <source
          src={fallbackAsset.url}
          type={`video/${fallbackAsset.extension}`}
        /> */}
      </video>
      <figcaption>{caption}</figcaption>
    </figure>
  );
};

export default VideoAnimation;
