import Link from "next/link";

import { getAuctionDetails } from "@/app/actions/auctionActions";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/Breadcrumb";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/Card";

export default async function Details({ params }: { params: { id: string } }) {
  const data = await getAuctionDetails(params.id);

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
            <BreadcrumbPage>
              {data.make} {data.model}
            </BreadcrumbPage>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>
      <Card>
        <CardHeader className="mb-6">
          <CardTitle>
            {data.make} {data.model}
          </CardTitle>
        </CardHeader>
        <CardContent></CardContent>
      </Card>
    </>
  );
}
