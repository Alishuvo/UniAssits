import { Description } from "@/components/common/Description";
import { Headline } from "@/components/common/Headline";
import { Title } from "@/components/common/Title";

export const Teams = () => {
  return (
    <div className="mt-20">
      <div className="flex flex-col gap-10">
        <Title text="Team" />
        <Headline text="Meet the people building your campus assistant" />
        <Description text="Swap in your real profiles later; these are placeholders to fit the layout and vibe." />
      </div>
    </div>
  );
};
