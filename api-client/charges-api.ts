import gql from "graphql-tag";
import Charge from "../models/charge";
import client from "./apollo-client";
import { PaginationResult } from "./pagination-result";

export class ChargesApi {
    public static async createCharge(charge: Charge, signal: AbortSignal): Promise<void> {
        ;
        const result = await client.mutate<{createCharge: string}>({
            mutation: gql`
            mutation CreateCharge($description: String!, $amount: Float!) {
                createCharge(description: $description, amount: $amount)
            }
            `, variables: { ...charge },
            context: {
                fetchOptions: { signal }
            }
        });

        charge._id = result.data.createCharge;
    }

    public static async updateCharge(charge: Charge, signal: AbortSignal): Promise<void> {
        await client.mutate({
            mutation: gql`
            mutation UpdateCharge($_id: String!, $description: String!, $amount: Float!) {
                updateCharge(_id: $_id, description: $description, amount: $amount)
            }`, variables: { ...charge },
            context: {
                fetchOptions: { signal }
            }
        });
    }

    public static async getCharge(_id: string): Promise<Charge> {
        const result = await client.query<{charge: Charge}>({
            query: gql`
            query GetCharge($_id: String!) {
                charge(_id: $id) {
                    _id,
                    description,
                    amount
                }
            }`, variables: { _id }
        });

        const {charge} = result.data;
        return charge && new Charge(charge) || null;
    }

    public static async getCharges(currentPage, take, filter: ChargesFilter): Promise<PaginationResult<Charge>> {
        const result = await client.query<{charges: PaginationResult<Charge>}>({
            query: gql`
            query GetCharges($skip: Int!, $take: Int!, $description: String){
                charges(skip: $skip, take: $take, description: $description) {
                    count,
                    items {
                        description,
                        amount,
                        _id
                    }
                }
            }`,
            variables: { skip: (currentPage - 1) * take, take, description: filter.description }
        });
        return new PaginationResult<Charge>(result.data.charges);
    }
}

export interface ChargesFilter {
    description?: string
}