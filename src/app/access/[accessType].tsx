import { useRouter } from "next/router";

const Access = () => {
  const router = useRouter();
  return (
    <div>
      <h1>Access</h1>
      <h2>{router.query.accessType}</h2>
    </div>
  )
}

export default Access;