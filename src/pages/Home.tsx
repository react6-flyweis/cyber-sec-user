import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Link } from "react-router";
import { useGetProfileQuery } from "../api/queries";
export default function HomePage() {
  const { data: user, isLoading } = useGetProfileQuery();
  if (isLoading)
    return (
      <div className="flex flex-col gap-6 items-center p-6">
        <h1 className="text-2xl font-bold">User Profile</h1>
        <div className="flex flex-col items-center gap-4 bg-white shadow rounded p-6 w-full max-w-md animate-pulse">
          <div className="w-24 h-24 rounded-full bg-gray-200" />
          <div className="h-6 w-32 bg-gray-200 rounded" />
          <div className="h-4 w-48 bg-gray-200 rounded" />
          <div className="flex flex-col gap-2 mt-4 w-full">
            <div className="h-4 w-40 bg-gray-200 rounded" />
            <div className="h-4 w-40 bg-gray-200 rounded" />
            <div className="h-4 w-40 bg-gray-200 rounded" />
            <div className="h-4 w-40 bg-gray-200 rounded" />
            <div className="h-4 w-40 bg-gray-200 rounded" />
            <div className="h-4 w-40 bg-gray-200 rounded" />
            <div className="h-4 w-40 bg-gray-200 rounded" />
            <div className="h-4 w-40 bg-gray-200 rounded" />
            <div className="h-4 w-40 bg-gray-200 rounded" />
          </div>
        </div>
      </div>
    );

  return (
    <div className="flex flex-col gap-6 items-center p-6">
      <h1 className="text-2xl font-bold">User Profile</h1>
      <div className="flex flex-col items-center gap-4 bg-white shadow rounded p-6 w-full max-w-md">
        <Avatar className="w-24 h-24 border">
          <AvatarImage src={user?.profilePicture} alt={user?.name} />
          <AvatarFallback>{user?.name?.[0] || "U"}</AvatarFallback>
        </Avatar>
        <div className="text-lg font-semibold">{user?.name}</div>
        <div className="text-sm text-gray-500">{user?.email}</div>
        <div className="flex flex-col gap-2 mt-4 w-full">
          <div>
            <strong>Role:</strong> {user?.role}
          </div>
          <div>
            <strong>Mobile:</strong> {user?.mobileNumber}
          </div>
          <div>
            <strong>Address:</strong> {user?.address}
          </div>
          <div>
            <strong>Compliance Status:</strong> {user?.complianceStatus}
          </div>
          <div>
            <strong>Risk Level:</strong> {user?.riskLevel}
          </div>
          <div>
            <strong>Threats Detected:</strong> {user?.threatsDetected}
          </div>
          <div>
            <strong>Last Seen:</strong>{" "}
            {new Date(user?.lastSeen || "").toLocaleString()}
          </div>
          <div>
            <strong>Online:</strong> {user?.isOnline ? "Yes" : "No"}
          </div>
          <div>
            <strong>Verified:</strong> {user?.isVerified ? "Yes" : "No"}
          </div>
          <Button asChild className="mt-4 w-full">
            <Link to="/update">Update</Link>
          </Button>
        </div>
      </div>
    </div>
  );
}
