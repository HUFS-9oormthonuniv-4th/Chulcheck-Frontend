interface ErrorAlertProps {
  message: string;
}

export function ErrorAlert({ message }: ErrorAlertProps) {
  return (
    <div
      className="p-3 bg-red-50 border border-red-200 rounded-md text-red-600 text-sm"
      role="alert"
    >
      {message}
    </div>
  );
}
