import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardMedia from '@material-ui/core/CardMedia';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';

ProfileItem.propTypes = {
  profile: PropTypes.object,
};

const useStyles = makeStyles(theme => ({
  card: {
    width: '100%',
    maxWidth: '8em',
    textDecoration: 'none',
  },
  cardContent: {
    padding: theme.spacing(1),
    '&:last-child': {
      padding: theme.spacing(1),
    },
  },
}));

function ProfileItem({ profile }) {
  const classes = useStyles();
  return (
    <Card
      className={classes.card}
      component={Link}
      to={`/profile/${profile.id}`}
    >
      <CardMedia
        component='img'
        style={{ height: '8em' }}
        src={profile.photoURL || '/assets/user.png'}
      />
      <CardContent className={classes.cardContent}>
        <Typography
          variant='body1'
          style={{ fontWeight: 500 }}
          gutterBottom
          align='center'
        >
          {profile.username}
        </Typography>
      </CardContent>
    </Card>
  );
}

export default ProfileItem;
