import Diagram from "@/components/Diagram";
import DefaultLayout from "@/components/Layouts/DefaultLayout";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Cirebon visual data",
  description: "Website resmi Diskominfo Kabupaten Cirebon",
};

const UsersPage = () => {
  return (
    <DefaultLayout>

      <div className="flex flex-col gap-10">
        <Diagram />
      </div>
    </DefaultLayout>
  );
};

export default UsersPage