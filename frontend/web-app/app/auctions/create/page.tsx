import Link from "next/link";

import ActionForm from "@/app/actions/ActionForm";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/Breadcrumb";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/Card";

export default function Component() {
  return (
    <>
      <Breadcrumb className="hidden md:flex mb-4">
        <BreadcrumbList>
          <BreadcrumbItem>
            <BreadcrumbLink asChild>
              <Link href="/">Home</Link>
            </BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbPage>Sell You Car</BreadcrumbPage>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>
      <Card className="mx-auto max-w-[50%]">
        <CardHeader className="mb-6">
          <CardTitle>Sell Your Car</CardTitle>
          <CardDescription>
            Please enter the details of your car
          </CardDescription>
        </CardHeader>
        <CardContent>
          <ActionForm />
        </CardContent>
      </Card>
    </>
  );
}
