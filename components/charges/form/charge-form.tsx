import { Button, Form, FormInstance, Input, InputNumber, notification, Spin } from "antd";
import Charge from "../../../models/charge";

export type ChargeFormProps = {
    isFormLoading: boolean;
    isFieldsLoading: boolean;
    form: FormInstance;
    onSubmit: (values: Charge) => void;
}

export const ChargeForm = ({isFormLoading, isFieldsLoading, form, onSubmit}: ChargeFormProps) => {
    const descriptionRules = [{required: true, message: 'Please inform a valid Descritpion'}];
    const amountRules = [{required: true, message: 'Please inform a valid Amount', min: 1}];

    return (
        <Spin spinning={isFormLoading}>
            <Form onFinish={onSubmit} wrapperCol={{ span: 16 }} form={form} layout="vertical">
                <Form.Item 
                    name="description" 
                    label="Description" 
                    rules={descriptionRules}>
                    <Input disabled={isFieldsLoading} placeholder="Description" />
                </Form.Item>
                <Form.Item 
                    name="amount" 
                    label="Amount" 
                    rules={amountRules}>
                    <InputNumber 
                        formatter={value => `$ ${value}`}
                        parser={value => parseFloat(value.replace('$ ', ''))}
                        disabled={isFieldsLoading} style={{width: '100%'}} step="0.00" stringMode placeholder="Amount"/>
                </Form.Item>
            </Form>
        </Spin>
    );
}

export const ChargeFormActions = ({isLoadingFields, onClickCancel, validateFormDispatch}) => {
    return (
        <Form.Item>
            <Button 
                loading={isLoadingFields} 
                onClick={validateFormDispatch} 
                size="large" 
                type="primary">
                Save
            </Button>
            <Button
                disabled={!isLoadingFields}
                style={{ marginLeft: '1vh'}} 
                size="large" 
                onClick={onClickCancel} 
                type="default">
                Cancel
            </Button>
        </Form.Item>
    );
}