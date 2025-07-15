type Props = {
  limit: number;
  setLimit: (val: number) => void;
};

export default function Settings({ limit, setLimit }: Props) {
  const handleLimitChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseInt(e.target.value);
    setLimit(isNaN(value) || value <= 0 ? 1 : value);
  };

  return (
    <div className="max-w-md w-full bg-zinc-800 p-6 rounded-2xl shadow-xl flex flex-col gap-4 border border-zinc-700 animate-fade-in-down">
      <label htmlFor="point-limit" className="text-base font-semibold text-zinc-300">
        Point limit to win:
      </label>
      <input
        id="point-limit"
        type="number"
        value={limit}
        onChange={handleLimitChange}
        min="1"
        placeholder="Ej: 100"
        className="bg-zinc-700 px-5 py-3 rounded-xl text-white outline-none focus:ring-3 focus:ring-lime-500 focus:border-transparent transition-all duration-300 text-lg border border-zinc-600
        [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
        aria-label="Set points limit"
      />
    </div>
  );
}