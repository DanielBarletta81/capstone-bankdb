exports.allAccess = (req, res) => {
  res.status(200).send("Public Content.");
};

exports.userData = (req, res) => {
  res.status(200).send("User Content.");
};

exports.employeeData = (req, res) => {
  res.status(200).send("Employee Content.");
};

exports.bossData = (req, res) => {
  res.status(200).send("Boss Content.");
};