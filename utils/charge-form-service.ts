import { FormInstance } from "antd";
import Toastr from "./toastr";

export class ChargeFormService {
    public static async validateForm(form: FormInstance) {
        try {
            await form.validateFields();
            form.submit();
        } catch (error) {
            Toastr.warn({
                message: "You must fill all fields correctly",
                description: "Before submiting the form, you must fill all fields correctly",
                placement: 'topLeft'
            });
        }
    }
}