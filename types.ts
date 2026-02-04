
export interface Software {
  id: string;
  name: string;
  downloadUrl: string;
  isLicensed: boolean;
  expiryDays: number;
  maxDownloads: number;
  isVisible: boolean;
  description: string;
  thumbnail: string;
}

export interface Video {
  id: string;
  title: string;
  url: string;
}

export interface License {
  key: string;
  softwareId: string;
  expiryDate: string;
  isUsed: boolean;
  boundBrowserId: string;
  downloadCount: number;
  maxDownloads: number;
}

export enum UserRole {
  ADMIN = 'ADMIN',
  GUEST = 'GUEST'
}
