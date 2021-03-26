import { GetServerSideProps } from "next";
import { useRouter } from "next/router";
import { withHeader as withHeader } from "../../components/hoc/with-header";
import { ChargesApi, ChargesFilter } from "../../api-client/charges-api";
import { withCard } from "../../components/hoc/with-card";
import { ChargesTableContainer } from "../../containers/charges/charges-table-container";

export const getServerSideProps: GetServerSideProps = async (context) => {
    const currentPage = parseInt((context.query.currentPage?.toString() || "1")) || 1;
    const take = parseInt((context.query.take?.toString() || "10")) || 10;
    const description = context.query.description?.toString() || null;
    const result = await ChargesApi.getCharges(currentPage, take, {description})    

    return {
        props: {
            chargesPagination: {...result},
            currentPage,
            take,
            description
        }
    };
}

const ListCharges = ({ chargesPagination, currentPage, take, description }) => {
    const router = useRouter()

    const onTableChangeHandler = async (currentPage: number, pageSize: number, filter: ChargesFilter) => {
        const description = filter.description;

        await router.push({
            pathname: '/charges',
            query: {
                currentPage,
                take: pageSize,
                ...description && {description}
            },
        });
    }

    return (
        <ChargesTableContainer searchDescription={description} currentPage={currentPage} take={take} chargesPagination={chargesPagination} onTableChange={onTableChangeHandler} />
    );
}

export default withHeader(withCard(ListCharges), 'List of Charges');