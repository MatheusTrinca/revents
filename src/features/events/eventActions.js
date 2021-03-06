import {
  CREATE_EVENT,
  UPDATE_EVENT,
  DELETE_EVENT,
  FETCH_EVENTS,
  LISTEN_TO_EVENT_CHAT,
  LISTEN_TO_SELECTED_EVENT,
  CLEAR_EVENTS,
  SET_FILTER,
  SET_START_DATE,
} from './eventConstants';
import {
  asyncActionError,
  asyncActionFinish,
  asyncActionStart,
} from '../../app/async/asyncReduces';
import {
  fetchEventsFromFirestore,
  dataFromSnapshot,
} from '../../app/firestore/firestoreService';

export const fetchEvents = (
  filter,
  startDate,
  limit,
  lastDocSnapshot
) => async dispatch => {
  dispatch(asyncActionStart());
  try {
    const snapshot = await fetchEventsFromFirestore(
      filter,
      startDate,
      limit,
      lastDocSnapshot
    ).get();
    const moreEvents = snapshot.docs.length >= limit;
    const lastVisible = snapshot.docs[snapshot.docs.length - 1];
    const events = snapshot.docs.map(doc => dataFromSnapshot(doc));
    dispatch({
      type: FETCH_EVENTS,
      payload: { events, moreEvents, lastVisible },
    });
    dispatch(asyncActionFinish());
  } catch (err) {
    dispatch(asyncActionError(err));
  }
};

export const setFilter = filter => dispatch => {
  dispatch(clearEvents());
  dispatch({ type: SET_FILTER, payload: filter });
};

export const setStartDate = date => dispatch => {
  dispatch(clearEvents());
  dispatch({ type: SET_START_DATE, payload: date });
};

export const listenToEvent = event => {
  return {
    type: LISTEN_TO_SELECTED_EVENT,
    payload: event,
  };
};

export const createEvent = event => {
  return {
    type: CREATE_EVENT,
    payload: event,
  };
};
export const updateEvent = event => {
  return {
    type: UPDATE_EVENT,
    payload: event,
  };
};
export const deleteEvent = eventId => {
  return {
    type: DELETE_EVENT,
    payload: eventId,
  };
};

export const listenToEventChat = comments => {
  return {
    type: LISTEN_TO_EVENT_CHAT,
    payload: comments,
  };
};

export const clearEvents = () => {
  return {
    type: CLEAR_EVENTS,
  };
};
