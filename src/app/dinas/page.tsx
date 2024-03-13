import Dinas from "@/components/Dinas";
import DefaultLayout from "@/components/Layouts/DefaultLayout";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Cirebon visual data",
  description: "Website resmi Diskominfo Kabupaten Cirebon",
};

const DinasPage = () => {
  return (
    <DefaultLayout>

      <div className="flex flex-col gap-10">
        <Dinas />
      </div>
    </DefaultLayout>
  );
};

export default DinasPage
