type Props = {
  title: string;
  subtitle: string;
  center?: boolean;
};

export default function Heading({ center, title, subtitle }: Props) {
  return (
    <div className={center ? "text-center" : "text-start"}>
      <h2 className="pb-2 text-3xl font-semibold tracking-tight border-b text-primary scroll-m-20 first:mt-0">
        {title}
      </h2>
      <p className="text-primary leading-7 [&:not(:first-child)]:mt-6">
        {subtitle}
      </p>
    </div>
  );
};