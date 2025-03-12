# Felipe's Node.js examen

Hey **Jorne**! Here is my miserable attempt at making sense of what I've learned.

## GET /api/snippets

Status: 200 OK

I am currently able to fetch all snippets from the database.

## POST /api/snippets

Status: 201 Created

I can post new snippets to the database, and the code becomes encoded.

### Error message:

On snippetRoutes.ts there is an issue with getSnippetById: 'No overload matches this call.'

I don't really understand Codeium's explanation. But everything is working in spite of this.

## GET /api/snippets/:id

Status: 200 OK

I'm able to get snippets by ID.

## DELETE /api/snippets/:id

Status: 200 OK

I'm able to delete snippets by ID.

## PUT /api/snippets/:id

Status: 200 OK

## EJS

The files are made, but I was unable to render the page...

Surely I'm overseeing some detail, so I've commented the lines on **server.ts**.
