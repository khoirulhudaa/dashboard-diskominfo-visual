import DefaultLayout from "@/components/Layouts/DefaultLayout";
import { Metadata } from "next";
import Dashboard from '@/components/Dashboard/E-commerce'

export const metadata: Metadata = {
  title: "Cirebon visual",
  description: "Website resmi Diskominfo Kabupaten CIrebon",
};

const Dashboards = () => {
  return (
    <DefaultLayout>
      <div className="flex flex-col gap-10">
        <Dashboard />
      </div>
    </DefaultLayout>
  );
};

export default Dashboards
