
export type item = {
    id: number;
    itemName: string;
    description: string;
    quantity: number;
    user: user;
}

export type user = {
    id: number;
    firstName: string;
    lastName: string;
    username: string;
}