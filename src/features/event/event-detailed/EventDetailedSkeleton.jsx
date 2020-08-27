import React from 'react';

import Sticky from 'react-stickynode';

import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardContent from '@material-ui/core/CardContent';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import ListItemText from '@material-ui/core/ListItemText';
import Skeleton from '@material-ui/lab/Skeleton';

const useStyles = makeStyles(theme => ({
  card: {
    marginBottom: theme.spacing(2),
    width: '100%',
  },
  cardContent: {
    padding: 0,
    '&:last-child': {
      padding: 0,
    },
  },
  header: {
    backgroundColor: theme.palette.primary.main,
    color: '#fff',
  },
}));

function EventDetailedSkeleton(props) {
  const classes = useStyles();

  return (
    <Grid container spacing={2}>
      <Grid item container md={9}>
        <Grid item container>
          <Card className={classes.card}>
            <Skeleton
              variant='rect'
              animation='wave'
              width='100%'
              height={300}
            />
            <CardContent>
              <Skeleton animation='wave' width='80%' height={24} />
            </CardContent>
          </Card>
        </Grid>
        <Grid item container>
          <Card className={classes.card}>
            <CardContent>
              <Skeleton
                animation='wave'
                width='80%'
                height={24}
                style={{ marginBottom: 24 }}
              />
              <Skeleton
                animation='wave'
                width='60%'
                height={24}
                style={{ marginBottom: 24 }}
              />
              <Skeleton animation='wave' width='70%' height={24} />
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      <Grid item container md={3} direction='column'>
        <Sticky enabled={true} top={88}>
          <Card className={classes.card}>
            <CardHeader
              className={classes.header}
              title={<Skeleton animation='wave' width='100%' height={24} />}
            />
            <CardContent className={classes.cardContent}>
              <List>
                <ListItem>
                  <ListItemAvatar>
                    <Skeleton
                      variant='circle'
                      animation='wave'
                      width={32}
                      height={32}
                    />
                  </ListItemAvatar>
                  <ListItemText>
                    <Skeleton animation='wave' width='100%' height={24} />
                  </ListItemText>
                </ListItem>
              </List>
            </CardContent>
          </Card>
        </Sticky>
      </Grid>
    </Grid>
  );
}

export default EventDetailedSkeleton;
