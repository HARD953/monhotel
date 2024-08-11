import React from "react";
import {
  Tabs,
  Tab,
  Input,
  Link,
  Button,
  Card,
  CardBody,
  CardHeader,
} from "@nextui-org/react";
import { loginUser } from "@/api/users/users";

export default function ReservationSignUpInForm() {
  const [selected, setSelected] = React.useState("login");

    // const loginMutationReservation = useMutation({
    //   mutationKey: ["login-reservation"],
    //   mutationFn: async (newData) => {
    //     return await loginUser(newData);
    //   },
    //   onSuccess: async () => {
    //     // await queryClient.invalidateQueries([queryListKey]);

    //     // setVisibleDialoMsg("Ajout effectuée avec suces.");
    //     // setVisibleAdd(true);
    //   },
    //   onError: async (err) => {
    //     console.error(err);
    //     console.log("error :", err.message);
    //     // setVisibleError(true);
    //   },
    // });

  return (
    <div className="flex flex-col w-full">
      {/* <Card className="max-w-full w-[340px] h-[400px]">
        <CardBody className="overflow-hidden"> */}
      <Tabs
        fullWidth
        size="md"
        aria-label="Tabs form"
        selectedKey={selected}
        onSelectionChange={setSelected}
      >
        <Tab key="login" title="Connexion">
          <form className="flex flex-col gap-4">
            <Input
              isRequired
              label="Email"
              placeholder="Entrer votre email"
              type="email"
            />
            <Input
              isRequired
              label="Mot de passe"
              placeholder="Entrer votre mot de passe"
              type="password"
            />
            <p className="text-center text-small">
              Créer un compte?{" "}
              <Link size="sm" onPress={() => setSelected("sign-up")}>
                Sign up
              </Link>
            </p>
            <div className="d-flex gap-2 justify-content-center">
              <Button
                className="bg-myhot-primary text-white fw-bolder"
                fullWidth
              >
                Connexion
              </Button>
            </div>
          </form>
        </Tab>
        <Tab key="sign-up" title="Inscription">
          <form className="flex flex-col gap-4 h-[300px]">
            <Input
              isRequired
              label="Name"
              placeholder="Enter your name"
              type="password"
            />
            <Input
              isRequired
              label="Email"
              placeholder="Enter your email"
              type="email"
            />
            <Input
              isRequired
              label="Password"
              placeholder="Enter your password"
              type="password"
            />
            <p className="text-center text-small">
              Déjà un compte ?{" "}
              <Link size="sm" onPress={() => setSelected("login")}>
                Login
              </Link>
            </p>
            <div className="flex gap-2 justify-end">
              <Button
                className="bg-myhot-primary text-white fw-bolder"
                fullWidth
              >
                Inscription
              </Button>
            </div>
          </form>
        </Tab>
      </Tabs>
      {/* </CardBody>
      </Card> */}
    </div>
  );
}
