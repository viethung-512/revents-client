import { gql } from '@apollo/client';

export const EVENT_FETCH_LIST = gql`
  query getEvents(
    $page: Int
    $offset: Int
    $limit: Int
    $userId: String
    $filterType: FilterEventsType
    $startDate: String
  ) {
    getEvents(
      page: $page
      offset: $offset
      limit: $limit
      userId: $userId
      filterType: $filterType
      startDate: $startDate
    ) {
      id
      title
      category
      description
      city
      venue
      date
      isCancelled
      host {
        id
        username
        photoURL
      }
      attendees {
        id
        username
        photoURL
      }
    }
  }
`;

export const EVENT_FETCH_ITEM = gql`
  query getEvent($id: String!) {
    getEvent(id: $id) {
      id
      title
      category
      description
      city
      venue
      date
      host {
        id
        username
        photoURL
      }
      attendees {
        id
        username
        photoURL
      }
    }
  }
`;
