export function Monitorheader({
  name,
  description,
}: {
  name: string;
  description: string;
}) {
  return (
    <>
      <div className="w-1/2">
        <h2 className="text-xl font-semibold mb-2">{name}</h2>
        <p className="text-gray-400 text-xs">{description}</p>
      </div>
    </>
  );
}
