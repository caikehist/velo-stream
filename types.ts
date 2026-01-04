
export interface VideoMetadata {
  title: string;
  author: string;
  platform: string;
  duration: string;
  thumbnailUrl: string;
  availableQualities: Array<{
    label: string;
    size: string;
    format: string;
  }>;
}

export enum DownloadStatus {
  IDLE = 'IDLE',
  ANALYZING = 'ANALYZING',
  READY = 'READY',
  DOWNLOADING = 'DOWNLOADING',
  COMPLETED = 'COMPLETED',
  ERROR = 'ERROR'
}

export interface RecentDownload {
  id: string;
  url: string;
  title: string;
  timestamp: number;
  status: DownloadStatus;
}
