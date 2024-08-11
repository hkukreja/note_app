import swaggerJSDoc from "swagger-jsdoc";

const swaggerDefinition = {
    openapi: '3.0.0',
    info: {
        title: 'Note App',
        version: '1.0.0',
    },
    servers: [
        {
            url: 'http://localhost:3000',
            description: 'Local server',
        },
    ],
};

const paths = {
    "/api/v1/notes/add-note" : {
        post: {
            description: "Add a note",
            requestBody: {
                content: {
                    'application/json': {
                        schema: {
                            type: 'object',
                            properties: {
                                title: {
                                    type: 'string',
                                    example: 'Note Title',
                                },
                                body: {
                                    type: 'string',
                                    example: "Note Content",
                                },
                            },
                            required: ['title', 'body'],
                        },
                    },
                },
            },
            responses: {
                400: {
                    description : "Required fields missing"
                },
                201: {
                    description: "Note added successfully"
                }
            }
        }
    },
    "/api/v1/notes/update-note/{noteId}" : {
        put: {
            description: "Update a note",
            parameters: [
                {
                    name: 'noteId',
                    in: 'path',
                    required: true,
                    description: '_id of the note to update',
                    schema: {
                        type: 'string',
                        example: '66b7af905eb0416f356e1815',
                    },
                },
            ],
            requestBody: {
                content: {
                    'application/json': {
                        schema: {
                            type: 'object',
                            properties: {
                                title: {
                                    type: 'string',
                                    example: 'Note Title',
                                },
                                body: {
                                    type: 'string',
                                    example: "Note Content",
                                },
                            },
                            required: ['title', 'body'],
                        },
                    },
                },
            },
            responses: {
                400: {
                    description : "Required fields missing"
                },
                201: {
                    description: "Note updated successfully"
                }
            }
        }
    },
    "/api/v1/notes/notes" : {
        get: {
            description: "Get list of notes",
            parameters: [
                {
                    name: 'title',
                    in: 'query',
                    required: false,
                    description: 'Title of notes',
                    schema: {
                        type: 'string',
                        example: 'note',
                    },
                },
            ],
            responses: {
                200: {
                    description: "Notes list"
                }
            }
        }
    },
    "/api/v1/notes/note/{noteId}" : {
        get: {
            description: "Get note by Id",
            parameters: [
                {
                    name: 'noteId',
                    in: 'path',
                    required: true,
                    description: '_id of the note to fetch',
                    schema: {
                        type: 'string',
                        example: '66b7af905eb0416f356e1815',
                    },
                },
            ],
            responses: {
                200: {
                    description: "Note fetched"
                }
            }
        }
    },
    "/api/v1/notes/{noteId}" : {
        delete: {
            description: "Delete a note",
            parameters: [
                {
                    name: 'noteId',
                    in: 'path',
                    required: true,
                    description: '_id of the note to delete',
                    schema: {
                        type: 'string',
                        example: '66b7af905eb0416f356e1815',
                    },
                },
            ],
            responses: {
                204: {
                    description: "Note deleted"
                }
            }
        }
    },
}

const options = {
    swaggerDefinition: {
        ...swaggerDefinition,
        paths
    },
    apis: [],
};

const swaggerSpec = swaggerJSDoc(options);

export default swaggerSpec;