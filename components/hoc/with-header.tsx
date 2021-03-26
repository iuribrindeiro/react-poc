import Head from "next/head"

export const withHeader = (Component, title: string) => {
    const Wrapper = props => {
        const completeTitle = `Easy Charge - ${title}`;
        return (
            <>
                <Head>
                    <title>{completeTitle}</title>
                    <meta property="og:title" content={completeTitle} key="title" />
                </Head>
                <Component {...props} title={title} />
            </>
        );
    }

    return Wrapper;
}