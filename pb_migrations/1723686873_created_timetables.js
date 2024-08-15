/// <reference path="../pb_data/types.d.ts" />
migrate((db) => {
  const collection = new Collection({
    "id": "slq72ww9g6rysmn",
    "created": "2024-08-15 01:54:33.781Z",
    "updated": "2024-08-15 01:54:33.781Z",
    "name": "timetables",
    "type": "base",
    "system": false,
    "schema": [
      {
        "system": false,
        "id": "fok2omb5",
        "name": "user",
        "type": "text",
        "required": false,
        "presentable": false,
        "unique": false,
        "options": {
          "min": null,
          "max": null,
          "pattern": ""
        }
      },
      {
        "system": false,
        "id": "vjznynh8",
        "name": "timetable",
        "type": "json",
        "required": false,
        "presentable": false,
        "unique": false,
        "options": {
          "maxSize": 2000000
        }
      }
    ],
    "indexes": [],
    "listRule": null,
    "viewRule": null,
    "createRule": null,
    "updateRule": null,
    "deleteRule": null,
    "options": {}
  });

  return Dao(db).saveCollection(collection);
}, (db) => {
  const dao = new Dao(db);
  const collection = dao.findCollectionByNameOrId("slq72ww9g6rysmn");

  return dao.deleteCollection(collection);
})
