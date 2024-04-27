import { NextPageContext } from "next"
import { getSession,  signOut } from "next-auth/react"


export async function getServersideProps(context : NextPageContext){
  const session = await getSession(context);

  if (!session) {
    return {
      redirect: {
        destination : '/auth',
        permanent : false,
      }
    }
  }

  return {
    props: {}
  }
}

export default function Home() {
  return (
    <div>
      <h1 className="text-4xl">
        Netflix
      </h1>
      <button onClick={() => signOut()}>Logout</button>
    </div>
    
  )
}
