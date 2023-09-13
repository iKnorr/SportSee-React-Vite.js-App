import { DotProps } from 'recharts';

export const CustomizedActiveDot = ({ cx, cy }: DotProps) => {
  if (cx && cy)
    return (
      <svg
        x={cx - 8}
        y={cy - 8}
        width="16"
        height="16"
        viewBox="0 0 16 16"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <circle cx="8" cy="8" r="8" fill="#D9D9D9" fillOpacity="0.5" />
        <circle cx="8" cy="8" r="4" fill="white" />
      </svg>
    );
};
