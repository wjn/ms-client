const PageContainer = ({ pageName, children }) => {
  return (
    <div className="container">
      <h1 className="row">{pageName}</h1>
      {children}
    </div>
  );
};

export default PageContainer;
