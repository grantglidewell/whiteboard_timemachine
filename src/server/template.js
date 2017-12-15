export default ({ body }) => (
  `
    <!DOCTYPE html>
    <html>
      <head>
        <title>Whiteboard Time Machine</title>
      </head>

      <body>
        <div id="root">${body}</div>
      </body>
      <script src="bundle.js"></script>
    </html>
  `
);
