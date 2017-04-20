
//action types
export const SHOW_NOTIFICATION = 'SHOW_NOTIFICATION';
export const HIDE_NOTIFICATION = 'REMOVE_NOTIFICATION';
export const REQUEST_NOTIFICATIONS = 'REQUEST_NOTIFICATIONS';
export const RECIEVED_NOTIFICATIONS = 'RECIEVED_NOTIFICATIONS';

export const showNotification = (notification) => ({
  type : SHOW_NOTIFICATION,
  payload : notification
});

export const hideNotification = (notificationId) => ({
  type : HIDE_NOTIFICATION,
  payload : notificationId
});

export const requestNotifications = () =>  ({
  type : REQUEST_NOTIFICATIONS
});

export const recievedNotifications = (data) =>  ({
  type : RECIEVED_NOTIFICATIONS,
  payload : data
});

const initialState  = ({
  list : []
});

export default (state = initialState, action) => {
  switch(action.type){
    case REQUEST_NOTIFICATIONS:
      return {
        ...state
      }
    case RECIEVED_NOTIFICATIONS:
      return {
        list : [
          ...action.payload
        ]
      }
    case SHOW_NOTIFICATION:
      return {
        list : [
          ...state.list,
          {...action.payload}
        ]
      }
      case HIDE_NOTIFICATION:
        return {
          list : state.list.map(notification => {
              if(action.payload === notification.id){
                return {
                  ...notification,
                  isViewable : false
                }
              }else{
                return {
                  ...notification
                }
              }
            })
          }
    default :
      return state;
  }
}
