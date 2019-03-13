// After processing one node
function loadNode(node) {

}

// After processing all of the data
function loadViz(all) {
  metaData.endTime = new Date().getTime();

  console.log("Finished loading from JSON")
  console.log("msgCount: " + metaData.msgCount)

  let seconds = (metaData.endTime - metaData.startTime) / 1000.0;
  console.log("took: " + seconds + " seconds.");
}