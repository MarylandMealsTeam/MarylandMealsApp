import { Center } from "../ui/center";
import { Spinner } from "../ui/spinner";

export default function LoadingSpinner({ className }: { className?: string }) {
    return (
      <Center className={"py-10 " + className}>
        <Spinner size="small" className="text-primary-500" />
      </Center>
    );
  };