import { combineEpics } from 'redux-observable';
import { Observable, of } from 'rxjs';
import { catchError, map, switchMap, withLatestFrom } from 'rxjs/operators';
import { Action } from 'ts-action';
import { ofType } from 'ts-action-operators';

import { loadNotifications$ } from '../utils/api.utils';
import { loadNotificationsAction } from './actions';
import { NotificationsRootState } from './state';

const loadNotificationsEpic = (action$: Observable<Action>, state$: Observable<NotificationsRootState>) =>
  action$.pipe(
    ofType(loadNotificationsAction.submit),
    withLatestFrom(state$),
    switchMap(([, rootState]) =>
      loadNotifications$(rootState.notifications.startFromTime).pipe(
        map(newNotifications => loadNotificationsAction.success(newNotifications)),
        catchError(err => of(loadNotificationsAction.fail(err.message)))
      )
    )
  );

export const notificationsEpics = combineEpics(loadNotificationsEpic);
