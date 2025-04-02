'use client';

type ButtonProps = {
  onClick: () => void;
  children: React.ReactNode;
};

export default function Button({ onClick, children }: ButtonProps) {
  return (
    <button className="mt-2 px-4 py-2 bg-blue-500 text-white rounded" onClick={onClick}>
      {children}
    </button>
  );
}
