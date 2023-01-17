import { gql } from "@apollo/client";

export const GET_SALES_LIST_BY_QUERY = gql`
  query GetSalesListByQuery(
    $query: String
    $travelTypes: [String]
    $limit: Int
    $offset: Int
  ) {
    saleSearch(query: $query, travelTypes: $travelTypes) {
      resultCount
      sales(limit: $limit, offset: $offset) {
        id
        editorial {
          title
          destinationName
        }
        photos {
          url
        }
      }
    }
  }
`;

export const GET_SALE_BY_ID = gql`
  query GetSaleById($saleId: String!) {
    sale(saleId: $saleId) {
      editorial {
        title
        destinationName
        hotelDetails
      }
      prices {
        leadRate {
          forDisplay
        }
      }
      photos {
        url
      }
    }
  }
`;
