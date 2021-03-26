import { AnyAction, createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { FormInstance } from "antd";
import { ChargesApi } from "../../api-client/charges-api";
import Charge from "../../models/charge";

export type ChargeFormState = {
    form?: FormInstance;
    isSaving: boolean;
    isSearching: boolean;
    charge: Charge;
}

export type BaseActionType<TPayload> = (state: ChargeFormState, action: PayloadAction<TPayload>) => void;

export type ChargeFormActions = {
    setFormInstance: BaseActionType<FormInstance>;
}

export const updateCharge = createAsyncThunk<void, Charge, { state: ChargeFormState }>('charge-form/update-charge', 
    (charge, thunkApi) => ChargesApi.updateCharge(charge, thunkApi.signal));

export const saveCharge = createAsyncThunk<void, Charge, { state: ChargeFormState }>('charge-form/save-charge', 
    (charge, thunkApi) => ChargesApi.createCharge(charge, thunkApi.signal));

export const searchCharge = createAsyncThunk<Charge, string, { state: ChargeFormState }>('charge-form/search-charge', 
    (id, thunkApi) => ChargesApi.getCharge(id));


const chargeFormSlice = createSlice<ChargeFormState, ChargeFormActions>({
    name: 'charge-form',
    initialState: {
        form: null,
        isSaving: false,
        isSearching: false,
        charge: new Charge()
    },
    reducers: {
        setFormInstance: (state, action) => {
            state.form = action.payload;
        }
    },
    extraReducers: builder => {
        builder.addMatcher(isSaveOrUpdateRequestPeding, state => {
            state.isSaving = true;
        });

        builder.addMatcher(isSaveOrUpdateRequestFinished, state => {
            state.isSaving = false;
        });

        builder.addCase(searchCharge.fulfilled, (state, action) => {
            state.charge = action.payload;
            state.form.setFieldsValue(state.charge);
        })

        builder.addMatcher(action => actionNameIncludes(action, "search-charge/fullfilled", "search-charge/rejected"), state => {
            state.isSearching = false;
        });

        builder.addCase(searchCharge.pending, state => { state.isSearching = true });
    }
})

const isSaveOrUpdateRequestPeding = (action: AnyAction) => {
    return actionNameIncludes(action, "update-charge/pending", "save-charge/pending");
}

const isSaveOrUpdateRequestFinished = (action: AnyAction) => {
    return actionNameIncludes(action, "update-charge/fulfilled", "save-charge/fulfilled", "update-charge/rejected", "save-charge/rejected");
}
function actionNameIncludes(action: AnyAction, ...searchCriteria: string[]) {
    const actionName = (action.type as string)?.toString();
    return (searchCriteria || []).some(sc => actionName?.includes(sc) || false);
}