import { Card } from "antd";

export const withCard = Component => {

    const Wrapper = props => {
        return (
            <Card title={props.title || undefined} bordered style={{ height: '80vh' }}>
                <Component {...props} />
            </Card>
        );
    }
    return Wrapper;
}