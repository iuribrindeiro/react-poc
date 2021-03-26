import { FormInstance, Modal, Space } from "antd";
import { ChangeEventHandler, FormEventHandler, useEffect, useState } from "react";
import { ChargesFilter } from "../../../api-client/charges-api";
import { PaginationResult } from "../../../api-client/pagination-result";
import { ChargeFormContainer } from "../../../containers/charges/charge-form-container";
import Charge from "../../../models/charge";
import { Column } from "../../table/column/column";
import { Table, TablePaginationProps } from "../../table/table";

export type ChargesTableProps = {
    chargesPagination: PaginationResult<Charge>,
    currentPage: number,
    take: number,
    searchDescription: string,
    selectedEditCharge: Charge,
    selectedDeleteCharge: Charge,
    formEditCharge: FormInstance;
    onClickCancelEditCharge: () => void;
    onClickEditCharge: (charge: Charge) => void;
    onClickDeleteCharge: (charge: Charge) => void;
    onChangeDescription: (newDescription: string) => void;
    onSaveCharge: () => void;
    onTableChange: (currentPage: number, pageSize: number, filter: ChargesFilter) => void;
}

const ChargesTable = ({
    currentPage, take, chargesPagination, formEditCharge,
    searchDescription, selectedEditCharge, selectedDeleteCharge,
    onSaveCharge, onTableChange, onChangeDescription,
    onClickEditCharge, onClickDeleteCharge, onClickCancelEditCharge}: ChargesTableProps) => {

    const onChangeDescriptionHandler: ChangeEventHandler<HTMLInputElement> = (event) => {
        onChangeDescription(event.target.value);
    }

    const onSearchHandler: FormEventHandler<HTMLElement> = () => {
        onTableChange(currentPage, take, {description: searchDescription})
    }

    const columns = [
        {
            title: <Column
                filterEnabled 
                onSubmit={onSearchHandler} 
                onChangeSearchValue={onChangeDescriptionHandler} 
                searchValue={searchDescription} 
                title="Description" />,
            dataIndex: 'description',
        },
        {
            title: 'Amount',
            dataIndex: 'amount'
        },
        {
            title: 'Action',
            key: 'action',
            render: (_, charge: Charge) => (
                <Space size="middle">
                    <a onClick={() => onClickEditCharge(charge)}>Edit</a>
                    <a onClick={() => onClickDeleteCharge(charge)}>Delete</a>
                </Space>
            )
        }
    ];

    const _onTableChange = (pagination: TablePaginationProps) => {
        onTableChange(pagination.current, pagination.pageSize, {description: searchDescription});
    }

    return (
        <>
            <Modal visible={!!selectedEditCharge} okText="Edit" onCancel={onClickCancelEditCharge} confirmLoading={true} onOk={onSaveCharge} destroyOnClose>
                <ChargeFormContainer existingCharge={selectedEditCharge} hideSubmissionButtons form={formEditCharge} onSave={onSaveCharge} />
            </Modal>
            <Table 
                columns={columns} 
                pagination={{
                    total: chargesPagination.count,
                    current: currentPage, 
                    pageSize: take
                }} 
                onChange={_onTableChange} 
                dataSource={chargesPagination.items} />
        </>
    )
}


export default ChargesTable;