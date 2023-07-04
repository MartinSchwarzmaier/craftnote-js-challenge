import { NodeService } from "./NodeService";
import { Database } from "./db/Database";
import { Node } from "./entities/Node";

describe("NodeService", () => {
	const MOCK_PROJECT_ID = "907a65c2-a3a4-4f62-9ff4-8ba48ef8d56d";
	const database: Partial<Database> = {};
	let service: NodeService;

	beforeEach(() => {
		service = new NodeService(database as Database);
	});

	const testCase = async (nodes: Node[], expected: string[]) => {
		database.getAll = jest.fn().mockResolvedValueOnce(nodes);

		const result = await service.list(MOCK_PROJECT_ID);

		expect(result).toEqual(expected);
	};

	describe("list", () => {
		it("should return an empty array for an empty tree", () =>
			testCase([], []));

		it("should return path for a single node", () =>
			testCase(
				[
					{
						id: 1,
						parentId: null,
						type: "file",
						name: "Autechre - Peel Session 2"
					} as Node
				],
				["/Autechre - Peel Session 2"]
			));

		it("should return path for a single folder with one file", () =>
			testCase(
				[
					{
						id: 1,
						parentId: null,
						type: "folder",
						name: "Music"
					} as Node,
					{
						id: 2,
						parentId: 1,
						type: "file",
						name: "Autechre - Gelk.mp3"
					} as Node
				],
				["/Music/Autechre - Gelk.mp3"]
			));

		it("should return path for two nested folders and one file", () =>
			testCase(
				[
					{
						id: 1,
						parentId: null,
						type: "folder",
						name: "Music"
					} as Node,
					{
						id: 2,
						parentId: 1,
						type: "folder",
						name: "Autechre - Peel Session 2"
					} as Node,
					{
						id: 3,
						parentId: 2,
						type: "file",
						name: "Gelk.mp3"
					} as Node
				],
				["/Music/Autechre - Peel Session 2/Gelk.mp3"]
			));

		it("should return paths for two nested folders and multiple files", () =>
			testCase(
				[
					{
						id: 1,
						parentId: null,
						type: "folder",
						name: "Music"
					} as Node,
					{
						id: 2,
						parentId: 1,
						type: "folder",
						name: "Autechre - Peel Session 2"
					} as Node,
					{
						id: 3,
						parentId: 2,
						type: "file",
						name: "Gelk.mp3"
					} as Node,
					{
						id: 4,
						parentId: 2,
						type: "file",
						name: "Blifil.mp3"
					} as Node
				],
				[
					"/Music/Autechre - Peel Session 2/Blifil.mp3",
					"/Music/Autechre - Peel Session 2/Gelk.mp3"
				]
			));

		it("should return paths for example from README", () =>
			testCase(
				[
					{
						id: 1,
						parentId: null,
						type: "folder",
						name: "Music"
					},
					{
						id: 2,
						parentId: 1,
						type: "folder",
						name: "Jazz"
					},
					{
						id: 3,
						parentId: 2,
						type: "file",
						name: "E.S.T. - Seven Days of Falling.mp3"
					},
					{
						id: 4,
						parentId: 2,
						type: "file",
						name: "Arve Henrikson - Assembly.mp3"
					},
					{
						id: 5,
						parentId: 1,
						type: "folder",
						name: "Ambient"
					},
					{
						id: 6,
						parentId: 5,
						type: "file",
						name: "Robert Henke - Delta.mp3"
					},
					{
						id: 7,
						parentId: null,
						type: "file",
						name: "Autechre - Gelk.mp3"
					}
				],
				[
					"/Autechre - Gelk.mp3",
					"/Music/Ambient/Robert Henke - Delta.mp3",
					"/Music/Jazz/Arve Henrikson - Assembly.mp3",
					"/Music/Jazz/E.S.T. - Seven Days of Falling.mp3"
				]
			));

		it("should return paths for a file referring to itself as parent", () =>
			testCase(
				[
					{
						id: 1,
						parentId: null,
						type: "folder",
						name: "Music"
					},
					{
						id: 2,
						parentId: 1,
						type: "folder",
						name: "Autechre - Peel Session 2"
					},
					{
						id: 3,
						parentId: 2,
						type: "file",
						name: "Gelk.mp3"
					},
					{
						id: 4,
						parentId: 4,
						type: "file",
						name: "Blifil.mp3"
					}
				],
				["/Blifil.mp3", "/Music/Autechre - Peel Session 2/Gelk.mp3"]
			));

		it("should return paths for a folder referring to itself as parent", () =>
			testCase(
				[
					{
						id: 1,
						parentId: null,
						type: "folder",
						name: "Music"
					} as Node,
					{
						id: 2,
						parentId: 2,
						type: "folder",
						name: "Autechre - Peel Session 2"
					} as Node,
					{
						id: 3,
						parentId: 2,
						type: "file",
						name: "Gelk.mp3"
					} as Node,
					{
						id: 4,
						parentId: 2,
						type: "file",
						name: "Blifil.mp3"
					} as Node
				],
				[
					"/Autechre - Peel Session 2/Blifil.mp3",
					"/Autechre - Peel Session 2/Gelk.mp3"
				]
			));

		it("should return paths with a longer cycle", () =>
			testCase(
				[
					{
						id: 1,
						parentId: 3,
						type: "folder",
						name: "Music"
					} as Node,
					{
						id: 2,
						parentId: 1,
						type: "folder",
						name: "Autechre - Peel Session 2"
					} as Node,
					{
						id: 3,
						parentId: 2,
						type: "file",
						name: "Gelk.mp3"
					} as Node
				],
				["/Music/Autechre - Peel Session 2/Gelk.mp3"]
			));
	});
});
