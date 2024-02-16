import ChangePasswordForm from "@/components/auth/ChangePasswordForm";
import ProfileForm from "@/components/auth/ProfileForm";
import AuthLayout from "@/layouts/AuthLayout"
import { useAuthenticate } from "@/store/useAuthenticate";
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
  } from "@/components/ui/card"
  

const Profile = () => {

    const user = useAuthenticate((state) => state.user);

    return (
        <AuthLayout>
      <main className="py-10">
        <h1 className="text-3xl md:text-6xl text-center font-extrabold animate-slide-in-top">
          {user?.name}
        </h1>
        <h4 className="text-center">
            Administración de la cuenta
        </h4>
        <div className="flex gap-5 justify-center flex-wrap">

        <Card className="my-6">
            <CardHeader>
                <CardTitle>Actualizar la información</CardTitle>
            </CardHeader>
        <CardContent>
            <ProfileForm/>
        </CardContent>
        {/* <CardFooter>
            <p>Card Footer</p>
        </CardFooter> */}
        </Card>

        <Card className="my-6">
            <CardHeader>
                <CardTitle>Actualizar la contraseña</CardTitle>
            </CardHeader>
        <CardContent>
            <ChangePasswordForm/>
        </CardContent>
        {/* <CardFooter>
            <p>Card Footer</p>
        </CardFooter> */}
        </Card>

        </div>    
      </main>
    </AuthLayout>
    )

}

export default Profile