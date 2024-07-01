import { getSession, getTokenData } from "@/app/actions/authActions";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/Card";

import AuthTest from "./AuthTest";

export default async function Session() {
  const session = await getSession();
  const tokenData = await getTokenData();

  return (
    <>
      <Card className="mb-5 w-2/5 mx-auto">
        <CardHeader>
          <CardTitle>Session Data</CardTitle>
        </CardHeader>
        <CardContent>
          <pre>{JSON.stringify(session, null, 2)}</pre>
        </CardContent>
      </Card>
      <Card className="mb-5 w-2/5 mx-auto">
        <CardHeader>
          <CardTitle>Test Auth</CardTitle>
        </CardHeader>
        <CardContent>
          <AuthTest />
        </CardContent>
      </Card>
      <Card className="mb-5 w-2/5 mx-auto">
        <CardHeader>
          <CardTitle>Token Data</CardTitle>
        </CardHeader>
        <CardContent>
          <pre className="overflow-auto">
            {JSON.stringify(tokenData, null, 2)}
          </pre>
        </CardContent>
      </Card>
    </>
  );
}
