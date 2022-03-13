import { useEffect } from "react";
import { useRouter } from "next/router";
import Error from "next/error";

export default function ResolveRoute() {
  const router = useRouter();

  useEffect(() => {
    const { pathname } = router;

    if (pathname !== pathname.toLowerCase()) {
      router.push(pathname.toLowerCase());
    }
  }, [router]);

  return (
    <div>
      <p>404! Try capitalize the page name in the URL above.</p>
    </div>
  );
}
