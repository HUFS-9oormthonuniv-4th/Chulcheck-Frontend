import FormInput from "./FormInput";

interface TimeInputProps {
  startTime: string;
  endTime: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export default function TimeInput({
  startTime,
  endTime,
  onChange,
}: TimeInputProps) {
  return (
    <div className="grid grid-cols-2 gap-3">
      <FormInput
        label="시작 시간"
        name="startTime"
        type="text"
        placeholder="오후 04:11"
        value={startTime}
        onChange={onChange}
      />
      <FormInput
        label="종료 시간"
        name="endTime"
        type="text"
        placeholder="오후 04:20"
        value={endTime}
        onChange={onChange}
      />
    </div>
  );
}
