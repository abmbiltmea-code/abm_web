type SectionLabelProps = {
  title: string;
  textColor?: string;
};

export default function SectionLabel({ title, textColor = "text-[#5B5B5B]" }: SectionLabelProps) {
  return (
    <div className="flex items-center gap-[10px] min-w-[210px]">
      <div className="w-[9px] h-[9px] bg-primary shrink-0" />
      <span className={`text-15 leading-[1.3333] font-tasa font-bold uppercase ${textColor}`}>
        {title}
      </span>
    </div>
  );
}
