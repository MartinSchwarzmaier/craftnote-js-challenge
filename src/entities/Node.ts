export interface Node {
	id: number;
	parentId: number | null;
	name: string;
	type: "folder" | "file";
}
