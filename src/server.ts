import serverApp from "./serverApp";

const PORT = 3000;

serverApp.listen(PORT, () => {
  console.log(`Server started on port ${PORT}`);
});