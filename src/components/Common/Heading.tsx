const Heading = ({
  heading,
  className = "text-xl py-2 font-medium",
}: {
  heading: string;
  className?: string;
}) => {
  return (
    <h1
      className={`text-white text-center bg-gray-800 border-b border-gray-600 w-full ${className}`}
    >
      {heading}
    </h1>
  );
};

export default Heading;
