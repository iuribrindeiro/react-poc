import { TablePaginationConfig, TableProps as AntTableProps } from "antd";
import { Table as AntTable } from 'antd';

export type TableProps = AntTableProps<object>;

export type TablePaginationProps = TablePaginationConfig;

export const Table = (props: TableProps) => {
    return (
        <AntTable scroll={{y: '50vh', scrollToFirstRowOnChange: true}} bordered rowKey="_id" sticky {...props} pagination={
            {
                ...props.pagination, 
                showSizeChanger: true,
                showTotal: (total: number, [first, end]) => `Showing from ${first} to ${end} of ${total} items`,
                pageSizeOptions: ['5', '10', '15', '20']
            }}/>
    );
}