export interface Cafe {
  id: string;
  name: string;
  rating: number;
  reviewCount: number;
  status: 'Đang mở' | 'Đang đóng';
  price: string;
  tags: string[];
  amenities: string[];
  views: string;
  image: string;
  address: string;
  description: string;
  zone: string;
  openingHours: string;
  district: 'Quận 3';
  lat: number;
  lng: number;
  phone?: string;
  instagram?: string;
  googleMapsPlaceUrl?: string;
  googleMapsEmbedUrl?: string;
}

export type ZoneFilterId = 'all' | 'tu-xuong' | 'truong-dinh' | 'le-van-sy' | 'dien-bien-phu';

export interface ZoneFilter {
  id: ZoneFilterId;
  label: string;
  description: string;
}

export type ViewMode = 'grid' | 'map';
