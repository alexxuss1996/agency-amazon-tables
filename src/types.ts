export interface Campaign {
  campaignId: number;
  clicks: number;
  cost: number;
  date: string;
}

export interface Profile {
  profileId: number;
  country: string;
  marketplace: string;
  campaigns: Campaign[];
}

export interface Account {
  accountId: number;
  email: string;
  authToken: string;
  creationDate: string;
  profiles: Profile[];
}

export interface Data {
  accounts: Account[];
}
