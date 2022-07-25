import Navbar from "./Navbar";

const PageNotFound = () => {
  return (
    <div>
      <Navbar />
      <div className="center">
        <h1>Error 404</h1>
        <h2>Page Not Found!</h2>
      </div>
    </div>
  );
};

export default PageNotFound;
