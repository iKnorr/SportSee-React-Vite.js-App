export const Dot = ({ color }: { color: string }) => {
  return (
    <div
      style={{
        height: '0.8rem',
        width: '0.8rem',
        backgroundColor: color,
        borderRadius: '50%',
      }}
    ></div>
  );
};
