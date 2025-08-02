import { auth, signIn, signOut } from "@/auth";

export default async function Home() {
  const session = await auth();

  return (
    <div>
      <div className="grid grid-cols-12 mx-7">
        <form
          className="bg-red-400 col-span-3"
          action={async () => {
            "use server";
            if (session) {
              await signOut();
            } else {
              await signIn("google");
            }
          }}
        >
          {session ? (
            <>
              <p>سلام، {session?.user?.name}</p>
              <button type="submit">Sign out</button>
            </>
          ) : (
            <button type="submit">Sign in with Google</button>
          )}
        </form>
        <div className="col-span-6">s</div>
        <div className="col-span-3">s</div>
      </div>
    </div>
  );
}
