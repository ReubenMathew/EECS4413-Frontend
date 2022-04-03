function sqlInject(data) {
  var flag = true;
  const flags = [
    "SELECT",
    "DROP",
    "*",
    "FROM",
    "WHERE",
    "=",
    "AND",
    "OR",
    "#",
    ";",
  ];
  if (data.length > 0) {
    data.map((param) => {
      flags.map((key) => {
        if (param.param === key) {
          flag = false;
        }
      });
    });
  } else {
    console.log("data is zero length");
  }
  return flag;
}

export default function verify(data) {
  var sql = sqlInject(data);
  if (sql) {
    return sql;
  } else {
    return false;
  }
}
