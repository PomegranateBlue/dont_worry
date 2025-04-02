export default function NoteLayout({
  children,
  steps
}: {
  children: React.ReactNode;
  steps: React.ReactNode;
}) {
  return (
    <div>
      {children}
      {steps}
    </div>
  );
}
