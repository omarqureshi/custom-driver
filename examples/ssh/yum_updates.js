/**
 * This Driver extracts available updates on RHEL based operating system and
 * displays the following in a table
 * - Package Name
 * - New version
 * - Repository
 * */

var options = {
  'command': 'yum list updates',
  'timeout': 12000
}

function success(output) {
  var table = D.createTable(
    "List of available updates",
    [
      {label: "Available version"},
      {label: "Repository"}
    ]
  );
  var lines = output.split("\n");
  updatesStart = false;
  lines.forEach(line, idx) {
    if (line == "Updated Packages") {
      updatesStart = true;
    }
    if (updatesStart) {
      table.insertRecord(
        parseRecord(line);
      )
    }
  }
}

function commandExecutionCallback(output, error){
    console.info("Execution: ", output);
    if (error) {
      console.error("Error: ", error);
      D.failure(D.errorType.GENERIC_ERROR);
    } else {
      successCallback(output);
    }
}

function parseRecord(record) {
  var items = record.split(/( )+/).filter(function(el) { return el != ' ' });
  return items[0], [items[1], items[2]];
}

function validate() {
  console.info("Verifying is RHEL compatible");
  D.device.sendSSHCommand(options, commandExecutionCallback);
};

function get_status() {
  D.device.sendSSHCommand(options, commandExecutionCallback);
}
