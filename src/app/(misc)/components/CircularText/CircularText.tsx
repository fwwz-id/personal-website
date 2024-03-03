import "./CircularText.css";

type CircularTextProps = {
  text: string;
  className?: string;
};

const CircularText = ({ text, className }: CircularTextProps) => {
  const CHARS = text.split("");
  const INNER_ANGLE = 360 / CHARS.length;

  return (
    <span
      className={`text-ring text-xl sm:text-4xl ${className}`}
      style={{
        // @ts-ignore
        "--total": CHARS.length + 1,
        "--radius": 1 / Math.sin(INNER_ANGLE / (180 / Math.PI)),
      }}
    >
      {CHARS.map((char, index) => (
        <span
          key={index}
          // @ts-ignore
          style={{ "--index": index }}
        >
          {char}
        </span>
      ))}
    </span>
  );
};

export default CircularText;
