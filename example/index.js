const express = require("express");
const app = express();
const GithubCalendarGraph = require("../index");

app.get("/:account", async (req, res) => {
  const { account } = req.params;
  const graph = await GithubCalendarGraph.fetch(account);
  res.send(graph);
});

app.listen("8080", () => {
  console.log(
    "Server listens on port 8080; try http://localhost:8080/x3388638"
  );
});
