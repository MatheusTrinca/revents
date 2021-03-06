import React from 'react';
import { Menu, Image, Dropdown } from 'semantic-ui-react';
import { Link, useHistory } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { signOutFirebase } from '../../app/firestore/firebaseService';
import { toast } from 'react-toastify';

export default function SignedInMenu() {
  const history = useHistory();
  const { currentUserProfile } = useSelector(state => state.profile);

  const handleSignOut = async () => {
    try {
      history.push('/');
      await signOutFirebase();
    } catch (error) {
      toast.error(error);
    }
  };
  return (
    <Menu.Item position="right">
      <Image avatar spaced="right" src={currentUserProfile?.photoURL || '/assets/user.png'} />
      <Dropdown pointing="top left" text={`Hello ${currentUserProfile?.displayName}`}>
        <Dropdown.Menu>
          <Dropdown.Item as={Link} to="/createEvent" text="Create Event" icon="plus" />
          <Dropdown.Item
            as={Link}
            to={`/profile/${currentUserProfile?.id}`}
            text="My profile"
            icon="user"
          />
          <Dropdown.Item as={Link} to="/account" text="My account" icon="settings" />
          <Dropdown.Item text="Sign out" icon="power" onClick={handleSignOut} />
        </Dropdown.Menu>
      </Dropdown>
    </Menu.Item>
  );
}
