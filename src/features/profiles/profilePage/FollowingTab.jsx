import React from 'react';
import { Tab, Grid, Header, Card } from 'semantic-ui-react';
import ProfileCard from './ProfileCard';
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
import useFirestoreCollection from '../../../app/hooks/useFirestoreCollection';
import {
  getFollowersCollection,
  getFollowingsCollection,
} from '../../../app/firestore/firestoreService';
import { listenToFollowers, listenToFollowings } from '../profileActions';

export default function FollowingTab({ profile, activeTab }) {
  const dispatch = useDispatch();
  const { followings, followers } = useSelector(state => state.profile);

  useFirestoreCollection({
    query:
      activeTab === 3
        ? () => getFollowersCollection(profile.id)
        : () => getFollowingsCollection(profile.id),
    data: data =>
      activeTab === 3 ? dispatch(listenToFollowers(data)) : dispatch(listenToFollowings(data)),
    deps: [activeTab, dispatch],
  });

  return (
    <Tab.Pane>
      <Grid>
        <Grid.Column width={16}>
          <Header
            floated="left"
            icon="user"
            content={activeTab === 3 ? 'Followers' : 'Following'}
          />
        </Grid.Column>
        <Grid.Column width={16}>
          <Card.Group itemsPerRow={5}>
            {activeTab === 3 &&
              followers.map(profile => <ProfileCard key={profile.id} profile={profile} />)}
            {activeTab === 4 &&
              followings.map(profile => <ProfileCard key={profile.id} profile={profile} />)}
          </Card.Group>
        </Grid.Column>
      </Grid>
    </Tab.Pane>
  );
}
