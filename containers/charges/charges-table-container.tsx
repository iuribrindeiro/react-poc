import { Form } from "antd";
import { useEffect, useState } from "react";
import ChargesTable, { ChargesTableProps } from "../../components/charges/table/charges-table";
import Charge from "../../models/charge";

export type ChargesTableContainerProps = Omit<ChargesTableProps, "onChangeDescription" | "selectedCharge">;

export const ChargesTableContainer = (props: ChargesTableContainerProps) => {
    const [searchDescription, setSearchDescription] = useState("");
    const [selectedEditCharge, setSelectedEditCharge] = useState<Charge>(null);
    const [form] = Form.useForm();

    useEffect(() => {
        setSearchDescription(props.searchDescription);
    }, [])

    const onChangeDescriptionHandler = description => {
        setSearchDescription(description);
    }

    return (
        <ChargesTable 
            {...props} 
            formEditCharge={form}
            selectedEditCharge={selectedEditCharge} 
            onClickEditCharge={charge => setSelectedEditCharge(charge)}
            onClickCancelEditCharge={() => setSelectedEditCharge(null)}
            onChangeDescription={onChangeDescriptionHandler} 
            searchDescription={searchDescription} />
    )
}