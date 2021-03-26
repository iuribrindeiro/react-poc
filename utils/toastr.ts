import { notification } from "antd"

export class ToastrMessage {
    message: string;
    description?: string;
    placement?: NotificationPlacement = 'topRight'
}

export type NotificationPlacement = 'topLeft' | 'topRight' | 'bottomLeft' | 'bottomRight';

export default class Toastr {
    public static success(message: ToastrMessage) {
        notification.success(message);
    }

    public static warn(message: ToastrMessage) {
        notification.warn(message);
    }

    public static info(message: ToastrMessage) {
        notification.info(message);
    }

    public static error(message: ToastrMessage) {
        notification.error(message);
    }
}