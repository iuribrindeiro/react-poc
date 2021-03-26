type Props = {
    clientId: string
};

export default function Client({clientId}: Props) {
    return (
        <div>This is the client id {clientId}</div>
    );
}