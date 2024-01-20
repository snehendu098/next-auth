export default function UserProfile({params}:any) {
  return (
    <div className="flex flex-col min-h-screen py-2">
      <h1>Profile {params.id}</h1>
    </div>
  )
}
