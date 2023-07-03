export interface Link {
  id: number;
  full_url: string;
  short_url: string;
  single_access: boolean;
  access: number;
}

export interface CreateLink {
  url: string;
  singleAccess: boolean;
}
