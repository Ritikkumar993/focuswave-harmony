
import AppLayout from "@/components/AppLayout";
import ProfileScreen from "@/components/ProfileScreen";

const Profile = () => {
  return (
    <AppLayout>
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold text-navy mb-6">Your Profile</h1>
        <ProfileScreen />
      </div>
    </AppLayout>
  );
};

export default Profile;
