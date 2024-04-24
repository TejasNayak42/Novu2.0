import { Heart } from "lucide-react";
import Link from "next/link";

const Footer = () => {
  return (
    <div className="flex w-full text-primary/75 dark:text-primary/50 text-sm tracking-wide items-center py-10 space-x-1">
      <p>made on earth with</p> <Heart className="w-[1rem] h-[1rem]" />{" "}
      <div>
        by{" "}
        <Link
          href="https://srajan.vercel.app"
          target="_blank"
          className="underline underline-offset-4 font-medium hover:text-primary transition-all duration-200"
        >
          srajan
        </Link>{" "}
        &{" "}
        <Link
          href="https://www.tejasnayak.tech"
          target="_blank"
          className="underline underline-offset-4 font-medium hover:text-primary transition-all duration-200"
        >
          tejas
        </Link>
        .
      </div>
    </div>
  );
};

export default Footer;
