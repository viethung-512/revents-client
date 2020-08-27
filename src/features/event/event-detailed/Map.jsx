import React from 'react';
import PropTypes from 'prop-types';
import GoogleMapReact from 'google-map-react';

import RoomIcon from '@material-ui/icons/Room';

const MyMarker = () => <RoomIcon color='error' fontSize='large' />;

Map.propTypes = {
  lat: PropTypes.number,
  lng: PropTypes.number,
};

function Map({ latLng }) {
  const zoom = 14;

  return (
    <div style={{ height: 300, width: '100%', border: '1px solid #cecece' }}>
      <GoogleMapReact
        bootstrapURLKeys={{ key: 'AIzaSyD66W9wXANDV8LYAroW0QXRt5FZt4-q9WM' }}
        center={latLng}
        zoom={zoom}
      >
        <MyMarker lat={latLng.lat} lng={latLng.lng} />
      </GoogleMapReact>
    </div>
  );
}

export default Map;
