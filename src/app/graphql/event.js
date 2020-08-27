import { gql } from '@apollo/client';

export const EVENT_CREATE = gql`
  mutation createEvent(
    $title: String!
    $category: String!
    $description: String!
    $city: String!
    $venue: String!
    $date: String!
  ) {
    createEvent(
      eventInput: {
        title: $title
        category: $category
        description: $description
        city: $city
        venue: $venue
        date: $date
      }
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

export const EVENT_UPDATE = gql`
  mutation updateEvent(
    $id: String!
    $title: String!
    $category: String!
    $description: String!
    $city: String!
    $venue: String!
    $date: String!
  ) {
    updateEvent(
      id: $id
      eventInput: {
        title: $title
        category: $category
        description: $description
        city: $city
        venue: $venue
        date: $date
      }
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

export const EVENT_FETCH_LIST = gql`
  query getEvents($page: Int, $limit: Int) {
    getEvents(page: $page, limit: $limit) {
      id
      title
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

export const EVENT_ATTEND_TOGGLE = gql`
  mutation toggleAttendEvent($eventId: String!, $userId: String!) {
    toggleAttendEvent(eventId: $eventId, userId: $userId) {
      attendees {
        id
        username
        photoURL
      }
    }
  }
`;

export const EVENT_CANCEL_TOGGLE = gql`
  mutation toggleCancelEvent($id: String!) {
    toggleCancelEvent(id: $id) {
      isCancelled
    }
  }
`;
