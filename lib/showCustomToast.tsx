import { toast, type ToastOptions } from "react-toastify"

import CustomToast, {
  type CustomToastProps,
} from "../components/Toast/CustomToast"

type ShowCustomToastArgs = Omit<CustomToastProps, "type"> & {
  toastOptions?: ToastOptions
}

export const showSuccessToast = ({
  toastOptions,
  ...props
}: ShowCustomToastArgs) => {
  return toast.success(<CustomToast type="success" {...props} />, toastOptions)
}

export const showLoadingToast = ({
  toastOptions,
  ...props
}: ShowCustomToastArgs) => {
  return toast.success(<CustomToast type="loading" {...props} />, toastOptions)
}

export const showErrorToast = ({
  toastOptions,
  ...props
}: ShowCustomToastArgs) => {
  return toast.error(<CustomToast type="error" {...props} />, toastOptions)
}
