import { Notification, Spinner } from 'grommet';
import useCommon from '../hooks/useCommon';

const Announcements = ({ ...props }) => {
  const { isShow, notification, handleCommon } = useCommon();
  return (
    <>
      {isShow.loading && <Spinner {...props} />}
      {notification.visible && (
        <Notification
          toast
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
