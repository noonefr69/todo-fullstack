import { auth, signIn, signOut } from "@/auth";

export default async function Home() {
  const session = await auth();

  return (
    <div>
      <form
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
            <p>سلام، {session.user?.name}</p>
            <button type="submit">Sign out</button>
          </>
        ) : (
          <button type="submit">Sign in with Google</button>
        )}
      </form>
    </div>
  );
}
