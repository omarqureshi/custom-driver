/* This Driver extracts available updates on RHEL based operating system and
  * displays the following in a table
  * - Package Name
  * - New version
  * - Repository
*/

var options = {
  'command': 'yum list updates',
  'timeout': 12000,
  'username': D.device.username(),
  'password': D.device.password(),
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
  lines.forEach(function (line, idx) {
    if (line == "Updated Packages") {
      updatesStart = true;

    }
    if (updatesStart) {
      var items = record.split(/(  )+/).filter(function(el) { return el != ' '  });
      table.insertRecord(
        items[0], [items[1], items[2]]

      )
    }
  });
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

function validate() {
  console.info("Verifying is RHEL compatible");
  D.device.sendSSHCommand(options, commandExecutionCallback);
};

function get_status() {
  D.device.sendSSHCommand(options, commandExecutionCallback);
}
