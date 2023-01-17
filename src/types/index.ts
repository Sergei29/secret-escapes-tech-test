export enum TravelTypes {
  HOTEL_ONLY = "HOTEL_ONLY",
}

export type Image = {
  url: string;
};

export type SaleSummary = {
  id: string;
  editorial: {
    title: string;
    destinationName: string;
  };
  photos: Image[];
};

export type SalesSearchResult = {
  resultCount: number;
  sales: SaleSummary[];
};
