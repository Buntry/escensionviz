$(function() {
  oboe('general.json')
    // All message nodes
    .node('{u t m}', function(item) {
      // Replace all server emojis and images
      item.m = item.m.replace(/(<@.+?>\s*)|(<:.+?>\s*)/g, "");
      // Replace all links
      item.m = item.m.replace(/^((http[s]?|ftp):\/)?\/?([^:\/\s]+)((\/\w+)*\/)([\w\-\.]+[^#?\s]+)(.*)?(#[\w\-]+)?$/g, "");

      console.log(item.u + " said " + item.m);
    })
    .done(function(items) {
      console.log("done loading from json")
    });
});