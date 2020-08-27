import { format } from 'date-fns';

export const getDate = (date, requireTime = true, fullDate = true) => {
  // const timeFormat = requireTime ? 'MMMM d, yyyy h:mm a' : 'd MMMM, yyyy';

  const timeFormat = `${fullDate ? 'MMMM d, yyyy' : 'dd/MM/yyyy'} ${
    requireTime ? 'h:mm a' : ''
  }`;
  return format(new Date(date), timeFormat);
};

export const delay = ms => {
  return new Promise(resolve => setTimeout(resolve, ms));
};

export const getFileExtension = filename => {
  return filename.split('.')[filename.split('.').length - 1];
};

export const formatAttendees = (attendees, hostId) => {
  attendees.forEach((att, index) => {
    if (att.id === hostId) {
      const swap = attendees[0];
      attendees[0] = att;
      attendees[index] = swap;
    }
  });

  return attendees;
};

export const firebaseObjectToArray = snapshot => {
  if (snapshot) {
    return Object.entries(snapshot).map(e =>
      Object.assign({}, e[1], {
        id: e[0],
      })
    );
  }
};
