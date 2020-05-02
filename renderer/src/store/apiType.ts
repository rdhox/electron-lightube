export interface Channel {
  author: string;
  authorId: string;
  authorThumbnails: string;
  subCount: number;
  description: string;
  latestVideos: VideoDetails[];
};

export interface AuthorThumbnail {
  url: string;
  width: number;
  height: number;
};

export interface Thumbnail extends AuthorThumbnail {
  quality: string;
};

export interface VideoDetails {
  type: string;
  videoId: string;
  title: string;
  author: string;
  authorUrl: string;
  authorId: string;
  videoThumbnails: Thumbnail[];
  viewCount: number;
  published: number;
  publishedText: string;
  lengthSeconds: number;
  descriptionHtml: string;
  description: string;
  liveNow: boolean;
  paid: boolean;
  premium: boolean;
};

export interface AdaptiveFormat {
  index: string;
  bitrate: string;
  init: string;
  url: string;
  itag: string;
  type: string;
  clen: string;
  lmt: string;
  projectionType: number;
  container: string;
  encoding: string;
  qualityLabel?: string;
  resolution?: string;
}

export interface FormatStream {
  url: string;
  itag: string;
  type: string;
  quality: string;
  container: string;
  encoding: string;
  qualityLabel: string;
  resolution: string;
  size: string;
}

export interface Caption {
  label: string;
  languageCode: string;
  url: string;
}

export interface RecommendedVideo {
  videoId: string;
  title: string;
  videoThumbnails: Thumbnail[];
  author: string;
  authorId: string;
  lengthSeconds: number;
  viewCountText: string;
}

export interface Video {
  title: string;
  videoId: string;
  videoThumbnails: Thumbnail[];
  description: string;
  descriptionHtml: string;
  published: number;
  publishedText: string;
  keywords: string[];
  viewCount: number;
  likeCount: number;
  dislikeCount: number;
  paid: boolean;
  premium: boolean;
  isFamilyFriendly: boolean;
  allowedRegions: string[];
  genre: string;
  genreUrl: string;
  author: string;
  authorId: string;
  authorUrl: string;
  authorThumbnails: AuthorThumbnail[];
  subCountText: string;
  lengthSeconds: number;
  allowRatings: boolean;
  rating: number;
  isListed: boolean;
  liveNow: boolean;
  isUpcoming: boolean;
  premiereTimestamp?: number;
  hlsUrl?: string;
  adaptiveFormats: AdaptiveFormat[];
  formatStreams: FormatStream[];
  captions: Caption[];
  recommendedVideos: RecommendedVideo[];
}