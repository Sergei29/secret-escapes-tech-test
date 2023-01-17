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

export type Price = { forDisplay: string };
export type Prices = { leadRate: Price };

export type SaleDetails = {
  editorial: {
    title: string;
    destinationName: string;
    hotelDetails: string;
  };
  prices: Prices;
  photos: Image[];
};
