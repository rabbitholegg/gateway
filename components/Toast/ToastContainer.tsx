import { ToastContainer as RTToastContainer } from 'react-toastify';

const toastClassName =
  'bg-toast-background border border-toast-border rounded-lg backdrop-blur-sm py-3 pr-3 pl-2 overflow-clip w-full cursor-pointer mb-3 relative';

const progressStyle = { top: 0, height: 2 };

const ToastContainer = () => {
  return (
    <RTToastContainer
      style={{ width: 310 }}
      position="bottom-right"
      toastClassName={() => toastClassName}
      progressStyle={progressStyle}
      closeButton={false}
      icon={false}
    />
  );
};

export default ToastContainer;
