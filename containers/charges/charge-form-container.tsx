import { AsyncThunkAction } from "@reduxjs/toolkit";
import { FormInstance, notification } from "antd";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { ChargeForm } from "../../components/charges/form/charge-form";
import Charge from "../../models/charge";
import { ChargeFormState, saveCharge, updateCharge } from "../../store/slices/charge-form-slice";
import Toastr from "../../utils/toastr";

export type ChargeFormContainerProps = {
    isSearching: boolean;
    isSaving: boolean;
    form: FormInstance;
    chargeId: string
}

export const ChargeFormContainer = ({chargeId, isSearching, isSaving, form }: ChargeFormContainerProps) => {
    const dispatch = useDispatch();

    const tryValidateForm = async () => {
        try {
            await form.validateFields();
            return true;
        } catch (error) {
            notification.warn({
                message: "You must fill all fields correctly",
                description: "Before submiting the form, you must fill all fields correctly",
                placement: 'topLeft'
            });
            return false;
        }
    }

    const trySaveOrUpdateCharge = async (charge: Charge) => {
        try {
            let promise: AsyncThunkAction<Promise<void>, Charge, { state: ChargeFormState; }> = null;
            if (charge._id)
                promise = dispatch(updateCharge(charge));
            else
                promise = dispatch(saveCharge(charge));
            
            promise;
        } catch (error) {
            const operation = charge._id && 'update' || 'create';
            notification.error({
                message: `Failed while trying to ${operation} the charge.`,
                description: `Some unexpected error ucorred while trying to ${operation} the charge. Please, try again.`
            });
        }
    }

    const saveOrUpdateCharge = async values => {
        const isFormValid = await tryValidateForm();
        if (isFormValid)
            trySaveOrUpdateCharge(new Charge({_id: charge._id, ...values}));
    }

    useEffect(() => {
        if (_id && !existingCharge)
            getExistingCharge();
        if (existingCharge) {
            form.setFieldsValue(existingCharge);
        }
    }, []);

    const _onCancelClick = () => {
        setIsLoadingFields(prevState => {
            if (prevState) {
                abortController.abort();
                abortController = new AbortController();
                Toastr.info({
                    message: 'Operation canceled'
                });
            }

            return false;
        });
        onCancelClick();
    }

    return (
        <ChargeForm
            hideSubmissionButtons={hideSubmissionButtons}
            form={form}
            isLoadingGlobal={isLoadingGlobal} 
            isLoadingFields={isLoadingFields} 
            charge={charge} 
            onCancelClick={_onCancelClick}
            onSubmit={saveCharge}
            />
    );
}