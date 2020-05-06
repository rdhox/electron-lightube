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

export interface CreatorHeart {
  creatorThumbnail: string;
  creatorName: string;
}

export interface Replies {
  replyCount: number;
  continuation: string;
}

export interface IComment {
  author: string;
  authorThumbnails: AuthorThumbnail[];
  authorId: string;
  authorUrl: string;
  isEdited: boolean;
  content: string;
  contentHtml: string;
  published: number;
  publishedText: string;
  likeCount: number;
  commentId: string;
  authorIsChannelOwner: boolean;
  creatorHeart?: CreatorHeart;
  replies?: Replies;
}

export interface IComments {
  commentCount?: number;
  videoId: string;
  comments: IComment[];
  continuation?: string;
}

export interface VideoPlaylist {
  title: string;
  videoId: string;
  author: string;
  authorId: string;
  authorUrl: string;
  videoThumbnails: Thumbnail[];
  index: number;
  lengthSeconds: number;
  viewCountText?: string;
}

export interface Playlist {
  title: string;
  playlistId: string;
  author: string;
  authorId: string;
  authorThumbnails: AuthorThumbnail[];
  description: string;
  descriptionHtml: string;
  videoCount: number;
  viewCount: number;
  updated: number;
  videos: VideoPlaylist[];
}

// Filters
export type SortBy = "relevance" | "rating" | "upload_date" | "view_count" | '';
export type Date = "hour" | "today" | "week" | "month" | "year" | '';
export type Duration = "short" | "long" | '';
export type Type = "video" | "playlist"| '';

export interface Filters {
  sort_by: SortBy;
  date: Date;
  duration: Duration;
  type: Type;
}