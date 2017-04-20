import React from 'react';
import styled, { keyframes } from 'styled-components';
import { connect } from 'react-redux';
import {
  hideNotification,
  requestNotifications
} from '../ducks/notificationsDucks';

const CRITICAL = 'CRITICAL';
const WARNING = 'WARNING';
const INFO = 'INFO';

export const errorLevels = {
  CRITICAL,
  WARNING,
  INFO
};

const SlideFadeIn = keyframes`
  0% {
    transform: translateY(30px);
    opacity: 0;
  }
  100%  {
    transform: translateY(0px);
    opacity: 1;
  }
  ${''/* 100% {
    transform: translateX(300px);
  } */}
`;

const StyledErrorItem = styled.div`
  line-height: 42px;
  transform: translateY(6px)
  border-radius: 4px;
  opacity: 0;
  transition-delay: 1s;
  background-color: ${
    props => props.level === errorLevels.CRITICAL ?
      props.theme.notification.critical : props.level === errorLevels.WARNING ?
        props.theme.notification.warning : props.theme.notification.info
    };
  &.in{
    animation: ${SlideFadeIn} 1s cubic-bezier(0.44, 1.93, 0, 0.68) forwards;
    opacity: 1
  }
  &.out{
    height: 0px;
    margin-top: 0px;
  }
`;

const StyledErrorList = styled.ul`
  list-style: none;
  padding: 0;
`;

const StyledNotificationSystem = styled.div`
  position: fixed;
  width: 200px;
  right: 20px;
  top: 0px;
`;

const StyledInteriorMessage = styled.div`
  margin-bottom: 6px;
`

class NotificationSystem extends React.Component{
  componentDidMount(){
    this.props.getNotifcations();
  }
  render(){
    return (
      <StyledNotificationSystem>
        <StyledErrorList>{
          this.props.notifications.map(notification => {
            return (
              <StyledErrorItem
                className={notification.isViewable ? "in" : "out"}
                level={notification.level}
                onClick={() =>
                  this.props.hideNotification(notification.id)
                }
                key={notification.id}>
                <StyledInteriorMessage>
                  {notification.msg}
                </StyledInteriorMessage>
              </StyledErrorItem>
            )
          })
        }</StyledErrorList>
      </StyledNotificationSystem>
    );
  }
};

const mapStateToProps = state => ({
  notifications : state.notifications.list
});

const mapDispatchToProps = dispatch => ({
  hideNotification : id => dispatch(hideNotification(id)),
  getNotifcations : () => dispatch(requestNotifications())
})

//association between action creators and state
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(NotificationSystem)
