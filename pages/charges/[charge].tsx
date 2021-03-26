type Props = {
    chargeId: string
};

export default function Charge({chargeId}: Props) {
    return (
        <div>This is the charge id {chargeId}</div>
    );
}