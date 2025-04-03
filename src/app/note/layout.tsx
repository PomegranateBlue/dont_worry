export default function NoteLayout({
  children,
  steps
}: {
  children: React.ReactNode;
  steps: React.ReactNode;
}) {
  return (
    <div>
      <div>{children}</div>
      <div>{steps}</div>
    </div>
  );
}
