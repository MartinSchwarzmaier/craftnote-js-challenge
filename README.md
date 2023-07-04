# Backend Live Challenge

Live Challenge for backend candidates

## Challenge

Given a nested tree structure of file nodes with optional parent ID

```json
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
]
```

Create a list of sorted file paths based on the tree structure and the names:

```json
[
  "/Autechre - Gelk.mp3",
  "/Music/Ambient/Robert Henke - Delta.mp3",
  "/Music/Jazz/Arve Henrikson - Assembly.mp3",
  "/Music/Jazz/E.S.T. - Seven Days of Falling.mp3"
]
```

You can assume that names never contain any slashes.

## Requirements

Complete the implementation of `NodeService.list`. Right now the service only calls the database to get an array of nodes. You have to add code such that it converts this array into the format above. Use the test cases to make sure your code works correctly.
Your code should return a sorted array of paths for all nodes of type `file`.
Every path should be starting with a forward slash `/` as shown in the example above.

## Bonus Requirement: Cycles

Under some circumstances data corruption can occur and the parentId of a node might point to a node that already occured in the current path.
If this happens, the path should not continued any further.

### Example

```json
[
  {
    id: 1,
    parentId: 3,
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
  }
]
```

Here the node with id `1` refers to node `3` as parent. Since node `3` is already a part of the path (if we start with the leaves), we have to ignore this parent reference.

The result should equal to.

```json5
["/Music/Autechre - Peel Session 2/Gelk.mp3"]
```
