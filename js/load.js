var metaData;

$(function() {

  // Metadata to keep track of information as the json is processed.
  metaData = {
    msgCount: 0,
    startTime: new Date().getTime(),
    userMapping: {}
  };

  // Start loading in the data
  oboe('../data/general.json')

    // For each piece of meta data
    .node('meta', function(meta) {
      // Create a mapping from a user's id to their name
      meta.userindex.forEach((discordID, userIndex) => {
        metaData.userMapping[userIndex] = meta.users[discordID]["name"];
      });
    })

    // For each message node with a user_id, timestamp, and message
    .node('{u t m}', function(node) {
      metaData.msgCount++;

      // Helper function to change all patterns of a message to ""
      let cleansePattern = pattern => node.m.replace(pattern, "");

      // Replace all server emojis, images, and links
      node.m = cleansePattern(/(<@.+?>\s*)|(<:.+?>\s*)/g);
      node.m = cleansePattern(/^((http[s]?|ftp):\/)?\/?([^:\/\s]+)((\/\w+)*\/)([\w\-\.]+[^#?\s]+)(.*)?(#[\w\-]+)?$/g);

      // Replace a node's user id with its name
      node.u = metaData.userMapping[node.u];
      loadNode(node);
    })

    // When the program has finished loading.
    .done(loadViz);
});