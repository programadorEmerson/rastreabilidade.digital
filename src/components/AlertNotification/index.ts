import { toast, ToastOptions } from 'react-toastify';

type AlertNotificationProps = { message: string } & ToastOptions;

export const AlertNotification = ({
  message,
  position = 'top-center',
  autoClose = 3000,
  hideProgressBar = false,
  closeOnClick = true,
  pauseOnHover = true,
  draggable = false,
  ...rest
}: AlertNotificationProps) =>
  toast(message, {
    ...rest,
    progress: undefined,
    position,
    autoClose,
    hideProgressBar,
    closeOnClick,
    pauseOnHover,
    draggable,
  });
