import { Node } from "../entities/Node";

export interface Database {
	getAll(projectId: string): Promise<Node[]>;
}
