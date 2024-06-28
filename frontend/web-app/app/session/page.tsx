import { getSession, getTokenData } from "@/app/actions/authActions";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/UI/Card";
import Heading from "@/components/UI/Heading";

import AuthTest from "./AuthTest";

export default async function Session() {
  const session = await getSession();
  const tokenData = await getTokenData();

  return (
    <div className="w-2/5">
      <Heading title="Session Dashboard" />
      <Card className="mb-5">
        <CardHeader>
          <CardTitle>Session Data</CardTitle>
        </CardHeader>
        <CardContent>
          <pre>{JSON.stringify(session, null, 2)}</pre>
        </CardContent>
      </Card>
      <Card className="mb-5">
        <CardHeader>
          <CardTitle>Test Auth</CardTitle>
        </CardHeader>
        <CardContent>
          <AuthTest />
        </CardContent>
      </Card>
      <Card className="mb-5">
        <CardHeader>
          <CardTitle>Token Data</CardTitle>
        </CardHeader>
        <CardContent>
          <pre className="overflow-auto">{JSON.stringify(tokenData, null, 2)}</pre>
        </CardContent>
      </Card>
    </div>
  );
}
