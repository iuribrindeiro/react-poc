import { SearchOutlined } from "@ant-design/icons";
import { Button, Form, Input, Row } from "antd";
import { ChangeEventHandler, FormEventHandler, useState } from "react";

export type ColumnProps = {
    title: string;
    filterEnabled?: boolean;
    placeHolder?: string;
    searchValue: string;
    onSubmit: FormEventHandler<HTMLElement>;
    onChangeSearchValue: ChangeEventHandler;
}

export const Column = (props: ColumnProps) => {
    const [form] = Form.useForm();
    const [applyFilterEnabled, setApplyFilterEnabled] = useState(false);

    const onChangeSearchValue = event => {
        setApplyFilterEnabled(true);
        props.onChangeSearchValue(event);
    }

    return (
        <>
            <span>{props.title}</span>
            {props.filterEnabled &&
                <>
                    <hr />
                    <Form form={form} layout="inline" onFinish={e => applyFilterEnabled && props.onSubmit(e)}>
                        <Form.Item>
                            <Input placeholder={props.placeHolder || 'Search'} value={props.searchValue} onChange={onChangeSearchValue}  />
                        </Form.Item>
                        <Form.Item>
                            <Button disabled={!applyFilterEnabled} onClick={() => form.submit()} type="primary" shape="circle" icon={<SearchOutlined />} />
                        </Form.Item>
                    </Form>
                </>
            }
        </>
    );
}