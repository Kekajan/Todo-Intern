export interface ITask {
    _id?: string;
    title: string;
    description: string;
    status?:"TO_DO" | "IN_PROGRESS" | "DONE";
}