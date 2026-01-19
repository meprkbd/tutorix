const Loader = ({ size = 40, className = "" }) => {
  return (
    <div
      className={`flex items-center justify-center min-h-screen ${className}`}
    >
      <div
        className="animate-spin rounded-full border-4 border-gray-300 border-t-primary"
        style={{ width: size, height: size }}
      />
    </div>
  );
};

export default Loader;
