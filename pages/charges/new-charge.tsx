import { useRouter } from "next/router";
import { withCard } from "../../components/hoc/with-card";
import { withHeader } from "../../components/hoc/with-header";
import { ChargeFormContainer } from "../../containers/charges/charge-form-container";

const NewCharge = () => {
    const router = useRouter();

    const onSaveHandler = async () => {
        await router.push('/charges');
    }

    return (
        <ChargeFormContainer onSave={onSaveHandler} />
    );
}

export default withHeader(withCard(NewCharge), 'New Charge')