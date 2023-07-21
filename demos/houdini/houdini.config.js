/// <references types="houdini-react">

/** @type {import('houdini').ConfigFile} */
const config = {
  schemaPath: "../../api/schema.graphql",

  scalars: {
    Cursor: {
      type: "string",
    },
  },

  plugins: {
    "houdini-react": {},
  },
};

export default config;
