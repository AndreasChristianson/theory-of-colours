process.on("unhandledRejection", (err) => {
  console.error(err instanceof Error ? err.message : err);
  process.exit(-1);
});
