import {Database} from "./db/Database";
import {Node} from "./entities/Node";

export class NodeService {
	constructor(private readonly database: Database) {}

	async list(projectId: string): Promise<string[]> {
		const nodes: Node[] = await this.database.getAll(projectId);

	}
}
