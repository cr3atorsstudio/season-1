import { useTransformSpecialCharacter } from "hooks/useTransformSpecialCharacter";

interface Props {
  onChangeAction: (input: string) => void;
  lastWord: string;
}

export const WordInput = ({ onChangeAction, lastWord }: Props) => {
  const lastCharacter = useTransformSpecialCharacter(lastWord);
  return (
    <div className="mt-5">
      <input
        onChange={(e) => onChangeAction(e.currentTarget.value)}
        type="text"
        className="h-20 w-80 border-b-2 border-transparent border-b-accent bg-transparent px-4 font-nico text-xl focus:border-accent focus:ring-0 md:w-96"
        placeholder={`「${lastCharacter}」に続く単語を入れよう！`}
      />
    </div>
  );
};
