import { Notification } from 'grommet';
import LoadSpinner from './LoadSpinner';
import useCommon from '../hooks/useCommon';

const Announcements = ({ ...props }) => {
  const { isShow, notification, handleCommon } = useCommon();
  return (
    <>
      {isShow.loading && <LoadSpinner {...props} />}
      {notification.visible && (
        <Notification
          toast
          time={3000}
          title={notification.title}
          message={notification.message}
          status={notification.status}
          onClose={() => handleCommon.notification({ visible: false })}
        />
      )}
    </>
  );
};

export default Announcements;
